---
title: C++. Наследование классов
published: false
tag: cpp
lang: ru
---

**Наследование** -- позволяет связать разные классы в иерархию таким образом, что мы можем в классе наследнике переиспользовать поля и методы, объявленные в родительском классе.

Давай сделаем небольшую игру, в которой можно будет создать персонажа и сражаться с другими персонажами за их монеты:

```cpp
#include <iostream>
#include <cstring>
// Класс "Персонаж"
class Character
{
public:
    // Констуктор - вызывается при создании объекта
    // hp - очки здоровья, dmg - количество наносимого урона, coins - количество монет
    Character(const char *name, int hp, int dmg, int coins) :
        m_is_dead(false),
        m_hp(hp),
        m_max_hp(hp),
        m_dmg(dmg),
        m_coins(coins)
    {
        // Выделяем память в своём массиве и копируем имя
        m_name = new char[strlen(name) + 1];
        strcpy(m_name, name);
    }
    // Деструктор - вызывается при удалении объекта
    ~Character()
    {
        // Не забываем почистить за собой память
        delete[] m_name;
    }
    bool is_dead()
    {
        return m_is_dead;
    }
    // Если персонаж мёртв, то он "выбрасывает" свои монеты
    int drop_coins()
    {
        int temp = m_coins;
        if(m_is_dead)
            m_coins = 0;
        return temp;
    }
    // Нанести урон другому персонажу
    // Если убил, то вернёт true, если нет, то false
    bool deal_dmg(Character &other)
    {
        if(other.take_dmg(m_dmg))
        {
            m_coins += other.drop_coins();
            return true;
        }
        return false;
    }
    // Пополнить здоровье
    void exchange_hp_for_coins(int heal_hp, int cost)
    {
        if(heal_hp > 0 && m_coins >= cost)
        {
            take_dmg(-heal_hp);
            m_coins -= cost;
        }
    }
private:
    // Получить урон от другого персонажа
    // Метод является приватным, чтобы его мог вызвать только другой персонаж из метода deal_damage()
    bool take_dmg(int dmg)
    {
        m_hp -= dmg;
        if(m_hp <= 0)
        {
            m_hp = 0; // Чтобы сбросить на 0, если здоровье ушло в минус
            m_is_dead = true;
        }
        return m_is_dead;
    }
private:
    char *m_name;
    bool m_is_dead;
    int m_hp;
    int m_max_hp;
    int m_dmg;
    int m_coins;

    friend std::ostream& operator<<(std::ostream &out, Character &c);
};

std::ostream& operator<<(std::ostream &out, Character &c)
{
    return out << (c.m_is_dead ? "[DEAD] " : "") <<
        c.m_name << ": " << 
        c.m_hp << "/" << c.m_max_hp << " HP, " << 
        c.m_dmg << " DMG, " <<
        c.m_coins << " COINS" << std::endl;
}
```

Давай создадим несколько персонажей, чтобы они посражались друг с другом:

```cpp
#include <cstdlib>
#include <time.h>

int main()
{
    int count = 3;
    Character *my_character;
    Character** enemies = new Character*[count];
    char buffer[50];
    // Задаём seed для генератора рандомных чисел - без этого он всегда будет выдавать одинаковые числа
    srand(time(nullptr));
    while(true)
    {
        my_character = new Character("Player 1", rand() % 50 + 100, rand() % 25 + 30, 0);
        for(int i = 0; i < count; i++)
        {
            // sprintf - создаёт форматированную строку в указанном нами массиве buf 
            sprintf(buffer, "Character %d", i+1);
            // Пределы случайных чисел: hp [50, 100), dmg [30, 55), coins [0, 25)
            Character *character = new Character(buffer, rand() % 50 + 50, rand() % 25 + 30, rand() % 25);
            enemies[i] = character;
        }
        int alive_count = count;
        while(!my_character->is_dead() && alive_count > 0)
        {
            std::cout << std::endl << "Your character: " << *my_character <<
                "What to do:" << std::endl << 
                "0: Buy healing potion (10 coins for +25 hp)" << std::endl;
            for(int i = 0; i < count; i++)
            {
                std::cout << i+1 << ": ";
                if(enemies[i])
                   std::cout << "Attack " << *enemies[i];
                else
                   std::cout << "DEAD" << std::endl;
            }
            int option;
            std::cout << "Pick option (enter number)" << std::endl;
            std::cin >> option;
            if(option == 0)
            {
                std::cout << "You healed 25 HP" << std::endl;
                my_character->exchange_hp_for_coins(25, 10);
                continue;
            }
            option--;
            if(option < 0 || option > count || !enemies[option])
            {
                std::cout << "Can't find alive enemy by this number. Try another one." << std::endl;
                continue;
            }
            Character *target = enemies[option];
            std::cout << "You attack!" << std::endl;
            bool is_killed = my_character->deal_dmg(*target);
            if(is_killed)
            {
                // Убираем его из массива
                delete target;
                enemies[option] = nullptr;
                alive_count--;
            }
            else
            {
                std::cout << "Target attacks you in response!" << std::endl;
                target->deal_dmg(*my_character);
            }
        }
        std::cout << (my_character->is_dead() ?  "You lost... Try again?" : 
                "Yay! You won! Congrats! Wanna some more?") << " [y/n]" << std::endl;
        for(int i = 0; i < count; i++)
            delete enemies[i];
        delete my_character;
        char answer;
        do
            std::cin >> answer;
        while(answer != 'y' && answer != 'n');
        if(answer == 'n')
            break;
    }
}
```

Получилась простенькая игрушка, в которой надо распланировать в каком порядке кого атаковать, и когда покупать зелье лечения:

```
Your character: Player 1: 149/149 HP, 53 DMG, 0 COINS
What to do:
0: Buy healing potion (10 coins for +25 hp)
1: Attack Character 1: 83/83 HP, 30 DMG, 9 COINS
2: Attack Character 2: 73/73 HP, 38 DMG, 11 COINS
3: Attack Character 3: 51/51 HP, 54 DMG, 3 COINS
Pick option (enter number)
2
You attack!
Target attacks you in response!

Your character: Player 1: 111/149 HP, 53 DMG, 0 COINS
What to do:
0: Buy healing potion (10 coins for +25 hp)
1: Attack Character 1: 83/83 HP, 30 DMG, 9 COINS
2: Attack Character 2: 20/73 HP, 38 DMG, 11 COINS
3: Attack Character 3: 51/51 HP, 54 DMG, 3 COINS
Pick option (enter number)
2
You attack!

Your character: Player 1: 111/149 HP, 53 DMG, 11 COINS
What to do:
0: Buy healing potion (10 coins for +25 hp)
1: Attack Character 1: 83/83 HP, 30 DMG, 9 COINS
2: DEAD
3: Attack Character 3: 51/51 HP, 54 DMG, 3 COINS
Pick option (enter number)
0
You healed 25 HP

Your character: Player 1: 136/149 HP, 53 DMG, 1 COINS
What to do:
0: Buy healing potion (10 coins for +25 hp)
1: Attack Character 1: 83/83 HP, 30 DMG, 9 COINS
2: DEAD
3: Attack Character 3: 51/51 HP, 54 DMG, 3 COINS
Pick option (enter number)
1
You attack!
Target attacks you in response!

Your character: Player 1: 106/149 HP, 53 DMG, 1 COINS
What to do:
0: Buy healing potion (10 coins for +25 hp)
1: Attack Character 1: 30/83 HP, 30 DMG, 9 COINS
2: DEAD
3: Attack Character 3: 51/51 HP, 54 DMG, 3 COINS
Pick option (enter number)
1
You attack!

Your character: Player 1: 106/149 HP, 53 DMG, 10 COINS
What to do:
0: Buy healing potion (10 coins for +25 hp)
1: DEAD
2: DEAD
3: Attack Character 3: 51/51 HP, 54 DMG, 3 COINS
Pick option (enter number)
0
You healed 25 HP

Your character: Player 1: 131/149 HP, 53 DMG, 0 COINS
What to do:
0: Buy healing potion (10 coins for +25 hp)
1: DEAD
2: DEAD
3: Attack Character 3: 51/51 HP, 54 DMG, 3 COINS
Pick option (enter number)
3
You attack!
Yay! You won! Congrats! Wanna some more? [y/n]
```

В классе Seat есть:

* Поле seat -- строка, с названием материала сиденья
* Метод take_a_seat -- метод, который выводит строку, с описанием на что мы сели
* Метод get_description -- метод, который возвращает строку с описанием того, на что мы сели

Круто, но на сиденьи не получится нормально посидеть -- введём класс Tabouret, отнаследованный от класса Seat:

```python
# В скобочках указываем родительский класс Seat
class Tabouret(Seat):
    def __init__(self, seat, legs):
        Seat.__init__(self, seat)
        self.legs = legs
    # Переопределяем родительский метод get_description
    def get_description(self):
        return f'табурет у которого {self.legs} ножки, а сиденье из {self.seat}'
```

> Обрати внимание, что мы вызываем конструктор базового класса:
> ```python
> Seat.__init__(self, seat)
> ```
> Туда надо передать self (текущий объект) и все параметры, необходимые для этого конструктора.
> Если не вызвать конструктор базового класса, то он не вызовется и никакие поля базового класса не заполнятся.

Класс **Tabouret**:

* Добавляет поле legs -- число ножек
* Переопределяет метод get_description -- теперь, если у объекта класса Tabouret вызвать метод get_description, то вызовется его реализация из класса Tabouret, а не из класса Seat
* Поле seat и метод take_a_seat наследуются из класса Seat

> Переопределение метода родительского класса это тоже важное понятие -- запомни его.

А как сделать стул? Введём класс Chair и отнаследуем от класса Tabouret:

```python
class Chair(Tabouret):
    def __init__(self, seat, legs, back):
        Tabouret.__init__(self, seat, legs)
        self.back = back

    def get_description(self):
        return f'стул у которого {self.legs} ножки, сиденье из {self.seat}, а спинка из {self.back}'
```

Класс **Chair**:
* Добавляет поле _back -- строка, с названием материала спинки
* Переопределяет метод get_description -- теперь, если у объекта класса Chair вызвать метод get_description, то вызовется его реализация из класса Chair, а не из класса Tabouret
* Поле legs наследуются из класса Tabouret
* Поле seat и метод take_a_seat наследуются из класса Seat

А что с диваном? Введём класс Couch и отнаследуем его от класса Seat:

```python
class Couch(Seat):
    def __init__(self, seat):
        Seat.__init__(self, seat)

    def get_description(self):
        return f'диван из {self.seat}'
```

Классы Couch и Chair имеют общий родительский класс Seat, но в остальном обладают разными свойствами.

Класс **Couch**:

* Переопределяет метод get_description -- теперь, если у объекта класса Couch вызвать метод get_description, то вызовется его реализация из класса Couch, а не из класса Seat

Давай теперь создадим объекты каждого класса, и попробуем дёрнуть их методы take_a_seat:

```python
seat = Seat('паралона')
tabouret = Tabouret('металла', 3)
chair = Chair('дерева', 4, 'дерева')
couch = Couch('экокожи')

seat.take_a_seat()
# Вывод: Ты сел на сиденье из паралона
tabouret.take_a_seat()
# Вывод: Ты сел на табурет у которого 3 ножки, а сиденье из металла
chair.take_a_seat()
# Вывод: Ты сел на стул у которого 4 ножки, сиденье из дерева, а спинка из дерева
couch.take_a_seat()
# Вывод: Ты сел на диван из экокожи
```

Окей, а зачем мы это всё сделали?

### Тебе не надо дублировать одинаковую логику в разных классах -- логика пишется один раз в родительском классе, и переиспользуется во всех дочерних классах.

Например, я захочу поменять вид строки в take_a_seat -- для этого я залезу в код класса Seat:

```python
def take_a_seat(self):
    desc = self.get_description()
    print(f'Ты испытываешь нестерпимое желание сесть на {desc}')
```

И, не меняя ничего другого, у меня изменится вывод для всех других классов:

```python
seat.take_a_seat()
# Вывод: Ты испытываешь нестерпимое желание сесть на сиденье из паралона
tabouret.take_a_seat()
# Вывод: Ты испытываешь нестерпимое желание сесть на табурет у которого 3 ножки, а сиденье из металла
chair.take_a_seat()
# Вывод: Ты испытываешь нестерпимое желание сесть на стул у которого 4 ножки, сиденье из дерева, а спинка из дерева
couch.take_a_seat()
# Вывод: Ты испытываешь нестерпимое желание сесть на диван из экокожи
```

Это очень удобно, если работаешь со множеством классов.

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
