function init() {
	for(var e of document.getElementsByClassName('test_section')) {
		const login = document.createElement('div');
		login.classList.add('login');

		const email_label = document.createElement('label');
		email_label.classList.add('login_label');
		email_label.innerHTML = 'Login:';
		const email = document.createElement('input');
		email.classList.add('login_field');

		const pass_label = document.createElement('label');
		pass_label.classList.add('login_label');
		pass_label.innerHTML = 'Pass:';
		const pass = document.createElement('input');
		pass.classList.add('login_field');

		const button_label = document.createElement('label');
		button_label.classList.add('login_error');
		button_label.hidden = true;
		const login_button = document.createElement('button');
		login_button.classList.add('login_button');
		login_button.innerHTML = 'Sign in to test solution';

		login.appendChild(email_label);
		login.appendChild(email);
		login.appendChild(pass_label);
		login.appendChild(pass);
		login.appendChild(button_label);
		login.appendChild(login_button);

		const source_text = create_code_editor();
		source_text.classList.add('source_text');

		const test_log = document.createElement('textarea');
		test_log.classList.add('test_log');
		test_log.rows = 10;
		test_log.cols = 80;
		test_log.readOnly = true;
		test_log.value = 'To send solution, press Ctrl+Enter inside solution text area.';

		const token = get_cookie_token();
		if(token !== null) {
			login.classList.add('hidden');
		} else {
			test_log.hidden = true;
		}

		source_text.addEventListener('keypress', async function(event) {
			if (!event.ctrlKey || event.keyCode !== 13) {
				return
			}
			this.disabled = true;
			const task_id = e.id.split('_')[1];
			await send_test(task_id, this.value, test_log);
			this.disabled = false;
		});

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

		e.appendChild(source_text);
		e.appendChild(test_log);
		e.appendChild(login);
	}
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

async function get_token(email, pass) {
	const token = get_cookie_token();
	if(token !== null) {
		return token;
	}
	const resp = await fetch(`https://kee-reel.com/cyber-cat/login?email=${email}&pass=${pass}`)
	return await resp.json()
}

async function send_test(task_id, source_text, test_log) {
	const token = await get_token();

	const formData = new FormData();
	formData.append('task_id', task_id);
	formData.append('source_text', source_text);

	test_log.value = 'Sending request...';

	const resp = await fetch(`https://kee-reel.com/cyber-cat?token=${token}`, {method: 'POST', body: formData})
	const data = await resp.json()

	if (data['error'] == null) {
		test_log.value = 'No errors';
	} else {
		var err = data['error'];
		switch(err['stage']) {
			case 'build':
				test_log.value = `Solution build error:
${err['msg']}`;
				break;
			case 'test':
				test_log.value = `Test failed:
Test parameters: ${err['params'].split(';')}
Expected result: ${err['expected']}
Actual result: ${err['result']}`;
				break;
			default:
				test_log.value = err['error'];
		}
	}
}

function create_code_editor() {
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

	pre.appendChild(code);
	div.appendChild(pre);
	div.appendChild(textarea);
	return div;
}

function update(text, result_element) {
  // Handle final newlines (see article)
  if(text[text.length-1] == "\n") {
    text += " ";
  }
  // Update code
  result_element.innerHTML = text.replace(new RegExp("&", "g"), "&amp;");
  Prism.highlightElement(result_element); // Syntax Highlight
}

function sync_scroll(element, result_element) {
	/* Scroll result to scroll coords of event - sync with textarea */
	// Get and set x and y
	result_element.scrollTop = element.scrollTop;
	result_element.scrollLeft = element.scrollLeft;
}

function check_tab(element, event) {
	if(event.key === "Tab") {
		let code = element.value;
		/* Tab key pressed */
		event.preventDefault(); // stop normal
		let before_tab = code.slice(0, element.selectionStart); // text before tab
		let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
		let cursor_pos = element.selectionEnd + 5; // where cursor moves after tab - moving forward by 1 char to after tab
		element.value = before_tab + "    " + after_tab; // add tab char
		// move cursor
		element.selectionStart = element.value.length;
		element.selectionEnd = element.selectionStart;
		update(element.value); // Update text to include indent
	}
}

init();
