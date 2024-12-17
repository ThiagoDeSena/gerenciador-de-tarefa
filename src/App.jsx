import { useEffect, useState } from "react"
import AddTasks from "./components/AddTasks"
import Tasks from "./components/Taks"


function App(){
  const [tasks,setTasks]=useState( JSON.parse(localStorage.getItem("tasks")) ||[])

  useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks))
  },[tasks])
  
  function onTaskClick(taskId){
    const newTasks = tasks.map(task =>{
      //Preciso atualizar essa tarefa
      if(task.id == taskId){
        return{
          ...task,
          isCompleted: !task.isCompleted
        }
      }

      //Não preciso atualizar essa tarefa
      return task
    })

    setTasks(newTasks)
  }

  //Deletar tarefa
  function deleteTask(taskId){
    const newTasks = tasks.filter(task => task.id != taskId)
    setTasks(newTasks)
  }

  function onAddTaskSubmit(title,description){
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      isCompleted:false
    }

    setTasks([...tasks,newTask])
  }

  return(
   <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
    <div className="w-[500px] space-y-4">
    <h1 className="text-3xl text-slate-100 font-bold text-center">Gerenciador de Tarefas</h1>
    <AddTasks onAddTaskSubmit={onAddTaskSubmit}/>
    <Tasks tasks={tasks} onTaskClick={onTaskClick} deleteTask={deleteTask}/>
    </div>
   </div>
  )
}

export default App

//1:41 https://www.youtube.com/watch?v=2RWsLmu8yVc&t=102s