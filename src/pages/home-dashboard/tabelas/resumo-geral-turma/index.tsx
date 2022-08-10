import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import Table from '~/components/table';
import resumoProvasService from '~/services/resumo-service';
import { Colors } from '~/styles/colors';
import { CardTabelas, TituloCardTabelas } from '../styles';

const TabelaResumoGeralTurma: React.FC = () => {
  const [dados, setDados] = useState<any[]>([]);

  const [totalRegistros, setTotalRegistros] = useState(0);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    setCarregando(true);
    setTimeout(() => {
      onChange(1);
    }, 200);
  }, []);

  const columns: ColumnsType<any> = [
    {
      title: 'Título da Prova',
      dataIndex: 'tituloProva',
      key: 'tituloProva',
    },
    {
      title: 'Total de alunos',
      dataIndex: 'totalAlunos',
      key: 'totalAlunos',
      align: 'center',
    },
    {
      title: 'Provas iniciadas',
      dataIndex: 'provasIniciadas',
      key: 'provasIniciadas',
      align: 'center',
    },
    {
      title: 'Provas não finalizadas',
      dataIndex: 'provasNaoFinalizadas',
      key: 'provasNaoFinalizadas',
      align: 'center',
    },
    {
      title: 'Provas finalizadas',
      dataIndex: 'provasFinalizadas',
      key: 'provasFinalizadas',
      align: 'center',
    },
    {
      title: 'Tempo médio',
      dataIndex: 'tempoMedio',
      key: 'tempoMedio',
      align: 'center',
    },
    {
      title: 'Percentual realizado',
      dataIndex: 'percentualRealizado',
      key: 'percentualRealizado',
      align: 'center',
    },
  ];

  const expandedRowRender = (record: any) => {
    const columnsExpandedRow: ColumnsType<any> = [
      {
        title: 'Nome do Estudante',
        dataIndex: 'nomeEstudante',
        key: 'nomeEstudante',
      },
      {
        title: 'Fez Download',
        dataIndex: 'fezDownload',
        key: 'fezDownload',
        align: 'center',
        render(fezDownload) {
          return fezDownload ? (
            <FontAwesomeIcon icon={faCircleCheck} fontSize='14' color={Colors.SIGPAE} />
          ) : (
            <FontAwesomeIcon icon={faCircleXmark} fontSize='14' color={Colors.SupportWarning} />
          );
        },
      },
      {
        title: 'Início da Prova',
        dataIndex: 'inicioProva',
        key: 'inicioProva',
        align: 'center',
      },
      {
        title: 'Fim da Prova',
        dataIndex: 'fimProva',
        key: 'fimProva',
        align: 'center',
      },
      {
        title: 'Tempo médio',
        dataIndex: 'tempoMedio',
        key: 'tempoMedio',
        align: 'center',
      },
      {
        title: 'Questões Respondidas',
        dataIndex: 'questoesRespondidas',
        key: 'questoesRespondidas',
        align: 'center',
      },
    ];

    const detalhes = record?.detalhes?.length ? record.detalhes : [];
    return <Table columns={columnsExpandedRow} dataSource={detalhes} pagination={false} />;
  };

  const onChange = async (page: number) => {
    setCarregando(true);
    const resposta = await resumoProvasService.obterDadosResumoGeralTurma(page);

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
      <TituloCardTabelas>Resumo Geral da Turma</TituloCardTabelas>
      <Table
        loading={carregando}
        columns={columns}
        dataSource={dados}
        expandable={{
          expandedRowRender,
          rowExpandable: (record: any) => !!record?.detalhes?.length,
        }}
        pagination={{ total: totalRegistros, pageSize: 10, onChange }}
      />
    </CardTabelas>
  );
};

export default TabelaResumoGeralTurma;
