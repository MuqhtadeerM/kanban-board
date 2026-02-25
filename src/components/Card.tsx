import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

type Props = {
  id: string;
  title: string;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newTitle: string) => void;
};

export const Card = ({ id, title, onDelete, onUpdate }: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(id, editTitle);
    }
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="card"
      {...(!isEditing ? listeners : {})}
      {...(!isEditing ? attributes : {})}
    >
      {isEditing ? (
        <>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            autoFocus
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <p>{title}</p>
          <div className="card-actions">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
            >
              ✏️
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
            >
              🗑
            </button>
          </div>
        </>
      )}
    </div>
  );
};
