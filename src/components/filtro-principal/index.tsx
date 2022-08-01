import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { Colors } from '~/styles/colors';
import IconeAbrirPopover from './icone-abrir-popover';
import PopoverFiltroPrincipal from './popover';
import { ContainerFiltroPrincipal } from './styles';
import TagFiltroPrincipal from './tag';

const FiltroPrincipal: React.FC = () => {
  return (
    <ContainerFiltroPrincipal>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        fontSize={18}
        color={Colors.Label}
        style={{ margin: '10px' }}
      />
      <ScrollContainer style={{ width: 549, display: 'flex' }}>
        <TagFiltroPrincipal />
      </ScrollContainer>
      <PopoverFiltroPrincipal>
        <IconeAbrirPopover />
      </PopoverFiltroPrincipal>
    </ContainerFiltroPrincipal>
  );
};

export default FiltroPrincipal;
