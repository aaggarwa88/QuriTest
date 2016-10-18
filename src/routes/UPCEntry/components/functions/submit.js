
import { SubmissionError } from 'redux-form'
import $ from 'jquery'

const APICall = 'https://iwo3uesa6c.execute-api.us-east-1.amazonaws.com/prod/products'

const apiRequest = upcValuesArray => new Promise((resolve, reject) => {
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: APICall,
    crossDomain : true,
    cors: true,
    data:  { 'list': upcValuesArray }
  })
  .done(function (data) {
    resolve()
  })
  .fail(function (xhr, textStatus, errorThrown) {
    console.log(xhr)
    reject()
  })
})

function submit (values) {
  let upcValuesArray = []
  for (var i = 0; i < values.upcList.length; i++) {
    upcValuesArray.push(values.upcList[0].upcValue)
  }

  return apiRequest(upcValuesArray) // simulate server latency
  .then(() => {
    window.alert(`You submitted:\n\n${JSON.stringify(upcValuesArray, null, 2)}`)
  })
  .catch(() => {
    throw new SubmissionError({ _error: 'UPC Submission failed. Server Error or Invalid UPC' })
  })
}

export default submit
