export interface CollectionDTO {
  id?: string;
  collection_name: string;
  size?: number;
  creator_id: string;
  mode: 'digital' | 'print';
  cards_per_pack?: number;
  periodicity?: number,
  bonus?: number[],
  allow_print?: boolean;
}
