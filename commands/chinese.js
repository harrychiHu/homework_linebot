import axios from 'axios'

export default async (event) => {
  try {
    const { data } = await axios.get('https://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvQualityFarm.aspx')
    const idx = data.findIndex(item => item.FarmNm_CH === event.message.text.slice(3))
    if (idx > -1) {
      event.reply([
        {
          type: 'template',
          altText: 'this is a buttons template',
          template: {
            type: 'buttons',
            thumbnailImageUrl: data[idx].Photo,
            imageAspectRatio: 'square',
            title: data[idx].FarmNm_CH,
            text: data[idx].TEL,
            actions: [
              {
                type: 'uri',
                label: data[idx].FarmNm_CH,
                uri: data[idx].WebURL
              }
            ]
          }
        },
        {
          type: 'location',
          title: data[idx].FarmNm_CH,
          address: data[idx].Address_CH,
          latitude: 35.65910807942215,
          longitude: 139.70372892916203
        }
      ])
    } else {
      event.reply('查無資料')
    }
  } catch (error) {
    event.reply('發生錯誤')
  }
}
