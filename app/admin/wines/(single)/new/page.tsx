import { createWine } from "@/actions/wine";
import { WineForm } from "@/components/WineForm";

async function NewPage() {
  return <WineForm action={createWine} />;
}

export default NewPage;
