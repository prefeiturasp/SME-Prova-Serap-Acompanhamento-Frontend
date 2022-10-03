import { Spin } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GraficoProva, { Graficos } from '~/components/grafico-prova';
import { AppState } from '~/redux';

import {
  setCarregarDadosTotalizadores,
  setDataUltimaAtualizacao,
} from '~/redux/modules/geral/actions';
import geralService from '~/services/geral-service';

const GraficosContainer: React.FC = () => {
  const filtroPrincipal = useSelector((state: AppState) => state.filtroPrincipal);
  const carregarDadosGraficos = useSelector((state: AppState) => state.geral).carregarDadosGraficos;

  const dispatch = useDispatch();

  const [dadosGraficos, setDadosGraficos] = useState<Graficos>({
    provaVsTempoMedio: [],
    questoesPrevistasVsQuestoesRespondidas: [],
    totalProvasVsFinalizadas: [],
    totalProvasVsIniciadas: [],
  });
  const [carregando, setCarregando] = useState<boolean>(false);

  const obterDadosGraficosProva = useCallback(async () => {
    setCarregando(true);
    const resposta = await geralService.obterDadosGraficos(filtroPrincipal);

    if (resposta?.data) {
      setDadosGraficos(resposta.data);
    } else {
      setDadosGraficos({
        provaVsTempoMedio: [],
        questoesPrevistasVsQuestoesRespondidas: [],
        totalProvasVsFinalizadas: [],
        totalProvasVsIniciadas: [],
      });
    }
    dispatch(setDataUltimaAtualizacao(new Date()));
    setCarregando(false);
  }, [filtroPrincipal, dispatch]);

  useEffect(() => {
    if (filtroPrincipal?.anoLetivo) {
      obterDadosGraficosProva();
    } else {
      obterDadosGraficosProva();
      dispatch(setDataUltimaAtualizacao(new Date()));
    }
  }, [filtroPrincipal, dispatch, obterDadosGraficosProva]);

  useEffect(() => {
    if (carregarDadosGraficos) obterDadosGraficosProva();
    dispatch(setCarregarDadosTotalizadores(false));
  }, [dispatch, obterDadosGraficosProva, carregarDadosGraficos]);

  return (
    <Spin spinning={carregando}>
      Total Provas Iniciadas VS Iniciadas
      <GraficoProva dados={dadosGraficos.totalProvasVsIniciadas} />
      {/* Total Provas Iniciadas VS Finalizadas
      <GraficoProva dados={dadosGraficos.totalProvasVsFinalizadas} />
      Questões Prevista Vs Respondidas
      <GraficoProva dados={dadosGraficos.questoesPrevistasVsQuestoesRespondidas} />
      Tempo médio de realização de provas.
      <GraficoProva dados={dadosGraficos.provaVsTempoMedio} /> */}
    </Spin>
  );
};

export default GraficosContainer;
