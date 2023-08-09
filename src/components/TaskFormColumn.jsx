import React, { useState } from 'react'
import './TaskFormColumn.css'
import Task from './Task'
import { useTaskStore } from '../zustand/TaskStore'
import classNames from 'classnames'

function TaskFormColumn({ state, keySearch }) {
  const tasks = useTaskStore((store) =>
    store.tasks.filter((task) => task.state === state && task.title.includes(keySearch))
  )

  const [drop, setDrop] = useState(false)
  const setDraggedTask = useTaskStore((store) => store.setDraggedTask)
  const draggedTask = useTaskStore((store) => store.draggedTask)
  const moveTask = useTaskStore((store) => store.moveTask)
  const countTasks = useTaskStore((store) => store.countTasks)
  const indexStatus = {
    PLANNED: 1,
    ONGOING: 2,
    DONE: 3
  }
  console.log('render' + state)
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
          console.log(draggedTask.state)
          console.log(state)
          console.log(indexStatus[draggedTask.state])
          console.log(indexStatus[state])
          if (indexStatus[draggedTask.state] < indexStatus[state]) {moveTask(draggedTask, state)}
          setDraggedTask(null)
        }}
      >
        <div className='titleWrapper'>
          <p> {state}</p>
        </div>
        <div>
          {tasks.map((task) => {
            return <Task key={task.id} task={task} />
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
