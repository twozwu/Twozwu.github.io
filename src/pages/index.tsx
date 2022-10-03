import React, { useContext, useState } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import {
  PortfolioProvider,
  usePortfolioContext,
} from "../context/PortfolioContext";

import styles from "./index.module.css";

enum filter {
  "fullstack",
  "frontend",
  "backend",
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const data = usePortfolioContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={clsx('gap-x-3 mt-4', styles.buttons)}>
          <button
            className="button button--secondary button--sm"
            onClick={() => data.emit("all")}
          >
            全部
          </button>
          <button
            className="button button--secondary button--sm"
            onClick={() => data.emit("fullstack")}
          >
            Fullstack專案
          </button>
          <button
            className="button button--secondary button--sm"
            onClick={() => data.emit("frontend")}
          >
            Frontend專案
          </button>
          <button
            className="button button--secondary button--sm"
            onClick={() => data.emit("backend")}
          >
            Backend專案
          </button>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <PortfolioProvider>
      <Layout
        title={`Hello from ${siteConfig.title}`}
        description="Description will go into a meta tag in <head />"
      >
        <HomepageHeader />
        <main>
          <HomepageFeatures />
        </main>
      </Layout>
    </PortfolioProvider>
  );
}
