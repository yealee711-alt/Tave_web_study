type ButtonProps = {
  text: string
  onClick: () => void
  variant: 'primary' | 'delete'
}

function Button({text, onClick, variant}: ButtonProps) {
const buttonStyle =
  variant === 'primary'
    ? 'rounded-xl bg-rose-400 px-4 py-3 font-medium text-white transition-colors hover:bg-rose-500'
    : 'text-sm text-rose-400 transition-colors hover:text-rose-500'
  return (
    <button 
    className={buttonStyle}
    onClick={onClick}>
      {text}
    </button>
  )
}

export default Button