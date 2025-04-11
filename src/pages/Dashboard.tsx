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

  return (
    <Layout>
      <Heading size="md" mb={6}>
        Painel do Usuário
      </Heading>

      {loading ? (
        <Spinner />
      ) : (
        <Stack>
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
                <Progress.Range />
              </Progress.Track>
            </Progress.Root>
            <Text mt={1} fontSize="sm" textAlign="right">
              {data?.progresso_percentual ?? 0}%
            </Text>
          </Box>

          {data?.recipiente_padrao && (
            <Box>
              <Text fontWeight="medium">Recipiente Atual</Text>
              <Text>
                {data.recipiente_padrao.nome} ({data.recipiente_padrao.volume_ml}ml)
              </Text>
            </Box>
          )}
        </Stack>
      )}
    </Layout>
  );
}
