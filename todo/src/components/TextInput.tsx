import { useState } from "react"
import Input from "./Input"
import Button from "./Button"

type TextInputProps = {
  onAdd: (text: string) => void
}


function TextInput({onAdd}: TextInputProps){
  const [text, setText] = useState('')
  const [isLimitExceeded, setIsLimitExceeded] = useState(false)

function handleAdd() {
  if (text.trim() === '') return

  onAdd(text)
  setText('')
  setIsLimitExceeded(false)
}
  return(
    <div className="flex flex-col gap-2">
    <div className="flex items-center gap-2">
<Input
  value={text}
  placeholder="Add a new task..."
  maxLength={20}

  onChange={(event) => {
    const value = event.target.value

    if (value.length > 20) {
      setIsLimitExceeded(true)
      return
    }

    setText(value)
    setIsLimitExceeded(false)
  }}

  onKeyDown={(event) => {
    if (event.key === 'Enter') {
      handleAdd()
    }
  }}
/>
        <div className="shrink-0">
        <Button
          text="Add"
          variant="primary"
          onClick={handleAdd}
        /> </div>
        </div>
      <div className="flex justify-between">
          <p className="text-xs text-rose-400">
          {isLimitExceeded && 'Character limit exceeded.'}
          </p>

          <p className="text-xs text-gray-400">
            {text.length} / 20
        </p>
    </div>

    </div>
  )
}

export default TextInput