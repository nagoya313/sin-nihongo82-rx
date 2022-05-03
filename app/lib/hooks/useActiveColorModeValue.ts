import { useColorModeValue } from '@chakra-ui/react';

const useActiveColorModeValue = <TLight = unknown, TDark = unknown>(light: TLight, dark: TDark) => {
  const color = useColorModeValue(light, dark);

  return (isActive: boolean) => (isActive ? color : undefined);
};

export default useActiveColorModeValue;
