type ButtonProps = {
  text: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

export default function Button({
  text,
  type = 'button',
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300"
    >
      {text}
    </button>
  )
}