import { useContext } from 'react';
import { HistoricoContainer, HistoricoLista, Status } from './styles';
import { CyclesContext } from '../../contexts/CycleContext';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

export function Historico() {
  const { cycles } = useContext(CyclesContext);

  return (
    <HistoricoContainer>
      <h1>Meu Histórico</h1>

      <HistoricoLista>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>{formatDistanceToNow(cycle.startDate, {
                  addSuffix: true,
                  locale: ptBR
                })}</td>
                <td>
                  {cycle.fineshedDate && (
                    <Status $statusColor="green">Concluído</Status>
                  )}
                  {cycle.interruptedDate && (
                    <Status $statusColor="red">Interrompido</Status>
                  )}
                  {!cycle.fineshedDate && !cycle.interruptedDate && (
                    <Status $statusColor="yellow">Em Andamento</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoricoLista>
    </HistoricoContainer>
  );
}
