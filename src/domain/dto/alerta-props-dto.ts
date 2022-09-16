export interface AlertaPropsDto {
  tipo: string;
  id: number;
  mensagem: string;
  estiloTitulo: React.CSSProperties;
  mensagemClick: string;
  marginBottom: string;
  closable: string;
  className: string;
  onClickMessage: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}
