export const isValidSkillDetails = (skillDesc, courses) => {
  return isValidSkillDesc(skillDesc) && isValidSkillCourses(courses)
}

export const isValidSkillDesc = (skillDesc) => {
  return !(skillDesc.trim().length === 0 || skillDesc.trim().length > 255)
}

export const isValidSkillCourses = (courses) => {
  return !(courses === [] || courses.length < 1)
}

export const isValidSkillName = (skillName) => {
  return !(skillName.trim().length === 0 || skillName.trim().length > 50)
}

export default isValidSkillDetails
