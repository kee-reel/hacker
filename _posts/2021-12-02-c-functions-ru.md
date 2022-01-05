---
title: C. Функции
published: true
tag: c
lang: ru
---

Функция (function) -- это механизм, позволяющий вынести часть логики программы в отдельный блок, который можно многократно исполнять из разных мест прогаммы.

Вот пример использования функции в программке, которая спрашивает у пользователя некоторые данные и даёт советы (сомнительного качества):

```c
#include <stdio.h>
// Определил индексы для каждого ответа, чтобы было легче читать код
#define AGE 0
#define LIKES_C 1
#define ICE_CREAM 2

int get_response(int min_response, int max_response)
{
	int response;
	char is_ok;
	do {
		scanf("%d", &response);
		is_ok = response >= min_response && response <= max_response;
		if(!is_ok)
			printf("Your response must be in range [%d, %d]\n", min_response, max_response);
	} while(!is_ok);
	return response;
}

int main()
{
	int responses[3];
	printf("Your age (from 1 to 124): ");
	responses[AGE] = get_response(1, 124);

	printf("Rate how much do you like C programming language (from 1 to 10): ");
	responses[LIKES_C] = get_response(1, 10);

	printf("How many times a week do you eat ice cream (from 1 to 7): ");
	responses[ICE_CREAM] = get_response(1, 7);

	printf("Suggestions:\n");
	if(responses[ICE_CREAM] >= 5)
		printf("Please, stop eating so much ice cream - it's bad for your health!\n");
	else if(responses[ICE_CREAM] >= 3 && responses[AGE] > 70)
		printf("Eating too much sugar could increase chance of getting diabetes in your age!\n");

	if(responses[LIKES_C] < 5)
		printf("Come on, C could be fun and also it's awesome base for excelent programmer career! You should reconsider!\n");
	else
		printf("High five!\n");
}
```

Это называется **определением** функции (в следующем разделе разберём подробно):

```c
int get_response(int min_response, int max_response)
{
	int response;
	char is_ok;
	do {
		scanf("%d", &response);
		is_ok = response >= min_response && response <= max_response;
		if(!is_ok)
			printf("Your response must be in range [%d, %d]\n", min_response, max_response);
	} while(!is_ok);
	return response;
}
```

Это называется **вызовом** функции:

```python
get_response(1, 10)
```

Если бы я не использовал функцию, то код выглядел бы так (скопировал код из функции в места её вызова):

```c
#include <stdio.h>
// Определил индексы для каждого ответа, чтобы было легче читать код
#define AGE 0
#define LIKES_C 1
#define ICE_CREAM 2

int main()
{
	char is_ok;
	int response;
	int responses[3];
	printf("Your age (from 1 to 124): ");
	do {
		scanf("%d", &response);
		is_ok = response >= 1 && response <= 124;
		if(!is_ok)
			printf("Your response must be in range [1, 124]\n");
	} while(!is_ok);
	responses[AGE] = response;

	printf("Rate how much do you like C programming language (from 1 to 10): ");
	do {
		scanf("%d", &response);
		is_ok = response >= 1 && response <= 10;
		if(!is_ok)
			printf("Your response must be in range [1, 10]\n");
	} while(!is_ok);
	responses[LIKES_C] = response;

	printf("How many times a week do you eat ice cream (from 1 to 7): ");
	do {
		scanf("%d", &response);
		is_ok = response >= 1 && response <= 7;
		if(!is_ok)
			printf("Your response must be in range [1, 7]\n");
	} while(!is_ok);
	responses[ICE_CREAM] = response;

	printf("Suggestions:\n");
	if(responses[ICE_CREAM] >= 5)
		printf("Please, stop eating so much ice cream - it's bad for your health!\n");
	else if(responses[ICE_CREAM] >= 3 && responses[AGE] > 70)
		printf("Eating too much sugar could increase chance of getting diabetes in your age!\n");

	if(responses[LIKES_C] < 5)
		printf("Come on, C could be fun and also it's awesome base for excelent programmer career! You should reconsider!\n");
	else
		printf("High five!\n");
}
```

ААААА, больно читать!

Тут сразу вылезает несколько проблем:

* Если я захочу в дальнейшем добавить ещё десять вопросов, то мне надо будет скопировать-вставить эти блоки ввода 10 раз
* Если после этого я захочу изменить вид сообщения, которое выводится при вводе числа не в указанных пределах, то мне придётся изменить это сообщение во **ВСЕХ** местах
* Если мне надо будет починить ошибку в этом блоке кода, который дублируется, мне надо будет исправить её во **ВСЕХ** местах
* Читать такой код стало на порядок сложнее -- подобный код (в котором много дублирования) называется говно-кодом (код низкого качества)

Чтобы избежать этих проблем, вовремя выноси дублирующийся код в функции -- хороший код должен читаться как хорошая книга.

Давай посмотрим как это делать и из чего состоит функция.

# Определение функции

В прошлом разделе я использовал такую функцию:

```c
int get_response(int min_response, int max_response)
{
	int response;
	char is_ok;
	do {
		scanf("%d", &response);
		is_ok = response >= min_response && response <= max_response;
		if(!is_ok)
			printf("Your response must be in range [%d, %d]\n", min_response, max_response);
	} while(!is_ok);
	return response;
}
```

На первой строчке описана **сигнатура** функции. Сигнатура, это полное описание всех свойств функции, которое состоит из следующих частей.

### Название функции

* В примере это "get\_response". 
* Имя, которое мы будем писать чтобы вызвать эту функцию.
* Требования к имени функции такие же, как к имени переменной.

### Параметры (аргументы) функции

* В примере это два int параметра "min\_response" и "max\_response".
* Параметры, которые мы будем передавать в функцию для того, чтобы она что-то с нимим сделала.
* Параметры являются локальными переменными, которым присваисваиваются значения, переданные в функицю.
* Требования к имени параметра такие же, как к имени переменной.
* Тип параметра может быть любым.

### Возвращаемое значение

* В этом примере это "int" в начале строчки.
* Значение, которое функция возвращает в то место, откуда её вызвали.
* Тип возвращаемого значения может быть любым.
* В примере функция возвращает int значение в место вызова (в месте вызова это значение записывается в массив responses).
* Очень часто переменные просто исполняются, и не возвращают никаких значний -- в этом случае надо использовать тип возвращаемого значения void.
* Чтобы вернуть значение, надо написать "return ЗНАЧЕНИЕ;" (в случае void простос "return;") -- эта операция завершает выполнение функции и программа продолжает выполняться в месте вызова функции.

# Определение (прототип) и реализация функции

Так, с функцией разобрались -- давай теперь разберёмся как её описать в программе.

Сначала два важных понятия:

* Определение (definition) функции -- сигнатура функции (**определение также называют прототипом**)
* Реализация (implementation) функции -- сигнатура функции + текст функции

Описать функцию можно двумя способами:

### Сначала определение, потом реализация

```c
#include <stdio.h>

// Определение (definition)
void test();

int main()
{
	// Вызов функции test
	test();
}

// Реализация (implementation)
void test()
{
	printf("I'm function implementation!\n");
}
```

Смотри, есть одно **важное** правило:

> Вызов функции должен располагаться в коде **после** её определения.

То есть такой код не скомпилируется:

```c
// НЕ СКОМПИЛИРУЕТСЯ
#include <stdio.h>
int main()
{
	test();
}
void test()
{
	printf("I'm function implementation!\n");
}
// НЕ СКОМПИЛИРУЕТСЯ
```

Ага, понятно -- поэтому там определение сначала написано. А что со вторым вариантом?

### Только реализация

```c
#include <stdio.h>

void test()
{
	printf("I'm function implementation!\n");
}

int main()
{
	test();
}
```

Здесь реализация функции выступает сразу и определением -- и мы без проблем можем вызвать её в main().

# Задание на закрепление

Создай функцию, которая возвращает int число 42 и выведи её значение в функции main().

Опиши функцию двумя способами: "сначала определение, потом реализация" и "только реализация".

# Возможные трудности

У начинающих мастеров владения функциями возникают проблемы такого характера:

* Как мне веруть больше одного значения?
* Почему я передаю указатель, а туда не записывается адрес на выделенную память?
* Как объединить две похожих функции?

Давай разберём эти проблемы.


### Как мне веруть больше одного значения?

Как ты успел заметить, в функции можно указать только одно возвращаемое значение. Однако, это не проблема для мастера владения функциями:

```c
#include <stdio.h>
// В параметрах - указатели на переменные
void get_multiple_results(int value, int *a, int *b, int *c)
{
	// Через операцию разыменования достаю и записываю значения в a, b, c
	*a = *a * 2 + value;
	*b = *b / 2 + value;
	*c = *c % 2 + value;
}

int main()
{
	int a = 1, b = 2, c = 4;
	// Передаю адреса переменных a, b, c
	get_multiple_results(1, &a, &b, &c);
	printf("%d %d %d\n", a, b, c); // 3 2 1
}
```

Вот и пригодились указатели.

### Почему я передаю указатель, а туда не записывается адрес на выделенную память?

Вот пример кода с ошибкой:

```c
#include <stdio.h>

void fill_arr(int *arr, int n)
{
	arr = (int*)calloc(n, sizeof(int));
	if(arr == NULL)
		return;
	for(int i = 0; i < n; i++)
		scanf("%d", &arr[i]);
}

int main()
{
	int *A = NULL;
	fill_arr(A, 5);
	A[0]; // Ошибка! A == NULL
}
```

Здесь проблема в том, что параметр arr это **локальная переменная** функции fill\_arr, которая просто **скопировала** себе адрес переменной A.

Из-за того что arr это вообще другая переменная, в переменную A адрес на выделенную память так и не доходит. Что можно сделать?

Есть два пути:

* Вспомнить что надо передавать **адрес** переменной, чтобы туда что-то записать:

```c
#include <stdio.h>

void fill_arr(int **arr, int n)
{
	*arr = (int*)calloc(n, sizeof(int));
	if(*arr == NULL)
		return;
	for(int i = 0; i < n; i++)
		scanf("%d", &(*arr)[i]);
}

int main()
{
	int *A = NULL;
	fill_arr(&A, 5);
	// Не забываем предохраняться от NULL
	if(A == NULL)
		return 0;
	A[0]; // Всё ок!
}
```

* Вспомнить что существует возвращаемое значение

```c
#include <stdio.h>

int* fill_arr(int n)
{
	int *arr = (int*)calloc(n, sizeof(int));
	if(arr == NULL)
		return arr;
	for(int i = 0; i < n; i++)
		scanf("%d", &arr[i]);
	return arr;
}

int main()
{
	int *A = fill_arr(&A, 5);
	// Не забываем предохраняться от NULL
	if(A == NULL)
		return 0;
	A[0]; // Всё ок!
}
```

Если что, то в случае, когда ты просто хочешь поработать с существующим массивом внутри функции, ничего такого делать не надо -- параметр функции просто скопирует адрес твоего указателя, и ты будешь работать с ним как обычно.

### Как объединить две похожих функции?

Например, у тебя есть две функции -- одна ищет в массиве максимальное положительное число, а другая минимальное положительное число:

```c
#include <stdio.h>

int find_max(int *arr)
{
	int max_i = -1;
	for(int i = 0; i < n; i++)
		if(arr[i] > 0 && (max_i == -1 || arr[i] > arr[max_i]))
			max_i = i;
	return max_i;
}

int find_min(int *arr)
{
	int min_i = -1;
	for(int i = 0; i < n; i++)
		if(arr[i] > 0 && (min_i == -1 || arr[i] < arr[min_i]))
			min_i = i;
	return min_i;
}

int main()
{
	int A[] = {-1, 0, 2, 5, 11};
	int max_i = find_max(A), min_i = find_min(A);
	printf("%d %d\n", max_i, min_i); // 4 2
}
```

Можно объединить функцию поиска в одну, добавив в функцию параметр, который будет определять максимальное или минимальное число надо найти:

```c
#include <stdio.h>

int find(int *arr, char is_max)
{
	int res_i = -1;
	for(int i = 0; i < n; i++)
		// Вынес, чтобы сократить запись большой проверки
		if(arr[i] >= 0)
			continue;
		if(res_i == -1 || (is_max ? arr[i] > arr[res_i] : arr[i] < arr[res_i]))
			res_i = i;
	return res_i;
}

int main()
{
	int A[] = {-1, 0, 2, 5, 11};
	int max_i = find(A, 1), min_i = find(A, 0);
	printf("%d %d\n", max_i, min_i); // 4 2
}
```

Было две, стала одна -- благодаря этому область поиска возможных ошибок сократилась вдвое и модифицировать код стало легче (например, если я захочу переделать алгоритм под поиск в матрице).

> Процесс, в результате которого код становится удобнее читать и поддерживать, называется **рефакторингом** (refactoring).

Также, если у тебя какая-либо функция разрастается настолько, что не помещается даже на полтора экрана -- лучше задуматься о вынесении каких-то кусков этой функции в отдельные функции. При этом не важно, что эта функция будет использоваться однократно -- зато читать такой код будет намного легче (это важнее).

# [](#header-1)Заключение

Итого, ты узнал что такое:

* Функция
* Сигнатура функции
	* Имя
	* Параметры (аргументы)
	* Возвращаемое значение
* Определение (прототип) функции
* Реализация функции
* Возвращение нескольких параметров
* Передача массивов
* Объединение функций
* Рефакторинг

