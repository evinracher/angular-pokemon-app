export class Pokemon {
  id: string;
  name: string;
  url: string;
  height: string;
  weight: string;
  abilities: Ability[];
  types: Type[];
  imageUrl?: string;
  isFavorite?: boolean;
  description?: string;
  gender?: string;
  statsData?: number[];
}

export interface Ability {
  ability: {
    name: string;
  };
}

export interface Type {
  type: {
    name: string;
  };
}
