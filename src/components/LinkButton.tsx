import { ButtonProps, Link as ChakraLink, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";

type LinkButtonProps = ChakraLinkProps & RouterLinkProps & ButtonProps;

export default function LinkButton(props: LinkButtonProps) {
  return (
    <ChakraLink
      as={RouterLink}
      px={6}
      py={3}
      rounded="md"
      fontWeight="medium"
      textAlign="center"
      display="inline-block"
      color="white"
      bg="blue.500"
      _hover={{ bg: "blue.600" }}
      {...props}
    />
  );
}
