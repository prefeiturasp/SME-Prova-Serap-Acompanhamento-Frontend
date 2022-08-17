export interface ResumoGeralProvaDto {
  provaId: string;
  tituloProva: boolean;
  totalAlunos: Date;
  provasIniciadas: Date;
  provasNaoFinalizadas: number;
  tempoMedio: number;
  provasFinalizadas: number;
  pencentualRealizado: number;
  detalheProva: number;
}
