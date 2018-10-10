const express = require('express')
const bodyParser = require('body-parser')
const { getFoodtruck } = require('../')

const app = express()
const PORT =  process.env.PORT || 5001

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/foodtruck', async (req, res) => {
	const args = req.query
	const results = await getFoodtruck(args)
	res.json(results)
})

app.listen(PORT, () => {
	console.log('running on port', PORT)
})
