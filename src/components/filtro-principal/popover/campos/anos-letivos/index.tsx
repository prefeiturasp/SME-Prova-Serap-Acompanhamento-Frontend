import { Form, FormProps } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

import Select from '~/components/select';
import filtroService from '~/services/filtro-service';

interface AnosLetivosProps extends FormProps {
  options: DefaultOptionType[];
  setAnosLetivos: Dispatch<SetStateAction<DefaultOptionType[]>>;
}

const AnosLetivos: React.FC<AnosLetivosProps> = ({ form, options, setAnosLetivos }) => {
  const obterAnosLetivos = useCallback(async () => {
    const resposta = await filtroService.obterAnosLetivos();
    if (resposta?.length) {
      setAnosLetivos(resposta);
      form?.setFieldValue('anoLetivo', resposta[0].value);
    } else {
      form?.setFieldValue('anoLetivo', null);
    }
  }, [form, setAnosLetivos]);

  useEffect(() => {
    obterAnosLetivos();
  }, [obterAnosLetivos]);

  return (
    <Form.Item name='anoLetivo'>
      <Select options={options} disabled={options?.length === 1} />
    </Form.Item>
  );
};

export default React.memo(AnosLetivos);
