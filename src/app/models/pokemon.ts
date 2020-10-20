export class Pokemon {
  id: string;
  name: string;
  url: string;
  height: string;
  weight: string;
  abilities: [];
  types: [];
  imageUrl?: string;
  isFavorite?: boolean;
  description?: string;
  gender?: string;
  statsData?: number[];
}
