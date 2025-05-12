import { createContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { HandPalm, Play } from '@phosphor-icons/react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import { CountDown } from './components/CountDown';
import { NewCycleForm } from './components/NewCycleForm';

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles';

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  fineshedDate?: Date;
}

const newCicleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa').readonly(),
  minutesAmount: zod.number().min(1).max(60),
});

type NewCicleFormData = zod.infer<typeof newCicleFormValidationSchema>;

interface CyclesContextValues {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markCurrentCycleAsFineshed: () => void;
  amountSecondsPassed: number;
  setSecondsPassed: (seconds: number) => void;
  setCycleAsInitial: () => void;
}

export const CyclesContext = createContext({} as CyclesContextValues);

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const newCycleForm = useForm<NewCicleFormData>({
    resolver: zodResolver(newCicleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function handleCreateNewCicle(data: NewCicleFormData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);

    reset();
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFineshed() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, fineshedDate: new Date() };
        } else {
          return cycle;
        }
      }),
    );
  }

  function handleInterruptedCicle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      }),
    );

    setActiveCycleId(null);
  }

  function setCycleAsInitial() {
    setActiveCycleId(null);
  }

  const task = watch('task');
  const isSubmitingDisable = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCicle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFineshed,
            amountSecondsPassed,
            setSecondsPassed,
            setCycleAsInitial,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <CountDown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountDownButton onClick={handleInterruptedCicle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitingDisable} type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}
