---
language: en
title: C. Cycle
date: 2021-09-30
---

A loop is a mechanism that allows you to perform many similar actions.

There are three kinds of loops in the C language:

* for
* while
* do while

# Cycle for

Here is an example of a loop definition for solving the problem "display all even numbers from 1 to n (not inclusive)":

```c
int n;
scanf("%d", &n);
for(int i = 1; i < n; i++)
{
    if(i % 2 == 0)
    {
        printf("%d\n", i);
    }
}
```

Let's see what the cycle consists of.

### Create a temporary variable

```c
int i = 1;
```

This code is executed __before__ the loop starts -- it usually creates a temporary variable that will be used inside the loop.

### Termination condition

```c
i < n;
```

This code is executed before each execution of the loop body, and returns a __boolean__ value.

In this example, the temporary variable i is compared with the entered number n.

Let's say we entered the number 10 -- the condition will be true as long as i is less than 10. The moment the expression in the condition evaluates to false -- the loop will end.

### Increment of temporary variable

```c
i++
```

The increment of a temporary variable is usually written here. Thanks to this code, the loop changes the value of i after each loop.

### Loop body

```c
{
    if(i % 2 == 0)
    {
        printf("%d\n", i);
    }
}
```

Usually, code is written here that somehow uses temporary variables - here it is the variable i, which is used to check for divisibility.

### Together

Once again I will write the code with a loop and add additional logs (message output) to better understand what is happening:

```c
int n;
scanf("%d", &n);
for(int i = 1; i < n; i++)
{
    if(i % 2 == 0)
    {
        printf("%d\n", i);
    }
}
```

Thus, the sequence of application of expressions inside the loop definition is as follows:

1. Create a temporary variable:
```c
int i = 1;
```
Let's move on to step 2.

2. Check conditions:
```c
i < n;
```
If the value is:
* true -- go to step 3
* false -- go to step 5.

3. Execution of the loop body:
```c
{
    if(i % 2 == 0)
    {
        printf("%d\n", i);
    }
}
```
Let's move on to step 4.

4. Increment of temporary variable:
```c
i++
```
Let's move on to step 2.

5. End of cycle.

This is what this program will display (if we enter 10 from the keyboard):

```
2
4
6
8
```

You see, the line "Loop through:" ends at 8, because when i becomes 10, the i < n condition is not met, and the loop ends.

# While loop

If you understand the for loop, then you won't have any problems with while - it's much easier.

Here's what it looks like (I used it to describe the same task as above):

```c
int x;
scanf("%d", &x);
printf("Find divisors of %d", x);
int div = 2;
while(div < x)
{
    printf("Loop through: %d\n", div);
    if(x % div == 0)
    {
        printf("Found divisor: %d\n", div);
    }
    div++;
}
```

Here you need to describe only the condition that will be checked before passing each loop. I simply moved the creation of a temporary variable and the increment to the appropriate places.

The output of the program will be the same.

> It's very important to remember to increment when using a while loop! I don’t even remember how many times I got an infinite loop (the loop condition is always true), due to the lack of a variable increment - it remained at the initial value, and the loop endlessly threshed for nothing.

# Do while loop

The same eggs, only from the side - in the while loop, the condition is checked before the execution of the loop body, and in the do while loop, the check is performed after the loop body.

```c
int x;
scanf("%d", &x);
printf("Find divisors of %d", x);
int div = 2;

if(div >= x)
{
    return;
}

do
{
    printf("Loop through: %d\n", div);
    if(x % div == 0)
    {
        printf("Found divisor: %d\n", div);
    }
    div++;
}
while(div < x);
```

It seems that nothing much has changed, but for some reason I added a check:

```c
if(div >= x)
{
    return;
}
```

I explain why - due to the fact that the loop condition will be checked only after passing through the loop body, I need to make sure that the number entered by the user fits the div < x condition.

Imagine that this additional condition is not present -- if the user enters -10:

* Loop body will start executing
* We will write "Loop pass: 2"
* We will find divisor -10 with dev == 2, and write "Found divisor: 2"
* And only after that we get to the check div < x (-10 < 2), which will return false

And this is already a bug!

> Bug is a slang term in programming, denoting an error in writing a program that led to unwanted behavior.
> Yes version, that for the first time in relation to a software error this term was used in 1947, when they found a very real "bug" in a computer relay cars:
> ![First bug](/assets/images/first-bug.png)

# Break loop and skip iteration

In the C language (and also in C++, Python, JS, Go and other languages) there is a way to break the loop and skip the current iteration.

### break

**break** allows you to **exit** the loop ahead of time.

For example, we have a task to "print 10 even numbers from 1 to 100":

```c
int count = 10;
for(int i = 1; i < 100; i++)
{
    if(i % 2 == 0)
    {
        count--;
        printf("%d\n", i);
        if(count == 0)
            break;
    }
}
```

### continue

**continue** allows you to skip the **current iteration** and immediately start the next one (there will be an increment of the temporary variable).

The task "on a given interval, calculate the sum of odd numbers and subtract from it the sum of numbers divisible by 3":

The same task "print 10 even numbers from 1 to 100":

```c
int count = 10;
for(int i = 1; i < 100; i++)
{
    if(i % 2 != 0)
        continue;

    count--;
    printf("%d\n", i);
    if(count == 0)
        break;
}
```

Typically, continue is used to reduce the nesting level of conditions in a loop.

# Nested loops

Within one loop, you can run more loops. The task is to print N prime numbers:

```c
int N;
scanf("%d", &N);
// As long as N is greater than zero
for(int i = 2; N > 0; i++)
{
    printf("%d\n", i);
    char is_prime_number = 1;
    // For all j from 2 to i
    for(int j = 2; j < i; j++)
    {
        // A prime number can only be divisible by 1 and itself.
        // If divisible by something else, then it's not prime.
        if(i % j == 0)
        {
            is_prime_number = 0;
            break;
        }
    }
    if(is_prime_number)
    {
        printf("%d\n", i);
        N--;
    }
}
```

That is, for each number i we create a cycle in which we try to divide it by all numbers from 2 to i.

# Task for fixing

For all numbers in the interval \[2, N\] (N is entered from the keyboard), find the sum of squares of even numbers and divide it by their number.

# Conclusion

In total, you have learned:

* Cycle for
* While loop
* Do while loop
* Cycle interruption (break)
* Skip iteration (continue)
* Nested Loops

With the help of loops, you can already solve quite complex tasks - bypass large data arrays (more on that later), calculate approximate values of mathematical functions, look for numbers with certain properties (for example, find 1000 prime numbers) and much more.

If anything - write, I will help and try to explain better.

Next, we'll look at how you can structure your programs -- functions.
