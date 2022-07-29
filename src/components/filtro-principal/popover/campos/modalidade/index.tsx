import { DefaultOptionType } from 'antd/lib/select';
import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

import Select from '~/components/select';
import { SelectValueType } from '~/domain/type/select';
import filtroService from '~/services/filtro-service';

interface ModalidadeProps {
  onChange: (value: SelectValueType) => void;
  value?: SelectValueType;
  setModalidades: Dispatch<SetStateAction<DefaultOptionType[]>>;
  options: DefaultOptionType[];
}

const Modalidade: React.FC<ModalidadeProps> = ({ onChange, value, setModalidades, options }) => {
  const obterModalidade = useCallback(async () => {
    const resposta = await filtroService.obterModalidades();

    if (resposta?.length) {
      setModalidades(resposta);
      if (resposta.length === 1) onChange(resposta[0].value ?? null);
    } else {
      setModalidades([]);
      onChange(null);
    }
  }, [onChange, setModalidades]);

  console.log('render Modalidade');

  useEffect(() => {
    console.log('obterModalidade');
    obterModalidade();
  }, [obterModalidade]);

  return (
    <Select
      value={value}
      options={options}
      onChange={(value) => onChange(value)}
      allowClear
      placeholder='Modalidade'
    />
  );
};

export default React.memo(Modalidade);
