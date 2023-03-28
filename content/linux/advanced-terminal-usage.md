---
title: Linux. Advanced terminal usage
date: 2022-09-15
tag: linux
draft: false
---


In this article, I tried to show various tricks that will help you take your terminal skills to the next level.

What will be in this article:

* [Edit commands](#edit)
* [Move through command history](#history)
* [What is Bash](#bash)
    * [Config .bashrc](#bashrc)
    * [Variables](#variables)
    * [Aliases](#alias)
* [Manual (man)](#man)
* [Conveyor (pipe)](#pipe)
    * [grep](#grep)
    * [sed](#sed)
    * [tr](#tr)
    * [cat](#cat)
    * [cut](#cut)
    * [sort](#sort)
* [Stream redirect](#stream)

> Do not be afraid of information amount -- remember only what you want. The main purpose of this article is to give you a look at the advanced features of the terminal.

{{< ref edit >}}
# Edit commands

When working with the terminal, you often have to edit already written commands.

To change a word in a command, all beginners hold down the right/left arrow, and wait until the cursor crawls there, then hold down `Delete` or `Backspace` to delete the word:

{{< gif "common editing" "/assets/gifs/linux-common-editing.gif" >}}

Now, forget about holding down the arrows on your keyboard -- every time you do that, you lose 10 style points.

Instead of arrows, `Delete` and `Backspace`, use the following hotkeys:

* `Alt+F` -- move one word forward (F - forward)
* `Alt+B` -- move back a word (B - backward)
* `Ctrl+A` -- move to the beginning of the line (I remember it as "**A**AAAAWWW...)
* `Ctrl+E` -- move to the end of the line ("...Y**E**EEEEAH ROCKKK!")
* `Ctrl+W` -- delete previous word

Here, for comparison, is the same command editing as above, but with `Alt+B`, `Alt+B`, `Ctrl+W`, `Ctrl+W`:

{{< gif "pro editing" "/assets/gifs/linux-pro-editing.gif" >}}

Try to play around with all the specified hot keys with the same command:

```bash
echo 'this is example of some command'
```

You'll know these hotkeys by heart only with constant practice, so just try to use them as often as you can from this day forward.

{{< ref history >}}
# Move through command history

Sometimes you need to re-execute a command that you have executed before - for this there is a history of commands in the terminal.

To work with command history, you need to know 3 basic combinations:

* `Ctrl+P` -- previous command
* `Ctrl+N` -- next command
* `Ctrl+R` -- search in command history (search goes from new commands to old ones)

Here's an example of how you can navigate back/forward through history with `Ctrl+P`/`Ctrl+N`:

{{< gif "history navigation" "/assets/gifs/linux-history-navigation.gif" >}}

> Note that I move through words with `Alt+B` and delete them with `Ctrl+W`

Here's an example of searching through the command history -- you press `Ctrl+R`, you write a word, and it appears on the line. You can press `Enter` to execute the command, and the arrow to start editing the selected command:

{{< gif "history search" "/assets/gifs/linux-history-search.gif" >}}

You can also search for a specific word in all matching commands -- press `Ctrl+R`, write the word, press `Ctrl+R` to go to the next matching command (`Enter` to execute the command):

{{< gif "history search repeat" "/assets/gifs/linux-history-search-repeat.gif" >}}

> All command history is stored in `~/.bash_history` -- the terminal takes it from there.

Try these hotkeys right now:

* Walk back and forth with `Ctrl+P` and `Ctrl+N`
* Search for some command with `Ctrl+R`
* Press `Ctrl+R` several times to find some matching commands

> Yes, you can use up/down keyboard arrows to navigate through the history, but I do not recommend getting used to this method - to press the arrow, you have to remove your hands from the main part of the keyboard, and this significantly reduces the speed of work. The arrows are more familiar and easier to remember, but the `Ctrl+N` and `Ctl+P` combinations are really more convenient if you get used to it.

{{< ref bash >}}
# What is bash

Now there will be a little revelation - the terminal in Linux is also a program called **bash**.

> Bash stands for "**B**ourn **A**gain **Sh**ell", like "Shell Reborn". "Shell" is both a synonym for "terminal" and a reference to the older "sh" terminal.

> In addition to Bash, there are also terminals zsh, fish, sh.

As you can already understand, the terminal passes your commands to the operating system, but it does not pass them directly - it interprets your command, and makes the appropriate request to the operating system (system call).

However, Bash is not just a program that executes your commands - it is an interpreter of the Bash programming language, which provides the following features, quite basic for any language:
* Variables
* Conditions
* Cycle
* Arrays
* Functions

> If you are not familiar with these basic concepts, then I recommend that you first master some programming language (for example, [Python](/python/))

In addition, it also provides somewhat unique features:
* Aliases
* Pipes
* Output redirection

If you master at least the basic features of Bash, then you will be able to write programs that can automate any task that you could solve manually!

I will make a full analysis of Bash in a separate article, but here I will describe only the most basic.

{{< ref bashrc >}}
## config .bashrc

Every time you start Bash, it first executes the `~/.bashrc` file, which is written in the Bash language.

Everything you write in this file will be applied to the newly created terminal session.

> Most likely there is already something in your `~/.bashrc` file -- in almost all Linux distributions `.bashrc` contains a set of useful variables/functions/commands.

Let's figure out what it is possible to prescribe there.

{{< ref variables >}}
## Переменные

**Variable** is a variable with a specific value used within the current session.

The variable is set like this:

```bash
VARIABLE_NAME=VARIABLE_VALUE
```

For example, in your `~/.bashrc` you can set the `HISTSIZE` variable, which specifies the maximum number of commands that the terminal will remember (when moving through the command history):

```bash
HISTSIZE=10000
```

If you add this line to your `~/.bashrc`, then the terminal session will "remember" the last 10,000 commands.

There are many variables that you can use to customize the behavior of a terminal session -- I'll list a few useful ones.

### PATH

The **PATH** variable contains the paths (separated by ":") that are used to find executable programs.

For example, you can add the `~/bin` directory to **PATH** like this:
```bash
PATH="~/bin:$PATH"
```

> **$** is written before `$PATH` to insert the value of the `PATH` variable itself -- this way we glue "~/bin:" and the current value of PATH.
> With **$** you can also display the current value of a variable:
> ```bash
> echo $PATH
> ```

So, we have added the "~/bin" directory to PATH. Suppose this directory contains the "hack-the-planet" program:

```bash
kee-reel@blog:~/bin$ ls
hack-the-planet
```

Usually, if you want to execute a program from the current directory, you would write "./":

```bash
kee-reel@blog:~/bin$ ./hack-the-planet
HACKING FOLDER ~/bin
COMPLETE!
```

But, if the directory with this program is in PATH, then you can execute this program from anywhere (no need to write "./"):

```bash
kee-reel@blog:~/some/other/folder$ hack-the-planet
HACKING FOLDER ~/some/other/folder
COMPLETE!
```

> I told more about PATH than about the rest, because it is the most important environment variable

### HISTCONTROL

Do not save duplicate commands in the history (if the same command is executed several times)

```bash
HISTCONTROL='ignoredups'
```

### PS1

You can change the format of the command line prompt to be more compact:

```bash
PS1='\[\033[01;32m\]\W\[\033[01;32m\] \$\[\033[00m\] '
```

Then it won't look like this:
```bash
kee-reel@blog:~/some/folder$
```

And like this:
```bash
folder $
```

> You can search the Internet for other examples of changing the PS1 variable - you can put a lot of things into it.

{{< ref alias >}}
## Alias

Sometimes a terminal user executes certain commands much more frequently than others. In order not to prescribe them completely or not to look for them every time in the history via `Ctrl+R`, you can create **alias**.

For example, here is a command that I often run:
```bash
cd ~/some/other/folder/with/the-project
```

In order not to torment the keyboard, I can write **alias** in `~/.bashrc`:
```bash
alias cdpr='cd ~/some/other/folder/with/the-project'
```

> After adding something to `~/.bashrc`, you need to restart the terminal (`~/.bashrc` is read at startup). However, you can cheat and re-read all the contents of `~/.bashrc` in the current terminal session with this command: `source ~/.bashrc`

Now, to go to the directory I need, just execute the command:
```bash
cdpr
```

{{< ref man >}}
# Manual (man)

At the beginning of acquaintance with the Linux terminal, it is difficult to remember all this many commands and parameters that need to be passed to them.

However, you don't have to google every time to figure it out - you only need to remember one **man** command.

**man** (from the word **man**ual, English instructions for use) -- a program that displays documentation for the specified program.

For example, if you want to know what else **rm** can do, call **man**, and pass in parameters to **rm**:
```bash
folder $ man rm
```

A documentation file will open, which you can scroll with arrows (one line) and through PageDown / PageUp (per page). You can close this file by pressing the letter "q".

After reading the documentation for "rm" I found out that if you specify the "-i" option, then I will have to confirm the deletion of each file.

Since "rm" deletes the file immediately without putting it in the recycle bin, this is a pretty useful option if you're afraid of deleting something you don't need. In "~/.bashrc" you can add this **alias**:
```bash
alias rm='rm -i'
```

So the normal behavior of "rm" will be overridden.

> Next, I will show many new commands -- you can use **man** to learn how to work with them

{{< ref pipe >}}
# Pipes

Many people find the terminal to be a much more convenient tool precisely because of the ability to use the pipeline -- **pipe**.

**Pipe** is a Linux OS mechanism that allows you to pipe the output of one program into the input of another.

It is better to explain this with an example.

Do you remember the `ls` command -- it simply lists the contents of the current folder:

```bash
folder $ ls
file_10.jpg   file_13.jpg   file_14.jpg   file_15.html	file_15.jpg
file_16.html  file_17.html  file_19.html  file_1.txt	file_20.html
file_2.txt    file_3.txt    file_4.txt	  file_5.txt	file_6.cpp
file_7.c      file_8.h	    file_9.py	  folder_1	folder_10
folder_2      folder_3	    folder_4	  folder_5	folder_6
folder_7      folder_8	    folder_9
```

Suppose you want to get a list of files with the extension ".jpg" -- you can, of course, look for them in this mess of files, or you can use the **grep** program.

{{< ref grep >}}
## grep

**grep** is a program that searches for specific text in the input stream or in a file.

This program is very often used to filter the output of another program -- let's filter the output of `ls`:
```bash
folder $ ls | grep jpg
file_10.jpg   file_13.jpg   file_14.jpg file_15.jpg
```

As you can see, only filenames containing the ".jpg" extension were displayed.

{{< ref sed >}}
## sed

**sed** is a program that replaces one text with another according to a given rule.

This program is often used to change the names in bulk -- let's change the names of all input files:
```bash
folder $ ls | grep jpg | sed 's/file/new_file_name/'
new_file_name_10.jpg   new_file_name_13.jpg   new_file_name_14.jpg	new_file_name_15.jpg
```

{{< ref tr >}}
## tr

**tr** is a program that replaces a given character with another.

Used to change the format of names or get rid of extra characters -- let's use "-" instead of "_":
```bash
folder $ ls | grep jpg | sed 's/file/new_file_name/' | tr '_' '-'
new-file-name-10.jpg   new-file-name-13.jpg   new-file-name-14.jpg	new-file-name-15.jpg
```

{{< ref cat >}}
## cat

**cat** is a program that displays the contents of a file.

Very often used to transfer the contents of a file to other programs via **pipe** (pipeline).

Let's build a new pipeline to work with the contents of a file. First, I will create a file with "contacts" of some people using the **nano** editor ([described how to work with it in the first article](/linux/basics)):
```bash
folder $ nano contacts.txt
```

With **cat** I can output the contents of this file:
```bash
folder $ cat contacts.txt
Ivan +123456 Omsk
Mary +234561 Moscow
Lena +345612 Saint-Petersburg
Gera +456123 Kazan
Nick +561234 Saint-Petersburg
Alex +612345 Moscow
```

Well, now let's display all Moscow contacts:
```bash
folder $ cat contacts.txt | grep Moscow
Alex +234561 Moscow
Mary +612345 Moscow
```

{{< ref cut >}}
## cut

**cut** is a program that extracts certain words from a text stream.

Let's use it to pull out the names and phone numbers of people from Moscow:
```bash
folder $ cat contacts.txt | grep Moscow | cut -d' ' -f 1,2
Mary +234561
Alex +612345
```

{{< ref sort >}}
## sort

**sort** -- sorts lines from the input stream.

Let's sort them alphabetically:
```bash
folder $ cat contacts.txt | grep Moscow | cut -d' ' -f 1,2 | sort
Alex +612345
Mary +234561
```

{{< ref stream >}}
# Stream redirect

Well, the last feature for the real X4K3R4 is the redirection of output streams.

On Linux, you can redirect the output of any program to a file -- for example, let's print the Muscovite contacts from the previous example to a file:
```bash
folder $ cat contacts.txt | grep Moscow | cut -d' ' -f 1,2 | sort > moscow_contacts.txt
```

Note that nothing was output to the terminal - all output went to the "moscow_contacts.txt" file.

You can check what was written to the file:

```bash
folder $ cat moscow_contacts.txt
Alex +612345
Mary +234561
```

In general, it's really simple, you just need to add `>` to the end of the command.

Sometimes, instead of `>`, you can also see `>>` -- what's the difference?

* `>` -- fills the file with text from the stream (if it was, it will overwrite it; if it wasn't, it will create it)
* `>>` -- appends text from the stream to the end of the file (if it was, it will append it; if it didn't exist, it will create it)

> Pay close attention to `>` and `>>` -- I've had occasions when I wanted to append something to the end of a file, but ended up overwriting it. By default, it's best to use `>>` -- this way you'll avoid situations like this.

Here is a great example of using `>>`:
```bash
echo "alias rm='rm -i'" >> ~/.bashrc
```

We add a new alias to the end of "~/.bashrc" instead of going into the file through a text editor.

# Итоги

Ohh, well, tin. It was very difficult for me to structure this article, because for advanced use of the terminal, you need to know a lot of things right away. However, I tried to give examples that can be understood without a deep dive into the topic.

Let's fix it:

* [Edit commands](#edit) -- `Ctrl+A` (start), `Ctrl+E` (end), `Alt+B` (previous), `Alt+F` (next), `Ctrl+ W` (delete)
* [Navigate history](#history) -- `Ctrl+P` (previous), `Ctrl+N` (Next), `Ctrl+R` (search)
* [What is Bash](#bash) -- a program that interprets commands into system calls
    * [Configuration .bashrc](#bashrc) -- read when creating a terminal session
    * [Variables](#variables) -- store values for the current session
    * [Alias](#alias) -- shorten large commands
* [Manual (man)](#man) -- documentation for all programs
* [Pipeline (pipe)](#pipe) -- sequentially process the text stream
    * [grep](#grep) -- search
    * [sed](#sed) -- character/word replacement
    * [tr](#tr) -- character replacement
    * [cat](#cat) -- file output
    * [cut](#cut) -- word cut
    * [sort](#sort) -- sort
* [Stream redirection](#stream) -- output to file

I do not expect that after reading this article you will suddenly start using all this, but rather I hope that you will see a horizon of knowledge that can be mastered and make a decision for yourself - do you want to follow the white rabbit?

```bash
~ $ wget https://s3.amazonaws.com/vspodtools-images-display/12676318/12682544-5841-b-display.jpg -O rabbit.png
~ $ sudo apt install -y jp2a
~ $ jp2a rabbit.png
.......;,,,,,,,,,;'  .',;,,,,,,..  ,;.           ,,.           .',,,,,,,,'.  .;'      .;;.     .
.......:;'......... .;,'......;;,  ;;'          .;,'           ,;,......',,. ,,'      .;;.     .
.......:;....       .;;.      ,,,  ;;'          .,,'           ;;,      .;;. ,;,      .::.     .
.......:;'.......   .;,.      ,,,  ,;'          .;,'           ;;,      .,;. ,;,  .'. .;:.   ...
.......:,,,'',,,.   .;;.      ,,,  ,,.          .;,'           ,;,      .,;. ,,, .;;, .;:.  ....
.......:;.          .;;.      ,,,  ,;'          .;,'           ,;,      .;;. ,,, .;;, .;:.   ...
.......::.          .;,.......;,,  ,;'........  .;,'........   ,,,......',;. ,;,..;,,..,:.   ...
.......cc.           .,;;;;;;;;,.  ;,;;;;;;;;:, .;,,;;;,;,;;,  .,;;;;;;;;;.  .,;;;;,;;;;.   .
...... ..      .'.    .........    ............  ............    .........     .... ....
..           .::dOl.        '''''''''''.  ',.      .,'  ''''''''''''
.. ..         .lkXxk,       .'''',,'.''. .;;'      ',:. ;,'...'.'''.
..  .           .,:kko'         .;:.     .;;'      ',;. ;,,
..               .'xO00.        .;:.     .;,'......',;. ;,,.......
               .lkkK0K'         .;;.     .;',;;;;;;'';. ;',;;;;;:'
              ,OKXk00k.         .;;.     .;;'......',;. ;,'......
              c0KKO0do.         .;;.     .;;'      ',;. ;,'
              :OKXkd.           .;:.     .:;'      ';;. ;,,''''''','
               .,::o,           ...       .'.      ...  ............
              ..       ...  ..       ...    ........    ............  ............
             .:;.      ;;,  ;:.      ,;;    .,',,',.    ';,,,,,,,,;,  ,,,',,',,,,,
             .:;.      ;,,  ;;.      ,;,      .;;.          .;;.      ,,,
             .;;.      ;,, .;;.      ,;,      .;;.          .;;.      ,,,
             .:;. .;,. ,,,  ;,,,;;,,,,,,      .;;.          .:;.      ,,',,,,;;'
             .;;. ',;. ;,'  ;;'......,;;      .;;.          .:;.      ,,,.......
             .:;. ',;. ;,'  ;;.      ,;,      .;;.          .:;.      ,,,
     .       .;,'.,,,..;;.  ;;.      ,;,    ..',,'..        .:;.      ,;,.........
     .        ..'''..'''.   ',.      .,'    .,,''',.        .,,.      .,'''''''',,
    .. .........       .......     ..........    ..........       ......      ..........
    ...c;:;;;:;;,'.  .,;;:;;;;;,.  ;;;;;;;;;;,.  ;;;::;:;;;,.    .c;,,;:,    ':;;;,,,;;;:.
   .. .:;.......,,' .;;'......,,,  ,;'......,,;  ;,'......',,     ..;;..      ....;,'...
   .. .:;.      ,,, .;;.      ,,,  ,;.      ',;  ;,'      .;,      .;;.           ;;'
   .  .:,,''''''',. .;,''''''',,,  ,,,'''''',,'  ;''''.'''','      .;;.           ;;'
  ..  .:;,'''..',;. .;,''.....,,,  ,,'.....',,'  ;''.'.'..,;'      .;;.           ;;'
  ..  .;:.      ,,, .;;.      ,,,  ,;.      ',;  ;,'      .;,      .:;.           ;,.
 ...  .;;.      ,,, .;;.      ,,'  ,;'......',,  ;''......';,     ..;,..          ;;.
 ...  .;;.      ';'  ,;.      ';'  ,,,;,,;;;,'.  ,,,;;,;,,,;.    .:,,,,;,         ,;.
```

Если что -- пиши, я помогу и постараюсь объяснить лучше.
