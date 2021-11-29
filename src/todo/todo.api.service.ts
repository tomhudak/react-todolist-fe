import { useCallback } from 'react';
import { ResponseModel } from '../models/response.model';
import { TodoModel } from '../models/todo.model';

const baseURL: string = "http://localhost:3010";

async function executeApiCall<T> (url: string, options: RequestInit) {
    try {
        const rawResponse = await fetch(url, options);
        const data: T = await rawResponse.json();
        return { 
            success: true,
            data: data as T
          };
    } catch (e) {
        return { 
            success: false,
            data: e as Error
        };
    }
};

const executeApiCallWithResponseModel = async (url: string, options: RequestInit) => {
    const response = await executeApiCall<ResponseModel>(url, options);
    const data = response.data as ResponseModel;
    if(!response.success || data.success) {
        return response;
    } else {
        return { 
            success: false,
            data: new Error(data.error)
        };
    }

} 

export const useGetTodos = () => {
    const url: string = `${baseURL}/todo`;

    const execute = async (options = {}) => {
          return await executeApiCall<TodoModel[]>(url, {...options, method: 'GET'});
      };
      
      return {
        executeGetTodos: useCallback(execute, []), // to avoid infinite calls when inside a `useEffect`
      };
}

export const updateTodo = async (id: number, completed: boolean) => {
    const url: string = `${baseURL}/todo/${id}`;
    return await executeApiCallWithResponseModel(url, 
        { 
            method: 'PUT',
            body: JSON.stringify({completed: completed})
        });
};

export const createTodo = async (description: string) => {
    const url: string = `${baseURL}/todo`;
    return await executeApiCallWithResponseModel(url, 
        {
            method: 'POST',
            body: JSON.stringify({description: description})
        });
};

export const deleteTodo = async (id: number) => {
    const url: string = `${baseURL}/todo/${id}`;
    return await executeApiCallWithResponseModel(url, 
        { 
            method: 'DELETE'
        });
};