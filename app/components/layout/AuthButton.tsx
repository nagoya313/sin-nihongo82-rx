import { Avatar, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { Form } from '@remix-run/react';
import Path from '~/features/path';
import useUser from '~/lib/hooks/useUser';

const AuthButton = () => {
  const { user } = useUser();

  return user != null ? (
    <Menu>
      <MenuButton as={Button} rounded="full" variant="link" cursor="pointer">
        <Avatar name={user.displayName} src={user.picture} />
      </MenuButton>
      <MenuList>
        <Form action={Path.logout} method="post">
          <MenuItem type="submit">ログアウト</MenuItem>
        </Form>
      </MenuList>
    </Menu>
  ) : (
    <Form action={Path.login} method="post">
      <Button type="submit">ログイン</Button>
    </Form>
  );
};

export default AuthButton;
