import { ReactNode } from "react";
import { Box, Container } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import { useHydrationReminder } from "../hooks/useHydrationReminder";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  useHydrationReminder();

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Header />
      <Container maxW="container.md" mt={8} flex="1">
        {children}
      </Container>
      <Footer />
    </Box>
  );
}
