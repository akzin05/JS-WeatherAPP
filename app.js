window.addEventListener('load',()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let localTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition
        (position =>{
           long = position.coords.longitude;
           lat = position.coords.latitude;
            
           const proxy = "https://cors-anywhere.herokuapp.com/";
           const api =`${proxy}https://api.darksky.net/forecast/0bfd4a25c5ac1c0d874d9ddd97c20469/${lat},${long}`;
            // var xml=new XMLHttpRequest();
            // xml.open("POST",api);
            // xml.onload=function(){
            //     console.log(xml.response)
                
            // }
            // xml.send()
           fetch(api)
           .then(response =>{
               return response.json();
           })
           .then(data =>{
               const {temperature, summary, icon}= data.currently;
                //Set DOM Elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent =summary;
                localTimezone.textContent = data.timezone;

                //Formula for celcius
                let celcius = (temperature - 32) * (5/9)
;
                //Set Icon
                setIcons(icon,document.querySelector('.icon'));

                //Change tempearture to celcius/farenheit
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = celcius;
                    }
                    else{
                        temperatureSpan.textContent ="F";
                        temperatureDegree.textContent = temperature;
                    }
                })
            });

        });

    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});