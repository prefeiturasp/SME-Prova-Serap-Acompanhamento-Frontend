import { DefaultOptionType } from 'antd/lib/select';
import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

import Select from '~/components/select';
import { SelectValueType } from '~/domain/type/select';
import filtroService from '~/services/filtro-service';

interface AnosEscolaresProps {
  onChange: (value: SelectValueType) => void;
  value?: SelectValueType;
  setAnosEscolares: Dispatch<SetStateAction<DefaultOptionType[]>>;
  options: DefaultOptionType[];
  anoLetivo: SelectValueType;
  ue: SelectValueType;
}

const AnosEscolares: React.FC<AnosEscolaresProps> = ({
  onChange,
  value,
  setAnosEscolares,
  options,
  anoLetivo,
  ue,
}) => {
  const obterAnosEscolares = useCallback(async () => {
    const resposta = await filtroService.obterAnosEscolares(anoLetivo, ue);

    if (resposta?.length) {
      setAnosEscolares(resposta);
      if (resposta.length === 1) onChange(resposta[0].value ?? null);
    } else {
      setAnosEscolares([]);
      onChange(null);
    }
  }, [onChange, setAnosEscolares, anoLetivo, ue]);

  console.log('render AnosEscolares');

  useEffect(() => {
    console.log('obterAnosEscolares');
    if (anoLetivo && ue) {
      obterAnosEscolares();
    } else {
      setAnosEscolares([]);
      onChange(null);
    }
  }, [obterAnosEscolares, setAnosEscolares, onChange, anoLetivo, ue]);

  return (
    <Select
      value={value}
      options={options}
      onChange={(value) => onChange(value)}
      placeholder='Ano Escolar'
      allowClear
      showSearch
    />
  );
};

export default React.memo(AnosEscolares);
