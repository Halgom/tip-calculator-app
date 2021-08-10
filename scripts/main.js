const billInput = document.getElementById("bill-amount");
const tip5 = document.getElementById("tip-5");
const tip10 = document.getElementById("tip-10");
const tip15 = document.getElementById("tip-15");
const tip25 = document.getElementById("tip-25");
const tip50 = document.getElementById("tip-50");
const tipCustom = document.getElementById("tip-custom");
const nbPeopleInput = document.getElementById("number-of-people");
const resetButton = document.getElementById("reset");
const tipAmountOut = document.getElementById("tip-amount");
const totalOut = document.getElementById("total");

tipButtons = [tip5, tip10, tip15, tip25, tip50, tipCustom];

function tipSelectorReset () {
    for (let i = 0; i < tipButtons.length; i++) {
        tipButtons[i].classList.remove("active");
    }
}
function reset () {
    tipSelectorReset();
    billInput.value = "";
    tipCustom.value = "";
    nbPeopleInput.value = "";
    tipAmountOut.innerHTML = "";
    totalOut.innerHTML = "";
}

function update () {
    let billAmount = billInput.value;
    let nbPeople = nbPeopleInput.value;
    let tipPercentage = function () {
        for (let i = 0; i < tipButtons.length; i++) {
            if (tipButtons[i].classList.contains("active")) {
                switch (i) {
                    case 0:
                        return 5 / 100;
                    case 1:
                        return 10 / 100;
                    case 2:
                        return 15 / 100;
                    case 3:
                        return 25 / 100;
                    case 4:
                        return 50 / 100;
                    case 5:
                        if (tipCustom.value !== "")
                            return tipCustom.value / 100;
                        else
                            return 0;
                }
            }
        }
    }
    let tipAmount = billAmount * tipPercentage() / nbPeople;
    let total = billAmount * (1 + tipPercentage()) / nbPeople;
    if (isFinite(total) && !isNaN(total) && tipPercentage() !== 0) {
        tipAmountOut.innerHTML = "$" + tipAmount.toFixed(2);
        totalOut.innerHTML = "$" + total.toFixed(2);
    } else {
        tipAmountOut.innerHTML = "";
        totalOut.innerHTML = "";
    }
}

billInput.addEventListener("input", update);
nbPeopleInput.addEventListener("input", update);

for (let i = 0; i < tipButtons.length; i++) {
    tipButtons[i].addEventListener("click", () => {
        tipSelectorReset();
        tipButtons[i].classList.add("active");
        update();
    });
}
tipCustom.addEventListener("input", update);
resetButton.addEventListener("click", reset);

reset();
