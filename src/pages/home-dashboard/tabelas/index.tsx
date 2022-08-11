import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '~/redux';
import TabelaResumoGeralProvas from './resumo-geral-provas';
import TabelaResumoGeralTurma from './resumo-geral-turma';
const TabelasResumos: React.FC = () => {
  const filtroPrincipal = useSelector((state: AppState) => state.filtroPrincipal);

  return filtroPrincipal?.turma ? <TabelaResumoGeralTurma /> : <TabelaResumoGeralProvas />;
};

export default TabelasResumos;
