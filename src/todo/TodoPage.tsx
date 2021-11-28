import React, { useState } from 'react';
import { TodoModel } from '../models/todo.model';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import style from './TodoPage.module.scss';

let maxId = 5;

const TodoPage = () => {

  const [todos, setTodos] = useState<TodoModel[]>([{
    description: 'asdf',
    completed: true,
    id: 1
  }]);

  const onSaveTodo = (description: string) => {
    //TODO Add Backend
    
    setTodos([
      ...todos,
      {
        description: description,
        completed: true,
        id: maxId
      }
    ]);
    maxId++;
  }

  const onUpdateTodo = (id: number) => {
    const newTodos = [...todos]
    const index = newTodos.findIndex(todo => todo.id === id);
    const todo = newTodos[index];
    todo.completed = !todo.completed;

    //TODO Upate on Backend

    newTodos[index] = todo;
    setTodos(newTodos);
  }

  const onDeleteTodo = (id: number) => {
    //TODO Remove Backend

    let newTodos = [...todos]
    setTodos(newTodos.filter((todo) => todo.id !== id));
  }

  return (
    <>
      <div className={style.header}>
        <h2>My To Do List</h2>
        <TodoForm onSaveTodo={onSaveTodo} />
      </div>  
      <TodoList todos={todos} onDeleteTodo={onDeleteTodo} onUpdateTodo={onUpdateTodo} />
    </>
  );
}

export default TodoPage;
