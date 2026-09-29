type InputProps = {
  value: string
  placeholder: string
  maxLength: number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
function Input({
  value,
  placeholder,
  maxLength,
  onChange,
}: InputProps) {
  return (
    <input
      className="w-full rounded-xl bg-stone-100 px-4 py-3 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-rose-300"
      type="text"
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      onChange={onChange}
      />
  )
}

export default Input