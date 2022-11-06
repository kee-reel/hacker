---
title: Python. Функции
date: 2021-08-28
tag: python
lang: ru
---

Функция (function) -- это механизм, позволяющий вынести часть логики программы в отдельный блок, который можно многократно исполнять из разных мест прогаммы.

Вот пример определения функции:

```python
# def -- сокращённо от слова define (определить)
# У функции может не быть параметров:
def someFunctionName():
    value = 5
    # return (вернуть) - оператор, который возвращает переданное значение в место вызова функции
    return value + 2
    # Всё, что находится после return не будет исполнено, так как после return программа выйдет
    # из функции, и продолжит исполнение в месте вызова функции
    print('This will never be printed')

a = 3
# Чтобы вызвать функцию необходимо написать её имя, а затем в круглых скобках указать её параметры
# Количество и позиции параметров должны быть такими же, как в определении функции
b = someFunctionName()
print(b)
# 7
```

Это называется **определением** функции:

```python
def someFunctionName():
    value = 5
    return value + 2
```

Это называется **вызовом** функции:

```python
b = someFunctionName()
```

Также, у функции могут быть указаны принимаемые параметры:

```python
def anotherFunctionName(parameter_1, parameter_2):
    # Можно использовать полученные параметры как любые другие переменные
    # Но только внутри функции -- снаружи переменных с таким именем не будет
    result = (parameter_1 + parameter_2) * 10
    return result

a = 2
b = 5
c = anotherFunctionName(a, b)
print(c)
# 70
```

### Задание на закрепление

Скопируй этот код:

```python
result = myFirstFunction(2, 2)
if result == 4:
    print('Правильно :)')
else:
    print('Неправильно :(')

result = mySecondFunction(10)
if result == 100:
    print('Правильно :)')
else:
    print('Неправильно :(')
```

Определи функции myFirstFunction и mySecondFunction, чтобы мой код правильно выполнился.

> Функции необходимо определять **до того**, как ты их вызовешь (выше по тексту программы).

# Параметры по умолчанию

Иногда, тебе не нужно передавать каждый раз одни и те же параметры -- для этого ты можешь использовать параметры по умолчанию. Пример:

```python
def someFunction(a, b=2, c=4):
    return a + b + c

# Если не передавать параметры, то будут использованы значени по умолчанию:
result = someFunction(1) # Вернёт 7
# Если передать параметры (почти все или все), то будут использованы переданные значения:
result = someFunction(1, 16) # Вернёт 21
result = someFunction(1, 16, 32) # Вернёт 49

# Но нельзя не указывать параметр "a", так как для него нет значения по умолчанию
result = someFunction() # ОШИБКА
```

Также, есть способ передачи параметров, когда указывается имя параметра функции. Он используется реже, но тоже полезен, если у вас в функции много параметров по умолчанию. Пример:

```python
# Можно указать первые два:
result = someFunction(a=8, b=16)
# Можно указать первый и последний:
result = someFunction(a=8, c=32)
# Или все сразу
result = someFunction(a=8, b=16, c=32)
```

### Задание на закрепление

Скопируй этот код:

```python
result = myFirstFunction()
if result == 4:
    print('Правильно :)')
else:
    print('Неправильно :(')

result = myFirstFunction(a=3)
if result == 5:
    print('Правильно :)')
else:
    print('Неправильно :(')

result = myFirstFunction(b=1)
if result == 3:
    print('Правильно :)')
else:
    print('Неправильно :(')

result = mySecondFunction()
if result == 100:
    print('Правильно :)')
else:
    print('Неправильно :(')

result = mySecondFunction(value=20)
if result == 400:
    print('Правильно :)')
else:
    print('Неправильно :(')
```

Определи функции myFirstFunction и mySecondFunction, чтобы мой код правильно выполнился.

# Переменное количество параметров

В некоторых ситуациях тебе не важно само количество параметров, которые ты хочешь передать в функцию -- например, когда ты передаёшь список параметров. В этом случае ты можешь использовать переменное количество параметров. Например:

```python
# Если перед названием параметра указывается "*", то этот параметр является списком.
def funcWithManyParams(*params):
    result = 0
    # params - список, и работать мы с ним можем как с обычным списком
    for param in params:
        if param % 2 == 0:
            result += param
        else:
            result -= param
    return result
# Мы передаём параметры как обычно, а питон их сам соберёт и превратит в список
print(funcWithManyParams(1, 2, 3)) # Вывод: -2
print(funcWithManyParams()) # Вывод: 0
print(funcWithManyParams(10)) # Вывод: 10
```

Переменное количество параметров можно комбинировать и с обычными параметрами, но параметр со "\*" должен быть в конце списка параметров. Пример:

```python
def funcWithCombinedParamTypes(value1, value2, *values):
    result = value1 * value2
    for value in values:
        result += value
    return result
print(funcWithManyParams(1, 2, 10, 20, 30)) # Вывод: 62
print(funcWithManyParams(1, 2, 3)) # Вывод: 5
print(funcWithManyParams(1, 2)) # Вывод: 2
print(funcWithManyParams()) # ОШИБКА: Надо обязательно указать два первых параметра
```

### Задание на закрепление

Скопируй этот код:

```python
result = myFirstFunction(2)
if result == 2:
    print('Правильно :)')
else:
    print('Неправильно :(')

result = myFirstFunction(2, 4)
if result == 6:
    print('Правильно :)')
else:
    print('Неправильно :(')

result = myFirstFunction(5, 10, 15)
if result == 30:
    print('Правильно :)')
else:
    print('Неправильно :(')

result = mySecondFunction(5)
if result == 5:
    print('Правильно :)')
else:
    print('Неправильно :(')

result = mySecondFunction(5, 5)
if result == 25:
    print('Правильно :)')
else:
    print('Неправильно :(')

result = mySecondFunction(10, 9, 2)
if result == 180:
    print('Правильно :)')
else:
    print('Неправильно :(')
```

Определи функции myFirstFunction и mySecondFunction, чтобы мой код правильно выполнился.

# Рефакторинг

В программировании есть термин **рефакторинг** (refactoring, реструктуризация) -- это процесс, в ходе которого разработчик улучшает читаемость программного кода. Этот процесс можно сравнить с тем, как ты прибираешься в папках на своём компьютере (давно разбирал папку "Загрузки"?).

В процессе разработки больших проектов на это тратятся серьёзные деньги -- всё для того, чтобы поддерживать качество кодовой базы в чистоте и порядке. Если не заниматься рефакторингом, то со временем код проекта настолько усложниться, что разработчики будут постоянно путаться и тратить неприлично много времени даже на простые задачи.

Приведу пример рефакторинга в программном коде -- это код программы до рефакторинга:

```python
i = 1
combination = 3403
simpleNumbers = []
while i <= 100:
    j = i - 1
    isSimple = True
    while j > 1:
        if i % j == 0:
            isSimple = False
            break
        j -= 1
    if isSimple:
        simpleNumbers.append(i)
    i += 1
valueFound = False
for num1 in simpleNumbers:
    for num2 in simpleNumbers:
        if num1 * num2 == combination:
            valueFound = True
            break
    if valueFound:
        break
if valueFound:
    print(f'Values for combination {combination} is {num1} and {num2}')
else:
    print(f'Values for combination {combination} is not found')
```

Да, если добавить комментарии, то будет понятнее что происходит:

```python
i = 1
# Публичный ключ, для которого надо подобрать комбинацию
combination = 3403
# Список простых чисел, который будет заполнен
simpleNumbers = []
while i <= 100:
    j = i - 1
    isSimple = True
    # Для всех чисел от i-1 до 2 проверяем делятся ли они нацело на i
    while j > 1:
        if i % j == 0:
            # Если делится нацело, то ставим isSimple в False и прерываем цикл
            isSimple = False
            break
        # Берём следующее число
        j -= 1
    # Если после всех чисел isSimple остался True, то ни одно число не делится нацело
    if isSimple:
        # Добавляем найденное число в список
        simpleNumbers.append(i)
    # Берём следующее значение
    i += 1
valueFound = False
# Для всех простых чисел пытаемся найти такие два простых числа, множество которых будет равно combination
for num1 in simpleNumbers:
    for num2 in simpleNumbers:
        if num1 * num2 == combination:
            # Если нашли подходящую комбинацию, то прерываем цикл
            valueFound = True
            break
    # Внешний цикл тоже надо прервать
    if valueFound:
        break
if valueFound:
    print(f'Values for combination {combination} is {num1} and {num2}')
else:
    print(f'Values for combination {combination} is not found')
```

Комментарии, конечно, нужны, но код программы от этогого только ещё больше раздувается. Можно разбить весь этот код на несколько функций, и тогда каждая функция в отдельности будет небольшой, и мы сможем быстрее понять как работает эта программа:

```python
def getSimpleNumbers(maximumNumber):
    i = 1
    simpleNumbers = []
    while i <= maximumNumber:
        j = i - 1
        isSimple = True
        while j > 1:
            if i % j == 0:
                isSimple = False
                break
            j -= 1
        if isSimple:
            simpleNumbers.append(i)
        i += 1
    return simpleNumbers

def findCombination(simpleNumbers, combination):
    for num1 in simpleNumbers:
        for num2 in simpleNumbers:
            if num1 * num2 == combination:
                # Возвращаем кортеж (tuple) из двух значений
                return (num1, num2)
    # Если ничего не нашли, то вернём False
    return False

def hack(combination):
    simpleNumbers = getSimpleNumbers(100)
    foundCombination = findCombination(simpleNumbers, combination)

    if foundCombination == False:
        print(f'Values for combination {combination} is not found')
        return

    num1, num2 = foundCombination
    print(f'Values for combination {combination} is {num1} and {num2}')

# Прямо как в фильмах про хакеров, всё взламывается одной строчкой :)
hack(3403)
```

Вскоре ты сам начнёшь замечать места, которые можно упростить или написать красивее -- это приходит с опытом.

# Заключение

Итого, мы изучили:

* Что такое функции
* Параметры по умолчанию
* Переменное количество параметров
* Рефакторинг

Если что -- пиши, я помогу и постараюсь объяснить лучше.

Дальше мы рассмотрим классы и объекты -- основу построения сложных программ.
