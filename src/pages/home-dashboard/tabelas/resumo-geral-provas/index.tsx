import React, { useEffect, useState } from 'react';
import Table from '~/components/table';
import resumoProvasService from '~/services/resumo-provas.-service';
import { CardTabelas, TituloCardTabelas } from '../styles';

const TabelaResumoGeralProvas: React.FC = () => {
  const [dados, setDados] = useState<any[]>([]);

  const [totalRegistros, setTotalRegistros] = useState(0);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    setCarregando(true);
    setTimeout(() => {
      onChange(1);
    }, 200);
  }, []);

  const columns = [
    {
      title: 'Título da Prova',
      dataIndex: 'tituloProva',
      key: 'tituloProva',
    },
    {
      title: 'Total de alunos',
      dataIndex: 'totalAlunos',
      key: 'totalAlunos',
    },
    {
      title: 'Provas iniciadas',
      dataIndex: 'provasIniciadas',
      key: 'provasIniciadas',
    },
    {
      title: 'Provas não finalizadas',
      dataIndex: 'provasNaoFinalizadas',
      key: 'provasNaoFinalizadas',
    },
    {
      title: 'Provas finalizadas',
      dataIndex: 'provasFinalizadas',
      key: 'provasFinalizadas',
    },
    {
      title: 'Tempo médio',
      dataIndex: 'tempoMedio',
      key: 'tempoMedio',
    },
    {
      title: 'Percentual realizado',
      dataIndex: 'percentualRealizado',
      key: 'percentualRealizado',
    },
  ];

  const expandedRowRender = (record: any) => {
    const columns = [
      {
        title: 'Data de início',
        dataIndex: 'dataInicio',
        key: 'dataInicio',
      },
      {
        title: 'Data de fim',
        dataIndex: 'dataFim',
        key: 'dataFim',
      },
      {
        title: 'Qtde. Questões da prova',
        dataIndex: 'qtdQuestoesProva',
        key: 'qtdQuestoesProva',
      },
      {
        title: 'Total de Questões',
        dataIndex: 'totalQuestoes',
        key: 'totalQuestoes',
      },
      {
        title: 'Respondidas',
        dataIndex: 'respondidas',
        key: 'respondidas',
      },
      {
        title: 'Percentual respondido',
        dataIndex: 'percentualRespondido',
        key: 'percentualRespondido',
      },
    ];

    const detalhes = record?.detalhes?.length ? record.detalhes : [];

    return <Table columns={columns} dataSource={detalhes} pagination={false} />;
  };

  const onChange = async (page: number) => {
    setCarregando(true);
    const resposta = await resumoProvasService.obterDadosResumoGeralProvas(page);

    if (resposta?.items?.length) {
      setTotalRegistros(resposta.totalRegistros);
      setDados(resposta.items);
    } else {
      setTotalRegistros(0);
      setDados([]);
    }
    setCarregando(false);
  };
  return (
    <CardTabelas>
      <TituloCardTabelas>Resumo Geral das Provas</TituloCardTabelas>
      <Table
        loading={carregando}
        columns={columns}
        dataSource={dados}
        expandable={{
          expandedRowRender,
        }}
        pagination={{ total: totalRegistros, pageSize: 10, onChange }}
      />
    </CardTabelas>
  );
};

export default TabelaResumoGeralProvas;
