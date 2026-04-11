interface Props {
  title: string;
  description: string;
}

export function Card(props: Props) {
  return (
    <div
      className="w-full min-w-[340px] h-[476px] sm:min-w-[300px] sm:h-[420px]
        overflow-hidden rounded-xl border-primary
        bg-surface shadow-sm transition hover:shadow-md hover:-translate-y-1
        dark:border-primary-dark dark:bg-content flex flex-col"
    >
      <div className="p-3 flex flex-col flex-1 justify-center text-center">
        <h3 className="mb-1 font-bold">{props.title}</h3>
        <p className="text-sm">{props.description}</p>
      </div>
    </div>
  );
}
