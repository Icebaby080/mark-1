import { useState } from "react";

export default function Home() {
  const [activeModule, setActiveModule] = useState("CRM Лиды");
  const [command, setCommand] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "jarvis",
      text: "Джарвейс активирован. Марк 1 готов к работе."
    }
  ]);

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

  const financeStats = [
    { title: "Доход сегодня", value: "0 ₸" },
    { title: "Доход месяца", value: "0 ₸" },
    { title: "Расходы месяца", value: "0 ₸" },
    { title: "Реклама", value: "0 ₸" },
    { title: "Зарплаты", value: "0 ₸" },
    { title: "Долги", value: "0 ₸" },
    { title: "Баланс", value: "0 ₸" },
    { title: "Чистая прибыль", value: "0 ₸" }
  ];

  const expenseItems = [
    "Реклама",
    "Аренда",
    "Зарплата",
    "Топливо",
    "Кредиты",
    "Личные расходы",
    "Офис",
    "Прочее"
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

  function runJarvis() {
    if (!command.trim()) return;

    const userText = command;

    let jarvisAnswer =
      "Принял команду. Сейчас я работаю в тестовом режиме. Следующий этап — подключение настоящего AI через API.";

    if (userText.toLowerCase().includes("план")) {
      jarvisAnswer =
        "План на сегодня: 1) обработать новых лидов, 2) проверить финансы, 3) записать расходы, 4) сделать контент, 5) закрыть задачи по продажам.";
    }

    if (userText.toLowerCase().includes("лид")) {
      jarvisAnswer =
        "Открываю CRM. Проверь новых клиентов, статус переговоров и следующий шаг по каждому лиду.";
      setActiveModule("CRM Лиды");
    }

    if (userText.toLowerCase().includes("финанс")) {
      jarvisAnswer =
        "Открываю финансы. Проверь доходы, расходы, баланс и чистую прибыль.";
      setActiveModule("Финансы");
    }

    if (userText.toLowerCase().includes("расход")) {
      jarvisAnswer =
        "Открываю финансы. Добавь расход по категории: реклама, аренда, зарплата, топливо, кредиты или прочее.";
      setActiveModule("Финансы");
    }

    setMessages([
      ...messages,
      { from: "user", text: userText },
      { from: "jarvis", text: jarvisAnswer }
    ]);

    setCommand("");
  }

  return (
    <main style={mainStyle}>
      <h1 style={{ fontSize: "58px", marginBottom: "5px" }}>MARK 1</h1>

      <p style={{ color: "#9ca3af", fontSize: "18px" }}>
        Stark System • Джарвейс управляет системой
      </p>

      <section style={jarvisBox}>
        <h2 style={{ marginTop: 0 }}>🎙 Джарвейс Chat AI</h2>

        <div style={chatBox}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...messageBubble,
                alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                background:
                  msg.from === "user"
                    ? "rgba(59,130,246,0.35)"
                    : "rgba(255,255,255,0.08)"
              }}
            >
              <b>{msg.from === "user" ? "Ты" : "Джарвейс"}:</b> {msg.text}
            </div>
          ))}
        </div>

        <input
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Введите команду для Джарвейса..."
          style={wideInputStyle}
        />

        <div style={{ display: "flex", gap: "12px", marginTop: "15px" }}>
          <button style={buttonStyle}>Говорить</button>
          <button onClick={runJarvis} style={buttonStyle}>
            Выполнить
          </button>
        </div>

        <p style={{ color: "#10b981", marginTop: "15px" }}>
          Статус: Джарвейс активен
        </p>
      </section>

      <h2 style={{ marginTop: "35px" }}>📊 Бизнес Панель</h2>

      <section style={moduleGrid}>
        {modules.map((item) => (
          <button
            key={item}
            onClick={() => setActiveModule(item)}
            style={{
              ...moduleButton,
              background:
                activeModule === item
                  ? "rgba(59,130,246,0.35)"
                  : "rgba(255,255,255,0.07)"
            }}
          >
            {item}
          </button>
        ))}
      </section>

      {activeModule === "CRM Лиды" && (
        <section style={moduleBox}>
          <h2>CRM Лиды</h2>

          <div style={formGrid}>
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

          <table style={tableStyle}>
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
        </section>
      )}

      {activeModule === "Финансы" && (
        <section style={moduleBox}>
          <h2>Финансы</h2>

          <section style={financeGrid}>
            {financeStats.map((item) => (
              <div key={item.title} style={financeCard}>
                <p style={{ color: "#9ca3af", margin: 0 }}>{item.title}</p>
                <h3 style={{ fontSize: "28px", margin: "10px 0 0" }}>
                  {item.value}
                </h3>
              </div>
            ))}
          </section>

          <h3 style={{ marginTop: "30px" }}>Добавить доход</h3>

          <div style={formGrid}>
            <input placeholder="Источник дохода" style={inputStyle} />
            <input placeholder="Сумма" style={inputStyle} />
            <input placeholder="Комментарий" style={inputStyle} />
            <button style={buttonStyle}>Добавить доход</button>
          </div>

          <h3 style={{ marginTop: "30px" }}>Добавить расход</h3>

          <div style={formGrid}>
            <select style={inputStyle}>
              {expenseItems.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <input placeholder="Сумма расхода" style={inputStyle} />
            <input placeholder="Комментарий" style={inputStyle} />
            <button style={buttonStyle}>Добавить расход</button>
          </div>

          <h3 style={{ marginTop: "30px" }}>Статьи расходов</h3>

          <section style={expenseGrid}>
            {expenseItems.map((item) => (
              <div key={item} style={expenseCard}>
                {item}
              </div>
            ))}
          </section>
        </section>
      )}
    </main>
  );
}

const mainStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#030712,#0f172a,#111827)",
  color: "white",
  fontFamily: "Arial, sans-serif",
  padding: "30px"
};

const jarvisBox = {
  marginTop: "30px",
  padding: "25px",
  borderRadius: "22px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)"
};

const chatBox = {
  minHeight: "160px",
  maxHeight: "260px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "15px",
  borderRadius: "16px",
  background: "rgba(0,0,0,0.25)",
  marginBottom: "15px"
};

const messageBubble = {
  padding: "12px 14px",
  borderRadius: "14px",
  maxWidth: "80%",
  lineHeight: "1.5"
};

const moduleGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "18px",
  marginTop: "15px"
};

const moduleButton = {
  padding: "24px",
  borderRadius: "18px",
  border: "1px solid rgba(255,255,255,0.10)",
  fontSize: "22px",
  color: "white",
  textAlign: "left",
  cursor: "pointer"
};

const moduleBox = {
  marginTop: "30px",
  padding: "25px",
  borderRadius: "22px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)"
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
  gap: "12px",
  marginBottom: "20px"
};

const financeGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))",
  gap: "16px"
};

const financeCard = {
  padding: "22px",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.10)"
};

const expenseGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))",
  gap: "14px"
};

const expenseCard = {
  padding: "18px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.10)"
};

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

const wideInputStyle = {
  width: "100%",
  padding: "16px",
  borderRadius: "14px",
  border: "none",
  marginTop: "10px",
  fontSize: "16px"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  background: "rgba(255,255,255,0.04)",
  borderRadius: "16px",
  overflow: "hidden"
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
