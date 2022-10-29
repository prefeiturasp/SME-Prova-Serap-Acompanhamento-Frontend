import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '~/components/table';
import { ResumoGeralProvaDto } from '~/domain/dto/resumo-geral-prova-dto';
import { AppState } from '~/redux';
import { setCarregarDadosResumoProva } from '~/redux/modules/geral/actions';
import resumoService from '~/services/resumo-service';
import TabelaResumoGeralDetalhes from './resumo-geral-detalhes';
import TabelaDetalhesResumoGeralTurma from './resumo-geral-turma';
import { CardTabelas, TituloCardTabelas } from './styles';

const TabelaResumos: React.FC = () => {
  const dispatch = useDispatch();

  const filtroPrincipal = useSelector((state: AppState) => state.filtroPrincipal);
  const carregarDadosResumoProva = useSelector(
    (state: AppState) => state.geral,
  ).carregarDadosResumoProva;

  const [dados, setDados] = useState<ResumoGeralProvaDto[]>([]);

  const [totalRegistros, setTotalRegistros] = useState(0);
  const [carregando, setCarregando] = useState(true);

  const onChange = async (page = 1) => {
    setCarregando(true);
    const resposta = await resumoService.obterDadosResumoGeralProvas(page, filtroPrincipal);

    if (resposta?.data?.items?.length) {
      setTotalRegistros(resposta.data.totalRegistros);
      setDados(resposta.data.items);
    } else {
      setTotalRegistros(0);
      setDados([]);
    }
    setCarregando(false);
  };

  useEffect(() => {
    if (filtroPrincipal?.anoLetivo) {
      onChange();
    } else {
      setDados([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtroPrincipal]);

  useEffect(() => {
    if (carregarDadosResumoProva) {
      onChange();
      dispatch(setCarregarDadosResumoProva(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, carregarDadosResumoProva]);

  const columns: ColumnsType<ResumoGeralProvaDto> = [
    {
      title: 'Título da Prova',
      dataIndex: 'tituloProva',
    },
    {
      title: 'Total de alunos',
      dataIndex: 'totalAlunos',
      align: 'center',
    },
    {
      title: 'Provas iniciadas',
      dataIndex: 'provasIniciadas',
      align: 'center',
    },
    {
      title: 'Provas não finalizadas',
      dataIndex: 'provasNaoFinalizadas',
      align: 'center',
    },
    {
      title: 'Provas finalizadas',
      dataIndex: 'provasFinalizadas',
      align: 'center',
    },
    {
      title: 'Tempo médio',
      dataIndex: 'tempoMedio',
      align: 'center',
      render(tempoMedio) {
        return `${tempoMedio}min`;
      },
    },
    {
      title: 'Percentual realizado',
      dataIndex: 'percentualRealizado',
      align: 'center',
      render(percentualRealizado) {
        return `${percentualRealizado}%`;
      },
    },
  ];

  const expandedRowRender = (dadosProva: any) => {
    const turmaId = (filtroPrincipal?.turma as number) || 0;
    if (filtroPrincipal?.turma)
      return <TabelaDetalhesResumoGeralTurma dadosProva={dadosProva} turmaId={turmaId} />;

    return <TabelaResumoGeralDetalhes dadosProva={dadosProva} />;
  };

  const obterTitulo = () => {
    if (filtroPrincipal?.turma) return 'Resumo Geral da Turma';
    return 'Resumo Geral das Provas';
  };

  return (
    <CardTabelas>
      <TituloCardTabelas>{obterTitulo()}</TituloCardTabelas>
      <Table
        rowKey='provaId'
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
