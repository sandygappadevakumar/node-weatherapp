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

const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath))

// Define routers for HTTP requests
app.get('', (req, res) =>{
    res.render('index', {
        //title:'Weather  Forecast',
        name:'Sandyagappa'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title:'Weather  Forecast - Help',
        product:'Weather Web Server',
        name:'Sandyagappa'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title:'Weather  Forecast - AboutMe',
        name:'Sandyagappa'
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
                    console.log(data)
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
        name: 'Sandyagappa',
        errorMsg:'Help article not found'
    })
})

app.get('*', (req, res) =>{
    res.render('404',{
        title:'404 Error Response',
        name:'Sandyagappa',
        errorMsg:'Page Not Found'
    })
})

app.listen(port, ()=>{
    console.log('Server is running @ '+port)
})