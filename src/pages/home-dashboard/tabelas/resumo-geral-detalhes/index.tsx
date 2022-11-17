import React from 'react';
import { useSelector } from 'react-redux';
import { ResumoGeralDetalhesDto } from '~/domain/dto/resumo-geral-detalhes';
import { ResumoGeralProvaDto } from '~/domain/dto/resumo-geral-prova-dto';
import { AppState } from '~/redux';
import resumoService from '~/services/resumo-service';
import TabelaResumoGeralPadrao from '../resumo-geral-padrao';
import TabelaDetalhesResumoGeralProvas from '../resumo-geral-provas';
import TabelaDetalhesResumoGeralTurma from '../resumo-geral-turma';

interface TabelaResumoGeralDetalhesProps {
  dadosProva: ResumoGeralProvaDto;
}

const TabelaResumoGeralDetalhes: React.FC<TabelaResumoGeralDetalhesProps> = ({ dadosProva }) => {
  const filtroPrincipal = useSelector((state: AppState) => state.filtroPrincipal);

  const provaId = dadosProva.provaId;

  const expandedRowRenderTurmas = (resumoGeralDetalhes: ResumoGeralDetalhesDto) => (
    <TabelaDetalhesResumoGeralTurma dadosProva={dadosProva} turmaId={resumoGeralDetalhes.id} />
  );

  const expandedRowRenderTurmasUe = (resumoGeralDetalhes: ResumoGeralDetalhesDto) => {
    return (
      <TabelaResumoGeralPadrao
        key='TABELA_RESUMO_PROVAS_UES'
        consultarDados={(page: number) =>
          resumoService.obterDadosResumoGeralProvasTurmas(
            page,
            filtroPrincipal,
            provaId,
            resumoGeralDetalhes.id,
          )
        }
        titleFirstColumn='Turmas da UE'
        expandedRowRender={expandedRowRenderTurmas}
        paginacao={false}
      />
    );
  };

  const expandedRowRenderUes = (resumoGeralDetalhes: ResumoGeralDetalhesDto) => {
    return (
      <TabelaResumoGeralPadrao
        key='TABELA_RESUMO_PROVAS_UES'
        consultarDados={(page: number) =>
          resumoService.obterDadosResumoGeralProvasUes(
            page,
            filtroPrincipal,
            provaId,
            resumoGeralDetalhes.id,
          )
        }
        titleFirstColumn='Unidade Educacional'
        expandedRowRender={expandedRowRenderTurmasUe}
        paginacao={false}
      />
    );
  };

  const expandedRowRenderDres = () => {
    return (
      <TabelaResumoGeralPadrao
        key='TABELA_RESUMO_PROVAS_DRES'
        consultarDados={(page: number) =>
          resumoService.obterDadosResumoGeralProvasDres(page, filtroPrincipal, provaId)
        }
        titleFirstColumn='Diretoria Regional de Educação'
        expandedRowRender={expandedRowRenderUes}
        paginacao={false}
      />
    );
  };

  return (
    <>
      <TabelaDetalhesResumoGeralProvas dadosProva={dadosProva} />
      {expandedRowRenderDres()}
    </>
  );
};

export default TabelaResumoGeralDetalhes;
