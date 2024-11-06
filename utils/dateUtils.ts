import APP_FORMATS from "@/constants/APP_FORMATS"
import moment from "moment"

const formatDateForMoment = (date: Date, format: keyof typeof APP_FORMATS) => {
  return moment(date, APP_FORMATS.DATE_INCOMING_FORMAT_MOMENT).format(APP_FORMATS[format])
}


const dateUtils = {
  formatDateForMoment
}

export default dateUtils
