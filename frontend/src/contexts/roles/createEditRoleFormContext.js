import { createContext } from 'react'

const roleFormInitialValues = {
  roleName: '',
  roleDesc: '',
  roleDept: '',
  roleStatus: '',
}

const CreateEditRoleFormContext = createContext({
  roleFormValues: roleFormInitialValues,
  setRoleFormValues: () => {},
})

export default CreateEditRoleFormContext
