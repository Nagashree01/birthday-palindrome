function reverseStr(str) {

    var listOfChars = str.split("");
    var reverseListOfChars = listOfChars.reverse();
    var reverseStr = reverseListOfChars.join("");

    return reverseStr;

}
function isPalindrome(date) {
    var reverseDate = reverseStr(date)
    if (date === reverseDate) {
        return true;
    }
    return false;
}
function dateToStr(date) {
    var dateStr = {
        day: "",
        month: "",
        year: ""
    }

    if (date.day < 10) {
        dateStr.day = '0' + date.day
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = '0' + date.month
    } else {
        dateStr.month = date.month.toString();
    }


    dateStr.year = date.year.toString();

    return dateStr;
}


function getAllDateFormats(date) {

    var stringDate = dateToStr(date);

    var ddmmyyyy = stringDate.day + stringDate.month + stringDate.year;
    var mmddyyyy = stringDate.month + stringDate.day + stringDate.year;
    var yyyymmdd = stringDate.year + stringDate.month + stringDate.day;
    var ddmmyy = stringDate.day + stringDate.month + stringDate.year.slice(-2);
    var mmddyy = stringDate.month + stringDate.day + stringDate.year.slice(-2);
    var yymmdd = stringDate.year.slice(-2) + stringDate.month + stringDate.day;
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}



function checkPalindromeforAllDateFormats(date) {

    var listofPalindromes = getAllDateFormats(date);

    var flag = false;

    for (var i = 0; i < listofPalindromes.length; i++) {

        if (isPalindrome(listofPalindromes[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}


function isLeapYear(year) {

    if (year % 400 === 0) {
         return true;
    }

    if (year % 100 === 0) {
        return false;
    }

    if (year % 4 === 0) {
        return true;
    }

    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    //check for february
    if (month == 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = 3;
            }
        } else {
            if (day > 28) {
                day = 1;
                month = 3;
            }
        }
    } else {
        //check if the day exceeds the max days in month
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }


    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    }

}

function getNextPalindromeDate(date) {

    var nextDate = getNextDate(date);
    var count = 0;

    while (1) {
        count++;
        var isPalindrome = checkPalindromeforAllDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }

        nextDate = getNextDate(nextDate);
    }

    return [count, nextDate]

}



const bdateRef = document.querySelector("#bday-date");
const checkBtn = document.querySelector("#checkPailndromeBtn");
const resultDiv = document.querySelector("#result");

resultDiv.style.display = "none";

function checkPailndrome(params) {

    var bDate = bdateRef.value;

    if (bDate !== "") {
        var listOfDates = bDate.split("-");
        var date = {
            day: Number(listOfDates[2]),
            month: Number(listOfDates[1]),
            year: Number(listOfDates[0])
        }


        var isDatePalindrome = checkPalindromeforAllDateFormats(date);

        if (isDatePalindrome) {
            resultDiv.style.display = "block";
            resultDiv.innerText = 'Yay!! Your Birthdate is palindrome 😊'
        } else {

            var list = getNextPalindromeDate(date);
            resultDiv.style.display = "block";
            resultDiv.innerText = `oops! Your BirthDate is not palindrome 😥
    Next Palindrome Date is ${list[1].day}- ${list[1].month}-${list[1].year}
    which is ${list[0]} days away in future`
        }

    }



}

checkBtn.addEventListener("click", checkPailndrome);