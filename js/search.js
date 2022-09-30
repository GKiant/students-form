import { studentsList, createTable } from './main.js'

export const liveSearch = () => {
  let nameEnabled = false;
  let facultyEnabled = false;
  let birthdateEnabled = false;
  let studyEnabled = false;

  const table = document.querySelector('tbody')
  let namesArr = [];
  let facultyArr = [];
  let birthdateArr = [];
  let studyArr = [];

  let nameVal;
  let facultyVal;
  let birthdateVal;
  let studyVal;

  const tempArr = [];
  const tempArr2 = [];
  const tempArr3 = [];
  const finalArr = [];
  let uniqueFinalArr = [];


  const filterAllArr = (arr1, arr2, arr3, arr4, combinedArray) => {
    finalArr.length = 0;

    combinedArray.map(e => {
      arr1.forEach(el => {
        if (el.id === e.id) {
          tempArr.push(el)
        }
      })
    })
    tempArr.map(e => {
      arr2.forEach(el => {
        if (el.id === e.id) {
          tempArr2.push(el)
        }
      })
    })
    tempArr2.map(e => {
      arr3.forEach(el => {
        if (el.id === e.id) {
          tempArr3.push(el)
        }
      })
    })
    tempArr3.map(e => {
      arr4.forEach(el => {
        if (el.id === e.id) {
          finalArr.push(el)
        }
      })
    })

    tempArr.length = 0
    tempArr2.length = 0
    tempArr3.length = 0

    uniqueFinalArr = [...new Set(finalArr)]

    createTable(uniqueFinalArr)
  }

  const filterThreeArr = (arr1, arr2, arr3, combinedArray) => {
    finalArr.length = 0;

    combinedArray.map(e => {
      arr1.forEach(el => {
        if (el.id === e.id) {
          tempArr.push(el)
        }
      })
    })
    tempArr.map(e => {
      arr2.forEach(el => {
        if (el.id === e.id) {
          tempArr2.push(el)
        }
      })
    })
    tempArr2.map(e => {
      arr3.forEach(el => {
        if (el.id === e.id) {
          finalArr.push(el)
        }
      })
    })

    tempArr.length = 0
    tempArr2.length = 0

    uniqueFinalArr = [...new Set(finalArr)]

    createTable(uniqueFinalArr)
  }

  const filterTwoArr = (arr1, arr2, combinedArray) => {
    finalArr.length = 0;

    combinedArray.map(e => {
      arr1.forEach(el => {
        if (el.id === e.id) {
          tempArr.push(el)
        }
      })
    })
    tempArr.map(e => {
      arr2.forEach(el => {
        if (el.id === e.id) {
          finalArr.push(el)
        }
      })
    })

    tempArr.length = 0

    uniqueFinalArr = [...new Set(finalArr)]

    createTable(uniqueFinalArr)
  }

  const filterSingleArr = (arr, combinedArray) => {
    finalArr.length = 0;

    combinedArray.map(e => {
      arr.forEach(el => {
        if (el.id === e.id) {
          finalArr.push(el)
        }
      })
    })

    uniqueFinalArr = [...new Set(finalArr)]

    createTable(uniqueFinalArr)
  }


  document.querySelector('#nameSearch').oninput = function () {
    nameVal = this.value.trim().toLowerCase()
    table.innerHTML = ""

    if (nameVal !== '') {
      nameEnabled = true;
    } else {
      nameEnabled = false;
    }

    if (nameVal !== '' && facultyEnabled === false && birthdateEnabled === false && studyEnabled === false) {
      namesArr = studentsList.filter((i) => {
        if (i.fullName.toLowerCase().search(nameVal) !== -1) {


          return i.fullName
        }
      })
      createTable(namesArr)
    } else if (nameVal === '' && facultyEnabled === true || nameVal === '' && birthdateEnabled === true || nameVal === '' && studyEnabled === true) {
      if (facultyEnabled === true) {
        facultyArr = studentsList.filter((i) => {
          if (i.faculty.toLowerCase().search(facultyVal) !== -1) {
            return i.faculty
          }
        })
      }

      if (birthdateEnabled === true) {
        birthdateArr = studentsList.filter((i) => {
          if (i.birthDate.toLowerCase().search(birthdateVal) !== -1) {
            return i.birthDate
          }
        })
      }

      if (studyEnabled === true) {
        studyArr = studentsList.filter((i) => {
          if (i.studyStartYear.toLowerCase().search(studyVal) !== -1) {
            return i.studyStartYear
          }
        })
      }

      let combinedArr = facultyArr.concat(birthdateArr, studyArr)

      switch (true) {
        case facultyEnabled && birthdateEnabled && studyEnabled:
          filterThreeArr(facultyArr, birthdateArr, studyArr, combinedArr);
          break;
        case facultyEnabled && birthdateEnabled:
          filterTwoArr(facultyArr, birthdateArr, combinedArr);
          break;
        case facultyEnabled && studyEnabled:
          filterTwoArr(facultyArr, studyArr, combinedArr);
          break;
        case birthdateEnabled && studyEnabled:
          filterTwoArr(studyArr, birthdateArr, combinedArr);
          break;
        case facultyEnabled:
          filterSingleArr(facultyArr, combinedArr)
          break;
        case birthdateEnabled:
          filterSingleArr(birthdateArr, combinedArr)
          break;
        case studyEnabled:
          filterSingleArr(studyArr, combinedArr)
          break;
        default:
          console.log('error')
          break;
      }

    } else if (nameVal === '' && facultyEnabled === false && birthdateEnabled === false && studyEnabled === false) {

      createTable(studentsList)

    } else {
      if (nameEnabled === true) {
        namesArr = studentsList.filter((i) => {
          if (i.fullName.toLowerCase().search(nameVal) !== -1) {
            return i.fullName
          }
        })
      }

      if (facultyEnabled === true) {
        facultyArr = studentsList.filter((i) => {
          if (i.faculty.toLowerCase().search(facultyVal) !== -1) {
            return i.faculty
          }
        })
      }

      if (birthdateEnabled === true) {
        birthdateArr = studentsList.filter((i) => {
          if (i.birthDate.toLowerCase().search(birthdateVal) !== -1) {
            return i.birthDate
          }
        })
      }

      if (studyEnabled === true) {
        studyArr = studentsList.filter((i) => {
          if (i.studyStartYear.toLowerCase().search(studyVal) !== -1) {
            return i.studyStartYear
          }
        })
      }

      let combinedArr = namesArr.concat(facultyArr, birthdateArr, studyArr)

      switch (true) {
        case nameEnabled && facultyEnabled && birthdateEnabled && studyEnabled:
          filterAllArr(namesArr, facultyArr, birthdateArr, studyArr, combinedArr);
          break;
        case nameEnabled && facultyEnabled && birthdateEnabled:
          filterThreeArr(namesArr, facultyArr, birthdateArr, combinedArr);
          break;
        case nameEnabled && facultyEnabled && studyEnabled:
          filterThreeArr(namesArr, facultyArr, studyArr, combinedArr);
          break;
        case nameEnabled && birthdateEnabled && studyEnabled:
          filterThreeArr(namesArr, birthdateArr, studyArr, combinedArr);
          break;
        case facultyEnabled && birthdateEnabled && studyEnabled:
          filterThreeArr(facultyArr, birthdateArr, studyArr, combinedArr);
          break;
        case nameEnabled && facultyEnabled:
          filterTwoArr(namesArr, facultyArr, combinedArr);
          break;
        case nameEnabled && birthdateEnabled:
          filterTwoArr(namesArr, birthdateArr, combinedArr);
          break;
        case nameEnabled && studyEnabled:
          filterTwoArr(namesArr, studyArr, combinedArr);
          break;
        case facultyEnabled && birthdateEnabled:
          filterTwoArr(facultyArr, birthdateArr, combinedArr);
          break;
        case facultyEnabled && studyEnabled:
          filterTwoArr(facultyArr, studyArr, combinedArr);
          break;
        case birthdateEnabled && studyEnabled:
          filterTwoArr(studyArr, birthdateArr, combinedArr);
          break;
        case nameEnabled:
          filterSingleArr(namesArr, combinedArr)
          break;
        case facultyEnabled:
          filterSingleArr(facultyArr, combinedArr)
          break;
        case birthdateEnabled:
          filterSingleArr(birthdateArr, combinedArr)
          break;
        case studyEnabled:
          filterSingleArr(studyArr, combinedArr)
          break;
        default:

          break;
      }
    }
  }

  document.querySelector('#facultySearch').oninput = function () {
    facultyVal = this.value.trim().toLowerCase();
    table.innerHTML = "";

    if (facultyVal !== '') {
      facultyEnabled = true;
    } else {
      facultyEnabled = false;
    }

    if (facultyVal !== '' && nameEnabled === false && birthdateEnabled === false && studyEnabled === false) {
      facultyArr = studentsList.filter((i) => {
        if (i.faculty.toLowerCase().search(facultyVal) !== -1) {
          return i.faculty;
        }
      })
      createTable(facultyArr)
    } else if (facultyVal === '' && nameEnabled === true || facultyVal === '' && birthdateEnabled === true || facultyVal === '' && studyEnabled === true) {
      if (nameEnabled === true) {
        namesArr = studentsList.filter((i) => {
          if (i.fullName.toLowerCase().search(nameVal) !== -1) {
            return i.fullName
          }
        })
      }

      if (birthdateEnabled === true) {
        birthdateArr = studentsList.filter((i) => {
          if (i.birthDate.toLowerCase().search(birthdateVal) !== -1) {
            return i.birthDate
          }
        })
      }

      if (studyEnabled === true) {
        studyArr = studentsList.filter((i) => {
          if (i.studyStartYear.toLowerCase().search(studyVal) !== -1) {
            return i.studyStartYear
          }
        })
      }

      let combinedArr = namesArr.concat(birthdateArr, studyArr)

      switch (true) {
        case nameEnabled && birthdateEnabled && studyEnabled:
          filterThreeArr(namesArr, birthdateArr, studyArr, combinedArr);
          break;
        case nameEnabled && birthdateEnabled:
          filterTwoArr(namesArr, birthdateArr, combinedArr);
          break;
        case nameEnabled && studyEnabled:
          filterTwoArr(namesArr, studyArr, combinedArr);
          break;
        case birthdateEnabled && studyEnabled:
          filterTwoArr(studyArr, birthdateArr, combinedArr);
          break;
        case nameEnabled:
          filterSingleArr(namesArr, combinedArr)
          break;
        case birthdateEnabled:
          filterSingleArr(birthdateArr, combinedArr)
          break;
        case studyEnabled:
          filterSingleArr(studyArr, combinedArr)
          break;
        default:

          break;
      }

    } else if (facultyVal === '' && nameEnabled === false && birthdateEnabled === false && studyEnabled === false) {
      createTable(studentsList)

    } else {
      if (nameEnabled === true) {
        namesArr = studentsList.filter((i) => {
          if (i.fullName.toLowerCase().search(nameVal) !== -1) {
            return i.fullName
          }
        })
      }

      if (facultyEnabled === true) {
        facultyArr = studentsList.filter((i) => {
          if (i.faculty.toLowerCase().search(facultyVal) !== -1) {
            return i.faculty
          }
        })
      }

      if (birthdateEnabled === true) {
        birthdateArr = studentsList.filter((i) => {
          if (i.birthDate.toLowerCase().search(birthdateVal) !== -1) {
            return i.birthDate
          }
        })
      }

      if (studyEnabled === true) {
        studyArr = studentsList.filter((i) => {
          if (i.studyStartYear.toLowerCase().search(studyVal) !== -1) {
            return i.studyStartYear
          }
        })
      }

      let combinedArr = namesArr.concat(facultyArr, birthdateArr, studyArr)

      switch (true) {
        case nameEnabled && facultyEnabled && birthdateEnabled && studyEnabled:
          filterAllArr(namesArr, facultyArr, birthdateArr, studyArr, combinedArr);
          break;
        case nameEnabled && facultyEnabled && birthdateEnabled:
          filterThreeArr(namesArr, facultyArr, birthdateArr, combinedArr);
          break;
        case nameEnabled && facultyEnabled && studyEnabled:
          filterThreeArr(namesArr, facultyArr, studyArr, combinedArr);
          break;
        case nameEnabled && birthdateEnabled && studyEnabled:
          filterThreeArr(namesArr, birthdateArr, studyArr, combinedArr);
          break;
        case facultyEnabled && birthdateEnabled && studyEnabled:
          filterThreeArr(facultyArr, birthdateArr, studyArr, combinedArr);
          break;
        case nameEnabled && facultyEnabled:
          filterTwoArr(namesArr, facultyArr, combinedArr);
          break;
        case nameEnabled && birthdateEnabled:
          filterTwoArr(namesArr, birthdateArr, combinedArr);
          break;
        case nameEnabled && studyEnabled:
          filterTwoArr(namesArr, studyArr, combinedArr);
          break;
        case facultyEnabled && birthdateEnabled:
          filterTwoArr(facultyArr, birthdateArr, combinedArr);
          break;
        case facultyEnabled && studyEnabled:
          filterTwoArr(facultyArr, studyArr, combinedArr);
          break;
        case birthdateEnabled && studyEnabled:
          filterTwoArr(studyArr, birthdateArr, combinedArr);
          break;
        case nameEnabled:
          filterSingleArr(namesArr, combinedArr)
          break;
        case facultyEnabled:
          filterSingleArr(facultyArr, combinedArr)
          break;
        case birthdateEnabled:
          filterSingleArr(birthdateArr, combinedArr)
          break;
        case studyEnabled:
          filterSingleArr(studyArr, combinedArr)
          break;
        default:
          console.log('error');
          break;
      }
    }

  }

  document.querySelector('#birthdateSearch').oninput = function () {
    birthdateVal = this.value.trim().toLowerCase();
    table.innerHTML = "";

    if (birthdateVal !== '') {
      birthdateEnabled = true;
    } else {
      birthdateEnabled = false;
    }

    if (birthdateVal !== '' && nameEnabled === false && facultyEnabled === false && studyEnabled === false) {
      birthdateArr = studentsList.filter((i) => {
        if (i.birthDate.toLowerCase().search(birthdateVal) !== -1) {
          return i.birthDate;
        }
      })
      createTable(birthdateArr)
    } else if (birthdateVal === '' && nameEnabled === true || birthdateVal === '' && facultyEnabled === true || birthdateVal === '' && studyEnabled === true) {
      if (nameEnabled === true) {
        namesArr = studentsList.filter((i) => {
          if (i.fullName.toLowerCase().search(nameVal) !== -1) {
            return i.fullName
          }
        })
      }

      if (facultyEnabled === true) {
        facultyArr = studentsList.filter((i) => {
          if (i.faculty.toLowerCase().search(facultyVal) !== -1) {
            return i.faculty
          }
        })
      }

      if (studyEnabled === true) {
        studyArr = studentsList.filter((i) => {
          if (i.studyStartYear.toLowerCase().search(studyVal) !== -1) {
            return i.studyStartYear
          }
        })
      }

      let combinedArr = namesArr.concat(birthdateArr, studyArr)

      switch (true) {
        case nameEnabled && facultyEnabled && studyEnabled:
          filterThreeArr(namesArr, facultyArr, studyArr, combinedArr);
          break;
        case nameEnabled && facultyEnabled:
          filterTwoArr(namesArr, facultyArr, combinedArr);
          break;
        case nameEnabled && studyEnabled:
          filterTwoArr(namesArr, studyArr, combinedArr);
          break;
        case facultyEnabled && studyEnabled:
          filterTwoArr(studyArr, facultyArr, combinedArr);
          break;
        case nameEnabled:
          filterSingleArr(namesArr, combinedArr)
          break;
        case facultyEnabled:
          filterSingleArr(facultyArr, combinedArr)
          break;
        case studyEnabled:
          filterSingleArr(studyArr, combinedArr)
          break;
        default:
          console.log('error');
          break;
      }

    } else if (birthdateVal === '' && nameEnabled === false && facultyEnabled === false && studyEnabled === false) {
      createTable(studentsList)


    } else {
      if (nameEnabled === true) {
        namesArr = studentsList.filter((i) => {
          if (i.fullName.toLowerCase().search(nameVal) !== -1) {
            return i.fullName
          }
        })
      }

      if (facultyEnabled === true) {
        facultyArr = studentsList.filter((i) => {
          if (i.faculty.toLowerCase().search(facultyVal) !== -1) {
            return i.faculty
          }
        })
      }

      if (birthdateEnabled === true) {
        birthdateArr = studentsList.filter((i) => {
          if (i.birthDate.toLowerCase().search(birthdateVal) !== -1) {
            return i.birthDate
          }
        })
      }

      if (studyEnabled === true) {
        studyArr = studentsList.filter((i) => {
          if (i.studyStartYear.toLowerCase().search(studyVal) !== -1) {
            return i.studyStartYear
          }
        })
      }

      let combinedArr = namesArr.concat(facultyArr, birthdateArr, studyArr)

      switch (true) {
        case nameEnabled && facultyEnabled && birthdateEnabled && studyEnabled:
          filterAllArr(namesArr, facultyArr, birthdateArr, studyArr, combinedArr);
          break;
        case nameEnabled && facultyEnabled && birthdateEnabled:
          filterThreeArr(namesArr, facultyArr, birthdateArr, combinedArr);
          break;
        case nameEnabled && facultyEnabled && studyEnabled:
          filterThreeArr(namesArr, facultyArr, studyArr, combinedArr);
          break;
        case nameEnabled && birthdateEnabled && studyEnabled:
          filterThreeArr(namesArr, birthdateArr, studyArr, combinedArr);
          break;
        case facultyEnabled && birthdateEnabled && studyEnabled:
          filterThreeArr(facultyArr, birthdateArr, studyArr, combinedArr);
          break;
        case nameEnabled && facultyEnabled:
          filterTwoArr(namesArr, facultyArr, combinedArr);
          break;
        case nameEnabled && birthdateEnabled:
          filterTwoArr(namesArr, birthdateArr, combinedArr);
          break;
        case nameEnabled && studyEnabled:
          filterTwoArr(namesArr, studyArr, combinedArr);
          break;
        case facultyEnabled && birthdateEnabled:
          filterTwoArr(facultyArr, birthdateArr, combinedArr);
          break;
        case facultyEnabled && studyEnabled:
          filterTwoArr(facultyArr, studyArr, combinedArr);
          break;
        case birthdateEnabled && studyEnabled:
          filterTwoArr(studyArr, birthdateArr, combinedArr);
          break;
        case nameEnabled:
          filterSingleArr(namesArr, combinedArr)
          break;
        case facultyEnabled:
          filterSingleArr(facultyArr, combinedArr)
          break;
        case birthdateEnabled:
          filterSingleArr(birthdateArr, combinedArr)
          break;
        case studyEnabled:
          filterSingleArr(studyArr, combinedArr)
          break;
        default:
          console.log('error');
          break;
      }
    }
  }

  document.querySelector('#studySearch').oninput = function () {
    studyVal = this.value.trim().toLowerCase();
    table.innerHTML = "";

    if (studyVal !== '') {
      studyEnabled = true;
    } else {
      studyEnabled = false;
    }

    if (studyVal !== '' && nameEnabled === false && facultyEnabled === false && birthdateEnabled === false) {
      studyArr = studentsList.filter((i) => {
        if (i.studyStartYear.toLowerCase().search(studyVal) !== -1) {
          return i.studyStartYear;
        }
      })
      createTable(studyArr)
    } else if (studyVal === '' && nameEnabled === true || studyVal === '' && facultyEnabled === true || studyVal === '' && birthdateEnabled === true) {
      if (nameEnabled === true) {
        namesArr = studentsList.filter((i) => {
          if (i.fullName.toLowerCase().search(nameVal) !== -1) {
            return i.fullName
          }
        })
      }

      if (facultyEnabled === true) {
        facultyArr = studentsList.filter((i) => {
          if (i.faculty.toLowerCase().search(facultyVal) !== -1) {
            return i.faculty
          }
        })
      }

      if (birthdateEnabled === true) {
        birthdateArr = studentsList.filter((i) => {
          if (i.birthDate.toLowerCase().search(birthdateVal) !== -1) {
            return i.birthDate
          }
        })
      }

      let combinedArr = namesArr.concat(birthdateArr, studyArr)

      switch (true) {
        case nameEnabled && birthdateEnabled && facultyEnabled:
          filterThreeArr(namesArr, birthdateArr, facultyArr, combinedArr);
          break;
        case nameEnabled && birthdateEnabled:
          filterTwoArr(namesArr, birthdateArr, combinedArr);
          break;
        case nameEnabled && facultyEnabled:
          filterTwoArr(namesArr, facultyArr, combinedArr);
          break;
        case birthdateEnabled && facultyEnabled:
          filterTwoArr(facultyArr, birthdateArr, combinedArr);
          break;
        case nameEnabled:
          filterSingleArr(namesArr, combinedArr)
          break;
        case birthdateEnabled:
          filterSingleArr(birthdateArr, combinedArr)
          break;
        case facultyEnabled:
          filterSingleArr(facultyArr, combinedArr)
          break;
        default:
          console.log('error');
          break;
      }
    } else if (studyVal === '' && nameEnabled === false && facultyEnabled === false && birthdateEnabled === false) {
      createTable(studentsList)

    } else {
      if (nameEnabled === true) {
        namesArr = studentsList.filter((i) => {
          if (i.fullName.toLowerCase().search(nameVal) !== -1) {
            return i.fullName
          }
        })
      }

      if (facultyEnabled === true) {
        facultyArr = studentsList.filter((i) => {
          if (i.faculty.toLowerCase().search(facultyVal) !== -1) {
            return i.faculty
          }
        })
      }

      if (birthdateEnabled === true) {
        birthdateArr = studentsList.filter((i) => {
          if (i.birthDate.toLowerCase().search(birthdateVal) !== -1) {
            return i.birthDate
          }
        })
      }

      if (studyEnabled === true) {
        studyArr = studentsList.filter((i) => {
          if (i.studyStartYear.toLowerCase().search(studyVal) !== -1) {
            return i.studyStartYear
          }
        })
      }

      let combinedArr = namesArr.concat(facultyArr, birthdateArr, studyArr)

      switch (true) {
        case nameEnabled && facultyEnabled && birthdateEnabled && studyEnabled:
          filterAllArr(namesArr, facultyArr, birthdateArr, studyArr, combinedArr);
          break;
        case nameEnabled && facultyEnabled && birthdateEnabled:
          filterThreeArr(namesArr, facultyArr, birthdateArr, combinedArr);
          break;
        case nameEnabled && facultyEnabled && studyEnabled:
          filterThreeArr(namesArr, facultyArr, studyArr, combinedArr);
          break;
        case nameEnabled && birthdateEnabled && studyEnabled:
          filterThreeArr(namesArr, birthdateArr, studyArr, combinedArr);
          break;
        case facultyEnabled && birthdateEnabled && studyEnabled:
          filterThreeArr(facultyArr, birthdateArr, studyArr, combinedArr);
          break;
        case nameEnabled && facultyEnabled:
          filterTwoArr(namesArr, facultyArr, combinedArr);
          break;
        case nameEnabled && birthdateEnabled:
          filterTwoArr(namesArr, birthdateArr, combinedArr);
          break;
        case nameEnabled && studyEnabled:
          filterTwoArr(namesArr, studyArr, combinedArr);
          break;
        case facultyEnabled && birthdateEnabled:
          filterTwoArr(facultyArr, birthdateArr, combinedArr);
          break;
        case facultyEnabled && studyEnabled:
          filterTwoArr(facultyArr, studyArr, combinedArr);
          break;
        case birthdateEnabled && studyEnabled:
          filterTwoArr(studyArr, birthdateArr, combinedArr);
          break;
        case nameEnabled:
          filterSingleArr(namesArr, combinedArr)
          break;
        case facultyEnabled:
          filterSingleArr(facultyArr, combinedArr)
          break;
        case birthdateEnabled:
          filterSingleArr(birthdateArr, combinedArr)
          break;
        case studyEnabled:
          filterSingleArr(studyArr, combinedArr)
          break;
        default:
          console.log('error');
          break;
      }
    }
  }
}