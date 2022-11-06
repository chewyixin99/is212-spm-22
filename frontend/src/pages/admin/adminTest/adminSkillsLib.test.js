import {
  isValidSkillDetails,
  isValidSkillDesc,
  isValidSkillCourses,
  isValidSkillName,
} from '../adminSkillsLib'

describe('adminSkillsLibTest', () => {
  describe('isValidSkillDesc', () => {
    test('empty skill description', () => {
      expect(isValidSkillDesc('')).toBe(false)
    })
    test('only white space in skill description', () => {
      expect(isValidSkillDesc('      ')).toBe(false)
    })
    test('valid skill description', () => {
      expect(isValidSkillDesc('This is a skill description')).toBe(true)
    })
    test('skill description too long', () => {
      expect(
        isValidSkillDesc(
          `
                    123456789012345678901234567890
                    123456789012345678901234567890
                    123456789012345678901234567890
                    123456789012345678901234567890
                    123456789012345678901234567890
                    123456789012345678901234567890
                    123456789012345678901234567890
                    123456789012345678901234567890
                    123456789012345678901234567890
                `
        )
      ).toBe(false)
    })
  })
  describe('isValidSkillName', () => {
    test('empty skill name', () => {
      expect(isValidSkillName('')).toBe(false)
    })
    test('only white space in skill name', () => {
      expect(isValidSkillName('      ')).toBe(false)
    })
    test('valid skill name', () => {
      expect(isValidSkillName('This is a skill name')).toBe(true)
    })
    test('skill name too long', () => {
      expect(
        isValidSkillName(
          `
                    123456789012345678901234567890
                    123456789012345678901234567890
                `
        )
      ).toBe(false)
    })
  })
  describe('isValidSkillCourses', () => {
    test('empty list', () => {
      expect(isValidSkillCourses([])).toBe(false)
    })
    test('empty string', () => {
      expect(isValidSkillCourses('')).toBe(false)
    })
    test('valid courses', () => {
      expect(
        isValidSkillCourses([
          {
            course_category: 'Finance',
            course_desc:
              'Data is meaningless unless insights and analysis can be drawn to provide useful information for business decision-making. It is imperative that data quality, integrity and security ',
            course_id: 'FIN001',
            course_name: 'Data Collection and Analysis',
            course_status: 'Active',
            course_type: 'External',
          },
          {
            course_category: 'Technical',
            course_desc:
              'The Machine Learning DevOps Engineer Nanodegree program focuses on the software engineering fundamentals needed to successfully streamline the deployment of data and machine-learning models',
            course_id: 'tch006',
            course_name: 'Machine Learning DevOps Engineer',
            course_status: 'Pending',
            course_type: 'Internal',
          },
        ])
      ).toBe(true)
    })
  })
  describe('isValidSkillDetails', () => {
    test('empty desc and empty courses', () => {
      expect(isValidSkillDetails('', [])).toBe(false)
    })
    test('empty desc and valid courses', () => {
      expect(
        isValidSkillDetails('', [
          {
            course_category: 'Finance',
            course_desc:
              'Data is meaningless unless insights and analysis can be drawn to provide useful information for business decision-making. It is imperative that data quality, integrity and security ',
            course_id: 'FIN001',
            course_name: 'Data Collection and Analysis',
            course_status: 'Active',
            course_type: 'External',
          },
        ])
      ).toBe(false)
    })
    test('valid desc and empty courses', () => {
      expect(isValidSkillDetails('Description', [])).toBe(false)
    })
    test('valid desc and valid courses', () => {
      expect(
        isValidSkillDetails('Description', [
          {
            course_category: 'Finance',
            course_desc:
              'Data is meaningless unless insights and analysis can be drawn to provide useful information for business decision-making. It is imperative that data quality, integrity and security ',
            course_id: 'FIN001',
            course_name: 'Data Collection and Analysis',
            course_status: 'Active',
            course_type: 'External',
          },
        ])
      ).toBe(true)
    })
  })
})
