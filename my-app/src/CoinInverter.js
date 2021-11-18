import './CoinInverter.css';
import React from 'react';
import { useState, useEffect } from "react";

/* 
https://www.robinwieruch.de/react-event-handler/
*/

function CoinInverter(){
    const [loading, setLoading] = useState("true");
    const [coins, setCoins] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState("none");
    const [coinChosen, setCoinChosen] = useState("false");

    const onChange = (event) => setSelectedCoin(event.target.value);
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
            <h3>Please choose a coin.</h3>
            {loading ? <strong>Loading...</strong> : (
                <select value="value" onChange={onChange}>
                    {coins.map((coin) => 
                        <option>{coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD</option>
                    )}
                </select>
            )}
            <p id="coinIntro">You selected {selectedCoin}</p>

            <form>
                <p>Enter USD Amount:</p>
                <input type="number" placeholder="1,000,000" title="usdAmount" name="input" />
                <input type="submit" value= {coinChosen ? "coin?" : "convert to {coinChosen}"} />
            </form>

        </div>
    );
}

export default CoinInverter;