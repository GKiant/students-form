import { dropdownForm, maxDate, submitForm } from './form.js';

import { createFilterLogic } from './filter.js';

import { liveSearch } from './search.js';

export const studentsList = [
  { id: '0', firstName: 'Jacob', lastName: 'Thornton', faculty: 'Physics', birthDate: '1977-02-05', currentAge: 0, studyStartYear: '2020' },
  { id: '1', firstName: 'Fred', lastName: 'Otto', faculty: 'Biology', birthDate: '1989-07-30', currentAge: 0, studyStartYear: '2006' },
  { id: '2', firstName: 'Walter', lastName: 'Contreras', faculty: 'Law', birthDate: '1990-08-11', currentAge: 0, studyStartYear: '2007' },
  { id: '3', firstName: 'Kathryn', lastName: 'Schneider', faculty: 'Humanities', birthDate: '1985-11-14', currentAge: 0, studyStartYear: '2022' },
  { id: '4', firstName: 'Gina', lastName: 'Hyde', faculty: 'Social Sciences', birthDate: '1997-01-05', currentAge: 0, studyStartYear: '2001' },
  { id: '5', firstName: 'Fred', lastName: 'Grenade', faculty: 'Biology', birthDate: '1989-07-20', currentAge: 0, studyStartYear: '2007' },
  { id: '6', firstName: 'Stanislaw', lastName: 'Felix', faculty: 'Business Administration', birthDate: '1975-06-10', currentAge: 0, studyStartYear: '1995' },
  { id: '7', firstName: 'Kaitlan', lastName: 'Gibbons', faculty: 'Social Sciences', birthDate: '1983-04-30', currentAge: 0, studyStartYear: '2018' }
]

// Show\hide form to add a new student
dropdownForm();

// Limiting max value of birthday field
maxDate();

submitForm();

let currentAge;
export const createTable = (arr) => {
  let today = new Date();
  let currentStudentStatus;

  arr.map((e) => {
    // If statement that calculating current student age and assiging it to the object property
    if (today.getMonth() + 1 > parseInt(e.birthDate.slice(5, 7))) {
      currentAge = today.getFullYear() - e.birthDate.slice(0, 4);
    } else if (today.getMonth() + 1 < parseInt(e.birthDate.slice(5, 7))) {
      currentAge = today.getFullYear() - e.birthDate.slice(0, 4) - 1;
    } else {
      if (today.getDate() >= parseInt(e.birthDate.slice(-2))) {
        currentAge = today.getFullYear() - e.birthDate.slice(0, 4);
      } else {
        currentAge = today.getFullYear() - e.birthDate.slice(0, 4) - 1;
      }
    }

    e.currentAge = currentAge;

    const tableRow = document.createElement('tr');
    const fullNameRow = document.createElement('td');
    const facultyRow = document.createElement('td');
    const birthDateRow = document.createElement('td');
    const studyStartYearRow = document.createElement('td');

    tableRow.classList.add('tableRow');


    fullNameRow.textContent = e.firstName + ' ' + e.lastName;
    e.fullName = e.firstName + ' ' + e.lastName;
    facultyRow.textContent = e.faculty;
    birthDateRow.textContent = e.birthDate + ` (${currentAge} years)`;

    // Calculating what is the current year of study for the student
    if (parseInt(e.studyStartYear) + 4 < today.getFullYear()) {
      currentStudentStatus = 'graduated';
    } else {
      currentStudentStatus = today.getFullYear() - parseInt(e.studyStartYear);
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
            currentStudentStatus = 'graduated';
          } else {
            currentStudentStatus = 'Fourth year';
          }
          break;
        default:
          currentStudentStatus = 'Error';
      }
    }

    studyStartYearRow.textContent = `${e.studyStartYear}-${parseInt(e.studyStartYear) + 4} (${currentStudentStatus})`;

    document.getElementById('tbody').append(tableRow);
    tableRow.append(fullNameRow);
    tableRow.append(facultyRow);
    tableRow.append(birthDateRow);
    tableRow.append(studyStartYearRow);
  })
}

createTable(studentsList);

createFilterLogic();

liveSearch();
