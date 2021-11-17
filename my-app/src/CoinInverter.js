import './CoinInverter.css';
import React from 'react';
import { useState, useEffect } from "react";

function CoinInverter(){
    const [loading, setLoading] = useState("true");
    const [coins, setCoins] = useState([]);
    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers")
        .then((response) => response.json())
        .then((json) => setCoins(json));
        setLoading(false);
    }, []);
    return(
        <div>
            <h1>Coin Tracker 2021</h1>
            <h3>Total number of coins: ({coins.length})</h3>
            {loading ? <strong>Loading...</strong> : null}
            <ul>
            {coins.map((coin) => <li>{coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD</li>)}
            </ul>
        </div>
    );
}

export default CoinInverter;