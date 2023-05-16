---
language: ru
title: C++. Инкапсуляция
date: 2022-04-03
tag: cpp
---

> Я буду основываться на коде, приведённом в основной [статье](../classes) про классы.

**Инкапсуляция** -- позволяет скрыть детали реализации.

Ты когда-нибудь пробовал разобрать свой телефон или ноутбук? Это очень сложный процесс, который как-будто специально сделан максимально трудоёмким для пользователя. Зачем это нужно его создателям?

![Разбор ноутбука](/assets/images/laptop-repair.png)

Если бы это было очень просто, то ты бы мог залезть "просто посмотреть" и случайно что-то сломать в этом сложном устройстве.

Так вот на программирование это переносится идеально. Только вместо устройства здесь твои классы, а вместо пользователя другие разработчики.

Если ты не затруднишь доступ к чувствительным местам своих классов, то есть хорошая вероятность, что другой разработчик чего-то в нём не поймёт и сломает всё к чертям :)

В рамках этой статьи я рассмотрю инкапсуляцию -- способ сокрытия переменных и методов от шаловливых ручек разработчиков.

# Проблема доступа ко внутренним переменным

Напомню то, как я объявлял класс до этого:

```cpp
class Coffee
{
public:
	Coffee(const char *type, int temperature, int volume) {...}
	~Coffee() {...}
	void drink(int ml_to_drink) {...}

	char *m_type;
	int m_temperature;
	int m_volume;
};
```

Если я создам объект этого класса, то я смогу вызвать любой метод и обратиться к любому полю:

```cpp
int main()
{
	Coffee public_coffee("latte", 30, 100);
	public_coffee.drink(100);
	public_coffee.m_type = "random_shit";
	public_coffee.m_temperature = -666;
	public_coffee.m_volume = -100;
}
```

В этом примере всё, кроме создания класса и вызова метода `drink()` ломает поведение программы. Да, ты можешь сказать, что это очень странные действия, и так никто не будет делать. А что если я приведу такую ситуацию:

* На работе, при решении какой-то задачи, ты написал класс Coffee, но не защитил внутренние поля
* Какого-то другого программиста попросили решить задачу с помощью твоего класса Coffee
* Он должен:
	* Создать объект
	* Считать с клавиатуры число
	* "Выпить" считанный объём кофе

Вот как он это сделал:

```cpp
int main()
{
	Coffee public_coffee("latte", 30, 100);
	int ml_to_drink;
	std::cin >> ml_to_drink;
	public_coffee.m_volume -= ml_to_drink;
}
```

Уже видишь проблему? Из-за того, что он не воспользовался методом `drink()`, вполне возможна ситуация, что `m_volume` уйдёт в отрицательные значения.

# Спецификаторы доступа

Скорее всего ты уже давно заметил, что в объявлении класса написан какой-то `public` -- что это значит?

`public` это спецификатор доступа. Спецификатор доступа определяет, кто может обращаться к указанным полям и методам.

В С++ существует три спецификатора доступа:

* public -- к полям и методам объекта можно обращаться откуда угодно
* private -- к полям и методам объекта можно обращаться только внутри методов класса
* protected -- к полям и методам объекта можно обращаться внутри методов класса и классов-наследников

`protected` мы разберём в статье про наследование, а пока давай сфокусируемся на `public` и `private`.

Вернёмся к проблеме, которую создал другой программист:

```cpp
int main()
{
	Coffee public_coffee("latte", 30, 100);
	int ml_to_drink;
	std::cin >> ml_to_drink;
	public_coffee.m_volume -= ml_to_drink;
}
```

Сейчас, поле `m_volume` у нас `public`, но нам ничего не мешает сделать его `private`:

```cpp
class Coffee
{
public:
	Coffee(const char *type, int temperature, int volume) {...} // всё ещё public
	~Coffee() {...} // всё ещё public
	void drink(int ml_to_drink) {...} // всё ещё public
private:
	char *m_type; // теперь private
	int m_temperature; // теперь private
	int m_volume; // теперь private
};
```

После занесения полей под `private`, при попытке написать такой код, другой программист поймает ошибку компиляции:

```
main.cpp: In function ‘int main()’:
main.cpp:52:23: error: ‘int Coffee::m_volume’ is private within this context
52 |		 public_coffee.m_volume -= ml_to_drink;
   |					   ^~~~~~~~
main.cpp:45:13: note: declared private here
45 |		 int m_volume;
   |			 ^~~~~~~~
```

Теперь, мы не оставили ему выбора, кроме как нормально изменить объём, вызвав метод `drink`:

```cpp
int main()
{
	Coffee public_coffee("latte", 30, 100);
	int ml_to_drink;
	std::cin >> ml_to_drink;
	public_coffee.drink(ml_to_drink);
}
```

> Если ты всё ещё сомневаешься, что кто-то будет делать глупые вещи, то представь, что у этого программиста выдалась бессонная ночь, у него проблемы в семье и сегодня дедлайн -- ему лишь бы сделать. Всякое бывает в жизни, так что лучше перестраховаться.

# Вызов метода из другого метода

Иногда, методы по своей функциональности могут быть очень похожи -- в этих случаях очень удобно вызывать метод из другого метода. И при этом не важно -- `public` это или `private` -- все поля и **методы** класса доступны внутри методов класса.

Например, у меня есть метод `drink`, уменьшающий объём на произвольное количество миллилитров, и метод `sip` (маленький глоток), уменьшающий объём на 15 миллилитров.

```cpp
class Coffee {
public:
	Coffee(const char *type, int temperature, int volume) {...}
	~Coffee() {...}
	void drink(int ml_to_drink)
	{
		// Проверка, чтобы последний глоток кофе не вычел больше, чем осталось
		ml_to_drink = m_volume > ml_to_drink ? ml_to_drink : m_volume;
		m_volume -= ml_to_drink;;
		std::cout << "Drank " << ml_to_drink << "ml of " << m_type << "." << std::endl;
	}
	void sip()
	{
		// Такая же проверка
		int ml_to_drink = m_volume > 15 ? 15 : m_volume;
		m_volume -= ml_to_drink;;
		std::cout << "Drank " << ml_to_drink << "ml of " << m_type << "." << std::endl;
	}
private:
	char *m_type;
	int m_temperature;
	int m_volume;
};
```

В методе `sip` можно воспользоваться уже готовой функциональностью метода `drink`, чтобы не писать по 100 раз одно и то же:

```cpp
class Coffe {
public:
	Coffee(const char *type, int temperature, int volume) {...}
	~Coffee() {...}
	void drink(int ml_to_drink)
	{
		// Проверка, чтобы последний глоток кофе не вычел больше, чем осталось
		ml_to_drink = m_volume > ml_to_drink ? ml_to_drink : m_volume;
		m_volume -= ml_to_drink;;
		std::cout << "Drank " << ml_to_drink << "ml of " << m_type << "." << std::endl;
	}
	void sip()
	{
		drink(15);
	}
private:
	char *m_type;
	int m_temperature;
	int m_volume;
};
```

Удобно, правда? \*sip\*

# Приватные методы

Иногда, в нескольких методах может дублироваться какой-то код -- тогда его можно вынести в приватный метод.

Например, у меня есть метод `drink`, уменьшающий объём, и метод `refill` (наполнить), увеличивающий объём.

При этом, у меня добавится **новое поле** `m_max_volume`, которое ограничивает макисмальный объём кружки.

```cpp
class Coffee {
public:
	Coffee(const char *type, int temperature, int volume, int max_volume) {...}
	~Coffee() {...}
	void drink(int ml_to_drink)
	{
		// Проверка, чтобы последний глоток кофе не вычел больше, чем осталось
		ml_to_drink = m_volume > ml_to_drink ? ml_to_drink : m_volume;
		m_volume -= ml_to_drink;;
		std::cout << "Drank " << ml_to_drink << "ml of " << m_type << "." << std::endl;
	}

	void refill(int ml_to_refill)
	{
		// Проверка, чтобы наполнение кружки не наполнило больше, чем возможно
		ml_to_refill = (m_max_volume - m_volume) > ml_to_refill ? ml_to_refill : (m_max_volume - m_volume);
		m_volume += ml_to_refill;;
		std::cout << "Refilled " << ml_to_refill << "ml of " << m_type << "." << std::endl;
	}
private:
	char *m_type;
	int m_temperature;
	int m_volume;
	int m_max_volume;
};
```

Я бы мог вынести логику изменения объёма кофе в отдельный метод:

```cpp
class Coffee {
public:
	Coffee(const char *type, int temperature, int volume, int max_volume) {...}
	~Coffee() {...}
	void drink(int ml_to_drink)
	{
		change_volume(-ml_to_drink);
	}
	void refill(int ml_to_refill)
	{
		change_volume(ml_to_refill);
	}
private:
	void change_volume(int change_ml)
	{
		m_volume += change_ml;
		if(m_volume < 0)
			m_volume = 0;
		else if(m_volume > m_max_volume)
			m_volume = m_max_volume;
		else
			m_volume += ml_to_drink;
		std::cout << (change_ml < 0 ? "Drank" : "Refilled") << change_ml << "ml of " << m_type << "." << std::endl;
	}
private:
	char *m_type;
	int m_temperature;
	int m_volume;
	int m_max_volume;
};
```

Таким образом, я сделал приватный метод, который позволит другим методам удобно и безопасно изменять переменную `m_volume`.

На будущее запомни -- если один из методов используется только твоими методами, то делай его приватным. Это облегчит процесс изучения твоего класса другими программистами -- обычно они вчитываются только в публичные методы.

И последнее -- я написал `private` два раза, хотя достаточно только первого, перед методом `change_volume`. Я это обычно делаю для того, чтобы визуально разделить объявления методов и полей. Если тебе такое не нравится, то можешь писать спецификатор доступа только один раз.

# Структуры и спецификатор доступа по умолчанию

Помнишь, в языке Си были структуры? Вот так с ними можно было работать:

```c
#include <stdio.h>
struct Person {
	int age;
	char name[50];
	char last_name[50];
};

int main(int argc, char *argv[])
{
	struct Person p;
	scanf("%d%s%s", &p.age, &p.name, &p.last_name);
	// 10 ivan ivanovich
	p.age += 10;
	strcat(p.name, "XXX");
	strcat(p.last_name, "YYY");
	printf("%d %s %s\n", p.age, p.name, p.last_name);
	// 20 ivanXXX ivanovichYYY
	return 0;
} 
```

Ничего не напоминает? ;)

Да, структуры это классы без методов! Или всё-таки с методами?

Давай перейдём на C++ и попробуем добавить метод в структуру:

```cpp
#include <iostream>
#include <cstring>
struct Person {
	int age;
	char name[50];
	char last_name[50];
	void read()
	{
		std::cin >> age >> name >> last_name;
	}
	void print()
	{
		std::cout << age << name << last_name;
	}
};

int main(int argc, char *argv[])
{
	Person p;
	p.read();
	// 10 ivan ivanovich
	p.age += 10;
	strcat(p.name, "XXX");
	strcat(p.last_name, "YYY");
	p.print();
	// 20 ivanXXX ivanovichYYY
	return 0;
} 
```

Сработало... А в чём же тогда разница???

А в том, что в `struct` по умолчанию спецификатор доступа это `public`, а в `class` это `private`. Давай попробуем в коде выше заменить `struct` на `class`.

При компиляции возникнет 5 ошибок -- на каждое обращение к полю или методу объекта "p". Одна из них:

```
main.c: In function ‘int main(int, char**)’:
main.c:16:11: error: ‘void Person::read()’ is private within this context
   16 |	 p.read();
	  |	 ~~~~~~^~
main.c:7:10: note: declared private here
	7 |	 void read()
	  |		  ^~~~
```

То есть, если мы пишем `class`, то компилятор сам вставляет `private` на первой строчке определения класса.

Мораль такая -- что `struct`, что `class` -- в C++ ничем кроме спецификатора доступа не отличаются.

Несмотря на всё это, `struct` обычно содержит только поля, и туда не добавляются методы.

> Я понимаю твоё замешательство, но `struct` так работает из-за того, что C++ поддерживает обратную совместимость с Си.

# friend

Иногда возникает необходимость закрыть доступ к полям/методам для всех **кроме** определённой функции или класса.

Давай рассмотрим на примере -- я хочу сделать функцию (не метод!), которая будет выводить информацию по всем полям класса Coffee:

```cpp
void print_info(Coffee &cup)
{
	std::out << << "Cup of " cup.m_type << << " coffee: volume (" << cup.m_volume << 
		"/" << cup.m_max_volume << ")ml, temperature " << cup.m_temperature << std::endl;
}
```

Эта функция обращается к `private` полям класса, так что при компиляции вылезет куча ошибок такого вида:

```
main.cpp: In function ‘void print_info(Coffee&)’:
main.cpp:17:35: error: ‘char* Coffee::m_type’ is private within this context
17 |	 std::cout << "Cup of " << cup.m_type << " coffee: volume (" << cup.m_volume <<
   |								   ^~~~~~
```

Ну да, всё правильно -- мы не можем обращаться к этим полям, потому что они `private`.

Однако, если мы хотим дать **функции print_info** возможность обращаться к `private` (и `protected`) полям класса Coffe, то мы можем это сделать, добавив в определение класса такую строчку:

```cpp
void print_info(Coffee &cup) {...}

class Coffee {
public:
	Coffee(const char *type, int temperature, int volume, int max_volume) {...}
	~Coffee() {...}
	void drink(int ml_to_drink) {...}
	void refill(int ml_to_refill) {...}
private:
	void change_volume(int change_ml) {...}
private:
	char *m_type;
	int m_temperature;
	int m_volume;
	int m_max_volume;

	friend void print_info(Coffee &cup);
};
```

Теперь код скомпилируется без ошибок, и можно будет попробовать вызвать функцию `print_info`:

```cpp
int main(int argc, char *argv[])
{
	Coffee cup("americano", 50, 75, 100);
	print_info(cup);
	// Cup of americano coffee: volume (75/100)ml, temperature 50
	return 0;
} 
```

На самом деле, такую функцию лучше было бы сделать методом, но есть пример функции, которую можно сделать только через `friend` -- функция для потокового ввода/вывода.

### Переопределение функции потокового ввода/вывода

```cpp
std::ostream& operator<<(std::ostream &out, Coffee &cup)
{
	out << << "Cup of " cup.m_type << << " coffee: volume (" << cup.m_volume << 
		"/" << cup.m_max_volume << ")ml, temperature " << cup.m_temperature << std::endl;
	return out;
}

std::istream& operator>>(std::istream &in, Coffee &cup)
{
	in >> cup.m_volume >> cup.m_max_volume >> cup.m_temperature;
	return in;
}
```

Ээээ... Что это за заклинание?

Давай разберёмся:

* `std::ostream` -- это класс, который занимается организацией потокового вывода, объект этого класса ты уже встречал -- это `std::cout`
* `std::istream` -- это класс, который занимается организацией потокового ввода, и его ты встречал -- это `std::cin`
* `operator<<` -- это функция, которая вызывается не через имя (как, например, `print_info`), а через использование оператора `<<` (дальше увидим)
* `operator>>` -- а эта функция вызывается через использование оператора `>>`
* У обоих функций по два параметра -- объект класса, который работает с потовым вводом/выводом, и объект класса Coffee
* Они возвращают сами себя, чтобы можно было объединять вызов таких функций в цепочки, каждый раз заново вызывая эту же функцию, но для нового значения: `std::cout << a << b << c;`

> Да, операторы могут быть не только методами класса, но и отдельными функциями.

Вот как эти функции будут использоваться:

```cpp
int main(int argc, char *argv[])
{
	Coffee cup("americano", 50, 75, 100);
	// ! Видишь, функция вызывается через оператор <<
	std::cout << cup;
	// Cup of americano coffee: volume (75/100)ml, temperature 50
	// ! Ввожу 10 20 30
	std::cin >> cup;
	std::cout << cup;
	// Cup of americano coffee: volume (10/20)ml, temperature 30
	return 0;
} 
```

> Раскрою странное знание: я мог бы вызвать функции не через оператор, а через имя функции вот так: `operator>>(std::cin, cup)` и `operator<<(std::cout, cup)`, но так никто обычно не делает.

Смотри-ка, теперь вводить и выводить информацию стало проще! Но мы забыли про главное -- сказать что они `friend` для Coffee:

```cpp
std::ostream& operator<<(std::ostream &out, Coffee &cup) {...}
std::istream& operator>>(std::istream &in, Coffee &cup) {...}

class Coffee {
public:
	Coffee(const char *type, int temperature, int volume, int max_volume) {...}
	~Coffee() {...}
	void drink(int ml_to_drink) {...}
	void refill(int ml_to_refill) {...}
private:
	void change_volume(int change_ml) {...}
private:
	char *m_type;
	int m_temperature;
	int m_volume;
	int m_max_volume;

	friend std::ostream& operator<<(std::ostream &out, Coffee &cup);
	friend std::istream& operator>>(std::istream &in, Coffee &cup);
};
```

Вот, так то лучше!

### friend class

И ещё -- я не буду рассматривать во всех красках, но ещё мы можем разрешать доступ к `private` полям/методам своего класса другим классам:

```cpp
class Vending {...}

class Coffee {
public:
	Coffee(const char *type, int temperature, int volume, int max_volume) {...}
	~Coffee() {...}
	void drink(int ml_to_drink) {...}
	void refill(int ml_to_refill) {...}
private:
	void change_volume(int change_ml) {...}
private:
	char *m_type;
	int m_temperature;
	int m_volume;
	int m_max_volume;

	friend class Vending;
};
```

Класс `Vending` сможет обратиться к любым полям/методам класса `Coffee`. Это используется в исключительных случаях, о которых мы возможно поговорим в будущем -- сейчас просто отложи это в памяти.


# Заключение

Итого, мы изучили:

* Инкапсуляция (сокрытие деталей реализации)
* Спецификаторы доступа
	* public -- все могут
	* private -- только сам класс
	* protected -- только сам класс и его наследники (узнаем в статье про наследование)
* Вызов метода из метода -- обобщай и властвуй
* Приватный метод -- выносим общий код во внутренний метод
* Спецификатор доступа по умолчанию -- `struct`-`public`, `class`-`private`
* friend -- разрешаем доступ функции/классу к приватным полям/классам своего класса
* Операторы потокового ввода/вывода -- удобный способ вводить/выводить информацию о классе

Если что -- пиши, я помогу и постараюсь объяснить лучше.
