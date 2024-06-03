import { useEffect } from 'react';
import { useTasks } from '../context/TaskContext';

export default function TasksPage() {
  const { tasks, getTasks } = useTasks();
  // console.log(tasks)

  useEffect(() => {
    getTasks();
    console.log(tasks);
  }, []);

  return (
    <>
      <h1>Tasks</h1>
      {tasks.map(({ title, description, _id }) => (
        <div key={_id}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      ))}
    </>
  );
}
