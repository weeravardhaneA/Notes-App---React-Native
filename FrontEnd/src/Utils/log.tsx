const log = (...values:any[]) => {

  if(__DEV__)
  {
    console.log(...values)
  }

}

export default log;