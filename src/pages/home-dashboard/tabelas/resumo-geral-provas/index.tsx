import React, { useEffect, useState } from 'react';
import Table from '~/components/table';
import { CardTabelas, TituloCardTabelas } from '../styles';

const TabelaResumoGeralProvas: React.FC = () => {
  const [dados, setDados] = useState<any[]>([]);

  const [totalRegistros, setTotalRegistros] = useState(15);
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

  const obterDados = (page: number) => {
    // MOCK
    const teste = [];
    if (page === 1) {
      for (let i = 0; i < 10; ++i) {
        teste.push({
          key: i.toString(),
          tituloProva: 'Prova EJA Complementar - CH 1o Semestre 2022',
          totalAlunos: 111,
          provasIniciadas: 222,
          provasNaoFinalizadas: 20,
          provasFinalizadas: 1212,
          tempoMedio: '50min',
          percentualRealizado: '45.15%',
          detalhes: [
            {
              dataInicio: '01/01/2020',
              dataFim: '01/01/2020',
              qtdQuestoesProva: '10',
              totalQuestoes: '20',
              respondidas: '10',
              percentualRespondido: '50%',
            },
          ],
        });
      }
    }
    if (page === 2) {
      for (let i = 0; i < 5; ++i) {
        teste.push({
          key: i.toString(),
          tituloProva: 'Prova EJA Básica - CH 1o Semestre 2022',
          totalAlunos: 3685,
          provasIniciadas: 116,
          provasNaoFinalizadas: 80,
          provasFinalizadas: 1349,
          tempoMedio: '48min',
          percentualRealizado: '36.65%',
        });
      }
    }

    setDados([...teste]);
    setCarregando(false);
  };
  const onChange = (page: number) => {
    setCarregando(true);
    // MOCK  - Simulação de requisição
    // numeroRegistros = 10; padrao
    // numeroPagina = page; pagina atual selecionada
    // totalRegistros = 15; total de registros
    setTimeout(() => {
      obterDados(page);
    }, 2000);
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
