import React, { useState } from "react";
import Header from "components/Header";
import TaskList from "components/TaskList";
import PlusButton from "components/PlusButton";
import Form from "components/Form";
const App: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <main className="container relative bg-darkPurple mx-auto max-w-lg box-border p-4 min-h-screen">
      <Header />
      <TaskList />
      <Form inProp={showForm} onClose={() => setShowForm(false)} />
      <PlusButton onClick={() => setShowForm(!showForm)} />
    </main>
  );
};

export default App;
