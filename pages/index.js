import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [activeModule, setActiveModule] = useState("CRM Лиды");
  const [command, setCommand] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    { from: "jarvis", text: "Джарвейс активирован. Марк 1 готов к работе." }
  ]);

  const [financeRows, setFinanceRows] = useState([]);
  const [incomeSource, setIncomeSource] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeNote, setIncomeNote] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("Реклама");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseNote, setExpenseNote] = useState("");

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

  useEffect(() => {
    loadFinances();
  }, []);

  async function loadFinances() {
    const { data, error } = await supabase
      .from("finances")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Ошибка загрузки финансов:", error.message);
      return;
    }

    setFinanceRows(data || []);
  }

  async function addFinance(type, category, amount, note) {
    if (!amount || Number(amount) <= 0) {
      alert("Введите сумму больше 0");
      return;
    }

    const { error } = await supabase.from("finances").insert([
      {
        type,
        category,
        amount: Number(amount),
        note
      }
    ]);

    if (error) {
      alert("Ошибка сохранения: " + error.message);
      return;
    }

    await loadFinances();

    setIncomeSource("");
    setIncomeAmount("");
    setIncomeNote("");
    setExpenseAmount("");
    setExpenseNote("");
  }

  async function runJarvis(textFromVoice) {
    const text = textFromVoice || command;
    if (!text.trim()) return;

    const userText = text;

    setMessages((prev) => [
      ...prev,
      { from: "user", text: userText },
      { from: "jarvis", text: "Думаю..." }
    ]);

    setCommand("");

    try {
      const response = await fetch("/api/jarvis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText })
      });

      const data = await response.json();

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          from: "jarvis",
          text: data.answer || data.error || "Джарвейс не смог ответить."
        };
        return updated;
      });

      const lowerText = userText.toLowerCase();

      if (lowerText.includes("лид") || lowerText.includes("crm")) {
        setActiveModule("CRM Лиды");
      }

      if (
        lowerText.includes("финанс") ||
        lowerText.includes("деньг") ||
        lowerText.includes("расход")
      ) {
        setActiveModule("Финансы");
      }
    } catch (error) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          from: "jarvis",
          text: "Ошибка подключения к мозгу Джарвейса."
        };
        return updated;
      });
    }
  }

  function startVoice() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Голосовой ввод не поддерживается в этом браузере. Попробуй Google Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "ru-RU";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setCommand(voiceText);
      runJarvis(voiceText);
    };

    recognition.onerror = () => {
      alert("Не получилось распознать голос. Проверь доступ к микрофону.");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }

  const totalIncome = financeRows
    .filter((row) => row.type === "income")
    .reduce((sum, row) => sum + Number(row.amount || 0), 0);

  const totalExpense = financeRows
    .filter((row) => row.type === "expense")
    .reduce((sum, row) => sum + Number(row.amount || 0), 0);

  const balance = totalIncome - totalExpense;

  const financeStats = [
    { title: "Доходы всего", value: `${totalIncome.toLocaleString()} ₸` },
    { title: "Расходы всего", value: `${totalExpense.toLocaleString()} ₸` },
    { title: "Баланс", value: `${balance.toLocaleString()} ₸` },
    { title: "Записей", value: `${financeRows.length}` }
  ];

  return (
    <main style={mainStyle}>
      <h1 style={{ fontSize: "58px", marginBottom: "5px" }}>MARK 1</h1>

      <p style={{ color: "#9ca3af", fontSize: "18px" }}>
        Stark System • Джарвейс управляет системой
      </p>

      <section style={jarvisBox}>
        <h2 style={{ marginTop: 0 }}>🎙 AI Джарвейс</h2>

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
          placeholder="Введите команду или нажмите Говорить..."
          style={wideInputStyle}
        />

        <div style={{ display: "flex", gap: "12px", marginTop: "15px" }}>
          <button onClick={startVoice} style={buttonStyle}>
            {isListening ? "Слушаю..." : "Говорить"}
          </button>

          <button onClick={() => runJarvis()} style={buttonStyle}>
            Выполнить
          </button>
        </div>

        <p style={{ color: "#10b981", marginTop: "15px" }}>
          Статус: {isListening ? "Джарвейс слушает команду" : "AI-мозг активен"}
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
            <input
              value={incomeSource}
              onChange={(e) => setIncomeSource(e.target.value)}
              placeholder="Источник дохода"
              style={inputStyle}
            />
            <input
              value={incomeAmount}
              onChange={(e) => setIncomeAmount(e.target.value)}
              placeholder="Сумма"
              type="number"
              style={inputStyle}
            />
            <input
              value={incomeNote}
              onChange={(e) => setIncomeNote(e.target.value)}
              placeholder="Комментарий"
              style={inputStyle}
            />
            <button
              onClick={() =>
                addFinance("income", incomeSource || "Доход", incomeAmount, incomeNote)
              }
              style={buttonStyle}
            >
              Добавить доход
            </button>
          </div>

          <h3 style={{ marginTop: "30px" }}>Добавить расход</h3>

          <div style={formGrid}>
            <select
              value={expenseCategory}
              onChange={(e) => setExpenseCategory(e.target.value)}
              style={inputStyle}
            >
              {expenseItems.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <input
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              placeholder="Сумма расхода"
              type="number"
              style={inputStyle}
            />
            <input
              value={expenseNote}
              onChange={(e) => setExpenseNote(e.target.value)}
              placeholder="Комментарий"
              style={inputStyle}
            />
            <button
              onClick={() =>
                addFinance("expense", expenseCategory, expenseAmount, expenseNote)
              }
              style={buttonStyle}
            >
              Добавить расход
            </button>
          </div>

          <h3 style={{ marginTop: "30px" }}>История финансов</h3>

          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Тип</th>
                <th style={thStyle}>Категория</th>
                <th style={thStyle}>Сумма</th>
                <th style={thStyle}>Комментарий</th>
              </tr>
            </thead>
            <tbody>
              {financeRows.map((row) => (
                <tr key={row.id}>
                  <td style={tdStyle}>
                    {row.type === "income" ? "Доход" : "Расход"}
                  </td>
                  <td style={tdStyle}>{row.category}</td>
                  <td style={tdStyle}>{Number(row.amount).toLocaleString()} ₸</td>
                  <td style={tdStyle}>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
