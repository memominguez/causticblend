// The code below is for blending two NaOH aqueous solutions
// It blends solution A with solution B, solves for resulting solution C
// VOLUME BASIS

import { useRef, useState } from "react";
import { spgTable } from "./Tables";
import { wtPctTable } from "./Tables";

// Hide output displays whenever any of the input fiels is touched
// So results are displayed only when calculations are updated
const hideTable = () => {
  document.getElementById("showWtC").style.visibility = "hidden";
  document.getElementById("showSpC").style.visibility = "hidden";
  document.getElementById("showBaumeC").style.visibility = "hidden";
  document.getElementById("showVolC").style.visibility = "hidden";
};

const unHideTable = () => {
  document.getElementById("showWtC").style.visibility = "visible";
  document.getElementById("showSpC").style.visibility = "visible";
  document.getElementById("showBaumeC").style.visibility = "visible";
  document.getElementById("showVolC").style.visibility = "visible";
};

const isEmpty = (value) => value.trim() === "";

const onChangeVolA = () => {
  hideTable();
};
const onChangeWtA = () => {
  hideTable();
};
const onChangeVolB = () => {
  hideTable();
};
const onChangeWtB = () => {
  hideTable();
};

// ********************* Component function *****************
const BlenderV = () => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    volA: true,
    wtA: true,
    volB: true,
    wtB: true,
  });

  const volARef = useRef();
  const wtARef = useRef();
  const volBRef = useRef();
  const wtBRef = useRef();

  const submitHandler = (event) => {
    // ************ SUBMIT FORM ***************
    event.preventDefault();

    const inputVolA = volARef.current.value;
    const inputWtA = wtARef.current.value;
    const inputVolB = volBRef.current.value;
    const inputWtB = wtBRef.current.value;

    // Validate input data
    const inputVolAIsValid = !isEmpty(inputVolA) && inputVolA > 0;
    const inputWtAIsValid =
      !isEmpty(inputWtA) && (inputWtA >= 0) & (inputWtA <= 51);
    const inputVolBIsValid = !isEmpty(inputVolB) && inputVolB >= 0;
    const inputWtBIsValid =
      !isEmpty(inputWtB) && (inputWtB >= 0) & (inputWtB <= 51);

    setFormInputsValidity({
      volA: inputVolAIsValid,
      wtA: inputWtAIsValid,
      volB: inputVolBIsValid,
      wtB: inputWtBIsValid,
    });

    const formIsValid =
      inputVolAIsValid &&
      inputWtAIsValid &&
      inputVolBIsValid &&
      inputWtBIsValid;

    if (!formIsValid) {
      hideTable();
      return;
    }

    // **************************** SOLVE SOLUTION A **********************
    // Get upper next indexA from table
    const upperIndexA = wtPctTable.findIndex(lookUpIndexA);
    function lookUpIndexA(value, index, array) {
      return value > inputWtA;
    }

    // Get these 4 values from spgTable
    let upperSpgA = spgTable[upperIndexA];
    let lowerSpgA = spgTable[upperIndexA - 1];
    let upperWtA = wtPctTable[upperIndexA];
    let lowerWtA = wtPctTable[upperIndexA - 1];

    //CALCULATE CORRESPONDING SPG A BY INTERPOLATION
    let deltaWtA = inputWtA - lowerWtA;
    let intervalWtA = upperWtA - lowerWtA;
    let intervalSpgA = upperSpgA - lowerSpgA;
    let interpFactorA = deltaWtA / intervalWtA;
    let deltaSpgA = interpFactorA * intervalSpgA;
    let calcSpgA = lowerSpgA + deltaSpgA;

    // **************************** SOLVE SOLUTION B **********************
    // Get upper indexB from table
    const upperIndexB = wtPctTable.findIndex(lookUpIndexB);
    function lookUpIndexB(value, index, array) {
      return value > inputWtB;
    }

    // Get these 4 values from spgTable
    let upperSpgB = spgTable[upperIndexB];
    let lowerSpgB = spgTable[upperIndexB - 1];
    let upperWtB = wtPctTable[upperIndexB];
    let lowerWtB = wtPctTable[upperIndexB - 1];

    //CALCULATE CORRESPONDING SPG B BY INTERPOLATION
    let deltaWtB = inputWtB - lowerWtB;
    let intervalWtB = upperWtB - lowerWtB;
    let intervalSpgB = upperSpgB - lowerSpgB;
    let interpFactorB = deltaWtB / intervalWtB;
    let deltaSpgB = interpFactorB * intervalSpgB;
    let calcSpgB = lowerSpgB + deltaSpgB;

    // console.log('calcSpgB ' + calcSpgB)

    // ******************************* MASS BALANCE *************************
    let massA = inputVolA * calcSpgA;
    let massB = inputVolB * calcSpgB;
    let massC = massA + massB;
    let massSoda = (massA * inputWtA + massB * inputWtB) / 100;
    let wtC = (massSoda / massC) * 100;

    // **************************** SOLVE SOLUTION C **********************
    // Get upper indexB from table
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

    let volC = massC / SpgC;
    let baumeC = 145 * (1 - 1 / SpgC);

    unHideTable();

    document.getElementById("showWtC").innerHTML = wtC.toFixed(2);
    document.getElementById("showSpC").innerHTML = SpgC.toFixed(4);
    document.getElementById("showBaumeC").innerHTML = baumeC.toFixed(2);
    //document.getElementById('showVolC').innerHTML = volC.toFixed(2)

    if (volC <= 1) {
      document.getElementById("showVolC").innerHTML = volC.toFixed(4);
    } else if (volC < 10 && volC > 1) {
      document.getElementById("showVolC").innerHTML = volC.toFixed(3);
    } else if (volC < 100 && volC >= 10) {
      document.getElementById("showVolC").innerHTML = volC.toFixed(2);
    } else if (volC < 1000 && volC >= 100) {
      document.getElementById("showVolC").innerHTML = volC.toFixed(1);
    } else {
      document.getElementById("showVolC").innerHTML = volC.toFixed(0);
    }
  };

  return (
    <div className="container-vblend">
      <h2>
        Blending two solutions <br /> VOLUME BASIS: <br /> A + B -&gt; C
      </h2>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="volA">Volume solution A &nbsp; (User units)</label>
          <br />
          <input
            type="text"
            id="volA"
            ref={volARef}
            placeholder="+Number"
            onChange={onChangeVolA}
          />
          {!formInputsValidity.volA && (
            <p className="message">Please enter a positive number</p>
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
            <p className="message">Please enter a value from 0 to 51</p>
          )}
        </div>
        <br />
        <div>
          <label htmlFor="volB">Volume solution B &nbsp; (User units)</label>
          <br />
          <input
            type="text"
            id="volB"
            ref={volBRef}
            placeholder="+Number"
            onChange={onChangeVolB}
          />
          {!formInputsValidity.volB && (
            <p className="message">Please enter a positive number or zero</p>
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
            <p className="message">Please enter a value from 0 to 51</p>
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
              id="showWtC"
              style={{ fontWeight: "bold", color: "maroon" }}
            ></td>
          </tr>
          <tr>
            <td>Sp G</td>
            <td
              id="showSpC"
              style={{ fontWeight: "bold", color: "maroon" }}
            ></td>
          </tr>
          <tr>
            <td>°Baumé</td>
            <td
              id="showBaumeC"
              style={{ fontWeight: "bold", color: "maroon" }}
            ></td>
          </tr>
          <tr>
            <td>Volume</td>
            <td
              id="showVolC"
              style={{ fontWeight: "bold", color: "maroon" }}
            ></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BlenderV;
