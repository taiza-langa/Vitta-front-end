interface CampoAutenticacaoProps {
  id: string;
  label: string;
  type: "email" | "password" | "text" | "date";
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
  minLength?: number;
  max?: string;
}

export default function CampoAutenticacao({
  id,
  label,
  type,
  value,
  onChange,
  autoComplete,
  minLength,
  max,
}: CampoAutenticacaoProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        required
        minLength={minLength}
        max={max}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#28796D] focus:ring-4 focus:ring-emerald-800/10"
      />
    </div>
  );
}
