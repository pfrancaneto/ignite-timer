import { Play } from '@phosphor-icons/react';
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
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Dê um nome para o seu projeto"
          />

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput type="text" id="minutesAmount" placeholder="00" />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContaier>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContaier>

        <StartCountDownButton type="submit">
          <Play size={24} />
          começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  );
}
