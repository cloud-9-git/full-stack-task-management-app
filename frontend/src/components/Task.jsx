import { useEffect, useState } from 'react'
import { Check, Pencil, Trash, Save } from 'lucide-react'
import { ENDPOINTS, instance } from './api'
import { toast } from 'react-toastify'

const Task = () => {
    const [tasks, setTasks]=useState([])
    const [editable, setEditable] = useState(null)
    const [inputTask, setInputTask] = useState("")
    const [inputDescription, setInputDescription] = useState("")

    const toTaskPayload = (task) => ({
        title: task.title,
        description: task.description?.trim() || null,
        completed: task.completed,
    })

    const editTask=(e, id)=>{
        setTasks(items => items.map(item=>item.id === id ? {...item, title:e.target.value}: item))
    }

    const editDescription=(e, id)=>{
        setTasks(items => items.map(item=>item.id === id ? {...item, description:e.target.value}: item))
    }

    const saveTask=async(id)=>{
        const task = tasks.find(t => t.id === id)
        if (!task) return
        try {
            await instance.put(ENDPOINTS.UPDATE_TASK(id), toTaskPayload(task))
            toast.success("Task updated successfully")
            getAllTasks()
            setEditable(null)
        } catch (err) {
            console.error(err)
        }
    }

    const completeTask=async(id)=>{
        const task = tasks.find(t => t.id === id)
        if (!task) return
        const updatedTask = { ...task, completed: !task.completed }
        try {
            await instance.put(ENDPOINTS.UPDATE_TASK(id), toTaskPayload(updatedTask))
            toast.success("Task updated successfully")
            getAllTasks()
        } catch (err) {
            console.error(err)
        }
    }

    const addTask=async()=>{
        const trimmedTask = inputTask.trim()
        if (!trimmedTask) {
            toast.error("Task title cannot be empty")
            return
        }
        try {
            await instance.post(ENDPOINTS.CREATE_TASK(), {
                title: trimmedTask,
                description: inputDescription.trim() || null,
                completed: false,
            })
            toast.success("Task created successfully")
            getAllTasks()
            setInputTask("")
            setInputDescription("")
        } catch (err) {
            console.error(err)
        }
    }

    const getAllTasks=async()=>{
        try {
            const res = await instance.get(ENDPOINTS.GET_TASK())
            setTasks(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    const deleteTask=async(id)=>{
        try {
            await instance.delete(ENDPOINTS.DELETE_TASK(id))
            toast.success("Task deleted successfully")
            getAllTasks()
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(()=>{
        getAllTasks()
    },[])
    
    return (
        <>
            <div className='container'>
                <div className='input-box'>
                    <div className='task-input-fields'>
                        <input
                            type="text"
                            value={inputTask}
                            onChange={(e)=>setInputTask(e.target.value)}
                            placeholder='Title'
                        />
                        <textarea
                            value={inputDescription}
                            onChange={(e)=>setInputDescription(e.target.value)}
                            placeholder='Description'
                        />
                    </div>
                    <button type="button" className='add' onClick={addTask}>Add</button>
                </div>
                <div className='task-container'>
                    {
                        tasks.map((item)=> {
                            return (
                                <div key={item.id} className='task-items' style={{backgroundColor: item.completed ? "#98FF98" : "white"}}>
                                    <div className='task-title'>
                                        <div className='task-field'>
                                            <label className='title'>Title : </label>
                                            <input
                                                type="text"
                                                value={item.title}
                                                disabled={editable !== item.id}
                                                onChange={(e)=>editTask(e, item.id)}
                                            />
                                        </div>
                                        <Check size={20} onClick={()=>completeTask(item.id)}/>
                                    </div>
                                    <div className='task-description'>
                                        <label>Description : </label>
                                        {editable === item.id ? (
                                            <textarea
                                                value={item.description ?? ""}
                                                onChange={(e)=>editDescription(e, item.id)}
                                                placeholder='Description'
                                            />
                                        ) : (
                                            <p>{item.description || "No description"}</p>
                                        )}
                                    </div>
                                    <div className='icon-group'>
                                        {(editable !== item.id) ? <Pencil size={20} onClick={()=>setEditable(item.id)}/>
                                        : <Save size={20} onClick={()=>saveTask(item.id)}/>}
                                        <Trash size={20} onClick={()=>deleteTask(item.id)}/>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Task
