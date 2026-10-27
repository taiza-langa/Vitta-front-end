interface AdminPlaceholderProps {
  titulo: string;
}

export default function AdminPlaceholder({
  titulo,
}: AdminPlaceholderProps) {
  return (
    <section className="p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-[#193F39]">{titulo}</h2>
      <p className="mt-2 text-sm text-gray-500">
        Esta área será implementada em breve.
      </p>
    </section>
  );
}
