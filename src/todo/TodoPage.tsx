import React, { useState, useEffect } from 'react';
import { TodoModel } from '../models/todo.model';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import style from './TodoPage.module.scss';
import { createTodo, updateTodo, useGetTodos, deleteTodo } from './todo.api.service';
import { ResponseModel } from '../models/response.model';

const TodoPage = () => {

  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { executeGetTodos } = useGetTodos();

  useEffect(() => {
    setIsLoading(true);
    executeGetTodos().then((response) => {
      if (response.success) {
        setTodos(response.data as TodoModel[]);
        setIsLoading(false);
      }
      else {
        console.log('Error occurred', response.data as Error);
        setIsLoading(false);
      }
    } );
  }, [executeGetTodos]);

  const onSaveTodo = async (description: string) => {
    const rawResult = await createTodo(description);
    console.log(rawResult);
    const result = rawResult.data as ResponseModel;
    

    if (result) {
      setTodos([
        ...todos,
        {
          description: description,
          completed: false,
          id: result.payload
        }
      ]);
    } else {
      //TODO error toaster
    }    
  }

  const onUpdateTodo = async (id: string) => {
    const newTodos = [...todos]
    const index = newTodos.findIndex(todo => todo.id === id);
    const todo = newTodos[index];
    todo.completed = !todo.completed;

    const result = await updateTodo(id, todo.completed);
    if (result.success) {
      newTodos[index] = todo;
      setTodos(newTodos);
    } else {
          //TODO Error toaster
    } 
  }

  const onDeleteTodo = async (id: string) => {
    const result = await deleteTodo(id);

    if (result.success) {
      let newTodos = [...todos]
      setTodos(newTodos.filter((todo) => todo.id !== id));
    } else {
        //TODO error toaster
    }
  }

  return (
    <>
      <div className={style.header}>
        <h2>My To Do List</h2>
        <TodoForm onSaveTodo={onSaveTodo} />
      </div>  
      {isLoading && (<h2>Loading...</h2>)}
      {!isLoading && (<TodoList todos={todos} onDeleteTodo={onDeleteTodo} onUpdateTodo={onUpdateTodo} />)}
    </>
  );
}

export default TodoPage;
