const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

async function askGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const response = await axios.post(
    url,
    {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return (
    response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "No response generated."
  );
}

exports.firstAid = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "Prompt required",
      });
    }

    const result = await askGemini(`
You are RescueX AI.

User:
${prompt}

Reply with:

Possible Emergency

Immediate First Aid

What NOT To Do

Should Call Ambulance

Severity
`);

    res.json({
      result,
    });
  } catch (err) {
    console.log(err.response?.data || err.message);

    res.status(500).json({
      message: "Gemini API request failed",
    });
  }
};

exports.healthScan = async (req, res) => {
  try {
    const { description } = req.body;

    const result = await askGemini(description);

    res.json({
      result,
    });
  } catch (err) {
    console.log(err.response?.data || err.message);

    res.status(500).json({
      message: "Gemini API request failed",
    });
  }
};