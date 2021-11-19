import './CoinInverter.css';
import React from 'react';
import { useState, useEffect } from "react";

/* 
https://www.robinwieruch.de/react-event-handler/
https://github.com/MangoSteen0903/react-basic-repractice/blob/317e3a8d30a51eb651708a6205cb8f6cba637e6f/coin-tracker/src/App.js
*/

function CoinInverter(){
    const [loading, setLoading] = useState("true");
    const [coins, setCoins] = useState([]);
    const [userSelect, setUserSelect] = useState("BTC");

    const [usdValue, setUsdValue] = useState("1");
    const [coinValue, setCoinValue] = useState("0");
    const [coinPrice, setCoinPrice] = useState(0);

    const [focus, setFocus] = useState(false);

    const onSubmitCoin = (event) => {
        event.preventDefault();
        if (selectedCoin === "none"){
            return;
        }
        setCoinName(selectedCoin);
        setCoinChosen("true");
    }

    const onChange = (event) => setSelectedCoin(event.target.value);

    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers")
        .then((response) => response.json())
        .then((json) => setCoins(json));
        setLoading(false);
    }, []);
    useEffect(() => {
        if (!loading){
            const coin = coins.find(({symbol, price}) => symbol === userSelect);
            setCoinPrice(coin.quotes.USD.price);
            if (coinPrice !== 0){
                setCoinValue(coinPrice);
            }
        }
    }, [coinPrice, coins, loading, userSelect]);

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

            <form onSubmit={onSubmitCoin}>
                <p>Enter "USD" Amount:</p>
                <input type="number" placeholder="1,000,000" title="usdAmount" name="input" />
                <input type="submit" value="convert to coin" />
            </form>

            <form onSubmit={onSubmitCoin}>
                <p>Enter "{selectedCoin}" Amount:</p>
                <input type="number" placeholder="1,000,000" title="usdAmount" name="input" />
                <input type="submit" value="convert to USD" />
            </form>

        </div>
    );
}

export default CoinInverter;