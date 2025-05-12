import { useContext, useEffect } from 'react';
import { CountDownContainer, Separator } from './styles';
import { CyclesContext } from '../..';
import { differenceInSeconds } from 'date-fns';

export function CountDown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFineshed,
    amountSecondsPassed,
    setSecondsPassed,
    setCycleAsInitial
  } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifferennce = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        );

        if (secondsDifferennce >= totalSeconds) {
          markCurrentCycleAsFineshed();
          setSecondsPassed(totalSeconds);
          setCycleAsInitial();
          clearInterval(interval);
        } else {
          setSecondsPassed(secondsDifferennce);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    activeCycleId,
    totalSeconds,
    markCurrentCycleAsFineshed,
    setSecondsPassed,
    setCycleAsInitial
  ]);

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [activeCycle, minutes, seconds]);

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  );
}
