import { DefaultOptionType } from 'antd/lib/select';
import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

import Select from '~/components/select';
import { SelectValueType } from '~/domain/type/select';
import filtroService from '~/services/filtro-service';

interface DreProps {
  onChange: (value: SelectValueType) => void;
  value?: SelectValueType;
  setDres: Dispatch<SetStateAction<DefaultOptionType[]>>;
  options: DefaultOptionType[];
}

const Dre: React.FC<DreProps> = ({ onChange, value, setDres, options }) => {
  const obterDre = useCallback(async () => {
    const resposta = await filtroService.obterDres();

    if (resposta?.length) {
      setDres(resposta);
      if (resposta.length === 1) onChange(resposta[0].value ?? null);
    } else {
      setDres([]);
      onChange(null);
    }
  }, [onChange, setDres]);

  console.log('render Dre');

  useEffect(() => {
    console.log('obterDre');
    obterDre();
  }, [obterDre]);

  return (
    <Select
      value={value}
      options={options}
      onChange={(value) => onChange(value)}
      showSearch
      allowClear
      placeholder='Diretoria Regional de Educação (DRE)'
    />
  );
};

export default React.memo(Dre);
