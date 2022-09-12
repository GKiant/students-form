import { dropdownForm, maxDate, submitForm } from './form.js';

export const studentsList = [
  { firstName: 'Fred', lastName: 'Otto', faculty: 'Biology', birthDate: '1989-07-30', studyStartYear: '2006' },
  { firstName: 'Jacob', lastName: 'Thornton', faculty: 'Physics', birthDate: '1977-02-05', studyStartYear: '2020' },
  { firstName: 'Kaitlan', lastName: 'Gibbons', faculty: 'Social Sciences', birthDate: '1983-04-30', studyStartYear: '2018' },
  { firstName: 'Kathryn', lastName: 'Schneider', faculty: 'Humanities', birthDate: '1985-11-14', studyStartYear: '2022' },
  { firstName: 'Stanislaw', lastName: 'Felix', faculty: 'Business Administration', birthDate: '1975-06-10', studyStartYear: '1995' },
  { firstName: 'Gina', lastName: 'Hyde', faculty: 'Social Sciences', birthDate: '1997-01-05', studyStartYear: '2001' },
  { firstName: 'Walter', lastName: 'Contreras', faculty: 'Law', birthDate: '1990-08-11', studyStartYear: '2007' }
]

// Show\hide form to add a new student
dropdownForm();

// Limiting max value of birthday field
maxDate();

submitForm()

export const createTable = () => {
  let today = new Date();
  let currentAge;
  let currentStudentStatus;

  studentsList.map((e) => {
    // If statement is calculating precise current student age
    if (today.getMonth() + 1 > parseInt(e.birthDate.slice(5, 7))) {
      currentAge = today.getFullYear() - e.birthDate.slice(0, 4)
    } else if (today.getMonth() + 1 < parseInt(e.birthDate.slice(5, 7))) {
      currentAge = today.getFullYear() - e.birthDate.slice(0, 4) - 1
    } else {
      if (today.getDate() >= parseInt(e.birthDate.slice(-2))) {
        currentAge = today.getFullYear() - e.birthDate.slice(0, 4)
      } else {
        currentAge = today.getFullYear() - e.birthDate.slice(0, 4) - 1
      }
    }

    const tableRow = document.createElement('tr')

    const fullNameRow = document.createElement('td')
    const facultyRow = document.createElement('td')
    const birthDateRow = document.createElement('td')
    const studyStartYearRow = document.createElement('td')

    fullNameRow.textContent = e.firstName + ' ' + e.lastName;
    facultyRow.textContent = e.faculty;
    birthDateRow.textContent = e.birthDate + ` (${currentAge} years)`;

    if (parseInt(e.studyStartYear) + 4 < today.getFullYear()) {
      currentStudentStatus = 'graduated';
    } else {
      currentStudentStatus = today.getFullYear() - parseInt(e.studyStartYear);
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
          if (today.getMonth + 1 > 9) {
            currentStudentStatus = 'graduated'
          } else {
            currentStudentStatus = 'Fourth year';
          }
          break;
        default:
          currentStudentStatus = 'Error'
      }
    }

    studyStartYearRow.textContent = `${e.studyStartYear}-${parseInt(e.studyStartYear) + 4} (${currentStudentStatus})`;

    document.getElementById('tbody').append(tableRow)
    tableRow.append(fullNameRow)
    tableRow.append(facultyRow)
    tableRow.append(birthDateRow)
    tableRow.append(studyStartYearRow)
  })
}
createTable()

