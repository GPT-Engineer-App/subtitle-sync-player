import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Button } from "@chakra-ui/react";

function Navigation() {
  return (
    <Box as="nav" bg="teal.500" p={4}>
      <Flex justify="space-between">
        <Button as={Link} to="/" colorScheme="teal" variant="ghost">
          Home
        </Button>
        <Button as={Link} to="/accessibility-settings" colorScheme="teal" variant="ghost">
          Accessibility Settings
        </Button>
      </Flex>
    </Box>
  );
}

export default Navigation;
