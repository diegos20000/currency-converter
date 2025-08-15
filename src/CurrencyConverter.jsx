import React, { useState, useEffect} from "react";
import axios from "axios";
import "./App.css";

const CurrencyConverter = () => {
    const [currencies, setCurrencies] = useState({});
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [amount, setAmount] = useState(1);
    const [result, setResult] = useState(0);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
            const response = await axios.get(`https://open.er-api.com/v6/latest/${fromCurrency}`);
            setCurrencies(response.data.rates);
            calculateConversion(amount, response.data.rates[toCurrency]);
        } catch (error) {
            console.error("Error al obtener tasas de cambio:", error);
            }
        };

        fetchCurrencies();
    }, [fromCurrency, toCurrency]);

    //calcular conversion
    const calculateConversion = (amountValue ,rate) => {
        if (!rate) return;
        const Result = (amountValue * rate).toFixed(2);
        setResult(Result);
    };

    //cuando cambia el monto
    const handleAmountChange = (e) => {
        const newAmount = parseFloat(e.target.value);
        setAmount(newAmount);
        calculateConversion(newAmount, currencies[toCurrency]);
    };

    //cuando cambia la moneda destino
    const handleToCurrencyChange = (e) => {
        const newToCurrency = e.target.value;
        setToCurrency(newToCurrency);
        calculateConversion(amount, currencies[newToCurrency]);
    };

    const handleSwap = () => {
        const temp = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(temp);
    };

    return (
        <div>
            <h1>Calculadora de Conversión de Monedas</h1>

            <div>
                <input 
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    
                />

                <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                    {Object.keys(currencies).map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>

                <span> a </span>

                <select value={toCurrency} onChange={handleToCurrencyChange}>
                    {Object.keys(currencies).map((currency) => {
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    })}
                </select>
                <div>
                    <button onClick={handleSwap}>🔁 Intercambiar</button>
                </div>
            </div>

            <div className="result">
                    Resultado: {result} {toCurrency}
            </div>
        </div>
    );
};

export default CurrencyConverter;

