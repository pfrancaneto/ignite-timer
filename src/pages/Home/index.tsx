import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { HandPalm, Play } from '@phosphor-icons/react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import { CountDown } from './components/CountDown';
import { NewCycleForm } from './components/NewCycleForm';

import { CyclesContext } from '../../contexts/CycleContext';

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles';

const newCicleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa').readonly(),
  minutesAmount: zod.number().min(1).max(60),
});

type NewCicleFormData = zod.infer<typeof newCicleFormValidationSchema>;

export function Home() {
  const { activeCycle, interruptedCurrentCycle, createNewCicle } =
    useContext(CyclesContext);

  const newCycleForm = useForm<NewCicleFormData>({
    resolver: zodResolver(newCicleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  function handleCreateNewCycle(data: NewCicleFormData) {
    createNewCicle(data);
    reset();
  }

  const task = watch('task');
  const isSubmitingDisable = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />

        {activeCycle ? (
          <StopCountDownButton onClick={interruptedCurrentCycle} type="button">
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
