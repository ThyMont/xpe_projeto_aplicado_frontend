import { Box, Button, Container, Heading, Text, Spinner, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { toaster } from "@/components/ui/toaster";
import api from "../services/api";

interface Recipiente {
  id: number;
  nome: string;
  volume_ml: number;
}

export default function RegisterConsumption() {
  const [recipiente, setRecipiente] = useState<Recipiente | null>(null);
  const [meta, setMeta] = useState(0);
  const [percentual, setPercentual] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const carregarDashboard = async () => {
    try {
      const res = await api.get("/api/dashboard");
      const consumo = res.data.consumo_hoje;
      const meta = res.data.meta_diaria;
      const progresso = meta > 0 ? Math.round((consumo / meta) * 100) : 0;

      setRecipiente(res.data.recipiente_padrao);
      setMeta(meta);
      setPercentual(progresso);
    } catch (err) {
      console.log(err);
      toaster.create({
        title: "Erro ao carregar recipiente",
        description: "Não foi possível obter o recipiente padrão.",
        type: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const registrarConsumo = async () => {
    setSending(true);
    try {
      await api.post("/api/consumo");

      toaster.create({
        title: "Consumo registrado!",
        description: `Você ingeriu ${recipiente?.volume_ml ?? 0}ml de água.`,
        type: "success",
        duration: 3000,
      });

      const res = await api.get("/api/dashboard");
      const consumo = res.data.consumo_hoje;
      const meta = res.data.meta_diaria;
      const progresso = meta > 0 ? Math.round((consumo / meta) * 100) : 0;

      setMeta(meta);
      setPercentual(progresso);
    } catch {
      toaster.create({
        title: "Erro ao registrar consumo",
        description: "Tente novamente.",
        type: "error",
        duration: 3000,
      });
    } finally {
      setSending(false);
    }
  };

  const renderMensagemProgresso = () => {
    let bg = "";
    let text = "";

    if (percentual >= 100) {
      bg = "green.100";
      text = `🥳 Parabéns! Você atingiu sua meta diária de ${meta}ml!`;
    } else if (percentual >= 70) {
      bg = "blue.100";
      text = "Quase lá! Só mais alguns goles 🏁";
    } else if (percentual >= 31) {
      bg = "yellow.100";
      text = "Mantenha o ritmo! Você está indo bem 💪";
    } else {
      bg = "red.100";
      text = "Bora beber mais água! Sua saúde agradece 💧";
    }

    return (
      <Box
        bg={bg}
        border="1px solid"
        borderColor="gray.300"
        color="black"
        px={4}
        py={2}
        rounded="md"
        textAlign="center"
      >
        {text}
      </Box>
    );
  };

  const renderConteudo = () => {
    if (loading) return <Spinner />;
    if (!recipiente) return <Text textAlign="center">Nenhum recipiente disponível.</Text>;

    return (
      <VStack spaceY={4}>
        <Text fontSize="lg">
          Recipiente padrão:{" "}
          <strong>
            {recipiente.nome} ({recipiente.volume_ml}ml)
          </strong>
        </Text>

        <Button
          onClick={registrarConsumo}
          colorScheme="blue"
          loading={sending}
          loadingText="Registrando..."
        >
          Beber {recipiente.volume_ml}ml
        </Button>

        {renderMensagemProgresso()}
      </VStack>
    );
  };

  useEffect(() => {
    carregarDashboard();
  }, []);

  return (
    <>
      <Header />

      <Container centerContent mt={12}>
        <Box w="100%" maxW="md" p={6} borderWidth={1} borderRadius="lg" boxShadow="md">
          <Heading size="md" mb={4} textAlign="center">
            Registro de Consumo
          </Heading>

          {renderConteudo()}
        </Box>
      </Container>
    </>
  );
}
