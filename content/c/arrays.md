---
title: C. Arrays
date: 2021-11-04
---

An array (array) is a continuous sequence of bytes that store a set of values of a certain type.

Simply put, a variable holds a value, while an array holds a set of variables.

In the last article, we examined pointers from all sides - then they will come in handy for us!

The array is declared like this:

```c
int arr[3];
```

Here:

* int is the type of values that are stored in the array
* arr -- pointer to the first element of the array
* \[3\] -- array size

Before we start filling in the values, let's see how the variable and array are stored in memory:

![Variable and array in memory](/assets/images/c-array-vs-variable.png)

That is, in fact, an array is just a set of variables that are located side by side in memory.

As you remember from [article](../pointers) about pointers, you can add numbers to them to move them back and forth in memory.

In the illustration, I showed that by adding a number, you can shift to the first, second or third element of the array.

# Fill the array

Let's try to write something to this array and display its values:

```c
int arr[3];
for(int i = 0; i < 3; i++)
{
    // Fill in the array: write 1 to the zero element, two to the first element, and three to the second.
    *(arr+i) = i+1;
}
for(int i = 0; i < 3; i++)
{
    printf("Element %d: %d\n", i, *(arr+i));
}
/* Conclusion:
   Element 0: 1
   Element 1: 2
   Element 2: 3 */
```

Wow, look how great loops are with pointers - they're just made for each other!

# Indices

To make it easier to work with arrays, indexes have been introduced into the language - and they allow you to shorten the record of accessing an array element:

```c
int arr[3];
// Write 3 to the last element of the array
*(arr+2) = 3;
// Do the same
arr[2] = 3;
```

There are no tricks here - you just need to remember 3 rules:

* Specify only indexes within the first and last element of the array
* The index of the first array element is 0 (zero pointer offset)
* The index of the last element of the array is N-1 (N is the size of the array)

> If you break these rules, then you will read or write values to memory cells, which can contain anything.

# An example of using arrays

Task "Monthly temperature"

* Read the size of an array and fill it with integer values
* Calculate the arithmetic mean of the array elements (average temperature)
* Display the maximum and minimum elements of the array (maximum and minimum temperature)

```c
// 31 because that's the maximum possible number of days in a month
int temperature[31];
int days;
scanf("%d", &days);
if(days < 1 || days > 31)
{
    printf("Incorrect days amount!\n");
    return 0;
}
for(int i = 0; i < days; i++)
{
    // We tell you for which day we enter the value (+1 so that the days start from 1)
    printf("Day %d temperature: ", i+1);
    // Don't dereference anything because we need to specify an address in scanf
    scanf("%d", temperature+i);
    // It can also be written like this (this option is even preferable):
    // scanf("%d", &temperature[i]);
}
double average = 0;
int min, max;
// Fill with the first value from the array, so that later we can compare with it
min = max = temperature[0];
for(int i = 0; i < days; i++)
{
    // Temporary variable to shorten the entry in the following operations
    int temp = temperature[i];
    // Look for the minimum and maximum value
    min = min > temp ? temp : min;
    max = max < temp ? temp : max;
    // Sum the average temperature...
    average += temp;
}
// ... to divide it by the number of days
average /= days;
printf("Average temperature: %.1lf\nMin temperature: %d\nMax temperature: %d\n",
        average, min, max);
```

# Multidimensional arrays

So far, I have only shown working with a one-dimensional array, but in general they are two-, three-, four-, and as many as you like-dimensional.

What for? Sometimes tasks arise when you need to store several data sets at once.

For example, in the task above, I had to store the temperature for each day of the month. But what if I needed to store the temperature for each day of the month for a year - that is, 12 arrays for each month? Here in this situation the two-dimensional array also would be useful to me.

A little lower I will write a modified program that works with all months, but for now I will show how to work with multidimensional arrays:

```c
int arr[3][2];
for(int i = 0; i < 3; i++)
{
    for(int j = 0; j < 2; j++)
    {
        scanf("%d", &arr[i][j]);
    }
}
for(int i = 0; i < 3; i++)
{
    for(int j = 0; j < 2; j++)
    {
        printf("Element [%d][%d]: %d = %d = %d = %d\n", i, j,
                arr[i][j],
                *(arr[i] + j),
                *(*(arr + i) + j),
                *((int*)arr + 2*i + j));
    }
}
/* Output (I entered the values 1 2 3 4 5 6):
   Element [0][0]: 1 = 1 = 1 = 1
   Element [0][1]: 2 = 2 = 2 = 2
   Element [1][0]: 3 = 3 = 3 = 3
   Element [1][1]: 4 = 4 = 4 = 4
   Element [2][0]: 5 = 5 = 5 = 5
   Element [2][1]: 6 = 6 = 6 = 6 */
```

Ummm... What is this black magic there in the output?

I'll explain now!

In fact, multidimensional arrays in memory look exactly the same as one-dimensional ones:

![Multidimensional array](/assets/images/c-arrays-dimensions.png)

The only difference is that you can jump between arrays with the first index, and jump between array elements with the second index.

And at the expense of black magic - you didn't forget that the index is just an abbreviated notation of dereferencing?

```c
int arr[3][2];
arr[i][j] == *( *(arr + i) + j )
```

Okay, why do we add a number to arr and then dereference it?

The trick is that arr is not a simple pointer, as in the case of a one-dimensional array - arr is a pointer to an array with size 2.

So when we add a number to this pointer, it is shifted by (array size * array element size) bytes:

```c
// Shift arr right 8 bytes = 2 (array size) * 4 (int size)
arr + 1
```

If we dereference it, we get a second array -- a pointer to its first element:

```c
*(arr + 1)
// Same as
arr[1]
```

And to get the value of an array element, we already remember how we worked with one-dimensional arrays:

```c
*( *(arr + 1) + 1 )
// Same as
arr[1][1]
```

All the same can be done with a regular pointer, but then we ourselves need to make sure that we correctly switch between arrays (multiply the index by the size of the array):

```c
*((int*)arr + 2*i + j))
```

> If you use the latter method with a regular pointer, then you can not even bother with multidimensional arrays, but store multidimensional data in a one-dimensional array (but this is usually not done).

Three-dimensional arrays are not much different from two-dimensional ones - they just add another layer of pointers:

```c
int arr[3][4][5];

// int element
arr[1][2][3] == *( *( *(arr + 1) + 2 ) + 3 )

// Pointer to an array of 5 int elements
arr[1][2] == *( *(arr + 1) + 2 )

// Pointer to an array of 4 elements,
// where each element is an array of 5 int elements
arr[1] == *(arr + 1)

// Pointer to an array of 3 elements,
// where each element is an array of 4 elements,
// where each element is an array of 5 int elements
arr
```

# An example of using multidimensional arrays

As promised, I rewrite the program for a multidimensional array:

```c
int temperature[12][31];
int months, days;
scanf("%d", &months);
if(months < 1 || months > 12)
{
    printf("Incorrect months amount!\n");
    return 0;
}
scanf("%d", &days);
if(days < 1 || days > 31)
{
    printf("Incorrect days amount!\n");
    return 0;
}
for(int i = 0; i < months; i++)
{
    printf("Month %d\n", i+1);
    for(int j = 0; j < days; j++)
    {
        printf("Day %d temperature: ", i+1);
        scanf("%d", &temperature[i][j]);
    }
}
double average = 0;
int min, max;
min = max = temperature[0][0];
for(int i = 0; i < months; i++)
{
    for(int j = 0; j < days; j++)
    {
        int temp = temperature[i][j];
        min = min > temp ? temp : min;
        max = max < temp ? temp : max;
        average += temp;
    }
}
average /= months * days;
printf("Average temperature: %.1lf\nMin temperature: %d\nMax temperature: %d\n",
        average, min, max);
/* Input:
   2
   2
   Month 1
   Day 1 temperature: 4
   Day 1 temperature: 5
   Month 2
   Day 2 temperature: 11
   Day 2 temperature: -10

   Output:
   Average temperature: 2.5
   Min temperature: -10
   Max temperature: 11 */
```

# Dynamic arrays

Before that, I showed how to work with static arrays - that is, we know at the time of writing the program how much memory it will take maximum.

However, sometimes you:

* Can't guess the maximum array size
* Want to save memory and use as much as you need

In this case, you need to use dynamic arrays:

```c
int size;
scanf("%d", &size);
int *arr = (int*)malloc(size * sizeof(int));
if(arr == NULL)
{
    printf("Can't allocate %d bytes\n", size);
    return 0;
}
for(int i = 0; i < size; i++)
{
    scanf("%d", &arr[i]);
}
```

In this program, I read the size of an array, allocate memory for it, and fill it with values.

And how do I allocate memory, what kind of malloc is this?

### malloc

**malloc** is a function contained in "stdlib.h". She:

* Addresses the operating system, and requests the allocation of the specified number of bytes (in the program, I specified size * int size)
* If the operating system can allocate that many bytes, then the function returns a pointer to the first byte of the allocated memory block (a pointer of type `void*` is returned, so I explicitly cast it to `int*`)
* If the operating system cannot allocate such a number of bytes, then the function returns NULL (in fact, this is a zero address)
* **DOES NOT fill** the memory with zeros - what was there before will remain in memory

> Usually malloc does its job, and NULL is returned only in exceptional situations. For educational purposes, you don't have to check the result for NULL, but when developing serious software that people's lives may depend on, the check is __required__.

### calloc

In addition to malloc, there is also a **calloc** function -- it does almost the same thing, but with the following differences:

* The parameters separately indicate the size of the array and the size of the array element
* calloc **FILL** with zeros allocated memory

Here is an example of its use (not much different):

```c
int size;
scanf("%d", &size);
int *arr = (int*)calloc(size, sizeof(int));
if(arr == NULL)
{
    printf("Can't allocate %d bytes\n", size);
    return 0;
}
for(int i = 0; i < size; i++)
{
    scanf("%d", &arr[i]);
}
```

### free

Once you've allocated memory, it needs to be freed -- the operating system won't do that until the program terminates.

> The situation in which allocated memory is not freed is called a **memory leak**. In most cases, this leads to a crash of the program, since the running program captures all the computer's RAM, and cannot get more.

There is a free function to free memory. Here's how it's used:

```c
int size;
scanf("%d", &size);
int *arr = (int*)calloc(size, sizeof(int));
if(arr == NULL)
{
    printf("Can't allocate %d bytes\n", size);
    return 0;
}
for(int i = 0; i < size; i++)
{
    scanf("%d", &arr[i]);
}
free(arr);
```

### Always-always-always remember - the operating system lends your program RAM, and the debts must be repaid.

# An example of using a dynamic multidimensional array

And once again I will rewrite the program to show how to work with dynamic memory in the case of multidimensional arrays:

> Pointers to pointers will be used here -- if you forgot what it is, you can refresh your memory [article](../pointers) by pointers.

```c
int** temperature;
int months, days;
scanf("%d", &months);
if(months < 1 || months > 12)
{
    printf("Incorrect months amount!\n");
    return 0;
}
scanf("%d", &days);
if(days < 1 || days > 31)
{
    printf("Incorrect days amount!\n");
    return 0;
}

// Allocate memory for an array of int* pointers
temperature = (int**)calloc(months, sizeof(int*));
if(temperature == NULL)
    return 0;
    for(int i = 0; i < months; i++)
{
    // Allocate memory for an array of int values,
    // and write the address to this memory in the pointer
    temperature[i] = (int*)calloc(days, sizeof(int));
    if(temperature[i] == NULL)
    {
        // Free all arrays of int values that have been allocated
        for(int j = 0; j < i; j++)
            free(temperature[j]);
        // Free the array of int* pointers
        free(temperature);
        return 0;
    }
}

for(int i = 0; i < months; i++)
{
    printf("Month %d\n", i+1);
    for(int j = 0; j < days; j++)
    {
        printf("Day %d temperature: ", i+1);
        scanf("%d", &temperature[i][j]);
    }
}
double average = 0;
int min, max;
min = max = temperature[0][0];
for(int i = 0; i < months; i++)
{
    for(int j = 0; j < days; j++)
    {
        int temp = temperature[i][j];
        min = min > temp ? temp : min;
        max = max < temp ? temp : max;
        average += temp;
    }
}
average /= months * days;
printf("Average temperature: %.1lf\nMin temperature: %d\nMax temperature: %d\n",
        average, min, max);
for(int i = 0; i < months; i++)
{
    // Free the memory allocated for the array of int values
    free(temperature[i]);
}
// Free the memory allocated for the array of int* pointers
free(temperature);
```

# Conclusion

In total, you learned what is:

* Array (many variables)
* One-dimensional arrays
* Indexes (short for dereferencing)
* Multidimensional array (array of arrays)
* Dynamic arrays (allocate and deallocate as much memory as needed)
