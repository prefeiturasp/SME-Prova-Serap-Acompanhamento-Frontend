import { Button, Col, Form, Row } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '~/redux';
import { setFiltroAtual } from '~/redux/modules/filtro-principal/actions';

import { FiltroAtualProps } from '~/redux/modules/filtro-principal/reducers';
import { setAbrirFiltroPrincipal } from '~/redux/modules/geral/actions';
import { TagItem } from '../../tag';
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

  const abrirFiltroPrincipal = useSelector((state: AppState) => state.geral.abrirFiltroPrincipal);

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

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      anoLetivo: filtroAtual.anoLetivo,
      situacaoProva: filtroAtual.situacaoProva,
      prova: filtroAtual.prova,
      modalidade: filtroAtual.modalidade,
      dre: filtroAtual.dre,
      ue: filtroAtual.ue,
      anoEscolar: filtroAtual.anoEscolar,
      turma: filtroAtual.turma,
    });
    setAnosLetivos(filtroAtual.anosLetivos);
    setSituacoesProvas(filtroAtual.situacoesProvas);
    setProvas(filtroAtual.provas);
    setModalidades(filtroAtual.modalidades);
    setDres(filtroAtual.dres);
    setUes(filtroAtual.ues);
    setAnosEscolares(filtroAtual.anosEscolares);
    setTurmas(filtroAtual.turmas);
  }, [form, filtroAtual, abrirFiltroPrincipal]);

  const onClickAplicarFiltro = (valores: FiltroAtualProps) => {
    const dadosTags: TagItem[] = [];

    if (valores.anoLetivo) {
      dadosTags.push({
        nomeCampo: 'anoLetivo',
        valor: valores.anoLetivo,
        descricao: anosLetivos.find((item) => item.value === valores.anoLetivo)?.label,
        bloquearRemover: true,
      });
    }
    if (valores.situacaoProva) {
      dadosTags.push({
        nomeCampo: 'situacaoProva',
        valor: valores.situacaoProva,
        descricao: situacoesProvas.find((item) => item.value === valores.situacaoProva)?.label,
        bloquearRemover: true,
      });
    }
    if (valores.prova) {
      dadosTags.push({
        nomeCampo: 'prova',
        valor: valores.prova,
        descricao: provas.find((item) => item.value === valores.prova)?.label,
      });
    }
    if (valores.modalidade) {
      dadosTags.push({
        nomeCampo: 'modalidade',
        valor: valores.modalidade,
        descricao: modalidades.find((item) => item.value === valores.modalidade)?.label,
      });
    }
    if (valores.dre) {
      dadosTags.push({
        nomeCampo: 'dre',
        valor: valores.dre,
        descricao: dres.find((item) => item.value === valores.dre)?.label,
      });
    }
    if (valores.ue) {
      dadosTags.push({
        nomeCampo: 'ue',
        valor: valores.ue,
        descricao: ues.find((item) => item.value === valores.ue)?.label,
      });
    }
    if (valores.anoEscolar) {
      dadosTags.push({
        nomeCampo: 'turma',
        valor: valores.anoEscolar,
        descricao: anosEscolares.find((item) => item.value === valores.turma)?.label,
      });
    }
    if (valores.turma) {
      dadosTags.push({
        nomeCampo: 'turma',
        valor: valores.turma,
        descricao: turmas.find((item) => item.value === valores.turma)?.label,
      });
    }

    dispatch(
      setFiltroAtual({
        dadosTags,
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
    dispatch(setAbrirFiltroPrincipal(false));
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
