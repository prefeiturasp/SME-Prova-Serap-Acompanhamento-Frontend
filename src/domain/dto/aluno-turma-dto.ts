export interface AlunoTurmaDto {
  ra: number;
  nomeEstudante: string;
  fezDownload: boolean;
  inicioProva?: Date;
  fimProva?: Date;
  tempoTotal?: number;
  questoesRespondidas?: number;
  ultimaReabertura?: string;
  podeReabrirProva: boolean;
  situacaoProvaAluno: number;
}
