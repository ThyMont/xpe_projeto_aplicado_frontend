import { Box, Heading, Stack, Text, Link, VStack } from "@chakra-ui/react";
import Layout from "../components/Layout";
import LinkButton from "../components/LinkButton";
import { useAuth } from "@/hooks/useAuth";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

export default function About() {
  const { user } = useAuth();

  return (
    <Layout>
      <Stack spaceY={6}>
        <Heading size="lg" textAlign="center">
          Sobre o Hydrapp 💧
        </Heading>

        <Text textAlign="center">
          O <strong>Hydrapp</strong> é uma aplicação desenvolvida como parte do projeto final do
          curso de <strong>Desenvolvimento Full Stack da Faculdade XPE</strong>. A ideia surgiu a
          partir de uma necessidade pessoal de manter uma hidratação adequada no dia a dia, de forma
          prática e motivadora.
        </Text>

        <Text textAlign="center">
          Com um visual <strong>limpo e simples de usar</strong>, o Hydrapp permite que qualquer
          pessoa personalize sua meta de ingestão de água, selecione o recipiente que usa
          diariamente e acompanhe sua evolução ao longo do tempo.
        </Text>

        <Text textAlign="center">
          O projeto é um exemplo de como a tecnologia pode ajudar na construção de hábitos saudáveis
          — sem complicações.
        </Text>

        <Box textAlign="center">
          <Text fontWeight="bold" mb={2}>
            👨‍💻 Desenvolvido por Thyago Monteiro
          </Text>
          <Stack direction="row" justify="center" spaceX={4}>
            <Link
              href="https://github.com/ThyMont"
              color="blue.500"
              _hover={{ textDecoration: "underline" }}
              display="flex"
              alignItems="center"
              gap={2}
            >
              <FaGithub /> GitHub
            </Link>

            <Link
              href="https://www.linkedin.com/in/thyagomonteiro"
              color="blue.500"
              _hover={{ textDecoration: "underline" }}
              display="flex"
              alignItems="center"
              gap={2}
            >
              <FaLinkedin /> LinkedIn
            </Link>
          </Stack>
        </Box>

        <VStack pt={6} align="center">
          <LinkButton to="/" colorScheme="blue" variant="outline">
            Ir para a tela inicial
          </LinkButton>

          {user && (
            <LinkButton to="/dashboard" colorScheme="blue">
              Ir para o Painel
            </LinkButton>
          )}
        </VStack>
      </Stack>
    </Layout>
  );
}
