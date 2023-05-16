---
language: en
title: C. Operators
date: 2021-09-11
---

An operator is a thing with which you can perform an operation (addition, subtraction, etc.)

There are two kinds of operators:

* Unary -- for operations on a single variable
* Binary -- for operations on two variables

> There is also a ternary one (with three variables), but we will remember about it when we talk about conditions (if, else).

## Binary operators

Let's start with binary ones, because they are closer and more understandable:

* Build: +
* Subtraction:-
* Multiplication: *
* Division: /
* Remainder of the division: %

Be aware that operators have different application precedence -- for example, the classic example:

```
2 + 2 * 2 = ?
```

If your answer is 8, then you forgot that multiplication is performed before addition. Here everything is exactly the same - first * / % are executed from left to right, and then + - are also executed.

However, just like in math, you can use parentheses to change the order of operations:

```
(2 + 2) * 2 = 8
```

Operators can be used in a variety of ways:

* With integer values
* With real values
* With mixed values
* With cast
* With assignment operation
* For villains

Yes, the C language has a lot of subtleties with operators, but it will all be remembered over time - just try to catch the main points.

### With integer values

Here are examples of using operations on integer values:

```c
int a = 15, b = 8;
int result;
result = a+b; // Assign 23
result = a - b; // Set to 7
result = a*b; // Assign 120
result = a/b; // Set to 1 because it's 1.875, and since it's an integer (int) -- the fractional part will just be discarded
result = a % b; // Assigned to 7 because dividing 15 by 8 gives 1 whole part, and 7 is the remainder
result = a + b * 2; // Assign 31
result = (a + b) * 2; // Assign 46
```

### With real values

Here are examples of using operations on real values:

```c
float a = 7., b = 4.4;
float result;
result = a+b; // Assigned to 11.4
result = a - b; // Assigned to 2.6
result = a*b; // Assign 30.800001
// Why 30.800001 and not 30.8? Because float calculations are accurate to a certain point.
// sign -- beyond this sign, madness can begin. This is due to the nature of storage.
// real numbers in memory. If you use double instead of float, then the precision will increase and
// will increase to the farthest decimal place.
result = a/b; // Assign 1.590909
result = a % b; // !!! ERROR, operation "%" cannot be used with real numbers!!!
```

> Note that the % operator cannot be used with real numbers.

### With mixed values

Okay, operations separately with integers, separately with real values are clear - but what if you mix integers and real values in one operation?

In this case, the result will turn into a real:

```c
int a = 5;
float b = 4.5;
float floatResult = a + b; // Assigned 9.5
// Set to 9 because the result of 9.5 is pushed into
// an integer variable, and the fractional part is discarded
int intResult = a + b;
// This is true for all other operations: - * /
```

### With cast

In some cases, it may turn out like this, you have only integer variables in your hands, but you need to divide them into each other, and get a real result. Here is an example situation:

```c
int a, b;
float result;
scanf("%d", &a); // Entered 6
scanf("%d", &b); // Entered 4
// Integer result 1 will be written to a real variable,
// because of which the integer value is implicitly converted to real 1.000000
result = a / b;
print("%f\n", result); // Outputs 1.000000
```

Note that in this case we have written an integer value to a real variable. In this case, the integer value is **implicitly converted** to a real value.

What can I do to get the correct division result of 1.5?

To do this, there is an **explicit cast** type operation - with its help, you can change the type of the variable value directly in the expression. Here's what it looks like:

```c
int a, b;
float result;
scanf("%d", &a);
scanf("%d", &b);
// You can cast not only the dividend, but in general any variable or number in the expression,
// and not only to double, but to any type in general.
result = (double) a / b;
print("%f\n", result);
```

In this case, 1.500000 will be printed, because one of the variables becomes real, and as we know from the previous section "With mixed values" - "the result will turn into a real".

> I have shown the most useful use case for type casting, but there may be other exotic cases.

### With assignment operator

Binary operators can be beautifully combined with the assignment operator:

```c
int a = 3;
// Here is the entry:
a = a + 10;
// Equivalent to this:
a += 10;
// This is true for all other operations: -= *= /= %=
```

### For villains

Just so you know, there is a use case for assignment with operators for villains that you don't have to use (but you can):

```c
int a = 2, b = 3, c = 4, d = 5;
a += (b += 5) * (c = 10) + d;
// Rewrite the same, but not in a villainous way:
b = b + 5; // Execute first parenthesis first
c = 10; // Then the second
a = a + b * c + d; // Then we substitute the variables in the original expression
```

# Task for fixing

For now, I'll give you a couple of simple tasks to stretch your fingers. I won’t invent any complicated equations - just if you need to calculate something complicated in the future, then you just return to this material. After a couple of times, it itself will sit in the subcortex.

Tasks:

* Write a program that takes a student number from the keyboard (scanf) and prints (printf) the number of his version. The total number of options is from 0 to 14. For example, if the student has number 0 or 15, then he will have option 0. If the student has number 2 or 17, then option 2. Hint: %
* Write a program that takes three real numbers from the keyboard and prints the sum of the first two numbers multiplied by the third.

## Unary operators

You probably didn’t see them before, since they are used only in programming:

* Increment (increases the value of a variable by 1): ++
* Decrement (decreases the value of a variable by 1): --

This is how they are used:

```c
int x = 5;
x++; // After that, x will be equal to 6
x--; // And now x is 5 again
```

There is a tricky point with these operators - **it matters which side the operator is on**. If the operator stands:

* Left -- the operation occurs until the value of the variable is received
* Right -- operation occurs after getting the value of the variable

It's easier to show with an example:
```c
int x, result;

x = 3;
// After this line, result will be 3 and x will be 4:
// that is, we first performed the assignment operation, and then incremented the variable x
result = x++;

// Reset x value to 3
x = 3;
// After this line, result is 4 instead of 4:
// that is, we first made an increment, and then performed an assignment operation
result = ++x;

// Reset x value to 3
x = 3;
// After this line, result is 8 and x is 4:
// that is, we first performed the addition operation, and then did the increment
result = x++ + 5;

// Reset x value to 3
x = 3;
// After this line, result is 9 and x is 4:
// that is, we first made an increment, and then performed an assignment operation
result = ++x + 5;
```

# Conclusion

In total, you have learned:

* Binary operators
* With integer values
* With real values
* With mixed values
* With cast
* With assignment operation
* For villains
* Unary operators

If anything - write, I will help and try to explain better.

Next in line are conditions.
