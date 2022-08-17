import { PaginacaoDto } from '~/domain/dto/paginacao-dto';
import api from './api';
import queryString from 'query-string';
import { FiltroPrincipalProps } from '~/redux/modules/filtro-principal/reducers';
import { AxiosResponse } from 'axios';

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

const obterDadosResumoGeralTurma = (idProva: number): Promise<any> => {
  console.log(idProva);

  const mock: any[] = [];

  for (let i = 0; i < 10; ++i) {
    mock.push({
      key: i.toString(),
      nomeEstudante: 'Arthur Zemey Fahael - ' + i,
      fezDownload: i > 5 ? true : false,
      inicioProva: '06/07/2022 - 15:45',
      fimProva: '06/07/2022 - 16:45',
      tempoMedio: '60min',
      questoesRespondidas: 28,
    });
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: mock });
    }, 2000);
  });
};

export default {
  obterDadosResumoGeralProvas,
  obterDadosResumoGeralTurma,
};
