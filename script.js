let imagemTempo = document.getElementById('imagem-tempo')
let textoTempo = document.getElementById('texto-tempo')
let textoTemperatura = document.getElementById('texto-temperatura')
let textoVentos = document.getElementById('texto-ventos')
let textoChanceChuva = document.getElementById('texto-chance-chuva')
let cartao = document.getElementById('cartao')

let textoChanceChuva0 = document.getElementById('texto-chance-chuva0')
let textoChanceChuva2 = document.getElementById('texto-chance-chuva2')
let textoChanceChuva4 = document.getElementById('texto-chance-chuva4')
let textoChanceChuva6 = document.getElementById('texto-chance-chuva6')
let textoChanceChuva8 = document.getElementById('texto-chance-chuva8')
let textoChanceChuva10 = document.getElementById('texto-chance-chuva10')
let textoChanceChuva12 = document.getElementById('texto-chance-chuva12')
let textoChanceChuva14 = document.getElementById('texto-chance-chuva14')
let textoChanceChuva16 = document.getElementById('texto-chance-chuva16')
let textoChanceChuva18 = document.getElementById('texto-chance-chuva18')
let textoChanceChuva20 = document.getElementById('texto-chance-chuva20')
let textoChanceChuva22 = document.getElementById('texto-chance-chuva22')
let textoChanceChuva24 = document.getElementById('texto-chance-chuva24')

let imagemChanceChuva0 = document.getElementById('imagem-chance-chuva0')
let imagemChanceChuva2 = document.getElementById('imagem-chance-chuva2')
let imagemChanceChuva4 = document.getElementById('imagem-chance-chuva4')
let imagemChanceChuva6 = document.getElementById('imagem-chance-chuva6')
let imagemChanceChuva8 = document.getElementById('imagem-chance-chuva8')
let imagemChanceChuva10 = document.getElementById('imagem-chance-chuva10')
let imagemChanceChuva12 = document.getElementById('imagem-chance-chuva12')
let imagemChanceChuva14 = document.getElementById('imagem-chance-chuva14')
let imagemChanceChuva16 = document.getElementById('imagem-chance-chuva16')
let imagemChanceChuva18 = document.getElementById('imagem-chance-chuva18')
let imagemChanceChuva20 = document.getElementById('imagem-chance-chuva20')
let imagemChanceChuva22 = document.getElementById('imagem-chance-chuva22')
let imagemChanceChuva24 = document.getElementById('imagem-chance-chuva24')


    //FORMA MODERNA COM ASYNC E AWAIT/////////////////////////////////////////////////
    let lat = 0
    let lng = 0
    document.body.style.cursor = "wait";
    const getPosition = function () {
        return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    };
  
    const whereAmI = async function(){
        //Geolocation
        let pos = await getPosition()
        lat = pos.coords.latitude
        lng = pos.coords.longitude
        //Reverse Geolocation
        let resGeo = await  fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
        let dataGeo = await resGeo.json()
        console.log(`Você esta em ${dataGeo.city}, ${dataGeo.countryName}`)

        // let resTemperatura = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=temperature_2m,windspeed_10m,precipitation_probability,rain&forecast_days=1`) 
        let resTemperatura = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,precipitation_probability,rain,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&current_weather=true&timezone=America%2FSao_Paulo&forecast_days=3`)
        let dataTemperatura = await resTemperatura.json()
        console.log(dataTemperatura)
        console.log(`Temperatura: ${dataTemperatura.current_weather.temperature}`)
        console.log(`Ventos: ${dataTemperatura.current_weather.windspeed}`)
        console.log(`Codigo Tempo: ${dataTemperatura.current_weather.weathercode}`)
        console.log(`Chance de chuva: ${dataTemperatura.hourly.precipitation_probability}`)
        console.log(`Temperatura maxima: ${dataTemperatura.daily.temperature_2m_max}`)
        console.log(`Temperatura minima: ${dataTemperatura.daily.temperature_2m_min}`)
        console.log(`Chance de chuva: ${dataTemperatura.daily.precipitation_probability_max[0]}`)
        console.log(`Hora: ${dataTemperatura.current_weather.time}`)

        textoTemperatura.textContent = dataTemperatura.current_weather.temperature + '°'
        textoVentos.textContent = dataTemperatura.current_weather.windspeed + ' km/h'
        textoChanceChuva.textContent =  dataTemperatura.daily.precipitation_probability_max[0] + '%'
        textoChanceChuva0.textContent = dataTemperatura.hourly.precipitation_probability[0] + '%'
        textoChanceChuva2.textContent = dataTemperatura.hourly.precipitation_probability[2] + '%'
        textoChanceChuva4.textContent = dataTemperatura.hourly.precipitation_probability[4] + '%'
        textoChanceChuva6.textContent = dataTemperatura.hourly.precipitation_probability[6] + '%'
        textoChanceChuva8.textContent = dataTemperatura.hourly.precipitation_probability[8] + '%'
        textoChanceChuva10.textContent = dataTemperatura.hourly.precipitation_probability[10] + '%'
        textoChanceChuva12.textContent = dataTemperatura.hourly.precipitation_probability[12] + '%'
        textoChanceChuva14.textContent = dataTemperatura.hourly.precipitation_probability[14] + '%'
        textoChanceChuva16.textContent = dataTemperatura.hourly.precipitation_probability[16] + '%'
        textoChanceChuva18.textContent = dataTemperatura.hourly.precipitation_probability[18] + '%'
        textoChanceChuva20.textContent = dataTemperatura.hourly.precipitation_probability[20] + '%'
        textoChanceChuva22.textContent = dataTemperatura.hourly.precipitation_probability[22] + '%'
        textoChanceChuva24.textContent = dataTemperatura.hourly.precipitation_probability[24] + '%'


        if(dataTemperatura.current_weather.weathercode == 0){
            textoTempo.textContent = 'Tempo Limpo'
            imagemTempo.src = 'images/sun.gif'
            cartao.style.borderLeft = '20px solid #97D2EC' //Dia claro
            document.body.style.backgroundColor = '#adedf8'//Sol

            //DIA LIMPO - CONFERE SE É DIA OU
            if(dataTemperatura.current_weather.is_day == 0){
                imagemTempo.src = 'images/night.gif'
                cartao.style.borderLeft = '20px solid #25316D' //Noite ou chuva
                document.body.style.backgroundColor = '#3e4fa1'//Chuva
            }
            if(dataTemperatura.current_weather.is_day == 1){
                imagemTempo.src = 'images/sun.gif'
                cartao.style.borderLeft = '20px solid #97D2EC' //Dia claro
                document.body.style.backgroundColor = '#adedf8'//Sol
            }
        }
        if(dataTemperatura.current_weather.weathercode == 1){
            textoTempo.textContent = 'Parcialmente Limpo'  
            imagemTempo.src = 'images/partly-cloudy.gif'
            cartao.style.borderLeft = '20px solid #5F6F94' //Nublado
            document.body.style.backgroundColor = '#8091b8'//Nublado
        }
        if(dataTemperatura.current_weather.weathercode == 2){
            textoTempo.textContent = 'Parcialmente Nublado'  
            imagemTempo.src = 'images/partly-cloudy.gif'
            cartao.style.borderLeft = '20px solid #5F6F94' //Nublado
            document.body.style.backgroundColor = '#8091b8'//Nublado
        }
        if(dataTemperatura.current_weather.weathercode == 3){
            textoTempo.textContent = 'Nublado'  
            imagemTempo.src = 'images/partly-cloudy.gif'
            cartao.style.borderLeft = '20px solid #5F6F94' //Nublado
            document.body.style.backgroundColor = '#8091b8'//Nublado
        }
        if(dataTemperatura.current_weather.weathercode == 45 || dataTemperatura.current_weather.weathercode == 48){
            textoTempo.textContent = 'Névoa'
            imagemTempo.src = 'images/partly-cloudy.gif'
            cartao.style.borderLeft = '20px solid #5F6F94' //Nublado  
            document.body.style.backgroundColor = '#8091b8'//Nublado
        }
        if(dataTemperatura.current_weather.weathercode == 51){
            textoTempo.textContent = 'Garoa Leve' 
            imagemTempo.src = 'images/rain.gif'
            cartao.style.borderLeft = '20px solid #25316D' //Noite ou chuva 
            document.body.style.backgroundColor = '#3e4fa1'//Chuva
        }
        if(dataTemperatura.current_weather.weathercode == 53){
            textoTempo.textContent = 'Garoa Moderada'  
            imagemTempo.src = 'images/rain.gif'
            cartao.style.borderLeft = '20px solid #25316D' //Noite ou chuva
            document.body.style.backgroundColor = '#3e4fa1'//Chuva
        }
        if(dataTemperatura.current_weather.weathercode == 55){
            textoTempo.textContent = 'Garoa Forte' 
            imagemTempo.src = 'images/rain.gif' 
            cartao.style.borderLeft = '20px solid #25316D' //Noite ou chuva
            document.body.style.backgroundColor = '#3e4fa1'//Chuva
        }
        if(dataTemperatura.current_weather.weathercode == 61){
            textoTempo.textContent = 'Chuva Leve' 
            imagemTempo.src = 'images/rain.gif'
            cartao.style.borderLeft = '20px solid #25316D' //Noite ou chuva 
            document.body.style.backgroundColor = '#3e4fa1'//Chuva
        }
        if(dataTemperatura.current_weather.weathercode == 63){
            textoTempo.textContent = 'Chuva Moderada'
            imagemTempo.src = 'images/rain.gif'  
            cartao.style.borderLeft = '20px solid #25316D' //Noite ou chuva
            document.body.style.backgroundColor = '#3e4fa1'//Chuva
        }
        if(dataTemperatura.current_weather.weathercode == 65){
            textoTempo.textContent = 'Chuva Forte'
            imagemTempo.src = 'images/rain.gif'  
            cartao.style.borderLeft = '20px solid #25316D' //Noite ou chuva
            document.body.style.backgroundColor = '#3e4fa1'//Chuva
        }
        if(dataTemperatura.current_weather.weathercode >= 71 && dataTemperatura.current_weather.weathercode <= 77){
            textoTempo.textContent = 'Neve'  
            imagemTempo.src = 'images/rain.gif'
            cartao.style.borderLeft = '20px solid #25316D' //Noite ou chuva
            document.body.style.backgroundColor = '#3e4fa1'//Chuva
        }
        if(dataTemperatura.current_weather.weathercode >= 80 && dataTemperatura.current_weather.weathercode <= 82){
            textoTempo.textContent = 'Pancadas de Chuva' 
            imagemTempo.src = 'images/rain.gif'
            cartao.style.borderLeft = '20px solid #25316D' //Noite ou chuva 
            document.body.style.backgroundColor = '#3e4fa1'//Chuva
        }
        if(dataTemperatura.current_weather.weathercode == 95){
            textoTempo.textContent = 'Tempestade' 
            imagemTempo.src = 'images/storm.gif'
            cartao.style.borderLeft = '20px solid #25316D' //Noite ou chuva 
            document.body.style.backgroundColor = '#3e4fa1'//Chuva
        }


        //Horas chance chuva
        if(dataTemperatura.hourly.precipitation_probability[0] <= 20){
            imagemChanceChuva0.src = 'images/sun.gif'
        }else if(dataTemperatura.hourly.precipitation_probability[0] > 20){
            imagemChanceChuva0.src = 'images/rain.gif'
        }

        if(dataTemperatura.hourly.precipitation_probability[2] <= 20){
            imagemChanceChuva2.src = 'images/sun.gif'
        }else if(dataTemperatura.hourly.precipitation_probability[2] > 20){
            imagemChanceChuva2.src = 'images/rain.gif'
        }

        if(dataTemperatura.hourly.precipitation_probability[4] <= 20){
            imagemChanceChuva4.src = 'images/sun.gif'
        }else if(dataTemperatura.hourly.precipitation_probability[4] > 20){
            imagemChanceChuva4.src = 'images/rain.gif'
        }

        if(dataTemperatura.hourly.precipitation_probability[6] <= 20){
            imagemChanceChuva6.src = 'images/sun.gif'
        }else if(dataTemperatura.hourly.precipitation_probability[6] > 20){
            imagemChanceChuva6.src = 'images/rain.gif'
        }

        if(dataTemperatura.hourly.precipitation_probability[8] <= 20){
            imagemChanceChuva8.src = 'images/sun.gif'
        }else if(dataTemperatura.hourly.precipitation_probability[8] > 20){
            imagemChanceChuva8.src = 'images/rain.gif'
        }

        if(dataTemperatura.hourly.precipitation_probability[10] <= 20){
            imagemChanceChuva10.src = 'images/sun.gif'
        }else if(dataTemperatura.hourly.precipitation_probability[10] > 20){
            imagemChanceChuva10.src = 'images/rain.gif'
        }

        if(dataTemperatura.hourly.precipitation_probability[12] <= 20){
            imagemChanceChuva12.src = 'images/sun.gif'
        }else if(dataTemperatura.hourly.precipitation_probability[12] > 20){
            imagemChanceChuva12.src = 'images/rain.gif'
        }

        if(dataTemperatura.hourly.precipitation_probability[14] <= 20){
            imagemChanceChuva14.src = 'images/sun.gif'
        }else if(dataTemperatura.hourly.precipitation_probability[14] > 20){
            imagemChanceChuva14.src = 'images/rain.gif'
        }

        if(dataTemperatura.hourly.precipitation_probability[16] <= 20){
            imagemChanceChuva16.src = 'images/sun.gif'
        }else if(dataTemperatura.hourly.precipitation_probability[16] > 20){
            imagemChanceChuva16.src = 'images/rain.gif'
        }

        if(dataTemperatura.hourly.precipitation_probability[18] <= 20){
            imagemChanceChuva18.src = 'images/sun.gif'
        }else if(dataTemperatura.hourly.precipitation_probability[18] > 20){
            imagemChanceChuva18.src = 'images/rain.gif'
        }

        if(dataTemperatura.hourly.precipitation_probability[20] <= 20){
            imagemChanceChuva20.src = 'images/sun.gif'
        }else if(dataTemperatura.hourly.precipitation_probability[20] > 20){
            imagemChanceChuva20.src = 'images/rain.gif'
        }

        if(dataTemperatura.hourly.precipitation_probability[22] <= 20){
            imagemChanceChuva22.src = 'images/sun.gif'
        }else if(dataTemperatura.hourly.precipitation_probability[22] > 20){
            imagemChanceChuva22.src = 'images/rain.gif'
        }
        
        if(dataTemperatura.hourly.precipitation_probability[24] <= 20){
            imagemChanceChuva24.src = 'images/sun.gif'
        }else if(dataTemperatura.hourly.precipitation_probability[24] > 20){
            imagemChanceChuva24.src = 'images/rain.gif'
        }
        
        cartao.style.opacity = 1
        document.body.style.cursor = "default";
    }

    whereAmI()