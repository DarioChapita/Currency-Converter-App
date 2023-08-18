import { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY, API_URL } from "../constansts";

const useCurrencies = (): [string[], () => Promise<void>, boolean] => {
  const [loadingCurrencies, setloadingCurrencies] = useState(true);
  const [currencies, setCurrencies] = useState<any[]>([]);

  const loadCurrencies = async () => {
    const apiUrl = `${API_URL}/${API_KEY}/latest/USD`;

    setloadingCurrencies(true);
    const getData: any = await axios.get(apiUrl);
    setCurrencies(Object.keys(getData.data.conversion_rates));
    setloadingCurrencies(false);
  };

  useEffect(() => {
    loadCurrencies();
  }, []);

  return [currencies, loadCurrencies, loadingCurrencies];
};

export default useCurrencies;
