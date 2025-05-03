import { Play } from '@phosphor-icons/react';
import { CountDownContaier, FormContainer, HomeContainer, Separator } from './styles';

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">vou trabalhar em</label>
          <input type="text" id="task" />

          <label htmlFor="minutesAmount">durante</label>
          <input type="text" id="minutesAmount" />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContaier>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContaier>

        <button type="submit">
          <Play size={24} />
          começar
        </button>
      </form>
    </HomeContainer>
  );
}
