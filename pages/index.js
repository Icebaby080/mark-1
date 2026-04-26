export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #050816, #0b1020)",
      color: "white",
      fontFamily: "Arial, sans-serif",
      padding: "40px"
    }}>
      <h1 style={{ fontSize: "56px", marginBottom: "10px" }}>
        MARK 1
      </h1>

      <p style={{ fontSize: "20px", color: "#9ca3af" }}>
        Джарвейс — операционная система Марк 1
      </p>

      <section style={{
        marginTop: "40px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px"
      }}>
        {[
          "Джарвейс",
          "Пятница",
          "CRM",
          "Финансы",
          "Отчёты",
          "Креативный отдел",
          "Задачи",
          "Настройки"
        ].map((item) => (
          <div key={item} style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "20px",
            padding: "24px",
            fontSize: "22px"
          }}>
            {item}
          </div>
        ))}
      </section>
    </main>
  );
}
