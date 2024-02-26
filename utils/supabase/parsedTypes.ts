import { Database } from "./types";

export type Wine = Database["public"]["Tables"]["wines"]["Row"] & {
  apellation: { name: string };
  country: { name: string };
  region: { name: string };
};

export type WineDB = Database["public"]["Tables"]["wines"]["Row"];
export type TagDB = Database["public"]["Tables"]["tags"]["Row"];
