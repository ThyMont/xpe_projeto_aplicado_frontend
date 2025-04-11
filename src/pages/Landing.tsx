import { Box, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import LinkButton from "../components/LinkButton";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";

export default function Landing() {
  const { user } = useAuth();

  return (
    <>
      <Header />

      <Box textAlign="center" py={20} px={6}>
        <Heading mb={4} fontSize="4xl">
          Bem-vindo ao Hydrapp 💧
        </Heading>

        <Text fontSize="lg" mb={6}>
          Monitore sua ingestão diária de água, mantenha-se hidratado e alcance suas metas de saúde.
        </Text>

        <Text fontSize="md" maxW="lg" mx="auto" mb={10}>
          O Hydrapp é uma aplicação simples e prática para te ajudar a criar o hábito de beber mais
          água todos os dias. Você pode personalizar sua meta diária de hidratação e escolher o tipo
          de recipiente que costuma usar — como um copo, garrafa ou squeeze. A cada vez que
          registrar seu consumo, a aplicação calcula automaticamente seu progresso.
        </Text>

        <VStack spaceY={6} mb={10}>
          <Box>
            <Text fontSize="xl" fontWeight="bold">
              💪 Mais energia e desempenho
            </Text>
            <Text>A hidratação adequada melhora sua disposição, foco e desempenho físico.</Text>
          </Box>

          <Box>
            <Text fontSize="xl" fontWeight="bold">
              🧠 Clareza mental
            </Text>
            <Text>Beber água regularmente ajuda a manter seu cérebro ativo e alerta.</Text>
          </Box>

          <Box>
            <Text fontSize="xl" fontWeight="bold">
              ❤️ Saúde em dia
            </Text>
            <Text>Auxilia na regulação da temperatura corporal e melhora a circulação.</Text>
          </Box>

          <Box>
            <Text fontSize="xl" fontWeight="bold">
              💦 Pele mais bonita
            </Text>
            <Text>A hidratação mantém sua pele mais jovem e com aparência saudável.</Text>
          </Box>
        </VStack>

        <Stack direction="row" justify="center" spaceX={4}>
          {user ? (
            <LinkButton to="/dashboard" colorScheme="blue">
              Ir para o Painel
            </LinkButton>
          ) : (
            <>
              <LinkButton to="/register" colorScheme="blue">
                Criar Conta
              </LinkButton>
              <LinkButton to="/login" variant="outline" colorScheme="blue">
                Entrar
              </LinkButton>
            </>
          )}
        </Stack>
      </Box>

      <Footer />
    </>
  );
}
