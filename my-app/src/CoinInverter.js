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
    const [coinName, setCoinName] = useState("none");

    const onSubmitCoin = (event) => {
        event.preventDefault();
        if (selectedCoin === "none"){
            return;
        }
        setCoinName(selectedCoin);
        setCoinChosen("true");
    }
    
    /*
    const onSubmit = (event) => {
        event.preventDefault(); // stops from refreshing webpage
        if (toDo === "") {
            return;
        }
        setToDos((currentArray) => [...currentArray, toDo]);
        setToDo(""); // passing empty string as argument through setToDo function
    }
    */

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

            <form onSubmit={onSubmitCoin}>
                <p>Enter USD Amount:</p>
                <input type="number" placeholder="1,000,000" title="usdAmount" name="input" />
                <input type="submit" value="convert to coin" />
            </form>

            <form onSubmit={onSubmitCoin}>
                <p>Enter {selectedCoin.name} Amount:</p>
                <input type="number" placeholder="1,000,000" title="usdAmount" name="input" />
                <input type="submit" value="convert to USD" />
            </form>

        </div>
    );
}

export default CoinInverter;