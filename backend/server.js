const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

app.post('/api/generate-plan', async (req, res) => {
  try {
    const { age, sport, injury, notes } = req.body;

    const prompt = `Create a rehabilitation plan for the following patient:
- Age: ${age}
- Sport: ${sport}
- Injury: ${injury}
- Additional Notes: ${notes}

Please provide a structured rehabilitation plan with phases, exercises, and timeline.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      messages: [
        { role: 'user', content: prompt }
      ],
    });

    res.json({ plan: message.content[0].text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});