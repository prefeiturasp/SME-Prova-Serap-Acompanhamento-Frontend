import { Space } from 'antd';
import React from 'react';

import styled from 'styled-components';
import { Colors } from '~/styles/colors';

export const ContainerCards = styled.div`
  padding: 20px 16px;
`;

export const Titulo = styled.div`
  color: ${Colors.Label};
  font-size: 12px;
  font-weight: 400;
`;

export const Valor = styled.div`
  color: ${(props) => props?.color};
  font-size: 32px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LayoutCard = styled.div`
  height: 85px;
  width: 175px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${Colors.AzulFundoCard};
`;

export interface CardTotalizador {
  titulo: string;
  cor: string;
  valor: string | number;
}

interface CardsTotalizadoresProps {
  dados: Array<CardTotalizador>;
}

const CardsTotalizadores: React.FC<CardsTotalizadoresProps> = ({ dados }) => (
  <ContainerCards>
    <Space size={12} wrap>
      {dados?.map((dado: CardTotalizador, index: number) => (
        <LayoutCard key={index}>
          <Titulo>{dado.titulo}</Titulo>
          <Valor color={dado.cor}>{dado.valor}</Valor>
        </LayoutCard>
      ))}
    </Space>
  </ContainerCards>
);

export default CardsTotalizadores;
