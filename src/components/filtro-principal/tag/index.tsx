import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tag } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { SelectValueType } from '~/domain/type/select';
import { AppState } from '~/redux';
import { Colors } from '~/styles/colors';

const ContainerTag = styled(Tag)`
  font-size: 10.5px;
  color: ${Colors.Label};
  background: ${Colors.CinzaFundo};
  border: 1px solid ${Colors.CinzaBorda};
  height: 26px;
  border-radius: 2px;
  display: inline-flex;
  align-items: center;
  padding: 0px 5px;
`;

export interface TagItem {
  nomeCampo: string;
  valor: SelectValueType;
  descricao: React.ReactNode;
  bloquearRemover?: boolean;
}

const TagFiltroPrincipal: React.FC = () => {
  const filtroAtual = useSelector((state: AppState) => state.filtroPrincipal.filtroAtual);

  const onRemove = (item: any) => {
    console.log(item);
  };

  return filtroAtual?.dadosTags?.length ? (
    <>
      {filtroAtual.dadosTags.map((item, index) => {
        return (
          <ContainerTag key={index}>
            <>
              {item.descricao}
              {item.bloquearRemover ? (
                <></>
              ) : (
                <FontAwesomeIcon
                  icon={faTimes}
                  color={Colors.CinzaPaginador}
                  fontSize={11}
                  style={{ marginLeft: '5px' }}
                  cursor='pointer'
                  onClick={() => onRemove && onRemove(item)}
                />
              )}
            </>
          </ContainerTag>
        );
      })}
    </>
  ) : (
    <> </>
  );
};

export default TagFiltroPrincipal;
