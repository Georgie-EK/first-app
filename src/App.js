
import React, {useState} from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import { Observable } from 'rxjs';

const charList = []

export const obvervalbe = new Observable(o => {
  console.log("here");
  setTimeout(() =>o.next("hi"),2000)
})


const Item = ({item}) => {

  const [mouseOver,setMouseOver] = useState(false);

  return (
    <div onMouseOver = {() => setMouseOver(true)} onMouseLeave = {() => setMouseOver(false)}>
      <div className="border border-gray-400 m-2 p-2" style={{backgroundColor: item.color}}>
        {item.name}
      </div>
      { mouseOver && (
          <div>X</div>
      )}
    
    </div>
  )


}

function App() {
  const [finalChar, updateChar] = useState(charList);

  const handleDragEnd = (result) => {
    console.log(result)
    const arr = Array.from(finalChar);
    arr.forEach(x=> x.color = "#dddddd")
    const moved =  arr.splice(result.source.index, 1);
    arr.splice(result.destination.index,0,moved[0]);
    updateChar(arr);
  }

  const addOperand = () => {
    const arr = Array.from(finalChar);
    const charecter = {
      id : String(arr.length+1),
      name : "7",
      color : "#dddddd",
      Type: "Operand"
    }
    arr.splice(arr.length,0,charecter);
    updateChar(arr);
  }

  const addOperator = () => {
    const arr = Array.from(finalChar);
    const charecter = {
      id : String(arr.length+1),
      name : "+",
      color : "#dddddd",
      Type: "Operator"
    }
    arr.splice(arr.length,0,charecter);
    updateChar(arr);
  }

  const addCloseBracket = () => {
    const arr = Array.from(finalChar);
    const charecter = {
      id : String(arr.length+1),
      name : ")",
      color : "#dddddd",
      Type: "CloseBracket"
    }
    arr.splice(arr.length,0,charecter);
    updateChar(arr);
  }

  const addOpenBracket = () => {
    const arr = Array.from(finalChar);
    const charecter = {
      id : String(arr.length+1),
      name : "(",
      color : "#dddddd",
      Type: "OpenBracket"
    }
    arr.splice(arr.length,0,charecter);
    updateChar(arr);
  }

  const addComma = () => {
    const arr = Array.from(finalChar);
    const charecter = {
      id : String(arr.length+1),
      name : ",",
      color : "#dddddd",
      Type: "Comma"
    }
    arr.splice(arr.length,0,charecter);
    updateChar(arr);
  }

  const addFunction = () => {
    const arr = Array.from(finalChar);
    const charecter = {
      id : String(arr.length+1),
      name : "Max(",
      color : "#dddddd",
      Type: "Function"
    }
    arr.splice(arr.length,0,charecter);
    updateChar(arr);
  }

  const checkAdjecent = (source,adjecent, isLeft) => {
    switch(source) {
      case "Operand" :
        return (isLeft ? 
          (["Operator", "Function", "OpenBracket","Comma"].includes(adjecent) ? "#ECFCCB" : "#FECACA")
          : (["Operator", "CloseBracket","Comma"].includes(adjecent) ? "#ECFCCB" : "#FECACA"))
      case "Operator" : 
        return (isLeft ? 
          (["Operand","CloseBracket"].includes(adjecent) ? "#ECFCCB" : "#FECACA")
          : (["Operand","OpenBracket","Function"].includes(adjecent) ? "#ECFCCB" : "#FECACA"))
      case "OpenBracket" : 
        return (isLeft ? 
          (["OpenBracket","Function", "Operator","Comma"].includes(adjecent) ? "#ECFCCB" : "#FECACA")          
          : (["Operand","CloseBracket","OpenBracket","Function"].includes(adjecent) ? "#ECFCCB" : "#FECACA"));
      case "CloseBracket" : 
        return (isLeft ? 
        (["Operand","CloseBracket","OpenBracket","Function"].includes(adjecent) ? "#ECFCCB" : "#FECACA")          
        : (["Operator","CloseBracket","Comma"].includes(adjecent) ? "#ECFCCB" : "#FECACA"));
      case "Comma" : 
        return (isLeft ? 
        (["Operand","CloseBracket"].includes(adjecent) ? "#ECFCCB" : "#FECACA")          
        : (["Operand","OpenBracket","Function"].includes(adjecent) ? "#ECFCCB" : "#FECACA"));
      case "Function" : 
        return (isLeft ? 
          (["OpenBracket","Function", "Operator","Comma"].includes(adjecent) ? "#ECFCCB" : "#FECACA")          
          : (["Operand","CloseBracket","OpenBracket","Function"].includes(adjecent) ? "#ECFCCB" : "#FECACA"));
      default :
        return "#dddddd"
    }
  }

  const handleDragUpdate = (result) => {
    const arr = Array.from(finalChar);

    arr.forEach(x=> x.color = "#dddddd")
    let left = -1;
    let right = arr.length;
    if(result.destination.index > result.source.index ){
      left = result.destination.index;
      right = result.destination.index+1;
    } else if((result.destination.index < result.source.index )) {
      right = result.destination.index;
      left = result.destination.index-1;
    } else {
      right = result.destination.index + 1;
      left = result.destination.index -1;
    }

    if(left>=0) {      
      arr[left].color = checkAdjecent(arr[result.source.index].Type, arr[left].Type, true)
    }

    if( right < arr.length) {
      arr[right].color = checkAdjecent(arr[result.source.index].Type, arr[right].Type, false)
    }

    updateChar(arr);
  }

  return (
    <div className="px-52 py-20 text-center m-auto">
      <div>
        <button className="m-2 p-2 border border-gray-500 border-r-2" onClick={addOperand}>
          Add Operand
        </button>
        <button className="m-2 p-2 border border-gray-500 border-r-2 " onClick={addOperator}>
          Add Operator
        </button>
        <button className="m-2 p-2 border border-gray-500 border-r-2" onClick={addCloseBracket}>
          Add Close Bracket
        </button>
        <button className="m-2 p-2 border border-gray-500 border-r-2" onClick={addOpenBracket}>
          Add Open Bracket
        </button>
        <button className="m-2 p-2 border border-gray-500 border-r-2" onClick={addComma}>
          Add Comma
        </button>
        <button className="m-2 p-2 border border-gray-500 border-r-2" onClick={addFunction}>
          Add Function
        </button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd} onDragUpdate={handleDragUpdate}>
        <Droppable droppableId="charecterList" direction='grid'>
        { (provided) => (
          <div className="flex flex-wrap" {...provided.droppableProps} ref={provided.innerRef}>
            {
              finalChar.map((item, index) => {
                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {
                      (provided) => (
                        <div {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                          <Item item={item}/>                            
                        </div>
                        
                      )
                    }
                  </Draggable>
                )
              })
            }
            {provided.placeholder}
          </div>
        )}
        </Droppable>
      </DragDropContext>
   </div>
  )
}

export default App;
