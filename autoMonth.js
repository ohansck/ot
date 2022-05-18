//Code to get total number of days in a month.
// 1 is added to the getMonth() function to help us get the last day of the previous month, by using zero as the day for getDate()
// start index at a number then reset it to zero, to calculate for the month 
const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth() + 1;
let [workMonth, tempDays, tempSch, correction, duty, duty1, duty2] = [[], [], [], [], [], [], []];
let userYear = 2022;
let userMonth = 5;
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
    //counter2 counts the iterations for creation of workDay array
    //Counter3 counts the duty iterations from previous user select day till first day
    let [counter, counter2, counter3, index] = [0, 0, 0, 0];
    //chosenDuty is the user selected duty for the selected day
    let chosenDuty = 0;
    //i is the user selected day of the month for start of schedule creation
    let i = 17;
    tempDays = [];
    let r;
    index = chosenDuty;
    //Creates the duty schedule from the first till end of month
    while (counter < workMonth.length) {
        //Creates the duty schedule from the user select day, till end of month
        {

            while (counter < workMonth.length - i) {
                for (index; index < shiftSch.length; index++) {
                    duty1.push(shiftSch[index]);
                    counter++;
                    // counter3--;
                    console.log(counter);
                    console.log(`Counter: ${counter}. in normal duty`);
                    if (counter >= workMonth.length - i) break;

                }
                //if (counter >= workMonth.length - i) break;
                index = 0;
            }
        }
        //This arranges the duty schedule backwards from the previous day backwards to the first
        r = chosenDuty - 1;
        {
            //if (index === 0) index = 9;
            //index = i;
            while (counter3 < i) {
                if (r < 0) r = 8;
                for (r; r >= 0; r--) {
                    duty2.push(shiftSch[r]);
                    counter++;
                    counter3++;
                    console.log(`Counter: ${counter}. in reverse duty`);
                    if (counter3 >= i) break;
                }
                r = 8;
            }
        }
    }
    //duty = duty1.concat(duty2.reverse());
    duty = duty1.concat(duty2.reverse());
    console.log(`Balance is ${workMonth.length - i}`);
    while (counter2 < workMonth.length) {
        for (i; i < workMonth.length; i++) {
            console.log(workMonth[i]);
            // tempDays.push(workMonth[i]);
            tempDays.push(workMonth[i]);
            counter2++;
            if (counter2 >= workMonth.length)
                break;
        }
        i = 0;
    }
    //For final creation and sorting of the monthly schedule
    for (let j = 0; j < workMonth.length; j++) {
        tempSch.push({ day: tempDays[j], duty: duty[j] });
    }
    monthSchedule = tempSch.sort((a, b) => a.day - b.day);
}

//creation of the corection sheet
function createCorrection(ms) {
    let [countDays, countLeave, hoursGen, hoursOt, hoursTotal] = [0, 0, 0, 0, 0]
    let hrGen
    let hrOt
    let hrTotal
    const alphaSchedule = [];
    correction = [];
    let pos;
    for (let i = 0; i < ms.length; i++) {

        hrGen = 8; hrOt = 4; hrTotal = 12;
        pos = ms[i].duty.charAt(0);

        {
            if (pos === 'D') {
                clockTime = '07:00am - 07:00pm';
            } else if (pos === 'N') {
                clockTime = '07:00pm - 07:00am';
            } else if (pos === 'O') {
                clockTime = '';
            } else if (pos === 'L') {
                clockTime = 'LEAV';
            }
        }

        {
            if (pos === 'L') {
                hrOt = 0;
                hrTotal = 8;;
            } else if (pos === 'O') {
                hrOt = 0; hrGen = 0; hrTotal = 0;
            }
        }

        {
            if (pos === 'D' || pos === 'N') {
                countDays++
            }
            if (pos === 'L') {
                countLeave++
            }
        }
        let fullDate = `${workMonth[i]}/${userMonth}/${userYear}`;
        alphaSchedule.push({ date: fullDate, day: ms[i].day, duty: ms[i].duty, clockTime: clockTime, hrGen: hrGen, hrOt: hrOt, hrTotal: hrTotal });
        hoursGen += hrGen;
        hoursTotal += hrTotal;
        hoursOt += hrOt;

    }
    correction = alphaSchedule.sort((a, b) => a.day - b.day);
    console.log(hoursGen, hoursOt, hoursTotal, countDays, countLeave);
    console.log(calcOT(countDays, 87500, calcOtAmount, countLeave));


}
customSchedule();

console.log(`duty array`, duty);
console.log(`duty1 array`, duty1)
console.log(`duty2 array`, duty2)
console.log(`duty2 reverse`, duty2.reverse())
console.log(`correction`, correction);
