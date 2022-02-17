---
title: Python. Первый проект. Регистрация
published: true
tag: python
lang: ru
---

Эта статья из цикла статей ["Первый проект"](/python-first-project-ru), в которых я шаг за шагом показываю как разработать систему, близкую по сложности к реальной.

В этой статье я реализую регистрацию, а в следующей -- авторизацию по логину/паролю. Для фреймворка Flask уже есть готовое решение для этой задачи: [flask\_login](https://www.askpython.com/python-modules/flask/flask-user-authentication). С целью постижения глубинной природы вещей, я покажу как реализовать это самому, без использования сторонних библиотек.

# Новые endpoint'ы

Расширю простейший веб-сервер и добавлю двe новых конечных точки (endpont):

* login
	* GET:
		* Возвращает HTML страницу для логина
	* POST:
		* Будет принимает введённое пользователем имя
		* Если такого пользователя ещё нет, то регистрирует его в базе данных
		* Если не получилось зарегистрировать, то возвращает ошибку
		* Записывает имя пользователя в cookie (про cookie ниже)
		* Возвращает "успех"
* profile
	* GET:
		* Проверяет какое имя записано в cookie
		* Если такой пользователь зарегистрирован, то возвращает страницу с приветствием
		* Если пользователь неизвестен, то возвращает страницу с предложением залогиниться/зарегистрироваться

# Cookie

Cookie (печенька) -- файл с данными сайта, хранящийся на машине пользователя. При заходе на сайт, пользователь отправляет cookie для этого сайта.

С помощью cookie, веб-сервер может сохранять какие-либо данные на машине пользователя. В основном это используется для того, чтобы понять что этот пользователь уже логинился на сайте. Кроме этого в cookie можно записать дополнительную информацию -- например какую страницу пользователь просматривал в последний раз, где остановился, какую цветовую схему предпочитает.

Без cookie веб сервер никак не сможет понять из под какого пользователя ты заходишь -- для веб сервера все запросы почти одинаковы.

В этой статье я покажу как записать в cookie имя пользователя, чтобы при заходе на сервер мы могли его узнать по этому имени.

# Реализация

Так как со временем размер проекта сильно вырастет, я решил не вставлять весь код в статью, а создать [отдельный репозиторий](https://gitlab.com/kee-reel/python-tutorial-web-courses/-/tree/main/1_registration) со всеми файлами проекта. Его можно скачать себе и запустить, а можно посмотреть содержимое отдельных файлов.

Я добавил HTML шаблоны для главной страницы и страниц логина и профиля:

* Главная -- index.html

* Логин -- login.html

* Профиль -- profile.html

> Не забываем что файлы шаблонов должны лежать в папке "templates", чтобы Flask смог их найти.

На сервере я изменил логику основного файла и добавил два файла:

* \_\_main\_\_.py -- добавил два endpoint'а и логику обработки запросов

* database.py -- где будет реализован класс DB, для работы с базой данных. Объект этого класса создаётся глобально в этом же файле -- вся логика взаимодействует с базой данных через этот объект

* user.py -- где будет реализован класс User, для работы с пользовательскими данными

В основном файле я, кроме изменения логики, добавил 5 новых импортов:

* render\_template -- подготовка HTML шаблона
* request -- объект из которого можно получить параметры POST запроса
* make\_response -- подготовка ответа на POST запрос (нужен чтобы прокинуть cookie пользователю)
* redirect -- подготовка ответа на GET/POST запрос, который позволит перенаправить пользователя на другой endpoint
* jsonify -- подготавливает данные для ответа клиенту в JSON формате

Получилось такое поведение веб-сервера:

![Страницы](/assets/images/python-web-registration-basic.png)

Моменты, которые стоит явно выделить:

* Имя пользователя хранится в cookie и на сервере.
* Если пользователь почистит кэш и удалит cookie (или зайдёт с другого браузера/компьютера), то веб сайт его не узнает и попросит залогиниться/зарегистрироваться.
* Если при логине он укажет имя, которое уже содержится в базе данных, то это имя только добавится в cookie (не будет добавляться в базу данных).
* Сейчас, любой пользователь может зайти из под любого пользователя, так как пользователь не указывает пароль, и всё что нужно для логина -- это знать имя пользователя.

В следующей статье я опишу то, как сделать авторизацию пользователя по паре логин/пароль, чтобы обезопасить профиль пользователя.