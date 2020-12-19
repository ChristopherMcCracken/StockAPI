
var router = require('express').Router();
var puppeteer = require('puppeteer');

router.route('/stock/:tickers').get(async (req, res) => {
    let tickers = req.tickers
    let url = await tickersToUrl(tickers);
    let tickersAndPrices = await getYahooFinanceData(url, tickers);
    res.send(tickersAndPrices);
});

router.param('tickers', (req, res, next, tickers) => {
    req.tickers = tickers.split(',');
    next();
});

async function getYahooFinanceData(url, tickers)
{
  // Open Site
  const broswer = await puppeteer.launch({headless:true})
  const page = await broswer.newPage();
  await page.goto(url);

  // Grab Ticker Prices
  let tickerPrices = [];
  await page.waitFor('#pf-detail-table', {timeout: 10000});
  for (let i = 1; i < tickers.length + 1; i++)
  {
    let tickerPrice = await page.evaluate((i) =>
    {
      return document.querySelector(`#pf-detail-table > div.Ovx\\(a\\).Ovx\\(h\\)--print.Ovy\\(h\\) > table > tbody > tr:nth-child(${i}) > td:nth-child(2) > span`).textContent;
    }, i);
    tickerPrices.push(tickerPrice);
  }

  // Done with browser
  await broswer.close();

  // Format Data to Dictionary
  var tickersAndPrices = {};
  for (let i = 0; i < tickers.length; i++)
  {
    tickersAndPrices[tickers[i]] = tickerPrices[i];
  }
  return tickersAndPrices;
}

async function tickersToUrl (tickers)
{
  let tickerString = "";
  for(let i = 0; i < tickers.length; i++)
  {
    tickerString += tickers[i] + ",";
  }
  let url = `https://finance.yahoo.com/quotes/${tickerString}?.tsrc=fin-srch`;
  return url;
}

module.exports = router;
