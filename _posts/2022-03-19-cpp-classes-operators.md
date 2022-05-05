---
title: C++. Переопределение операторов
published: true
tag: cpp
lang: ru
---

Прежде чем я расскажу про операторы в классах, давай я приведу пример, от которого будем отталкиваться.

> Я буду основываться на коде, приведённом в основной [статье](/cpp-classes) про классы.

Например, я хочу добавить возможность переливать кофе из одной кружки в другую (ты очень любишь кофе, а твой друг не допил).

Я мог бы добавить в класс Coffee новый метод pour (англ. -- налить):

```cpp
void pour(Coffee &other_cup)
{
    // Сравниваем адреса объектов, чтобы понять что это разные объекты
    if(this == &other_cup)
    {
        std::cout << "Can't pour one cup into itself!" << std::endl;
    }
    // Сливаем только одинаковый тип кофе (чтобы не получить бурду)
    else if(!strcmp(m_type, other_cup.m_type))
    {
        // Предположим, что у нас бесконечно глубокая кружка
        std::cout << "Poured " << other_cup.m_volume << "ml of" << m_type << " from one cup to another." << std::endl;
		m_volume += other_cup.m_volume;
		other_cup.m_volume = 0;
    }
    else
    {
        std::cout << "Coffee types " << m_type << " and " << other_cup.m_type << " doesn't match!" << std::endl;
    }
}
```

> Смотри, я использовал "this" чтобы внутри метода получить адрес текущего объекта. Запомни "this" -- он периодически пригождается.

Теперь можно будет переливать из одной кружки в другую:

```cpp
int main()
{
    Coffee c1("espresso", +60, 50); 
    // Created 50ml cup of hot espresso coffee.
    Coffee c2("americano", +45, 100);
    // Created 100ml cup of warm americano coffee.
    Coffee c3("americano", +45, 200);
    // Created 200ml cup of warm americano coffee.
    c3.pour(c3);
    // Can't pour one cup into itself!
    c3.pour(c1);
    // Coffee types americano and espresso doesn't match!
    c3.pour(c2);
    // Poured 100ml ofamericano from one cup to another.
    c2.drink(500);
    // No americano left :(
    c3.drink(500);
    // Drank 300ml of americano.
    return 0;
    // Destructed americano.
    // Destructed americano.
    // Destructed espresso.
}
```

Иногда, определённые методы вызываются очень часто, и чтобы облегчить работу с ними, можно, вместо использования обычного метода, можно переопределить оператор:

```cpp
void operator<<(Coffee &other_cup)
{
    // Сравниваем адреса объектов, чтобы понять что это разные объекты
    if(this == &other_cup)
    {
        std::cout << "Can't pour one cup into itself!" << std::endl;
    }
    // Сливаем только одинаковый тип кофе (чтобы не получить бурду)
    else if(!strcmp(m_type, other_cup.m_type))
    {
        // Предположим, что у нас бесконечно глубокая кружка
        std::cout << "Poured " << other_cup.m_volume << "ml of" << m_type << " from one cup to another." << std::endl;
		m_volume += other_cup.m_volume;
		other_cup.m_volume = 0;
    }
    else
    {
        std::cout << "Coffee types " << m_type << " and " << other_cup.m_type << " doesn't match!" << std::endl;
    }
}
```

А переливание кофе будет выглядеть так:

```cpp
Coffee c1("espresso", +60, 50); 
// Created 50ml cup of hot espresso coffee.
Coffee c2("americano", +45, 100);
// Created 100ml cup of warm americano coffee.
Coffee c3("americano", +45, 200);
// Created 200ml cup of warm americano coffee.
c3 << c3;
// Can't pour one cup into itself!
c3 << c1;
// Coffee types americano and espresso doesn't match!
c3 << c2;
// Poured 100ml of americano from one cup to another.
c2.drink(500);
// Drank 0ml of americano.
c3.drink(500);
// Drank 300ml of americano.
return 0;
// Destructed americano.
// Destructed americano.
// Destructed espresso.
```

Как видишь, не особо много поменялось -- просто метод теперь вызывается иначе.

Мы можем переопределить почти все операторы (в примерах "a" -- наш класс, "b" -- параметр):

* Присваивания: `a = b`, `a += b`, `a -= b`, `a \*= b`, `a /= b`, `a %= b`, `a &= b`, `a |= b`, `a ^= b`, `a <<= b`, `a >>= b`
* Инкремента/декремента: `a++`, `++a`, `a--`, `--a`
* Арифметические: `+a`, `-a`, `a + b`, `a - b`, `a * b`, `a / b`, `a % b`
* Битовые: `~a`, `a & b`, `a | b`, `a ^ b`, `a << b`, `a >> b`
* Логические: `!a`, `a && b`, `a || b`
* Сравнения: `a == b`, `a != b`, `a < b`, `a > b`, `a <= b`, `a >= b`
* Индексации: `a[b]`
* Вызова: `a(b)`
* Потокового ввода/вывода: `std::cin >> a`, `std::cout << a`
* Доступа к полю: `a->b`

> Я перечислил большинство операторов, но если ты хочешь увидеть ещё парочку экзотичесих или узнать как определить тот или иной оператор -- посмотри [здесь](https://en.cppreference.com/w/cpp/language/operators).

Давай рассмотрим парочку моментов, которые пригодятся тебе при переопределении любого оператора.

### Возвращаем себя

Для примера, переопределим ещё постфиксный оператор "++" -- он будет "доливать" 1 миллилитр кофе:

```cpp
Coffee& operator++(int)
{
    std::cout << "Аdded 1ml of " << m_type << "." << std::endl;
    m_volume++;
    return *this;
}
```

> Обрати внимание, что я указал int в параметрах -- он нужен только для того, чтобы различать переопределение постфиксного оператора от префиксного.
> Для префиксного оператора в параметрах ничего не указывается: `Coffee& operator++()`

```cpp
Coffee c1("americano", 75, 100);
// Constructed 100ml cup of hot americano coffee. 
c1++;
// Added 1ml of americano.
c1.drink(200);
// Drank 101ml of americano.
```

Обрати внимание на то, что мы возвращаем сами себя -- Coffee& (объект по ссылке). Можно и без этого, но благодаря этому можно делать так:

```cpp
Coffee c1("americano", 75, 100);
// Constructed 200ml cup of hot americano coffee. 
(c1++).drink(200);
// Added 1ml of americano.
// Drank 101ml of americano.
```

Если тебе не нужно такое поведение, то можешь возвращать void.

### Возвращаем новый объект

Иногда, нужно вернуть новый объект -- чаще всего такое встречается с арифметическими операторами.

Давай переопределим оператор "+" -- это мы будем сливать кофе из двух кружек в одну новую:

```cpp
Coffee operator+(Coffee &other)
{
    // Создали пустую кружку
    Coffee new_cup(m_type, m_temperature, 0);
    // Сливаем туда себя и вторую кружку
    new_cup << *this;
    new_cup << other;
    return new_cup;
}
```

Обрати внимание, что я возвращаю объект по значению (написал Coffee, а не Coffee&) -- в main() вернётся копия new\_cup, а не она сама.

Вот как он используется и что выведется:

```cpp
Coffee c1("americano", 75, 125);
// Constructed 125ml cup of hot americano coffee. 
Coffee c2("americano", 75, 25);
// Constructed 25ml cup of hot americano coffee. 
Coffee c3 = c1 + c2;
// Constructed 0ml cup of hot americano coffee. 
// Poured 125ml of americano from one cup to another.
// Poured 25ml of americano from one cup to another.
c1.drink(20);
// Drank 0ml of americano.
c2.drink(20);
// Drank 0ml of americano.
c3.drink(20);
// Drank 20ml of americano.
```

### Не возвращай локальные переменные по ссылке!

В примере выше я возвращал локальную переменную new\_cup по значению -- а что было бы, если я вернул её по ссылке?

```cpp
Coffee& operator+(Coffee &other)
{
    // Создали пустую кружку
    Coffee new_cup(m_type, m_temperature, 0);
    // Сливаем туду себя и вторую кружку
    new_cup << *this;
    new_cup << other;
    return new_cup;
}
```

При компиляции я получаю следующие предупреждения:

```
test.cpp:105:12: warning: reference to local variable ‘new_cup’ returned [-Wreturn-local-addr]
105 |     return new_cup;
    |            ^~~~~~~
test.cpp:101:12: note: declared here
101 |     Coffee new_cup(m_type, m_temperature, 0);
    |            ^~~~~~~
```

При запуске я ловлю экстренное прерывание программы:

```cpp
Coffee c1("americano", 75, 125);
// Constructed 125ml cup of hot americano coffee. 
Coffee c2("americano", 75, 25);
// Constructed 25ml cup of hot americano coffee. 
Coffee& c3 = c1 + c2;
// Constructed 0ml cup of hot americano coffee. 
// Poured 125ml of americano from one cup to another.
// Poured 25ml of americano from one cup to another.
// Destructed americano.
c1.drink(20);
// Drank 0ml of americano.
c2.drink(20);
// Drank 0ml of americano.
c3.drink(20);
// Segmentation fault (core dumped)
```

Вот последовательность событий:

* Вызов operator+()
* Создание локальной переменной new\_cup
* Вызов операторов "переливания" для this и other
* Возвращение new\_cup в main и сохранение его в c3 (обрати внимание, что я указал тип переменной как Coffee&, чтобы не было копирования)
* Удаление локальной переменной new\_cup (память под этот объект полностью освобождена)
* Выход из operator+()
* Вызов drink() для нормальных c1 и c2
* Попытка вызвать drink() у объекта c3, которого уже не существует

Если сложно понять что происходит, то можно представить что new\_cup возвращается через указатель:

```cpp
Coffee* operator+(Coffee &other)
{
    Coffee new_cup(m_type, m_temperature, 0);
    new_cup << *this;
    new_cup << other;
    return &new_cup;
}
```

А в main():

```cpp
// Вывод такой же как в прошлом примере
Coffee c1("americano", 75, 125);
Coffee c2("americano", 75, 25);
Coffee* c3 = c1 + c2;
c1.drink(20);
c2.drink(20);
c3->drink(20);
```

# Заключение

Уфффф! Если операторы ещё более-менее понятны, то вот с этими ссылками было жёстко!

Ладно, я надеюсь, что у меня получилось разобрать и собрать у тебя в голове этот паззл. Если нет, то пиши -- я отвечу на все вопросы.

Дальше на очереди -- окончательно разбираемся с [конструкторами](/cpp-classes-constructors).
