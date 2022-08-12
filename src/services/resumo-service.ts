import { PaginacaoDto } from '~/domain/dto/paginacao-dto';

const obterDadosResumoGeralProvas = (page: number): Promise<PaginacaoDto> => {
  const mock: any[] = [];
  if (page === 1) {
    for (let i = 0; i < 10; ++i) {
      mock.push({
        key: i.toString(),
        idProva: 2,
        tituloProva: 'Prova EJA Complementar - CH 1o Semestre 2022',
        totalAlunos: 111,
        provasIniciadas: 222,
        provasNaoFinalizadas: 20,
        provasFinalizadas: 1212,
        tempoMedio: '50min',
        percentualRealizado: '45.15%',
        dataInicio: '01/01/2020',
        dataFim: '01/01/2020',
        qtdQuestoesProva: '10',
        totalQuestoes: '20',
        respondidas: '10',
        percentualRespondido: '50%',
      });
    }
  }
  if (page === 2) {
    for (let i = 0; i < 5; ++i) {
      mock.push({
        key: i.toString(),
        idProva: 10,
        tituloProva: 'Prova EJA Básica - CH 1o Semestre 2022',
        totalAlunos: 3685,
        provasIniciadas: 116,
        provasNaoFinalizadas: 80,
        provasFinalizadas: 1349,
        tempoMedio: '48min',
        percentualRealizado: '36.65%',
      });
    }
  }

  const mockPaginacao: PaginacaoDto = {
    items: mock,
    totalRegistros: 15,
    totalPaginas: 2,
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPaginacao);
    }, 2000);
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
