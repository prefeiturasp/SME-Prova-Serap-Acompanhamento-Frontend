import { Spin } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import GraficoProva, { Graficos } from '~/components/grafico-prova';
import { AppState } from '~/redux';

import { setCarregarDadosGraficos, setDataUltimaAtualizacao } from '~/redux/modules/geral/actions';
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
  padding: 20px 16px;
`;

const GraficosContainer: React.FC = () => {
  const filtroPrincipal = useSelector((state: AppState) => state.filtroPrincipal);
  const carregarDadosGraficos = useSelector((state: AppState) => state.geral).carregarDadosGraficos;

  const dispatch = useDispatch();

  const [dadosGraficos, setDadosGraficos] = useState<Graficos>({
    provaVSTempoMedio: [],
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
        provaVSTempoMedio: [],
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
    dispatch(setCarregarDadosGraficos(false));
  }, [dispatch, obterDadosGraficosProva, carregarDadosGraficos]);

  return (
    <Spin spinning={carregando}>
      <ContainerGraficos>
        <ContainerGraficoItem>
          <ContainerCard>
            <Titulo>Total de provas X Provas Iniciadas</Titulo>
            <GraficoProva dados={dadosGraficos.totalProvasVsIniciadas} />
          </ContainerCard>
        </ContainerGraficoItem>
        <ContainerGraficoItem>
          <ContainerCard>
            <Titulo>Total de Provas X Provas Finalizadas</Titulo>
            <GraficoProva dados={dadosGraficos.totalProvasVsFinalizadas} />
          </ContainerCard>
        </ContainerGraficoItem>
      </ContainerGraficos>

      <ContainerGraficos>
        <ContainerGraficoItem>
          <ContainerCard>
            <Titulo>Questões Previstas X Questões Respondidas</Titulo>
            <GraficoProva dados={dadosGraficos.questoesPrevistasVsQuestoesRespondidas} />
          </ContainerCard>
        </ContainerGraficoItem>
        <ContainerGraficoItem>
          <ContainerCard>
            <Titulo>Tempo médio de realização das provas</Titulo>
            <GraficoProva dados={dadosGraficos.provaVSTempoMedio} />
          </ContainerCard>
        </ContainerGraficoItem>
      </ContainerGraficos>
    </Spin>
  );
};

export default GraficosContainer;
