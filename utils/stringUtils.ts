const truncateString = (str: string, maxLength: number = 150) => {
  if (str?.length <= maxLength) {
    return str;
  }
  return str?.slice(0, maxLength) + '...';
}


const stringUtils = {
  truncateString
}

export default stringUtils
