import { produce } from 'immer'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
const taskStore = (set, get) => ({
  tasks: [
    { id: 0, title: 'Task 1', state: 'PLANNED', isEditing: false },
    { id: 1, title: 'Task 2', state: 'ONGOING', isEditing: false },
    { id: 2, title: 'Task 3', state: 'DONE', isEditing: false }
  ],
  draggedTask: null,
  filter: '',
  addTask: (title, state) =>
    set(
      produce((store) => {
        let nextId = store.tasks.length
        store.tasks.push({ id: nextId++, title, state, isEditing: false })
      }),
      false,
      'addTask'
    ),
  deleteTask: (title) =>
    set((store) => ({ tasks: store.tasks.filter((task) => task.title !== title) }), false, 'deleteTask'),
  editTask: (newTitle, id) =>
    set(
      (store) => ({
        tasks: store.tasks.map((task) =>
          task.id === id
            ? {
                ...task,
                title: newTitle
              }
            : task
        )
      }),
      false,
      'editTask'
    ),
  openEditTask: (id) =>
    set(
      (store) => ({
        tasks: store.tasks.map((task) =>
          task.id === id
            ? {
                ...task,
                isEditing: !task.isEditing
              }
            : task
        )
      }),
      false,
      'openEditTask'
    ),
  setDraggedTask:(task) => set({ draggedTask: task }),
  moveTask: (newTask, state) =>
    set(
      (store) => ({ tasks: store.tasks.map((task) => (task.id === newTask.id ? { ...newTask, state } : task)) }),
      false,
      'moveTask'
    ),
  countTasks: (state) => {
    const counts = get().tasks.reduce((count, task) => {
      return task.state === state ? count + 1 : count
    }, 0)
    return counts
  },
  totalTask: () => {
    const count = get().tasks.length
    return count
  },
  setFilter: (filter) => set({ filter }),
  filteredTasks: () => {
    const filter = get().filter.toLowerCase()
    return get().tasks.filter((task) => task.title.toLowerCase().includes(filter))
  },
  setSort: (sort) => set({ sort }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortDirection: (sortDirection) => set({ sortDirection }),
  setSortByState: (sortByState) => set({ sortByState }),
  setSortByTitle: (sortByTitle) => set({ sortByTitle }),
  setSortByDate: (sortByDate) => set({ sortByDate })
})

export const useTaskStore = create(devtools(taskStore), { name: 'Task Store' })
