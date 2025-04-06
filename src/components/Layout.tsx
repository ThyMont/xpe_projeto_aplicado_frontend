import { ReactNode } from "react";
import { Box, Container } from "@chakra-ui/react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box>
      <Header />
      <Container maxW="container.md" mt={8}>
        {children}
      </Container>
    </Box>
  );
}
