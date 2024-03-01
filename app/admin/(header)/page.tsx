import { cn } from "@/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

const LinkCard = ({
  href,
  children,
  className,
}: {
  href: string;
  children: string;
  className?: string;
}) => (
  <Link
    href={href}
    className={cn(
      "px-4 py-2 text-center  rounded-md border border-black shadow-sm",
      className
    )}
  >
    {children}
  </Link>
);

async function AdminPage() {
  return (
    <div className="flex flex-col self-start gap-2 px-4 mt-10">
      <LinkCard
        href="/admin/wines"
        className="py-4 font-semibold text-white bg-black"
      >
        Vinos
      </LinkCard>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <LinkCard href="/admin/countries">Países</LinkCard>
        <LinkCard href="/admin/cellars">Bodegas</LinkCard>
        <LinkCard href="/admin/zones">Zonas</LinkCard>
        <LinkCard href="/admin/types">Tipos</LinkCard>
        <LinkCard href="/admin/grapes">Uvas</LinkCard>
      </div>
    </div>
  );
}

export default AdminPage;
