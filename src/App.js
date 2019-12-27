import React, { useState, useEffect, useMemo, useCallback } from "react";

function App() {
  // useState return 2 parameters
  const [tech, setTech] = useState(["ReactJS", "React Native"]);
  const [newTech, setNewTech] = useState("");

  // useCallback makes the function be created only when needed, because loading a
  // big function is performance hungry
  const handleAdd = useCallback(() => {
    setTech([...tech, newTech]);
    setNewTech("");
  }, [newTech, tech]);

  // If you want it to execute only when the app is loaded, just pass an empty array as the second argument
  useEffect(() => {
    const storageTech = localStorage.getItem("tech");

    if (storageTech) {
      setTech(JSON.parse(storageTech));
    }

    // this function  will be execute when the component "dies" usually used when
    // there's a event listener
    return () => {
      document.removeEventListener();
    };
  }, []);

  // the first parameter is what function is being executed and the second is when
  useEffect(() => {
    localStorage.setItem("tech", JSON.stringify(tech));
  }, [tech]);

  // useMemo only executes when you need to calculate anything based in a depency
  const techSize = useMemo(() => tech.length, [tech]);

  return (
    <>
      <ul>
        {tech.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <strong>Você tem {techSize} tecnologia(s)</strong>
      <input
        value={newTech}
        onChange={e => setNewTech(e.target.value)}
        type="text"
      />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;
