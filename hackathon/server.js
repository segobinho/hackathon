const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Sua chave de API (mantenha segura no back-end)
const apiKey = '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';

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo ',
        messages: [{ role: 'user', content: userMessage }],
        max_tokens: 150,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      res.json(data.choices[0].message.content);
    } else {
      res.status(response.status).json({ error: data });
    }
  } catch (error) {
    console.error('Erro ao chamar a API:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
