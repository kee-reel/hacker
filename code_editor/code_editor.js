async function init() {
	var is_test_user = document.cookie.lenght === 0;
	var token = await get_token();
	var tasks_data = null;
	if(token) {
		tasks_data = await get_task_data(token, true);
	}

	for(var e of document.getElementsByClassName('test_section')) {
		const task_data = await parse_task_data(e, token, tasks_data);
		if(typeof task_data === 'string') {
			const p = document.createElement('p');
			p.textContent = `Sorry, testing is currently unavailable: ${task_data}. Try again later.`;
			e.appendChild(p);
			continue;
		}

		const [test_data, on_sent, on_received] = create_test_data(task_data, is_test_user);
		const source_text = await create_source_text(task_data, on_sent, on_received);

		e.appendChild(source_text);
		e.appendChild(test_data);
	}
}

async function create_source_text(task_data, on_sent, on_received) {
	const source_text = await create_code_editor(task_data);
	source_text.classList.add('source_text');
	source_text.addEventListener('keypress', async (event) => {
		if (!event.ctrlKey || event.key !== 'Enter') {
			return;
		}
		this.disabled = true;
		on_sent();
		const result = await send_test(task_data['id'], source_text.childNodes[1].value);
		on_received(result);
		this.disabled = false;
	});
	return source_text;
}

function create_test_data(task_data, is_test_user, source_text) {
	const sections = document.createElement('div');
	sections.classList.add('test_data_sections');

	const test_desc = document.createElement('textarea');
	test_desc.classList.add('test_log');
	test_desc.classList.add('pending_test');
	test_desc.readOnly = true;
	var text = `Задача "${task_data['name']}"

Описание задачи:
${task_data['desc']}`
	if(task_data['input'] && Object.keys(task_data['input']).length > 0) {
		text += `

Входные данные:
${task_data['input']}`
	}
	text += `

Что программа должна вывести:
${task_data['output']}`;
	test_desc.value = text;
	sections.appendChild(test_desc);

	const test_log = document.createElement('textarea');
	test_log.classList.add('hidden');
	test_log.classList.add('test_log');
	test_log.classList.add('pending_test');
	test_log.readOnly = true;
	test_log.value = `Нажмите Ctrl+Enter в области с решением, чтобы отправить его на проверку.`;
	sections.appendChild(test_log);

	const login = create_login(is_test_user);
	login.classList.add('hidden');
	sections.appendChild(login);

	const tabs = document.createElement('div');
	tabs.classList.add('test_data_tabs');
	const desc_button = Object.assign(document.createElement('input'), {
		type: 'button',
		value: 'Описание задачи'
	});
	desc_button.classList.add('test_data_tab');
	desc_button.classList.add('test_data_tab_active');
	tabs.appendChild(desc_button);

	const logs_button = Object.assign(document.createElement('input'), {
		type: 'button',
		value: 'Результаты'
	});
	logs_button.classList.add('test_data_tab');
	tabs.appendChild(logs_button);

	const login_button = Object.assign(document.createElement('input'), {
		type: 'button',
		value: 'Аккаунт'
	});
	login_button.classList.add('test_data_tab');
	tabs.appendChild(login_button);

	desc_button.addEventListener('click', (event) => {
		desc_button.classList.add('test_data_tab_active');
		logs_button.classList.remove('test_data_tab_active');
		login_button.classList.remove('test_data_tab_active');
		test_desc.classList.remove('hidden');
		test_log.classList.add('hidden');
		login.classList.add('hidden');
	});
	logs_button.addEventListener('click', (event) => {
		desc_button.classList.remove('test_data_tab_active');
		logs_button.classList.add('test_data_tab_active');
		login_button.classList.remove('test_data_tab_active');
		test_desc.classList.add('hidden');
		test_log.classList.remove('hidden');
		login.classList.add('hidden');
	});
	login_button.addEventListener('click', (event) => {
		desc_button.classList.remove('test_data_tab_active');
		logs_button.classList.remove('test_data_tab_active');
		login_button.classList.add('test_data_tab_active');
		test_desc.classList.add('hidden');
		test_log.classList.add('hidden');
		login.classList.remove('hidden');
	});

	const test_data = document.createElement('div');
	test_data.classList.add('test_data');
	test_data.appendChild(tabs);
	test_data.appendChild(sections);

	const on_sent = () => {
		test_log.value = 'Sending request...';
		test_log.classList.add('pending_test');
		test_log.classList.remove('failed_test');
		test_log.classList.remove('passed_test');
		logs_button.dispatchEvent(new Event('click'));
	};
  
	const on_received = (data) => {
		test_log.classList.remove('pending_test');
		if (data['error'] == null) {
			test_log.value = 'Тесты пройдены успешно!';
			test_log.classList.add('passed_test');
			return;
		}
		test_log.classList.add('failed_test');
		var err = data['error'];
		switch(err['stage']) {
			case 'build':
				test_log.value = `Ошибка сборки решения:
${err['msg']}`;
				break;
			case 'test':
				text = 'Ошибка прохождения теста:'
				if(err['params']) {
					text += `
Входные параметры: ${err['params'].split(';')}`;
				}
				text += `
Ожидаемый результат: ${err['expected']}
Получено: ${err['result']}`;
				test_log.value = text;
				break;
			default:
				test_log.value = err['error'];
		}
	}
	return [test_data, on_sent, on_received];
}

function parse_task_data(e, token, task_data) {
	if(!token) {
		return 'can not create test account';
	}

	if(!task_data) {
		return 'no testing data';
	}

	const folders = e.id.split('__');
	const project = task_data[folders[1]];
	if(!project) {
		return 'project for this task is not found';
	}
	const unit = project['units'][folders[2]];
	if(!unit) {
		return 'unit for this task is not found';
	}
	const task = unit['tasks'][folders[3]];
	if(!task) {
		return 'no such task in testing data';
	}
	return task;
}

function create_login() {
	const login = document.createElement('div');
	login.classList.add('login');

	const email_label = document.createElement('label');
	email_label.classList.add('login_label');
	email_label.innerHTML = 'Почта:';
	login.appendChild(email_label);

	const email = document.createElement('input');
	email.classList.add('login_field');
	login.appendChild(email);

	const pass_label = document.createElement('label');
	pass_label.classList.add('login_label');
	pass_label.innerHTML = 'Пароль:';
	login.appendChild(pass_label);

	const pass = document.createElement('input');
	pass.classList.add('login_field');
	login.appendChild(pass);

	const button_label = document.createElement('label');
	button_label.classList.add('login_error');
	button_label.hidden = true;
	login.appendChild(button_label);

	const login_button = document.createElement('button');
	login_button.classList.add('login_button');
	login_button.innerHTML = 'Вход/Регистрация';
	login_button.addEventListener('click', async function(event) {
		const data = await get_token(email.value, pass.value);
		if(data['error'] != null) {
			button_label.hidden = false;
			button_label.innerHTML = data['error'];
			return
		}
		button_label.hidden = true;
		document.cookie = `token=${data['token']};Secure`;
		login.classList.add("hidden")
		test_log.hidden = false;
	});
	login.appendChild(login_button);

	return login;
}

function get_cookie_token() {
	if(document.cookie === '') {
		return null;
	}
	var token = document.cookie.split(';');
	if(token.lenght > 0) {
		return null;
	}
	token = token[0].split('=');
	if(token.lenght > 1) {
		return null;
	}
	token = token[1];
	if(token.length === 256) {
		return token;
	}
	return null;
}

async function get_task_data(token, is_folder) {
	const resp = await fetch(`https://kee-reel.com/cyber-cat?token=${token}&folders=${is_folder}`)
	return await resp.json()
}

async function get_token(email, pass) {
	const token = get_cookie_token();
	if(token) {
		return token;
	}
	else if(!email && !pass)
	{
		const default_email = 'test@test.com';
		const default_pass = '123456';
		data = await get_token(default_email, default_pass);
		if(!data['error']) {
			return data['token'];
		}
		return null;
	}
	const resp = await fetch(`https://kee-reel.com/cyber-cat/login?email=${email}&pass=${pass}`)
	return await resp.json()
}

async function send_test(task_id, source_text) {
	var token = await get_token();

	const formData = new FormData();
	formData.append('task_id', task_id);
	formData.append('source_text', source_text);

	const resp = await fetch(`https://kee-reel.com/cyber-cat?token=${token}`, {method: 'POST', body: formData});
	return await resp.json();
}

async function get_task_template(task_id) {
	var token = await get_token();

	const resp = await fetch(`https://kee-reel.com/cyber-cat/template?task_id=${task_id}&token=${token}`);
	return await resp.json();
}

async function create_code_editor(task_data) {
	const div = document.createElement('div');

	const pre = document.createElement('pre');
	pre.classList.add('highlighting');
	pre.ariaHidden = true;

	const code = document.createElement('code');
	code.classList.add('language-c');
	code.classList.add('highlighting-content');

	const textarea = document.createElement('textarea');
	textarea.classList.add('editing');
	textarea.spellcheck = false;
	data = await get_task_template(task_data['id']);
	if(!data['error']) {
		template = data['template'];
		textarea.value = template.replace(/\t/g, '    ');
	}
	textarea.addEventListener('input', async function(event) {
		update(this.value, code);
		sync_scroll(this, pre);
	});
	textarea.addEventListener('scroll', async function(event) {
		sync_scroll(this, pre);
	});
	textarea.addEventListener('keydown', async function(event) {
		check_tab(this, event);
	});
	textarea.dispatchEvent(new Event('input'));

	pre.appendChild(code);
	div.appendChild(pre);
	div.appendChild(textarea);
	return div;
}

function update(text, result_element) {
  if(!result_element) {
	  return;
  }
  // Handle final newlines (see article)
  if(text[text.length-1] == "\n") {
    text += " ";
  }
  // Update code
  result_element.innerHTML = text.replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;"); /* Global RegExp */
  Prism.highlightElement(result_element); // Syntax Highlight
}

function sync_scroll(element, result_element) {
	/* Scroll result to scroll coords of event - sync with textarea */
	// Get and set x and y
	result_element.scrollTop = element.scrollTop;
	result_element.scrollLeft = element.scrollLeft;
}

function check_tab(element, event) {
	switch(event.key) {
		case "Tab":
			let code = element.value;
			/* Tab key pressed */
			event.preventDefault(); // stop normal
			let before_tab = code.slice(0, element.selectionStart); // text before tab
			let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
			let cursor_pos = element.selectionEnd + 4; // where cursor moves after tab - moving forward by 1 char to after tab
			element.value = before_tab + "    " + after_tab; // add tab char
			// move cursor
			element.selectionStart = cursor_pos;
			element.selectionEnd = cursor_pos;
			update(element.value); // Update text to include indent
			break;
	}
}

init();
