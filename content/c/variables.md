---
title: C. Variables
date: 2021-09-10
---

One of the key concepts in programming is the concept of **variable**.

Variables store values used in the program.

# Variable types

Variables can be of the following types:

* char is an integer that occupies 1 byte
* int -- an integer that occupies 4 bytes
* float -- real number that occupies 4 bytes
* double -- real number that occupies 8 bytes

> Depending on the compiler and bitness of the system (x64 or x86), the size of the int type can take 2, 4 or 8 bytes. Further in the article I will show how to find out how much it takes on your machine.

Here is an example of defining variables in C:

```c
// You can do this: TYPE NAME;
four shepherds;
// or like this: TYPE NAME = VALUE;
int intVariable = 777;
// or like this (more than one variable of the given type): TYPE VARIABLE_NAME, OTHER_VARIABLE_NAME;
int anotherIntVariable1, anotherIntVariable2;
// or like this: TYPE VARIABLE_NAME = VALUE, OTHER_VARIABLE_NAME;
float floatVariable = 983.223, anotherFloatVariable;
// If there are no signs after the decimal point, then instead of "766.0" you can simply write "766."
double doubleVariable = 766.;
```

* The symbol "=" means the operation **assignment** -- it overwrites the value of the variable with the specified one. It can be used not only when creating a variable, but also separately:

```c
four shepherds;
charVariable = 42;
int a, b, c = 7;
// This is how you can assign a value to as many variables at once:
a = b = 24;
```

<!--<div class="test_section" id='task_1'></div>-->

* The variable name can contain any numbers, Latin letters (large and small) and the symbol "\_". However, it must not start with a number - so "777variable" is not allowed.

* At the end of each line, you must put ";" -- How is that "." at the end of a sentence in Russian.

* Two slashes "//" indicate the start of a comment. Comments are needed in order to leave notes in the text of the program, which will help to understand what is happening. Comments are not taken into account when executing program code.

Why did I mention bytes when describing types? The fact is that the number of bytes limits the size of the number that we can "throw" into a variable.

Why it happens? Let's remember school computer science - here is the representation of integer values in binary form:

![Байты в int](/assets/images/c-byte-int.png)

It turns out that the more bytes we allocate for the variable, the more bits there will be, and the greater the number we can write there. Here are the minimum and maximum values for all types:

* char: -128, 128
* int: -2147483647, 2147483648
* float: -3.4*10^38, 3.4*10^38
* double: -1.7*10^308, 1.7*10^308

Note that one bit at the very beginning of the number is always used to store the sign. Imagine that you always work with positive numbers - why did he give up on you in that case?

There are **type modifiers** specifically for this.

# Variable type modifiers

There are three modifiers in total:

* unsigned -- makes the type unsigned (by default all types are signed)
* short -- decrements the default number of bytes of the type
* long -- increments the default number of bytes of the type

However, not all types can be used with all modifiers. Here are all possible combinations:

* char -- signed integer, 1 byte
* unsigned char -- unsigned integer, 1 byte
* int -- signed integer, 4 bytes
* long int -- signed integer, 4 bytes
* unsigned long int -- unsigned integer, 4 bytes
* short int -- signed integer, 2 bytes
* unsigned short int -- unsigned integer, 2 bytes
* float -- real, 4 bytes
* double -- real, 8 bytes
* long double -- real, 16 bytes

It may seem complicated, but you don't have to memorize them! If you need type modifiers, then you will remember about them, look on the Internet and choose the right one.

# Input and output value

To enter and display a value, we will first use the functions:

* printf -- formatted output, prints a string to the console
* scanf -- formatted input, writes the value entered from the keyboard into a variable

How to work with them? Like this:

```c
int x;
// scanf(input_format_string, variable_address);
scanf("%d", &x);
// printf(output_format_string, value);
printf("Value from keyboard: %d\n", x);
```

* `input_format_string` is a string that in one case specifies the input format. Usually there is one value with "%" (I'll tell you about it now)
* `variable_address` -- since each variable is actually stored in memory, we can find out the address of the cell where this variable is stored. To get the address of a variable, write "&" in front of the name
variable. scanf takes the address of a variable in order to put the received data at the specified address.

![Variable address](/assets/images/c-memory-address.png)

> In this example, the addresses go from 0x0000 (0) to 0xFFFF (65535), but in a real computer there are many more addresses - up to 0xFFFFFFFF on x32 systems (maximum 4 GB of cells can be addressed per byte), and 0xFFFFFFFFFFFFFFFF on x64 systems (enough 17 exabytes for addressing is 17 billion GB).

* `output_format_string` is a string that specifies the output format. There can be any string, interspersed with values \u200b\u200bwith "%"
* value -- can be either a variable or a value (0, 77, 94.1)
* \n is the line break character (what happens when you press Enter)

YES WHO IS THIS YOUR "%" ?!

This is a special character that is required to indicate the type of input/output value. The type of the value is indicated by the letter after the "%":

* %hd -- one-byte integer (char)
* %d -- four-byte integer (int)
* %u -- four-byte unsigned integer (unsigned int)
* %f -- four-byte integer (float)
* %lf -- eight-byte integer (double)
* %p -- hexadecimal number to display address

> There are still other designations of types. If necessary, look for a description of the scanf or printf function.

In the scanf and printf functions, several values can be specified at once in the lines with the input / output format:

```c
char a;
int b;
float c;
// When entering these values, you need to separate the numbers with a space -- that is, I would enter "5 88 2.5", and press Enter
scanf("%hd %d %f", &a, &b, &c);
printf("a: %hd; b: %d; c: %f; The answer to life, the universe, and everything: %d", a, b, c, 42);
```

# Task for fixing

Copy this code into the IDE:

```c
#include <stdio.h>

int main()
{
int intVariable;
scanf("%d", &intVariable);
printf("Value of intVariable: %d\n", intVariable); // Here in this printf add the rest of the variables
printf ("Address of int Variable: %p\n", inVariable);
return 0;
}
```

Create three more new variables with types char, float and double -- fill them in with scanf, and print their values in a single printf.

Try to remove \n - what will change?

# Variable initialization

To avoid certain mistakes, you need to understand the peculiarity of creating variables in C (and in C ++) - if you do not immediately assign a value to it, then there can be any value you want.

Example:

```c
int a = 5;
int b;
```

We have created two variables:

* a -- memory will be allocated for this variable, and the value 5 will immediately be written to this memory
* b -- memory will also be allocated for this variable, but nothing will be written. This means that there will remain the value that was written there sometime before, when this memory was used (possibly by another program) for another variable

Because of this feature, you must not forget to initialize the variable with some value that you expect in it.

In some cases, it is not necessary to initialize a variable - for example, if something will definitely be written there:

```c
// In this case, you can not initialize the values:
// - a and b will be filled with the value from the keyboard
// - the sum of a and b will be written to result
int a, b, result;
// I'll tell you what scanf is in the next article
// For now, think of this as a way to store the value entered from the keyboard into a variable
scanf("%d", &a);
scanf("%d", &b);
result = a + b;
```

However, in this case, variable initialization is necessary:

```c
int a, b;
// In this case, it was necessary to initialize the variable a,
// since there can be any value (0, -341124, 777, etc.)
// and the sum of a + b will be unpredictable
scanf("%d", &b);
a = a + b;
```

# How to find out the size of a variable

At the very beginning of the article, I promised to show how you can find out how many bytes a variable of type int occupies.

To do this, you need the sizeof function. Here are some usage examples:

```c
int someIntVariable;
float someFloatVariable;
int sizeOfIntVariable = sizeof(someIntVariable), sizeOfFloatVariable = sizeof(someFloatVariable);
printf("size of int: %d, size of float: %d\n", sizeOfIntVariable, sizeOfFloatVariable);
// You can also do this, without intermediate variables:
// printf("size of int: %d, size of float: %d\n", sizeof(someIntVariable), sizeof(someFloatVariable));
```

The sizeof function returns the number of bytes that the specified variable occupies.

On my machine I got this line:

```
size of int: 4, size of float: 4
```

What is yours? :)

# Conclusion

In total, you have learned:

* Variables
* Variable types (char, int, float, double)
* Variable type modifiers (short, long, unsigned)
* Input and output value (scanf, printf)
* Addresses of variables
* Variable initialization feature
* How to find out the size of a variable (sizeof)

If anything - write, I will help and try to explain better.

Next in line are the operators.
