function checkInput() {
  const inputElement = document.getElementById("name");
  const inputValue = inputElement.value;
  const nameRequired = document.getElementById("name-field");

  // Regular expression to match only letters (uppercase and lowercase)
  const nameCheck = /^[A-Za-z\s]+$/;

  if (inputValue === "") {
    inputElement.classList.add("invalid-input");
    inputElement.style.color = "hsl(231, 11%, 63%)";
    nameRequired.classList.remove("hidden");
    return 0;
  } else if (nameCheck.test(inputValue)) {
    inputElement.classList.remove("invalid-input");
    inputElement.style.color = "hsl(213, 96%, 18%)";
    nameRequired.classList.add("hidden");
    return 1;
  } else {
    inputElement.classList.add("invalid-input");
    inputElement.style.color = "hsl(213, 96%, 18%)";
    return 0;
  }
}

function checkEmail() {
  const emailInput = document.getElementById("email");
  const email = emailInput.value;
  const emailRequired = document.getElementById("email-field");
  // Regular expression to validate email format
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (email === "") {
    emailInput.classList.add("invalid-input");
    emailInput.style.color = "hsl(231, 11%, 63%)";
    emailRequired.classList.remove("hidden");
    return 0;
  } else if (emailRegex.test(email)) {
    emailInput.classList.remove("invalid-input");
    emailInput.style.color = "hsl(213, 96%, 18%)";
    emailRequired.classList.add("hidden");
    return 1;
  } else {
    emailInput.classList.add("invalid-input");
    emailInput.style.color = "hsl(213, 96%, 18%)";
    return 0;
  }
}

function checkPhoneNumber() {
  const phoneInput = document.getElementById("phoneNumber");
  const phoneNumber = phoneInput.value.trim();
  const phoneRequired = document.getElementById("phone-field");
  // Regular expression to validate phone number format
  const phoneRegex = /^\d{10}$/;

  if (phoneNumber === "") {
    phoneInput.classList.add("invalid-input");
    phoneInput.style.color = "hsl(231, 11%, 63%)";
    phoneRequired.classList.remove("hidden");
    return 0;
  } else if (phoneRegex.test(phoneNumber)) {
    phoneInput.classList.remove("invalid-input");
    phoneInput.style.color = "hsl(213, 96%, 18%)";
    phoneRequired.classList.add("hidden");
    return 1;
  } else {
    phoneInput.classList.add("invalid-input");
    phoneInput.style.color = "hsl(213, 96%, 18%)";
    return 0;
  }
}

let formIndex = 1;
showForm(formIndex);

function nextStep(n) {
  checkPhoneNumber();
  checkEmail();
  checkInput();

  if (checkPhoneNumber() & checkEmail() & checkInput()) {
    showForm((formIndex += n));
  }

  /* showForm((formIndex += n)); */
}

function lastStep() {
  planSelection(planIndex);
  refreshAddonPrice();
  sumAddOnPrice();
  nextStep(1);

  if (subPlanMonthly) {
    totalPrice.textContent = "$" + totalSumPrice + "/mo";
    totalPlan.textContent = "Total (per month)";
  } else {
    totalPrice.textContent = "$" + totalSumPrice + "/yr";
    totalPlan.textContent = "Total (per year)";
  }
}

function prevStep() {
  resetAddon();
  nextStep(-1);
  refreshAddonPrice();
}

function resetAddon() {
  totalAddOnPrice = 0;
}

function confirm() {
  const formFive = document.getElementById("f-5");
  const formFour = document.getElementById("f-4");
  formFive.classList.remove("hidden");
  formFour.classList.add("hidden");
}

function showForm(n) {
  let i;
  let forms = document.getElementsByClassName("form-1");
  let stepButton = document.getElementsByClassName("step-button");
  if (n > forms.length) {
    formIndex = 1;
  }
  if (n < 1) {
    formIndex = forms.length;
  }
  for (i = 0; i < forms.length; i++) {
    forms[i].classList.add("hidden");
  }
  for (i = 0; i < stepButton.length; i++) {
    stepButton[i].classList.remove("selected");
  }
  forms[formIndex - 1].classList.remove("hidden");
  stepButton[formIndex - 1].classList.add("selected");
}

let subPlanMonthly = true;
let totalAddOnPrice = 0;
let totalSumPrice = 0;
let planPrice = 0;

function switchPlan() {
  const monthPlans = document.querySelectorAll(".month-plan");
  const yearPlans = document.querySelectorAll(".year-plan");
  let plans = document.getElementsByClassName("plan");
  let n = planIndex;

  monthPlans.forEach((monthPlan) => {
    monthPlan.classList.toggle("hidden");
  });
  yearPlans.forEach((yearPlan) => {
    yearPlan.classList.toggle("hidden");
  });

  if (subPlanMonthly) {
    h4Ele.textContent = plans[n].querySelector("h4").textContent + " (Yearly)";
    recapPlanCost.textContent =
      plans[n].querySelector(".year-plan").textContent;
    totalPlan.textContent = "Total (per year)";
    return (subPlanMonthly = false);
  } else {
    h4Ele.textContent = plans[n].querySelector("h4").textContent + " (Monthly)";
    recapPlanCost.textContent =
      plans[n].querySelector(".month-plan").textContent;
    totalPlan.textContent = "Total (per month)";
    return (subPlanMonthly = true);
  }
}

let plans = document.getElementsByClassName("plan");
const recapPlan = document.querySelector(".recap-plan-text");
const recapPlanCost = document.querySelector(".recap-plan-price");
const h4Ele = recapPlan.querySelector("h4");

let planIndex = 1;
planSelection(planIndex);

function planSelection(n) {
  let i;
  for (i = 0; i < plans.length; i++) {
    plans[i].classList.remove("highlight");
  }

  plans[n].classList.add("highlight");

  if (subPlanMonthly) {
    h4Ele.textContent = plans[n].querySelector("h4").textContent + " (Monthly)";
    recapPlanCost.textContent =
      plans[n].querySelector(".month-plan").textContent;
    planPrice = getPrice(plans[n].querySelector(".month-plan").textContent);
  } else {
    h4Ele.textContent = plans[n].querySelector("h4").textContent + " (Yearly)";
    recapPlanCost.textContent =
      plans[n].querySelector(".year-plan").textContent;
    planPrice = getPrice(plans[n].querySelector(".year-plan").textContent);
  }
  return (planIndex = n);
}

let addOns = document.querySelector(".all-add-on");

function toggleCheckbox(event) {
  const checkbox = event.currentTarget.querySelector(".my-checkbox");
  if (checkbox && !event.target.closest(".my-checkbox")) {
    checkbox.checked = !checkbox.checked;
  }

  if (checkbox.checked) {
    addTheAddOn(event);
  } else {
    removeTheAddOn(event);
  }
  event.currentTarget.classList.toggle("highlight");
}

function addTheAddOn(event) {
  const addOn = document.createElement("div");
  addOn.classList.add("add-on");
  const addOnName = document.createElement("p");
  const addOnPrice = document.createElement("p");
  addOnPrice.classList.add("price-add");
  addOnName.textContent = event.currentTarget.querySelector("h4").textContent;
  if (subPlanMonthly) {
    addOnPrice.textContent =
      event.currentTarget.querySelector(".month-plan").textContent;
  } else {
    addOnPrice.textContent =
      event.currentTarget.querySelector(".year-plan").textContent;
  }
  addOns.appendChild(addOn);
  addOn.appendChild(addOnName);
  addOn.appendChild(addOnPrice);
}

function removeTheAddOn(event) {
  let currentEle = event.currentTarget.querySelector("h4").textContent;
  addOns.querySelectorAll(".add-on").forEach((addOn) => {
    if (addOn.querySelector("p").textContent.includes(currentEle)) {
      addOn.remove();
    }
  });
}

let totalPlan = document.querySelector("#totalPlan");
let totalPrice = document.querySelector("#totalPrice");

function sumAddOnPrice() {
  addOns.querySelectorAll(".add-on").forEach((addOn) => {
    totalAddOnPrice += getPrice(addOn.querySelector(".price-add").textContent);
    console.log(totalAddOnPrice);
  });
  totalSumPrice = totalAddOnPrice + planPrice;
}

function refreshAddonPrice() {
  addOns.querySelectorAll(".add-on").forEach((addOn) => {
    if (subPlanMonthly) {
      if (getPrice(addOn.querySelector(".price-add").textContent) > 9) {
        addOn.querySelector(".price-add").textContent =
          "+$" +
          getPrice(addOn.querySelector(".price-add").textContent) / 10 +
          "/mo";
      }
    } else {
      if (getPrice(addOn.querySelector(".price-add").textContent) < 9) {
        addOn.querySelector(".price-add").textContent =
          "+$" +
          getPrice(addOn.querySelector(".price-add").textContent) * 10 +
          "/yr";
      }
    }
  });
}

function getPrice(str) {
  const price = str.match(/\d+/g);
  return Number(price);
}

function changePlan(){
  nextStep(-2);
  resetAddon();
  refreshAddonPrice();
}
