import { useState } from 'react'

function useInputOnChange(initialValue = '') {
  const [value, setValue] = useState(initialValue)
  const handleOnChange = (e) => {
    setValue(e.target.value)
  }
  return [value, handleOnChange]
}

export default useInputOnChange
