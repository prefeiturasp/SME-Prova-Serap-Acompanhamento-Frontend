import React from 'react';
import Content from '~/components/content';
import HeaderHomeDashboard from './header';
import TabelasResumos from './tabelas';
import Totalizadores from './totalizadores';

const HomeDashboard: React.FC = () => {
  return (
    <Content header={<HeaderHomeDashboard />}>
      <Totalizadores />
      <TabelasResumos />
    </Content>
  );
};

export default HomeDashboard;
