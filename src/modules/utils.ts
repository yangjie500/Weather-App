import { format } from "date-fns";
import { fromUnixTime } from "date-fns";

function utils() {
  const getHour = (dt: number): string => {
    const timing = format(fromUnixTime(dt), "hbb");
    return timing;
  };

  const getDay = (dt: number): string => {
    const day = format(fromUnixTime(dt), "iii");
    return day;
  };

  return {
    getHour,
    getDay
  };
}

const utility = utils();

export default utility;
