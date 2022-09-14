import { faCircleCheck, faCircleXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnsType } from 'antd/lib/table';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import Table from '~/components/table';
import { AlunoTurmaDto } from '~/domain/dto/aluno-turma-dto';
import { ResumoGeralProvaDto } from '~/domain/dto/resumo-geral-prova-dto';
import { ReabrirProvaDto } from '~/domain/dto/reabrir-prova-dto';
import resumoProvasService from '~/services/resumo-service';
import { exibirAlerta } from '~/services/alerta-service';
import { Colors } from '~/styles/colors';
import moment from 'moment';
import { Modal, Button, Tooltip } from 'antd';
import { ProvaSituacao } from '~/domain/enums/prova-situacao';

interface TabelaDetalhesResumoGeralTurmaProps {
  dadosProva: ResumoGeralProvaDto;
  turmaId: number;
}
interface RenderToltipProps {
  children: ReactNode;
  tooltip?: string;
  key: number;
}

const TabelaDetalhesResumoGeralTurma: React.FC<TabelaDetalhesResumoGeralTurmaProps> = ({
  turmaId,
  dadosProva,
}) => {
  const [dados, setDados] = useState<AlunoTurmaDto[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [estudante, setEstudante] = useState<any>({});

  const obterDados = useCallback(async () => {
    setCarregando(true);
    const resposta = await resumoProvasService.obterDadosResumoGeralTurma(
      turmaId,
      dadosProva.provaId,
    );

    if (resposta?.data?.length) {
      //setDados(resposta.data);
      gerarMock(); // remover depois dos testes
    } else {
      setDados([]);
    }
    setCarregando(false);
  }, [dadosProva, turmaId]);

  useEffect(() => {
    if (dadosProva?.provaId) {
      obterDados();
    } else {
      setDados([]);
    }
  }, [dadosProva, obterDados]);

  const renderCardTooltip = ({ children, tooltip, key }: RenderToltipProps) =>
    tooltip ? (
      <Tooltip key={key} title={tooltip}>
        {children}
      </Tooltip>
    ) : (
      children
    );

  const columns: ColumnsType<AlunoTurmaDto> = [
    {
      title: 'Nome do Estudante',
      dataIndex: 'nomeEstudante',
    },
    {
      title: 'Fez Download',
      dataIndex: 'fezDownload',
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
      align: 'center',
      render(inicioProva) {
        return inicioProva ? moment(inicioProva).format('DD/MM/YYYY - HH:mm') : '-';
      },
    },
    {
      title: 'Fim da Prova',
      dataIndex: 'fimProva',
      align: 'center',
      render(fimProva) {
        return fimProva ? moment(fimProva).format('DD/MM/YYYY - HH:mm') : '-';
      },
    },
    {
      title: 'Tempo médio',
      dataIndex: 'tempoMedio',
      align: 'center',
      render(tempoMedio) {
        return tempoMedio != null ? `${tempoMedio}min` : '-';
      },
    },
    {
      title: 'Questões Respondidas',
      dataIndex: 'questoesRespondidas',
      align: 'center',
    },
    {
      title: 'Ações',
      dataIndex: 'ra',
      align: 'center',
      render(ra, estudante) {
        return renderCardTooltip({
          key: ra,
          tooltip: estudante.ultimaReabertura ?? estudante.ultimaReabertura,
          children: (
            <button
              style={{
                cursor: podeReabrirProva(estudante) ? 'pointer' : 'not-allowed',
                backgroundColor: 'white',
                border: 'none',
                color: podeReabrirProva(estudante) ? Colors.AzulSerap : 'black',
                opacity: podeReabrirProva(estudante) ? 1 : 0.6,
              }}
              onClick={() => {
                if (podeReabrirProva(estudante)) exibirModal(estudante);
              }}
            >
              {estudante.situacaoProvaAluno != ProvaSituacao.Reabrindo ? (
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  fontSize='14'
                  color={podeReabrirProva(estudante) ? Colors.AzulSerap : 'black'}
                  title='Reabrir prova'
                  style={{ opacity: podeReabrirProva(estudante) ? 1 : 0.6 }}
                />
              ) : (
                ''
              )}
              <span
                style={{
                  fontSize: 12,
                  marginLeft: 4,
                  textDecoration: 'underline',
                  opacity: podeReabrirProva(estudante) ? 1 : 0.6,
                }}
              >
                {gerarTextoAcao(estudante)}
              </span>
            </button>
          ),
        });
      },
    },
  ];

  const podeReabrirProva = (aluno: AlunoTurmaDto) => {
    return aluno.podeReabrirProva && aluno.situacaoProvaAluno != ProvaSituacao.Reabrindo;
  };

  const gerarTextoAcao = (aluno: AlunoTurmaDto) => {
    return aluno.situacaoProvaAluno === ProvaSituacao.Reabrindo ? 'Reabrindo' : 'Reabrir prova';
  };

  const exibirModal = (aluno: AlunoTurmaDto) => {
    setEstudante(aluno);
  };

  const fecharModal = () => {
    setEstudante({});
  };

  const reabrirProva = useCallback(async () => {
    setCarregando(true);

    const resposta = await resumoProvasService.obterDadosResumoGeralTurma(
      turmaId,
      dadosProva.provaId,
    );
    if (resposta?.data?.length) {
      setDados(resposta.data);
    } else {
      setDados([]);
    }
    /*
    const dtoReabrirProva: ReabrirProvaDto = {
      alunoRa: estudante?.ra,
      provaId: dadosProva.provaId,
    };
    const respostaReabertura = await resumoProvasService.reabrirProvaAluno(dtoReabrirProva);
    if (respostaReabertura?.data) {
      obterDados();
      setEstudante({});
      exibirAlerta('success', 'Solicitação de reabertura de prova feita com sucesso.');
    } else {
      setCarregando(false);
      setEstudante({});
      exibirAlerta('error', 'Erro ao solicitar reabertura de prova.');
    }*/

    setTimeout(() => {
      setCarregando(false);
      setEstudante({});
      exibirAlerta('success', 'Solicitação de reabertura de prova feita com sucesso.');
    }, 2000);
  }, [estudante?.ra, dadosProva.provaId]);

  const gerarMock = () => {
    const lista: AlunoTurmaDto[] = [
      {
        ra: 1,
        nomeEstudante: 'Teste aluno 1',
        fezDownload: true,
        inicioProva: new Date(),
        fimProva: new Date(),
        tempoMedio: 1,
        questoesRespondidas: 10,
        ultimaReabertura: 'Teste reabertura',
        podeReabrirProva: false,
        situacaoProvaAluno: 3,
      },
      {
        ra: 2,
        nomeEstudante: 'Teste aluno 2',
        fezDownload: true,
        inicioProva: new Date(),
        fimProva: new Date(),
        tempoMedio: 5,
        questoesRespondidas: 15,
        //ultimaReabertura: ,
        podeReabrirProva: true,
        situacaoProvaAluno: 2,
      },
      {
        ra: 3,
        nomeEstudante: 'Teste aluno 3',
        fezDownload: true,
        inicioProva: new Date(),
        fimProva: new Date(),
        tempoMedio: 10,
        questoesRespondidas: 20,
        ultimaReabertura: 'Teste reabertura 3',
        podeReabrirProva: false,
        situacaoProvaAluno: 1,
      },
      {
        ra: 4,
        nomeEstudante: 'Teste aluno 4',
        fezDownload: true,
        inicioProva: new Date(),
        fimProva: new Date(),
        tempoMedio: 15,
        questoesRespondidas: 25,
        ultimaReabertura: 'Teste reabertura 4',
        podeReabrirProva: true,
        situacaoProvaAluno: 3,
      },
    ];
    setDados(lista);
  };

  return (
    <>
      <Modal
        title='Reabrir prova do estudante'
        centered
        visible={estudante?.ra}
        onCancel={() => fecharModal()}
        onOk={() => reabrirProva()}
        confirmLoading={carregando}
        footer={[
          <Button key='cancelar' onClick={() => fecharModal()}>
            Cancelar
          </Button>,
          <Button key='reabrir' type='primary' loading={carregando} onClick={() => reabrirProva()}>
            Reabrir
          </Button>,
        ]}
      >
        <span style={{ fontSize: 14 }}>
          Deseja reabrir a <b>{dadosProva.tituloProva}</b> para o estudante{' '}
          <b>{estudante?.nomeEstudante}</b> ?
        </span>
      </Modal>

      <Table
        rowKey='nomeEstudante'
        loading={carregando}
        columns={columns}
        dataSource={dados}
        pagination={false}
      />
    </>
  );
};

export default TabelaDetalhesResumoGeralTurma;
