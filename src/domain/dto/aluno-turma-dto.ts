export interface AlunoTurmaDto {
  ra: number;
  nomeEstudante: string;
  fezDownload: boolean;
  inicioProva?: Date;
  fimProva?: Date;
  tempoMedio?: number;
  questoesRespondidas?: number;
  ultimaReabertura?: string;
  podeReabrirProva: boolean;
  situacaoProvaAluno: number;
}
