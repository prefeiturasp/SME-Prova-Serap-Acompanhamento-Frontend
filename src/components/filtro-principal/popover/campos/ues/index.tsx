import { DefaultOptionType } from 'antd/lib/select';
import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

import Select from '~/components/select';
import { SelectValueType } from '~/domain/type/select';
import filtroService from '~/services/filtro-service';

interface UeProps {
  onChange: (value: SelectValueType) => void;
  value?: SelectValueType;
  setUes: Dispatch<SetStateAction<DefaultOptionType[]>>;
  options: DefaultOptionType[];
  dre: SelectValueType;
}

const Ue: React.FC<UeProps> = ({ onChange, value, setUes, options, dre }) => {
  const obterUe = useCallback(async () => {
    const resposta = await filtroService.obterUes(dre);

    if (resposta?.length) {
      setUes(resposta);
      if (resposta.length === 1) onChange(resposta[0].value ?? null);
    } else {
      setUes([]);
      onChange(null);
    }
  }, [onChange, setUes, dre]);

  console.log('render Ue');

  useEffect(() => {
    console.log('obterUe');
    if (dre) {
      obterUe();
    } else {
      setUes([]);
      onChange(null);
    }
  }, [setUes, dre, obterUe, onChange]);

  return (
    <Select
      value={value}
      options={options}
      onChange={(value) => onChange(value)}
      showSearch
      allowClear
      placeholder='Diretoria Regional de Educação (Ue)'
    />
  );
};

export default React.memo(Ue);
