import { Bar } from '@ant-design/plots';
import styled from 'styled-components';
import { Colors } from '~/styles/colors';

interface GraficosProps {
  dados: GraficoItem[];
}

const GraficoProva: React.FC<GraficosProps> = (dados) => {
  // const data = [
  //   {
  //     test: 'Test Bib 2',
  //     type: 'Provas Iniciadas',
  //     value: 90,
  //   },
  //   {
  //     test: 'Test Bib 2',
  //     type: 'Total de Provas',
  //     value: 100,
  //   },
  //   {
  //     test: 'Test EF 1',
  //     type: 'Provas Iniciadas',
  //     value: 61,
  //   },
  //   {
  //     test: 'Test EF 1',
  //     type: 'Total de Provas',
  //     value: 100,
  //   },
  //   {
  //     test: 'Test bib 5',
  //     type: 'Provas Iniciadas',
  //     value: 61,
  //   },
  //   {
  //     test: 'Test bib 5',
  //     type: 'Total de Provas',
  //     value: 145,
  //   },
  // ];
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
  provaVsTempoMedio: Array<GraficoItem>;
}

//ReactDOM.render(<DemoBar />, document.getElementById('container'));
export default GraficoProva;

export const GraficoCards = styled.div`
  padding: 20px 16px;
`;

// export const Titulo = styled.div`
//   color: ${Colors.Label};
//   font-size: 12px;
//   font-weight: 400;
// `;

// export const Valor = styled.div`
//   color: ${(props) => props?.color};
//   font-size: 32px;
//   font-weight: 400;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `;

// export const LayoutCard = styled.div`
//   height: 85px;
//   width: 175px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   background: ${Colors.AzulFundoCard};
// `;

// export interface CardTotalizador {
//   titulo: string;
//   cor: string;
//   valor: string | number;
//   tooltip?: string;
// }

// interface GraficosTotalizadoresProps {
//   dados: Array<CardTotalizador>;
// }

// interface RenderToltipProps {
//   children: ReactNode;
//   tooltip?: string;
//   key: number;
// }

// const GraficosTotalizadores: React.FC<GraficosTotalizadoresProps> = ({ dados }) => {
//   const renderCardTooltip = ({ children, tooltip, key }: RenderToltipProps) =>
//     tooltip ? (
//       <Tooltip key={key} title={tooltip}>
//         {children}
//       </Tooltip>
//     ) : (
//       children
//     );

//   return (
//     <ContainerCards>
//       <Space size={12} wrap>
//         {dados?.map((card: CardTotalizador, index: number) =>
//           renderCardTooltip({
//             key: index,
//             tooltip: card.tooltip,
//             children: (
//               <LayoutCard key={index}>
//                 <Titulo>{card.titulo}</Titulo>
//                 <Valor color={card.cor}>{card.valor}</Valor>
//               </LayoutCard>
//             ),
//           }),
//         )}
//       </Space>
//     </ContainerCards>
//   );
// };

// export default GraficosTotalizadores;
