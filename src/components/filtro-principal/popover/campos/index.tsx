import { Button, Col, Form, Row } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFiltroAtual } from '~/redux/modules/filtro-principal/actions';

import { FiltroAtualProps } from '~/redux/modules/filtro-principal/reducers';
import AnosEscolares from './anos-escolares';
import AnosLetivos from './anos-letivos';
import Dres from './dres';
import Modalidade from './modalidade';
import Provas from './provas';
import SituacoesProvas from './situacoes-provas';
import { LabelPopover } from './styles';
import Turmas from './turmas';
import Ues from './ues';

interface CamposFiltroPrincipalProps {
  filtroAtual: FiltroAtualProps;
}

const CamposFiltroPrincipal: React.FC<CamposFiltroPrincipalProps> = ({ filtroAtual }) => {
  const dispatch = useDispatch();

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log('Failed:', errorInfo);
  // };

  const [form] = Form.useForm();

  const [anosLetivos, setAnosLetivos] = useState<DefaultOptionType[]>(filtroAtual.anosLetivos);
  const [situacoesProvas, setSituacoesProvas] = useState<DefaultOptionType[]>(
    filtroAtual.situacoesProvas,
  );
  const [provas, setProvas] = useState<DefaultOptionType[]>(filtroAtual.provas);
  const [modalidades, setModalidades] = useState<DefaultOptionType[]>(filtroAtual.modalidades);
  const [dres, setDres] = useState<DefaultOptionType[]>(filtroAtual.dres);
  const [ues, setUes] = useState<DefaultOptionType[]>(filtroAtual.ues);
  const [anosEscolares, setAnosEscolares] = useState<DefaultOptionType[]>(
    filtroAtual.anosEscolares,
  );
  const [turmas, setTurmas] = useState<DefaultOptionType[]>(filtroAtual.turmas);

  const onClickAplicarFiltro = (valores: FiltroAtualProps) => {
    dispatch(
      setFiltroAtual({
        anoLetivo: valores.anoLetivo,
        situacaoProva: valores.situacaoProva,
        prova: valores.prova,
        modalidade: valores.modalidade,
        dre: valores.dre,
        ue: valores.ue,
        anoEscolar: valores.anoEscolar,
        turma: valores.turma,
        anosLetivos,
        situacoesProvas,
        provas,
        modalidades,
        dres,
        ues,
        anosEscolares,
        turmas,
      }),
    );
  };

  return (
    <>
      <Row>
        <LabelPopover>Selecione itens abaixo para filtrar as informações</LabelPopover>
      </Row>
      <Form
        form={form}
        initialValues={{ anosLetivos: [] }}
        onFinish={onClickAplicarFiltro}
        autoComplete='off'
      >
        <Row gutter={11}>
          <Col span={4}>
            <AnosLetivos form={form} setAnosLetivos={setAnosLetivos} options={anosLetivos} />
          </Col>
          <Col span={8}>
            <SituacoesProvas
              form={form}
              setSituacoesProvas={setSituacoesProvas}
              options={situacoesProvas}
            />
          </Col>
          <Col span={12}>
            <Provas form={form} setProvas={setProvas} options={provas} />
          </Col>
          <Col span={8}>
            <Modalidade form={form} setModalidades={setModalidades} options={modalidades} />
          </Col>
          <Col span={16}>
            <Dres form={form} setDres={setDres} options={dres} />
          </Col>
          <Col span={24}>
            <Ues form={form} setUes={setUes} options={ues} />
          </Col>
          <Col span={7}>
            <AnosEscolares
              form={form}
              setAnosEscolares={setAnosEscolares}
              options={anosEscolares}
            />
          </Col>
          <Col span={12}>
            <Turmas form={form} setTurmas={setTurmas} options={turmas} />
          </Col>
          <Col span={5}>
            <Form.Item>
              <Button htmlType='submit' style={{ width: '100%' }} type='primary'>
                Aplicar filtro
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default React.memo(CamposFiltroPrincipal);
