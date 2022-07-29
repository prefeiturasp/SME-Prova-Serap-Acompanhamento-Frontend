import { DefaultOptionType } from 'antd/lib/select';
import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

import Select from '~/components/select';
import { SelectValueType } from '~/domain/type/select';
import filtroService from '~/services/filtro-service';

interface TurmasProps {
  onChange: (value: SelectValueType) => void;
  value?: SelectValueType;
  setTurmas: Dispatch<SetStateAction<DefaultOptionType[]>>;
  options: DefaultOptionType[];
  anoLetivo: SelectValueType;
  ue: SelectValueType;
  modalidade: SelectValueType;
  anoEscolar: SelectValueType;
}

const Turmas: React.FC<TurmasProps> = ({
  onChange,
  value,
  setTurmas,
  options,
  anoLetivo,
  ue,
  modalidade,
  anoEscolar,
}) => {
  const obterTurmas = useCallback(async () => {
    const resposta = await filtroService.obterTurmas(anoLetivo, ue, modalidade, anoEscolar);

    if (resposta?.length) {
      setTurmas(resposta);
      if (resposta.length === 1) onChange(resposta[0].value ?? null);
    } else {
      setTurmas([]);
      onChange(null);
    }
  }, [onChange, setTurmas, anoLetivo, ue, modalidade, anoEscolar]);

  console.log('render Turmas');

  useEffect(() => {
    console.log('obterTurmas');
    if (anoLetivo && ue && modalidade && anoEscolar) {
      obterTurmas();
    } else {
      setTurmas([]);
      onChange(null);
    }
  }, [obterTurmas, setTurmas, onChange, anoLetivo, ue, modalidade, anoEscolar]);

  return (
    <Select
      value={value}
      options={options}
      onChange={(value) => onChange(value)}
      placeholder='Turma'
      allowClear
      showSearch
    />
  );
};

export default React.memo(Turmas);
