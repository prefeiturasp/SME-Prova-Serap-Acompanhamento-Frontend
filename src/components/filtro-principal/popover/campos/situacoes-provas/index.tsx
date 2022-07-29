import { DefaultOptionType } from 'antd/lib/select';
import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

import Select from '~/components/select';
import { SelectValueType } from '~/domain/type/select';
import filtroService from '~/services/filtro-service';

interface SituacoesProvasProps {
  onChange: (value: SelectValueType) => void;
  value?: SelectValueType;
  setSituacoesProvas: Dispatch<SetStateAction<DefaultOptionType[]>>;
  options: DefaultOptionType[];
}

const SituacoesProvas: React.FC<SituacoesProvasProps> = ({
  onChange,
  value,
  setSituacoesProvas,
  options,
}) => {
  const obterSituacoes = useCallback(async () => {
    const resposta = await filtroService.obterSituacoes();

    if (resposta?.length) {
      setSituacoesProvas(resposta);
      if (resposta.length === 1) onChange(resposta[0].value ?? null);
    } else {
      setSituacoesProvas([]);
      onChange(null);
    }
  }, [onChange, setSituacoesProvas]);

  console.log('render SituacoesProvas');

  useEffect(() => {
    console.log('obterSituacoes');
    obterSituacoes();
  }, [obterSituacoes]);

  return <Select value={value} options={options} onChange={(value) => onChange(value)} />;
};

export default React.memo(SituacoesProvas);
