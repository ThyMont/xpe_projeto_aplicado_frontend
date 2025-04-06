import { Box, Flex, Heading, Spacer, IconButton, Menu, Portal } from "@chakra-ui/react";
import { useAuth } from "../hooks/useAuth";
import { Link as RouterLink } from "react-router-dom";
import LinkButton from "./LinkButton";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <Box bg="primary" color="white" px={6} py={4} shadow="md">
      <Flex align="center">
        <Heading size="md">
          <RouterLink to="/">Hydrapp</RouterLink>
        </Heading>
        <Spacer />

        {user ? (
          <Menu.Root>
            <Menu.Trigger colorScheme="whiteAlpha" aria-label="Menu">
              <IconButton>MENU</IconButton>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content color="black">
                  <Menu.Item value="dashboard">
                    <RouterLink to="/dashboard">Dashboard</RouterLink>
                  </Menu.Item>
                  <Menu.Item value="history">
                    <RouterLink to="/history">Histórico</RouterLink>
                  </Menu.Item>
                  <Menu.Item value="sair" onClick={logout}>
                    Sair
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        ) : (
          <LinkButton
            as={RouterLink}
            to="/login"
            variant="outline"
            size="sm"
            colorScheme="whiteAlpha"
          >
            Entrar
          </LinkButton>
        )}
      </Flex>
    </Box>
  );
}
