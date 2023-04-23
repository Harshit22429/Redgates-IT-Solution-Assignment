const addtodo = (data)=>{
    return{
        type:'ADD_TODO',
        payload:{
            id:new Date().getTime(),
            data:data
        }
    }
}

const deltodo = (id)=>{
    return{
        type:'ADD_DEL',
        payload:id
    }
}

const updatetodo = (itemId,item)=>{
    return{
        type:"ADD_UPDT",
        payload:{itemId,item}
    }
}

export {addtodo,deltodo,updatetodo}