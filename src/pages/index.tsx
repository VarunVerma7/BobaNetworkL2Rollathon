import type { NextPage } from "next";
import Head from "next/head";

import Counter from "../features/counter/Counter";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Features from "../components/Features";
const IndexPage: NextPage = () => {
  return (
    <div>
      <Header />
      <Features />
    </div>
  );
};

export default IndexPage;
