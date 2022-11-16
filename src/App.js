import {useState, useEffect} from "react";

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (e) => setKeyword(e.target.value);
  
  useEffect(() => {
    console.log("only once");
  }, []);
  useEffect(() => {
    if(keyword !== "" && keyword.length > 5){
      console.log("keyword change");
    }
  }, [keyword]);
  useEffect(() => {
    console.log("counter change");
  }, [counter]);
  useEffect(() => {
    console.log("doble change");
  }, [keyword, counter]);
  return (
    <div>
      <input value={keyword} type="text" onChange={onChange} placeholder="Search here..." />
      <h1>{counter}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
}

export default App;
