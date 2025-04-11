import { Box, Button, Container, Heading, Input, Stack, Field, Text, Link } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toaster } from "@/components/ui/toaster";
import Header from "../components/Header";
import Layout from "@/components/Layout";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function isValidEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isValidEmail(email)) {
      toaster.create({
        title: "E-mail inválido",
        description: "Por favor, insira um e-mail válido.",
        type: "error",
        duration: 3000,
        closable: true,
      });
      setIsLoading(false);
      return;
    }

    try {
      await api.post("/api/auth/register", { nome, email, senha });

      toaster.create({
        title: "Cadastro realizado",
        description: "Você já pode fazer login.",
        type: "success",
        duration: 3000,
        closable: true,
      });

      navigate("/login");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      toaster.create({
        title: "Erro no cadastro",
        description: "Verifique os dados informados.",
        type: "error",
        duration: 3000,
        closable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Header />

      <Container centerContent mt={12}>
        <Box
          as="form"
          onSubmit={handleSubmit}
          w="100%"
          maxW="md"
          p={8}
          borderWidth={1}
          borderRadius="lg"
          boxShadow="md"
        >
          <Heading mb={6} textAlign="center">
            Cadastro
          </Heading>

          <Stack>
            <Field.Root required>
              <Field.Label>Nome</Field.Label>
              <Input
                autoComplete="off"
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Field.Root>

            <Field.Root required>
              <Field.Label>Email</Field.Label>
              <Input
                autoComplete="new-password"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field.Root>

            <Field.Root required>
              <Field.Label>Senha</Field.Label>
              <Input
                autoComplete="new-password"
                type="password"
                placeholder="********"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </Field.Root>

            <Button
              type="submit"
              colorScheme="blue"
              loading={isLoading}
              loadingText="Cadastrando..."
            >
              Cadastrar
            </Button>

            <Text mt={2} textAlign="center">
              Já possui conta?{" "}
              <Link
                href="/login"
                color="blue.500"
                fontWeight="medium"
                _hover={{ textDecoration: "underline", color: "blue.600" }}
              >
                Entrar
              </Link>
            </Text>
          </Stack>
        </Box>
      </Container>
    </Layout>
  );
}
