import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import Table from '~/components/table';

interface TabelaDetalhesResumoGeralProvasProps {
  detalheProva: any;
}

const TabelaDetalhesResumoGeralProvas: React.FC<TabelaDetalhesResumoGeralProvasProps> = ({
  detalheProva,
}) => {
  const columns: ColumnsType<any> = [
    {
      title: 'Data de início',
      dataIndex: 'dataInicio',
      key: 'dataInicio',
      align: 'center',
    },
    {
      title: 'Data de fim',
      dataIndex: 'dataFim',
      key: 'dataFim',
      align: 'center',
    },
    {
      title: 'Qtde. Questões da prova',
      dataIndex: 'qtdeQuestoesProva',
      key: 'qtdeQuestoesProva',
      align: 'center',
    },
    {
      title: 'Total de Questões',
      dataIndex: 'totalQuestoes',
      key: 'totalQuestoes',
      align: 'center',
    },
    {
      title: 'Respondidas',
      dataIndex: 'respondidas',
      key: 'respondidas',
      align: 'center',
    },
    {
      title: 'Percentual respondido',
      dataIndex: 'percentualRespondido',
      key: 'percentualRespondido',
      align: 'center',
    },
  ];
  const detalhes = detalheProva ? [detalheProva] : [];
  return <Table columns={columns} dataSource={detalhes} pagination={false} />;
};

export default TabelaDetalhesResumoGeralProvas;
