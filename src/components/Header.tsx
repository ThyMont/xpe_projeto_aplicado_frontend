import {
  Box,
  Flex,
  Heading,
  Spacer,
  IconButton,
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuPositioner,
  Portal,
  Text,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa6";
import { useAuth } from "../hooks/useAuth";
import { Link as RouterLink } from "react-router-dom";
import LinkButton from "./LinkButton";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <Box bg="primary" color="white" px={6} py={4} shadow="md">
      <Flex align="center">
        <Heading size="md">
          <RouterLink to={user ? "/dashboard" : "/"}>Hydrapp</RouterLink>
        </Heading>
        <Spacer />

        {user ? (
          <>
            <Text mr={4}>Olá, {user.nome}!</Text>

            <Menu.Root>
              <MenuTrigger
                as={IconButton}
                aria-label="Menu"
                color="white"
                bg="primaryLight"
                _hover={{ bg: "whiteAlpha.300" }}
              >
                <FaBars />
              </MenuTrigger>

              <Portal>
                <MenuPositioner>
                  <MenuContent color="black">
                    <RouterLink to="/dashboard">
                      <MenuItem value="dashboard">Dashboard</MenuItem>
                    </RouterLink>
                    <RouterLink to="/history">
                      <MenuItem value="history">Histórico</MenuItem>
                    </RouterLink>
                    <RouterLink to="/consumo">
                      <MenuItem value="consumo">Registrar Consumo</MenuItem>
                    </RouterLink>
                    <RouterLink to="/configuracoes">
                      <MenuItem value="settings">Configurações</MenuItem>
                    </RouterLink>
                    <MenuItem value="sair" onClick={logout}>
                      Sair
                    </MenuItem>
                  </MenuContent>
                </MenuPositioner>
              </Portal>
            </Menu.Root>
          </>
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
