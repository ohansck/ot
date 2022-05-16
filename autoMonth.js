//Code to get total number of days in a month.
// 1 is added to the getMonth() function to help us get the last day of the previous month, by using zero as the day for getDate()
// start index at a number then reset it to zero, to calculate for the month 
const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth() + 1;
let workMonth = [];
let userYear = 2022;
let userMonth = 5;
let tempDays = [];
let correction = [];
let duty = new Array();
let monthSchedule = new Array();
let kiki;
const shiftSch = ['D1', 'D2', 'D3', 'N1', 'N2', 'N3', 'O1', 'O2', 'O3'];
// function daysInMonth(year, month) {
//     return new Date(year, month, 0).getDate();
// }

//let userDaysInMonths = daysInMonth(userYear, userMonth);
//getDays(userDaysInMonths);
const monthDays = (year, month) => new Date(year, month, 0).getDate();
function getDays(days) {
    for (let i = 1; i <= days; i++) {
        workMonth.push(i);
    }
}
getDays(monthDays(userYear, userMonth));

function createSchedule() {
    //The while loop iterates (sandwich) the duty days over the days of the month.
    //The counter stops the iteration when it is equal to the total number of work days.
    //Index indicates the duty on the specified day
    let counter = 0;


    while (counter < workMonth.length) {
        for (let index = 0; index < shiftSch.length; index++) {
            duty.push(shiftSch[index]);
            counter++;
            if (counter >= workMonth.length)
                break;
        }
        index = 0;
        //if (counter => workMonth.length) break;
        //console.log(counter);
    }
    for (let i = 0; i < workMonth.length; i++) {
        //console.log(workMonth[i], duty[i]);
        monthSchedule.push({ day: workMonth[i], duty: duty[i] });
    }
    // for (let i = 0; i < workMonth.length; i++) {
    //     console.log(workMonth[i], duty[i]);
    //     monthSchedule.push({ day: workMonth[i], duty: duty[i] });
    // }
}

function customSchedule() {
    //The while loop iterates (sandwich) the duty days over the days of the month.
    //The counter stops the iteration when it is equal to the total number of work days.
    //Index indicates the duty on the specified day
    let counter = 0;
    let counter2 = 0;
    let index = 2;
    let i = 0; //indicates number of days 
    tempDays = [];

    let clockTime;
    while (counter < workMonth.length) {
        for (index; index < shiftSch.length; index++) {
            duty.push(shiftSch[index]);
            counter++;
            if (counter >= workMonth.length)
                break;
        }
        index = 0;
        //if (counter => workMonth.length) break;
        //console.log(counter);
    }

    while (counter2 < workMonth.length) {
        for (i; i < workMonth.length; i++) {
            console.log(workMonth[i], duty[i]);
            // tempDays.push(workMonth[i]);
            tempDays.push({ day: workMonth[i], duty: duty[i] });
            counter2++;
            if (counter2 >= workMonth.length)
                break;
        }
        i = 0;
    }
    monthSchedule = tempDays.sort((a, b) => a.day - b.day);
    //console.log(tempDays);
    // for (let i = 0; i < workMonth.length; i++) {
    //     console.log(workMonth[i], duty[i]);
    //     monthSchedule.push({ day: workMonth[i], duty: duty[i] });
    // }
}
function createCorrection(ms) {
    let countDays = 0
    let countLeave = 0
    let hrGen
    let hrOt
    let hrTotal
    let hoursGen = 0;
    let hoursOt = 0;
    let hoursTotal = 0;
    const alphaSchedule = [];
    correction = [];
    let pos;
    for (let i = 0; i < ms.length; i++) {
        // console.log(workMonth[i], duty[i]);
        //tempDays.push(workMonth[i]);
        hrGen = 8; hrOt = 4; hrTotal = 12;
        pos = ms[i].duty.charAt(0);
        if (pos === 'D') {
            clockTime = '07:00am - 07:00pm';
        } else if (pos === 'N') {
            clockTime = '07:00pm - 07:00am';
        } else if (pos === 'O') {
            clockTime = '';
        } else if (pos === 'L') {
            clockTime = 'LEAV';
        }

        if (pos === 'L') {
            hrOt = 0;
            hrTotal = 8;;
        } else if (pos === 'O') {
            hrOt = 0; hrGen = 0; hrTotal = 0;
        }

        if (pos === 'D' || pos === 'N') {
            countDays++
        }
        if (pos === 'L') {
            countLeave++
        }
        let fullDate = `${workMonth[i]}/${userMonth}/${userYear}`;
        alphaSchedule.push({ date: fullDate, day: ms[i].day, duty: ms[i].duty, clockTime: clockTime, hrGen: hrGen, hrOt: hrOt, hrTotal: hrTotal });
        hoursGen += hrGen;
        hoursTotal += hrTotal;
        hoursOt += hrOt;
        // counter++;
        // if (counter >= ms.length)
        //     break;
    }
    correction = alphaSchedule.sort((a, b) => a.day - b.day);
    console.log(hoursGen, hoursOt, hoursTotal, countDays, countLeave);
    console.log(calcOT(countDays, 87500, calcOtAmount, countLeave));


}
customSchedule();

console.log(duty);
console.log(correction);
//createCorrection(alphaSchedule);
// do {
//     {
//         // schedule = workMonth.map(m => {
//         //     for (let i of shiftSch) {
//         //         console.log(m, i)
//         //         kiki = `${m}-${i}`;
//         //     }
//         //     return kiki;
//         // })

//         // for (const m of workMonth) {
//         //     for (let i of shiftSch) {
//         //         console.log(m, i);
//         //         schedule.push(`${i}-${m}`);
//         //     }
//         // }

//         // for (let i = 0; i < workMonth.length; i++) {
//         //     newarry.push(shiftSch[i])
//         //     console.log(workMonth[i], shiftSch[i])

//         // }
//         for (let i = 0; i < workMonth.length; i++) {
//             console.log(workMonth[i], schedule[i])
//             monthSchedule.push({ day: workMonth[i], duty: schedule[i] });
//         }

//     }
// } while (false);
