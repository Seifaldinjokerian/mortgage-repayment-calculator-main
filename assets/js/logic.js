const valueInput = document.getElementById("theValue"),
  clearAll = document.getElementById("clearAll"),
  termInput = document.getElementById("theTerm"),
  rateInput = document.getElementById("theRate"),
  repayment = document.getElementById("repay"),
  interest = document.getElementById("interest"),
  calculating = document.getElementById("calculate"),
  resultCont = document.getElementsByClassName("results")[0];

clearAll.addEventListener("click", () => {
  valueInput.value = "";
  termInput.value = "";
  rateInput.value = "";
  repayment.checked = false;
  interest.checked = false;
});

calculating.addEventListener("click", () => {
  checker();
  let arrError = Array.from(document.querySelectorAll(".error")).filter((el) =>
    el.classList.contains("required")
  );
  if (arrError.length > 0) {
    createResultSec(false);
  }
  if (arrError.length === 0) {
    createResultSec(true);
  }
});

function calculator(principal, annualInterestRate, years) {
  let monthlyInterestRate = annualInterestRate / 100 / 12;
  let numberOfPayments = years * 12;

  let numerator =
    principal *
    monthlyInterestRate *
    Math.pow(1 + monthlyInterestRate, numberOfPayments);
  let demoninator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;

  return numerator / demoninator;
}

function checker() {
  if (valueInput.value === "") {
    document.querySelector(".price .error").classList.add("required");
    valueInput.classList.add("required");
    document
      .querySelector(".price span:last-of-type")
      .classList.add("required");
  } else {
    document.querySelector(".price .error").classList.remove("required");
    valueInput.classList.remove("required");
    document
      .querySelector(".price span:last-of-type")
      .classList.remove("required");
  }

  if (termInput.value === "") {
    document.querySelector(".term .error").classList.add("required");
    termInput.classList.add("required");
    document.querySelector(".term span:last-of-type").classList.add("required");
  } else {
    document.querySelector(".term .error").classList.remove("required");
    termInput.classList.remove("required");
    document
      .querySelector(".term span:last-of-type")
      .classList.remove("required");
  }

  if (rateInput.value === "") {
    document.querySelector(".rate .error").classList.add("required");
    rateInput.classList.add("required");
    document.querySelector(".rate span:last-of-type").classList.add("required");
  } else {
    document.querySelector(".rate .error").classList.remove("required");
    rateInput.classList.remove("required");
    document
      .querySelector(".rate span:last-of-type")
      .classList.remove("required");
  }

  if (repayment.checked == false && interest.checked == false) {
    document.querySelector(".types .error").classList.add("required");
  } else {
    document.querySelector(".types .error").classList.remove("required");
  }
}

function createResultSec(e) {
  if (e === false) {
    return false;
  } else {
    resultCont.innerHTML = "";
    resultCont.classList.add("calc");

    let h2 = document.createElement("h2"),
      para = document.createElement("p"),
      totallyDiv = document.createElement("div"),
      monthlyPayDiv = document.createElement("div"),
      monthlySpan = document.createElement("span"),
      monthlyH1 = document.createElement("h1"),
      inTermDiv = document.createElement("div"),
      inTermSpan = document.createElement("span"),
      inTermH3 = document.createElement("h3"),
      hr = document.createElement("hr");

    totallyDiv.className = "totally";
    monthlyPayDiv.className = "monthlyPay";
    inTermDiv.className = "inTerm";

    h2.appendChild(document.createTextNode("Your results"));
    para.appendChild(
      document.createTextNode(
        `Your results are shown below based on the information you provided.
    To adjust the results, edit the form and click “calculate repayments” again.`
      )
    );
    monthlySpan.appendChild(document.createTextNode("Your monthly repayments"));
    monthlyH1.appendChild(
      document.createTextNode(
        `£${Number(
          calculator(
            valueInput.value,
            rateInput.value,
            termInput.value
          ).toFixed(2)
        ).toLocaleString()}`
      )
    );
    inTermSpan.appendChild(
      document.createTextNode("Total you'll repay over the term")
    );
    inTermH3.appendChild(
      document.createTextNode(
        `£${Number(
          (
            calculator(valueInput.value, rateInput.value, termInput.value) *
            (termInput.value * 12)
          ).toFixed(2)
        ).toLocaleString()}`
      )
    );
    resultCont.append(h2);
    resultCont.append(para);
    resultCont.append(totallyDiv);
    totallyDiv.append(monthlyPayDiv);
    monthlyPayDiv.append(monthlySpan);
    monthlyPayDiv.append(monthlyH1);
    totallyDiv.append(hr);
    totallyDiv.append(inTermDiv);
    inTermDiv.append(inTermSpan);
    inTermDiv.append(inTermH3);
  }
}
