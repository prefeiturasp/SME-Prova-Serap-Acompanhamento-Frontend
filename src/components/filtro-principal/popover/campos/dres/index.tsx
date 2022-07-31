import { Form, FormProps } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

import Select from '~/components/select';
import filtroService from '~/services/filtro-service';

interface DreProps extends FormProps {
  setDres: Dispatch<SetStateAction<DefaultOptionType[]>>;
  options: DefaultOptionType[];
}

const Dre: React.FC<DreProps> = ({ form, setDres, options }) => {
  const nomeCampo = 'dre';

  const obterDre = useCallback(async () => {
    const resposta = await filtroService.obterDres();

    if (resposta?.length) {
      setDres(resposta);
      if (resposta.length === 1) form?.setFieldValue(nomeCampo, resposta[0].value);
    } else {
      setDres([]);
      form?.setFieldValue(nomeCampo, null);
    }
  }, [form, setDres]);

  console.log('render Dre');

  useEffect(() => {
    console.log('obterDre');
    obterDre();
  }, [obterDre]);

  return (
    <Form.Item name={nomeCampo}>
      <Select
        options={options}
        disabled={options?.length === 1}
        placeholder='Diretoria Regional de Educação (DRE)'
        showSearch
        allowClear
      />
    </Form.Item>
  );
};

export default React.memo(Dre);
