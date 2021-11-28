import React from 'react';
import { TodoModel } from '../models/todo.model';
import style from './Todo.module.scss';

export interface TodoProps {
  todo: TodoModel;
  onDeleteTodo (id: number): void;
  onUpdateTodo (id: number): void;
}

const Todo = (props: TodoProps) => {
  
  const updateHandler = () => {
    props.onUpdateTodo(props.todo.id);
  }

  const deleteHandler = () => {
    props.onDeleteTodo(props.todo.id);
  }

  return (
    <li className={props.todo.completed ? style.checked : ''}>
      <span>{props.todo.description}</span>
      <div className={style.button}>
        <span 
          className={style.update}
          onClick={updateHandler}>
          <svg width="24" height="20" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M24 6.278l-11.16 12.722-6.84-6 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.278zm-22.681 5.232l6.835 6.01-1.314 1.48-6.84-6 1.319-1.49zm9.278.218l5.921-6.728 1.482 1.285-5.921 6.756-1.482-1.313z"/></svg>
        </span>
        <span 
          className={style.delete}
          onClick={deleteHandler}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z"/></svg>
        </span>
      </div>
    </li>
  );
}

export default Todo;
