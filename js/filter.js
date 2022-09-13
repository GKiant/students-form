import { studentsList, createTable } from './main.js'

export const createFilterLogic = () => {
  const table = document.querySelector('tbody')

  const sortByFirstName = (a, b) => {

    const name1 = a.firstName.toUpperCase();
    const name2 = b.firstName.toUpperCase();

    let comparison = 0;

    if (name1 > name2) {
      comparison = 1;
    } else if (name1 < name2) {
      comparison = -1;
    }
    return comparison;
  }

  const sortByFaculty = (a, b) => {

    const name1 = a.faculty.toUpperCase();
    const name2 = b.faculty.toUpperCase();

    let comparison = 0;

    if (name1 > name2) {
      comparison = 1;
    } else if (name1 < name2) {
      comparison = -1;
    }
    return comparison;
  }

  const sortByBirthday = (a, b) => {

    const name1 = a.currentAge;
    const name2 = b.currentAge;

    let comparison = 0;

    if (name1 > name2) {
      comparison = 1;
    } else if (name1 < name2) {
      comparison = -1;
    }
    return comparison;
  }

  const sortByYearsOfStudy = (a, b) => {

    const name1 = a.studyStartYear;
    const name2 = b.studyStartYear;

    let comparison = 0;

    if (name1 > name2) {
      comparison = 1;
    } else if (name1 < name2) {
      comparison = -1;
    }
    return comparison;
  }

  const objOfSortedColumns = {
    namesSorted: false,
    facultiesSorted: false,
    birthdaysSorted: false,
    yearsOfStudySorted: false
  }

  const nameHead = document.getElementById('full-name');
  const facultyHead = document.getElementById('faculty');
  const birthdayHead = document.getElementById('date-of-birth');
  const yearsOfStudyHead = document.getElementById('years-of-study');

  nameHead.addEventListener('click', () => {
    const sortedByName = [...studentsList].sort(sortByFirstName);
    if (objOfSortedColumns.namesSorted === false) {
      table.innerHTML = "";
      createTable(sortedByName)
      objOfSortedColumns.namesSorted = true;
      objOfSortedColumns.facultiesSorted = false;
      objOfSortedColumns.birthdaysSorted = false;
      objOfSortedColumns.yearsOfStudySorted = false;
    } else {
      table.innerHTML = "";
      createTable(sortedByName.reverse());
      objOfSortedColumns.namesSorted = false;
    }
  })

  facultyHead.addEventListener('click', () => {
    const sortedByFaculty = [...studentsList].sort(sortByFaculty);
    if (objOfSortedColumns.facultiesSorted === false) {
      table.innerHTML = ""
      createTable(sortedByFaculty)
      objOfSortedColumns.facultiesSorted = true;
      objOfSortedColumns.namesSorted = false;
      objOfSortedColumns.birthdaysSorted = false;
      objOfSortedColumns.yearsOfStudySorted = false;

    } else {
      table.innerHTML = ""
      createTable(sortedByFaculty.reverse())
      objOfSortedColumns.facultiesSorted = false
    }
  })

  birthdayHead.addEventListener('click', () => {
    const sortedByBirthday = [...studentsList].sort(sortByBirthday);
    if (objOfSortedColumns.birthdaysSorted === false) {
      table.innerHTML = "";
      createTable(sortedByBirthday);
      objOfSortedColumns.birthdaysSorted = true;
      objOfSortedColumns.facultiesSorted = false;
      objOfSortedColumns.namesSorted = false;
      objOfSortedColumns.yearsOfStudySorted = false;
    } else {
      table.innerHTML = "";
      createTable(sortedByBirthday.reverse());
      objOfSortedColumns.birthdaysSorted = false;
    }
  })

  yearsOfStudyHead.addEventListener('click', () => {
    const sortedByYearsOfStudy = [...studentsList].sort(sortByYearsOfStudy);
    if (objOfSortedColumns.yearsOfStudySorted === false) {
      table.innerHTML = ""
      createTable(sortedByYearsOfStudy)
      objOfSortedColumns.yearsOfStudySorted = true;
      objOfSortedColumns.birthdaysSorted = false;
      objOfSortedColumns.facultiesSorted = false;
      objOfSortedColumns.namesSorted = false;
    } else {
      table.innerHTML = "";
      createTable(sortedByYearsOfStudy.reverse());
      objOfSortedColumns.yearsOfStudySorted = false;
    }
  })
}

