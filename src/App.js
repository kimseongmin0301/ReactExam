import {useState, useEffect} from "react";

function App() {
  const [loading, setLodaing] = useState(true);
  const [coins, setCoins] = useState([]);
  const [kind, setKind] = useState("");
  const [price, setPrice] = useState(0);
  const [dollar, setDollar] = useState(0);
  const [won, setWon] = useState(0);
  const [conversion, setConversion] = useState(false);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response) => response.json())
    .then((json) => {
      setCoins(json);
      setLodaing(false);
    });
  }, []);

  useEffect(() => {
    fetch("https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD")
    .then((response) => response.json())
    .then((json) => {
      setWon(json[0].basePrice);
    })
  }, [])

  function onSelect(e){
    const index = e.target.selectedIndex;
    setKind(e.target.childNodes[index].dataset.name)
    setPrice(e.target.childNodes[index].value)    
  };

  function inDollar(e){
    setDollar(e.target.value);
  }
return (
    <div>
      <div>
        <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      </div>

      {loading ? <div><strong>Loading...</strong></div> :
        <div>
          <div>
            <select onChange={onSelect}>
              <option>Select Coins</option>
              {coins.map((coin) => <option 
                                      key = {coin.id}
                                      value = {coin.quotes.USD.price}
                                      id = {coin.id}
                                      data-name = {coin.symbol}
                                    > {coin.name} ({coin.symbol}) : {coin.quotes.USD.price}</option>)}
            </select>
          </div>
          <div>
            <div>
              <label>Dollar ＄</label><input type="number" value={dollar} min="0" onChange={inDollar}/>
            </div>
            <div>
              <label>Won ￦</label><input type="text" value={won * dollar} disabled/>
            </div>
          </div>
          <div>
           <h1>{kind}</h1>
           <h5>살 수 있는 코인 개수 : {!(dollar / price) ? null : dollar/price}</h5>
          </div>
        </div>
      }
    </div>
  )
}

export default App;
