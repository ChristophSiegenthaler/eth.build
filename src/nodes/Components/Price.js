const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

var func = async() => {
  let data = await CoinGeckoClient.ping();
};

function Price() {
  this.addInput("[symbol]","string")
  this.addOutput("","number")
  this.size[0] = 190
  this.symbol = "ETH"
  this.value = null
  this.debouncer = false
  setInterval(this.loadPrice.bind(this),45000)
}

Price.title = "Price";

Price.prototype.onAdded = async function() {
  this.loadPrice()
}

Price.prototype.loadPrice = async function() {
  try{
    let result = await axios.get(url+this.symbol)
    if(result && result.data){
      for(let i in result.data){
        console.log("PRICE DATA",result.data[i])
        try{
          this.value = result.data[i].quote.USD.price
        }catch(e){console.log(e)}
      }

    }
  }catch(e){
    console.log(e)
  }
}

Price.prototype.onExecute = function() {
  let symbol = this.getInputData(0)
  if(typeof symbol != "undefined" && symbol!=this.symbol){
    this.symbol = symbol
    if(this.debouncer) clearTimeout(this.debouncer)
    this.debouncer = setTimeout(this.loadPrice.bind(this),1000)
  }
  this.setOutputData(0,parseFloat(this.value))
};


export default Price
