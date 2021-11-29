import { useCallback } from 'react';
import { TodoModel } from '../models/todo.model';

const baseURL: string = "http://localhost:3010";

const getTodos = async (options: RequestInit) => {
    const url: string = `${baseURL}/todo`;
    const rawResponse = await fetch(url, {
        ...options,
        method: 'GET'
    });
    const data: TodoModel[] = await rawResponse.json();
    return data;
};

export const useGetTodos = () => {
    const execute = async (options = {}) => {
        try {
          const todos = await getTodos(options);
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
        executeGetTodos: useCallback(execute, []), // to avoid infinite calls when inside a `useEffect`
      };
}