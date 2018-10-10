# FoodtruckAPI

API Wrapper for tttruck.com API to find foodtrucks

## Usage

```javascript
const { getFoodtruck } = require('foodtttruckapi')

async function init() {
    try {
        const trucks = await getFoodtruck({
            day = 'today',
            time = 'lunch',
            address = 'Paris, France',
            tag,
            distance = 5000
        })
        console.log(trucks)
    }   
    catch(err) {
        console.log(err)
    }
}
```

## Parameters

- day : today | tomorrow | timestamp (no more than 3 days after)
- time : breakfast | lunch | dinner | night
- tag : [africain, americain, asiatique, bagel, bar-a-jus, boulangerie, burger, cafe, chinois, coreen, crepes-galettes, cuisine-du-monde, cuisine-francaise, cuisine-orientale, fruits-de-mer, indien, italien, japonais, kebab, libanais, mediterraneen, mexicain, pates, pizza, rotisserie, sandwiches-salades, sucre, tex-mex, triporteur, vietnamien, wrap]

## Example

```bash
node example/index.js
```

Open browser to http://localhost:5001/foodtruck?day=today&time=lunch&address=5 Avenue Anatole France 75007 Paris, France

If using tags, Open browser to http://localhost:5001/foodtruck?day=today&time=lunch&address=5 Avenue Anatole France 75007 Paris, France&tag=kebab&distance=2000

## Output

```json
{
	"image": "https://tttruck.com/media/cache/square_200/files/609b5ff98eff873443c4e5a74a6d55ce416e3cbf/679bf0dc0d32dbed637dcccd454309e8.jpeg",
	"name": "il grando",
	"latitude": 48.0756902,
	"longitude": 0.1898536,
	"distance": 0,
	"open": "open",
	"starttime": "17:30",
	"endtime": "20:30",
	"tags": ["pizza", "sucré"]
}
```