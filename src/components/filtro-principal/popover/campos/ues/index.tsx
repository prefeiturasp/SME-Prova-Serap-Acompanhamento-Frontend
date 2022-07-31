import { Form, FormProps } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

import Select from '~/components/select';
import filtroService from '~/services/filtro-service';

interface UeProps extends FormProps {
  setUes: Dispatch<SetStateAction<DefaultOptionType[]>>;
  options: DefaultOptionType[];
}

const Ue: React.FC<UeProps> = ({ form, setUes, options }) => {
  const nomeCampo = 'ue';

  const dre = Form.useWatch('dre', form);

  const obterUe = useCallback(async () => {
    const resposta = await filtroService.obterUes(dre);

    if (resposta?.length) {
      setUes(resposta);
      if (resposta.length === 1) form?.setFieldValue(nomeCampo, resposta[0].value);
    } else {
      setUes([]);
      form?.setFieldValue(nomeCampo, null);
    }
  }, [form, setUes, dre]);

  console.log('render Ue');

  useEffect(() => {
    console.log('obterUe');
    if (dre) {
      obterUe();
    } else {
      setUes([]);
      form?.setFieldValue(nomeCampo, null);
    }
  }, [setUes, dre, obterUe, form]);

  return (
    <Form.Item name={nomeCampo}>
      <Select
        options={options}
        disabled={options?.length === 1}
        placeholder='Diretoria Regional de Educação (Ue)'
        allowClear
        showSearch
      />
    </Form.Item>
  );
};

export default React.memo(Ue);
