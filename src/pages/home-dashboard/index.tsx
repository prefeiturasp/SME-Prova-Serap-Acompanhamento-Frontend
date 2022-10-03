import React from 'react';
import Content from '~/components/content';
import HeaderHomeDashboard from './header';
import TabelasResumos from './tabelas';
import Totalizadores from './totalizadores';
import Graficos from '~/components/graficos';

const HomeDashboard: React.FC = () => {
  return (
    <Content header={<HeaderHomeDashboard />}>
      <Totalizadores />
      <Graficos />
      <TabelasResumos />
    </Content>
  );
};

export default HomeDashboard;
