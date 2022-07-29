import { Popover } from 'antd';
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '~/redux';
import CamposFiltroPrincipal from './campos';

const PopoverFiltroPrincipal: React.FC<{ children: ReactNode }> = ({ children }) => {
  // const dispatch = useDispatch();

  const abrirFiltroPrincipal = useSelector(
    (state: AppState) => state.filtroPrincipal.abrirFiltroPrincipal,
  );

  const filtroAtual = useSelector((state: AppState) => state.filtroPrincipal.filtroAtual);

  console.log('PopoverFiltroPrincipal Render');

  return (
    <Popover
      overlayInnerStyle={{ width: '620px', height: '220px' }}
      overlayStyle={{ padding: 0 }}
      showArrow={false}
      content={abrirFiltroPrincipal ? <CamposFiltroPrincipal filtroAtual={filtroAtual} /> : <></>}
      trigger='click'
      visible={abrirFiltroPrincipal}
      // onVisibleChange={(v) => handleVisibleChange(v)}
      placement='bottom'
    >
      {children}
    </Popover>
  );
};

export default PopoverFiltroPrincipal;
