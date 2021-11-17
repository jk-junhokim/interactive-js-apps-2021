import './CoinInverter.css';
import React from 'react';
import { useState, useEffect } from "react";

/* 
https://www.robinwieruch.de/react-event-handler/
*/

function CoinInverter(){
    const [loading, setLoading] = useState("true");
    const [coins, setCoins] = useState([]);
    const onChange = (event) => {
        console.log(event.target.value);
    }
    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers")
        .then((response) => response.json())
        .then((json) => setCoins(json));
        setLoading(false);
    }, []);
    return(
        <div>
            <h1>Coin Inverter 2021</h1>
            <h3>Total number of coins: ({coins.length})</h3>
            {loading ? <strong>Loading...</strong> : (
                <select value={coin} onChange={onChange}>
                    {coins.map((coin) => 
                        <option>{coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD</option>
                    )}
                </select>
            )}
        </div>
    );
}

export default CoinInverter;