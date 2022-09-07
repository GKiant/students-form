// Show\hide form to add a new student
const dropdownForm = () => {
  document.getElementById('btn-show-form').addEventListener('click', () => document.getElementById('form-container').style['transform'] = 'translateY(0%)');
  document.getElementById('close-form-btn').addEventListener('click', () => document.getElementById('form-container').style['transform'] = 'translateY(-105%)');
}
dropdownForm();

// Limiting max value of birthday field
const maxDate = () => {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  today = yyyy + '-' + mm + '-' + dd;
  return document.getElementById("bdate-input").setAttribute("max", today);
}
maxDate();

const firstNameEl = document.querySelector('#first-name-input');
const lastNameEl = document.querySelector('#last-name-input');
const birthdateEl = document.querySelector('#bdate-input');
const studyStartDateEl = document.querySelector('#study-years-input');

const form = document.querySelector('#form');
console.log(form)

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;

const showError = (input, message) => {
  const formField = input.parentElement;

  formField.classList.remove('success')
  formField.classList.add('error')

  const error = formField.querySelector('small');
  error.textContent = message;
}

const showSuccess = (input) => {
  const formField = input.parentElement;

  formField.classList.remove('error');
  formField.classList.add('success')

  const success = formField.querySelector('small');
  success.textContent = ''
}

const checkFirstname = () => {
  let valid = false;
  const min = 2;
  const max = 16;
  const firstName = firstNameEl.value.trim();

  if (!isRequired(firstName)) {
    showError(firstNameEl, 'This field cannot be blank')
  } else if (!isBetween(firstName.length, min, max)) {
    showError(firstNameEl, `First name must be between ${min} and ${max} characters`)
  } else {
    showSuccess(firstNameEl);
    valid = true;
  }
  return valid;
}

const checkLastname = () => {
  let valid = false;
  const min = 2;
  const max = 16;
  const lastName = lastNameEl.value.trim();

  if (!isRequired(lastName)) {
    showError(lastNameEl, 'This field cannot be blank')
  } else if (!isBetween(lastName.length, min, max)) {
    showError(lastNameEl, `last name must be between ${min} and ${max} characters`)
  } else {
    showSuccess(lastNameEl);
    valid = true;
  }
  return valid;
}

const checkBirthdate = () => {
  let valid = false;
  const birthdate = document.getElementById('bdate-input').value;
  console.log(birthdate)

  if (!isRequired(birthdate)) {
    showError(birthdateEl, 'This field cannot be blank')
  } else {
    showSuccess(birthdateEl);
    valid = true;
  }
  return valid;
}

const checkStudyYears = () => {
  let valid = false;

  const studyYears = document.getElementById('study-years-input').value

  if (!isRequired(studyYears)) {
    showError(studyStartDateEl, 'This field cannot be blank')
    } else {
    showSuccess(studyStartDateEl);
    valid = true;
  }
  return valid;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let isFirstnameValid = checkFirstname();
  let isLastnameValid = checkLastname();
  let isBirthdateValid = checkBirthdate();
  let isStudyYears = checkStudyYears();
  console.log(isFirstnameValid)
  console.log(isLastnameValid)
  console.log(isBirthdateValid)
  console.log(isStudyYears)

  let isFormValid = isFirstnameValid && 
      isLastnameValid &&
      isBirthdateValid &&
      isStudyYears;
  console.log(isFormValid)
  if (isFormValid) {
    console.log(document.getElementById('first-name-input').value)
    console.log(document.getElementById('last-name-input').value)
    console.log(document.getElementById('bdate-input').value)
    console.log(document.getElementById('study-years-input').value)
  }

})
