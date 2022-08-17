import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardsTotalizadores, { CardTotalizador } from '~/components/cards-totalizadores';
import { AppState } from '~/redux';
import { setDataUltimaAtualizacao } from '~/redux/modules/geral/actions';
import geralService from '~/services/geral-service';

const Totalizadores: React.FC = () => {
  const filtroPrincipal = useSelector((state: AppState) => state.filtroPrincipal);

  const dispatch = useDispatch();

  const [dadosTotalizadores, setDadosTotalizadores] = useState<CardTotalizador[]>([]);

  const obterDadosCardsTotalizadores = useCallback(async () => {
    const resposta = await geralService.obterDadosCardsTotalizadores(filtroPrincipal);

    if (resposta?.data?.length) {
      setDadosTotalizadores(resposta.data);
    } else {
      setDadosTotalizadores([]);
    }
    dispatch(setDataUltimaAtualizacao(new Date()));
  }, [filtroPrincipal, dispatch]);

  useEffect(() => {
    if (filtroPrincipal?.anoLetivo) {
      obterDadosCardsTotalizadores();
    } else {
      setDadosTotalizadores([]);
      dispatch(setDataUltimaAtualizacao(new Date()));
    }
  }, [filtroPrincipal, dispatch, obterDadosCardsTotalizadores]);

  return <CardsTotalizadores dados={dadosTotalizadores} />;
};

export default Totalizadores;
