import { ResumoGeralProvaDto } from './resumo-geral-prova-dto';

export interface ResumoGeralDetalhesDto {
  nome: string;
  id: number;
  item: ResumoGeralProvaDto;
}
