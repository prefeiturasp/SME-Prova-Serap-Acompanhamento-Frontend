import { DefaultOptionType } from 'antd/lib/select';
import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

import Select from '~/components/select';
import { SelectValueType } from '~/domain/type/select';
import filtroService from '~/services/filtro-service';

interface AnosLetivosProps {
  onChange: (value: SelectValueType) => void;
  value?: SelectValueType;
  setAnosLetivos: Dispatch<SetStateAction<DefaultOptionType[]>>;
  options: DefaultOptionType[];
}

const AnosLetivos: React.FC<AnosLetivosProps> = ({ onChange, value, setAnosLetivos, options }) => {
  const obterAnosLetivos = useCallback(async () => {
    const resposta = await filtroService.obterAnosLetivos();

    if (resposta?.length) {
      setAnosLetivos(resposta);
      if (resposta.length === 1) onChange(resposta[0].value ?? null);
    } else {
      setAnosLetivos([]);
      onChange(null);
    }
  }, [onChange, setAnosLetivos]);

  console.log('render AnosLetivos');

  useEffect(() => {
    console.log('obterAnosLetivos');
    obterAnosLetivos();
  }, [obterAnosLetivos]);

  return <Select value={value} options={options} onChange={(value) => onChange(value)} />;
};

export default React.memo(AnosLetivos);
