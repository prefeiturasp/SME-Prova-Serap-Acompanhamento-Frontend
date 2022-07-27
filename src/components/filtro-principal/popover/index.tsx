import { Button, Col, Popover, Row } from 'antd';
import React, { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import Select from '~/components/select';
import { AppState } from '~/redux';
import { setAbrirFiltroPrincipal } from '~/redux/modules/filtro-principal/actions';
import { Colors } from '~/styles/colors';

const LabelPopover = styled.div`
  font-size: 11px;
  font-weight: 400;
  color: ${Colors.Label};
  margin-bottom: 10px;
`;

const PopoverFiltroPrincipal: React.FC<{ children: ReactNode }> = ({ children }) => {
  const displatch = useDispatch();

  const abrirFiltroPrincipal = useSelector(
    (state: AppState) => state.filtroPrincipal.abrirFiltroPrincipal,
  );

  const hide = () => {
    displatch(setAbrirFiltroPrincipal(false));
  };

  const handleVisibleChange = (newVisible: boolean) => {
    displatch(setAbrirFiltroPrincipal(newVisible));
  };

  const content = (
    <div>
      <Row>
        <LabelPopover>Selecione itens abaixo para filtrar as informações</LabelPopover>
      </Row>
      <Row gutter={[11, 11]}>
        <Col span={4}>
          <Select
            value={2022}
            options={[
              { label: '2022', value: 2022 },
              { label: '2021', value: 2021 },
            ]}
          />
        </Col>
        <Col span={8}>
          <Select
            value={1}
            options={[
              { label: 'Provas em andamento', value: 1 },
              { label: 'Provas concluídas', value: 2 },
            ]}
          />
        </Col>
        <Col span={12}>
          <Select
            placeholder='Prova'
            allowClear
            showSearch
            options={[
              { label: 'Ciências Humanas', value: 1 },
              { label: 'Ciências da Natureza', value: 2 },
            ]}
          />
        </Col>
        <Col span={8}>
          <Select
            allowClear
            placeholder='Modalidade'
            options={[
              { label: 'Fundamental', value: 1 },
              { label: 'EJA', value: 2 },
            ]}
          />
        </Col>
        <Col span={16}>
          <Select
            showSearch
            allowClear
            placeholder='Diretoria Regional de Educação (DRE)'
            options={[
              { label: 'DRE 01', value: 1 },
              { label: 'Diretoria Regional de Educação Campo Limpo', value: 2 },
            ]}
          />
        </Col>
        <Col span={24}>
          <Select
            showSearch
            allowClear
            placeholder='Unidade Educacional (UE)'
            options={[
              { label: 'CEU EMEF BUTANTA', value: 1 },
              { label: 'CEU EMEF CESAR ARRUDA CASTANHO, DEP. ', value: 2 },
            ]}
          />
        </Col>
        <Col span={7}>
          <Select
            showSearch
            allowClear
            placeholder='Ano Escolar'
            options={[
              { label: '1º Ano', value: 1 },
              { label: '2º Ano', value: 2 },
            ]}
          />
        </Col>
        <Col span={12}>
          <Select
            showSearch
            allowClear
            placeholder='Turma'
            options={[
              { label: 'EF - 5A', value: 1 },
              { label: 'EF - 5B', value: 2 },
            ]}
          />
        </Col>
        <Col span={5}>
          <Button style={{ width: '100%' }} type='primary'>
            Aplicar filtro
          </Button>
        </Col>
      </Row>
    </div>
  );

  return (
    <Popover
      overlayInnerStyle={{ width: '620px', height: '220px' }}
      overlayStyle={{ padding: 0 }}
      showArrow={false}
      content={content}
      trigger='click'
      visible={abrirFiltroPrincipal}
      onVisibleChange={(v) => handleVisibleChange(v)}
      placement='bottom'
    >
      {children}
    </Popover>
  );
};

export default PopoverFiltroPrincipal;
