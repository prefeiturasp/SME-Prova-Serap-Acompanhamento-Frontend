import { Spin } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import GraficoProva, { Graficos } from '~/components/grafico-prova';
import { AppState } from '~/redux';

import {
  setCarregarDadosTotalizadores,
  setDataUltimaAtualizacao,
} from '~/redux/modules/geral/actions';
import geralService from '~/services/geral-service';
import { Colors } from '~/styles/colors';

export const ContainerGraficos = styled.div`
  display: flex;
  flew-flow: row wrap;
`;

export const ContainerGraficoItem = styled.div`
  width: 50%;
`;

export const ContainerCard = styled.div`
  background: ${Colors.AzulFundoCard};
  margin: 20px 16px;
`;

export const Titulo = styled.div`
  font-size: 12px;
  font-weight: 400;
  text-align: center;
`;

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
      <ContainerGraficos>
        <ContainerGraficoItem>
          <ContainerCard>
            <Titulo>Total Provas Iniciadas VS Iniciadas</Titulo>
            <GraficoProva dados={dadosGraficos.totalProvasVsIniciadas} />
          </ContainerCard>
        </ContainerGraficoItem>
        <ContainerGraficoItem>
          <ContainerCard>
            <Titulo>Total Provas Iniciadas VS Finalizadas</Titulo>
            <GraficoProva dados={dadosGraficos.totalProvasVsFinalizadas} />
          </ContainerCard>
        </ContainerGraficoItem>
      </ContainerGraficos>

      <ContainerGraficos>
        <ContainerGraficoItem>
          <Titulo> Questões Prevista Vs Respondidas</Titulo>
          <GraficoProva dados={dadosGraficos.questoesPrevistasVsQuestoesRespondidas} />
        </ContainerGraficoItem>
        <ContainerGraficoItem>
          <Titulo> Tempo médio de realização de provas.</Titulo>
          <GraficoProva dados={dadosGraficos.provaVsTempoMedio} />
        </ContainerGraficoItem>
      </ContainerGraficos>
    </Spin>
  );
};

export default GraficosContainer;
