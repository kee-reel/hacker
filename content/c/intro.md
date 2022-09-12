---
title: C. Введение
date: 2021-09-07
tag: c
lang: ru
---

В этой статье я расскажу что такое языки программирования и в частности про C.

Сразу скажу, я сторонник обучения сверху-вниз -- сначала объясняю глобально, а потом перехожу к частностям. Это помогает построить в голове карту предметной области, при помощи которой тебе будет проще в будущем систематизировать свои знания.

![Карта IT](/assets/images/it-map-c.png)

# Что такое язык программирования

Язык программирования -- это язык на котором можно описать последовательность инструкций в том виде, в котором его сможет прочитать компьютер. В каждом языке программирования есть чёткий набор правил, которые необходимо соблюдать.

> Можешь провести параллель, и вспомнить как ты в школе изучал русский язык -- нужно заучить разные правила, писать много сочинений и диктантов. Язык программирования придётся учить так же, только вместо сочинений и диктантов -- задания на решение задач.

Давай представим, что ты знаешь все описанные правила, и можешь без ошибок писать на языке программирования C (как на русском). Что такого ты ещё можешь узнать о языке, что позволит тебе лучше понимать написанное?

# Особенности реализации языка программирования

Так как языки программирования созданы для того, чтобы описывать последовательность инструкций, которые должен выполнить компьютер, важно понимать как именно компьютер будет их исполнять.

> На самом деле, ты можешь писать программный код и без этих знаний, но тогда ты с большей вероятностью напишешь то, что будет работать ненадёжно или неэффективно. Надёжность и эффективность кода являются ключевыми показателями качества, и если они будут сильно хромать, то ты не поднимешься выше позиции Middle.

Существует множество классификаций языков программирования, давай рассмотрим самые важные:
* Декларативный или императивный язык программирования
* Динамическая или статическая типизация
* Интерпретируемый или компилируемый язык программирования
* Язык программирования со сборщиком мусора и без него

## Декларативный или императивный язык программирования

![Декларативный или императивный язык программирования](/assets/images/declarative-imperative-programming.png)

Декларативный язык программирования описывает результат, а императивный описывает последовательность инструкций, выполнение которых приведёт к какому-то результату.

Сначала пример на русском -- допустим мы хотим свежего хлеба. Так бы выглядела программа на декларативном языке:

```
Хочу: свежий хлеб
Откуда: из магазина
Если нет: вчерашний хлеб
```

Так бы выглядела программа на императивном языке:

```
если(сейчас зима) то
	надеть верхнюю одежду
открыть дверь
выйти
закрыть дверь
спуститься
<место> = магазин "Булочная" по адресу ул. Ленина 1
до тех пор, пока не (прибыл на <место>) делать
	идти к <место>

достать кошелёк
<свежий хлеб есть> = спросить "Есть свежий хлеб?"
если (<свежий хлеб есть>) то
	<выбранный хлеб> = свежий хлеб
иначе
	<выбранный хлеб> = вчерашний хлеб

попросить <выбранный хлеб>
передать кассиру стоимость за <выбранный хлеб>
забрать <выбранный хлеб>
вернуться домой
подняться
открыть дверь
зайти
закрыть дверь
если(сейчас зима) то
	снять верхнюю одежду
```

Намного сложнее, да? Однако, вместе со сложностью, мы можем очень точно определить всю последовательность действий, которые приведут к результату. На декларативном языке тоже можно определять некоторые аспекты выполнения, однако такой же точности достигнуть нельзя.

Приведу примеры декларативного и императивного подхода в программированнии. Задача -- вывести имя и зарплату работников, у которых зарплата выше 30 тысяч.

Декларативный язык SQL (для описания запросов в базу данных):

```sql
SELECT name, salary FROM workers WHERE salary > 30000;
```

Императивный язык C:

```c
// Подключаем заголовочные файлы
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
// Функция main -- точка входа в программу
int main()
{
    char *path = "/home/keereel/workers_salary.txt";
    // Открываем файл на чтение
    FILE *file = fopen(path, "r");
    // Проверяем что файл открылся
    if (!file)
    {
        printf("Файл не найден\n");
        return EXIT_FAILURE;
    }
    // Создаём переменные, в которые будем считывать значения из файла
    char firstName[50], middleName[50], lastName[50];
    int salary;
    // Считываем первую строчку из файла
    int bytesRead = fscanf(file, "%s %s %s %d", firstName, middleName, lastName, &salary);
    // Если что-то получилось считать, то...
    while (bytesRead > 0)
    {
        // Если salary больше 3000, то выводим эти данные
        if(salary > 30000)
            printf("Имя: %s %s %s; Зарплата: %d\n", firstName, middleName, lastName, salary);
        // Читаем следующую строчку
        bytesRead = fscanf(file, "%s %s %s %d", firstName, middleName, lastName, &salary);
    }
    // Закрываем файл
    if (fclose(file))
    {
        return EXIT_FAILURE;
    }
}

```

Примеры декларативных языков: HTML, CSS, SQL, Haskell

Примеры императивных языков: Python, **C**, C++, Java

## Динамическая или статическая типизация

![Динамическая или статическая типизация](/assets/images/dynamic-static-typing.png)

Эту классификацию сложнее объяснить тем, у кого нет существующего опыта программирования, но я постараюсь. Представь, что ты убираешься в комнате, и у тебя есть много коробок, в которые ты будешь складывать вещи.

Динамическая типизация -- это когда ты можшь положить в любую коробку всё что угодно.

Статическая типизация -- это когда ты можешь складывать в одну коробку только определённый тип предметов.

У обоих подходов есть свои плюсы и минусы:

**Динамическая типизация**

\+ Можно быстро всё раскидать по коробкам

\- Если типов вещей очень много, то рано или поздно ты начнёшь путаться в какой коробке что лежит

**Статическая типизация**

\+ Благодаря систематизации того, в каких коробках что лежит, запутаться сложнее

\- Необходимо подписывать тип каждой коробки, и систематизировать уже не сами вещи, а типы коробок

Приведу примеры динамической и статической типизации.

Динамическая типизация в Python:

```python
a = 5
b = 6.1
c = a + b
print(f'{a} + {b} = {c}') # Выведет: 5 + 6.1 = 11.1
```

Статическая типизация в C:

```c
int a = 5;
float b = 6.1;
float c = a + b;
printf("%d + %f = %f\n", a, b, c); // Выведет: 5 + 6.1 = 11.1
```

Примеры языков с динамической типизацией: Python, Java Script, PHP, Ruby

Примеры языков со статической типизацией: **C**, C++, Java, C#

## Интерпретируемый или компилируемый язык программирования

![Интерпретируемый или компилируемый язык программирования](/assets/images/interpreted-compiled-languages.png)

Интерпретируемый язык программирования может исполняться сразу, а компилируемый необходимо сначала перевести в другую форму, которую уже сможет прочитать компьютер.

И опять же, у каждого подхода есть свои плюсы и минусы:

**Интерпретируемый язык**

\+ Можно исполнять (**интерпретировать**) написанный код программы сразу

\- Есть небольшая задержка перед исполнением кода, что снижает скорость выполнения

**Компилируемый язык**

\+ Весь код программы исполняется сразу, без задержек

\- Перед исполнением кода программы необходимо перевести (**скомпилировать**) код программы в бинарный файл, который сможет читать компьютер. В зависимости от размера проекта может занимать от секунд, до десятков часов

Примеры интерпретируемых языков: Python, Java Script, PHP, Ruby

Примеры компилируемых языков: **C**, Java, C#, Rust

## Язык программирования со сборщиком мусора и без него

![Язык программирования со сборщиком мусора и без него](/assets/images/garbage-collector.png)

Сборщик мусора (GC, Garbage Collector) -- механизм, который автоматически освобождает неиспользуемую память.

Вернёмся к примеру с коробками из "Динамическая или статическая типизация" -- представь что ты убрался в комнате, и всё у тебя лежит по коробкам. Спустя какое-то время тебе надо что-то оттуда доставать, использовать или перекладывать в новые коробки. В то время, как ты вытаскиваешь предметы из коробок, какие-то из них пустеют, и тебе нужно что-то с ними делать.

Проводя параллель с компьютером -- каждая коробка это какой-то участок памяти, который использует твоя программа. Если ты не будешь (выбрасывать коробки)/(освобождать память), то у тебя рано или поздно закончится (место в доме)/(свободная оперативная память компьютера).

Сборщик мусора позволяет тебе не думать про (выбрасывание коробок)/(освобождение памяти), и сам следит какие (коробки)/(участки памяти) больше не используются.

Ты возможно спросишь:

### А почему бы тогда не использовать сборщик мусора во всех языках программирования?
Вопрос этот справедливый, и вот ответ -- потому что сборщик мусора не бесплатный, и тебе нужно выделять какую-то часть ресурсов на его работу. Если ты сам за собой (выбрасываешь коробки)/(освобождаешь память), то это будет более эффективным решением.

**ОДНАКО**, если ты не будешь пользоваться сборщиком мусора, то тебе нужно о-о-о-о-о-очень внимательно следить за тем, что ты действительно (выбрасываешь коробки)/(освобождаешь память) за собой, а то твоя программа может просто упасть из-за недостатка (места в доме)/(свободной оперативной памяти компьютера).

> Ситуация, когда разработчик не уследил за освобождением памяти называется **"утечка памяти"**.

Приведу примеры написания программы на языке, в котором есть сборщик мусора и в котором его нет. Задача -- создать список значений от 1 до N (N - может изменяться).

Программа на языке Python, в котором есть сборщик мусора:

```python
N = 7
# Создаём список со значениями от 1 до N
numbers = []
for i in range(1, N+1):
    numbers.append(i) # Дополнительная память автоматически выделяется при вставке нового значения
print(numbers) # Выведет: [1, 2, 3, 4, 5, 6, 7]
# Память высвобождать не надо -- при выходе она сама освободится
```

Программа на языке C, в котором нет сборщика мусора:

```c
int N = 7;
// Выдляем память под N целочисленных значений
int* numbers = malloc(sizeof(int) * N);
// Заполняем массив значениями от 1 до 7
for(int i = 0; i < N; ++i)
{
    numbers[i] = i + 1;
}
// Выводим значения массива
for(int i = 0; i < N; ++i)
{
    printf("%d", numbers[i]);
}
// Высвобождаем память
free(numbers);
```

Примеры языков со сборщиком мусора: **Python**, Java Script, Java, C#

Примеры языков без сборщика мусора: **C**, C++, Rust

# Итог

* Ты узнал что язык программирования это язык, в котором есть строгие правила
* Если все эти правила удовлетворяются, то язык программирования может быть прочитан компьютером, и исполнен
* Кроме правил у языка программирования есть особенности его реализации
* Есть декларативные (простые и общие) и императивные (сложные и детальные) языки
* Есть динамическая (всё в одну коробку) и статическая (много разных коробок по типам) типизация
* Есть интерпертируемые (моментально по чуть-чуть) и компилируемые (после компиляции всё сразу) языки
* Есть языки со сборщиком мусора (сам забирает коробки) и без него (надо самим заботиться о выбрасывании коробок)

Теперь ты настолько крут, что можешь понять это предложение:

### Си это компилируемый императивный язык программирования со статической типизацией и без сборщика мусора

Дальше мы с тобой будем изучать сами правила написания программ на языке C -- начнём с переменных.

Если что -- пиши, я помогу и постараюсь объяснить лучше.