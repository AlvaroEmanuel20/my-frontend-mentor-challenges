let currentTab = 0;

const mainElements = {
  form: document.getElementById('form'),
  inputs: document.querySelectorAll('.personal-form > .input-group > input'),
  errors: document.querySelectorAll(
    '.personal-form > .input-group > .label-group > .error',
  ),
  nameInput: document.getElementById('name'),
  emailInput: document.getElementById('email'),
  phoneInput: document.getElementById('phone'),
  tabs: document.querySelectorAll('.tab'),
  tabsActions: document.querySelectorAll('.tabs-actions'),
  actionsBtns: document.querySelectorAll('.tabs-actions > button'),
  stepIndicators: document.querySelectorAll('.step-indicator'),
};

const plansElements = {
  switchBillingTime: document.getElementById('switch-checkbox'),
  switchOptions: document.querySelectorAll('.switch-option'),
  plansDescription: document.querySelectorAll('.plan-description'),
  plansCard: document.querySelectorAll('.plan'),
};

const addonsElements = {
  addonsCards: document.querySelectorAll('.addon'),
  addonsPrice: document.querySelectorAll('.addon-price'),
};

const totalElements = {
  planName: document.querySelector('.total-plan > div > h2'),
  planPrice: document.getElementById('total-plan-price'),
  addonsAdded: document.querySelectorAll('.total-addons > li'),
  addonsAddedPrices: document.querySelectorAll(
    '.total-addons > li > div > span',
  ),
  priceText: document.querySelector('.total-price > p'),
  priceValue: document.querySelector('.total-price > span'),
  changePlanLink: document.querySelector('.total-plan > div > p'),
};

const plans = [
  {
    name: 'Arcade',
    price: {
      monthly: 9,
      yearly: 90,
    },
  },
  {
    name: 'Advanced',
    price: {
      monthly: 12,
      yearly: 120,
    },
  },
  {
    name: 'Pro',
    price: {
      monthly: 15,
      yearly: 150,
    },
  },
];

const addons = [
  {
    name: 'Online service',
    price: {
      monthly: 1,
      yearly: 10,
    },
  },
  {
    name: 'Larger storage',
    price: {
      monthly: 2,
      yearly: 20,
    },
  },
  {
    name: 'Customizable profile',
    price: {
      monthly: 2,
      yearly: 20,
    },
  },
];

const planSelected = {
  billingTime: 'Monthly',
  plan: {
    name: 'Arcade',
    price: {
      monthly: 9,
      yearly: 90,
    },
  },
};

const addonsSelected = [
  {
    name: 'Online service',
    price: {
      monthly: 1,
      yearly: 10,
    },
  },
  {
    name: 'Larger storage',
    price: {
      monthly: 2,
      yearly: 20,
    },
  },
];

/* EVENT LISTENERS START */

mainElements.form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('Form submit success:');
  mainElements.inputs.forEach((input) => console.log(input.value));
  console.log('Plan', planSelected);
  console.log('Addons', addonsSelected);
});

mainElements.actionsBtns.forEach((value, i) => {
  //Next or back tabs
  value.addEventListener('click', () => {
    //i = 0 = backBtn | i = 1 = nextBtn | i = 2 = confirmBtn
    //3, 4, 5 -> same order, but mobile
    if ((i === 1 || i === 4) && currentTab === 0) {
      //block next tab if form has errors
      mainElements.inputs.forEach((input, i) => {
        input.value.length === 0
          ? setInputError(input, i, 'This field is required')
          : clearInputError(input, i);
      });

      if (
        !mainElements.inputs[0].checkValidity() ||
        !mainElements.inputs[1].checkValidity() ||
        !mainElements.inputs[2].checkValidity()
      ) {
        return false;
      }
    }

    mainElements.tabs[currentTab].style.display = 'none';

    if ([1, 2, 4, 5].includes(i) && currentTab >= mainElements.tabs.length)
      return false;

    if ((i === 0 || i === 3) && currentTab <= 0) return false;

    [1, 2, 4, 5].includes(i) ? currentTab++ : currentTab--;
    showCurrentTab(currentTab);
  });
});

mainElements.inputs.forEach((input, i) => {
  //Validate inputs on input event
  //i = 0 = name | i = 1 = email | i = 2 = phone
  input.addEventListener('input', () => {
    input.value.length === 0
      ? setInputError(input, i, 'This field is required')
      : clearInputError(input, i);

    if (i === 1 && input.value.length > 0) {
      !input.checkValidity()
        ? setInputError(input, i, 'Invalid email address')
        : clearInputError(input, i);
    }

    if (i === 2 && input.value.length > 0) {
      !input.checkValidity()
        ? setInputError(input, i, 'Invalid phone number')
        : clearInputError(input, i);
    }
  });
});

plansElements.switchBillingTime.addEventListener('change', () => {
  //Event listener for billing time change by switch element
  const isYearly = plansElements.switchBillingTime.checked;

  if (isYearly) {
    planSelected.billingTime = 'Yearly';
    plansElements.switchOptions[1].classList.add('active');
    plansElements.switchOptions[0].classList.remove('active');

    switchPlanDescription('Yearly');
    switchAddonsPrice('Yearly');
    setTotalElementsByBillingTime('Yearly');
  } else {
    planSelected.billingTime = 'Monthly';
    plansElements.switchOptions[0].classList.add('active');
    plansElements.switchOptions[1].classList.remove('active');

    switchPlanDescription('Monthly');
    switchAddonsPrice('Monthly');
    setTotalElementsByBillingTime('Monthly');
  }

  setTotalValue();
});

plansElements.plansCard.forEach((value, i) => {
  //Change selected plan by click on plan card
  value.addEventListener('click', () => {
    if (i === 0) {
      controlPlanCardSelected(0, 1, 2);
    } else if (i === 1) {
      controlPlanCardSelected(1, 0, 2);
    } else if (i === 2) {
      controlPlanCardSelected(2, 0, 1);
    }

    totalElements.planName.textContent = `${planSelected.plan.name} (${planSelected.billingTime})`;

    totalElements.planPrice.textContent =
      planSelected.billingTime === 'Yearly'
        ? `$${planSelected.plan.price.yearly}/yr`
        : `$${planSelected.plan.price.monthly}/mo`;

    setTotalValue();
  });
});

addonsElements.addonsCards.forEach((value, i) => {
  //Change selected addon by click on addon card
  value.addEventListener('click', () => {
    if (i === 0) {
      controlAddonCardSelected(addonsElements.addonsCards[0], 0);
    } else if (i === 1) {
      controlAddonCardSelected(addonsElements.addonsCards[1], 1);
    } else if (i === 2) {
      controlAddonCardSelected(addonsElements.addonsCards[2], 2);
    }
  });
});

totalElements.changePlanLink.addEventListener('click', () => {
  //Change plan link in total tab
  mainElements.tabs[currentTab].style.display = 'none';
  currentTab = 1;
  showCurrentTab(currentTab);
});

/* EVENT LISTENERS END */

/* FUNCTIONS START */

showCurrentTab(currentTab);
function showCurrentTab(tab) {
  mainElements.tabs[tab].style.display = 'block';

  mainElements.actionsBtns.forEach((value, i) => {
    //0 - backBtn | 1 - nextBtn | 2 - confirmBtn
    //3, 4, 5 -> same order, but mobile
    if (i === 0 || i === 3)
      value.style.display = [1, 2, 3].includes(tab) ? 'block' : 'none';
    if (i === 1 || i === 4)
      value.style.display = [0, 1, 2].includes(tab) ? 'block' : 'none';
    if (i === 2 || i === 5) value.style.display = tab === 3 ? 'block' : 'none';
  });

  mainElements.tabsActions.forEach((value) => {
    value.style.justifyContent = tab === 0 ? 'flex-end' : 'space-between';
  });

  mainElements.form.style.justifyContent =
    tab === 4 ? 'center' : 'space-between';

  activeStepIndicatorByTab(tab);
}

function activeStepIndicatorByTab(tab) {
  mainElements.stepIndicators.forEach((value) =>
    value.classList.remove('active'),
  );

  if (tab >= mainElements.stepIndicators.length) return false;
  mainElements.stepIndicators[tab].classList.add('active');
}

function setInputError(input, i, errorTxt) {
  input.setCustomValidity(errorTxt);
  mainElements.errors[i].textContent = input.validationMessage;
}

function clearInputError(input, i) {
  input.setCustomValidity('');
  mainElements.errors[i].textContent = '';
}

function controlPlanCardSelected(
  selectedIndex,
  toRemoveIndex1,
  toRemoveIndex2,
) {
  planSelected.plan = plans[selectedIndex];
  plansElements.plansCard[selectedIndex].classList.add('selected');
  plansElements.plansCard[toRemoveIndex1].classList.remove('selected');
  plansElements.plansCard[toRemoveIndex2].classList.remove('selected');
}

function controlAddonCardSelected(addonCard, addonCardIndex) {
  if (addonCard.classList.contains('selected')) {
    addonCard.classList.remove('selected');
    addonsSelected.splice(addonsSelected.indexOf(addons[addonCardIndex]), 1);

    totalElements.addonsAdded[addonCardIndex].style.display = 'none';
  } else {
    addonCard.classList.add('selected');
    addonsSelected.push(addons[addonCardIndex]);

    totalElements.addonsAdded[addonCardIndex].style.display = 'block';
  }

  setTotalValue();
}

function switchPlanDescription(billingTime) {
  if (billingTime === 'Yearly') {
    plansElements.plansDescription.forEach((value, i) => {
      value.innerHTML = `
        <h4>${plans[i].name}</h4>
        <span>$${plans[i].price.yearly}/yr</span>
        <p>2 months free</p>
      `;
    });
  } else {
    plansElements.plansDescription.forEach((value, i) => {
      value.innerHTML = `
        <h4>${plans[i].name}</h4>
        <span>$${plans[i].price.monthly}/mo</span>
      `;
    });
  }
}

function switchAddonsPrice(billingTime) {
  addonsElements.addonsPrice.forEach((value, i) => {
    value.textContent =
      billingTime === 'Monthly'
        ? `+$${addons[i].price.monthly}/mo`
        : `+$${addons[i].price.yearly}/yr`;
  });
}

function setTotalElementsByBillingTime(billingTime) {
  totalElements.planName.textContent = `${planSelected.plan.name} (${
    billingTime === 'Yearly' ? 'Yearly' : 'Monthly'
  })`;

  totalElements.planPrice.textContent =
    billingTime === 'Yearly'
      ? `$${planSelected.plan.price.yearly}/yr`
      : `$${planSelected.plan.price.monthly}/mo`;

  totalElements.priceText.textContent = `Total (per ${
    billingTime === 'Yearly' ? 'Yearly' : 'Monthly'
  })`;

  totalElements.addonsAddedPrices.forEach((value, i) => {
    value.textContent =
      billingTime === 'Yearly'
        ? `+$${addons[i].price.yearly}/yr`
        : `+$${addons[i].price.monthly}/mo`;
  });
}

function setTotalValue() {
  if (planSelected.billingTime === 'Yearly') {
    totalElements.priceValue.textContent = `$${
      planSelected.plan.price.yearly +
      addonsSelected.reduce((acc, value) => value.price.yearly + acc, 0)
    }/yr`;
  } else {
    totalElements.priceValue.textContent = `$${
      planSelected.plan.price.monthly +
      addonsSelected.reduce((acc, value) => value.price.monthly + acc, 0)
    }/mo`;
  }
}

/* FUNCTIONS END */
