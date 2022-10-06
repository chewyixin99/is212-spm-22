const getAllRoles = () => {
  return fetch('http://localhost:5001/roles')
    .then((data) => data.json())
    .catch((e) => {
      console.log('---> getAllRoles, error: ', e)
      return e
    })
}

const getRoleById = () => {}

export { getAllRoles, getRoleById }
