import { ColumnsType } from 'antd/lib/table';
import { ExpandableConfig } from 'antd/lib/table/interface';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import Table from '~/components/table';
import { PaginacaoDto } from '~/domain/dto/paginacao-dto';
import { ResumoGeralProvaDto } from '~/domain/dto/resumo-geral-prova-dto';
import { exibirAlerta } from '~/services/alerta-service';

interface TabelaResumoGeralPadraoProps
  extends Pick<ExpandableConfig<ResumoGeralProvaDto>, 'expandedRowRender'> {
  consultarDados: (page: number, provaId?: number) => Promise<AxiosResponse<PaginacaoDto>>;
  titleFirstColumn: string;
  rowKey: string;
}

const TabelaResumoGeralPadrao: React.FC<TabelaResumoGeralPadraoProps> = ({
  expandedRowRender,
  consultarDados,
  titleFirstColumn,
  rowKey,
}) => {
  // const dispatch = useDispatch();

  // const filtroPrincipal = useSelector((state: AppState) => state.filtroPrincipal);
  // const carregarDadosResumoProva = useSelector(
  //   (state: AppState) => state.geral,
  // ).carregarDadosResumoProva;

  const [dados, setDados] = useState<ResumoGeralProvaDto[]>([]);

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
    // if (filtroPrincipal?.anoLetivo) {
    onChange();
    // } else {
    //   setDados([]);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (carregarDadosResumoProva) {
  //     onChange();
  //     dispatch(setCarregarDadosResumoProva(false));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch, carregarDadosResumoProva]);

  const columns: ColumnsType<ResumoGeralProvaDto> = [
    {
      title: titleFirstColumn,
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

  return (
    <Table
      style={{ marginTop: 14 }}
      rowKey={rowKey}
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
