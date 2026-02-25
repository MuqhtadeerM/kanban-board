export type CardType = {
  id: string;
  title: string;
};

export type ColumnType = {
  id: string;
  title: string;
  color: "blue" | "orange" | "green";
  cards: CardType[];
};
