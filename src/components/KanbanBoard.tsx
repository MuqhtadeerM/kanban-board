import { useState, useEffect } from "react";
import { ColumnType } from "../types/temp";
import { initialData } from "../data/mockdata";
import { Column } from "./Column";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";

export const KanbanBoard = () => {
  const [columns, setColumns] = useState<ColumnType[]>(() => {
    const saved = localStorage.getItem("kanban-data");
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem("kanban-data", JSON.stringify(columns));
  }, [columns]);

  // finds the column
  const findCardColumn = (cardId: string): string | undefined => {
    for (const col of columns) {
      if (col.cards.find((card) => card.id === cardId)) {
        return col.id;
      }
    }
  };
  // handles the drag event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const sourceColumnId = findCardColumn(active.id as string);

    // find target column correctly
    let targetColumnId = columns.find((col) => col.id === over.id)?.id;

    // if dropped on a card → find that card’s column
    if (!targetColumnId) {
      targetColumnId = findCardColumn(over.id as string);
    }

    if (!sourceColumnId || !targetColumnId) return;
    if (sourceColumnId === targetColumnId) return;

    setColumns((prev) => {
      const sourceCol = prev.find((c) => c.id === sourceColumnId)!;
      const movedCard = sourceCol.cards.find((card) => card.id === active.id)!;

      return prev.map((col) => {
        if (col.id === sourceColumnId) {
          return {
            ...col,
            cards: col.cards.filter((card) => card.id !== active.id),
          };
        }

        if (col.id === targetColumnId) {
          return {
            ...col,
            cards: [...col.cards, movedCard],
          };
        }

        return col;
      });
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <div className="board">
        {columns.map((col) => (
          <Column key={col.id} column={col} setColumns={setColumns} />
        ))}
      </div>
    </DndContext>
  );
};
