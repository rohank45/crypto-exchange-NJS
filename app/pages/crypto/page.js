"use client";

import React, { useEffect } from "react";
import axios from "axios";

const Page = () => {
  const getData = async () => {
    try {
      const options = {
        method: "GET",
        url: "https://coinranking1.p.rapidapi.com/coins",
        params: {
          referenceCurrencyUuid: "yhjMzLPhuIDl",
          timePeriod: "24h",
          "tiers[0]": "1",
          orderBy: "marketCap",
          orderDirection: "desc",
          limit: "50",
          offset: "0",
        },
        headers: {
          "X-RapidAPI-Key":
            "08295af6edmsh25c9fc24b3b7d6fp1b591ejsn18d6e7fda81d",
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);
      console.log("response", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return <div>page</div>;
};

export default Page;
