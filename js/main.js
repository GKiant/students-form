import { dropdownForm, maxDate, submitForm } from './form.js';

import { createFilterLogic } from './filter.js';


export const studentsList = [
  { firstName: 'Jacob', lastName: 'Thornton', faculty: 'Physics', birthDate: '1977-02-05', currentAge: 0, studyStartYear: '2020' },
  { firstName: 'Fred', lastName: 'Otto', faculty: 'Biology', birthDate: '1989-07-30', currentAge: 0, studyStartYear: '2006' },
  { firstName: 'Walter', lastName: 'Contreras', faculty: 'Law', birthDate: '1990-08-11', currentAge: 0, studyStartYear: '2007' },
  { firstName: 'Kathryn', lastName: 'Schneider', faculty: 'Humanities', birthDate: '1985-11-14', currentAge: 0, studyStartYear: '2022' },
  { firstName: 'Gina', lastName: 'Hyde', faculty: 'Social Sciences', birthDate: '1997-01-05', currentAge: 0, studyStartYear: '2001' },
  { firstName: 'Stanislaw', lastName: 'Felix', faculty: 'Business Administration', birthDate: '1975-06-10', currentAge: 0, studyStartYear: '1995' },
  { firstName: 'Kaitlan', lastName: 'Gibbons', faculty: 'Social Sciences', birthDate: '1983-04-30', currentAge: 0, studyStartYear: '2018' }
]

// Show\hide form to add a new student
dropdownForm();

// Limiting max value of birthday field
maxDate();

submitForm()


let currentAge;
export const createTable = (arr) => {
  let today = new Date();
  let currentStudentStatus;

  arr.map((e) => {
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

		e.currentAge = currentAge;

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
createTable(studentsList)

createFilterLogic()

// const sortByFirstName = (a, b) => {

//   const name1 = a.firstName.toUpperCase();
//   const name2 = b.firstName.toUpperCase();

//   let comparison = 0;

//   if (name1 > name2) {
//     comparison = 1;
//   } else if (name1 < name2) {
//     comparison = -1;
//   }
//   return comparison;
// }

// const sortByFaculty = (a, b) => {

//   const name1 = a.faculty.toUpperCase();
//   const name2 = b.faculty.toUpperCase();

//   let comparison = 0;

//   if (name1 > name2) {
//     comparison = 1;
//   } else if (name1 < name2) {
//     comparison = -1;
//   }
//   return comparison;
// }

// const sortByBirthday = (a, b) => {

//   const name1 = a.currentAge;
//   const name2 = b.currentAge;

//   let comparison = 0;

//   if (name1 > name2) {
//     comparison = 1;
//   } else if (name1 < name2) {
//     comparison = -1;
//   }
//   return comparison;
// }

// const sortByYearsOfStudy = (a, b) => {

//   const name1 = a.studyStartYear;
//   const name2 = b.studyStartYear;

//   let comparison = 0;

//   if (name1 > name2) {
//     comparison = 1;
//   } else if (name1 < name2) {
//     comparison = -1;
//   }
//   return comparison;
// }

// const objOfSortedColumns = {
//   namesSorted: false,
//   facultiesSorted: false,
// 	birthdaysSorted: false,
// 	yearsOfStudySorted: false
// }

// const nameHead = document.getElementById('full-name');
// const facultyHead = document.getElementById('faculty');
// const birthdayHead = document.getElementById('date-of-birth');
// const yearsOfStudyHead = document.getElementById('years-of-study');

// nameHead.addEventListener('click', () => {
//   const sortedByName = [...studentsList].sort(sortByFirstName);
//   if (objOfSortedColumns.namesSorted === false) {
//     table.innerHTML = ""
//     createTable(sortedByName)
//     objOfSortedColumns.namesSorted = true
//   } else {
//     table.innerHTML = ""
//     createTable(sortedByName.reverse())
//     objOfSortedColumns.namesSorted = false
//   }
// })

// facultyHead.addEventListener('click', () => {
//   const sortedByFaculty = [...studentsList].sort(sortByFaculty);
//   if (objOfSortedColumns.facultiesSorted === false) {
//     table.innerHTML = ""
//     createTable(sortedByFaculty)
//     objOfSortedColumns.facultiesSorted = true
//   } else {
//     table.innerHTML = ""
//     createTable(sortedByFaculty.reverse())
//     objOfSortedColumns.facultiesSorted = false
//   }
// })

// birthdayHead.addEventListener('click', () => {
//   const sortedByBirthday = [...studentsList].sort(sortByBirthday);
//   if (objOfSortedColumns.birthdaysSorted === false) {
//     table.innerHTML = ""
//     createTable(sortedByBirthday)
//     objOfSortedColumns.birthdaysSorted = true
//   } else {
//     table.innerHTML = ""
//     createTable(sortedByBirthday.reverse())
//     objOfSortedColumns.birthdaysSorted = false
//   }
// })

// yearsOfStudyHead.addEventListener('click', () => {
//   const sortedByYearsOfStudy = [...studentsList].sort(sortByYearsOfStudy);
//   if (objOfSortedColumns.yearsOfStudySorted === false) {
//     table.innerHTML = ""
//     createTable(sortedByYearsOfStudy)
//     objOfSortedColumns.yearsOfStudySorted = true
//   } else {
//     table.innerHTML = ""
//     createTable(sortedByYearsOfStudy.reverse())
//     objOfSortedColumns.yearsOfStudySorted = false
//   }
// })


// console.log(sortedByName);

