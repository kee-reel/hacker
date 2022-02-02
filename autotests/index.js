document.getElementById('get_work').addEventListener('click', () => {
	requestWork()
})
document.getElementById('gen_doc').addEventListener('click', () => {
	genDoc()
})

async function requestWork() {
	const tasks_container = document.getElementById('tasks_container')
	const subject = document.getElementById('subject').value
	const work = document.getElementById('work').value
	const variant = document.getElementById('variant').value
	const resp = await fetch(`/solution?subject=1&work=${work}&variant=${variant}`)
	const data = await resp.json()
	var tasks = data.tasks
	
	const div = document.createElement('div')

	const doc_link = document.getElementById('doc_link')
	doc_link.style = 'margin-bottom: 20px;'
	doc_link.innerHTML = 'Файл с заданием'
	doc_link.href = data.link

	for (const task_id in tasks) {
		var task = tasks[task_id]
		const div = document.createElement('div')
		div.classList.add('task')

		const label = document.createElement('label')
		label.classList.add('task_label')
		label.innerHTML = `Задание ${task.number}. ${task.name}`

		const input = document.createElement('input')
		input.classList.add('task_file')
		input.type = 'file'
		input.name = task_id
		input.classList.add('files')

		const button = document.createElement('button')
		button.classList.add('task_button')
		button.classList.add('send')
		button.innerHTML = 'Отправить'
		button.name = task_id
		button.addEventListener('click', send)

		const textarea = document.createElement('textarea')
		textarea.classList.add('task_text')
		textarea.readonly = true

		div.appendChild(label)
		div.appendChild(input)
		div.appendChild(button)
		div.appendChild(textarea)
		tasks_container.appendChild(div)
	}
	document.getElementById('work_tasks').hidden = false
}

async function send() {
	this.style.disabled = true
	const task_text = this.parentNode.querySelectorAll('.task_text')[0]
	const fileNode = this.parentNode.querySelectorAll('.files')[0]
	const formData = new FormData();
	var file = fileNode.files[0]
	if (!file) {
		task_text.innerHTML = "Файл с решением не приложен!"
		return
	}
	task_text.innerHTML = ""
	formData.append(`source_${this.name}`, file);
	formData.append(`tasks`, this.name);
	formData.append(`token`, document.getElementById('token').value);
	const resp = await fetch(`/solution`, { method: 'POST', body: formData });
	const data = await resp.json()
	success_msg = 'Задание прошло автотесты!' 
	task_text.innerHTML = !data.error ? success_msg : data.error
	this.style.disabled = false
	const tasks_text = document.querySelectorAll('.task_text')
	is_work_complete = true
	for (const text of tasks_text) {
		if (text.innerHTML !== success_msg) {
			is_work_complete = false
			break
		}
	}
	document.getElementById('report_generation').hidden = !is_work_complete
	document.getElementById('report_generation_hint').innerHTML = is_work_complete ? 
		'Все автотесты пройдены, доступна генерация отчёта' : 
		'Генерация отчёта будет доступна после успешного прохождения автотестов'
}

async function genDoc() {
	const report_link = document.getElementById('report_link')
	report_link.innerHTML = ""
	const filesNode = document.querySelectorAll('.files')
	const formData = new FormData();
	var task_ids = []
	for (const file of filesNode) {
		if (!file.files[0]) {
			continue
		}
		formData.append(`source_${file.name}`, file.files[0]);
		task_ids.push(file.name)
	}
	console.log(task_ids.join(','))
	formData.append('tasks', task_ids.join(','))
	formData.append(`token`, document.getElementById('token').value);
	const resp = await fetch(`/solution?gen_doc=1`, { method: 'POST', body: formData });
	const data = await resp.json()
	report_link.innerHTML = "Сгенерированный отчёт"
	report_link.href = data.link
}

