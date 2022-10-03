import React, { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import Loading from "../Loading";
import dayjs from "dayjs";
import { usePortfolioContext } from "@site/src/context/PortfolioContext";

type FeatureItem = {
  title: string;
  // Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  imgUrl: string;
  date: string;
};

// const FeatureList: FeatureItem[] = [
//   {
//     title: 'Easy to Use',
//     imgUrl: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
//     description: (
//       <>
//         Docusaurus was designed from the ground up to be easily installed and
//         used to get your website up and running quickly.
//       </>
//     ),
//     date: '2001/10/10'
//   },
// ];

function Feature({ title, description, imgUrl, webUrl, githubUrl, date, tag }) {
  return (
    <div className={clsx("col col--4")}>
      <Link to={webUrl} className="text--center">
        <img
          src={imgUrl}
          className="w-full h-52 object-cover ring-green-400 hover:ring-4"
          role="img"
        />
      </Link>
      <div className="text--center padding-horiz--md">
        <h3 className="text-2xl my-3">{title}</h3>
        <p>{description}</p>
        <div className="row justify-center items-center gap-x-3">
          <p>{dayjs(date).format("YYYY/MM/DD")}</p>
          <Link to={githubUrl}>
            <img
              src={require("@site/static/img/icons8-github-50.png").default}
              className="w-full h-6 object-contain"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  const data = usePortfolioContext();

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row gap-y-6">
          {data.isLoading ? (
            <Loading />
          ) : (
            data.FeatureList?.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
