import { PaginacaoDto } from '~/domain/dto/paginacao-dto';
import api from './api';
import queryString from 'query-string';
import { FiltroPrincipalProps } from '~/redux/modules/filtro-principal/reducers';
import { AxiosResponse } from 'axios';
import { AlunoTurmaDto } from '~/domain/dto/aluno-turma-dto';
import { ReabrirProvaDto } from '~/domain/dto/reabrir-prova-dto';

const obterDadosResumoGeralProvas = (
  page: number,
  filtros: FiltroPrincipalProps,
): Promise<AxiosResponse<PaginacaoDto>> => {
  const params = {
    anoLetivo: filtros.anoLetivo,
    modalidade: filtros.modalidade,
    dreId: filtros.dre,
    ueId: filtros.ue,
    anoEscolar: filtros.anoEscolar,
    turmaId: filtros.turma,
    provasId: filtros.prova,
    provaSituacao: filtros.situacaoProva,
    numeroPagina: page,
    numeroRegistros: 10,
  };
  return api.get('/api/v1/resumo-geral/provas', {
    params,
    paramsSerializer(params) {
      return queryString.stringify(params, {
        skipEmptyString: true,
        skipNull: true,
      });
    },
  });
};

const obterDadosResumoGeralTurma = (
  turmaId: number,
  provaId: number,
): Promise<AxiosResponse<AlunoTurmaDto[]>> =>
  api.get(`/api/v1/resumo/turma/${turmaId}/prova/${provaId}/alunos`);

const reabrirProvaAluno = (dtoReabrir: ReabrirProvaDto): Promise<AxiosResponse<boolean>> => {
  const params = dtoReabrir;
  return api.post('/api/v1/', {
    params,
  });
};

export default {
  obterDadosResumoGeralProvas,
  obterDadosResumoGeralTurma,
  reabrirProvaAluno,
};
