---
language: en
title: C. Introduction
date: 2021-09-07
tag: c
lang: ru
---

In this article I will tell you what programming languages are and in particular about C.

I must say right away that I am a supporter of top-down learning - first I explain globally, and then I turn to particulars. This helps to build a map of the subject area in your head, with the help of which it will be easier for you to systematize your knowledge in the future.

![IT Map](/assets/images/it-map-c.png)

# What is a programming language

A programming language is a language in which a sequence of instructions can be described in a way that a computer can read. Every programming language has a clear set of rules that must be followed.

> Can you draw a parallel, and remember how you studied Russian at school-you need to memorize different rules, write a lot of essays and dictations. The programming language will have to be taught in the same way, only instead of essays and dictations - assignments for solving problems.

Let's imagine that you know all the described rules, and you can write without errors in the C programming language (as in Russian). What else can you learn about the language that will allow you to better understand what is written?

# Features of the implementation of the programming language

Since programming languages are designed to describe the sequence of instructions that a computer must execute, it is important to understand exactly how the computer will execute them.

> In fact, you can write code without this knowledge, but then you are more likely to write something that will work unreliably or inefficiently. Reliability and efficiency of the code are key indicators of quality, and if they are very lame, then you will not rise above the position of Middle.

There are many classifications of programming languages, let's look at the most important ones:
* Declarative or imperative programming language
* Dynamic or static typing
* Interpreted or compiled programming language
* Programming language with and without garbage collector

## Declarative or imperative programming language

![Declarative or imperative programming language](/assets/images/declarative-imperative-programming.png)

A declarative programming language describes a result, while an imperative language describes a sequence of instructions whose execution will lead to some result.

First, an example in Russian - let's say we want fresh bread. This is what a program would look like in a declarative language:

```
I want fresh bread
From: from the store
If not: yesterday's bread
```

This is what a program in an imperative language would look like:

```
if (it's winter) then
    put on outerwear
open the door
log off
close the door
come down
<location> = Bakery store at st. Lenina 1
until (arrived at <location>) do
    go to <place>

get the wallet
<fresh bread to eat> = ask "Is there fresh bread?"
if (<fresh bread is>) then
    <selected bread> = fresh bread
otherwise
    <selected bread> = yesterday's bread

ask for <chosen bread>
give the cashier the price for <selected bread>
pick up <selected bread>
come back home
climb
open the door
come in
close the door
if (it's winter) then
    take off outerwear
```

A little harder, right? However, along with the complexity, we can very accurately determine the entire sequence of actions that will lead to the result. A declarative language can also define some aspects of execution, but the same precision cannot be achieved.

I will give examples of the declarative and imperative approach in programming. The task is to display the name and salary of employees whose salary is above 30 thousand.

Declarative SQL language (for describing database queries):

```sql
SELECT name, salary FROM workers WHERE salary > 30000;
```

Imperative language C:

```c
// Include header files
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
// The main function is the entry point to the program
int main()
{
    char *path = "./workers_salary.txt";
    // Open file for reading
    FILE *file = fopen(path, "r");
    // Check if the file is open
    if (!file)
    {
        printf("File not found\n");
        return EXIT_FAILURE;
    }
    // Create variables into which we will read values from the file
    char firstName[50], middleName[50], lastName[50];
    int salary;
    // Read the first line from the file
    int bytesRead = fscanf(file, "%s %s %s %d", firstName, middleName, lastName, &salary);
    // If something was counted, then...
    while (bytesRead > 0)
    {
        // If salary is greater than 3000, then output this data
        if(salary > 30000)
            printf("Name: %s %s %s; Salary: %d\n", firstName, middleName, lastName, salary);
        // Read next line
        bytesRead = fscanf(file, "%s %s %s %d", firstName, middleName, lastName, &salary);
    }
    // Close the file
    if (fclose(file))
    {
        return EXIT_FAILURE;
    }
}
```

Examples of declarative languages: HTML, CSS, SQL, Haskell

Examples of imperative languages: Python, **C**, C++, Java

## Dynamic or static typing

![Dynamic or static typing](/assets/images/dynamic-static-typing.png)

This classification is harder to explain to those with no existing programming experience, but I'll try. Imagine that you are cleaning the room and you have a lot of boxes in which you will put things.

Dynamic typing is when you can put anything in any box.

Static typing is when you can only put a certain type of item in one box.

Both approaches have their pros and cons:

**Dynamic typing**

\+ You can quickly scatter everything in boxes

\- If there are a lot of types of things, then sooner or later you will start to get confused in which box what lies

**Static typing**

\+ Thanks to the systematization of which boxes what is in, it is more difficult to get confused

\- It is necessary to sign the type of each box, and to systematize not the things themselves, but the types of boxes

I will give examples of dynamic and static typing.

Dynamic typing in Python:

```python
a = 5
b = 6.1
c = a + b
print(f'{a} + {b} = {c}') # Prints: 5 + 6.1 = 11.1
```

Static typing in C:

```c
int a = 5;
float b = 6.1;
float c = a + b;
printf("%d + %f = %f\n", a, b, c); // Output: 5 + 6.1 = 11.1
```

Examples of languages with dynamic typing: Python, Java Script, PHP, Ruby

Examples of languages with static typing: **C**, C++, Java, C#

## An interpreted or compiled programming language

![Interpreted or compiled programming language](/assets/images/interpreted-compiled-languages.png)

An interpreted programming language can be executed immediately, but a compiled language must first be translated into another form that the computer can already read.

Again, each approach has its pros and cons:

**Interpreted language**

\+ You can execute (**interpret**) the written code of the program immediately

\- There is a slight delay before the code is executed, which reduces the speed of execution

**Compiled language**

\+ All program code is executed immediately, without delay

\- Before executing the program code, it is necessary to translate (**compile**) the program code into a binary file that can be read by a computer. Depending on the size of the project, it can take from seconds to tens of hours

Examples of interpreted languages: Python, Java Script, PHP, Ruby

Compiled language examples: **C**, Java, C#, Rust

## Programming language with and without garbage collector

![Programming language with and without garbage collector](/assets/images/garbage-collector.png)

The garbage collector (GC, Garbage Collector) is a mechanism that automatically frees unused memory.

Going back to the box example from "Dynamic vs. Static Typing" -- imagine you've cleaned your room and everything is in boxes. After some time, you need to get something out of there, use it or transfer it to new boxes. While you are taking items out of the boxes, some of them are empty and you need to do something with them.

Drawing a parallel with a computer, each box is some piece of memory that your program uses. If you don't (throw away the boxes)/(free up memory), then sooner or later you will run out of (house space)/(free computer RAM).

The garbage collector lets you not think about (discarding boxes)/(deallocating memory), and keeps track of which (boxes)/(memory locations) are no longer in use.

You might ask:

### And why not use the garbage collector in all programming languages?
This question is fair, and here is the answer - because the garbage collector is not free, and you need to allocate some of the resources for its work. If you are on your own (throw away boxes)/(free memory), then this will be a more efficient solution.

**HOWEVER**, if you're not going to be using the garbage collector, then you'll need to oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo very careful to make sure you are really (throw away boxes)/(free memory) behind you otherwise your program may simply crash due to a lack of (space in the house) / (free computer RAM).

> The situation when the developer did not keep track of the release of memory is called **"memory leak"**.

I will give examples of writing a program in a language in which there is a garbage collector and in which it is not. The task is to create a list of values from 1 to N (N - can change).

Python program with garbage collector:

```python
N = 7
# Create a list with values from 1 to N
numbers = []
for i in range(1, N+1):
    numbers.append(i) # Additional memory is automatically allocated when a new value is inserted
print(numbers) # Prints: [1, 2, 3, 4, 5, 6, 7]
# No need to release the memory - it will free itself when exiting
```

A C program that does not have a garbage collector:

```c
int N = 7;
// Allocate memory for N integer values
int* numbers = malloc(sizeof(int) * N);
// Fill the array with values from 1 to 7
for(int i = 0; i < N; ++i)
{
    numbers[i] = i + 1;
}
// Display array values
for(int i = 0; i < N; ++i)
{
    printf("%d", numbers[i]);
}
// Free up memory
free(numbers);
```

Examples of languages with a garbage collector: **Python**, Java Script, Java, C#

Examples of languages without a garbage collector: **C**, C++, Rust

# Total

* You learned that a programming language is a language that has strict rules
* If all these rules are satisfied, then the programming language can be read by the computer and executed
* In addition to the rules, the programming language has features of its implementation
* There are declarative (simple and general) and imperative (complex and detailed) languages
* There are dynamic (everything in one box) and static (many different boxes by type) typing
* There are interpreted (instantly a little bit) and compiled (after compilation all at once) languages
* There are languages with a garbage collector (he picks up the boxes) and without it (you have to take care of throwing the boxes yourself)

Now you're so cool that you can understand this sentence:

### C is a compiled imperative programming language with static typing and no garbage collector

Next, you and I will study the very rules for writing programs in the C language - let's start with variables.

If anything - write, I will help and try to explain better.
