import { Popover } from 'antd';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '~/redux';
import { setAbrirFiltroPrincipal } from '~/redux/modules/geral/actions';
import CamposFiltroPrincipal from './campos';

const PopoverFiltroPrincipal: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();

  const abrirFiltroPrincipal = useSelector((state: AppState) => state.geral.abrirFiltroPrincipal);

  const filtroAtual = useSelector((state: AppState) => state.filtroPrincipal.filtroAtual);

  console.log('PopoverFiltroPrincipal Render');

  useEffect(() => {
    return () => {
      dispatch(setAbrirFiltroPrincipal(false));
    };
  }, [dispatch]);

  return (
    <Popover
      getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
      overlayInnerStyle={{ width: '620px', height: '250px' }}
      align={{ targetOffset: [292, 13] }}
      showArrow={false}
      content={abrirFiltroPrincipal ? <CamposFiltroPrincipal filtroAtual={filtroAtual} /> : <></>}
      trigger='click'
      visible={abrirFiltroPrincipal}
      onVisibleChange={(v) => dispatch(setAbrirFiltroPrincipal(v))}
      placement='bottom'
    >
      {children}
    </Popover>
  );
};

export default PopoverFiltroPrincipal;
