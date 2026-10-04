import 'dotenv/config';

const BASE_URL = process.env.VITE_API_BASE_URL;

if (!BASE_URL) {
  console.error('.env에 VITE_API_BASE_URL을 설정해주세요.');
  process.exit(1);
}

const URL = `${BASE_URL}/posts`;

const posts = [
  // ... 기존 배열 그대로
];

const run = async () => {
  for (let i = 0; i < posts.length; i++) {
    const [title, content] = posts[i];
    const createdAt = new Date(Date.now() - (posts.length - i) * 86400000).toISOString();

    const res = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, createdAt }),
    });

    console.log(res.status, title);
    await new Promise((r) => setTimeout(r, 300));
  }
};

run();