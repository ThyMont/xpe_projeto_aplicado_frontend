import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
  Field,
} from "@chakra-ui/react";
import { useState } from "react";
import api from "../services/api";
import { toaster } from "@/components/ui/toaster";
import LinkButton from "@/components/LinkButton";
import Layout from "@/components/Layout";

export default function Settings() {
  const [meta, setMeta] = useState("");
  const [nomeRecipiente, setNomeRecipiente] = useState("");
  const [volumeRecipiente, setVolumeRecipiente] = useState("");
  const [isSavingMeta, setIsSavingMeta] = useState(false);
  const [isSavingRecipiente, setIsSavingRecipiente] = useState(false);

  const handleSalvarMeta = async () => {
    if (!meta || isNaN(Number(meta)) || Number(meta) <= 0) {
      toaster.create({
        title: "Meta inválida",
        description: "Informe um valor numérico maior que zero.",
        type: "error",
      });
      return;
    }

    setIsSavingMeta(true);
    try {
      await api.put("/api/meta", {
        quantidade_ml: Number(meta),
      });

      toaster.create({
        title: "Meta atualizada com sucesso!",
        type: "success",
        duration: 3000,
      });

      setMeta("");
    } catch {
      toaster.create({
        title: "Erro ao atualizar meta",
        type: "error",
      });
    } finally {
      setIsSavingMeta(false);
    }
  };

  const handleSalvarRecipiente = async () => {
    if (!nomeRecipiente || !volumeRecipiente || isNaN(Number(volumeRecipiente))) {
      toaster.create({
        title: "Dados inválidos",
        description: "Preencha corretamente o nome e o volume.",
        type: "error",
      });
      return;
    }

    setIsSavingRecipiente(true);
    try {
      await api.post("/api/recipientes", {
        nome: nomeRecipiente,
        volume_ml: Number(volumeRecipiente),
      });

      toaster.create({
        title: "Recipiente criado com sucesso!",
        type: "success",
        duration: 3000,
      });

      setNomeRecipiente("");
      setVolumeRecipiente("");
    } catch {
      toaster.create({
        title: "Erro ao criar recipiente",
        type: "error",
      });
    } finally {
      setIsSavingRecipiente(false);
    }
  };

  return (
    <Layout>
      <Container centerContent mt={12}>
        <Box w="100%" maxW="md" p={6} borderWidth={1} borderRadius="lg" boxShadow="md">
          <Heading size="md" mb={6} textAlign="center">
            Configurações
          </Heading>

          <VStack>
            <Box w="100%">
              <Field.Root required>
                <Field.Label>Nova meta diária (ml)</Field.Label>
                <Input
                  placeholder="Ex: 2000"
                  type="number"
                  value={meta}
                  onChange={(e) => setMeta(e.target.value)}
                />
              </Field.Root>
              <Button mt={3} colorScheme="blue" onClick={handleSalvarMeta} loading={isSavingMeta}>
                Salvar nova meta
              </Button>
            </Box>

            <Box w="100%">
              <Text fontWeight="medium" mb={2}>
                Adicionar novo recipiente
              </Text>
              <Stack>
                <Field.Root required>
                  <Field.Label>Nome</Field.Label>
                  <Input
                    placeholder="Ex: Garrafa"
                    value={nomeRecipiente}
                    onChange={(e) => setNomeRecipiente(e.target.value)}
                  />
                </Field.Root>

                <Field.Root required>
                  <Field.Label>Volume (ml)</Field.Label>
                  <Input
                    placeholder="Ex: 500"
                    type="number"
                    value={volumeRecipiente}
                    onChange={(e) => setVolumeRecipiente(e.target.value)}
                  />
                </Field.Root>
              </Stack>
              <Button
                mt={3}
                colorScheme="green"
                onClick={handleSalvarRecipiente}
                loading={isSavingRecipiente}
              >
                Salvar recipiente
              </Button>
            </Box>

            <LinkButton to="/dashboard" variant="outline" colorScheme="blue">
              Voltar ao Painel
            </LinkButton>
          </VStack>
        </Box>
      </Container>
    </Layout>
  );
}
