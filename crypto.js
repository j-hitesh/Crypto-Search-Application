const crypto = document.querySelector("#crypto");

window.addEventListener("load", async () =>{
    const response = await getDataFromAPI("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr");
    console.log(response);
    const bitcoinRate = response.bitcoin.inr; // Access the INR rate for Bitcoin
    getTrendingCoins(bitcoinRate);
});

async function getDataFromAPI(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
}

async function getTrendingCoins(Rate) {
    try {
        const response = await getDataFromAPI("https://api.coingecko.com/api/v3/search/trending");
        console.log(response);
        showTrendingCoins(response.coins , Rate);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function showTrendingCoins(data, Rate){
    data.forEach((coin) => {
        const coins = document.createElement("div");
        coins.classList= 'flex space-x-4 items-center min-w-96';  
         
        const img = document.createElement("img");
        img.classList = ''
        img.src = coin.item.thumb;
    
        const coindiv = document.createElement("div");
    
        const name = document.createElement("h3");
        name.classList.add("coin-name");
        name.innerHTML = coin.item.name + "( " + coin.item.symbol + " )";
    
        const price = document.createElement("p");
        price.classList.add("jfjf");
        price.innerHTML = " ₹"+ getCoinPriceInINR(coin.item.price_btc, Rate);
    
        coindiv.append(name , price);
        coins.append(img ,coindiv);
        crypto.append(coins);
    });
}

function getCoinPriceInINR(price_btc, Rate){
    return Math.round(price_btc * Rate * 10000)/10000;
}
