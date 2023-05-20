import dayjs from "dayjs";

export default (date) => dayjs(date, "YYYY-MM-DDTHH:mm:ssZ[Z]").format("DD/MM/YYYY");
