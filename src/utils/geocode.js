const request = require('request')

const geocode = (address, callback) =>
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2RldmFrdW1hciIsImEiOiJjazdscGI4dXQwOW4wM2VtdHN3cmhqbDVqIn0.LqWHRq1nV0yVf4ZLQXYuVw'
    const requestData = { url:url, json:true}
    request(requestData, (error, {body})=>{
        if(!error)
        {
            if(body.features.length !== 0)
            {
                const latitude = body.features[0].center[1]
                const longitude = body.features[0].center[0]                
                const data = {
                    latitude,
                    longitude
                }
                callback(undefined,data)           
            }
            else
                callback("mapbox returned with error", undefined)
        }
        else
            callback("Unable to fetch the co-ordinates!!!", undefined)
    })
}

module.exports = geocode