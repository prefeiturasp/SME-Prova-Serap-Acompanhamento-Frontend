import { DefaultOptionType } from 'antd/lib/select';
import { SelecioneDto } from '~/domain/dto/selecione-dto';

export const converterSelecineDto = (dto: SelecioneDto[]): DefaultOptionType[] => {
  return dto.map((item) => ({
    value: item.valor,
    label: item.descricao,
  }));
};
