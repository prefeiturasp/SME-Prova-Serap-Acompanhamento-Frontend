import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tag } from 'antd';
import React from 'react';
import styled from 'styled-components';
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
  description: string;
  index: number;
}

interface TagFiltroPrincipalProps {
  disabled?: boolean;
  onRemove?: (item: TagItem) => void;
  item: TagItem;
}

const TagFiltroPrincipal: React.FC<TagFiltroPrincipalProps> = ({
  disabled = false,
  onRemove,
  item,
}) => {
  return (
    <ContainerTag>
      <>
        {item.description}
        {!disabled && (
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
};

export default TagFiltroPrincipal;
