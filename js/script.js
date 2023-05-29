const commentsAPI = 'https://jsonplaceholder.typicode.com/comments'

fetch(commentsAPI)
	.then(response => response.json())
	.then(data => {
		const tableBody = document.querySelector('table tbody')
		const limitedData = data.slice(0, 5)

		for (const comment of limitedData) {
			const newRow = document.createElement('tr')
			const name = document.createElement('td')
			const email = document.createElement('td')
			const body = document.createElement('td')
			const action = document.createElement('td')
			const deleteButton = document.createElement('button')
			const editButton = document.createElement('button')
			const checkbox = document.createElement('input')
			const textArea = document.createElement('textarea')
			const saveBtn = document.createElement('button')
			checkbox.type = 'checkbox'

			name.textContent = comment.name
			email.textContent = comment.email
			body.textContent = comment.body
			editButton.textContent = 'Edit'
			deleteButton.textContent = 'Delete'
			saveBtn.textContent = 'Save'
			saveBtn.style.display = 'none'

			action.appendChild(deleteButton)
			newRow.appendChild(name)
			newRow.appendChild(email)
			newRow.appendChild(body)
			newRow.appendChild(action)
			tableBody.appendChild(newRow)
			action.appendChild(checkbox)
			action.appendChild(editButton)
			action.appendChild(saveBtn)

			// flow do edycji
			// 1. klikamy edit
			// 2. pojawia się textarea w miejscu body
			// 3. wpisujemy z klawiatury zmiany do textarea
			// 4. klikamy save
			// 5. tekst z textarea pojawia się w body i znika textarea
			// bonus: jeśliw widoczny jest save to nie widać edit i na odwrót

			//usuwanie pojedynczego komentarza
			const deleteRow = row => {
				row.remove(row)
			}

			deleteButton.addEventListener('click', () => {
				deleteRow(newRow)
			})

			editButton.addEventListener('click', () => {
				const textArea = document.createElement('textarea')
				textArea.style.overflow = 'hidden'
				textArea.style.width = '100%'
				const saveButton = document.createElement('button')

				textArea.value = body.textContent
				newRow.replaceChild(textArea, body)
				action.replaceChild(saveButton, editButton)

				saveButton.textContent = 'Save'

				saveButton.addEventListener('click', () => {
					body.textContent = textArea.value
					newRow.replaceChild(body, textArea)
					action.replaceChild(editButton, saveButton)
				})
			})

			//usuwanie wybranych
			function deleteSelectedRows() {
				const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked')

				checkboxes.forEach(checkbox => {
					const row = checkbox.closest('tr')
					row.remove()
				})
			}

			const deleteSelectedButton = document.getElementById('deleteSelectedButton')
			deleteSelectedButton.addEventListener('click', deleteSelectedRows)
		}
	})

	.catch(error => console.error(error))

// zad.2/////////////////////////////////////////////////////////////////////

const input = document.querySelector('.searchColor')
const li = document.querySelectorAll('li')

const searchColor = e => {
	const text = e.target.value.toLowerCase()
	console.log(text)

	li.forEach(el => {
		const task = el.textContent

		if (task.toLowerCase().indexOf(text) !== -1) {
			el.style.display = 'block'
		} else {
			el.style.display = 'none'
		}
	})
}

input.addEventListener('keyup', searchColor)

// /zad.3//////////////////////////////////////////////////////////////////////////

// const apiUrl = 'https://api.unsplash.com/photos/random?count=9&client_id=aQZHGKWvzhRJdQvULsszq4Vwf8LxH5tJbODWl9A9EUo'

// async function fetchPhotos() {
// 	try {
// 		const response = await fetch(apiUrl)
// 		const data = await response.json()
// 		return data
// 	} catch (error) {
// 		console.log('Błąd pobierania zdjęć:', error)
// 	}
// }

// function createGallery(data) {
// 	const galleryElement = document.querySelector('.gallery')

// 	const galleryImages = data.map(photo => {
// 		const photoContainer = document.createElement('div')
// 		photoContainer.classList.add('photo-container')

// 		const imgElement = document.createElement('img')
// 		imgElement.src = photo.urls.regular

// 		const authorNameElement = document.createElement('span')
// 		authorNameElement.classList.add('author-name')
// 		authorNameElement.textContent = photo.user.name

// 		photoContainer.appendChild(imgElement)
// 		photoContainer.appendChild(authorNameElement)

// 		return photoContainer
// 	})

// 	galleryElement.append(...galleryImages)
// }

// fetchPhotos().then(data => {
// 	createGallery(data)
// })

//Zad.4/////////////////////////////////////////////////////////////////////////////

const formJson = [
	{ fieldName: 'Imie', fieldType: 'text', validationRegex: '[a-zA-Z]+' },
	{ fieldName: 'Nazwisko', fieldType: 'text', validationRegex: '[a-zA-Z]+' },
	{ fieldName: 'Hasło', fieldType: 'password', validationRegex: '^.{8,}$' },
	{ fieldName: 'Email', fieldType: 'email', validationRegex: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}' },
]

function generateForm(jsonData) {
	const form = document.createElement('form')

	jsonData.forEach(field => {
		const label = document.createElement('label')
		label.setAttribute('for', field.fieldName)
		label.textContent = field.fieldName + ':'

		const input = document.createElement('input')
		input.setAttribute('type', field.fieldType)
		input.setAttribute('id', field.fieldName)
		input.setAttribute('name', field.fieldName)
		input.setAttribute('pattern', field.validationRegex)
		input.required = true

		const br = document.createElement('br')

		form.appendChild(label)
		form.appendChild(input)
		form.appendChild(br)
	})

	const submitButton = document.createElement('input')
	submitButton.setAttribute('type', 'submit')
	submitButton.setAttribute('value', 'Wyślij')

	form.appendChild(submitButton)

	return form
}

document.addEventListener('DOMContentLoaded', function () {
	const formContainer = document.getElementById('form-container')
	const dynamicForm = generateForm(formJson)
	formContainer.appendChild(dynamicForm)
})

// /Zad.5///////////////////////////////////////////////////////////////////////////

const legoImg = document.querySelector('.lego')
let isZoomed = false

function zoomAndMoveImg() {
	isZoomed = !isZoomed
	legoImg.classList.toggle('zoom', isZoomed)
	if (isZoomed) {
		legoImg.addEventListener('mousemove', move)
	} else {
		legoImg.removeEventListener('mousemove', move)
		legoImg.style.backgroundPositionX = 0
		legoImg.style.backgroundPositionY = 0
	}
}

function move() {
	legoImg.addEventListener('mousemove', e => {
		if (isZoomed) {
			const desiredPositionX = -e.offsetX + 390
			const desiredPositionY = -e.offsetY + 370
			legoImg.style.backgroundPositionX = `${desiredPositionX}px`
			legoImg.style.backgroundPositionY = `${desiredPositionY}px`
		}
	})
}

legoImg.addEventListener('click', zoomAndMoveImg)

// ZAD.6////////////////////////////////////////////////////////////////////////

const meetings = [
	{
		date: '27-5-2023',
		time: '10:00',
		name: 'Spotkanie z XYZ',
		client: 'Jan Kowalski',
	},
	{
		date: '30-5-2023',
		time: '12:00',
		name: 'Spotkanie z ABC',
		client: 'Anna Nowak',
	},
	{
		date: '19-6-2023',
		time: '14:00',
		name: 'Spotkanie z KLM',
		client: 'Adam Nowakowski',
	},
	{
		date: '5-6-2023',
		time: '16:30',
		name: 'Spotkanie z DEF',
		client: 'Ewa Nowakowska',
	},
	{
		date: '11-6-2023',
		time: '9:00',
		name: 'Spotkanie z GHI',
		client: 'Piotr Kowalczyk',
	},
]

let currentDate = new Date()

function renderCalendar() {
	const calendarBody = document.getElementById('calendar')
	calendarBody.innerHTML = ''

	for (let i = 0; i < 7; i++) {
		const date = new Date(currentDate)
		date.setDate(date.getDate() + i)
		const formattedDate = formatDate(date)

		const row = document.createElement('tr')

		const dateCell = document.createElement('td')
		dateCell.textContent = formattedDate
		row.appendChild(dateCell)

		const dayCell = document.createElement('td')
		dayCell.textContent = getDayOfWeek(date)
		row.appendChild(dayCell)

		const timeCell = document.createElement('td')

		row.appendChild(timeCell)

		const nameCell = document.createElement('td')
		// nameCell.textContent = ''
		row.appendChild(nameCell)

		const clientCell = document.createElement('td')
		// clientCell.textContent = ''
		row.appendChild(clientCell)

		// jeżeli w zmiennei meetings jest wpis o takiej samej dacie jak w zmiennej date to textContent ma być ustawiony na tekst z tego wpisu
		// w przeciwnym wypadku tak jak jest teraz
		let meetingTime = ''
		let meetingName = ''
		let meetingClient = ''
		for (let j = 0; j < meetings.length; j++) {
			const meeting = meetings[j]
			if (meeting.date === formattedDate) {
				meetingTime = meeting.time
				meetingName = meeting.name
				meetingClient = meeting.client
			}
		}

		timeCell.textContent = meetingTime
		nameCell.textContent = meetingName
		clientCell.textContent = meetingClient

		calendarBody.appendChild(row)
	}
}

function previousWeek() {
	currentDate.setDate(currentDate.getDate() - 7)
	renderCalendar()
}

function nextWeek() {
	currentDate.setDate(currentDate.getDate() + 7)
	renderCalendar()
}

function formatDate(date) {
	const day = String(date.getDate())
	const month = String(date.getMonth() + 1)
	const year = date.getFullYear()
	return `${day}-${month}-${year}`
}

function getDayOfWeek(date) {
	return date.toLocaleDateString('pl-PL', { weekday: 'long' })
}

const previousWeekButton = document.getElementById('previous-week-button')
previousWeekButton.addEventListener('click', previousWeek)

const nextWeekButton = document.getElementById('next-week-button')
nextWeekButton.addEventListener('click', nextWeek)

// Render initial calendar
renderCalendar()

//zad.7//////////////////////////////////////////////////////////////////

const numbersToWords = {
	0: 'zero',
	1: 'one',
	2: 'two',
	3: 'three',
	4: 'four',
	5: 'five',
	6: 'six',
	7: 'seven',
	8: 'eight',
	9: 'nine',
	10: 'ten',
	11: 'eleven',
	12: 'twelve',
	13: 'thirteen',
	14: 'fourteen',
	15: 'fifteen',
	16: 'sixteen',
	17: 'seventeen',
	18: 'eighteen',
	19: 'nineteen',
	20: 'twenty',
	30: 'thirty',
	40: 'forty',
	50: 'fifty',
	60: 'sixty',
	70: 'seventy',
	80: 'eighty',
	90: 'ninety',
}

const scales = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion']

function convertToWords(number) {
	if (number === 0) {
		return numbersToWords[number]
	}

	let words = ''

	for (let scaleIndex = 0; number > 0; scaleIndex++) {
		const remainder = number % 1000

		if (remainder > 0) {
			const scale = scales[scaleIndex]
			const word = convertThreeDigitNumberToWords(remainder)

			words = joinWords(word, scale, words)
		}

		number = Math.floor(number / 1000)
	}

	return words.trim()
}

function convertThreeDigitNumberToWords(number) {
	let words = ''

	if (number >= 100) {
		const hundreds = Math.floor(number / 100)
		words += numbersToWords[hundreds] + ' hundred '
		number %= 100
	}

	if (number > 0) {
		if (words !== '') {
			words += 'and '
		}

		if (number < 20) {
			words += numbersToWords[number]
		} else {
			const tens = Math.floor(number / 10) * 10
			const ones = number % 10
			words += numbersToWords[tens]

			if (ones > 0) {
				words += '-' + numbersToWords[ones]
			}
		}
	}

	return words
}

function joinWords(word, scale, words) {
	if (words !== '') {
		return word + ' ' + scale + ' ' + words
	} else {
		return word + ' ' + scale
	}
}

console.log(convertToWords(11212))
