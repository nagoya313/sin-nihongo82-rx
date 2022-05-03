import { Flex } from '@chakra-ui/react';
import { NavLink as RemixLink } from '@remix-run/react';
import { type PathString } from '~/features/path';
import useActiveColorModeValue from '~/lib/hooks/useActiveColorModeValue';
import { makePath, makePathArgs, type PathParamsWithProps } from '~/lib/path';

type SideBarLinkProps<THref extends PathString> = PathParamsWithProps<{
  title: string;
  to: THref;
  icon: React.ReactNode;
  onClick: () => void;
}>;

const SideBarLink = <THref extends PathString>({ to, title, icon, onClick, params }: SideBarLinkProps<THref>) => {
  const selectedBg = useActiveColorModeValue('purple.100', 'purple.800');
  const selectedColor = useActiveColorModeValue('purple.800', 'purple.100');

  return (
    <RemixLink to={makePath<THref>(...makePathArgs(to, params))}>
      {({ isActive }) => (
        <Flex
          align="center"
          mt={2}
          ml={4}
          mr={4}
          p={2}
          rounded="md"
          role="group"
          bg={selectedBg(isActive)}
          color={selectedColor(isActive)}
          onClick={onClick}
        >
          {icon}
          {title}
        </Flex>
      )}
    </RemixLink>
  );
};

export default SideBarLink;
