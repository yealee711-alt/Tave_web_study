import { useState } from "react"
import Input from "./Input"
import Button from "./Button"
import type { Category } from "../types"

type TextInputProps = {
  onAdd: (text: string, category: Category) => void
}


function TextInput({onAdd}: TextInputProps){
  const [text, setText] = useState('')
  const [isLimitExceeded, setIsLimitExceeded] = useState(false)
  const [category, setCategory] = useState<Category>('Study')

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()

  if(text.trim() === '') return

  onAdd(text.trim(), category)
  setText('')
  setIsLimitExceeded(false)
}

  return(
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2">
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
    />

    <select
      value={category}
      onChange={(event) =>
        setCategory(event.target.value as Category)
      }
    >
      <option value="Study">Study</option>
      <option value="Personal">Personal</option>
      <option value="Work">Work</option>
    </select>

    <div className="shrink-0">
      <Button
        text="Add"
        variant="primary"
        type='submit'
      /> 
    </div>
    </div>
    
    <div className="flex justify-between">
          <p className="text-xs text-rose-400">
          {isLimitExceeded && 'Character limit exceeded.'}
          </p>

          <p className="text-xs text-gray-400">
            {text.length} / 20
        </p>
    </div>

    </form>
  )
}

export default TextInput