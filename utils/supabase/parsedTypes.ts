import { Database } from "./types";

export type CountryDB = Database["public"]["Tables"]["countries"]["Row"];
export type ZoneDB = Database["public"]["Tables"]["zones"]["Row"];
export type CellarDB = Database["public"]["Tables"]["cellars"]["Row"];
export type TypeDB = Database["public"]["Tables"]["types"]["Row"];
export type TagDB = Database["public"]["Tables"]["tags"]["Row"];
export type GrapeDB = Database["public"]["Tables"]["grapes"]["Row"];
export type WineGrapeDB = Database["public"]["Tables"]["wines_grapes"]["Row"];
export type WineTagDB = Database["public"]["Tables"]["wines_tags"]["Row"];

export type WineDB = Database["public"]["Tables"]["wines"]["Row"];

export type Wine = WineDB & {
  country: CountryDB;
  zone: ZoneDB;
  cellar: CellarDB;
  type: TypeDB;
};

export type WineWithForeign = Wine & {
  grapes: (WineGrapeDB & {
    grape: GrapeDB;
  })[];
  tags: (WineTagDB & {
    tag: TagDB;
  })[];
};

export enum TAGS {
  NEW = 1,
  BEST_SELLER = 2,
}
