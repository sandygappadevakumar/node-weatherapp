const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define path for express
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath))

// Define routers for HTTP requests
app.get('', (req, res) =>{
    res.render('index', {
        //title:'Weather  Forecast',
        name:'Deva Kumar S'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title:'Weather  Forecast',
        product:'Weather Web Server',
        name:'Deva Kumar S'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title:'Weather  Forecast',
        name:'Deva Kumar S'
    })
})


app.get('/weather', (req, res) =>{

    if(!req.query.address)
    {
        return res.send({error:'Missing address parameter!!!'})
    }
    const address = req.query.address
    geocode(address, (error, {latitude, longitude}={}) =>{
        if(error === undefined)
        {
            forecast({latitude, longitude}, (cberror, {temperature,precipProbability,summary}={}) => {
                if(cberror === undefined)
                {
                    const data = summary + ' It is currently ' + temperature + ' degress out. There is a ' + precipProbability + '% chance of rain.'
                    res.send({forecast: data})
                    console.log('It is currently '+ temperatureHigh +' degree out. There is '+ precipProbability +'% chance of rain.')
                }                    
                else
                {
                    res.send({error: cberror})
                    console.log(cberror)
                }                    
            })
        }
        else
        {
            res.send({error})
            console.log(error)
        }
            
    })
    
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title:'404 Error Response',
        name: 'Deva Kumar S',
        errorMsg:'Help article not found'
    })
})

app.get('*', (req, res) =>{
    res.render('404',{
        title:'404 Error Response',
        name:'Deva Kumar S',
        errorMsg:'Page Not Found'
    })
})

app.listen(3000, ()=>{
    console.log('Server is running @ 3000')
})