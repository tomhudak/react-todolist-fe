import React from 'react';
import { TodoModel } from '../models/todo.model';
import Todo from './Todo';

export interface TodoListProps {
  todos : TodoModel[];
  onDeleteTodo (id: number): void;
  onUpdateTodo (id: number): void;
}

const TodoList = (props: TodoListProps) => {

  return (
    <ul>
        {props.todos.map((todo) => 
          <Todo 
            key={todo.id} 
            todo={todo} 
            onDeleteTodo={props.onDeleteTodo}
            onUpdateTodo={props.onUpdateTodo}
            /> 
        )}
      </ul>
  );
}

export default TodoList;
