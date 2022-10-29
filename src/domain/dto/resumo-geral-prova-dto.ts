import { AlunoTurmaDto } from './aluno-turma-dto';

export interface ResumoGeralProvaDto {
  provaId: number;
  dreId?: number;
  ueId?: number;
  turmaId?: number;
  tituloProva: string;
  totalAlunos: number;
  provasIniciadas: number;
  provasNaoFinalizadas: number;
  tempoMedio: number;
  provasFinalizadas: number;
  pencentualRealizado: number;
  detalheProva: AlunoTurmaDto;
}
