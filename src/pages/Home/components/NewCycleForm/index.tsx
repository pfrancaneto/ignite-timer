import { FormContainer, MinutesAmountInput, TaskInput } from './styles';

export function NewCycleForm() {
  return (
    <FormContainer>
      <label htmlFor="task">vou trabalhar em</label>
      <TaskInput
        {...register('task')}
        type="text"
        id="task"
        placeholder="Dê um nome para o seu projeto"
        list="list-suggestions"
        disabled={!!activeCycle}
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
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  );
}
