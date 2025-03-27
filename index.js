// Telegram Bot配置
const BOT_TOKEN = ''; // 你的Bot Token
const CHANNEL_ID = ''; // 你的频道ID
const COMMENT_TEXT = ''; // 要发送的评论文本

// 处理incoming webhook请求
async function handleRequest(request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const update = await request.json();
    
    // 检查是否是频道消息
    if (update.channel_post) {
      const messageId = update.channel_post.message_id;
      
      // 发送评论
      await sendComment(messageId);
      
      return new Response('OK', { status: 200 });
    }
    
    return new Response('Not a channel post', { status: 200 });
  } catch (error) {
    return new Response('Error: ' + error.message, { status: 500 });
  }
}

// 发送评论到消息
async function sendComment(messageId) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const data = {
    chat_id: CHANNEL_ID,
    text: COMMENT_TEXT,
    reply_to_message_id: messageId
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Failed to send comment: ${response.statusText}`);
  }

  return await response.json();
}

// 注册Worker处理函数
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
