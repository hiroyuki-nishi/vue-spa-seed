import {date} from "quasar";

export const formatDate = (dateTime: Date, format = "YYYY-MM-DD") =>
    date.formatDate(dateTime, format);
