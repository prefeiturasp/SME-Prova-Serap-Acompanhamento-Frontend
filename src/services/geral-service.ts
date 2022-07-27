import { AxiosResponse } from 'axios';
import { CardTotalizador } from '~/components/cards-totalizadores';

// TODO: Implementar a chamada ao serviço
const obterDadosCardsTotalizadores = (filtros: any): Promise<AxiosResponse> | any => {
  console.log('Filtros: ', filtros);

  const mock: Array<CardTotalizador> = [
    {
      titulo: 'Total de Provas ',
      cor: '#1B80D4',
      valor: '100',
    },
    {
      titulo: 'Provas Iniciadas',
      cor: '#198459',
      valor: '120',
    },
    {
      titulo: 'Provas Não Finalizadas',
      cor: '#B40C02',
      valor: '35',
    },
    {
      titulo: 'Provas Finalizadas',
      cor: '#198459',
      valor: '85',
    },
    {
      titulo: 'Percentual Realizado',
      cor: '#1B80D4',
      valor: '51%',
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: mock }), 2000);
  });
};

const obterTiposVisualizacoesDados = (): Promise<AxiosResponse> | any => {
  const mock: Array<any> = [
    {
      value: 1,
      label: 'Dados Acumulados',
    },
    {
      value: 2,
      label: 'Dados de Hoje',
    },
    {
      value: 3,
      label: 'Dados da Semana',
    },
    {
      value: 4,
      label: 'Dados do Mês',
    },
  ];
  return new Promise((resolve) => resolve({ data: mock }));
};

export default {
  obterDadosCardsTotalizadores,
  obterTiposVisualizacoesDados,
};
