/**
   * Convert String date to Date format
   * @param {Object} dateString Date in String format
   */
function stringToDate (dateString) {
  const parts = dateString.split('/')
  return new Date(parts[2], parts[1] - 1, parts[0])
}

export default stringToDate