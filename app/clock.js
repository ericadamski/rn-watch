import clock from "clock";
import { days, months, monthsShort } from "./locales/en";
import * as util from "../common/utils";

let clockcb;

export function initialize(callback) {
  clock.granularity = "seconds";
  clockcb = callback;
  clock.addEventListener("tick", tickHandler);
}

function tickHandler(event) {
  let today = event.date;

  clockcb({
    time: {
      hrs: today.getHours(),
      mins: today.getMinutes(),
      secs: util.zeroPad(today.getSeconds()),
    },
    date: {
      m: monthsShort[today.getMonth()],
      day: util.zeroPad(today.getDate()),
    },
  });
}

export function hoursToAngle(hours, minutes) {
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle;
}

export function minutesToAngle(minutes) {
  return (360 / 60) * minutes;
}

export function secondsToAngle(seconds) {
  return minutesToAngle(seconds);
}
