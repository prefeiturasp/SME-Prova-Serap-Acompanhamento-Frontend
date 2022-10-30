import React from 'react';
import Content from '~/components/content';
import HeaderHomeDashboard from './header';
import TabelaResumos from './tabelas';
import Totalizadores from './totalizadores';
import GraficosContainer from './graficos';

const HomeDashboard: React.FC = () => {
  return (
    <Content header={<HeaderHomeDashboard />}>
      <Totalizadores />
      <GraficosContainer />
      <TabelaResumos />
    </Content>
  );
};

export default HomeDashboard;
