import { STATUS } from '../constants'

export const getTextColor = (status) => {
  if (status === STATUS.RETIRED) {
    return 'red'
  } else if (status === STATUS.PENDING) {
    return 'orange'
  } else {
    return 'green'
  }
}

export const toRenderTableRows = (isEmpty, isLoading, error) => {
  return !isEmpty && !isLoading && !error
}

export default null
