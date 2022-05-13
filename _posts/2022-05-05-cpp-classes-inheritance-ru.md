---
title: C++. Наследование классов
published: false
tag: cpp
lang: ru
---

**Наследование** -- позволяет связать разные классы в иерархию таким образом, что мы можем в классе наследнике переиспользовать поля и методы, объявленные в родительском классе.

Давай сначала посмотрим на примере -- допустим, у меня есть класс `Animal`:

```cpp
class Animal
{
public:
    // Конструктор с параметрами
    Animal(int weight, int age, int max_age) :
        m_weight(weight),
        m_age(age),
        m_max_age(max_age)
    {}
    // Можем узнать старое ли это животное
    bool is_old()
    {
        return m_age > m_max_age * 0.75;
    }
    // Можем сравнить по весу с другим животным
    bool is_bigger_than(Animal &other)
    {
        return m_weight > other.m_weight;
    }
private:
    int m_weight;
    int m_age;
    int m_max_age;
};
```

Мы можем создать пару таких животных:

```cpp
int main()
{
    Animal a1(7, 13, 15), a2(108, 4, 30);
    std::cout << "First is old: " << a1.is_old() << std::endl <<
    // First is old: 1
        "Second is old: " << a2.is_old() << std::endl <<
    // Second is old: 0
        "First is bigger than second: " << a1.is_bigger_than(a2) << std::endl;
    // First is bigger than second: 0
}
```

Всё работает, но жизни как-то не хватает -- что это за животные такие абстрактные? Давай хотя бы добавим кошку и лошадь!

Кошка и лошадь являются животными, и оба могут иметь возраст и вес -- то есть мы можем для них обоих использовать базовый класс Animal.

Класс, от которого мы хотим унаследоваться, указывавается через двоеточие после названия нашего класса:

```cpp
class Cat : public Animal {
    ...
};
```
> `public` наследовании пока прими как есть - про него я расскажу дальше

Вот полный код новых классов `Cat` и `Horse`:

```cpp
class Animal {...};

class Cat : public Animal {
public:
    Cat(float fluffiness, int weight, int age) :
        Animal(weight, age, 15),
        m_fluffiness(fluffiness)
    {}
    void talk()
    {
        std::cout << "Mew mew" << std::endl;
    }
    // Сколько килограмм волос выпадет из кошки за день?
    float shed_weight()
    {
        return m_fluffiness * 0.1;
    }
private:
    // Пушистость кошки (от 0.0 до 1.0)
    float m_fluffiness;
};

class Horse : public Animal {
public:
    Horse(float speed, int weight, int age) :
        Animal(weight, age, 30),
        m_speed(speed)
    {}
    void talk()
    {
        std::cout << "Pfrrr" << std::endl;
    }
    // За сколько часов на этой лошади можно преодолеть distance километров?
    float travel(float distance)
    {
        return distance / m_speed;
    }
private:
    // Скорость лошади в километрах в час
    float m_speed;
};
```

Особенности обращения с конструкторами и деструкторами при наследовании:

* Конструкторы и деструкторы не наследуются
* Параметры конструкторов могут различаться -- например, у меня в констукторах `Cat` и `Horse` нет параметра `max_age`, и я передаю в конструктор `Animal` фиксированное значение, в зависимости от типа животного
* Если явно не вызывать конструктор базового класса из конструктора наследника, то будет вызван конструктор базового класса без параметров. Если у базового класса нет конструктора без параметров, то будет ошибка компиляции
* При создании объекта сначала вызывается конструктор родителя, то есть порядок такой: `родитель->наследник->наследник_наследника->...`
* При удалении объекта сначала вызывается деструктор самого младшего наследника, то есть порядок такой:  `...->наследник_наследника->наследник->родитель`

Осталось только изменить код в `main()`:

```cpp
int main()
{
    Cat a1(0.8, 7, 13);
    a1.talk();
    // Mew mew
    Horse a2(18, 268, 4);
    a2.talk();
    // Pfrrr
    std::cout << "Cat is old: " << a1.is_old() << std::endl <<
    // Cat is old: 1
        "Horse is old: " << a2.is_old() << std::endl <<
    // Horse is old: 0
        "Cat is bigger than horse: " << a1.is_bigger_than(a2) << std::endl <<
    // Cat is bigger than horse: 0
        "Cat will shed about " << (a1.shed_weight() * 365) << " kg of hair in a year" << std::endl <<
    // Cat will shed about 29.2 kg of hair in a year
        "Horse will travel 100km in about " << a2.travel_time(100) << " hours" << std::endl;
    // Horse will travel 100km in about 20.8333 hours
}
```

То есть у наших кошки и лошади всё так же можно вызвать методы `is_old()` и `is_bigger_than()`, но при этом, у каждого из них есть свои уникальные методы `shed_weight()` и `travel_time()`.

### Спецификатор доступа protected

И это касается не только методов -- поля `m_weight`, `m_age` и `m_max_age` тоже могут быть унаследованы -- то есть мы сможем их использовать в `Cat` и `Horse`.

Например, давай сделаем так, что кошка будет меньше линять к старости:

```cpp
    float shed_weight()
    {
        // Приводим к float чтобы получить вещественное деление
        float age_multiplier = (float)(m_max_age - m_age) / m_max_age;
        return m_fluffiness * 0.1 * age_multiplier;
    }
```

А для лошади сделаем так, что она будет бегать быстрее всего в молодости:

```cpp
    float travel_time(float distance)
    {
        float peak_age = m_max_age / 2;
        float age_multiplier = 1 - fabs(peak_age - m_age) / peak_age;
        return distance / (m_speed * age_multiplier);
    }
```

При компиляции мы получим кучу ошибок такого вида:

```
main.cpp: In member function ‘float Cat::shed_weight()’:
main.cpp:39:33: error: ‘int Animal::m_max_age’ is private within this context
   39 |         float age_multiplier = (m_max_age - m_age) / m_max_age;
      |                                 ^~~~~~~~~
```

Я ожидал этого -- сейчас поля `m_weight`, `m_age` и `m_max_age` объявлены как `private` -- это значит, что к ним можно обращаться только из методов класса, в котором они объявлены.

Но я же говорил, что в наследниках можно будет использовать поля родительского класса, разве нет? Да, но для этого нам придётся изменить спецификатор доступа с `private` на `protected`.

`protected` -- это спецификатор доступа, который позволяет обращаться к методу/полю только из методов самого класса или методов его наследников.

Давай заменим `private` на `protected` в классе `Animal`:

```cpp
class Animal
{
    ...
protected:
    int m_weight;
    int m_age;
    int m_max_age;
};
```

Теперь всё должно собраться без ошибок. Вот вывод программы, видно что значения выпадения волос и расстояния изменились:

```
Mew mew
Pfrrr
First is old: 1
Second is old: 0
First is bigger than second: 0
Cat will shed about 3.89333 kg of hair in a year
Horse will travel 100km in about 1.85185 hours
```

Используй `protected` для полей или методов если хочешь, чтобы классы наследники смогли их использовать. Если ты не планируешь этого, то лучше используй `private` -- таким образом ты упростишь задачу тому, кто будет разбираться в твоём коде.

### Спецификатор доступа в наследовании

Как ты видел, при наследовании мы указали спецификатор `public`:

```cpp
class Cat : public Animal {
    ...
};
```

А можно ещё что-то указать? Да, можно:

```cpp
// protected наследование
class Cat : protected Animal {
    ...
};
// private наследование
class Cat : private Animal {
    ...
};
```

В зависимости от указанного типа наследования, спецификаторы доступа полей родительского класса изменятся в наследнике:

* При `public` наследовании
    * `public` в родительском классе останется `public` в наследнике
    * `protected` в родительском классе останется `protected` в наследнике
    * `private` в родительском классе не унаследуется в наследнике
* При `protected` наследовании
    * `public` в родительском классе превратится в `protected` в наследнике
    * `protected` в родительском классе превратится в `protected` в наследнике
    * `private` в родительском классе не унаследуется в наследнике
* При `private` наследовании
    * `public` в родительском классе превратится в `private` в наследнике
    * `protected` в родительском классе превратится в `private` в наследнике
    * `private` в родительском классе не унаследуется в наследнике

`protected` и `private` наследование используется в экзотических случаях, и я не буду их рассматривать в рамках этой статьи. Просто используй `public`, пока не захочешь погрузиться глубже в C++.

> Если не указывать тип наследования, то по умолчанию он будет `private`, поэтому не забывай всегда писать `public`.

# Наследник наследника и переопределение методов

Если программа очень сложная, то иерархия наследования может сильно разрастаться.

Например, мы пишем программу, которая будет производить сложную симуляцию поведения животных, и нам обязательно надо разделить поведение домашних и уличных кошек:

```cpp
// Домашняя кошка
class DomesticCat : public Cat
{
    DomesticCat(float fluffiness, int weight, int age) :
        Cat(fluffines, weight, age)
    {}
    void talk()
    {
        std::cout << "Prrr prrrr" << std::endl;
    }
};
// Уличная кошка
class StrayCat : public Cat
{
    StrayCat(float fluffiness, int weight, int age) :
        Cat(fluffines, weight, age)
    {}
    void talk()
    {
        std::cout << "Shchhhhhhhhh" << std::endl;
    }
};
```

Теперь эти классы будут отличаться от поведения родительского класса `Cat`:

```cpp
int main()
{
    Cat c(0.8, 7, 13);
    c.talk();
    // Mew mew
    DomesticCat d(0.8, 7, 13);
    d.talk();
    // Prrr prrrr
    StrayCat s(0.8, 7, 13);
    s.talk();
    // Shchhhhhhhhh
}
```

Таким образом, мы унаследовались от класса `Cat`, который, в свою очередь, наследуется от `Animal`.

Также, в классах `DomesticCat` и `StrayCat` мы переопределили метод `talk()` родительского класса `Cat`.

Однако, у нас есть проблема -- из-за того, что максимальный возраст кошки определён в `Cat`, мы не можем его указать в `DomesticCat` и `StrayCat`. В следующем разделе мы исправим эту проблему.

# Diamond problem, проблема перекрёстного наследования

Ситуация -- генетики скрестили между собой птицу и лошадь, и получили пегаса:

```cpp
class Bird : public Animal
{
public:
    Bird(float max_height, int weight, int age) :
        Animal(weight, age, 8),
        m_max_height(max_height)
    {}
    void talk()
    {
        std::cout << "Tweet tweet" << std::endl;
    }
    // Может ли летать на такой высоте
    bool can_fly(float height)
    {
        return m_max_height >= height;
    }
private:
    // Максимальная высота полёта
    float m_max_height;
};

class Pegasus : public Horse, public Bird
{
public:
    Pegasus(float speed, int flight_height, int weight, int age) :
        Horse(speed, weight, age),
        Bird(flight_height, weight, age)
    {}
    // Я не хочу переопределять метод talk(), потому что пегас 
    // должен "говорить" как так же, как класс Horse
};
```

Давай создадим объект класса `Pegasus`:

```cpp
int main()
{
    Pegasus p(10, 10, 10, 10);
    p.talk();
}
```

При компиляции вылезет ошибка:

```
animal.cpp: In function ‘int main()’:
animal.cpp:120:7: error: request for member ‘talk’ is ambiguous
120 |     p.talk();
    |       ^~~~
animal.cpp:12:10: note: candidates are: ‘void Animal::talk()’
 12 |     void talk()
    |          ^~~~
animal.cpp:83:10: note:                 ‘void Bird::talk()’
 83 |     void talk()
    |          ^~~~
animal.cpp:60:10: note:                 ‘void Horse::talk()’
 60 |     void talk()
    |          ^~~~
```

Компилятор говорит, что он не может разобраться чей же метод `talk()` мы хотим вызывать -- `Animal::talk()`, `Bird::talk()` или `Horse::talk()`?

Эта проблема называется **"Diamond inheritance problem"** -- на наш можно перевести как **"Проблема алмазного наследования"**.

Алмаз тут используется в переносном смысле, чтобы описать форму иерархии наследования, когда класс `Pegasus`, наследуется от `Horse` и `Bird`, которые, в свою очередь наследуются от `Animal`:

![]()

Если такая ситуация возникает, то, скорее всего, мы неправильно организовали саму иерархию наследования.

Как же нам поступить?

Одним из выходов, является выделение общих признаков для классов `Animal`, `Horse` и `Bird` в отдельные классы: `Aging` (стареющее), `Weight` (вес), `Walking` (ходячее), `Flying` (летающее), `Talking` (разговаривающее).

```cpp
class Aging
{
public:
    Aging(int age, int max_age) :
        m_age(age),
        m_max_age(max_age)
    {}
    // Можем узнать старое ли это что-то
    bool is_old()
    {
        return m_age > m_max_age * 0.75;
    }
private:
    int m_age;
    int m_max_age;
};

class Weight
{
public:
    Weight(int weight) :
        m_weight(weight)
    {}
    bool is_bigger_than(Weight &other)
    {
        return m_weight > other.m_weight;
    }
private:
    int m_weight;
};

class Walking
{
public:
    Walking(float speed) :
        m_speed(speed)
    {}
    float travel_time(float distance)
    {
        return distance / m_speed;
    }
private:
    float m_speed;
};

class Flying
{
public:
    Flying(float max_height) :
        m_max_height(max_height)
    {}
    bool can_fly(float height)
    {
        return m_max_height >= height;
    }
private:
    // Максимальная высота полёта
    float m_max_height;
};

#include <cstring>
class Talking
{
public:
    Talking(const char *phrase)
    {
        m_phrase = new char[strlen(phrase)+1];
        strcpy(m_phrase, phrase);
    }
    ~Talking()
    {
        delete[] m_phrase;
    }
    void talk()
    {
        std::cout << m_phrase << std::endl;
    }
private:
    char* m_phrase;
};

class Pegasus : public Aging, public Weight, public Walking, public Flying, public Talking
{
public:
    Pegasus(float speed, int height, int weight, int age) :
        Aging(age, 50),
        Weight(weight),
        Walking(speed),
        Flying(height),
        Talking("Pfrrrr")
    {}
};

int main()
{
    Pegasus p(10, 10, 10, 10);
    p.talk();
}
```

Да, теперь мы починили проблему, но какой ценой...

В программировании, как и в жизни, не бывает идеальных решений -- здесь, мы решили одну проблему, но создали другую -- наследование сильно усложнилось.

# [](#header-1)Заключение

Итого, мы изучили:

* Наследование
* **Родительский класс** aka. **Базовый класс** aka. **Родитель**
* **Дочерний класс** aka. **Наследник** aka. **Ребёнок**
* Конструкторы и деструкторы в наследовании:
    * Конструкторы и деструкторы не наследуются
    * Параметры конструкторов могут различаться
    * Если не вызовем вручную, то вызовется конструктор базового класса без параметров
    * Порядок вызова конструкторов: `родитель->наследник->наследник_наследника->...`
    * Порядок вызова деструкторов: `...->наследник_наследника->наследник->родитель`
* `protected` -- доступ только из самого класса или его наследников
* `public` наследование берёт всё как есть, `protected` и `private` наследование -- изменяют модификаторы доступа

И, ещё раз, смысл наследования:

### Тебе не надо дублировать одинаковую логику в разных классах -- логика пишется один раз в родительском классе, и переиспользуется во всех дочерних классах.

Если что -- пиши, я помогу и постараюсь объяснить лучше.
