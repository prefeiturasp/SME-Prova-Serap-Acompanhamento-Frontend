import { DefaultOptionType } from 'antd/lib/select';
import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

import Select from '~/components/select';
import { SelectValueType } from '~/domain/type/select';
import filtroService from '~/services/filtro-service';

interface ProvasProps {
  onChange: (value: SelectValueType) => void;
  value?: SelectValueType;
  setProvas: Dispatch<SetStateAction<DefaultOptionType[]>>;
  options: DefaultOptionType[];
  anoLetivo: SelectValueType;
  situacaoProva: SelectValueType;
}

const Provas: React.FC<ProvasProps> = ({
  onChange,
  value,
  setProvas,
  options,
  anoLetivo,
  situacaoProva,
}) => {
  const obterProvas = useCallback(async () => {
    const resposta = await filtroService.obterProvas(anoLetivo, situacaoProva);

    if (resposta?.length) {
      setProvas(resposta);
      if (resposta.length === 1) onChange(resposta[0].value ?? null);
    } else {
      setProvas([]);
      onChange(null);
    }
  }, [onChange, setProvas, anoLetivo, situacaoProva]);

  console.log('render Provas');

  useEffect(() => {
    console.log('obterProvas');
    if (anoLetivo && situacaoProva) {
      obterProvas();
    } else {
      setProvas([]);
      onChange(null);
    }
  }, [obterProvas, setProvas, onChange, anoLetivo, situacaoProva]);

  return (
    <Select
      value={value}
      options={options}
      onChange={(value) => onChange(value)}
      placeholder='Prova'
      allowClear
      showSearch
    />
  );
};

export default React.memo(Provas);
