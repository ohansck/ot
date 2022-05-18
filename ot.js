const formOT = document.querySelector('#formOT');
const otBasic = document.querySelector('#otBasic');
const otDay = document.querySelector('#otDay');
const otAmount = document.querySelector('#otAmount');
const otDisplay = document.querySelector('#otDisplay');
const leave = document.querySelector('#leave');
leave.defaultValue = 0;

let hrs = 0;
let ot = 0;
//const leaveDays = 0;
//Code for formatting number as currency
let formatter = new Intl.NumberFormat('locale', {
    style: 'currency',
    currency: 'NGN',
    currencyDisplay: 'narrowSymbol'
});

let calcOtAmount = (hrs, basic) => (hrs * 1.5 * basic) / 176;

function calcOT(workDays, basicSalary, calcOtAmount, leaveDays = 0) {
    hrs = (workDays * 12) - 176;
    if (leaveDays > 0) {
        hrs = (leaveDays * 8) + hrs;
    }
    ot = calcOtAmount(hrs, basicSalary);
    if (ot > 0) {
        otAmount.textContent = formatter.format(ot).toString();
    } else {
        otAmount.innerHTML = '&#x20A6 0';
        console.log('amount not greater than zero');
    }

}

formOT.addEventListener('submit', function (e) {
    console.log(parseInt(formOT.elements.otBasic.value));
    console.log(otBasic.valueAsNumber);
    console.log(otDay.valueAsNumber);
    
    if (!leave.valueAsNumber) {
        leave.valueAsNumber = 0;
    }
    calcOT((otDay.valueAsNumber - leave.valueAsNumber), otBasic.valueAsNumber, calcOtAmount, leave.valueAsNumber);
    otDisplay.hidden = false;
    e.preventDefault();
    otDay.value = "";
    otBasic.value = "";
    formOT.leave.value = "";

})




