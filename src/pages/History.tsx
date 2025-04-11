import { Heading, Spinner, Text, VStack, HStack, Badge } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import { toaster } from "@/components/ui/toaster";
import LinkButton from "@/components/LinkButton";

interface RegistroDia {
  data: string;
  quantidade_ml: number;
}

export default function History() {
  const [historico, setHistorico] = useState<RegistroDia[]>([]);
  const [metaDiaria, setMetaDiaria] = useState(0);
  const [loading, setLoading] = useState(true);

  const carregarHistorico = async () => {
    try {
      const [historicoRes, dashboardRes] = await Promise.all([
        api.get("/api/consumo/historico"),
        api.get("/api/dashboard"),
      ]);

      setHistorico(historicoRes.data);
      setMetaDiaria(dashboardRes.data.meta_diaria);
    } catch (err) {
      console.log(err);
      toaster.create({
        title: "Erro ao carregar histórico",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatarData = (data: string) => {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const getCorPorPercentual = (ml: number) => {
    if (metaDiaria === 0) return "gray";

    const percentual = (ml / metaDiaria) * 100;

    if (percentual === 0) return "red";
    if (percentual < 50) return "yellow";
    if (percentual < 100) return "blue";
    return "green";
  };

  useEffect(() => {
    carregarHistorico();
  }, []);

  return (
    <Layout>
      <Heading size="md" mb={6}>
        Histórico de Consumo (7 dias)
      </Heading>

      {loading ? (
        <Spinner />
      ) : (
        <VStack spaceY={4} w="100%">
          {historico.map((registro) => {
            const cor = getCorPorPercentual(registro.quantidade_ml);
            return (
              <HStack
                key={registro.data}
                justify="space-between"
                w="100%"
                p={3}
                borderWidth={1}
                borderRadius="md"
                bg={`${cor}.50`}
              >
                <Text>{formatarData(registro.data)}</Text>
                <Badge colorScheme={cor}>{registro.quantidade_ml}ml</Badge>
              </HStack>
            );
          })}
          <LinkButton to="/dashboard" variant="outline" colorScheme="blue">
            Voltar ao Painel
          </LinkButton>
        </VStack>
      )}
    </Layout>
  );
}
