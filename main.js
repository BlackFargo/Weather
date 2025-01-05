const apiKey = '957874ee6bf76fa3c2b7cc881a13a2fb'
const temp = document.querySelector('.temp')
const city = document.querySelector('.city')

const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')
const form = document.querySelector('.form')

async function getData(cityName) {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${apiKey}`
		)
		if (!response.ok) {
			throw new Error('City not found or invalid response')
		}
		const data = await response.json()
		console.log(data)
		temp.innerHTML = `${Math.round(data.main.temp)}&#8451`
		city.textContent = data.name
		humidity.textContent = data.main.humidity + '%'
		wind.textContent = Math.round(data.wind.speed) + ' km/h'
	} catch (e) {
		if (e.message === 'City not found or invalid response') {
			city.textContent = 'The city was not found. Please try again.'
			temp.innerHTML = ''
			humidity.textContent = ''
			wind.textContent = ''
		} else {
			console.log(`Error: ${e}`)
			city.textContent = 'Something went wrong. Please try later.'
		}
	}
}

form.addEventListener('submit', event => {
	event.preventDefault()
	const cityName = document.querySelector('.input').value
	if (cityName == '') {
		city.classList.add('red')
		city.textContent = 'Похоже вы ничего не ввели'
		return
	} else {
		city.classList.remove('red')
	}
	getData(cityName)
})

getData('Kyiv')
