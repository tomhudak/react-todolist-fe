import { useCallback } from 'react';
import { TodoModel } from '../models/todo.model';

const baseURL: string = "http://localhost:3010";

const updateTodo = async (id: number, completed: boolean, options: RequestInit) => {
    const url: string = `${baseURL}/todo/${id}`;
    const rawResponse = await fetch(url, {
        ...options,
        method: 'PUT',
        body: JSON.stringify({ completed: completed })
    });
    const data: TodoModel[] = await rawResponse.json();
    return data;
};

export const useUpdateTodo = (id: number, completed: boolean) => {
    const execute = async (options = {}) => {
        try {
          const todos = await updateTodo(id, completed, options);
          return { 
              success: true,
              data: todos as TodoModel[]
            };
        } catch (e) {
            return { 
                success: false,
                data: e as Error
            };
        }
      };
      
      return {
        executeUpdateTodos: useCallback(execute, []), // to avoid infinite calls when inside a `useEffect`
      };
}