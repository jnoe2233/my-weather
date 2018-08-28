import fetch from 'isomorphic-fetch';

export function fetchPopularRepos (query = 'text="San Diego, CA" or text="New York, NY" or text="Juneau, AK"') {
    function stripTitle(title){
        xTitle = title.split('US');
        xTitle[0].replace('Conditions for ', '').replace('US').trim();
        console.log(xTitle[0]);
    }
    
    const encodedURI = encodeURI(`https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where ${query})&format=json&env=store://datatables.org/alltableswithkeys`)
    
    
    return fetch(encodedURI)
        .then((data) => data.json())
        .then((weather) => {
            if(weather.query.results && weather.query.results.channel){
                let cities = {};

                if(typeof weather.query.results.channel.length == 'undefined'){
                    cities[0] = {
                        city: weather.query.results.channel.location.city + ', ' + weather.query.results.channel.location.region,
                        high: weather.query.results.channel.item.forecast[0].high,
                        low: weather.query.results.channel.item.forecast[0].low,
                        temp: weather.query.results.channel.item.condition.temp,
                        text: weather.query.results.channel.item.condition.text,

                    };
                }
                else{
                    weather.query.results.channel.forEach(function(city, i){
                        cities[i] = {
                            city: city.location.city + ', ' + city.location.region,
                            high: city.item.forecast[0].high,
                            low: city.item.forecast[0].low,
                            temp: city.item.condition.temp,
                            text: city.item.condition.text,

                        };
                    });
                }

                return cities;
            }
        })
        .catch((error) => {
            console.warn(error)
            return 'error';
        });
}