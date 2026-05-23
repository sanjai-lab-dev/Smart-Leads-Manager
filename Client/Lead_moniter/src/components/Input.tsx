interface InputProps {
  label: string
  type: string 
  name: string
  value: string | number |undefined 
  placeholder: string
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void
}
export default function Input({
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
}: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}