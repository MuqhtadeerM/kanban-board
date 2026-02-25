import { Dispatch, SetStateAction, useState } from "react";
import { ColumnType } from "../types/kanban";

type Props = {
  column: ColumnType;
  setColumns: Dispatch<SetStateAction<ColumnType[]>>;
};

export const Column = ({ column, setColumns }: Props) => {
  const [newCardTitle, setNewCardTitle] = useState("");
  const [showInput, setShowInput] = useState(false);

  // handle the coulmn add to card
  const handleAddCard = () => {
    if (!newCardTitle.trim()) return;

    setColumns((prev) =>
      prev.map((col) =>
        col.id === column.id
          ? {
              ...col,
              cards: [
                ...col.cards,
                { id: Date.now().toString(), title: newCardTitle },
              ],
            }
          : col,
      ),
    );

    setNewCardTitle("");
    setShowInput(false);
  };

  // delete from card
  const handleDeleteCard = (cardId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === column.id
          ? {
              ...col,
              cards: col.cards.filter((card) => card.id !== cardId),
            }
          : col,
      ),
    );
  };

  return (
    <div className="column">
      <div className={`column-header ${column.color}`}>
        <span>
          {column.title}
          <span className="count">{column.cards.length}</span>
        </span>
        {showInput ? (
          <div className="dd-card-form">
            <input
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              placeholder="Enter card title"
            />
            <button onClick={handleAddCard}>Add</button>
          </div>
        ) : (
          <button className="add-card" onClick={() => setShowInput(true)}>
            + Add Card
          </button>
        )}
      </div>

      <button className="add-card">+ Add Card</button>

      {column.cards.map((card) => (
        <div key={card.id} className="card">
          <p>{card.title}</p>
          <span className="delete" onClick={() => handleDeleteCard(card.id)}>
            🗑
          </span>
        </div>
      ))}
    </div>
  );
};
