import { HistoricoContainer, HistoricoLista } from './styles';

export function Historico() {
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
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td>Concluído</td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td>Concluído</td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td>Concluído</td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td>Concluído</td>
            </tr>
          </tbody>
        </table>
      </HistoricoLista>
    </HistoricoContainer>
  );
}
