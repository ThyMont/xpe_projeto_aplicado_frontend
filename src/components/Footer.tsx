import { Box, Container, Stack, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box as="footer" bg="gray.100" py={4} mt={12}>
      <Container maxW="container.md">
        <Stack spaceY={2} textAlign="center">
          <Text fontWeight="bold">Hydrapp 💧</Text>
          <Text fontSize="sm" color="gray.600">
            Cuidando da sua hidratação, todos os dias.
          </Text>
          <Text fontSize="xs" color="gray.500">
            © {new Date().getFullYear()} Hydrapp. Todos os direitos reservados.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
