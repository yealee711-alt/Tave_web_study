import type {Task} from '../types'
import Button from './Button'

type TaskItemProps = {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

function TaskItem({task, onToggle, onDelete}: TaskItemProps){
  return(
    <li className="flex items-center gap-3 border-b border-gray-100 py-3">
      <input 
        className="h-6 w-6 shrink-0 cursor-pointer appearance-none rounded-full border-2 border-gray-300 transition-colors checked:border-rose-400 checked:bg-rose-400"
        type="checkbox"
        checked={task.completed}
        onChange={()=>{
          onToggle(task.id)
        }}
      />
      <span
        className={`flex-1 ${
          task.completed
          ? 'text-gray-400 line-through'
          : 'text-gray-800'
          }`}
        >
          {task.text}
      </span>

      <Button 
        text="Delete"
        variant="delete"
        onClick={()=>{
          onDelete(task.id)
        }}/>
    </li>
  )
}

export default TaskItem