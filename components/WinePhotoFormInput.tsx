"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { TrashIcon } from "lucide-react";
import { Wine } from "@/utils/supabase/parsedTypes";
import { cn } from "@/utils";

interface WinePhotoFormInputProps {
  wine?: Wine;
}

export const WinePhotoFormInput = ({ wine }: WinePhotoFormInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState<string | null>(
    wine?.photo_url || null
  );
  const [newPhoto, setNewPhoto] = useState<
    string | ArrayBuffer | null | undefined
  >(null);

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setNewPhoto(null);
      setCurrentPhotoUrl(null);
    }
  };

  const size = wine?.photo_size as { width: number; height: number };
  const hasValue = !!newPhoto || !!currentPhotoUrl;
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="p-4 h-52">
        <Image
          src={
            newPhoto
              ? (newPhoto as string)
              : currentPhotoUrl
              ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/wines/${currentPhotoUrl}`
              : "/images/bottle.svg"
          }
          alt="Foto del vino"
          width={size.width || 100}
          height={size.height || 100}
          className="object-contain w-auto h-full"
        />
      </div>

      <div className="flex">
        <Input
          required={!wine?.photo_url}
          id="photo"
          name="photo"
          type="file"
          className={cn("grow", hasValue && "rounded-r-none")}
          ref={inputRef}
          onChange={(e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                setNewPhoto(e.target?.result);
              };
              reader.readAsDataURL(file);
            }

            setCurrentPhotoUrl(null);
          }}
        />

        {hasValue && (
          <Button
            type="button"
            className={cn(hasValue && "rounded-l-none")}
            onClick={clearInput}
          >
            <TrashIcon size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};
