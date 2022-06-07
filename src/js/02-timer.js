import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const dataDays = document.querySelector('.value[data-days]');
const dataHours = document.querySelector('.value[data-hours]');
const dataMinutes = document.querySelector('.value[data-minutes]');
const dataSeconds = document.querySelector('.value[data-seconds]');

startBtn.disabled = true;

flatpickr(inputDate, {enableTime: true,                     //Включает выбор времени
    time_24hr: true,                                        //Отображает средство выбора времени в 24-часовом режиме без выбора AM/PM, если включено.
    defaultDate: new Date(),                                //Устанавливает начальную выбранную дату 
    minuteIncrement: 1,                                     //Регулирует шаг ввода минут (включая прокрутку)
    onClose(selectedDates) {                                //Функция(и) для запуска при каждом закрытии календаря.
        if (selectedDates[0] <= new Date()){
            // window.alert("Please choose a date in the future");
            Notify.warning("Please choose a date in the future", {
                position: 'center-top',
                backOverlay: true,
                cssAnimationStyle: 'from-top',
            });
            startBtn.disabled = true;
        } else {
            startBtn.disabled = false;
        };      
},}); 

startBtn.addEventListener('click', onBtnClick);

let timerId ='';
function onBtnClick() {
    startBtn.disabled = true;
    inputDate.disabled = true;

    timerId = setInterval(() => {
        const difference = new Date(inputDate.value) - new Date();
        const timerOn = convertMs(difference);
        console.log(timerOn);
        updateTimer(timerOn);
        if (difference < 1000) {
            clearInterval(timerId)
            startBtn.disabled = false;
            inputDate.disabled = false;
    }}, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) {
    dataDays.textContent = days;
    dataHours.textContent = hours;
    dataMinutes.textContent = minutes;
    dataSeconds.textContent = seconds;
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

// console.log(Date.now());
// console.log(new Date());
// console.log(new Date(inputDate.value));

// const irt = new Date() - new Date(inputDate.value);
// console.log(irt);

// const options = {
//      enableTime: true,                     //Включает выбор времени
//      time_24hr: true,                      //Отображает средство выбора времени в 24-часовом режиме без выбора AM/PM, если включено.
//      defaultDate: new Date(),              //Устанавливает начальную выбранную дату 
//      minuteIncrement: 1,                   //Регулирует шаг ввода минут (включая прокрутку)
//      onClose(selectedDates) {              //Функция(и) для запуска при каждом закрытии календаря.
//         console.log(selectedDates[0]);      
//     },
// };
