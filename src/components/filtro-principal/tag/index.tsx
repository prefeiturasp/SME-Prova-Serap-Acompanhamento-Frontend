import { Tag } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { SelectValueType } from '~/domain/type/select';
import { AppState } from '~/redux';
import { Colors } from '~/styles/colors';

const ContainerTag = styled(Tag)`
  font-size: 10.5px;
  color: ${Colors.Label};
  background: ${Colors.CinzaFundo};
  border: 1px solid ${Colors.CinzaBorda};
  height: 26px;
  border-radius: 2px;
  display: inline-flex;
  align-items: center;
  padding: 0px 5px;
`;

export interface TagItem {
  nomeCampo: string;
  valor: SelectValueType;
  descricao: React.ReactNode;
}

const TagFiltroPrincipal: React.FC = () => {
  const filtroPrincipal = useSelector((state: AppState) => state.filtroPrincipal);

  const [dadosTags, setDadosTags] = useState<TagItem[]>([]);

  const montarDados = useCallback(() => {
    const dadosTagsNovo: TagItem[] = [];
    const {
      anoLetivo,
      anosLetivos,
      situacaoProva,
      situacoesProvas,
      prova,
      provas,
      modalidade,
      modalidades,
      dre,
      dres,
      ue,
      ues,
      anoEscolar,
      anosEscolares,
      turma,
      turmas,
    } = filtroPrincipal;

    if (anoLetivo) {
      dadosTagsNovo.push({
        nomeCampo: 'anoLetivo',
        valor: anoLetivo,
        descricao: anosLetivos.find((item) => item.value === anoLetivo)?.label,
      });
    }
    if (situacaoProva) {
      dadosTagsNovo.push({
        nomeCampo: 'situacaoProva',
        valor: situacaoProva,
        descricao: situacoesProvas.find((item) => item.value === situacaoProva)?.label,
      });
    }
    if (prova) {
      dadosTagsNovo.push({
        nomeCampo: 'prova',
        valor: prova,
        descricao: provas.find((item) => item.value === prova)?.label,
      });
    }
    if (modalidade) {
      dadosTagsNovo.push({
        nomeCampo: 'modalidade',
        valor: modalidade,
        descricao: modalidades.find((item) => item.value === modalidade)?.label,
      });
    }
    if (dre) {
      dadosTagsNovo.push({
        nomeCampo: 'dre',
        valor: dre,
        descricao: dres.find((item) => item.value === dre)?.label,
      });
    }
    if (ue) {
      dadosTagsNovo.push({
        nomeCampo: 'ue',
        valor: ue,
        descricao: ues.find((item) => item.value === ue)?.label,
      });
    }
    if (anoEscolar) {
      dadosTagsNovo.push({
        nomeCampo: 'turma',
        valor: anoEscolar,
        descricao: anosEscolares.find((item) => item.value === turma)?.label,
      });
    }
    if (turma) {
      dadosTagsNovo.push({
        nomeCampo: 'turma',
        valor: turma,
        descricao: turmas.find((item) => item.value === turma)?.label,
      });
    }
    setDadosTags(dadosTagsNovo);
  }, [filtroPrincipal]);

  useEffect(() => {
    montarDados();
  }, [filtroPrincipal, montarDados]);

  return dadosTags?.length ? (
    <>
      {dadosTags.map((item, index) => {
        return <ContainerTag key={index}>{item.descricao}</ContainerTag>;
      })}
    </>
  ) : (
    <> </>
  );
};

export default TagFiltroPrincipal;
