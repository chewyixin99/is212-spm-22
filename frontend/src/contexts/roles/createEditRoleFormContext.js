import { createContext } from 'react'

const roleFormInitialValues = {
  roleName: '',
  roleDesc: '',
  roleStatus: '',
}

const CreateEditRoleFormContext = createContext({
  roleFormValues: roleFormInitialValues,
  setRoleFormValues: () => {},
})

export default CreateEditRoleFormContext
