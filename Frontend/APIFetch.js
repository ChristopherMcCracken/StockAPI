
function grabStockData(tickers)
{
  fetch("/Stock/" + tickers)
  .then(response => response.json())
  .then (data => 
  {
    for (var key in data)
    {
      document.getElementById('stockData').innerHTML += key + ': ' + data[key] + '<br>';
    }
  });
}

function grabInput()
{
  let input = document.getElementById("stockInput").value;
  grabStockData(input);
}

var el = document.getElementById("stockInputButton");
if (el.addEventListener)
{
  el.addEventListener("click", grabInput);
}
