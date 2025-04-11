import {
  Box,
  Heading,
  Stack,
  Text,
  Stat,
  StatGroup,
  Spinner,
  FormatNumber,
  Progress,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import { toaster } from "@/components/ui/toaster";
import LinkButton from "../components/LinkButton";

interface DashboardData {
  meta_diaria: number;
  consumo_hoje: number;
  progresso_percentual: number;
  recipiente_padrao: {
    nome: string;
    volume_ml: number;
  } | null;
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const carregarDados = async () => {
    try {
      const res = await api.get("/api/dashboard");
      setData(res.data);
    } catch {
      toaster.create({
        title: "Erro ao carregar painel",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const renderMensagemMotivacional = () => {
    const progresso = data?.progresso_percentual ?? 0;
    let bg = "";
    let texto = "";

    if (progresso >= 100) {
      bg = "green.100";
      texto = "🏆 Parabéns! Você atingiu sua meta de hoje!";
    } else if (progresso >= 70) {
      bg = "blue.100";
      texto = "Quase lá! Só mais um pouco 🏁";
    } else if (progresso >= 31) {
      bg = "yellow.100";
      texto = "Você está indo bem! Continue assim 💪";
    } else {
      bg = "red.100";
      texto = "Vamos começar! Sua saúde agradece 💧";
    }

    return (
      <Box
        bg={bg}
        border="1px solid"
        borderColor="gray.200"
        rounded="md"
        px={4}
        py={2}
        textAlign="center"
      >
        <Text>{texto}</Text>
      </Box>
    );
  };

  return (
    <Layout>
      <Heading size="md" mb={6}>
        Painel do Usuário
      </Heading>

      {loading ? (
        <Spinner />
      ) : (
        <Stack spaceY={6}>
          <StatGroup gap={6}>
            <Stat.Root>
              <Stat.Label>Meta Diária</Stat.Label>
              <Stat.ValueText>
                <FormatNumber value={data?.meta_diaria ?? 0} /> ml
              </Stat.ValueText>
            </Stat.Root>

            <Stat.Root>
              <Stat.Label>Ingerido Hoje</Stat.Label>
              <Stat.ValueText>
                <FormatNumber value={data?.consumo_hoje ?? 0} /> ml
              </Stat.ValueText>
            </Stat.Root>
          </StatGroup>

          <Box>
            <Text fontWeight="medium" mb={2}>
              Progresso
            </Text>
            <Progress.Root size="md" borderRadius="md" value={data?.progresso_percentual ?? 0}>
              <Progress.Track>
                <Progress.Range transition="width 0.6s ease" />
              </Progress.Track>
            </Progress.Root>
            <Text mt={1} fontSize="sm" textAlign="right">
              {data?.progresso_percentual ?? 0}%
            </Text>
          </Box>

          {renderMensagemMotivacional()}

          {data?.recipiente_padrao && (
            <Box>
              <Text fontWeight="medium">Recipiente Atual</Text>
              <Text>
                {data.recipiente_padrao.nome} ({data.recipiente_padrao.volume_ml}ml)
              </Text>
            </Box>
          )}

          <Stack direction="row" spaceX={4} pt={2}>
            <LinkButton to="/consumo" colorScheme="blue" variant="outline">
              Registrar Consumo
            </LinkButton>
            <LinkButton to="/history" colorScheme="gray" variant="outline">
              Histórico
            </LinkButton>
            <LinkButton to="/configuracoes" colorScheme="green" variant="outline">
              Configurações
            </LinkButton>
          </Stack>
        </Stack>
      )}
    </Layout>
  );
}
