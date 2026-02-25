import { Dispatch, SetStateAction, useState } from "react";
import { ColumnType } from "../types/temp";
import { Card } from "./Card";
import { useDroppable } from "@dnd-kit/core";

type Props = {
  column: ColumnType;
  setColumns: Dispatch<SetStateAction<ColumnType[]>>;
};

export const Column = ({ column, setColumns }: Props) => {
  const [newCardTitle, setNewCardTitle] = useState("");
  const [showInput, setShowInput] = useState(false);

  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  // Add card
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

  // Delete card
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

  // update card
  const handleUpdateCard = (cardId: string, newTitle: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === column.id
          ? {
              ...col,
              cards: col.cards.map((card) =>
                card.id === cardId ? { ...card, title: newTitle } : card,
              ),
            }
          : col,
      ),
    );
  };

  return (
    <div ref={setNodeRef} className="column">
      {/* Header */}
      <div className={`column-header ${column.color}`}>
        <span>
          {column.title}
          <span className="count">{column.cards.length}</span>
        </span>
      </div>

      {/* Add Card Section */}
      {showInput ? (
        <div className="add-card-form">
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

      {/* Cards */}
      {column.cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          title={card.title}
          onDelete={handleDeleteCard}
          onUpdate={handleUpdateCard}
        />
      ))}
    </div>
  );
};
