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
        } catch (error) {
            console.error("Error al obtener tasas de cambio:", error);
            }
        };

        fetchCurrencies();
    }, [fromCurrency]);

    useEffect(() => {
        if (currencies[toCurrency]) {
            calculateConversion(amount, currencies[toCurrency]);
        }
    }, [currencies, toCurrency, amount]);

    //calcular conversion
    const calculateConversion = (amountValue ,rate) => {
        if (!rate) return;
        const resultValue = (amountValue * rate).toFixed(2);
        setResult(resultValue);
    };

    //cuando cambia el monto
    const handleAmountChange = (e) => {
        const newAmount = parseFloat(e.target.value) || 0;
        setAmount(newAmount);
    };

    //cuando cambia la moneda destino
    const handleToCurrencyChange = (e) => {
        setToCurrency(e.target.value);
    };

    const handleFromCurrencyChange = (e) => {
        setFromCurrency(e.target.value);
    }

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    return (
        <div className="container">
            <div className="main">
            <h1>Calculadora de Conversión de Monedas</h1>

            <div className="input-group">
                <input 
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    
                />

                <select value={fromCurrency} onChange={handleFromCurrencyChange}>
                    {Object.keys(currencies).map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>

                <span style={{ fontSize: "1.5rem", margin: "0 10px" }}>➡️</span>

                <select value={toCurrency} onChange={handleToCurrencyChange}>
                    {Object.keys(currencies).map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>

            <button onClick={handleSwap}>🔁 Intercambiar</button>
                
            <div className="result">
                    Resultado: <strong>{result} {toCurrency}</strong>
            </div>
        </div>
        </div>
    );
};

export default CurrencyConverter;

