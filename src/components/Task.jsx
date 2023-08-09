import React, { useState } from 'react'
import trash from '../assets/trash-2.svg'
import edit from '../assets/edit-btn.svg'
import './Task.css'
import classNames from 'classnames'
import { useTaskStore } from '../zustand/TaskStore'
function Task({ task }) {
  // const task = useTaskStore((store) => store.tasks.find((task) => task.title === title))

  const deleteTask = useTaskStore((store) => store.deleteTask)
  const editTask = useTaskStore((store) => store.editTask)
  const openEditTask = useTaskStore((store) => store.openEditTask)
  const [textEdit, setTextEdit] = useState(task.title)
  const setDraggedTask = useTaskStore((store) => store.setDraggedTask)

  const handleDelete = () => {
    deleteTask(task.title)
  }
  const handleEdit = () => {
    openEditTask(task.id)
    setShow((prevShow) => !prevShow)
    onOption()
  }

  const saveEdit = () => {
    editTask(textEdit, task.id)
    openEditTask(task.id)
    setShow((prevShow) => !prevShow)
  }
  const onEdit = (event) => {
    setTextEdit(event.target.value)
  }

  // const [option, setOption] = useState(task.isEditing ? 'disabled' : '')
  // const onOption = () => {
  //   setOption(task.isEditing ? 'disabled' : '')
  // }

  return (
    <div
      className='task'
      draggable
      onDragStart={(e) => {
        // console.log(e)
        setDraggedTask(task)
      }}
    >
      <div>
        <input type='text' value={textEdit} onChange={onEdit} readOnly={!task.isEditing} className={!task.isEditing?'disabled':''}/>
        {task.isEditing && <button onClick={saveEdit}>Save</button>}
      </div>
      <div className='bottomWrapper'>
        <div>
          <img src={trash} alt='' onClick={handleDelete} className='' />
          <img src={edit} onClick={handleEdit} />
        </div>
        <div className={classNames('status', task.state)}>{task.state}</div>
      </div>
    </div>
  )
}

export default Task
