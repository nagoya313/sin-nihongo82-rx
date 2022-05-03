import { Icon } from '@chakra-ui/react';
import { MdOutlineInfo } from 'react-icons/md';
import { type IconProps } from '~/lib/types/util';

type InfoIconProps = IconProps;

const InfoIcon = ({ fontSize = 24, ...props }: InfoIconProps) => (
  <Icon {...props} fontSize={fontSize} as={MdOutlineInfo} />
);

export default InfoIcon;
