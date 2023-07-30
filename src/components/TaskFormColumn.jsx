import React, { useState } from 'react'
import './TaskFormColumn.css'
import Task from './Task'
import { useTaskStore } from '../zustand/TaskStore'
import classNames from 'classnames'

function TaskFormColumn({ state }) {
  const tasks = useTaskStore((store) => store.tasks.filter((task) => task.state === state))

  const [drop, setDrop] = useState(false)
  const setDraggedTask = useTaskStore((store) => store.setDraggedTask)
  const draggedTask = useTaskStore((store) => store.draggedTask)
  const moveTask = useTaskStore((store) => store.moveTask)
  const countTasks = useTaskStore((store) => store.countTasks)
  return (
    <>
      <div
        className={classNames('column', { drop: drop })}
        onDragOver={(e) => {
          e.preventDefault()
          setDrop(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          setDrop(false)
        }}
        onDrop={(e) => {
          setDrop(false)
          moveTask(draggedTask, state)
          setDraggedTask(null)
        }}
      >
        <div className='titleWrapper'>
          <p> {state}</p>
        </div>
        <div>
          {tasks.map((task) => {
            return <Task key={task.id} title={task.title} />
          })}
        </div>
        <div className='status_count'>
          TOTAL {state} :{countTasks(state)}
        </div>
      </div>
    </>
  )
}

export default TaskFormColumn
