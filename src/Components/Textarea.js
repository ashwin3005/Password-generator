import React, { useState } from "react";
import generatePassword from "../password";
import PasswordDisplay from "./PasswordDisplay";
import CheckBoxes from "./CheckBoxes";
import Tips from "./Tips";
import ThemeToggle from "./ThemeToggle";
import { ThemeContext } from "./Context/Theme";

export default function Textarea() {
  const [theme, setTheme] = useState("light");
  const [password, setPassword] = useState(null);
  const [length, setLength] = useState(8);
  const [rangeOutput, setrangeOutput] = useState(8);
  const [setting, setSetting] = useState({
    lowercase: true,
    upperCase: false,
    number: false,
    symbol: false,
  });
  function onChange() {
    setLength(document.getElementById("rangeInput").value);
    setrangeOutput(document.getElementById("rangeInput").value);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme}>
        <div className="container d-flex flex-column h-100 justify-content-center align-items-center">
          <ThemeToggle />
          <div className="card text-center">
            <div className="card-header">
              <h1 className="text-center">Random Password Generator</h1>
            </div>
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <div className="d-flex flex-column w-50">
                <label
                  className="form-label d-flex flex-row align-items"
                  htmlFor="customRange1"
                >
                  <span>Password Length (8-32) :</span>
                  &nbsp;&nbsp;&nbsp;
                  <input
                    className="p-2 text-primary fs-5 font-weight-bold w-25 h-25"
                    id="amount"
                    name="amount"
                    type="number"
                    max={32}
                    min={8}
                    value={rangeOutput}
                    onChange={(e) => {
                      setLength(e.target.value);
                      setrangeOutput(e.target.value);
                    }}
                    onBlur={(e) => {
                      let value = parseInt(e.target.value);
                      console.log(value);
                      if (value > 32) {
                        value = 32;
                      } else if (value < 8) {
                        value = 8;
                      }
                      setLength(value);
                      setrangeOutput(value);
                    }}
                  />
                </label>
                <input
                  type="range"
                  id="rangeInput"
                  name="rangeInput"
                  onChange={onChange}
                  min="8"
                  max="32"
                  value={length || 8}
                  className="my-3"
                  oninput="amount.value=rangeInput.value"
                />

                <CheckBoxes setting={setting} setSetting={setSetting} />
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center">
                {password == null ? (
                  <h5 className="py-2 pt-3">
                    Click generate button for a new password
                  </h5>
                ) : (
                  <PasswordDisplay password={password} />
                )}
              </div>

              <button
                onClick={() => setPassword(generatePassword(length, setting))}
                type="button"
                className="btn btn-primary m-2 btn-lg"
              >
              
                Generate
              </button>
              <button
                onClick={() => {setPassword(null)}}
                type="button"
                className="btn btn-primary btn-lg m-2"
              ><img src="https://user-images.githubusercontent.com/96253622/194433702-d5aff160-cad3-495c-b88f-daa94d65bb03.png" alt="" />
              </button>
            </div>
          </div>
          <br />
          <br />
          <Tips />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
