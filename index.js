import 'dotenv/config'
import linebot from 'linebot'
import chinese from './commands/chinese.js'
import japanese from './commands/japanese.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', (event) => {
  if (event.message.type === 'text') {
    if (event.message.text === '中文') {
      event.reply('中文模式，請輸入「名稱 +農場名」')
    } if (event.message.text.startsWith('名稱 ')) {
      chinese(event)
    }
  } if (event.message.type === 'text') {
    if (event.message.text === '日本語') {
      event.reply('日本語モード，ここに「名前 +農園の名前」を入力してください')
    } if (event.message.text.startsWith('名前 ')) {
      japanese(event)
    }
  }
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
