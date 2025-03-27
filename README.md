# Telegram 频道自动评论 Bot

这是一个使用 Cloudflare Workers 部署的 Telegram Bot，用于在频道发布新消息时自动在评论区发送指定文本。

## 功能

- 监听频道新消息
- 自动在新消息下发送评论

## 配置步骤

1. 在 Telegram 中创建一个 Bot，从 @BotFather 获取 Bot Token
2. 将 Bot 添加到你的频道，并设置为管理员
3. 获取频道 ID
4. 在 `wrangler.toml` 中配置以下变量：
   - `BOT_TOKEN`: 你的 Bot Token
   - `CHANNEL_ID`: 你的频道 ID
   - `COMMENT_TEXT`: 要发送的评论文本

## 部署

1. 安装 Wrangler CLI：
   ```bash
   npm install -g wrangler
   ```

2. 登录到你的 Cloudflare 账户：
   ```bash
   wrangler login
   ```

3. 部署 Worker：
   ```bash
   wrangler deploy
   ```

4. 获取 Worker 的 URL，格式如：
   ```
   https://<worker-name>.<your-subdomain>.workers.dev
   ```

5. 设置 Telegram Webhook：
   ```
   https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=<WORKER_URL>
   ```

## 注意事项

- 确保 Bot 有在频道发送消息的权限
- 保护好你的 Bot Token，不要泄露
- Worker URL 必须是 HTTPS
