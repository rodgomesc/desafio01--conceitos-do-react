import { useState, useEffect } from 'react'


import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [taskError, setTaskError] = useState('')


  useEffect(() => {
    if (!newTaskTitle.length) {
      return setTaskError("task title can't be empty!")
    } else {
      setTaskError('')
    }
  },[newTaskTitle])

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    !taskError.length && setTasks([
      ...tasks,
       {
        id: Number(Number(Math.random() * 1e11).toFixed(0)),
        title: newTaskTitle,
        isComplete: false
       }
    ]);
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const changedTasks = tasks.map(task => {
      return task.id === id ?  { ...task, isComplete: !task.isComplete } : task
    })

    setTasks(changedTasks)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const changedTasks = tasks.filter(task => task.id !== id);
    setTasks(changedTasks)
    
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>
        {!!taskError.length && (
           <strong style={{color: 'red'}}>{taskError}</strong>
          )}
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>         
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}
