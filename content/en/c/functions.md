---
language: en
title: C. Functions
date: 2021-12-02
---

A function is a mechanism that allows you to move part of the program logic into a separate block that can be repeatedly executed from different places in the program.

Here is an example of using the function in a program that adds, squares, and displays integers:

```c
#include <stdio.h>

int add(int a, int b)
{
    int result = a + b;
    return result;
}

int square(int value)
{
    int result = value * value;
    return result;
}

void show_result(int result)
{
    printf("Result: %d\n", result);
}

int main()
{
    int result = 0;

    result = add(2, 2);
    show_result(result); // Result: 4

    result = square(4);
    show_result(result); // Result: 16

    result = add(result, square(2));
    show_result(result); // Result: 20
}
```

This is called **function definition** (more on that in the next section):

```c
int add(int a, int b)
{
    int result = a + b;
    return result;
}
```

This is called **calling** a function:

```python
add(2, 2)
```

```python
square(2)
```

Let's see how to do it and what the function consists of.

# Function definition

In the last section, I used this function:

```c
int add(int a, int b)
{
    int result = a + b;
    return result;
}
```

The first line describes the **signature** of the function. A signature is a complete description of all the properties of a function, which consists of the following parts.

### Function name

* In the example, this is "add".
* The name we will write to call this function.
* The requirements for a function name are the same as for a variable name.

### Function parameters (arguments)

* In the example, these are two int parameters "a" and "b".
* Parameters that we will pass to the function in order for it to do something with them.
* Parameters are local variables that are assigned the values passed to the function.
* The requirements for the parameter name are the same as for the variable name.
* The parameter type can be anything.

### Return value

* In this example, it is "int" at the beginning of the line.
* The value that the function returns to the place from which it was called.
* The return type can be anything.
* In the example, the function returns an int value at the call site.
* Very often, variables are simply executed and do not return any value - in this case, you should use the return type void.
* To return a value, write "return VALUE;" (in the case of void, just "return;") -- this operation terminates the execution of the function and the program continues executing at the site of the function call.

# Definition (prototype) and implementation functions

So, we figured out the function - now let's figure out how to describe it in the program.

First, two important concepts:

* Function definition -- function signature (**definition is also called prototype**)
* Function implementation -- function signature + function text

There are two ways to describe a function:

### First definition, then implementation

```c
#include <stdio.h>

// Definition (definition)
void test();

int main()
{
    // Call the test function
    test();
}

// Implementation
void test()
{
    printf("I'm function implementation!\n");
}
```

Look, there is one **important** rule:

> The function call must be placed in the code **after** its definition.

So this code won't compile:

```c
#include <stdio.h>
int main()
{
    // WILL NOT COMPILE
    test();
}
void test()
{
    printf("I'm function implementation!\n");
}
```

Yeah, it's clear - that's why the definition is first written there. What about the second option?

### Implementation only

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

Here, the implementation of the function acts immediately as a definition - and we can call it in main () without any problems.

# Task for fixing

Create a function that returns an int number 42 and output its value in the main() function.

Describe the function in two ways: "definition first, then implementation" and "implementation only".

# Possible difficulties

Beginning masters of function ownership have problems of the following nature:

* How can I believe more than one value?
* Why do I pass a pointer, but the address of the allocated memory is not written there?
* How to combine two similar functions?

Let's take a look at these problems.


### How can I trust more than one value?

As you have noticed, only one return value can be specified in a function. However, this is not a problem for the feature master:

```c
#include <stdio.h>
// In parameters - pointers to variables
void get_multiple_results(int value, int *a, int *b, int *c)
{
    // Through the dereference operation, I get and write the values to a, b, c
    *a = *a * 2 + value;
    *b = *b / 2 + value;
    *c = *c % 2 + value;
}

int main()
{
    int a = 1, b = 2, c = 4;
    // Passing addresses of variables a, b, c
    get_multiple_results(1, &a, &b, &c);
    printf("%d %d %d\n", a, b, c); // 3 2 1
}
```

This is where pointers come in handy.

### Why do I pass a pointer, but the address of the allocated memory is not written there?

Here is an example code with an error:

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
    A[0]; // Error! A == NULL
}
```

The problem here is that the arr parameter is a **local variable** of the fill\_arr function, which simply **copied** the address of variable A to itself.

Due to the fact that arr is a completely different variable, the address of the allocated memory never reaches variable A. What can be done?

There are two ways:

* Recall that you need to pass the **address** of a variable in order to write something there:

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
    // Don't forget to guard against NULL
    if(A == NULL)
        return 0;
    A[0]; // All OK!
}
```

* Recall that there is a return value

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
    int *A = fill_arr(5);
    // Don't forget to guard against NULL
    if(A == NULL)
        return 0;
    A[0]; // All OK!
}
```

If anything, then in the case when you just want to work with an existing array inside a function, you don’t need to do anything - the function parameter will simply copy the address of your pointer, and you will work with it as usual.

### How to combine two similar functions?

For example, you have two functions - one searches the array for the maximum positive number, and the other for the minimum positive number:

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

You can combine the search function into one by adding a parameter to the function that will determine the maximum or minimum number to be found:

```c
#include <stdio.h>

int find(int *arr, char is_max)
{
    int res_i = -1;
    for(int i = 0; i < n; i++)
    {
        // Rendered to shorten the big check entry
        if(arr[i] >= 0)
            continue;
    }
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

There were two, now there is one - thanks to this, the search area for possible errors has been halved and it has become easier to modify the code (for example, if I want to remake the algorithm for searching in a matrix).

> The process of making code easier to read and maintain is called **refactoring**.

Also, if your function grows so much that it does not even fit on one and a half screens, it is better to think about making some parts of this function into separate functions. It does not matter that this function will be used once - but it will be much easier to read such code (this is more important).

# Conclusion

In total, you learned what is:

* Function
* Function signature
* Name
* Parameters (arguments)
* Return value
* Function definition (prototype)
* Implementation functions
* Return multiple parameters
* Passing arrays
* Consolidation of functions
* Refactoring
