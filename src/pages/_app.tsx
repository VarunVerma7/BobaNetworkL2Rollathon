import "../styles/globals.css";

import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import store from "../app/store";
import { extendTheme } from "@chakra-ui/react";
import { WagmiProvider } from "wagmi";
import { chain, defaultChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

// API key for Ethereum node
// Two popular services are Infura (infura.io) and Alchemy (alchemy.com)
const infuraId = process.env.INFURA_ID;

// Chains for connectors to support
const chains = defaultChains;

const supportedChains = [
  {
    id: 28,
    name: "Boba Network Rinkeby Testnet",
    nativeCurrency: { name: "Rinkeby", symbol: "ETH", decimals: 18 },
    rpcUrls: ["https://rinkeby.boba.network/"],
    blockExplorers: [
      {
        name: "Rinkeby Boba Explorer",
        url: "https://blockexplorer.rinkeby.boba.network/",
      },
    ],
    testnet: true,
  },
  {
    id: 288,
    name: "Boba Network",
    nativeCurrency: { name: "Boba", symbol: "ETH", decimals: 18 },
    rpcUrls: ["https://mainnet.boba.network/"],
    blockExplorers: [
      { name: "Boba Scan", url: "https://blockexplorer.boba.network/" },
    ],
    testnet: true,
  },
];

const connectors = () => {
  return [
    // @ts-ignore
    new InjectedConnector({ chains: supportedChains }),
    new WalletConnectConnector({
      options: {
        rpc: {
          28: "https://rinkeby.boba.network/",
        },
        qrcode: true,
      },
    }),
  ];
};

const theme = extendTheme({ colors });
export default function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <WagmiProvider>
          <Component connectors={connectors} {...pageProps} />
        </WagmiProvider>
      </ChakraProvider>
    </Provider>
  );
}
