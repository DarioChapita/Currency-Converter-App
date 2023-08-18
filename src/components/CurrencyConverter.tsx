import React, { useState } from "react";
import useConverter from "../hooks/useConverter";
import useCurrencies from "../hooks/useCurrencies";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Card,
  CardContent,
  Typography
} from "@mui/material";
import Divider from '@mui/material/Divider';

const CurrencyConverter: React.FC<any> = () => {
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [amount, setAmount] = useState<number>(0);
  const [
    convertedCurrencies,
    loadConvert,
    loadingConverter,
    setLoadingConverter,
  ] = useConverter(fromCurrency, toCurrency, amount);
  const [currencies, loadCurrencies, loadingCurrencies] = useCurrencies();

  const handleConvert = async () => {
    if (fromCurrency && toCurrency && amount) {
      setLoadingConverter(true);
      await loadConvert();
      setLoadingConverter(false);
    }
  };

  return (
    <div>
      <Card style={{ margin: '5%' }}>
        <CardContent>
          <FormControl fullWidth style={{ marginBottom: '2%' }}>
            <InputLabel htmlFor="from-currency">From Currency</InputLabel>
            <Select
              id="from-currency"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value as string)}
            >
              {!loadingCurrencies ? (
                currencies.map((currency, index) => (
                  <MenuItem key={index} value={currency}>
                    {currency}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Loading currencies...</MenuItem>
              )}
            </Select>
          </FormControl>
          <Divider />
          <FormControl fullWidth style={{ marginBottom: '2%' }}>
            <InputLabel htmlFor="to-currency">To Currency</InputLabel>
            <Select
              id="to-currency"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value as string)}
            >
              {!loadingCurrencies ? (
                currencies.map((currency, index) => (
                  <MenuItem key={index} value={currency}>
                    {currency}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Loading currencies...</MenuItem>
              )}
            </Select>
          </FormControl>
          <Divider />
          <TextField
            fullWidth
            style={{ marginBottom: '2%' }}
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
          <Button
            variant="contained"
            onClick={handleConvert}
            disabled={loadingConverter}
          >
            Convert
          </Button>
          <CardContent sx={{ flex: '1 0 auto' }}>
            {loadingConverter ? (
              <Typography variant="subtitle1">Loading...</Typography>
            ) : (
              <Typography component="div" variant="h5" gutterBottom>
                Converted Amount $ {convertedCurrencies}
              </Typography>
            )}
          </CardContent>
        </CardContent>
      </Card>
    </div>
  );
  
};

export default CurrencyConverter;
