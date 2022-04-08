// The code below finds the NaOH weight% and SpG of an aqueous solution,
// from the provided °Bé gravity

import React, { useState, useEffect } from "react";
import { spgTable } from "./Tables";
import { wtPctTable } from "./Tables";

const BeConverter = () => {
  const [inputBe, setInputBe] = useState(0);
  const [inputIsValid, setInputIsValid] = useState(false);
  const [inputTouched, setInputTouched] = useState(false);

  useEffect(() => {
    if (isNaN(inputBe) || inputBe < 0 || inputBe > 51) {
      setInputIsValid(false);
      return;
    } else {
      setInputIsValid(true);
    }
  }, [inputBe]);

  // GET THE INPUT
  const changeHandler = (event) => {
    setInputBe(event.target.value);
    setInputTouched(true);
  };

  if (inputTouched) {
    document.getElementById("wtpct2").style.visibility = "hidden";
    document.getElementById("spg2").style.visibility = "hidden";
  }

  // SUBMIT FORM
  const submitHandler = (event) => {
    event.preventDefault();

    setInputTouched(false);

    let inputSpg = 145 / (145 - inputBe);

    // Find index of next upper value
    let upperIndex = spgTable.findIndex(lookUpIndex);
    function lookUpIndex(value, index, array) {
      return value > inputSpg;
    }

    // Find following four values in tables
    let upperSpg = spgTable[upperIndex];
    let lowerSpg = spgTable[upperIndex - 1];
    let upperWtPct = wtPctTable[upperIndex];
    let lowerWtPct = wtPctTable[upperIndex - 1];

    //CALCULATE WT PCT BY INTERPOLATION
    let deltaSpg = inputSpg - lowerSpg;
    let intervalSpg = upperSpg - lowerSpg;
    let intervalWtPct = upperWtPct - lowerWtPct;
    let interpFactor = deltaSpg / intervalSpg;
    let deltaWtPct = interpFactor * intervalWtPct;
    let calcWtPct = lowerWtPct + deltaWtPct;

    let Spg = 145 / (145 - inputBe);

    // DISPLAY RESULT, provided input field touched = false, to avoid false reading
    document.getElementById("wtpct2").style.visibility = "visible";
    document.getElementById("spg2").style.visibility = "visible";
    document.getElementById("wtpct2").innerHTML = calcWtPct.toFixed(2);
    document.getElementById("spg2").innerHTML = Spg.toFixed(4);
  };

  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <label htmlFor="baume">
          Enter Baumé gravity value <br />
          from 0 to 51
        </label>{" "}
        <br />
        <input
          type="text"
          placeholder="0 to 51"
          id="baume"
          onChange={changeHandler}
          value={inputBe}
        ></input>
        {!inputIsValid && (
          <p className="message">Please enter a number between 0 and 51</p>
        )}
        <br />
        <button type="submit">Get the other properties</button> <br />
      </form>
      <br />
      <br />

      <table>
        <thead>
          <tr>
            <th style={{ width: "50%" }}>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Wt% NaOH</td>
            <td
              id="wtpct2"
              style={{ fontWeight: "bold", color: "maroon" }}
            ></td>
          </tr>
          <tr>
            <td>Sp G</td>
            <td id="spg2" style={{ fontWeight: "bold", color: "maroon" }}></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BeConverter;
