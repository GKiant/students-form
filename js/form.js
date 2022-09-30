import { studentsList } from './main.js';

// Show\hide form to add a new student
export const dropdownForm = () => {
  document.getElementById('btn-show-form').addEventListener('click', () => document.getElementById('form-container').style['transform'] = 'translateY(0%)');
  document.getElementById('close-form-btn').addEventListener('click', () => document.getElementById('form-container').style['transform'] = 'translateY(-105%)');
}

// Limiting max value of birthday field
export const maxDate = () => {
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
  return document.getElementById("bdate-input").setAttribute("max", today)
}

// Validation for the "add new student" form
const firstNameEl = document.querySelector('#first-name-input');
const lastNameEl = document.querySelector('#last-name-input');
const facultyEl = document.querySelector('#faculty-input');
const birthdateEl = document.querySelector('#bdate-input');
const studyStartYearEl = document.querySelector('#study-years-input');

const form = document.querySelector('#form');

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
  const letters = /^[A-Za-z]+$/;

  const firstName = firstNameEl.value.trim();

  if (!isRequired(firstName)) {
    showError(firstNameEl, 'This field cannot be blank')
  } else if (!isBetween(firstName.length, min, max)) {
    showError(firstNameEl, `First name must be between ${min} and ${max} characters`)
  } else if (!firstName.match(letters)) {
    showError(firstNameEl, 'First name cannot include digits')
  } else {
    showSuccess(firstNameEl)
    valid = true;
  }
  return valid;
}

const checkLastname = () => {
  let valid = false;
  const min = 2;
  const max = 16;
  const letters = /^[A-Za-z]+$/;

  const lastName = lastNameEl.value.trim();

  if (!isRequired(lastName)) {
    showError(lastNameEl, 'This field cannot be blank')
  } else if (!isBetween(lastName.length, min, max)) {
    showError(lastNameEl, `Last name must be between ${min} and ${max} characters`)
  } else if (!lastName.match(letters)) {
    showError(lastNameEl, 'Last name cannot include digits')
  } else {
    showSuccess(lastNameEl)

    valid = true;
  }
  return valid;
}

const checkFaculty = () => {
  let valid = false;
  const min = 2;
  const max = 25;
  const faculty = facultyEl.value.trim();

  if (!isRequired(faculty)) {
    showError(facultyEl, 'This field cannot be blank')
  } else if (!isBetween(faculty.length, min, max)) {
    showError(facultyEl, `Faculty must be between ${min} and ${max} characters`)
  } else {
    showSuccess(facultyEl)
    valid = true;
  }
  return valid;
}

const checkBirthdate = () => {
  let valid = false;
  const birthdate = document.getElementById('bdate-input').value.trim();

  if (!isRequired(birthdate)) {
    showError(birthdateEl, 'This field cannot be blank')
  } else {
    showSuccess(birthdateEl)
    valid = true;
  }
  return valid;
}

const checkStudyYears = () => {
  let today = new Date();

  let valid = false;
  const min = 2000;
  const max = today.getFullYear();

  const studyYears = document.getElementById('study-years-input').value.trim();

  if (!isRequired(studyYears)) {
    showError(studyStartYearEl, 'This field cannot be blank')
  } else if (studyYears < min || studyYears > max) {
      showError(studyStartYearEl, `Start of the education must be between ${min} and ${max}`)
  } else {
    showSuccess(studyStartYearEl)
    valid = true;
  }
  return valid;
}

export const submitForm = () => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isFirstnameValid = checkFirstname();
    let isLastnameValid = checkLastname();
    let isFacultyValid = checkFaculty();
    let isBirthdateValid = checkBirthdate();
    let isStudyYears = checkStudyYears();
    
    let today = new Date();
    let currentAge;
    let currentStudentStatus;

    let isFormValid = isFirstnameValid &&
      isLastnameValid &&
      isFacultyValid &&
      isBirthdateValid &&
      isStudyYears;

    if (isFormValid) {

      
      // Calculating student age
      if (today.getMonth() + 1 > parseInt(birthdateEl.value.slice(5, 7))) {
        currentAge = today.getFullYear() - birthdateEl.value.slice(0, 4);
      } else if (today.getMonth() + 1 < parseInt(birthdateEl.value.slice(5, 7))) {
        currentAge = today.getFullYear() - birthdateEl.value.slice(0, 4) - 1;
      } else {
        if (today.getDate() >= parseInt(birthdateEl.value.slice(-2))) {
          currentAge = today.getFullYear() - birthdateEl.value.slice(0, 4)
        } else {
          currentAge = today.getFullYear() - birthdateEl.value.slice(0, 4) - 1
        }
      }
      
      studentsList.push({ id: `${studentsList.length}`, firstName: firstNameEl.value, lastName: lastNameEl.value, fullName: firstNameEl.value + ' ' + lastNameEl.value, faculty: facultyEl.value, birthDate: birthdateEl.value, currentAge: currentAge, studyStartYear: studyStartYearEl.value });
      
      console.log(studentsList)

      const tableRow = document.createElement('tr');
      const fullNameRow = document.createElement('td');
      const facultyRow = document.createElement('td');
      const birthDateRow = document.createElement('td');
      const studyStartYearRow = document.createElement('td');

      fullNameRow.textContent = firstNameEl.value + ' ' + lastNameEl.value;
      facultyRow.textContent = facultyEl.value;
      birthDateRow.textContent = birthdateEl.value + ` (${currentAge} years)`;

      // Calculating how many years student is studying atm or if he already graduated
      if (parseInt(studyStartYearEl.value) + 4 < today.getFullYear()) {
        currentStudentStatus = 'graduated';
      } else {
        currentStudentStatus = today.getFullYear() - parseInt(studyStartYearEl.value);
        console.log(currentStudentStatus)
        switch (currentStudentStatus) {
          case 0:
          case 1:
            currentStudentStatus = `First year`;
            break;
          case 2:
            currentStudentStatus = 'Second year';
            break;
          case 3:
            currentStudentStatus = 'Third year';
            break;
          case 4:
            if (today.getMonth() + 1 > 9) {
              currentStudentStatus = 'graduated'
            } else {
              currentStudentStatus = 'Fourth year';
            }
            break;
          default:
            currentStudentStatus = ' ';
        }
      }

      studyStartYearRow.textContent = `${studyStartYearEl.value}-${(parseInt(studyStartYearEl.value) + 4)} (${currentStudentStatus})`;

      document.getElementById('tbody').append(tableRow)
      tableRow.append(fullNameRow)
      tableRow.append(facultyRow)
      tableRow.append(birthDateRow)
      tableRow.append(studyStartYearRow)

      firstNameEl.value = '';
      firstNameEl.parentElement.classList.remove('error');
      firstNameEl.parentElement.classList.remove('success');
      firstNameEl.parentElement.querySelector('small').textContent = '';

      lastNameEl.value = '';
      lastNameEl.parentElement.classList.remove('error');
      lastNameEl.parentElement.classList.remove('success');
      lastNameEl.parentElement.querySelector('small').textContent = '';

      facultyEl.value = '';
      facultyEl.parentElement.classList.remove('error');
      facultyEl.parentElement.classList.remove('success');
      facultyEl.parentElement.querySelector('small').textContent = '';

      birthdateEl.value = '';
      birthdateEl.parentElement.classList.remove('error');
      birthdateEl.parentElement.classList.remove('success');
      birthdateEl.parentElement.querySelector('small').textContent = '';

      studyStartYearEl.value = '';
      studyStartYearEl.parentElement.classList.remove('error');
      studyStartYearEl.parentElement.classList.remove('success');
      studyStartYearEl.parentElement.querySelector('small').textContent = '';
    }
  })
}