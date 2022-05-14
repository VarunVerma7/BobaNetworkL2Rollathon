import type { NextPage } from "next";
import Head from "next/head";

import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Features from "../components/Features";
import Navbar from "../components/Navbar";
const IndexPage: NextPage = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <Features />
    </div>
  );
};

export default IndexPage;
