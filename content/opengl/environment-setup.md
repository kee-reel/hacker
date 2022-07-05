---
title: OpenGL/C++. Установка окружения
date: 2021-10-03
tag: opengl-cpp
lang: ru
---

В этой статье я расскажу как подготовить окружение для изучения OpenGL на C++.

Сразу скажу -- я опираюсь на материалы сайта [opengl-tutorial.org](http://www.opengl-tutorial.org). Можешь прямо сейчас перейти туда, и узнать там всё то же самое.

Для чего тогда дублировать материал и писать одно и то же? У меня есть 3 причины:

* Мой [pull-request](https://github.com/opengl-tutorials/ogl/pull/116) с исправлениями в русской локализации, на момент написания этой статьи висит уже месяц -- похоже владелец сайта подзабил на свой проект
* Из-за того, что автор сайта подзабил на свой проект, некоторая информация уже устарела (в QtCreator теперь есть нативная поддержка CMake, и установка из-за этого ускоряется в разы)
* Так я лучше разберусь в материале, так как для написания хорошей статьи придётся закопаться поглубже в предмет

# Установка на Windows

* Если никогда не ставил драйверы для видеокарты -- поставь сейчас. Если уже стоят, то всё норм.

* [Скачай](https://www.qt.io/download-thank-you) Qt + Qt Creator

Для установки придётся зарегистрироваться у них на [сайте](https://login.qt.io/login). Если очень не хочется, то напиши мне -- я скину свои креды, чтобы ты их ввёл при установке.

При установке Qt выбери "Qt 6.X for desktop development":

![Установка Qt](/assets/images/cpp-opengl-qt-install.png)

После всего этого у тебя установится:

* Фреймворк Qt: C:/Qt
* IDE QtCreator: C:/Qt/Tools/QtCreator/bin/qtcreator.exe
* CMake: C:/Qt/Tools/CMake_64/bin/cmake.exe

### Возможные проблемы при установке

> Если возникнут какие-то проблемы, то пиши мне -- решим вместе и я допишу их решение здесь.

* "Не найдена библиотека MSVCP140.dll" -- скачай [это](https://aka.ms/vs/16/release/vc_redist.x86.exe), взял [отсюда](https://docs.microsoft.com/en-US/cpp/windows/latest-supported-vc-redist?view=msvc-160)

# Установка на Linux

* Установи необходимые библиотеки:

```bash
sudo apt install cmake make g++ libx11-dev libxi-dev libgl1-mesa-dev libglu1-mesa-dev libxrandr-dev libxext-dev libxcursor-dev libxinerama-dev libxi-dev
```

* [Скачай](https://www.qt.io/download-thank-you) Qt + Qt Creator

Для установки придётся зарегистрироваться у них на [сайте](https://login.qt.io/login). Если очень не хочется, то напиши мне -- я скину свои креды, чтобы ты их ввёл при установке.

При установке Qt выбери "Qt 6.X for desktop development".

После всего этого у тебя установится:

* Фреймворк Qt: ~/Qt
* IDE QtCreator: ~/Qt/Tools/QtCreator/bin/qtcreator
* CMake: ~/Qt/Tools/Cmake/bin/cmake

# Запускаем проект

Скачай [этот](https://github.com/opengl-tutorials/ogl/archive/master.zip) архив и распакуй куда удобно. Архив взят с сайта [opengl-tutorial.org](http://www.opengl-tutorial.org).

Открой QtCreator:

* Нажми Ctrl+O (или выбери опцию "Open File or Project...")
* Найди папку с распакованным архивом -- она называется "ogl-master"
* В этой папке открой файл "CMakeLists.txt" -- откроется весь проект
* В левом нижнем углу нажми на проект (как на скриншоте):

![Проект QtCreator](/assets/images/cpp-opengl-qtcreator-project.png)

* Ты увидишь все подпроекты этого проекта -- найди в этом списке tutorial01_first_window, и выбери его
* После этого нажми на зелёный треугольник (без жука) в левом нижнем углу -- выбранный подпроект соберётся и (надеюсь) запустится

Откроется вот такое шикарное пустое окно:

![Установка Qt](/assets/images/cpp-opengl-first-window.png)

Если ты дошёл до этого момента и даже ничего не сломалось, то поздравляю -- ты успешно настроил окружение для дальнейшего обучения!

# [](#header-1)Заключение

Скорее всего что-то пойдёт не так в процессе установки, поэтому пиши сразу, как запахнет жареным!

В [следующей статье](/first-window) мы уже разберём как это шикарное пустое окно создалось и показалось.
