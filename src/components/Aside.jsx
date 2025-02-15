import React from "react";
import { List, Typography, Empty, Button, message, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { confirm } = Modal;

const Aside = ({ history, onDeleteEntry, onClearHistory }) => {
  const handleDeleteEntry = (index) => {
    onDeleteEntry(index);
    message.success("Entrada eliminada con éxito");
  };

  const handleClearHistory = () => {
    confirm({
      title: "¿Estás seguro de que quieres borrar todo el historial?",
      content: "Esta acción no se puede deshacer.",
      okText: "Sí, borrar todo",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        onClearHistory();
        message.success("Historial borrado con éxito");
      },
    });
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Title level={4}>Historial de Contraseñas</Title>
      <div
        style={{ flex: 1, overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
      >
        {history.length === 0 ? (
          <Empty description="No hay contraseñas generadas" />
        ) : (
          <List
            dataSource={history}
            renderItem={(item, index) => (
              <List.Item
                actions={[
                  <DeleteOutlined
                    type="link"
                    danger
                    twoToneColor="#eb2f96"
                    onClick={() => handleDeleteEntry(index)}
                  />,
                ]}
              >
                <div>
                  <strong>Contraseña:</strong> {item.password}
                  <br />
                  <strong>Longitud:</strong> {item.length}
                  <br />
                  <strong>Mayúsculas:</strong>{" "}
                  {item.includeUppercase ? "Sí" : "No"}
                  <br />
                  <strong>Números:</strong> {item.includeNumbers ? "Sí" : "No"}
                  <br />
                  <strong>Símbolos:</strong> {item.includeSymbols ? "Sí" : "No"}
                  <br />
                  <small>{item.timestamp}</small>
                </div>
              </List.Item>
            )}
          />
        )}
      </div>
      {history.length > 0 && (
        <Button
          type="primary"
          danger
          onClick={handleClearHistory}
          icon={<DeleteOutlined />}
        >
          Limpiar Historial
        </Button>
      )}
    </div>
  );
};

export default Aside;