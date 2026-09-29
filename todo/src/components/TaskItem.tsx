import type { Task } from "../types";
import Button from "./Button";
import { useState } from "react";

type TaskItemProps = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, newText: string) => void;
};

function TaskItem({ task, onToggle, onDelete, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  function handleSave() {
    if (editText.trim() === "") return;

    onUpdate(task.id, editText.trim());
    setIsEditing(false);
  }

  function handleCancel() {
    setEditText(task.text);
    setIsEditing(false);
  }

  return (
    <li className="flex items-center gap-3 border-b border-gray-100 py-3">
      <input
        className="h-6 w-6 shrink-0 cursor-pointer appearance-none rounded-full border-2 border-gray-300 transition-colors checked:border-rose-400 checked:bg-rose-400"
        type="checkbox"
        checked={task.completed}
        onChange={() => {
          onToggle(task.id);
        }}
      />
      <div className="flex flex-1 items-center gap-2">
        {isEditing ? (
          <input
            value={editText}
            maxLength={20}
            onChange={(event) => setEditText(event.target.value)}
            className="flex-1 rounded-lg border border-gray-200 px-2 py-1 outline-none focus:border-rose-300"
          />
        ) : (
          <span
            className={
              task.completed ? "text-gray-400 line-through" : "text-gray-800"
            }
          >
            {task.text}
          </span>
        )}

        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500">
          {task.category}
        </span>
      </div>

      {isEditing ? (
        <>
          <button
            type="button"
            className="text-sm text-rose-400 hover:text-rose-500"
            onClick={handleSave}
          >
            Save
          </button>

          <button
            type="button"
            className="text-sm text-gray-400 hover:text-gray-600"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            className="text-sm text-gray-400 hover:text-gray-600"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>

          <Button
            text="Delete"
            variant="delete"
            onClick={() => {
              onDelete(task.id);
            }}
          />
        </>
      )}
    </li>
  );
}

export default TaskItem;
