import { Form, FormProps } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

import Select from '~/components/select';
import filtroService from '~/services/filtro-service';

interface AnosEscolaresProps extends FormProps {
  setAnosEscolares: Dispatch<SetStateAction<DefaultOptionType[]>>;
  options: DefaultOptionType[];
}

const AnosEscolares: React.FC<AnosEscolaresProps> = ({ form, setAnosEscolares, options }) => {
  const nomeCampo = 'anoEscolar';

  const anoLetivo = Form.useWatch('anoLetivo', form);
  const ue = Form.useWatch('ue', form);

  const obterAnosEscolares = useCallback(async () => {
    const resposta = await filtroService.obterAnosEscolares(anoLetivo, ue);

    if (resposta?.length) {
      setAnosEscolares(resposta);
      if (resposta.length === 1) form?.setFieldValue(nomeCampo, resposta[0].value);
    } else {
      setAnosEscolares([]);
      form?.setFieldValue(nomeCampo, null);
    }
  }, [form, setAnosEscolares, anoLetivo, ue]);

  console.log('render AnosEscolares');

  useEffect(() => {
    console.log('obterAnosEscolares');
    if (anoLetivo && ue) {
      obterAnosEscolares();
    } else {
      setAnosEscolares([]);
      form?.setFieldValue(nomeCampo, null);
    }
  }, [obterAnosEscolares, setAnosEscolares, form, anoLetivo, ue]);

  return (
    <Form.Item name={nomeCampo}>
      <Select
        options={options}
        disabled={options?.length === 1}
        placeholder='Ano Escolar'
        allowClear
        showSearch
      />
    </Form.Item>
  );
};

export default React.memo(AnosEscolares);
