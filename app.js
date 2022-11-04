// include express from node_modules and define server related variables
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json')

// setting engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// setting route
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  console.log(req.params.restaurant_id)
  const restaurant = restaurantList.results.find(
    restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  // if cannot find any restaurants return to index page
  if (!req.query.keyword) {
    return res.redirect('/')
  }
  // remove the empty blank (trim())
  const keyword = req.query.keyword.trim().toLowerCase()
  const filterRestaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.includes(keyword)
  })
  res.render('index', { restaurants: filterRestaurants, keyword })
})

// start and listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
