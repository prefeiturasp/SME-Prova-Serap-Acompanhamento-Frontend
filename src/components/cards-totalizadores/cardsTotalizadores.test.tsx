import { render, screen } from '@testing-library/react';
import CardsTotalizadores, { CardTotalizador } from './index';

// Mock de Tooltip do Ant Design para evitar dependência de comportamento de bibliotecas externas
jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  Tooltip: ({ children, title }: { children: React.ReactNode, title?: string }) => (
    <div>
      {children}
      {title && <div>{title}</div>}  {/* Exibe o texto do tooltip */}
    </div>
  ),
}));

describe('<CardsTotalizadores />', () => {
  it('deve renderizar corretamente os cards com valor e título', () => {
    const dados: CardTotalizador[] = [
      {
        titulo: 'Total de Vendas',
        cor: 'green',
        valor: 1200,
        tooltip: 'Este é o total de vendas no mês',
      },
      {
        titulo: 'Total de Usuários',
        cor: 'blue',
        valor: 2500,
        tooltip: '',
      },
    ];

    render(<CardsTotalizadores dados={dados} />);

    // Verificar se o título e o valor dos cards estão renderizados
    expect(screen.getByText('Total de Vendas')).toBeInTheDocument();
    expect(screen.getByText('1200')).toBeInTheDocument();

    expect(screen.getByText('Total de Usuários')).toBeInTheDocument();
    expect(screen.getByText('2500')).toBeInTheDocument();
  });

  it('deve mostrar o tooltip quando fornecido', () => {
    const dados: CardTotalizador[] = [
      {
        titulo: 'Total de Vendas',
        cor: 'green',
        valor: 1200,
        tooltip: 'Este é o total de vendas no mês',
      },
    ];

    render(<CardsTotalizadores dados={dados} />);

    // Verificar se o texto do tooltip está visível
    expect(screen.getByText('Este é o total de vendas no mês')).toBeInTheDocument();
  });

  it('não deve renderizar o tooltip quando não fornecido', () => {
    const dados: CardTotalizador[] = [
      {
        titulo: 'Total de Vendas',
        cor: 'green',
        valor: 1200,
        tooltip: '',
      },
    ];

    render(<CardsTotalizadores dados={dados} />);

    // Verificar se o texto do tooltip não aparece
    expect(screen.queryByText('Este é o total de vendas no mês')).toBeNull();
  });

  it('deve renderizar múltiplos cards corretamente', () => {
    const dados: CardTotalizador[] = [
      { titulo: 'Total de Vendas', cor: 'green', valor: 1200 },
      { titulo: 'Total de Usuários', cor: 'blue', valor: 2500 },
      { titulo: 'Total de Visitas', cor: 'red', valor: 3200 },
    ];

    render(<CardsTotalizadores dados={dados} />);

    // Verificar se todos os títulos e valores estão sendo renderizados
    expect(screen.getByText('Total de Vendas')).toBeInTheDocument();
    expect(screen.getByText('1200')).toBeInTheDocument();

    expect(screen.getByText('Total de Usuários')).toBeInTheDocument();
    expect(screen.getByText('2500')).toBeInTheDocument();

    expect(screen.getByText('Total de Visitas')).toBeInTheDocument();
    expect(screen.getByText('3200')).toBeInTheDocument();
  });
});
