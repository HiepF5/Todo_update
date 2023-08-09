import { useState } from 'react'
import './App.css'
import TaskFormColumn from './components/TaskFormColumn'
import Task from './components/Task'
import { useTaskStore } from './zustand/TaskStore'
import ShowTaskFilter from './components/ShowTaskFilter'

function App() {
  const totalTask = useTaskStore((state) => state.totalTask)
  const addTask = useTaskStore((store) => store.addTask)
  const [show, setShow] = useState(false)
  const [text, setText] = useState('')
  const text2= useTaskStore();
  console.log(text2)
  // const setFilter = useTaskStore((store) => store.setFilter)
  // const filteredTasks = useTaskStore((state) => state.filteredTasks)
  // const filter = useTaskStore((state) => state.filter)

  const [keySearch, setKeySearch] = useState('')
  const handleShow = () => {
    setShow(true)
  }
  const handleAddTask = () => {
    addTask(text, 'PLANNED')
    setShow(false)
  }
  const handleChangeText = (event) => {
    setText(event.target.value)
    console.log(setText(event.target.value))
  }
  // const handleFilter = (event) => {
  //   setFilter(event.target.value)
  //   console.log(setFilter(event.target.value))
  // }

  const onFilter = () => {}
  return (
    <div className='App'>
      <h1>App Todo List Drag-and-Drop</h1>
      <div className='container'>
        <input placeholder='Enter...' onChange={(e) => setKeySearch(e.target.value)} value={keySearch} />
        <button onClick={onFilter}>Tìm kiếm</button>
        <TaskFormColumn state='PLANNED' keySearch={keySearch} />
        <TaskFormColumn state='ONGOING' keySearch={keySearch} />
        <TaskFormColumn state='DONE' keySearch={keySearch} />
        <button className='btn-add' onClick={handleShow}>
          Add
        </button>

        <div className='total_count'>Tổng số Task: {totalTask()}</div>
      </div>
      {show && (
        <div className='Modal'>
          <div className='modalContent'>
            <input placeholder='Nhap' onChange={handleChangeText} />
            <button onClick={handleAddTask}>Submit</button>
          </div>
        </div>
      )}
      <div>
        <h2>Kết quả tìm kiếm:</h2>
        {/* {filteredTasks() && (
          <ul>
            {filteredTasks().map((task) => (
              <ShowTaskFilter key={task.id} title={task.title} state={task.state} />
            ))}
          </ul>
        )} */}
      </div>
    </div>
  )
}

export default App
