const { BaleBot } = require('./index');

(async () => {
  const bot = new BaleBot({ token: '1886616871:1Xxsj77Nui8279rGF4DJl6Pi6z6dod9oTra5ySrV' });
  try {
    const response = await bot.sendMessage(1886616871, 'Hello from full JS project!');
    console.log('Message sent:', response);
  } catch (error) {
    console.error('Error sending message:', error.response ? error.response.data : error.message);
  }
})();
