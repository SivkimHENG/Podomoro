import { useEffect, useState } from "react";
import "./App.css";
import Podomoro from "./components/Podomoro";
function App() {
  return (
    <div className="App-header">
      <h1> Podomoro's Clock </h1>
      <Podomoro />
    </div>
  );
}

export default App;
