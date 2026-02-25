import { ColumnType } from "../types/kanban";

export const initialData: ColumnType[] = [
  {
    id: "todo",
    title: "Todo",
    color: "blue",
    cards: [
      { id: "1", title: "Create initial project plan" },
      { id: "2", title: "Design landing page" },
      { id: "3", title: "Review codebase structure" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "orange",
    cards: [
      { id: "4", title: "Implement authentication" },
      { id: "5", title: "Set up database schema" },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "green",
    cards: [{ id: "6", title: "Write API documentation" }],
  },
];
