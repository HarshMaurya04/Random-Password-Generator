import { useState } from "react";
import "./App.css";
import { Flip, toast, ToastContainer } from "react-toastify";
import { LowerCh, NumberCh, SymbolCh, UpperCh } from "./data/PassChar";

function App() {
  let [uppercase, setUppercase] = useState(false);
  let [lowercase, setLowercase] = useState(false);
  let [number, setNumber] = useState(false);
  let [symbol, setSymbol] = useState(false);
  let [passlength, setPasslength] = useState(8);
  let [showpass, setShowpass] = useState("");

  let createPassword = () => {
    let finalPassword = "";
    let charSet = "";
    if (uppercase || lowercase || number || symbol) {
      if (uppercase) charSet += UpperCh;
      if (lowercase) charSet += LowerCh;
      if (number) charSet += NumberCh;
      if (symbol) charSet += SymbolCh;

      for (let i = 0; i < passlength; i++) {
        finalPassword += charSet.charAt(
          Math.floor(Math.random() * charSet.length)
        );
      }
      setShowpass(finalPassword);
    } else {
      toast.error("Select at least one checkbox!");
    }
  };

  let copyPass = () => {
    if (showpass) {
      navigator.clipboard
        .writeText(showpass)
        .then(() => {
          toast.success("Password copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy:", err);
        });
    } else {
      toast.info("Generate the password first!");
    }
  };

  return (
    <div className="container">
      <div className="passBox">
        <h2 className="heading">Password Generator</h2>

        <div className="inputField">
          <input type="text" readOnly value={showpass} />
          <button onClick={copyPass}>Copy</button>
        </div>

        <div className="passLength">
          <label>Password length:</label>
          <input
            type="number"
            max={20}
            min={8}
            value={passlength}
            onChange={(event) => setPasslength(event.target.value)}
          />
        </div>

        <div className="includeField">
          <label>Include uppercase letters:</label>
          <input
            type="checkbox"
            checked={uppercase}
            onChange={() => setUppercase(!uppercase)}
          />
        </div>

        <div className="includeField">
          <label>Include lowercase letters:</label>
          <input
            type="checkbox"
            checked={lowercase}
            onChange={() => setLowercase(!lowercase)}
          />
        </div>

        <div className="includeField">
          <label>Include numbers:</label>
          <input
            type="checkbox"
            checked={number}
            onChange={() => setNumber(!number)}
          />
        </div>

        <div className="includeField">
          <label>Include symbols:</label>
          <input
            type="checkbox"
            checked={symbol}
            onChange={() => setSymbol(!symbol)}
          />
        </div>

        <div className="genBtn">
          <button onClick={createPassword}>Generate Password</button>
        </div>
      </div>

      <ToastContainer transition={Flip} />
    </div>
  );
}

export default App;
