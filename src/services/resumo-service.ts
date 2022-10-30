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
  return api.get('/api/v1/resumo/provas', {
    params,
    paramsSerializer(params) {
      return queryString.stringify(params, {
        skipEmptyString: true,
        skipNull: true,
      });
    },
  });
};

const obterDadosResumoGeralProvasDres = (
  page: number,
  filtros: FiltroPrincipalProps,
  provaId: number,
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
  return api.get(`/api/v1/resumo/dres/prova/${provaId}`, {
    params,
    paramsSerializer(params) {
      return queryString.stringify(params, {
        skipEmptyString: true,
        skipNull: true,
      });
    },
  });
};

const obterDadosResumoGeralProvasUes = (
  page: number,
  filtros: FiltroPrincipalProps,
  provaId: number,
  dreId?: number,
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
  return api.get(`/api/v1/resumo/ues/dre/${dreId}/prova/${provaId}`, {
    params,
    paramsSerializer(params) {
      return queryString.stringify(params, {
        skipEmptyString: true,
        skipNull: true,
      });
    },
  });
};

const obterDadosResumoGeralProvasTurmas = (
  page: number,
  filtros: FiltroPrincipalProps,
  provaId: number,
  ueId?: number,
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

  return api.get(`/api/v1/resumo/turmas/ue/${ueId}/prova/${provaId}`, {
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
  api.get(`/api/v1/prova-aluno/prova/${provaId}/turma/${turmaId}`);

const reabrirProvaAluno = (dtoReabrir: ReabrirProvaDto): Promise<AxiosResponse<boolean>> =>
  api.post('/api/v1/prova-aluno/reabrir-prova-aluno', {
    alunoRa: dtoReabrir.alunoRa,
    provaId: dtoReabrir.provaId,
  });

export default {
  obterDadosResumoGeralProvas,
  obterDadosResumoGeralProvasDres,
  obterDadosResumoGeralProvasUes,
  obterDadosResumoGeralProvasTurmas,
  obterDadosResumoGeralTurma,
  reabrirProvaAluno,
};
