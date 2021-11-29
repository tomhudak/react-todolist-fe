import { useCallback } from 'react';
import { TodoModel } from '../models/todo.model';

const baseURL: string = "http://localhost:3010";

const createTodo = async (description: string, options: RequestInit) => {
    const url: string = `${baseURL}/todo`;
    const rawResponse = await fetch(url, {
        ...options,
        method: 'POST',
        body: JSON.stringify({ description: description })
    });
    const data: TodoModel[] = await rawResponse.json();
    return data;
};

export const useCreateTodo = (description: string) => {
    const execute = async (options = {}) => {
        try {
          const todos = await createTodo(description, options);
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
        executeCreateTodos: useCallback(execute, []), // to avoid infinite calls when inside a `useEffect`
      };
}