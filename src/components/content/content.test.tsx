import { render, screen } from '@testing-library/react';
import Content from './index';

describe('<Content />', () => {
  it('deve renderizar corretamente o conteúdo', () => {
    render(
      <Content>
        <div>Conteúdo do Card</div>
      </Content>
    );

    // Verificar se o conteúdo foi renderizado
    expect(screen.getByText('Conteúdo do Card')).toBeInTheDocument();
  });

  it('deve renderizar o header quando fornecido', () => {
    render(
      <Content header={<div>Header do Card</div>}>
        <div>Conteúdo do Card</div>
      </Content>
    );

    // Verificar se o header foi renderizado
    expect(screen.getByText('Header do Card')).toBeInTheDocument();
  });

  it('não deve renderizar o header quando não fornecido', () => {
    render(
      <Content>
        <div>Conteúdo do Card</div>
      </Content>
    );

    // Verificar se o header não foi renderizado
    expect(screen.queryByText('Header do Card')).toBeNull();
  });

  it('deve renderizar a estrutura de layout corretamente', () => {
    render(
      <Content>
        <div>Conteúdo do Card</div>
      </Content>
    );

    // Verificar se o conteúdo do card foi renderizado
    expect(screen.getByText('Conteúdo do Card')).toBeInTheDocument();
  });
});
