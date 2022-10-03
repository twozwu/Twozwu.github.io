//BtnContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";

//預設要傳遞的值(給作用域外(非同一棵樹時)的用--順位)
const defaultValue = {
  isLoading: false,
  FeatureList: [],
  emit: (val) => {
    console.log(val);
  },
};

const PortfolioContext = createContext(defaultValue);

interface ChildrenProps {
  children?: React.ReactNode;
}

let originData = [];

// 設定值的時候調用他
export const PortfolioProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [FeatureList, setFeatureList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url =
    "https://script.google.com/macros/s/AKfycbxKavvV1RFjxE0s51aEwpV8m2TemJo5j09Yt5wiQalIroOYq0K_Weg9r1m6zmjGBWpx/exec";

  async function fetchData() {
    setIsLoading(true);
    const response = await fetch(url);
    originData = (await response.json()).reverse();
    setFeatureList(originData);
    console.log(originData);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, []);

  function emit(val) {
    if (val !== "all") {
      // console.log(val, originData);
      setFeatureList(
        originData.filter((item) => {
          return item.tag === val;
        })
      );
    } else {
      setFeatureList(originData);
    }
  }
  return (
    <>
      <PortfolioContext.Provider
        // 這裡的value為要傳遞的值(同一棵樹時--優先)
        value={{ FeatureList, isLoading, emit }}
      >
        {children}
      </PortfolioContext.Provider>
    </>
  );
};

// 取值的時候調用他
export const usePortfolioContext = () => {
  return useContext(PortfolioContext);
};
