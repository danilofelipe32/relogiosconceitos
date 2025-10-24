
export interface Watch {
  id: number;
  name: string;
  category: WatchCategory;
  imageUrl: string;
  description: string;
}

export type WatchCategory = "Vanguarda" | "Clássicos Reinventados" | "Estruturais";
export type FilterCategory = "all" | WatchCategory | "favorites";
