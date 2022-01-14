
const axios = require('axios');

let resolution_dict = {
  '1 min' : 60, 
  '5 min' : 60 * 5, 
  '15 min' : 60 * 15, 
  '30 min' : 60 * 30, 
  '1 hr' : 60 * 60, 
  '2 hr' : 60 * 60 * 2, 
  '4 hr' : 60 * 60 * 4, 
  '1 day' : 86400
}

const GetKline = async (url) => {
  const data = await axios.get(url)
    .then(res => { return res.data })
    .catch(err => { console.log('Error: ', err.message); })
  return data;
}

const Query = {
  async Candlestick(parent, {asset, startTime, endTime, scale, cookie}, {}, info) {

    let ftx_base_url = 'https://ftx.com/api/markets/' + asset + '/candles?'
    let start_time = startTime, end_time = endTime - 1, resolution = resolution_dict[scale];

    if (resolution === undefined) return null;

    let url = ftx_base_url + 'resolution=' + resolution + '&start_time=' + start_time + '&end_time=' + end_time;

    try {
      const data = await GetKline(url);
      return data['result'].map(item => ({
        startTime: item['time'] / 1000,
        scale: scale,
        open: item['open'],
        high: item['high'],
        low: item['low'],
        close: item['close']
      }))
    } catch {
      return null;
    }

  },
  async GetRecord(parent, {strategyID}, { recordDatabase }, info) {
    console.log("strategyID = " + strategyID);
    if (strategyID === "") 
      return recordDatabase.find();
    const list = recordDatabase.find({strategyID});
    return list;
  },
  async GetStrategy(parent, {id}, { strategyDatabase }, info) {
    console.log("id = " + id);
    if (id === "")
      return strategyDatabase.find({name: {$ne: ""}});
    const result = strategyDatabase.find({id});
    return result;
  },
  async GetUsername(parent, {cookie}, { cookieDatabase }, info) {
    const isExist = await cookieDatabase.findOne({cookie});
    if (!isExist) return null;
    else return isExist['user'];
  }
};

export default Query;
