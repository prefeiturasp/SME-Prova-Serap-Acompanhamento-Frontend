import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ResumoGeralProvaDto } from '~/domain/dto/resumo-geral-prova-dto';
import { AppState } from '~/redux';
import resumoService from '~/services/resumo-service';
import TabelaResumoGeralPadrao from './resumo-geral-padrao';
import TabelaDetalhesResumoGeralProvas from './resumo-geral-provas';
import TabelaDetalhesResumoGeralTurma from './resumo-geral-turma';
import { CardTabelas, TituloCardTabelas } from './styles';

const TabelaResumos: React.FC = () => {
  const filtroPrincipal = useSelector((state: AppState) => state.filtroPrincipal);

  const expandedRowRenderTurmas = (dadosProva: ResumoGeralProvaDto, turmaId: number) => (
    <TabelaDetalhesResumoGeralTurma dadosProva={dadosProva} turmaId={turmaId} />
  );

  const expandedRowRenderTurmasUe = (dadosProva: ResumoGeralProvaDto, provaId: number) => {
    return (
      <TabelaResumoGeralPadrao
        key='TABELA_RESUMO_PROVAS_UES'
        rowKey='provaId'
        consultarDados={(page: number) =>
          resumoService.obterDadosResumoGeralProvasTurmas(
            page,
            filtroPrincipal,
            provaId,
            dadosProva?.ueId,
          )
        }
        titleFirstColumn='Turmas da UE'
        expandedRowRender={(dados: ResumoGeralProvaDto) =>
          expandedRowRenderTurmas(dados, dadosProva.provaId)
        }
      />
    );
  };

  const expandedRowRenderUes = (dadosProva: ResumoGeralProvaDto, provaId: number) => {
    return (
      <TabelaResumoGeralPadrao
        key='TABELA_RESUMO_PROVAS_UES'
        rowKey='provaId'
        consultarDados={(page: number) =>
          resumoService.obterDadosResumoGeralProvasUes(
            page,
            filtroPrincipal,
            provaId,
            dadosProva?.dreId,
          )
        }
        titleFirstColumn='Unidade Educacional'
        expandedRowRender={(dados: ResumoGeralProvaDto) =>
          expandedRowRenderTurmasUe(dados, dadosProva.provaId)
        }
      />
    );
  };

  const expandedRowRenderDres = (dadosProva: ResumoGeralProvaDto) => {
    return (
      <TabelaResumoGeralPadrao
        key='TABELA_RESUMO_PROVAS_DRES'
        rowKey='provaId'
        consultarDados={(page: number) =>
          resumoService.obterDadosResumoGeralProvasDres(page, filtroPrincipal, dadosProva.provaId)
        }
        titleFirstColumn='Diretoria Regional de Educação'
        expandedRowRender={(dados: ResumoGeralProvaDto) =>
          expandedRowRenderUes(dados, dadosProva.provaId)
        }
      />
    );
  };

  const expandedRowRender = (dadosProva: ResumoGeralProvaDto) => {
    const turmaId = (filtroPrincipal?.turma as number) || 0;
    if (filtroPrincipal?.turma)
      return <TabelaDetalhesResumoGeralTurma dadosProva={dadosProva} turmaId={turmaId} />;

    return (
      <>
        <TabelaDetalhesResumoGeralProvas dadosProva={dadosProva} />
        {expandedRowRenderDres(dadosProva)}
      </>
    );
  };

  const obterTitulo = () => {
    if (filtroPrincipal?.turma) return 'Resumo Geral da Turma';
    return 'Resumo Geral das Provas';
  };

  const obterDadosResumoGeralProvas = useCallback(
    (page: number) => {
      return resumoService.obterDadosResumoGeralProvas(page, filtroPrincipal);
    },
    [filtroPrincipal],
  );

  return (
    <CardTabelas>
      <TituloCardTabelas>{obterTitulo()}</TituloCardTabelas>
      <TabelaResumoGeralPadrao
        key='TABELA_RESUMO_PROVAS'
        rowKey='provaId'
        consultarDados={(page: number) => obterDadosResumoGeralProvas(page)}
        titleFirstColumn='Título da Prova'
        expandedRowRender={expandedRowRender}
      />
    </CardTabelas>
  );
};

export default TabelaResumos;
