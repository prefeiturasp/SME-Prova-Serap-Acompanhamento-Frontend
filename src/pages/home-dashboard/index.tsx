import React from 'react';
import Content from '~/components/content';
import HeaderHomeDashboard from './header';
import TabelasResumos from './tabelas';
import Totalizadores from './totalizadores';
import GraficosContainer from './Graficos';

const HomeDashboard: React.FC = () => {
  return (
    <Content header={<HeaderHomeDashboard />}>
      <Totalizadores />
      <GraficosContainer />
      <TabelasResumos />
    </Content>
  );
};

export default HomeDashboard;
