import { useState } from 'react';
import { CATEGORIES, CATEGORY_STYLE } from '../types/todo';
import type { Todo, Category } from '../types/todo';
import Button from './common/Button';
import Input from './common/Input';
import Select from './common/Select';
import Badge from './common/Badge';

interface TaskItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, category: Category) => void;
}

export default function TaskItem({ todo, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editCategory, setEditCategory] = useState<Category>(todo.category);

  const handleStartEdit = () => {
    setEditText(todo.text);
    setEditCategory(todo.category);
    setIsEditing(true);
  };

  const handleSave = () => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    onEdit(todo.id, trimmed, editCategory);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="flex items-center gap-2">
        <Select
          value={editCategory}
          onChange={(e) => setEditCategory(e.target.value as Category)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
        <Input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          maxLength={50}
          className="flex-1"
          autoFocus
        />
        <Button onClick={handleSave} disabled={!editText.trim()}>
          저장
        </Button>
        <Button onClick={handleCancel}>취소</Button>
      </li>
    );
  }

  return (
    <li className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="size-4 shrink-0"
      />
      <Badge className={CATEGORY_STYLE[todo.category]}>{todo.category}</Badge>
      <span className={`flex-1 text-left leading-none ${todo.completed ? 'line-through' : ''}`}>
        {todo.text}
      </span>
      <Button onClick={handleStartEdit} variant="ghost">
        수정
      </Button>
      <Button onClick={() => onDelete(todo.id)} variant="danger">
        삭제
      </Button>
    </li>
  );
}