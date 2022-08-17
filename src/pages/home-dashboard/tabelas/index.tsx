import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Table from '~/components/table';
import { AppState } from '~/redux';
import resumoService from '~/services/resumo-service';
import { CardTabelas, TituloCardTabelas } from './styles';
import TabelaDetalhesResumoGeralProvas from './resumo-geral-provas';
import TabelaDetalhesResumoGeralTurma from './resumo-geral-turma';

const TabelaResumos: React.FC = () => {
  const filtroPrincipal = useSelector((state: AppState) => state.filtroPrincipal);

  const [dados, setDados] = useState<any[]>([]);

  const [totalRegistros, setTotalRegistros] = useState(0);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (filtroPrincipal?.anoLetivo) {
      onChange();
    } else {
      setDados([]);
    }
  }, [filtroPrincipal]);

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

  const expandedRowRender = (dadosProva: any) => {
    if (filtroPrincipal?.turma) return <TabelaDetalhesResumoGeralTurma dadosProva={dadosProva} />;

    return <TabelaDetalhesResumoGeralProvas dadosProva={dadosProva} />;
  };

  const onChange = async (page = 1) => {
    setCarregando(true);
    const resposta = await resumoService.obterDadosResumoGeralProvas(page);

    if (resposta?.items?.length) {
      setTotalRegistros(resposta.totalRegistros);
      setDados(resposta.items);
    } else {
      setTotalRegistros(0);
      setDados([]);
    }
    setCarregando(false);
  };

  const obterTitulo = () => {
    if (filtroPrincipal?.turma) return 'Resumo Geral da Turma';
    return 'Resumo Geral das Provas';
  };

  return (
    <CardTabelas>
      <TituloCardTabelas>{obterTitulo()}</TituloCardTabelas>
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

export default TabelaResumos;
