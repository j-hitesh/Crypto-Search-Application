const form =document.querySelector("form");
const input = document.querySelector("form input");
const SearchResults = document.querySelector('#search-result');

form.addEventListener("submit" ,searchCrypto);

async function searchCrypto(e) {
    e.preventDefault();
    if (input.value.length > 0) {
        try {
            const response = await getDataFromAPI('https://api.coingecko.com/api/v3/search?query=' + input.value);
            console.log(response);
            showSearchResults(response.coins); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

function showSearchResults(coins) {
    if (!coins || coins.length === 0) {
        console.log("No coins found.");
        return;
    }

    coins.forEach((coin, index) => {
        const result = document.createElement("div");
        result.classList = 'flex justify-between mt-4 ';

        const leftdiv = document.createElement("div");
        leftdiv.classList = 'flex space-x-2';
        const sno = document.createElement("span");
        sno.innerHTML = index + 1;

        const img = document.createElement("img");
        img.src = coin.thumb;
    
        const name = document.createElement("h3");
        name.classList.add("coin-name");
        name.innerHTML = coin.name + " " + coin.symbol;

        const rightdiv = document.createElement("div");
        const anch = document.createElement("a");
        anch.innerHTML = "More Info";
        anch.href = "details.html?id=" + coin.id;
        
        leftdiv.append(sno, img, name);
        rightdiv.append(anch);
        result.append(leftdiv, rightdiv);
        SearchResults.append(result);
    });
}

async function getDataFromAPI(url) {
    const response = await fetch(url);
    return await response.json();
}
