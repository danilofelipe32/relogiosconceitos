
export interface Watch {
  id: number;
  name: string;
  category: WatchCategory;
  imageUrl: string;
  description: string;
  material?: string;
  dimensions?: string;
  movement?: string;
}

export type WatchCategory = "Vanguarda" | "Clássicos Reinventados" | "Estruturais";
export type FilterCategory = "all" | WatchCategory | "favorites";