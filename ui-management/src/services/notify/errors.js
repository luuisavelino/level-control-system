const notifyError = (vs, error) => {
  let errMsg = ''

  if (error.response?.data?.message instanceof Array) {
    errMsg = error?.response?.data?.message[0]
  } else {
    errMsg = error?.response?.data?.message
  }

  vs.notify({
    title: 'Error',
    text: errMsg,
    color: 'danger',
    position: 'top-right'
  })
}

const notifySuccess = (vs, message) => {
  vs.notify({
    title: 'Success',
    text: message,
    color: 'success',
    position: 'top-right'
  })
}

export {
  notifyError,
  notifySuccess
}
