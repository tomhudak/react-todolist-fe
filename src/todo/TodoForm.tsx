import React, { useState, ChangeEvent } from 'react';
import style from './TodoForm.module.scss';

export interface TodoFormProps {
  onSaveTodo(description: string): void;
}

const TodoForm = (props: TodoFormProps) => {
  
  const [description, setDescription] = useState('');
  
  const createHandler = () => {
    props.onSaveTodo(description);
  }

  const descriptonChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }

  return (
    <>
      <input type="text" onChange={descriptonChangeHandler} value={description} placeholder="Add new stuff to do..." />
      <span onClick={createHandler} className={style.addBtn}>Add</span>
    </>
  );
}

export default TodoForm;
