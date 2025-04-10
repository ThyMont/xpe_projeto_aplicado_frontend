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
          <RouterLink to="/">Hydrapp</RouterLink>
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
                    <MenuItem value="dashboard">
                      <RouterLink to="/dashboard">Dashboard</RouterLink>
                    </MenuItem>
                    <MenuItem value="history">
                      <RouterLink to="/history">Histórico</RouterLink>
                    </MenuItem>
                    <MenuItem value="consumo">
                      <RouterLink to="/consumo">Registrar Consumo</RouterLink>
                    </MenuItem>
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
