import { DefaultOptionType } from 'antd/lib/select';
import { SelecioneDto } from '~/domain/dto/selecione-dto';

export const converterSelecineDto = (dto: SelecioneDto[]): DefaultOptionType[] => {
  return dto.map((item) => ({
    value: item.valor,
    label: item.descricao,
  }));
};

export const voltarAoSerap = () => {
  sessionStorage.removeItem('persist:SERAP-ACOMPANHAMENTO-PERSIST');
  const URL_SERAP = process.env.VITE_SME_SERAP;
  if (!URL_SERAP) {
    throw new Error('A URL SERAP não está definida!');
  }
  window.location.replace(URL_SERAP);
};
