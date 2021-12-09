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

  const roundToOneDecimal = (num: number) => {
    const multiplier = Math.pow(10, 1); // One precision
    return Math.round(num * multiplier) / multiplier;
  };

  const getExactHour = (dt: number): string => {
    const timing = format(fromUnixTime(dt), "K:mb");
    return timing;
  };

  return {
    getHour,
    getDay,
    getExactHour,
    roundToOneDecimal
  };
}

const utility = utils();

export default utility;
