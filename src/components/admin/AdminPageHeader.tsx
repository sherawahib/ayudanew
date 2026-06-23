type AdminPageHeaderProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

export default function AdminPageHeader({ title, description, actions }: AdminPageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="font-[family-name:var(--font-lora)] text-2xl text-[#0f2d52] lg:text-3xl">
          {title}
        </h1>
        {description ? <p className="mt-1 text-sm text-[#5a6b7d]">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
