const request = require('request')

const forecast = ({latitude, longitude}, callback) => {

    const url = 'https://api.darksky.net/forecast/e75283172d9d402fa39f710ae27ebcb9/'+latitude+','+longitude+'?units=auto'
    const requestData = { url:url, json:true}
    request(requestData, (error, {body})=>{
        if(!error)
        {
            if(body)
            {
                const data = {
                    temperature:body.currently.temperature,
                    precipProbability:body.currently.precipProbability,
                    summary:body.daily.data[0].summary
                }
                callback(undefined, data) 
            }
            else
                callback("Darksky returned with error "+response.code, undefined)
        }
        else
            callback("Unable to fetch the weather data!!!", undefined)
    })
}

module.exports = forecast
