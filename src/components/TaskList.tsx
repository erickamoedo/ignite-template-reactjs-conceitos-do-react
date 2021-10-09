import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}



export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

 
    if (newTaskTitle === "") {
      return;
    } else {
      const data = {
        id: Number(new Date().getTime()),
        title: newTaskTitle,
        isComplete: false
      };

      // aqui eu pego todos os valores e coloco em uma matriz
      setTasks((oldState) => [...oldState, data]);
      setNewTaskTitle('')
    }
  }

  function handleToggleTaskCompletion(id: number) {
    
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    // estou filtrando as tasks
    const mapeandoTask = tasks.map(task => task.id === id ? {
      ...task, // eu pego as tasks
      isComplete: !task.isComplete // e inverto ela (como ela começa em negativa, entao fica true )
    } : task // e se o task.id for diferente do id, entao ele mantem o false mesmo.
    
    );
    
    setTasks(mapeandoTask) // aquui eu passo o novo valor para o estado, se ele está true ou false


  
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks </h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
