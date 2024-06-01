import React from 'react';
import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TaskContext';

export default function TaskFormPage() {
  const { register, handleSubmit } = useForm();
  const {tasks, createTask} = useTasks()

  const onSubmit = handleSubmit(data => {
    console.log(data);
  });
  return (
    <>
      <h1>Add Task</h1>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='Title'
          {...register('title', { required: true })}
          autoFocus
        />
        <textarea
          rows='3'
          placeholder='Description'
          {...register('description', { required: true })}
        ></textarea>
        <button>Save</button>
      </form>
    </>
  );
}
