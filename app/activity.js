import { me } from "appbit";
import clock from "clock";
import { today, goals } from "user-activity";
import { units } from "user-settings";

let activityCallback;

export function initialize(granularity, callback) {
  if (me.permissions.granted("access_activity")) {
    clock.granularity = granularity;
    clock.addEventListener("tick", tickHandler);
    activityCallback = callback;
  } else {
    console.log("Denied User Activity permission");
    callback({ steps: getDeniedStats() });
  }
}

let activityData = () => ({ steps: getSteps() });

function tickHandler(evt) {
  activityCallback(activityData());
}

function getSteps() {
  let val = today.adjusted.steps || 0;
  return {
    raw: val,
    pretty:
      val > 999
        ? Math.floor(val / 1000) + "," + ("00" + (val % 1000)).slice(-3)
        : val,
  };
}

function getDeniedStats() {
  return {
    raw: 0,
    pretty: "Denied",
  };
}
