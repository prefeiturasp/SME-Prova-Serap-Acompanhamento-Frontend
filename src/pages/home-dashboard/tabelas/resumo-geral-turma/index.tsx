import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnsType } from 'antd/lib/table';
import React, { useCallback, useEffect, useState } from 'react';
import Table from '~/components/table';
import resumoProvasService from '~/services/resumo-service';
import { Colors } from '~/styles/colors';

interface TabelaDetalhesResumoGeralTurmaProps {
  dadosProva: any;
}

const TabelaDetalhesResumoGeralTurma: React.FC<TabelaDetalhesResumoGeralTurmaProps> = ({
  dadosProva,
}) => {
  const [dados, setDados] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  const obterDados = useCallback(async () => {
    setCarregando(true);
    const resposta = await resumoProvasService.obterDadosResumoGeralTurma(dadosProva?.idProva);

    if (resposta?.data?.length) {
      setDados(resposta.data);
    } else {
      setDados([]);
    }
    setCarregando(false);
  }, [dadosProva]);

  useEffect(() => {
    if (dadosProva?.idProva) {
      obterDados();
    } else {
      setDados([]);
    }
  }, [dadosProva, obterDados]);

  const columns: ColumnsType<any> = [
    {
      title: 'Nome do Estudante',
      dataIndex: 'nomeEstudante',
      key: 'nomeEstudante',
    },
    {
      title: 'Fez Download',
      dataIndex: 'fezDownload',
      key: 'fezDownload',
      align: 'center',
      render(fezDownload) {
        return fezDownload ? (
          <FontAwesomeIcon icon={faCircleCheck} fontSize='14' color={Colors.SIGPAE} />
        ) : (
          <FontAwesomeIcon icon={faCircleXmark} fontSize='14' color={Colors.SupportWarning} />
        );
      },
    },
    {
      title: 'Início da Prova',
      dataIndex: 'inicioProva',
      key: 'inicioProva',
      align: 'center',
    },
    {
      title: 'Fim da Prova',
      dataIndex: 'fimProva',
      key: 'fimProva',
      align: 'center',
    },
    {
      title: 'Tempo médio',
      dataIndex: 'tempoMedio',
      key: 'tempoMedio',
      align: 'center',
    },
    {
      title: 'Questões Respondidas',
      dataIndex: 'questoesRespondidas',
      key: 'questoesRespondidas',
      align: 'center',
    },
  ];

  return <Table loading={carregando} columns={columns} dataSource={dados} pagination={false} />;
};

export default TabelaDetalhesResumoGeralTurma;
