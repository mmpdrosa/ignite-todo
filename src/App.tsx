import { v4 as uuidv4 } from 'uuid';
import { PlusCircle } from 'phosphor-react';

import { Header } from './components/Header';
import { Task } from './components/Task';

import clipboard from './assets/clipboard.svg'

import styles from './App.module.css';

import './global.css';
import { ChangeEvent, useState } from 'react';

interface Task {
  id: string;
  title: string,
  isChecked: boolean,
}

const tasksSample = [
  {
    id: uuidv4(),
    title: 'Task 1',
    isChecked: false,
  },
  { 
    id: uuidv4(), 
    title: 'Task 2', 
    isChecked: true,
  }, 
]

export function App() {
  const [tasks, setTasks] = useState(tasksSample);

  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    event?.preventDefault();

    const newTask = {
      id: uuidv4(),
      title: newTaskTitle,
      isChecked: false,
    }

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  }

  function handleNewTasktTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskTitle(event?.target.value);
  }

  function deleteTask(id: string) {
    const taksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== id;
    })

    setTasks(taksWithoutDeletedOne);
  }

  function updateTask(id: string, check: boolean) {
    const tasksWithoutUpdatedOne = tasks.filter(task => task.id !== id);

    const task = tasks.find(task => task.id === id);

    if (task) {
      const updatedTask = {
        id,
        title: task.title,
        isChecked: check
      }

      const updatedTasks = [updatedTask, ...tasksWithoutUpdatedOne];

      const sortTasks = updatedTasks.sort((a, b) => Number(a.isChecked) - Number(b.isChecked));

      setTasks(sortTasks);
    }
  }

  const checkedTasks = tasks.filter(task => task.isChecked).length;

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <form onSubmit={handleCreateNewTask} className={styles.newTaskBox}>
          <input 
            placeholder="Adicione uma nova tarefa" 
            value={newTaskTitle}
            onChange={handleNewTasktTitleChange}
          />

          <button type="submit">
            Criar
            <PlusCircle />
          </button>
        </form>

        <main>
          <div className={styles.tasksInfo}>
            <div className={styles.createdTasks}>
              <span>Tarefas Criadas</span>
              <div>{tasks.length}</div>
            </div>

            <div className={styles.doneTasks}>
              <span>Concluídas</span>
              <div>{`${checkedTasks} de ${tasks.length}`}</div>
            </div>
          </div>

          <div className={styles.tasks}>
            {tasks.length > 0 && tasks.map(task => {
              return (
                <Task 
                  key={task.id} 
                  id={task.id}
                  title={task.title}
                  isChecked={task.isChecked}
                  onDeleteTask={deleteTask}
                  onChangeTask={updateTask}
                />
              )
            })}

            {tasks.length === 0 && (
              <div className={styles.tasksEmpty}>
                <img src={clipboard} />
                <p>Você ainda não tem tarefas cadastradas</p>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  )
}
