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
    className={cn("p-4 text-center  rounded-md border border-black", className)}
  >
    {children}
  </Link>
);

async function AdminPage() {
  return (
    <div className="flex flex-col self-start gap-4 mt-10">
      <LinkCard
        href="/admin/wines"
        className="font-semibold text-white bg-black"
      >
        Vinos
      </LinkCard>
      <div className="flex flex-wrap gap-2">
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
