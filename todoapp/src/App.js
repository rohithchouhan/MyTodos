import React, {useState, useEffect} from 'react';
import './App.css';
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';

function App () {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState ([]);
  const [newTitle, setNewTitle] = useState ('');
  const [currentEdit,setCurrentEdit] = useState("");
  const [currentEditedItem,setCurrentEditedItem] = useState("");


  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push (newTodoItem);
    setTodos (updatedTodoArr);
    localStorage.setItem ('todolist', JSON.stringify (updatedTodoArr));
  };

  const handleDeleteTodo = index => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice (index);

    localStorage.setItem ('todolist', JSON.stringify (reducedTodo));
    setTodos (reducedTodo);
  };

  

  useEffect (() => {
    let savedTodo = JSON.parse (localStorage.getItem ('todolist'));
    
    if (savedTodo) {
      setTodos (savedTodo);
    }

  
    
  }, []);


  const handleEdit = (ind,item)=>{
    console.log(ind);
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  }

  const handleUpdateTitle = (value)=>{
    setCurrentEditedItem((prev)=>{
      return {...prev,title:value}
    })
  }

  

  const handleUpdateToDo = ()=>{
      let newToDo = [...allTodos];
      newToDo[currentEdit] = currentEditedItem;
      setTodos(newToDo);
      setCurrentEdit("");
  }



  return (
    <div className="App">
      <h1>My Todos List</h1>

      <div className="main-container">
        <div className="todo-input">
          <div className="todo-input-item">
            <label></label>
            <input
              type="text"
              value={newTitle}
              onChange={e => setNewTitle (e.target.value)}
              placeholder="What's the task title?"
            />
          </div>
          
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn">
              Add</button>
          </div>
        </div>

        

        <div className="todo-list">

          {isCompleteScreen === false &&
            allTodos.map ((item, index) => {
              if(currentEdit===index){
                 return(
                  <div className='edit__wrapper' key={index}>
                  <input placeholder='Updated Title' 
                  onChange={(e)=>handleUpdateTitle(e.target.value)} 
                  value={currentEditedItem.title}  />
                  
                   <button
              type="button"
              onClick={handleUpdateToDo}
              className="primaryBtn">
              Update</button>
              </div> 
                 ) 
              }else{
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                    </div>
  
                    <div>
                      <AiOutlineDelete
                        className="delete-icon"
                        onClick={() => handleDeleteTodo (index)}
                        title="Delete?"
                      />
                      <AiOutlineEdit  className="edit-icon"
                        onClick={() => handleEdit (index,item)}
                        title="Edit?" />
                    </div>
  
                  </div>
                );
              }
              
            })}

          

        </div>
      </div>
    </div>
  );
}

export default App;