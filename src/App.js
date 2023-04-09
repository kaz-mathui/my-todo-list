import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() === '') {
      return;
    }
    const newTodos = [...todos, { text: inputValue.trim(), isEditing: false }];
    setTodos(newTodos);
    setInputValue('');
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((todo, todoIndex) => todoIndex !== index);
    setTodos(newTodos);
  };

  const handleEditTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isEditing = true;
    setTodos(newTodos);
  };

  const handleEditingInputChange = (event, index) => {
    const newTodos = [...todos];
    newTodos[index].text = event.target.value;
    setTodos(newTodos);
  };

  const handleSaveEditedTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isEditing = false;
    setTodos(newTodos);
  };

  return (
    <div className="container">
      <h1>Todoリスト</h1>
      <div className="add-task-container">
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleAddTodo}>追加</button>
      </div>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.isEditing ? (
              <input
                type="text"
                value={todo.text}
                onChange={(event) => handleEditingInputChange(event, index)}
              />
            ) : (
              todo.text
            )}
            {todo.isEditing ? (
              <button onClick={() => handleSaveEditedTodo(index)}>保存</button>
            ) : (
              <>
                <button onClick={() => handleEditTodo(index)}>編集</button>
                <button onClick={() => handleDeleteTodo(index)}>削除</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
export default App;
