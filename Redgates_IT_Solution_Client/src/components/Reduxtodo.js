import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { addtodo, deltodo, updatetodo } from "../actions/index";
import '../style/Reduxtodo.css'
import { getAllTodo } from "../api/todo";

const Reduxtodo = () => {
    const dispatch = useDispatch()
    const newtodo = useSelector((state) => state.rootReducer.todoReducers.list)
    const [list, setList] = useState([])
    const [item, setItem] = useState("")
    const [updateData, setUpdateData] = useState('')
    const [load, setLoad] = useState('')
    
    console.log(item)
    const loadTodos = async () => {
        const todos = await getAllTodo();
        
        try {
            let newList = new Array();
            for (let i = 0; i < Object.keys(todos.data).length; i++) {
                const tempkey = Object.keys(todos.data)[i]
                const temObj = { [tempkey]: todos.data[tempkey] }
                newList.push(temObj)
            }
            console.log(newList, typeof (newList))
            setList(newList)

        } catch (error) {
            console.log(error.message)
        }

    }

    useEffect((req,res) => {
        loadTodos()
        console.log('load again .... . .. .. . . . . .')
        const cookie = req
        console.log('from cookie : ', cookie)
    },[load])
    console.log("from use effect ; ", list, typeof (list))

    const cancelUpdate = () => {
        setUpdateData('')
        setItem("")
        setLoad('true')
    }

    return (
        <>
            <div className="main">
                {updateData && updateData ? (
                    <div className="row">
                        <div className="col">
                            <input
                                defaultValue={item}
                                onChange={(e) => setItem(e.target.value)}
                            />
                        </div>
                        <div className="col-auto">
                            <button
                                onClick={() => {
                                    setUpdateData(''); setItem(''); setLoad(item); dispatch(updatetodo(updateData, item))
                                }}
                            >Update</button>
                            <button
                                onClick={cancelUpdate}
                            >Cancel</button>
                        </div>
                    </div>
                ) : (
                    <div className="add">
                        <input type="text" placeholder="enter your todo" id="item" value={item} onChange={(e) => setItem(e.target.value)} />
                        &nbsp; &nbsp;
                        <input type="button" value="Add" id="addbtn" onClick={() => {setItem(""); setLoad(item); dispatch(addtodo(item))}} />
                        <br /> <br />
                    </div>
                )
                }
                <div className="list" >
                    {
                        list.map((elem) => {
                            console.log(Object.keys(elem))
                            return (
                                <div className="latest" key={Object.keys(elem)}>
                                    <h3>{elem[Object.keys(elem)]}</h3><br></br>
                                    <input type="button" value="Edit" id="updtbtn" onClick={() => { setUpdateData(Object.keys(elem)); setItem(elem[Object.keys(elem)]); setLoad(elem)}} />
                                    &nbsp;
                                    <input type="button" value="Delete" id="delbtn" onClick={() =>{setLoad(elem); dispatch(deltodo(Object.keys(elem)))}} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Reduxtodo;