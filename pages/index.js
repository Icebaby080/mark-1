export default function Home() {
  const cards = [
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
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#030712,#0f172a,#111827)",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "30px"
      }}
    >
      <h1 style={{ fontSize: "58px", marginBottom: "5px" }}>MARK 1</h1>

      <p style={{ color: "#9ca3af", fontSize: "18px" }}>
        Stark System • Джарвейс управляет системой
      </p>

      <section
        style={{
          marginTop: "30px",
          padding: "25px",
          borderRadius: "22px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)"
        }}
      >
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
          <button
            style={{
              padding: "14px 22px",
              borderRadius: "14px",
              border: "none",
              cursor: "pointer"
            }}
          >
            Говорить
          </button>

          <button
            style={{
              padding: "14px 22px",
              borderRadius: "14px",
              border: "none",
              cursor: "pointer"
            }}
          >
            Выполнить
          </button>
        </div>

        <p style={{ color: "#10b981", marginTop: "15px" }}>
          Статус: система активна
        </p>
      </section>

      <h2 style={{ marginTop: "35px" }}>📊 Бизнес Панель</h2>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "18px",
          marginTop: "15px"
        }}
      >
        {cards.map((item) => (
          <div
            key={item}
            style={{
              padding: "24px",
              borderRadius: "18px",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.10)",
              fontSize: "22px"
            }}
          >
            {item}
          </div>
        ))}
      </section>
    </main>
  );
}
