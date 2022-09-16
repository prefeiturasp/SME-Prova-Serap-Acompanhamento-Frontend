import React from 'react';
import { useDispatch } from 'react-redux';
import { removerAlerta } from '../../redux/modules/alertas/actions';
import { MessageClick } from './styles';
import { AlertaPropsDto } from '~/domain/dto/alerta-props-dto';

interface PropsAlerta {
  propsAlerta: AlertaPropsDto;
}

const Alerta: React.FC<PropsAlerta> = ({ propsAlerta }) => {
  const dispatch = useDispatch();
  return (
    <div
      className={`alert alert-${propsAlerta.tipo} alert-dismissible fade show text-center ${propsAlerta.className}`}
      role='alert'
      style={propsAlerta.marginBottom ? { marginBottom: propsAlerta.marginBottom } : {}}
    >
      <b style={propsAlerta.estiloTitulo}>
        {propsAlerta.mensagem}
        <MessageClick onClick={propsAlerta.onClickMessage}>
          {propsAlerta.mensagemClick}
        </MessageClick>
      </b>
      {propsAlerta.closable ? (
        <button
          type='button'
          className='close'
          onClick={() => dispatch(removerAlerta(propsAlerta.id))}
          aria-label='Close'
        >
          <span aria-hidden='true'>&times;</span>
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

export default Alerta;
