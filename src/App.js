import {useState, useEffect} from "react";

function App() {
  const [loading, setLodaing] = useState(true);
  const [coins, setCoins] = useState([]);
  // const [symbol, setSymbol] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response) => response.json())
    .then((json) => {
      setCoins(json);
      setLodaing(false);
    });
  }, []);
  function onSelect(e){
    const index = e.target.selectedIndex;
    console.log(e.target.childNodes[index].dataset.name)
    console.log(e.target.childNodes[index].value)
  };
return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? <strong>Loading...</strong> :
        <select onChange={onSelect}>
          <option>Select Coins</option>
          {coins.map((coin) => <option 
                                  key = {coin.id}
                                  value = {coin.quotes.USD.price}
                                  id = {coin.id}
                                  data-name = {coin.symbol}
                                > {coin.name} ({coin.symbol}) : {coin.quotes.USD.price}</option>)}
        </select>
      }
    </div>
  )
}

export default App;

