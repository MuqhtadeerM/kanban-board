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
    <div ref={setNodeRef} style={style} className="card">
      {isEditing ? (
        <input
          className="card-input"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleSave}
          autoFocus
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <p
          className="card-title"
          {...(!isEditing ? listeners : {})}
          {...(!isEditing ? attributes : {})}
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
        >
          {title}
        </p>
      )}

      <div className="card-actions">
        <button
          className="edit-btn"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
        >
          ✏️
        </button>

        <button
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
        >
          🗑
        </button>
      </div>
    </div>
  );
};
