import TaskItem from "./TaskItem";
import type {Task} from '../types'

type TaskListProps = {
  tasks: Task[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

function TaskList({tasks, onToggle, onDelete}: TaskListProps){
  if (tasks.length === 0) {
  return (
    <p className="py-6 text-center text-sm text-stone-400">
      No tasks yet.
    </p>
  )
}
  return(
    <ul className="flex flex-col">
      {tasks.map((task)=>(
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default TaskList