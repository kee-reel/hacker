---
title: C++. Полиморфизм, виртуальные и абстрактные методы
date: 2022-05-13
tag: cpp
---

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
animal type (0 - cat, 1 - horse): 1
weight: 150
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

Давай попробуем добавить явное приведение к типу `Cat*` и вызовем методы `talk()` и `shed_weight()`:

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
animal type (0 - cat, 1 - horse): 0
weight: 1
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

Воу, теперь они все мяукают, даже лошадь! А если привести к типу `Horse*` и вызывать `travel_time`?

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

А теперь все стали лошадьми:

```
count: 2
animal type (0 - cat, 1 - horse): 0
weight: 1
age: 0
fluffiness: 1
animal type (0 - cat, 1 - horse): 1
weight: 140
age: 15
speed: 30
Animal #0
Pfrrr
Horse will cover 1km in 0 hours
Animal #1
Pfrrr
Horse will cover 1km in 0.0333333 hours
```

Давай разберёмся почему так происходит.

В памяти каждый объект это просто набор байт. Например, объект типа `Cat` выглядит так:

![]()

В массиве у нас лежат указатели на базовый класс `Animal*`, которые видят только эту часть объекта `Cat`:

![]()

Если мы берём указатель `Horse*`, и пытаемся указать им на объект класса `Cat`, то ничего не сломается, так как в памяти оба этих объекта не отличимы друг от друга:

![]()

То есть, **тип указателя определяет какие методы мы можем вызывать у объекта**.

Окей, а есть какая-то возможность автоматически определять тип объекта (`Cat*` или `Horse*`), и вызывать нужный метод, даже если у нас есть только указатель на базовый класс (`Animal*`)?

Да, есть!

# Виртуальные методы

Ситуация, описанная выше, решается за счёт **полиморфизма**.

**Полиморфизм** -- это инструмент языка программирования, который позволяет единообразно работать со множеством иерархически связанных классов.

С его помощью, мы сможем вызывать метод `talk()` у указателя `Animal*`, а при этом вызовется соответствующий метод, определённый в `Cat` или `Horse`.

В языке C++ полиморфизм реализован с помощью **таблиц виртуальных функций**. Про них я расскажу попозже, а пока давай ими воспользуемся.

Чтобы применить полиморфизм к методу, надо чтобы он был занесён в таблицу виртуальных функций. Для этого нужно написать `virtual` перед объявлением метода:

```cpp
class Animal
{
public:
    ...
    virtual void talk()
    {
        std::cout << "Abstract animal" << std::endl;
    }
    ...
};
```

В классах `Cat` и `Horse` также надо пометить методы `talk()` как `virtual` и указать, что они переопределяют виртуальный метод своего родителя:

```cpp
class Cat : public Animal {
public:
    ...
    virtual void talk() override
    {
        std::cout << "Mew mew" << std::endl;
    }
    ...
};

class Horse : public Animal {
public:
    ...
    virtual void talk() override
    {
        std::cout << "Pfrrr" << std::endl;
    }
    ...
};
```

`override` указывает, что эти методы переопределяют метод своего родителя в таблице виртуальных функций.

Давай попробуем теперь запустить программу в изначальном виде, только с вызовом `talk()`:

```cpp
    ...
    for(int i = 0; i < count; i++)
        animals[i]->talk();
}
```

Еееееее, всё работает!

```
count: 2
animal type (0 - cat, 1 - horse): 1
weight: 140
age: 15
speed: 30
animal type (0 - cat, 1 - horse): 0
weight: 0
age: 0
fluffiness: 0
Pfrrr
Mew mew
```

# Таблицы виртуальных функций

# Абстрактные классы
