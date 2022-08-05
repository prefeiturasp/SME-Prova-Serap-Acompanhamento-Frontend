import React from 'react';
import Content from '~/components/content';
import HeaderHomeDashboard from './header';
import TabelaResumoGeralProvas from './tabelas/resumo-geral-provas';
import Totalizadores from './totalizadores';

const HomeDashboard: React.FC = () => {
  return (
    <Content header={<HeaderHomeDashboard />}>
      <Totalizadores />
      <TabelaResumoGeralProvas />
    </Content>
  );
};

export default HomeDashboard;
