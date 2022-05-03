import {
  Avatar,
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { setErrorMap } from 'zod';
import { errorMap } from '~/lib/schema/errors/errorMap';
import { HEADER_HEIGHT } from '~/styles/constants';
import AppBar from './AppBar';
import Footer from './Footer';
import SideBar from './SideBar';

setErrorMap((issue, ctx) => ({ message: errorMap(issue, ctx) }));

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <AppBar onSideBarOpen={onOpen} />
      <Box h={HEADER_HEIGHT} />
      <VStack
        p={2}
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
        borderRightWidth="1px"
        display={{ base: 'none', md: 'block' }}
      >
        <SideBar onClose={onClose} />
      </VStack>
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Avatar size="sm" src="/favicon.ico" mr={2} />
            新日本語
          </DrawerHeader>
          <DrawerBody>
            <SideBar onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Flex direction="column" ml={{ base: 0, md: 60 }} minH={`calc(100VH - ${HEADER_HEIGHT * 4}px)`}>
        <Box as="main" flex={1} p={8}>
          {children}
        </Box>
        <Divider />
        <Footer />
      </Flex>
    </>
  );
};

export default Layout;
