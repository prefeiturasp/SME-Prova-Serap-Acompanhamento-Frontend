import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '~/redux';
import { Colors } from '~/styles/colors';

const IconeAbrirPopover: React.FC = () => {
  const abrirFiltroPrincipal = useSelector(
    (state: AppState) => state.filtroPrincipal.abrirFiltroPrincipal,
  );

  return (
    <Button
      size='small'
      shape='circle'
      style={{ background: Colors.BorderTable, width: '28px', height: '28px' }}
      icon={
        <FontAwesomeIcon
          icon={abrirFiltroPrincipal ? faCaretUp : faCaretDown}
          fontSize={7}
          color={Colors.Label}
        />
      }
    />
  );
};

export default IconeAbrirPopover;
