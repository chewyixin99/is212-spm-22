import * as Yup from 'yup'

const CreateEditRoleFormSchema = Yup.object({
  roleName: Yup.string()
    .max(50, 'Must be 50 characters or less.')
    .required('Required'),
  roleDesc: Yup.string()
    .max(255, 'Not more than 255 characters.')
    .required('Required'),
  roleDept: Yup.string()
    .max(50, 'Must be 50 characters or less.')
    .required('Required'),
  roleStatus: Yup.string().required('Please select a status.'),
  skills: Yup.array()
    .of(Yup.number())
    .min(1, 'Please select a skill associated with the role.'),
})

export default CreateEditRoleFormSchema
