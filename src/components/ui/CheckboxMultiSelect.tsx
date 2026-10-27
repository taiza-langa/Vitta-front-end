import { ChevronDown } from "lucide-react";
import { useMultiSelectOpen } from "../../hooks/useMultiSelectOpen";

interface CheckboxOption {
  id: number;
  label: string;
}

interface CheckboxMultiSelectProps {
  options: CheckboxOption[];
  selectedIds: number[];
  disabled?: boolean;
  emptyMessage: string;
  onChange: (id: number, selecionado: boolean) => void;
}

export function CheckboxMultiSelect({
  options,
  selectedIds,
  disabled = false,
  emptyMessage,
  onChange,
}: CheckboxMultiSelectProps) {
  const { aberto, setAberto, containerRef } = useMultiSelectOpen();
  const nomesSelecionados = options
    .filter((option) => selectedIds.includes(option.id))
    .map((option) => option.label)
    .join(" · ");

  if (options.length === 0) {
    return (
      <p className="rounded-xl border border-[#D8E3DF] bg-[#F8FAF9] px-3 py-3 text-sm text-[#7D9290]">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${aberto ? "z-[60]" : ""}`}
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={aberto}
        disabled={disabled}
        onClick={() => setAberto((estaAberto) => !estaAberto)}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-[#D8E3DF] bg-white px-3 py-3 text-left text-sm text-[#193F39] outline-none transition hover:border-[#2D806F] focus:border-[#2D806F] focus:ring-2 focus:ring-[#2D806F]/15 disabled:cursor-not-allowed disabled:bg-[#F4F7F6]"
      >
        <span
          className={`min-w-0 flex-1 truncate ${
            nomesSelecionados ? "text-[#193F39]" : "text-[#A0AFAC]"
          }`}
          title={nomesSelecionados || undefined}
        >
          {nomesSelecionados || "Selecione uma ou mais opções"}
        </span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`shrink-0 text-[#718884] transition-transform ${
            aberto ? "rotate-180" : ""
          }`}
        />
      </button>

      {aberto && (
        <ul
          role="listbox"
          aria-multiselectable="true"
          className="absolute left-0 right-0 top-[calc(100%+0.25rem)] z-[60] max-h-60 space-y-1 overflow-y-auto rounded-xl border border-[#D8E3DF] bg-white p-2 shadow-[0_12px_28px_rgba(25,63,57,0.16)]"
        >
          {options.map((option) => {
            const selecionado = selectedIds.includes(option.id);
            return (
              <li key={option.id} role="option" aria-selected={selecionado}>
                <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2.5 text-sm text-[#193F39] transition hover:bg-[#F0F7F5]">
                  <input
                    type="checkbox"
                    checked={selecionado}
                    onChange={(event) =>
                      onChange(option.id, event.target.checked)
                    }
                    disabled={disabled}
                    className="h-4 w-4 shrink-0 accent-[#2D806F]"
                  />
                  {option.label}
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
