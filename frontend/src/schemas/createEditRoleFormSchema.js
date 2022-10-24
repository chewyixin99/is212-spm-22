import * as Yup from 'yup'

const CreateEditRoleFormSchema = Yup.object({
  roleName: Yup.string()
    .max(50, 'Must be 50 characters or less.')
    .required('Required'),
  roleDesc: Yup.string()
    .max(255, 'Not more than 255 characters.')
    .required('Required'),
  roleStatus: Yup.string().required('Please select a status.'),
})

export default CreateEditRoleFormSchema
