export interface CollectionDTO {
  id?: string;
  collection_name: string;
  collection_id: string;
  total_cromos?: number;
  creator_id: string;
  creator_user: string;
  mode: 'digital' | 'print';
  cards_per_pack?: number;
  periodicity?: number,
  bonus?: number[],
  allow_print?: boolean;
}
