import { ColumnsType } from 'antd/lib/table';
import { ExpandableConfig } from 'antd/lib/table/interface';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '~/components/table';
import { PaginacaoDto } from '~/domain/dto/paginacao-dto';
import { ResumoGeralDetalhesDto } from '~/domain/dto/resumo-geral-detalhes';
import { AppState } from '~/redux';
import { setCarregarDadosResumoProva } from '~/redux/modules/geral/actions';
import { exibirAlerta } from '~/services/alerta-service';

interface TabelaResumoGeralPadraoProps
  extends Pick<ExpandableConfig<ResumoGeralDetalhesDto>, 'expandedRowRender'> {
  consultarDados: (page: number, provaId?: number) => Promise<AxiosResponse<PaginacaoDto>>;
  titleFirstColumn: string;
}

const TabelaResumoGeralPadrao: React.FC<TabelaResumoGeralPadraoProps> = ({
  expandedRowRender,
  consultarDados,
  titleFirstColumn,
}) => {
  const dispatch = useDispatch();

  const anoLetivo = useSelector((state: AppState) => state.filtroPrincipal)?.anoLetivo;
  const carregarDadosResumoProva = useSelector(
    (state: AppState) => state.geral,
  ).carregarDadosResumoProva;

  const [dados, setDados] = useState<ResumoGeralDetalhesDto[]>([]);

  const [totalRegistros, setTotalRegistros] = useState(0);
  const [carregando, setCarregando] = useState(true);

  const onChange = async (page = 1) => {
    setCarregando(true);
    const resposta = await consultarDados(page).catch(() =>
      exibirAlerta('error', 'Erro ao consultar dados'),
    );

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
    if (anoLetivo) {
      onChange();
    } else {
      setDados([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (carregarDadosResumoProva) {
      onChange();
      dispatch(setCarregarDadosResumoProva(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, carregarDadosResumoProva]);

  const columns: ColumnsType<ResumoGeralDetalhesDto[]> = [
    {
      title: titleFirstColumn,
      dataIndex: 'nome',
    },
    {
      title: 'Total de alunos',
      dataIndex: ['item', 'totalAlunos'],
      align: 'center',
    },
    {
      title: 'Provas iniciadas',
      dataIndex: ['item', 'provasIniciadas'],
      align: 'center',
    },
    {
      title: 'Provas não finalizadas',
      dataIndex: ['item', 'provasNaoFinalizadas'],
      align: 'center',
    },
    {
      title: 'Provas finalizadas',
      dataIndex: ['item', 'provasFinalizadas'],
      align: 'center',
    },
    {
      title: 'Tempo médio',
      dataIndex: ['item', 'tempoMedio'],
      align: 'center',
      render(tempoMedio) {
        return `${tempoMedio}min`;
      },
    },
    {
      title: 'Percentual realizado',
      dataIndex: ['item', 'percentualRealizado'],
      align: 'center',
      render(percentualRealizado) {
        return `${percentualRealizado}%`;
      },
    },
  ];

  return (
    <Table
      style={{ marginTop: 14 }}
      rowKey='id'
      loading={carregando}
      columns={columns}
      dataSource={dados}
      expandable={{
        expandedRowRender,
      }}
      pagination={{ total: totalRegistros, pageSize: 10, onChange }}
    />
  );
};

export default TabelaResumoGeralPadrao;
