import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { Colors } from '~/styles/colors';
import IconeAbrirPopover from './icone-abrir-popover';
import PopoverFiltroPrincipal from './popover';
import { ContainerFiltroPrincipal } from './styles';
import TagFiltroPrincipal, { TagItem } from './tag';

const FiltroPrincipal: React.FC = () => {
  const filtrosSelecionadosMock: TagItem[] = [
    {
      description: '2022',
      index: 0,
    },
    {
      description: 'Provas em Andamento',
      index: 0,
    },
  ];

  return (
    <PopoverFiltroPrincipal>
      <ContainerFiltroPrincipal>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          fontSize={18}
          color={Colors.Label}
          style={{ margin: '10px' }}
        />
        <ScrollContainer style={{ width: 549, display: 'flex' }}>
          {filtrosSelecionadosMock.map((item, index) => (
            <TagFiltroPrincipal
              key={index}
              item={item}
              onRemove={(a) => {
                console.log(a);
              }}
            />
          ))}
        </ScrollContainer>
        <IconeAbrirPopover />
      </ContainerFiltroPrincipal>
    </PopoverFiltroPrincipal>
  );
};

export default FiltroPrincipal;
