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

export {
  notifyError,
}
