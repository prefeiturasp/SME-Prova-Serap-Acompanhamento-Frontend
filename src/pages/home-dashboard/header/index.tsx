import { DefaultOptionType } from 'antd/lib/select';
import React, { useEffect, useState } from 'react';
import Select from '~/components/select';
import geralService from '~/services/geral-service';
import DataUltimaAtualizacao from './data-ultima-atualizacao';
import { Actions, BotaoAtualizarDados, Container, Title } from './style';

const HeaderHomeDashboard: React.FC = () => {
  const [tiposVisualizacoesDados, setTiposVisualizacoesDados] = useState<DefaultOptionType[]>([]);

  const obterTiposVisualizacoesDados = async () => {
    const resposta = await geralService.obterTiposVisualizacoesDados();
    if (resposta?.data) {
      setTiposVisualizacoesDados(resposta.data);
    } else {
      setTiposVisualizacoesDados([]);
    }
  };

  useEffect(() => {
    obterTiposVisualizacoesDados();
  }, []);

  return (
    <>
      <DataUltimaAtualizacao />
      <Container>
        <Title>Visão Geral das Provas</Title>
        <Actions>
          {/* TODO - Mock select */}
          <Select
            value={1}
            disabled
            style={{ width: '150px', color: '#42474A' }}
            options={tiposVisualizacoesDados}
          />
          <BotaoAtualizarDados
            onClick={() => {
              // TODO - Aplicar filtro
            }}
          >
            Atualizar dados
          </BotaoAtualizarDados>
        </Actions>
      </Container>
    </>
  );
};

export default HeaderHomeDashboard;
