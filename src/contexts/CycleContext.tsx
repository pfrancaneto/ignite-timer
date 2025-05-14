import { createContext, ReactNode, useReducer, useState } from 'react';
import { Cycle, cycleReducer } from '../reducers/cycles/reducer';
import {
  addCreateCycleAction,
  interrupetedCycleAction,
  markFinishedCycleAction,
} from '../reducers/cycles/actions';

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextValues {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  cycles: Cycle[];
  markCurrentCycleAsFineshed: () => void;
  setSecondsPassed: (seconds: number) => void;
  // setCycleAsInitial: () => void;
  interruptedCurrentCycle: () => void;
  createNewCicle: (data: CreateCycleData) => void;
}

interface CycleContextProviderProps {
  children: ReactNode;
}

export const CyclesContext = createContext({} as CyclesContextValues);

export function CycleContextProvider({ children }: CycleContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cycleReducer, {
    cycles: [],
    activeCycleId: null,
  });

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function markCurrentCycleAsFineshed() {
    dispatch(markFinishedCycleAction);
  }

  function interruptedCurrentCycle() {
    dispatch(interrupetedCycleAction);
  }

  function createNewCicle(data: CreateCycleData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    dispatch(addCreateCycleAction(newCycle));

    setAmountSecondsPassed(0);
  }

  // function setCycleAsInitial() {
  //   setActiveCycleId(null);
  // }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        cycles,
        markCurrentCycleAsFineshed,
        setSecondsPassed,
        // setCycleAsInitial,
        interruptedCurrentCycle,
        createNewCicle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
