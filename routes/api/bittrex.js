const axios = require('axios');


module.exports = app => {

  coinList = ['BTC', 'BCH', 'ETH', 'ETC', 'LTC', 'XRP', 'ADA', 'ZEC', 'TRX', 'SC']
  coinsUrl = 'https://bittrex.com/api/v1.1/public/getticker'

  app.get('/api/bittrex/coins-ticker', (req, res) => {
    axios.all(coinList.map(
      coin => axios.get(coinsUrl, {
        params: {
          market: `USD-${coin}`
        }
      })))
      .then(axios.spread((...res) => {
        return res.map((item, key) => {
          item.data.result.coin = coinList[key]
          return item.data.result
      })
    }))
    .then(prices => {
      res.send(prices)
    })
  })
}
