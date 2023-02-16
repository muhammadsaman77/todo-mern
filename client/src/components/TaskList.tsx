import React from "react";
import { useQuery } from "react-query";
import { getTodos } from "api/getTodos";
import TaskCard from "./TaskCard";
const TaskList: React.FC = () => {
  const { isLoading, isError, error, data } = useQuery("todos", getTodos);
  if (isLoading) {
    return <div>isLoading</div>;
  }
  if (isError) {
    return <div>is Error ... {error}</div>;
  }
  return (
    <section className="flex flex-col overflow-x-hidden overflow-y-auto h-taskList rounded">
      {data?.todos.map((todo) => {
        return (
          <TaskCard
            title={todo.title}
            key={todo._id}
            taskId={todo._id}
            status={todo.status}
          />
        );
      })}
    </section>
  );
};
export default TaskList;
