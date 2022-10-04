import { Bar } from '@ant-design/plots';

interface GraficosProps {
  dados: GraficoItem[];
}

const GraficoProva: React.FC<GraficosProps> = (dados) => {
  const config = {
    data: dados.dados,
    isGroup: true,
    xField: 'valor',
    yField: 'descricao',

    seriesField: 'tipo',
    legend: {
      position: 'bottom',
    },
    marginRatio: 0,
    test: {
      position: 'middle',
      layout: [
        {
          type: 'interval-adjust-position',
        },
        {
          type: 'interval-hide-overlap',
        },
        {
          type: 'adjust-color',
        },
      ],
    },
  };
  return <Bar {...config} />;
};

export interface GraficoItem {
  descricao: string;
  tipo: string;
  valor: string | number;
}

export interface Graficos {
  totalProvasVsIniciadas: GraficoItem[];
  totalProvasVsFinalizadas: Array<GraficoItem>;
  questoesPrevistasVsQuestoesRespondidas: Array<GraficoItem>;
  provaVSTempoMedio: Array<GraficoItem>;
}

export default GraficoProva;
