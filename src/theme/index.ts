import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: {
          value: "#007BDB",
        },
        primaryLight: {
          value: "#3399FF",
        },
        background: {
          value: "#F4F7FA",
        },
        text: {
          value: "#3A3A3A",
        },
        muted: {
          value: "#7B8A97",
        },
        info: {
          value: "#26C6DA",
        },
        danger: {
          value: "#FF6B6B",
        },
      },
    },
  },
});

const system = createSystem(defaultConfig, config);

export default system;
