const axios = require('axios');

class BaleBot {
  /**
   * @param {Object} options
   * @param {string} options.token - Your Bale bot token (without "bot" prefix).
   * @param {string} [options.apiBaseUrl] - Optional base URL for Bale API. Defaults to https://tapi.bale.ai/bot
   */
  constructor({ token, apiBaseUrl }) {
    if (!token) {
      throw new Error('BaleBot: token is required');
    }
    const base = (apiBaseUrl || 'https://tapi.bale.ai/bot').replace(/\/+$/, '');
    this.client = axios.create({
      baseURL: `${base}${token}/`,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  /** Sends a text message to a chat. */
  async sendMessage(chatId, text, extra = {}) {
    const payload = { chat_id: chatId, text, ...extra };
    const response = await this.client.post('sendMessage', payload);
    return response.data;
  }

  /** Fetches incoming updates (messages). */
  async getUpdates(offset, limit) {
    const payload = {};
    if (offset !== undefined) payload.offset = offset;
    if (limit !== undefined) payload.limit = limit;
    const response = await this.client.post('getUpdates', payload);
    return response.data;
  }

  /** Sets a webhook URL. */
  async setWebhook(url) {
    if (!url.startsWith('https://')) {
      throw new Error('setWebhook: URL must start with https://');
    }
    const response = await this.client.post('setWebhook', { url });
    return response.data;
  }

  /** Deletes the existing webhook. */
  async deleteWebhook() {
    const response = await this.client.post('deleteWebhook');
    return response.data;
  }
}

module.exports = { BaleBot };
