import { Button, Col, Row } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { SelectValueType } from '~/domain/type/select';
import { setFiltroAtual } from '~/redux/modules/filtro-principal/actions';
import { FiltroAtualProps } from '~/redux/modules/filtro-principal/reducers';
import AnosEscolares from './anos-escolares';
import AnosLetivos from './anos-letivos';
import Dre from './dres';
import Modalidade from './modalidade';
import Provas from './provas';
import SituacoesProvas from './situacoes-provas';
import { LabelPopover } from './styles';
import Turmas from './turmas';
import Ue from './ues';

interface CamposFiltroPrincipalProps {
  filtroAtual: FiltroAtualProps;
}

const CamposFiltroPrincipal: React.FC<CamposFiltroPrincipalProps> = ({ filtroAtual }) => {
  const dispatch = useDispatch();

  const [anoLetivo, setAnoLetivo] = useState<SelectValueType>(null);
  const [anosLetivos, setAnosLetivos] = useState<DefaultOptionType[]>(filtroAtual.anosLetivos);

  const [situacoesProvas, setSituacoesProvas] = useState<DefaultOptionType[]>(
    filtroAtual.situacoesProvas,
  );
  const [situacaoProva, setSituacaoProva] = useState<SelectValueType>(null);

  const [provas, setProvas] = useState<DefaultOptionType[]>(filtroAtual.provas);
  const [prova, setProva] = useState<SelectValueType>(null);

  const [modalidades, setModalidades] = useState<DefaultOptionType[]>(filtroAtual.modalidades);
  const [modalidade, setModalidade] = useState<SelectValueType>(null);

  const [dres, setDres] = useState<DefaultOptionType[]>(filtroAtual.dres);
  const [dre, setDre] = useState<SelectValueType>(null);

  const [ues, setUes] = useState<DefaultOptionType[]>(filtroAtual.ues);
  const [ue, setUe] = useState<SelectValueType>(null);

  const [anosEscolares, setAnosEscolares] = useState<DefaultOptionType[]>(
    filtroAtual.anosEscolares,
  );
  const [anoEscolar, setAnoEscolar] = useState<SelectValueType>(null);

  const [turmas, setTurmas] = useState<DefaultOptionType[]>(filtroAtual.turmas);
  const [turma, setTurma] = useState<SelectValueType>(null);

  const onClickAplicarFiltro = () => {
    dispatch(
      setFiltroAtual({
        anoLetivo,
        situacaoProva,
        prova,
        modalidade,
        dre,
        ue,
        anoEscolar,
        turma,
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
    <div>
      <Row>
        <LabelPopover>Selecione itens abaixo para filtrar as informações</LabelPopover>
      </Row>
      <Row gutter={[11, 11]}>
        <Col span={4}>
          <AnosLetivos
            value={anoLetivo}
            onChange={setAnoLetivo}
            setAnosLetivos={setAnosLetivos}
            options={anosLetivos}
          />
        </Col>
        <Col span={8}>
          <SituacoesProvas
            value={situacaoProva}
            onChange={setSituacaoProva}
            setSituacoesProvas={setSituacoesProvas}
            options={situacoesProvas}
          />
        </Col>
        <Col span={12}>
          <Provas
            value={prova}
            onChange={setProva}
            setProvas={setProvas}
            options={provas}
            anoLetivo={anoLetivo}
            situacaoProva={situacaoProva}
          />
        </Col>
        <Col span={8}>
          <Modalidade
            value={modalidade}
            onChange={setModalidade}
            setModalidades={setModalidades}
            options={modalidades}
          />
        </Col>
        <Col span={16}>
          <Dre value={dre} onChange={setDre} setDres={setDres} options={dres} />
        </Col>
        <Col span={24}>
          <Ue value={ue} onChange={setUe} setUes={setUes} options={ues} dre={dre} />
        </Col>
        <Col span={7}>
          <AnosEscolares
            value={anoEscolar}
            onChange={setAnoEscolar}
            setAnosEscolares={setAnosEscolares}
            options={anosEscolares}
            anoLetivo={anoLetivo}
            ue={ue}
          />
        </Col>
        <Col span={12}>
          <Turmas
            value={turma}
            onChange={setTurma}
            setTurmas={setTurmas}
            options={turmas}
            anoLetivo={anoLetivo}
            ue={ue}
            modalidade={modalidade}
            anoEscolar={anoEscolar}
          />
        </Col>
        <Col span={5}>
          <Button style={{ width: '100%' }} type='primary' onClick={() => onClickAplicarFiltro()}>
            Aplicar filtro
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(CamposFiltroPrincipal);
