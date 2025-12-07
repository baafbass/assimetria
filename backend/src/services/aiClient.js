const axios = require('axios');

const DEFAULT_TOPICS = [
  'The Future of Artificial Intelligence',
  'Sustainable Living in Modern Cities',
  'The Evolution of Remote Work',
  'Blockchain Technology Beyond Cryptocurrency',
  'The Impact of Social Media on Mental Health',
  'Space Exploration and Colonization',
  'The Rise of Electric Vehicles',
  'Cybersecurity in the Digital Age',
  'The Future of Education',
  'Climate Change Solutions',
  'The Metaverse and Virtual Reality',
  'Renewable Energy Innovations',
  'The Gig Economy and Its Impact',
  'Quantum Computing Explained',
  'The Ethics of Gene Editing'
];

const HF_TOKEN = process.env.HF_API_KEY || '';
const HF_MODEL = process.env.HF_MODEL || 'openai/gpt-oss-20b:groq'; // set to deepseek-ai/DeepSeek-V3.2:novita if desired
const ROUTER_BASE = 'https://router.huggingface.co';
const ROUTER_CHAT_PATH = '/v1/chat/completions';
const ROUTER_CHAT_URL = `${ROUTER_BASE.replace(/\/$/, '')}${ROUTER_CHAT_PATH}`;

if (!HF_TOKEN) {
  console.warn('Warning: HF_API_KEY (or HF_TOKEN) is not set — requests will fail without it.');
}

const axiosInstance = axios.create({
  baseURL: ROUTER_BASE,
  timeout: 120_000,
  headers: {
    Authorization: `Bearer ${HF_TOKEN}`,
    'Content-Type': 'application/json'
  },
  validateStatus: (s) => s >= 200 && s < 300 // let axios throw on non-2xx
});

const getRandomTopic = (topics = DEFAULT_TOPICS) =>
  topics[Math.floor(Math.random() * topics.length)];


async function callRouterChat(messages, opts = {}) {
  const body = {
    model: HF_MODEL,
    messages,
    temperature: opts.temperature ?? 0.7,
    max_tokens: opts.max_tokens ?? 1000,
    top_p: opts.top_p ?? 0.9,
    stream: false
  };

  let res;
  try {
    res = await axiosInstance.post(ROUTER_CHAT_PATH, body);
  } catch (err) {
    // Build helpful error text
    const status = err.response ? `status=${err.response.status}` : `code=${err.code || 'NO_CODE'}`;
    const snippet = err.response && err.response.data ? JSON.stringify(err.response.data).slice(0, 1000) : '';
    const msg = `router request failed (${status}). ${snippet}`;
    const e = new Error(msg);
    e.cause = err;
    throw e;
  }

  if (!res || !res.data) {
    throw new Error('Empty response from router endpoint');
  }

  // expected: { choices: [ { message: { role, content } } ], ... }
  if (!Array.isArray(res.data.choices) || !res.data.choices[0]) {
    throw new Error(`Unexpected router response shape: ${JSON.stringify(res.data).slice(0, 1000)}`);
  }

  const choice = res.data.choices[0];

  // Extract content robustly (strings, arrays, objects)
  let content = '';
  if (choice.message) {
    if (typeof choice.message.content === 'string') {
      content = choice.message.content.trim();
    } else if (Array.isArray(choice.message.content)) {
      content = choice.message.content.map(p => (typeof p === 'string' ? p : (p?.text || ''))).join('').trim();
    } else if (typeof choice.message === 'string') {
      content = choice.message.trim();
    } else if (typeof choice.message.content === 'object' && choice.message.content?.text) {
      content = String(choice.message.content.text).trim();
    }
  }

  if (!content || content.length < 20) {
    throw new Error(`Router returned empty/too-short content: ${JSON.stringify(res.data).slice(0, 2000)}`);
  }

  return content;
}

async function generateArticle({ topic: providedTopic } = {}) {
  const topic = providedTopic || getRandomTopic();

  const userMessage = {
    role: 'user',
    content: `Write a comprehensive blog article about "${topic}". Include an introduction, main points, and conclusion. Make it informative and engaging. Use markdown formatting.`
  };

  try {
    console.log('Calling Hugging Face router chat at', ROUTER_CHAT_URL);
    const content = await callRouterChat([userMessage], { max_tokens: 1000 });
    return { title: topic, content };
  } catch (err) {
    console.log('error',err)
    console.error('generateArticle failed:', err.message || err);
    throw new Error(`generateArticle: failed to generate article for topic="${topic}". ${err.message || ''}`);
  }
}

module.exports = {
  generateArticle
};
