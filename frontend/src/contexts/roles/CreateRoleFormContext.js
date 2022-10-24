import { createContext } from 'react'

const roleFormInitialValues = {
  roleName: '',
  roleDesc: '',
  roleStatus: '',
}

const CreateRoleFormContext = createContext({
  roleFormValues: roleFormInitialValues,
  setRoleFormValues: () => {},
})

export default CreateRoleFormContext
