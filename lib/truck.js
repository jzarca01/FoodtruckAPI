const jsdom = require('jsdom')
const axios = require('axios')

function formatTags(tagsString) {
	return tagsString
		.toLowerCase()
		.replace(/\s+/g, '')
		.split(',')
}

function isIncludeTag(tagsString, tag) {
	const tagsArray = formatTags(tagsString)
	return tagsArray.includes(tag)
}

function parseItems(body, distance, tag) {
	let items = new Array()
	const $ = window.jQuery

	return new Promise((resolve, reject) => {
		jsdom.env({
			html: body,
			scripts: ['http://code.jquery.com/jquery-1.10.2.min.js'],
			done(err, window) {
				if (err) {
					reject(err)
				}

				const restaurants = $.makeArray($('body').find('li.restaurant'))

				restaurants.forEach(function(item) {
					if (
						parseFloat($(item).attr('data-distance')) <= distance &&
						isIncludeTag($(item).attr('data-tags'), tag)
					) {
						const foodtruck = {
							image: $(item).attr('data-cover'),
							name: $(item).attr('data-name'),
							latitude: parseFloat($(item).attr('data-latitude')),
							longitude: parseFloat($(item).attr('data-longitude')),
							distance: parseInt($(item).attr('data-distance')),
							open: $(item).attr('data-open') === 'open' ? true : false,
							starttime: $(item).attr('data-starttime'),
							endtime: $(item).attr('data-endtime'),
							tags: formatTags($(item).attr('data-tags'))
						}
						items.push(foodtruck)
					}
				})
				resolve(items)
			}
		})
	})
}

async function getFoodtruck({
	day = 'today',
	time = 'lunch',
	address = 'Paris-France',
	tag = null,
	distance = 5000
}) {
	try {
		const uri = tag
			? `http://tttruck.com/find/${day}/${time}/${address}?tag=${tag}`
			: `http://tttruck.com/find/${day}/${time}/${address}`

		const response = await axios({
			method: 'GET',
			url: uri
		})

		const body = response.data
		return await parseItems(body, distance, tag)
	} catch (err) {
		console.log(err)
	}
}

module.exports = {
	getFoodtruck
}
