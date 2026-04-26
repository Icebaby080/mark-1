export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5.2",
        input: [
          {
            role: "system",
            content:
              "Ты Джарвейс — операционная система проекта MARK 1. Отвечай на русском, коротко, четко и по делу. Помогай Айсултану управлять CRM, финансами, продажами, задачами, контентом и дисциплиной. Стиль: умный личный ассистент, как Jarvis, но без лишней фантастики."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "OpenAI API error"
      });
    }

    const answer =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      "Джарвейс получил запрос, но ответ не сформировался.";

    return res.status(200).json({ answer });
  } catch (error) {
    return res.status(500).json({
      error: "Ошибка сервера Джарвейса"
    });
  }
}
