---
language: ru
title: C. Указатели
date: 2021-10-19
tag: c
lang: ru
---

Указатель (pointer) -- это переменная, в которой хранится адрес на какую-то ячейку памяти.

Обычно, все боятся C и C++ из-за указателей -- они кажутся чем-то непонятным и очень приближённым к тому, как устроен компьютер.

Однако, мне кажется, что даже такую сложную концепцию можно объяснить на аналогиях из реальной жизни, что значительно упростит понимание.

# Ищем клад

Представь себе, что ты искатель клада -- без чего не обходится ни один поиск клада? Правильно, без карты!

Ситуация -- у тебя есть карта, на которой отмечены координаты клада, например: 59.606067, 30.441917.

А теперь проводим аналогию с языком Си:

* Клад -- переменная
* Карта -- указатель
* Координаты -- адрес

То есть, карта с координатами клада -- это указатель с адресом переменной.

Давай создадим указатель на переменную:

```c
// Обычная int переменная
int treasure = 777;
// Указатель на int переменную (на это указывает * после типа int)
int* treasure_map;
// Записываем адрес int переменной treasure в указатель treasure_map
treasure_map = &treasure;
printf("treasure: %d\n", treasure);
// treasure: 777
printf("coordinates of treasure: %p\n", &treasure);
// coordinates of treasure: 0x7ffe461b4bec
printf("coordinates in treasure_map: %p\n", treasure_map);
// coordinates in treasure_map: 0x7ffe461b4bec
```

Давай разберём что вывела программа:

* "treasure: 777" -- значение нашей переменной (клад)
* "coordinates of treasure: 0x7ffe461b4bec" -- адрес переменной (координаты клада)
* "coordinates in treasure\_map: 0x7ffe461b4bec" -- значение указателя (координаты, записанные в карте)

А почему адрес так выглядит?

# Адрес и представление числа в памяти

Адрес это номер ячейки в оперативной памяти. Записывается этот адрес в шеснадцатеричной системе счисления.

![Указатель на переменную](/assets/images/c-pointer-to-variable.png)

Ты можешь представить адрес, как номер ячейки внутри своей плашки оперативной памяти. Каждая ячейка там занимает ровно 1 байт.

Например, у меня 16 Гб оперативной памяти -- значит будет 16(Гб) * 1024(Мб) * 1024(Кб) = 16777216 байт. Это значит что возможные адреса находятся на промежутке от 0 до 16777215, или в шеснадцатеричной от 0x0 до 0xFFFFFF.

> У меня в примере адрес больше чем 0xFFFFFF, потому что на самом деле всё чуть сложнее. Я не буду объяснять про виртуализацию памяти, поэтому воспринимай этот момент пока в упрощённом виде, как я объснил выше. Но если очень интересно, то вот страница на [википедии](https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D1%80%D1%82%D1%83%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F_%D0%BF%D0%B0%D0%BC%D1%8F%D1%82%D1%8C).

Ещё, ты возможно заметил, что в моём примере число в ячейках записано как-то задом наперёд -- сначала идут значения, а затем нули, хотя на листочке мы бы записали это двоичное число наоборот.

Всё дело в порядке байт в записи числа:

![Порядок байт](/assets/images/c-little-big-endian.png)

В зависимости от процессора, порядок записи байт у тебя может быть:

* От старшего к младшему (big-endian) -- первый байт числа хранит старшие биты, а последний младшие
* От младшего к старшему (little-endian) -- первый байт числа хранит младшие биты, а последний старшие

Чуть позже в статье мы увидим вживую как это проявляется.

### Размер указателя

Ты наверно помнишь, что:

* char занимает 1 байт
* short int занимает 2 байта
* float занимает 4 байта
* double занимает 8 байт

Так вот -- любые указатели занимают 4 байта или 8 байт:

```c
int* x;
printf("size of pointer: %d\n", sizeof(x));
// Вывод: size of pointer: 8
```

У меня он занимает 8 байт. От чего зависит сколько байт будет занимать указатель?

В 32-х битных операционных системах, поддерживается работа с оперативной памятью до 4-х гигабайт -- это адреса от 0 до 4294967295. Такое количество адресов идеально вмещается в 4 байта -- поэтому указатель занимает 4 байта, чтобы туда влез адрес на любую ячейку в памяти.

В 64-x битных системах указатель вмещается в 8 байт -- тут уже можно раздать адреса на петабайты памяти.

# Вытаскиваем клад

Чего смотреть на эту карту -- давай пойдём по координатам, указанным в карте, и выкопаем клад.

Применяя эту аналогию к Си -- мы можем получить значение переменной, адрес которой хранится в указателе:

```c
int treasure = 777;
int* treasure_map = &treasure;
printf("coordinates in treasure_map: %p\n", treasure_map);
printf("treasure by coordinates in treasure_map: %d\n", *treasure_map);
/* Вывод:
cooridnates in treasure_map: 0x7ffe461b4bec
treasure by coordinates in treasure_map: 777 */
```

То есть, чтобы получить значение по адресу, который хранится в указателе, надо указать звёздочку "\*" перед именем указателя.

> Операция получения значения по указателю называется разыменованием.

# Закапываем новый клад

У тебя есть карта с координатами клада -- ты можешь пойти на это место, выкопать старый клад и закопать новый.

Применяя аналогию к Си -- можно заменить значение в переменной, адрес которой хранится в указателе:

```c
int treasure = 777;
int* treasure_map = &treasure;
printf("treasure: %d\n", treasure);
// treasure: 777
*treasure_map = 666;
printf("new treasure: %d\n", treasure);
// new treasure: 666
```

# Карта, которая является сокровищем

Безумный искатель сокровищ нарисовал карту, в которой записаны координаты, где лежит эта карта.

Проводя аналогию с языком Си -- безумный программист присвоил указателю адрес на этот же указатель.

```c
int* p_x;
p_x = &p_x;
printf("%p %d\n", p_x, *p_x);
// 0x7ffd164172d0 373387984

*p_x = 255;
printf("%p %d\n", p_x);
// 0x7ffd000000ff 255
// Теперь нельзя выводить значение через *p_x, потому что
// он указывает на несуществующий адрес FF.
```

Ситуация, в которой указатель указывает сам на себя опасна, если ты попытаешься присвоить туда не адрес, а какое-то значение.

Это очень экзотическая ситуация -- просто будь в курсе, что это возможно.

# Переписываем координаты из одной карты в другую

Представь, что у тебя ещё есть друг искатель клада, с которым то хочешь поделиться координатами клада. Для этого ты возьмёшь его карту, и запишешь в неё координаты из своей карты.

Применяем аналогию к Си -- ты можешь из одного указателя, записать значение в другой указатель:

```c
int treasure = 777;
int* my_map = &treasure;
int* friend_map = my_map;
printf("treasure: %d\n", treasure);
// treasure: 777
printf("coordinates in my_map: %p\n", my_map);
// coordinates in my_map: 0x7ffc7cac03a4
printf("treasure by my_map: %d\n", *my_map);
// treasure by my_map: 777
printf("coordinates in friend_map: %p\n", friend_map);
// coordinates in friend_map: 0x7ffc7cac03a4
printf("treasure by friend_map: %d\n", *friend_map);
// treasure by friend_map: 777
```

# Карта с координатами другой карты

Представь, что кто-то захотел очень хорошо спрятать клад, и он сделал две карты:

* В карте "А" записаны координаты клада
* В карте "В" записаны координаты карты "А"

Если у тебя есть карта "В", то тебе надо по ней найти карту "А", чтобы по ней уже найти клад.

![Карта с координатами карты](/assets/images/c-pointer-to-pointer.png)

Применяем аналогию к Си -- ты можешь создать указатель, в котором лежит адрес указателя на переменную:

```c
int treasure = 777;
int* map_A = &treasure;
int** map_B = &map_A;
printf("coordinates in map_B: %p\n", map_B);
// coordinates in map_B: 0x7ffe82475c28
printf("coordinates of map_A: %p\n", &map_A);
// coordinates of map_A: 0x7ffe82475c28
printf("coordinates in map_A: %p\n", *map_B);
// coordinates in map_A: 0x7ffe82475c24
printf("coordinates of treasure: %p\n", &treasure);
// coordinates of treasure: 0x7ffe82475c24
printf("treasure: %d\n", **map_B);
// treasure: 777
```

Вот эта последняя строчка, где написано "\*\*map\_B" -- самая сложная. Здесь, мы идём по координатам из карты "В", находим карту "А", и уже по карте "А", достаём клад.

# Разные типы указателей

Тут уже мои аналогии начнут трещать по швам, потому что в языке Си указатели могут быть разных типов.

Поэтому давай я тут объясню без аналогий, но с визуальным пояснением.

### Кусочек переменной

Допустим у тебя есть int указатель на int переменную -- а что, если у тебя будет char указатель на int переменную?

```c
int treasure = 777;
int* int_treasure_map = &treasure;
// Явное приведение int* к char*, чтобы компилятор не ругался
char* char_treasure_map = (char*)&treasure;
printf("treasure: %d\n", treasure);
// treasure: 777
printf("address in int_treasure_map: %p\n", int_treasure_map);
// address in int_treasure_map: 0x7ffd9ec2e014
printf("address in char_treasure_map: %p\n", char_treasure_map);
// address in char_treasure_map: 0x7ffd9ec2e014
printf("value by int_treasure_map: %d\n", *int_treasure_map);
// value by int_treasure_map: 777
printf("value by char_treasure_map: %d\n", *char_treasure_map);
// value by char_treasure_map: 9
```

![Разные типы указателей](/assets/images/c-pointers-different-types.png)

Помнишь, я упомянал до этого про порядок байт? В этом примере мы увидели вживую что это такое.

У меня получилось, что char\_treasure\_map вернул нам значение первого байта int переменной treasure. Почему только первый байт? Потому что это указатель на char, а char занимает 1 байт.

Если бы у меня был порядок байт не "от младшего к старшему", а "от старшего к младшему", то мне вернулось бы значение 0, так как первыми байтами числа были старшие байты (а там первые два байта это нули).

### Не тот тип переменной

Ещё ты можешь взять float переменную, создать указатель на int, и указать его на float переменную:

```c
float x = 777;
int* p_x = (int*)&x;
printf("Interpret x as float: %f\nInterpret x as int: %d\n", x, *p_x);
// Interpret x as float: 777.000000
// Interpret x as int: 1145192448

*p_x = 777;
printf("Interpret x as float: %f\nInterpret x as int: %d\n", x, *p_x);
// Interpret x as float: 0.000000
// Interpret x as int: 777
```

Изначально мы присвоили в переменную "x" значение 777 как во float переменную -- в память оно и записалось в вещественном представлении. Затем, мы присвоили значение 777 по int указателю "p\_x" -- туда, куда указывает "p\_x" (в переменную "x") мы записали его в целочисленном представлении. 

Вот наглядная демострация того, как выглядят разные представления числа 777:

![Разное представление типов](/assets/images/c-pointer-data-representation.png)

Если мы будем интерпретировать вещественную запись числа как целую, или целую как вещественную -- мы не сможем нормально прочитать нужное нам значение. Это как если бы мы начали читать книгу на чешском по-русски, и наоборот -- что-то мы поймём, но значение слов будет разным.

То, что я показал является экзотическими случаями и на практике нигде не встречается. Не делай так никогда-никогда!

**Всегда следи, что типы указателей и переменных совпадают, а в указателях записаны корректные адреса.**

### Тип void

Кроме уже известных тебе типов (char, short int, int, float, double), указатель может быть ещё и типом void. Его особенности:

* Нужен для хранения ардеса переменной, независимо от её типа
* Указатель типа void нельзя разыменовать -- можно только считывать адрес

Вот пример использования void:

```c
int x = 777;
void* p = (void*)&x;
printf("address in void pointer: %p\n", p);
// Разыменовывать его нельзя, но мы можем его сначала
// привести к нужному типу, а потом разыменовать
printf("value by void pointer: %d\n", *((int*)p));
```

# Адресная арифметика

Адреса в указателях можно не только хранить, то и как-то изменять -- например сдвигать указатель на соседние ячейки.

Давай я возьму предыдущий пример, и покажу как это выглядит:

```c
int treasure = 777;
int* int_treasure_map = &treasure;
char* char_treasure_map = ((char*)&treasure);
printf("treasure: %d\n", treasure);
// treasure: 777
printf("address in int_treasure_map: %p\n", int_treasure_map);
// address in int_treasure_map: 0x7ffe5123e044
printf("address in char_treasure_map: %p\n", char_treasure_map);
// address in char_treasure_map: 0x7ffe5123e044
printf("value by int_treasure_map: %d\n", *int_treasure_map);
// value by int_treasure_map: 777
printf("value by char_treasure_map+0: %d\n", *char_treasure_map);
// value by char_treasure_map+0: 9
printf("value by char_treasure_map+1: %d\n", *(char_treasure_map+1));
// value by char_treasure_map+1: 3
// А могу ещё и в переменную засунуть
char* char_treasure_map_2 = ((char*)&treasure) + 2;
printf("value by char_treasure_map+2: %d\n", *char_treasure_map_2);
// value by char_treasure_map+2: 0
// А могу ещё вот так на 1 вперёд сдвинуть
char_treasure_map_2++;
printf("value by char_treasure_map+3: %d\n", *char_treasure_map_2);
// value by char_treasure_map+3: 0
// А могу в обратную сторону сдвинуть
char_treasure_map_2 -= 3;
printf("value by char_treasure_map+0: %d\n", *char_treasure_map_2);
// value by char_treasure_map+0: 9
```

![Адресная арифметика](/assets/images/c-pointers-arithmetic.png)

Если ты прибавляешь/отнимаешь от указателя на char единицу, то адрес изменится на 1, а если ты прибавишь/отнимешь единицу от указателю на int, то адрес изменится на 4. Почему так происходит?

Тут как раз вступают типы указателей -- в зависимости от типа указателя, смещение происходит на число байт, равное размеру значения этого типа. То есть, для:

* void и char смещаемся на 1 байт
* short int смещаемся на 2 байта
* int и float смещаемся на 4 байт
* double смещаемся на 8 байт

# Сравнение адресов

Ещё их можно между собой сравнивать:

```c
int a, b;
int *p_a = &a, *p_b = &b;
printf("a: %p\nb: %p\n", p_a, p_b);
if (p_a < p_b)
	printf("Variable 'b' has bigger address\n");
else
	printf("Variable 'a' has bigger address\n");
```

У получается такой вывод:

```
a: 0x7ffca02f6860
b: 0x7ffca02f6864
Variable 'b' has bigger address
```

Попробуй запустить у себя, скорее всего у тебя будет наоборот -- адрес "a" будет больше адреса "b".

Почему? У меня стоит операционная система Linux, а на ней адреса, при создании новых переменных, растут от меньших к большим. То есть сначала в памяти выделются ячейки для переменной "a", а затем для переменной "b" новые ячейки выделяется справа от "a".

У тебя же скорее всего стоит Windows -- в ней адреса при создании переменных растут в обратном направлении, от больших к меньшим. То есть сначала в памяти выделяются ячейки для переменной "a", а затем для переменной "b" новые ячейки выделяются слева от ячейки "a".

# Заключение

Итого, ты узнал что такое:

* Указатель (карта)
* Адрес (координаты)
* Порядок байт (от большего к меньшему, от меньшего к большему)
* Разыменование (получение значения переменной, на которую указывает указатель)
* Указатель на указатель (карта, на которой указаны координаты другой карты)
* Тип указателя (если тип не совпадает, то можно что-то сломать; странный тип void)
* Адресная арифметика (перемещаемся туда-сюда относительно текущего адреса на кол-во байт, зависящее от размера типа)
* Сравнение адресов (сравниваем адреса; адреса выделяются по-разному в разных ОС)

Ты отлично постарался! Это очень сложная тема, и ничего страшного, если с первого раза что-то не понятно. На реальных задачах эта тема уже усвоится окончательно.

А реальные задачи появятся в следующей статье, в которой мы рассмотрим массивы.