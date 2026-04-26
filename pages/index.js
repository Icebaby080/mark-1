import { useState } from "react";

export default function Home() {
  const [activeModule, setActiveModule] = useState("dashboard");

  const leads = [
    {
      name: "Клиент 1",
      phone: "+7 777 000 00 00",
      car: "Li L9",
      status: "Новый лид",
      next: "Позвонить"
    },
    {
      name: "Клиент 2",
      phone: "+7 700 000 00 00",
      car: "Depal S07",
      status: "Переговоры",
      next: "Назначить встречу"
    }
  ];

  const modules = [
    "CRM Лиды",
    "Продажи",
    "Финансы",
    "Долги",
    "Отчёты",
    "Задачи",
    "Контент",
    "Команда"
  ];

  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#030712,#0f172a,#111827)",
      color: "white",
      fontFamily: "Arial, sans-serif",
      padding: "30px"
    }}>
      <h1 style={{ fontSize: "58px", marginBottom: "5px" }}>MARK 1</h1>

      <p style={{ color: "#9ca3af", fontSize: "18px" }}>
        Stark System • Джарвейс управляет системой
      </p>

      <section style={{
        marginTop: "30px",
        padding: "25px",
        borderRadius: "22px",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)"
      }}>
        <h2 style={{ marginTop: 0 }}>🎙 Джарвейс</h2>

        <input
          placeholder="Введите команду..."
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "14px",
            border: "none",
            marginTop: "10px",
            fontSize: "16px"
          }}
        />

        <div style={{ display: "flex", gap: "12px", marginTop: "15px" }}>
          <button style={buttonStyle}>Говорить</button>
          <button style={buttonStyle}>Выполнить</button>
        </div>

        <p style={{ color: "#10b981", marginTop: "15px" }}>
          Статус: система активна
        </p>
      </section>

      <h2 style={{ marginTop: "35px" }}>📊 Бизнес Панель</h2>

      <section style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: "18px",
        marginTop: "15px"
      }}>
        {modules.map((item) => (
          <button
            key={item}
            onClick={() => setActiveModule(item)}
            style={{
              padding: "24px",
              borderRadius: "18px",
              background: activeModule === item
                ? "rgba(59,130,246,0.35)"
                : "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.10)",
              fontSize: "22px",
              color: "white",
              textAlign: "left",
              cursor: "pointer"
            }}
          >
            {item}
          </button>
        ))}
      </section>

      {activeModule === "CRM Лиды" && (
        <section style={moduleBox}>
          <h2>CRM Лиды</h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: "12px",
            marginBottom: "20px"
          }}>
            <input placeholder="Имя клиента" style={inputStyle} />
            <input placeholder="Телефон" style={inputStyle} />
            <input placeholder="Машина" style={inputStyle} />
            <select style={inputStyle}>
              <option>Новый лид</option>
              <option>Переговоры</option>
              <option>Визит</option>
              <option>Тест-драйв</option>
              <option>Заявка в банк</option>
              <option>Одобрен</option>
              <option>Отказ банка</option>
              <option>Продано</option>
            </select>
            <button style={buttonStyle}>Добавить лида</button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "rgba(255,255,255,0.04)",
              borderRadius: "16px",
              overflow: "hidden"
            }}>
              <thead>
                <tr>
                  <th style={thStyle}>Имя</th>
                  <th style={thStyle}>Телефон</th>
                  <th style={thStyle}>Авто</th>
                  <th style={thStyle}>Статус</th>
                  <th style={thStyle}>Следующий шаг</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, index) => (
                  <tr key={index}>
                    <td style={tdStyle}>{lead.name}</td>
                    <td style={tdStyle}>{lead.phone}</td>
                    <td style={tdStyle}>{lead.car}</td>
                    <td style={tdStyle}>{lead.status}</td>
                    <td style={tdStyle}>{lead.next}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </main>
  );
}

const buttonStyle = {
  padding: "14px 22px",
  borderRadius: "14px",
  border: "none",
  cursor: "pointer",
  background: "white",
  color: "#111827",
  fontWeight: "bold"
};

const inputStyle = {
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  fontSize: "15px"
};

const moduleBox = {
  marginTop: "30px",
  padding: "25px",
  borderRadius: "22px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)"
};

const thStyle = {
  padding: "14px",
  textAlign: "left",
  color: "#9ca3af",
  borderBottom: "1px solid rgba(255,255,255,0.12)"
};

const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid rgba(255,255,255,0.08)"
};
