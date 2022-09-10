import { Trash } from 'phosphor-react';
import { ChangeEvent, useState } from 'react';

import styles from './Task.module.css';

interface TaskProps {
  id: string;
  title: string,
  isChecked: boolean,
  onDeleteTask: (id: string) => void;
  onChangeTask: (id: string, checked: boolean) => void;
}

export function Task({ id, title, isChecked, onDeleteTask, onChangeTask }: TaskProps) {

  const [isSubscribed, setIsSubscribed] = useState(isChecked);

  function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
    setIsSubscribed(event.target.checked);
    onChangeTask(id, event.target.checked);
  }

  function handleDeleteTask() {
    onDeleteTask(id);
  }

  return (
    <div className={styles.task}>
      <label className={styles.checkboxContainer}>
        <input 
          type="checkbox" 
          checked={isSubscribed}
          onChange={handleCheckboxChange}
        />

        <span className={styles.checkmark}></span>
      </label>

      <p className={isSubscribed ? styles.taskTitleChecked: styles.taskTitle}>{title}</p>

      <button title="Deletar Task" onClick={handleDeleteTask}>
        <Trash />
      </button>
    </div>
  );
}