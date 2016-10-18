const validate = values => {
  const errors = {}
  if (!values.upcList || !values.upcList.length) {
    errors.upcList = { _error: 'At least one upc must be entered' }
  } else {
    const upcListArrayErrors = []
    values.upcList.forEach((upc, upcIndex) => {
      const upcErrors = {}
      if (!upc || !upc.upcValue) {
        upcErrors.upcValue = 'Required'
      } else if (upc.upcValue.length < 12) {
        upcErrors.upcValue = 'Too less characters (12)'
      } else if (upc.upcValue.length > 12) {
        upcErrors.upcValue = 'Too many characters (12)'
      }

      if (upcErrors.upcValue) {
        upcListArrayErrors[upcIndex] = upcErrors
      }
    })

    if (upcListArrayErrors.length) {
      errors.upcList = upcListArrayErrors
    }
  }

  return errors
}

export default validate
