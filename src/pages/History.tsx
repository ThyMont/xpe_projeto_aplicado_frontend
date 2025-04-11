import { Heading, Spinner, Text, VStack, HStack, Badge } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import { toaster } from "@/components/ui/toaster";

interface RegistroDia {
  data: string;
  quantidade_ml: number;
}

export default function History() {
  const [historico, setHistorico] = useState<RegistroDia[]>([]);
  const [loading, setLoading] = useState(true);

  const carregarHistorico = async () => {
    try {
      const res = await api.get("/api/consumo/historico");
      setHistorico(res.data);
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

  const getCorPorQuantidade = (qtd: number) => {
    if (qtd === 0) return "red";
    if (qtd < 2000) return "yellow";
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
          {historico.map((registro) => (
            <HStack
              key={registro.data}
              justify="space-between"
              w="100%"
              p={3}
              borderWidth={1}
              borderRadius="md"
              bg={`${getCorPorQuantidade(registro.quantidade_ml)}.50`}
            >
              <Text>{formatarData(registro.data)}</Text>
              <Badge colorScheme={getCorPorQuantidade(registro.quantidade_ml)}>
                {registro.quantidade_ml}ml
              </Badge>
            </HStack>
          ))}
        </VStack>
      )}
    </Layout>
  );
}
