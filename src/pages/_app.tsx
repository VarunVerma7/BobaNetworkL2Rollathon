import "../styles/globals.css";

import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import store from "../app/store";
import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });
export default function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}
