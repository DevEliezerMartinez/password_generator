import React, { useState } from "react";
import { Button, Input, Slider, Checkbox, Card, Typography, notification, Space } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, CopyOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Generator = ({ onGenerate }) => {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [saveToLocalStorage, setSaveToLocalStorage] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState(""); // Estado para almacenar la contraseña generada
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Estado para mostrar/ocultar la contraseña

  const handleGenerate = () => {
    notification.info({ message: "Generando contraseña..." });

    const options = {
      length,
      includeUppercase,
      includeNumbers,
      includeSymbols,
      saveToLocalStorage,
    };

    // Simular la generación de la contraseña
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let chars = lowercaseChars;
    if (includeUppercase) chars += uppercaseChars;
    if (includeNumbers) chars += numberChars;
    if (includeSymbols) chars += symbolChars;

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }

    setGeneratedPassword(password); // Guardar la contraseña generada en el estado
    onGenerate(options); // Llamar a la función onGenerate con las opciones

    // Mostrar notificación de éxito
    notification.success({
      message: "Contraseña generada con éxito",
      description: "La contraseña se ha generado correctamente.",
    });
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(generatedPassword); // Copiar la contraseña al portapapeles
    notification.success({
      message: "Contraseña copiada",
      description: "La contraseña se ha copiado al portapapeles.",
    });
  };

  return (
    <Card title="Generador de Contraseñas" style={{ width: 400 }}>
      <Title level={4}>Longitud: {length}</Title>
      <Slider
        min={6}
        max={32}
        value={length}
        onChange={(value) => setLength(value)}
      />

      <div style={{ margin: "20px 0" }}>
        <Checkbox
          checked={includeUppercase}
          onChange={(e) => setIncludeUppercase(e.target.checked)}
        >
          Incluir mayúsculas
        </Checkbox>
        <br />
        <Checkbox
          checked={includeNumbers}
          onChange={(e) => setIncludeNumbers(e.target.checked)}
        >
          Incluir números
        </Checkbox>
        <br />
        <Checkbox
          checked={includeSymbols}
          onChange={(e) => setIncludeSymbols(e.target.checked)}
        >
          Incluir símbolos
        </Checkbox>
        <br />
        <Checkbox
          checked={saveToLocalStorage}
          onChange={(e) => setSaveToLocalStorage(e.target.checked)}
        >
          Guardar en localStorage
        </Checkbox>
      </div>

      <Button type="primary" onClick={handleGenerate}>
        Generar Contraseña
      </Button>

      {generatedPassword && (
        <div style={{ marginTop: 20 }}>
          <Space>
            <Input
              value={generatedPassword}
              type={isPasswordVisible ? "text" : "password"}
              readOnly
              addonAfter={
                <>
                  <Button
                    icon={isPasswordVisible ? <EyeInvisibleOutlined /> : <EyeTwoTone />}
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                  <Button
                    icon={<CopyOutlined />}
                    onClick={handleCopyPassword}
                  />
                </>
              }
              style={{ width: "100%" }}
            />
          </Space>
        </div>
      )}
    </Card>
  );
};

export default Generator;