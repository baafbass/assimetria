const axios = require('axios');

const HF_API_KEY = process.env.HF_API_KEY || '';
const HF_MODEL = 'mistralai/Mistral-7B-Instruct-v0.2';

const topics = [
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

const getRandomTopic = () => {
  return topics[Math.floor(Math.random() * topics.length)];
}

const generateArticle= async () => {
  
  const topic = getRandomTopic();
  
  try {

    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${HF_MODEL}`,
      {
        inputs: `Write a comprehensive blog article about "${topic}". Include an introduction, main points, and conclusion. Make it informative and engaging. Article:`,
        parameters: {
          max_new_tokens: 800,
          temperature: 0.7,
          top_p: 0.9,
          return_full_text: false
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 60000
      }
    );

    console.log('response',response);

    let content = '';
    if (response.data && response.data[0] && response.data[0].generated_text) {
      content = response.data[0].generated_text.trim();
    }

    // Fallback if API fails or returns empty
    if (!content || content.length < 100) {
      content = generateFallbackArticle(topic);
    }

    return {
      title: topic,
      content: content
    };
  } catch (error) {
    console.error('Error calling AI API:', error.message);
    // Fallback to generated content
    return {
      title: topic,
      content: generateFallbackArticle(topic)
    };
  }
}

const generateFallbackArticle = (topic) => {
  return `# ${topic}

In today's rapidly evolving world, ${topic.toLowerCase()} has become increasingly relevant. This article explores the key aspects and implications of this important subject.

## Introduction

The landscape of ${topic.toLowerCase()} is constantly changing, presenting both opportunities and challenges. Understanding these dynamics is crucial for anyone interested in staying informed about current trends and developments.

## Key Points

The importance of ${topic.toLowerCase()} cannot be overstated. Several factors contribute to its significance:

First, the technological advancements in this field have opened up new possibilities that were previously unimaginable. Innovation continues to drive progress at an unprecedented pace.

Second, the societal impact is profound and far-reaching. As we navigate through these changes, it's essential to consider both the benefits and potential drawbacks.

Third, the future implications suggest that this topic will only grow in importance. Staying informed and adaptable will be key to success.

## Looking Forward

As we move forward, ${topic.toLowerCase()} will undoubtedly continue to evolve. The intersection of technology, society, and innovation creates a dynamic environment full of potential.

## Conclusion

Understanding ${topic.toLowerCase()} is essential in our modern world. By staying informed and engaged with these developments, we can better prepare for the future and make meaningful contributions to the ongoing dialogue.

The journey ahead promises to be exciting, challenging, and full of opportunities for those willing to engage with these important issues.`;
}

module.exports = {
  generateArticle
};