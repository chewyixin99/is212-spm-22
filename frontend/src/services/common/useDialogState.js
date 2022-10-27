import { useState } from 'react'

const useDialogState = (init = false) => {
  const [isOpen, setIsOpen] = useState(init)

  const open = () => {
    setIsOpen(true)
  }
  const close = () => setIsOpen(false)

  return {
    isOpen: Boolean(isOpen),
    open,
    close,
  }
}

export default useDialogState
