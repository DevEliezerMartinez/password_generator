import React, { useState, useEffect } from "react";
import { Layout, Button } from "antd";
import Aside from "./components/Aside";
import Generator from "./components/Generator";

const { Content, Sider } = Layout;

const App = () => {
  const [history, setHistory] = useState([]);

  // Cargar el historial desde localStorage al iniciar
  useEffect(() => {
    const savedHistory = localStorage.getItem("passwordHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Guardar el historial en localStorage si la opción está habilitada
  const generatePassword = (options) => {
    const { length, includeUppercase, includeNumbers, includeSymbols, saveToLocalStorage } = options;

    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let chars = lowercaseChars;
    if (includeUppercase) chars += uppercaseChars;
    if (includeNumbers) chars += numberChars;
    if (includeSymbols) chars += symbolChars;

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[randomIndex];
    }

    // Crear la nueva entrada
    const newEntry = {
      password: generatedPassword,
      length,
      includeUppercase,
      includeNumbers,
      includeSymbols,
      timestamp: new Date().toLocaleTimeString(),
    };

    // Actualizar el historial
    setHistory((prevHistory) => [newEntry, ...prevHistory]);

    // Guardar en localStorage si la opción está habilitada
    if (saveToLocalStorage) {
      const updatedHistory = [newEntry, ...history];
      localStorage.setItem("passwordHistory", JSON.stringify(updatedHistory));
    }
  };

  // Eliminar un registro específico
  const deleteEntry = (index) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
    localStorage.setItem("passwordHistory", JSON.stringify(updatedHistory));
  };

  // Limpiar todo el historial
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("passwordHistory");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={400} style={{ background: "#f0f2f5", padding: "20px", height: "100vh", overflow: "hidden" }}>
        <Aside history={history} onDeleteEntry={deleteEntry} onClearHistory={clearHistory} />
      </Sider>
      <Content style={{ padding: "50px" }}>
        <Generator onGenerate={generatePassword} />
      </Content>

    </Layout>
  );
};

export default App;