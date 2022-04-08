// The code below is for blending two NaOH aqueous solutions
// It blends solution A with solution B, solves for resulting solution C
// WEIGHT BASIS

import { useRef, useState } from "react";
import { spgTable } from "./Tables";
import { wtPctTable } from "./Tables";

// Hide output displays whenever any of the input fiels is touched
// So results are displayed only when calculations are updated
const hideTable = () => {
  document.getElementById("wshowWtC").style.visibility = "hidden";
  document.getElementById("wshowSpC").style.visibility = "hidden";
  document.getElementById("wshowBaumeC").style.visibility = "hidden";
  document.getElementById("wshowMassC").style.visibility = "hidden";
};

const unHideTable = () => {
  document.getElementById("wshowWtC").style.visibility = "visible";
  document.getElementById("wshowSpC").style.visibility = "visible";
  document.getElementById("wshowBaumeC").style.visibility = "visible";
  document.getElementById("wshowMassC").style.visibility = "visible";
};

const isEmpty = (value) => value.trim() === "";

const onChangeMassA = () => {
  hideTable();
};
const onChangeWtA = () => {
  hideTable();
};
const onChangeMassB = () => {
  hideTable();
};
const onChangeWtB = () => {
  hideTable();
};

// ********************* Component function *****************
const BlenderW = () => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    massA: true,
    wtA: true,
    massB: true,
    wtB: true,
  });

  const massARef = useRef();
  const wtARef = useRef();
  const massBRef = useRef();
  const wtBRef = useRef();

  const submitHandler = (event) => {
    // ************ SUBMIT FORM ***************
    event.preventDefault();

    const inputMassA = massARef.current.value;
    const inputWtA = wtARef.current.value;
    const inputMassB = massBRef.current.value;
    const inputWtB = wtBRef.current.value;

    // Validate input data
    const inputMassAIsValid = !isEmpty(inputMassA) && inputMassA > 0;
    const inputWtAIsValid =
      !isEmpty(inputWtA) && (inputWtA >= 0) & (inputWtA <= 51);
    const inputMassBIsValid = !isEmpty(inputMassB) && inputMassB >= 0;
    const inputWtBIsValid =
      !isEmpty(inputWtB) && (inputWtB >= 0) & (inputWtB <= 51);

    setFormInputsValidity({
      massA: inputMassAIsValid,
      wtA: inputWtAIsValid,
      massB: inputMassBIsValid,
      wtB: inputWtBIsValid,
    });

    const formIsValid =
      inputMassAIsValid &&
      inputWtAIsValid &&
      inputMassBIsValid &&
      inputWtBIsValid;

    if (!formIsValid) {
      hideTable();
      return;
    }

    // ******************************* MASS BALANCE *************************

    let massC = parseFloat(inputMassA) + parseFloat(inputMassB);
    let massSoda = (inputMassA * inputWtA + inputMassB * inputWtB) / 100;
    let wtC = (massSoda / massC) * 100;

    // **************************** SOLVE SOLUTION C **********************
    // Get next upper indexB from table
    const upperIndexC = wtPctTable.findIndex(lookUpIndexC);
    function lookUpIndexC(value, index, array) {
      return value > wtC;
    }

    // Get these 4 values from spgTable
    let upperSpgC = spgTable[upperIndexC];
    let lowerSpgC = spgTable[upperIndexC - 1];
    let upperWtC = wtPctTable[upperIndexC];
    let lowerWtC = wtPctTable[upperIndexC - 1];

    //CALCULATE CORRESPONDING SPG C BY INTERPOLATION
    let deltaWtC = wtC - lowerWtC;
    let intervalWtC = upperWtC - lowerWtC;
    let intervalSpgC = upperSpgC - lowerSpgC;
    let interpFactorC = deltaWtC / intervalWtC;
    let deltaSpgC = interpFactorC * intervalSpgC;
    let SpgC = lowerSpgC + deltaSpgC;

    let baumeC = 145 * (1 - 1 / SpgC);

    unHideTable();

    console.log("massC " + massC);
    console.log("wtC " + wtC);
    console.log("SpgC " + SpgC);
    console.log("baumeC " + baumeC);
    console.log("massSoda " + massSoda);

    document.getElementById("wshowWtC").innerHTML = wtC.toFixed(2);
    document.getElementById("wshowSpC").innerHTML = SpgC.toFixed(4);
    document.getElementById("wshowBaumeC").innerHTML = baumeC.toFixed(2);
    document.getElementById("wshowMassC").innerHTML = massC.toFixed(2);
  };

  return (
    <div className="container-wblend">
      <h2>
        Blending two solutions <br /> WEIGHT BASIS: <br /> A + B -&gt; C
      </h2>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="massA">Weight solution A &nbsp; (User units)</label>
          <br />
          <input
            type="text"
            id="massA"
            ref={massARef}
            placeholder="+Number"
            onChange={onChangeMassA}
          />
          {!formInputsValidity.massA && (
            <p className="message">Please enter a positive value</p>
          )}
          <br />
          <label htmlFor="wtA">Weight% NaOH solution A</label>
          <br />
          <input
            type="text"
            id="wtA"
            ref={wtARef}
            placeholder="0 to 51"
            onChange={onChangeWtA}
          />
          {!formInputsValidity.wtA && (
            <p className="message">Please enter value from 0 to 51</p>
          )}
        </div>
        <br />
        <div>
          <label htmlFor="massB">Weight solution B &nbsp; (User units)</label>
          <br />
          <input
            type="text"
            id="massB"
            ref={massBRef}
            placeholder="+Number"
            onChange={onChangeMassB}
          />
          {!formInputsValidity.massB && (
            <p className="message">Please enter a positive value</p>
          )}
          <br />
          <label htmlFor="wtB">Weight% NaOH solution B (water=0)</label>
          <br />
          <input
            type="text"
            id="wtB"
            ref={wtBRef}
            placeholder="0 to 51"
            onChange={onChangeWtB}
          />
          {!formInputsValidity.wtB && (
            <p className="message">Please enter value from 0 to 51</p>
          )}
        </div>
        <br />
        <button>Submit</button>
      </form>

      <h2>Resulting solution C</h2>
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
              id="wshowWtC"
              style={{ fontWeight: "bold", color: "maroon" }}
            ></td>
          </tr>
          <tr>
            <td>Sp G</td>
            <td
              id="wshowSpC"
              style={{ fontWeight: "bold", color: "maroon" }}
            ></td>
          </tr>
          <tr>
            <td>°Baumé</td>
            <td
              id="wshowBaumeC"
              style={{ fontWeight: "bold", color: "maroon" }}
            ></td>
          </tr>
          <tr>
            <td>Weight</td>
            <td
              id="wshowMassC"
              style={{ fontWeight: "bold", color: "maroon" }}
            ></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BlenderW;
