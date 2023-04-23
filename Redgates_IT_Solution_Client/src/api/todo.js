import { axiosPrivate } from "./axios";

const controller = new AbortController();

export const getAllTodo = async ()=>{
    return await axiosPrivate.get("/todoread", {
        signal: controller.signal
    })
}

export const deleteTodo = async (todoId)=>{
    console.log('from pan',todoId)
    return await axiosPrivate.delete(`/tododelete`,{data:{todoId}},{
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
}

export const updtTodo = async (todoId,newtodo)=>{
    return await axiosPrivate.put(`/todoupdate`, {todoId,newtodo})
}

export const addTodo = async (todo)=>{
    console.log('from add todo fucntion : ',todo)
    return await axiosPrivate.post('/todoadd', {todo})
}