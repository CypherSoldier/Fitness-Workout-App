import React, { useState } from 'react';

function Days() {
    const [days, setDays] = useState(['#1']);
  
    const addDay = () => {
      const newDay = `#${days.length + 1}`;
      setDays([...days, newDay]);
    };
  
    const deleteDay = (index) => {
      const updatedDays = [...days];
      updatedDays.splice(index, 1);
      setDays(updatedDays);
    };
  
    /*const saveText = (index, text) => {
      // You can handle saving the text in state or perform other actions here
      console.log(`Saving text "${text}" for ${days[index]}`);
    };*/
  
    return (
      <div className="days">
        {days.map((day, index) => (
          <div key={index} className="day">
            <div id={day}>
              <textarea 
                placeholder={`${day}`}
                /*</div>onChange={(e) => saveText(index, e.target.value)}*/>
              </textarea>
            </div>
            <div className="buttons">
              <button className="btn btn-outline-primary" onClick={() => deleteDay(index)}>Delete</button>
            </div>
          </div>
        ))}
        <button className="btn btn-outline-primary" onClick={addDay} id="add">Add</button>
      </div>
    );
  
    /*return (
      <div className="days">
        {days.map((day, index) => (
          <div key={index} className="day">
            <div id={day}>
              <input
                className="textBox"
                type="text"
                placeholder={`Enter text for ${day}`}
                onChange={(e) => saveText(index, e.target.value)}
              />
              <button onClick={() => deleteDay(index)}>Delete</button>
            </div>
            <div>
              <button onClick={addDay} id="add">
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    );*/
  }

export default Days;