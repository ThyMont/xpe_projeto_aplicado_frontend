import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import LinkButton from "../components/LinkButton";
import Header from "../components/Header";

export default function Landing() {
  return (
    <>
      <Header />

      <Box textAlign="center" py={20} px={6}>
        <Heading mb={4} fontSize="4xl">
          Bem-vindo ao Hydrapp
        </Heading>

        <Text fontSize="lg" mb={6}>
          Monitore sua ingestão diária de água, mantenha-se hidratado e alcance suas metas de saúde.
        </Text>

        <Stack direction="row" justify="center" spaceX={4}>
          <LinkButton to="/register">Criar Conta</LinkButton>
          <LinkButton to="/login">Entrar</LinkButton>
        </Stack>
      </Box>
    </>
  );
}
