import React from 'react';
import Content from '~/components/content';
import HeaderHomeDashboard from './header';
import TabelaResumoGeralProvas from './tabelas/resumo-geral-provas';
import TabelaResumoGeralTurma from './tabelas/resumo-geral-turma';
import Totalizadores from './totalizadores';

const HomeDashboard: React.FC = () => {
  return (
    <Content header={<HeaderHomeDashboard />}>
      <Totalizadores />
      <TabelaResumoGeralProvas />
      <TabelaResumoGeralTurma />
    </Content>
  );
};

export default HomeDashboard;
