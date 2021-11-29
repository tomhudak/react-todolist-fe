import { useCallback } from 'react';
import { TodoModel } from '../models/todo.model';

const baseURL: string = "http://localhost:3010";

const deleteTodo = async (id: number, options: RequestInit) => {
    const url: string = `${baseURL}/todo/${id}`;
    const rawResponse = await fetch(url, {
        ...options,
        method: 'DELETE'
    });
    const data: TodoModel[] = await rawResponse.json();
    return data;
};

export const useDeleteTodo = (id: number) => {
    const execute = async (options = {}) => {
        try {
          const todos = await deleteTodo(id, options);
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
        executeDeleteTodo: useCallback(execute, []), // to avoid infinite calls when inside a `useEffect`
      };
}