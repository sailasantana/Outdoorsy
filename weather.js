const baseUrl = 'https://api.weatherapi.com/v1/forecast.json'
const key = 'dbbaa0dcf73b404889c13600210601'
let days = 4;



function formatQueryParams(params){
    const queryItems = Object.keys(params)
                       .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)

    return queryItems.join('&');
}

function displayResults(responseJson){
    
  
  
    $('#current-overview').append(
    
        `<div class ='current'>
        <p>(All Temperatures are in Fahrenheit)</p>
        <h1 class='location' >${Object.entries(responseJson)[0][1].name},
        ${Object.entries(responseJson)[0][1].country} </h1>
        <h2>Currently : ${Object.entries(responseJson)[1][1].temp_f} F,  ${Object.entries(responseJson)[1][1].condition.text} </h2>
        </div>
        `
    )
  
  
    for(let i=0; i< Object.entries(responseJson)[2][1].forecastday.length; i++){
        $('#js-weather-results').append(
            `
            <ul class = 'box'> 
            <h2>${Object.entries(responseJson)[2][1].forecastday[i].date} <h2>
            <li> Max Temp : ${Object.entries(responseJson)[2][1].forecastday[i].day.maxtemp_f} </li>
            <li> Min Temp : ${Object.entries(responseJson)[2][1].forecastday[i].day.mintemp_f} </li>
            <li> Description : ${Object.entries(responseJson)[2][1].forecastday[i].day.condition.text} </li>
            
            </ul>
            `
        )
    }
  
  
    
  }
function getWeather(q, days){
    const params = {
        key: key,
        q: q,
        days: days
    }

    const queryString = formatQueryParams(params)
    console.log(queryString)

    const url = baseUrl + '?' + queryString;
    console.log(url)
    fetch(url)
        .then(response => {
            if(response.ok){
                
                return response.json();
            }
            throw new Error(response.statusText); 
        })
        .then(responseJson => 
        displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something Went Wrong: Try a different City or US Zip `)
        })

}

function watchForm(){
    $('form').submit(event => {
        $('#current-overview').empty()
        $('#js-weather-results').empty()

        event.preventDefault()
        const q = $('#js-city').val();
      
        getWeather(q, days)
    })
}

$(watchForm);

