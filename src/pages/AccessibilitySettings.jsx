import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

function AccessibilitySettings() {
  return (
    <Box p={5}>
      <Heading as="h1" size="xl">
        Accessibility Settings
      </Heading>
      <Text mt={4}>Here you can adjust the accessibility settings for the site.</Text>
    </Box>
  );
}

export default AccessibilitySettings;
