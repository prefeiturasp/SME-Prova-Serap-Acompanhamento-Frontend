import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import CardsTotalizadores from '~/components/cards-totalizadores';
import { setDataUltimaAtualizacao } from '~/redux/modules/geral/actions';
import geralService from '~/services/geral-service';

const Totalizadores: React.FC = () => {
  // TODO -  Pegar dados do filtro principal
  const filtroPrincipal = useMemo(() => ({ anoLetivo: 2022 }), []);

  const dispatch = useDispatch();

  const [dadosTotalizadores, setDadosTotalizadores] = useState<any[]>([]);

  const obterDadosCardsTotalizadores = useCallback(async () => {
    const resposta = await geralService.obterDadosCardsTotalizadores(filtroPrincipal);

    if (resposta?.data) {
      setDadosTotalizadores(resposta.data);
      dispatch(setDataUltimaAtualizacao(new Date()));
    } else {
      setDadosTotalizadores([]);
    }
  }, [filtroPrincipal, dispatch]);

  useEffect(() => {
    if (filtroPrincipal?.anoLetivo) {
      obterDadosCardsTotalizadores();
    }
  }, [filtroPrincipal, obterDadosCardsTotalizadores]);

  return <CardsTotalizadores dados={dadosTotalizadores} />;
};

export default Totalizadores;
