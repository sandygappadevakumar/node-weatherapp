console.log("Running JS in HTML")


// const weatherForm = document.getElementById('myform')
// weatherForm.addEventListener('submit', (e) => {
//     e.preventDefault()
//     console.log("Try to prevent default behaviour")
// })

var myForecast = function(address)
{
    return {forecast:'Forecast at '+address+' is 30 degree', error:undefined}
}
var forecast = function(address, cb)
{
    fetch('http://localhost:3000/weather?address='+address).then((res)=>{
        if(!res.body)
            console.log(res)
        else
        {
            res.json().then((data)=>{
                if(data.error)
                {
                    cb({forecast:undefined, error:data.error})
                    console.log(data.error)
                }
                else
                {
                    console.log(data.address+':'+ data.forecast)
                    cb({forecast:data.forecast, error:undefined})
                }
            })
        }
    })
}
