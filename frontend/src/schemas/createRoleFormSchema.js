import * as Yup from 'yup'

const createRoleFormSchema = Yup.object({
  roleName: Yup.string()
    .max(15, 'Must be 15 characters or less.')
    .required('Required'),
  roleDesc: Yup.string()
    .max(255, 'Not more than 255 characters.')
    .required('Required'),
  roleStatus: Yup.string().required('Please select a status.'),
})

export default createRoleFormSchema
