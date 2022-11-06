import { STATUS } from '../../constants'
import { getTextColor, toRenderTableRows } from '../componentsLib'

const CustomException = (message) => {
  const error = new Error(message)
  error.code = 'CUSTOM_ERROR_CODE'
  return error
}

describe('componentsLibTest', () => {
  describe('getTextColor active', () => {
    test('ACTIVE', () => {
      expect(getTextColor(STATUS.ACTIVE)).toBe('green')
    })
    test('PENDING', () => {
      expect(getTextColor(STATUS.PENDING)).toBe('orange')
    })
    test('RETIRED', () => {
      expect(getTextColor(STATUS.RETIRED)).toBe('red')
    })
  })
  describe('toRenderTableRows', () => {
    test('is empty', () => {
      expect(toRenderTableRows(true, false, null)).toBe(false)
    })
    test('is loading', () => {
      expect(toRenderTableRows(false, true, null)).toBe(false)
    })
    test('not empty, not loading, but exception thrown', () => {
      expect(toRenderTableRows(false, false, CustomException('error'))).toBe(
        false
      )
    })
    test('not empty, not loading, no error', () => {
      expect(toRenderTableRows(false, false, null)).toBe(true)
    })
  })
})
