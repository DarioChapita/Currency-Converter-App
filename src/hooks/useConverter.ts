import { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY, API_URL } from "../constansts";

const useConverter = (
  fromCurrency: string = "USD",
  toCurrency: string = "EUR",
  amount: number = 100
): [number, () => Promise<void>, boolean, any] => {
  const [loadingConverter, setLoadingConverter] = useState(true);
  const [convertedCurrencies, setconverterCurrencies] = useState(0);

  const loadConvert = async () => {
    const apiUrl = `${API_URL}/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`;
    setLoadingConverter(true);
    const { data } = await axios.get(apiUrl);
    validateData(data);
    setLoadingConverter(false);
  };

  const validateData = async (data: any) => {
    if (data.result === "success") {
      setconverterCurrencies(data.conversion_result);
    } else {
      console.error(
        "Error al obtener tasas de conversión:",
        data["error-type"]
      );
    }
  };

  useEffect(() => {
    loadConvert();
  }, []);

  return [
    convertedCurrencies,
    loadConvert,
    loadingConverter,
    setLoadingConverter,
  ];
};

export default useConverter;
