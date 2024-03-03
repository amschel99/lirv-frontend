import { formatDistance, parse, format } from "date-fns";
import { enGB } from "date-fns/locale";

export const getDateTimediff = (datestr: string): string => {
  try {
    const currDate: Date = new Date();
    const prevDate: Date = new Date(datestr);

    const formatteddiff: string = formatDistance(prevDate, currDate, {
      addSuffix: true,
      includeSeconds: true,
      locale: enGB,
    });

    return formatteddiff;
  } catch (e) {
    return "";
  }
};

export function formatDate(inputDate: string): string {
  try {
    const formattedDate = format(new Date(inputDate), "EE, MMM, dd, yyyy");
    return formattedDate;
  } catch (e) {
    return "";
  }
}
