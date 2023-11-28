import React from "react";
import Head from "next/head";
import { LayoutProps } from "@/models/interface";
import Top from "../components/Top";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ meta, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <link rel="icon" href="/mortar.ico" />
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta.description} />

        {/* Google / Search Engine Tags  */}
        <meta itemProp="name" content={meta.title} />
        <meta itemProp="description" content={meta.description} />
        <meta itemProp="image" content={meta.image} />

        {/* Facebook Meta Tags  */}
        <meta property="og:url" content={meta.pathUrl} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />

        {/* Twitter Meta Tags  */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      <Header />
      <main>
        {children}
        <Top />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
