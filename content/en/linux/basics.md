---
language: en
title: Linux. Command line basics
date: 2021-08-11
---

Most likely you are reading this text in a browser window, which means you are using a graphical shell when working with the operating system. Now you open windows and click the cursor on the buttons and application icons, but this was not always the case.

50 years ago, all computer users saw something like this in front of them:

![Old computer with command line](/assets/images/old-computer-cli.png)

Imagine, for example, that even some Evlampia Sergeevna from the accounting department worked through the command line to generate a quarterly report.

Okay, before there were simply no graphical interfaces, and Evlampia Sergeevna had no alternatives - now why bother with this? I answer:

* If you set up a server that may be on the other side of the globe, you will have no alternative but to remotely connect to its console
* If you want to automate some scenario of working with a computer, the fastest way is to write a script that will execute the commands you have prescribed
* If you want to better understand how your computer works and improve something in it, there are a huge number of programs for the command line that allow you to look into the deepest aspects of your computer
* If you want to learn how to work comfortably even on the weakest computer - the command line is several orders of magnitude more productive than the graphical interface

If I convinced you, then connect your neural interface, cyber ninja - now you will learn how to:

* [View directory contents](#ls)
* [Browse directories](#cd)
* [Create directories](#mkdir)
* [Create and edit files](#nano)
* [Copy files/directories](#cp)
* [Move and rename files/directories](#mv)
* [Delete files/directories](#rm)

This is the **base** from which you will control your computer through the command line.

# Open command line

> In English there are well-established abbreviations:
> * Graphical shell -- GUI (Graphic User Interface), graphical user interface
> * Command line -- CLI (Command Line Interface), command line interface
>
> Also, the command line is called "Terminal" and "Console".

Regardless of whether you're on MacOS, Windows, or Linux, under the hood, the graphical shell and command line do the same thing - they interact with the operating system.

![GUI and command line do the same thing](/assets/images/gui-cli-os.png)

Okay, you already know how to move the cursor and press the buttons, but what commands you need to write in this console is completely unclear. There is no magic here - you have to remember the commands. This is not as difficult as it might seem at first glance, and after a couple of dozen repetitions, you will write them automatically.

To open the command line, you need to press the `Ctrl+Alt+T` combination or find the "Terminal" application among the installed applications.

# Command line prompt and home directory

A command prompt window will appear, in which you will see an inscription like:

```bash
kee-reel@blog:~$
```
Here is how it is deciphered:

| Symbol | Meaning |
|---|---|
| kee-reel | username specified during OS installation
| @ | separator character
| home computer | computer name specified during OS installation
| : | separating symbol |
| ~ | current directory |
| $ | current access mode ($ - normal user, # - administrator) |

This inscription is called Prompt (it can be translated into Russian as "invitation", but such a term is not used, but they simply say "promt").

The most important information here is what is in place `~` -- because we need to somehow understand where we are now in the file system.

For example, here is how the current directory looks in the graphical shell of Windows OS:

![Windows Explorer](/assets/images/windows-explorer.png)

On the command line it would look like this:

```bash
kee-reel@blog:~/Documents/Andrey/My Work$
```

By default, when you open a command prompt, you are in the "home" directory of the current user. It still contains all sorts of folders, like "Documents", "Downloads" and so on.

To shorten the notation in Prompt, the home directory is denoted by the character "~" (tilde). Actually the "~" home directory is in "/home/kee-reel" (each user will have their own folder in "/home").

> If you do not understand what all these "/home" mean, then look for an article about the structure of the file system in Linux.

# Execute commands

If you want to write some command, then it will be added after Prompt:

```bash
kee-reel@blog:~$ my-command
```

{{< ref ls >}}
### ls - directory contents

`ls` (from `LiSt`) -- find out what folders/files we have in the current directory:

```bash
kee-reel@blog:~$ ls
Desktop
Documents
Downloads
Music
```

> Also, you can specify the path to the directory in which you want to display a list of files: `ls Documents/OtherFolder/`

{{< ref cd >}}
### cd - change directory

`cd` (from `Change Directory`) -- change directory relative to the current one:

Let's go to the `Documents` folder:

```bash
kee-reel@blog:~$ cd Documents
```

You can see that the current directory in the prompt has also changed:

```bash
kee-reel@blog:~/Documents$
```

[33mDid you mean: [1m\u003e Можно указывать переход сразу через несколько папок: cd Documents/Folder/Programming[22m[0m
> You can specify the transition through several folders at once: cd Documents/MyFolder/Programming

[33mDid you mean: [1mЧтобы вернуться в предыдущую директорию, надо написать:[22m[0m
To return to the previous directory, write:

```bash
kee-reel@blog:~$ cd ..
```

Prompt will change accordingly:

```bash
kee-reel@blog:~$
```

{{< ref mkdir >}}
### mkdir - create directory

`mkdir` (from `MaKe DIRectory`) -- create a new folder in the current directory:

```bash
kee-reel@blog:~$ mkdir ultra
```

It can be seen with the `ls` command:

```bash
kee-reel@blog:~$ ls
Desktop
Documents
Downloads
Music
ultra
```

{{< ref nano >}}
### nano - text editor

You probably already have the `nano` editor installed -- it's a console-based text editor.

Let's use it to create a `test.txt` file in the `~/ultra` folder:

```bash
kee-reel@blog:~/ultra$ nano test.txt
```

An editor window will open:

![Nano Editor](/assets/images/nano-editor.png)

Try to write anything there. The input works like in any other editor - we type letters, create a new line with `Enter`, move the cursor with the keyboard arrows, erase with `Backspace` and `Delete`.

When you've played enough with the file, close it by pressing `Ctrl+X`. In doing so, you will be asked:

```bash
Save modified buffer?
Y Yes
N No        ^X Cancel
```

Press `Y` to save, `N` to close but don't save, `Ctrl+X` to cancel closing.

Let's say you pressed `Y` - you will be asked for the name of the file with which you want to save it:

`File name to Write: test.txt`

It seems that everything suits - press `Enter`.

That's it, the file is saved - try to display a list of files:

```bash
kee-reel@blog:~/ultra$ ls
test.txt
```

{{< ref cp >}}
### cp - copy file or folder

`cp` (from `CoPy`) -- copy a file or folder:

```bash
kee-reel@blog:~/ultra$ cp test.txt test_1.txt
```

You can check:

```bash
kee-reel@blog:~/ultra$ ls
test_1.txt
test.txt
```

To copy a folder, add the `-r` option:

```bash
kee-reel@blog:~$ cp -r ultra mega # made a copy of the ultra folder called mega
kee-reel@blog:~$ cd mega # moved to mega folder
kee-reel@blog:~/mega$ ls # list the contents of the mega folder
test_1.txt
test.txt
```

Program options like `-r` are quite common -- they're just additional specifiers that allow you to control how the program behaves. In the future, we will get to know them better.

{{< ref mv >}}
### mv - move file or folder

`mv` (from `MoVe`) -- move a file or folder:

```bash
kee-reel@blog:~/ultra$ mv test.txt ../ # moved the file test.txt to the parent folder (home folder there)
```

In addition to moving, this command can also rename files:

```bash
kee-reel@blog:~/ultra$ mv test_1.txt test_666.txt # renamed test.txt to test_666.txt
```

If you need to move a folder, then you do not need to specify the `-r` option (unlike `cp`):

```bash
kee-reel@blog:~$ mv mega super-mega # renamed mega folder to super-mega folder
```

{{< ref rm >}}
### rm - delete file or folder

`rm` (from `ReMove`) -- remove file or folder:

```bash
kee-reel@blog:~/ultra$ rm test_666.txt # deleted file test_666.txt
```

To delete a folder **with all the files in it**, you need to specify the `-r` option:

```bash
kee-reel@blog:~$ rm -r ultra # deleted the ultra folder
```

# **NEVER** do a "rm" command on a directory that starts with "/" -- this will delete all files on the computer

# Do NOT do this: "rm -rf /"
> The "-f" flag allows you to skip the confirmation prompt when deleting system files.

![rm rf](/assets/images/rmrf.png)


# [](#header-1)Output

In total, you learned 7 commands:

* ls - directory contents
* cd - change directory
* mkdir - create a directory
* nano - text editor
* cp - copy file/directory
* mv - move or rename a file/directory
* rm - delete file/directory

If you understand everything, then it's super-cool, if not, try to play with the commands again.

Next, we will see what directories generally exist in Linux - this will not take much time, and will have a positive effect on the general understanding of the operation of the operating system.

If anything - write, I will help and try to explain better.
