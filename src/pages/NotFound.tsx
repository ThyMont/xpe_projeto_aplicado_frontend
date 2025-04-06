import { Container, Heading, Text } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <Container centerContent mt={12}>
      <Heading>404</Heading>
      <Text mt={4}>Página não encontrada</Text>
    </Container>
  );
}
