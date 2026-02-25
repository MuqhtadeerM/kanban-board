import { useState } from "react";
import { ColumnType } from "../types/kanban";
import { initialData } from "../data/mokdata";
import { Column } from "./Column";

export const KanbanBoard = () => {
  const [columns, setColumns] = useState<ColumnType[]>(initialData);
  return (
    <div className="board">
      {columns.map((col) => (
        <Column key={col.id} column={col} setColumns={setColumns} />
      ))}
    </div>
  );
};
