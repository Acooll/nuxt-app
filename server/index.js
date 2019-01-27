const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const mongoose = require('mongoose')
const dbConfig = require('./db/config')
const session = require('express-session')

const index = require('./api/route/index')
const users = require('./api/route/users')

// const api  = require('./api')
const axios = require('axios')
var bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
mongoose.connect(dbConfig.dbs,{
  useNewUrlParser:true
})

app.use(session({
  secret: 'secret',
  resave:false,
  saveUninitialized:false,
  cookie:{
    maxAge:1000*60*60*2,
  },
}))

app.use('/',index);
app.use('/',users);

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
