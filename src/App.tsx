import React, { useState } from 'react';

import './App.css';
import InputField from './components/InputField';
import { Todo } from './components/model';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App:React.FC =()=> {
  const [todo,setTodo] = useState<string>("");
  const [todos,setTodos] = useState<Todo[]>([]);
  const [completedTodos,setCompletedTodos] = useState<Todo[]>([]);
  const handleAdd = (e:React.FormEvent)=>{
    e.preventDefault();
    if(todo){
      
      setTodos([...todos, {id:Date.now(),todo:todo,isDone:false}]);
      setTodo('')
    }
  }
  // console.log(todos)
  const onDragEnd = (result:DropResult)=>{
    const {destination,source} = result;
    if(!destination){
      return;
    }
    if(destination.droppableId === source.droppableId && destination.index === source.index){
      return;
    }
    let add,active=todos,complete=completedTodos;
    if(source.droppableId === "TodosList"){
      add = active[source.index];
      active.splice(source.index,1);
      // setTodos(active);
    }else{
      add = complete[source.index];
      complete.splice(source.index,1);
      // setCompletedTodos(complete);
    }
    if(destination.droppableId === "TodosList"){
      active.splice(destination.index,0,add);
      // setTodos(active);
    }else{
      complete.splice(destination.index,0,add);
      // setCompletedTodos(complete);
    }
    setCompletedTodos(complete);
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>

    <div className="App">
      <span className='heading'>
        Todo List
      </span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
    </div>
    </DragDropContext>
  );
}

export default App;
