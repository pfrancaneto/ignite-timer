import { Play } from '@phosphor-icons/react';
import { useForm } from 'react-hook-form';

import {
  CountDownContaier,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from './styles';

export function Home() {
  const { register, handleSubmit, watch } = useForm();

  function handleCreateNewCicle(event: any) {
    console.log(event);
  }

  const task = watch('task');
  const isSubmitingDisable = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCicle)}>
        <FormContainer>
          <label htmlFor="task">vou trabalhar em</label>
          <TaskInput
            {...register('task')}
            type="text"
            id="task"
            placeholder="Dê um nome para o seu projeto"
            list="list-suggestions"
          />

          <datalist id="list-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContaier>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContaier>

        <StartCountDownButton disabled={isSubmitingDisable} type="submit">
          <Play size={24} />
          começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  );
}
