import APP_FORMATS from "@/constants/APP_FORMATS"
import moment from "moment"

const formatDateForMoment = (date: Date, format: keyof typeof APP_FORMATS) => {
  // APP_FORMATS.DATE_INCOMING_FORMAT_MOMENT
  return moment(date).format(APP_FORMATS[format])
}


const dateUtils = {
  formatDateForMoment
}

export default dateUtils
