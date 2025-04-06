import { Box, Button, Container, Heading, Input, Stack, Field } from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { toaster } from "@/components/ui/toaster";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, senha);
    } catch {
      toaster.create({
        title: "Erro no login",
        description: "Verifique seu e-mail e senha.",
        type: "error",
        duration: 3000,
        closable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
          Login
        </Heading>

        <Stack spaceX={4}>
          <Field.Root required>
            <Field.Label>Email</Field.Label>
            <Input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Senha</Field.Label>
            <Input
              type="password"
              placeholder="********"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </Field.Root>

          <Button type="submit" colorScheme="blue" loading={isLoading} loadingText="Entrando...">
            Entrar
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
