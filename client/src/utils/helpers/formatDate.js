import dayjs from "dayjs";

export const formatToSystemDate = (date) =>
  dayjs(date, "YYYY/MM/DD").format("YYYY-MM-DDTHH:mm:ssZ[Z]");

export default (date, format = "DD/MM/YYYY") =>
  dayjs(date, "YYYY-MM-DDTHH:mm:ssZ[Z]").format(format);
