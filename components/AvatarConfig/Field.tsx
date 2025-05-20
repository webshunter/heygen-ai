interface FieldProps {
  label: string;
  children: React.ReactNode;
  tooltip?: string;
}

export const Field = (props: FieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[#357A5B] text-sm font-semibold">{props.label}</label>
      {props.children}
    </div>
  );
};
