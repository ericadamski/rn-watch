import document from "document";
import * as simpleSettings from "./device-settings";
import * as simpleClock from "./clock";
import * as simpleActivity from "./activity";
import * as util from "../common/utils";

// Tick every second
let background = document.getElementById("background");
let hourHand = document.getElementById("clock__hrs");
let secHand = document.getElementById("clock__secs");
let clockCenter = document.getElementById("clock__center");
let clockBorder = document.getElementById("clock__border");
let minHand = document.getElementById("clock__mins");
let day = document.getElementById("date__day");
let month = document.getElementById("date__month");
let seconds = document.getElementById("seconds__out");
let digitalTime = document.getElementById("digital__out");
let steps = document.getElementById("steps__out");
let minPointer = document.getElementById("clock__min-pointer");
let hrPointer = document.getElementById("clock__hr-pointer");
let secPointer = document.getElementById("clock__secs-pointer");
let stepsArc = document.getElementById("steps__arc");
let stepsWords = document.getElementById("steps__words");
let secondsArc = document.getElementById("seconds__arc");

/* --------- CLOCK ---------- */
function clockCallback(data) {
  const { date, time } = data;
  hourHand.groupTransform.rotate.angle = simpleClock.hoursToAngle(
    time.hrs,
    time.mins
  );
  minHand.groupTransform.rotate.angle = simpleClock.minutesToAngle(time.mins);
  secHand.groupTransform.rotate.angle = simpleClock.secondsToAngle(time.secs);
  seconds.text = time.secs;
  digitalTime.text = util.zeroPad(time.hrs) + ":" + util.zeroPad(time.mins);
  day.text = date.day;
  month.text = date.m;
}
simpleClock.initialize(clockCallback);

/* ------- ACTIVITY --------- */
function activityCallback(data) {
  const s = data.steps.raw;
  const ints = s.toString().split("").reverse();
  let count = 0;

  let parts = [];
  while (count < ints.length) {
    let section;
    if (count + 3 > ints.length) {
      section = ints.slice(count);
    } else {
      section = ints.slice(count, 3);
    }

    parts.push(section.reverse());
    count += Math.min(3, ints.length - count);
  }

  if (s < 1000) {
    steps.text = data.steps.pretty;
  } else {
    const [t, h] = parts.reverse();
    steps.text = `${t.join("")}.${h[0]}k`;
  }
}
simpleActivity.initialize("seconds", activityCallback);

/* -------- SETTINGS -------- */
function settingsCallback(data) {
  if (!data) {
    return;
  }
  if (data.colorDigitalTime) {
    digitalTime.style.fill = data.colorDigitalTime;
  }
  if (data.colorBackground) {
    background.style.fill = data.colorBackground;
  }
  if (data.colorTime) {
    hourHand.style.fill = data.colorTime;
    minHand.style.fill = data.colorTime;
    clockCenter.style.fill = data.colorTime;
    clockBorder.style.fill = data.colorTime;
    minPointer.style.fill = data.colorTime;
    hrPointer.style.fill = data.colorTime;
  }
  if (data.colorDate) {
    day.style.fill = data.colorDate;
    month.style.fill = data.colorDate;
  }
  if (data.colorSteps) {
    steps.style.fill = data.colorSteps;
    stepsArc.style.fill = data.colorSteps;
    stepsWords.style.fill = data.colorSteps;
  }
  if (data.colorSeconds) {
    seconds.style.fill = data.colorSeconds;
    secPointer.style.fill = data.colorSeconds;
    secondsArc.style.fill = data.colorSeconds;
  }
}
simpleSettings.initialize(settingsCallback);
