import ContentImage from "@/components/ContentImage";

type PersonCardProps = {
  name: string;
  role?: string;
  bio: string;
  image: string;
};

export default function PersonCard({ name, role, bio, image }: PersonCardProps) {
  return (
    <article className="flex flex-col gap-6 border-b border-black/10 pb-10 last:border-0 md:flex-row">
      <div className="relative mx-auto h-[280px] w-[220px] shrink-0 overflow-hidden bg-[#f5f5f5] md:mx-0">
        <ContentImage
          src={image}
          alt={name}
          fill
          className="object-cover object-top"
          sizes="220px"
        />
      </div>
      <div className="flex-1">
        <h2 className="text-xl text-black md:text-2xl">{name}</h2>
        {role ? (
          <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-ayuda-blue">
            {role}
          </p>
        ) : null}
        <p className={`${role ? "mt-4" : "mt-3"} text-base leading-relaxed text-black`}>
          {bio}
        </p>
      </div>
    </article>
  );
}
