import { deleteWine } from "@/actions/wine";
import { Wine } from "@/utils/supabase/parsedTypes";
import { Dispatch, SetStateAction } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/AlertDialog";

export const Dialog = ({
  data,
  alertOpen,
  setAlertOpen,
}: {
  data: Wine[];
  alertOpen: string | null;
  setAlertOpen: Dispatch<SetStateAction<string | null>>;
}) => {
  return (
    <AlertDialog open={!!alertOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Seguro que quieres eliminar "
            {data.find((wine) => String(wine.id) === alertOpen)?.name}"?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará el vino de la base de
            datos <b>permanentemente</b>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setAlertOpen(null)}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="text-white bg-red-700"
            onClick={async () => {
              const wine = data.find((wine) => String(wine.id) === alertOpen);
              if (!wine) return;
              await deleteWine(wine);
              setAlertOpen(null);
            }}
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
