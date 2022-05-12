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

Особенности:

* Параметры конструкторов могут различаться -- например, у меня в констукторах `Cat` и `Horse` нет параметра `max_age`, и я передаю в конструктор `Animal` фиксированное значение, в зависимости от типа животного
* Если явно не вызывать конструктор базового класса из конструктора наследника, то будет вызван конструктор базового класса без параметров. Если у базового класса нет конструктора без параметров, то будет ошибка компиляции
* При создании объекта сначала вызывается конструктор родителя, то есть порядок такой: `родитель->наследник->наследник_наследника->...`
* При удалении объекта сначала вызывается деструктор самого младшего наследника, то есть порядок такой:  `...->наследник_наследника->наследник->родитель`

Осталось только изменить код в `main()`:

```cpp
int main()
{
    Cat a1(0.8, 7, 13);
    // Mew mew
    Horse a2(18, 268, 4);
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
    // Horse will travel 100km in about 5.55556 hours
}
```

То есть у наших кошки и лошади всё так же можно вызвать методы `is_old()` и `is_bigger_than()`, но при этом, у каждого из них есть свои уникальные методы `shed_weight()` и `travel_time()`.

### Специцикатор доступа protected

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
        return (distance / m_speed) * age_multiplier;
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

> Если не указывать тип наследования, то по умолчанию он будет `private` -- не забывай всегда писать `public`.

# Виртуальные методы

Давай добавим `public` метод `talk()` в классы `Cat` и `Horse`, и уберём вывод строки из конструктора:

```cpp
class Cat : public Animal
{
public:
    Cat(float fluffiness, int weight, int age) :
        Animal(weight, age, 15),
        m_fluffiness(fluffiness)
    {}
    ...
    void talk()
    {
        std::cout << "Mew mew" << std::endl;
    }
    ...
};

class Horse : public Animal
{
public:
    Horse(float speed, int weight, int age) :
        Animal(weight, age, 30),
        m_speed(speed)
    {}
    ...
    void talk()
    {
        std::cout << "Pfrrr" << std::endl;
    }
    ...
};
```

Теперь можно узнать как делает кошечка и лошадка:

```cpp
int main()
{
    Cat a1(0.8, 7, 13, 15);
    Horse a2(18, 268, 4, 25);
    a1.talk();
    // Mew mew
    a2.talk();
    // Pfrrr
}
```

А что если мы захотим открыть питомник для животных? Для этого нам придётся хранить объекты вроде `Cat` и `Animal` в массиве:

```cpp
int main()
{
    int count;
    std::cin >> count;
    Cat **cat_array = new Cat*[count];
    std::cin >> count;
    Horse **horse_array = new Horse*[count];
    ...
```

Ой, это под каждый новый класс, наследованный от `Animal` создавать по массиву? А можно всех в один засунуть?

Можно:

```cpp
// Вспомогательные функции для ввода значений
int get_float(const char *name)
{
    std::cout << name << ": ";
    int field;
    std::cin >> field;
    return field;
}
// Когда пройдём шаблоны, это можно будет записать без дублирования кода
float get_int(const char *name)
{
    std::cout << name << ": ";
    float field;
    std::cin >> field;
    return field;
}

int main()
{
    int count = get_int("count");
    Animal **animals = new Animal*[count];
    for(int i = 0; i < count; i++)
    {
        int animal_type = get_int("animal type (0 - cat, 1 - horse)");
        if(animal_type < 0 || animal_type > 1)
        {
            std::cout << "Wrong animal type, try again" << std::endl;
            i--; // Вычитаем 1, чтобы следующая итерация прибавила 1 и мы остались на том же i
            continue;
        }
        Animal *a;
        int weight = get_int("weight");
        int age = get_int("age");
        switch(animal_type)
        {
            case 0: {
                float fluffiness = get_float("fluffiness");
                a = new Cat(fluffiness, weight, age);
            } break;
            case 1: {
                float speed = get_float("speed");
                a = new Horse(speed, weight, age);
            }
        }
        animals[i] = a;
    }
    // После этого все животные "скажут" что-то
    for(int i = 0; i < count; i++)
        animals[i]->talk();
}
```

При компиляции вылезет такая ошибка:

```
animal.cpp: In function ‘int main()’:
animal.cpp:121:21: error: ‘class Animal’ has no member named ‘talk’
  121 |         animals[i]->talk();
      |                     ^~~~
```

Он ругается, что `Animal` не знает такого метода. Ну да, у нас же в массиве лежат `Animal*`, а там такого метода нет.

Хмм, ну давай попробуем добавить ему этот метод:

```cpp
class Animal
{
public:
    ...
    void talk()
    {
        std::cout << "Abstract animal" << std::endl;
    }
    ...
};
```

Теперь всё скомпилируется:

```
count: 2
animal type (0 - cat, 1 - horse): 1weight: 150
age: 14
speed: 17
animal type (0 - cat, 1 - horse): 0
weight: 4
age: 1
fluffiness: 0.9
Abstract animal
Abstract animal
```

Так, почему выводит "Abstract animal"? `Cat` и `Horse` не перезаписали метод `talk()`?

Давай попробуем добавить явное приведение к типу `Cat` и вызовем методы `talk()` и `shed_weight()`:

```cpp
    ...
    for(int i = 0; i < count; i++)
    {
        std::cout << "Animal #" << i << std::endl;
        ((Cat*)animals[i])->talk();
        "Cat will shed " << ((Cat*)animals[i])->shed_weight() << " kg of hair in a day" << std::endl;
    }
}
```

Получится такой вывод:

```
count: 2
animal type (0 - cat, 1 - horse): 0weight: 1
age: 0
fluffiness: 1
animal type (0 - cat, 1 - horse): 1
weight: 140
age: 15
speed: 30
Animal #0
Mew mew
Cat will shed 0.1 kg of hair in a day
Animal #1
Mew mew
Cat will shed 1.5 kg of hair in a day
```

Воу, теперь они все мяукают, даже лошадь! А если привести к типу `Horse*`?

```cpp
    ...
    for(int i = 0; i < count; i++)
    {
        std::cout << "Animal #" << i << std::endl;
        ((Horse*)animals[i])->talk();
        "Horse will cover 1km in " << ((Horse*)animals[i])->travel_time(1) << " hours" << std::endl;
    }
}
```

# [](#header-1)Заключение

Итого, мы изучили:

* Наследование
* Родительский класс
* Дочерний класс
* Конструктор родительского класса
* Переопределение метода

И, ещё раз, смысл наследования:

### Тебе не надо дублировать одинаковую логику в разных классах -- логика пишется один раз в родительском классе, и переиспользуется во всех дочерних классах.

Если что -- пиши, я помогу и постараюсь объяснить лучше.

Если ты ещё полон сил, то вернись к [статье про ООП](/python-classes-oop-ru), и продолжи постижение ООП.
