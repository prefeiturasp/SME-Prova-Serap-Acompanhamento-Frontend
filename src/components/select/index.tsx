import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Select as SelectAnt, SelectProps } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { Colors } from '~/styles/colors';

const SelectContainer = styled.div`
  .ant-select {
    width: 100%;
    color: ${Colors.Label};

    .ant-select-selection-item,
    .ant-select-selection-search,
    .ant-select-item-option-content {
      font-weight: 500;
      font-size: 12px;
    }

    .ant-select-selection-placeholder {
      color: ${Colors.CinzaPaginador};
      font-weight: 500;
      font-size: 12px;
    }

    .ant-select-selector {
      border-radius: 4px;
      border: 1px solid ${Colors.CinzaBordaSelect};
    }
  }
`;

const Select: React.FC<SelectProps> = (props) => {
  return (
    <SelectContainer>
      <SelectAnt
        suffixIcon={
          <FontAwesomeIcon icon={faAngleDown} fontSize={14} color={Colors.CinzaIconSelect} />
        }
        {...props}
      />
    </SelectContainer>
  );
};

export default Select;
