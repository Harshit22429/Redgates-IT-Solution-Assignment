import { addTodo, deleteTodo, updtTodo } from "../api/todo";

export const initialState ={
    list:[]
}
const updateTask = async()=>{
    return (
        <>
            <div className="row">
        <div className="col">
          <input 
            value=""
          />
        </div>
        <div className="col-auto">
          <button
          >Update</button>
          <button
          >Cancel</button>
        </div>
      </div>
        </>
    )
}
const todoReducers = (state = initialState, action)=>{
    switch(action.type){
        case "ADD_TODO":
            const {id,data}=action.payload;
            addTodo(data)
            return{
                ...state,
                list:[
                    ...state.list,
                    {
                        id,
                        data
                    }
                ]
            };
        case "ADD_DEL":
            const newElem = action.payload
            console.log("from del reducer : ",newElem)
             deleteTodo(newElem)
            return {
                ...state,
                list:[...state.list]
            }

        case "ADD_UPDT":
            const {itemId,item}= action.payload;
            
            console.log(itemId,item)
            updtTodo(itemId,item)
            return{
                ...state,
                list:[...state.list]
            }
        default: return state
    }   
}


export default todoReducers;