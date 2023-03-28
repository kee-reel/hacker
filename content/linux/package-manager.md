---
title: Linux. Installing and working with programs
date: 2021-09-12
tag: linux
---

If you have read the [previous article](../basics), then you already know how to navigate through different folders and create/edit/delete files.

However, this is not enough for full-fledged work - in addition to working with files, we usually run all sorts of programs: a browser, office applications, games, and the like.

So how do you install new programs on Linux?

# "Store" applications

Since Ubuntu Linux is one of the most user-friendly distributions (build versions of Linux), it already has a graphical "store" of applications built into it.

> I put "shop" in quotation marks because you can't buy anything there -- all the apps are free, just like Linux itself.

To open it, find "Application Center" (or "Software Center" if you have English) in the application menu (you need to click on the button in the lower left corner):

![App Store in menu](/assets/images/linux-software-center.png)

> If you're not on Ubuntu, then the app store icon looks different or is missing altogether - you can email me if you have problems with that.

If you open it, then you can see a very convenient interface through which you can easily install almost any application available for Linux:

![App Store Window](/assets/images/linux-software-center-window.png)

Cool? Don't say it's not cool, I won't believe it!

Compared to Windows, where you usually have to go to different sites, download an installer there, click on endless windows (perhaps with checkboxes like "Install Amigo browser?"), Installing applications on Linux looks much more convenient! It is so convenient that Windows is trying to replicate it through the [Microsoft Store](https://apps.microsoft.com/store/apps), but so far not very successfully.

Okay, we figured out the installation of applications at the user level - are there any advantages for the developer?

# Package Manager

Package Manager (eng. __Package Manager__) is a program that downloads and installs other programs and their dependencies.

The "app store" that I covered in the last section is just a graphical shell above the package manager - all the magic happens in it.

## Packages

Before I dive into the package manager, it's worth saying what a package is.

A package is an archive that contains binary files (executable files, libraries), resources (pictures, configuration files) and information about the package itself.

It so happened that Linux is not one operating system, like Windows, but a whole family of distributions - various builds of the Linux operating system.

Depending on the distribution, the system can only eat a certain package format ([source](https://en.wikipedia.org/wiki/List_of_Linux_distributions)):

* `deb` (Debian) format used by distributions: Ubuntu, Linux Mint, Elemental OS and others
* `rpm` (Red Hat Package Manager) format used by distributions: Red Hat Linux, Arch, openSUSE and others

To work with each of the formats, there are many package managers ([source](https://www.rosehosting.com/blog/linux-package-managers/)):

* For `deb` packages:
    * `dpkg` -- very simple, only used for installing packages
    * `apt` is a wrapper around `dpkg` that can download packages and resolve dependencies between them
    * `aptitude` is a wrapper around `apt` that makes it even easier to work with packages
* For `rpm` packages:
    * `rpm` -- analogous to `dpkg`
    * `yum` -- analogous to `rpm`
    * `dnf` -- analogous to `yum`
    * `pacman` -- standalone package manager used on Arch distributions

Yes, there are a lot of distributions, but that's okay -- since Linux is open source software, there are a lot of people who want to contribute to the development of this ecosystem.

Different distributions have their own advantages and disadvantages - everyone chooses what he likes best. Here's a visualization of the evolution of distributions to get a feel for the scale of diversity:

![Distributions](/assets/images/linux-distributions.png)

So, back to working with the package manager -- I will assume that you have an Ubuntu Linux distribution, so I will consider working with the `apt` package manager.

> If you have a different package manager, then it's okay -- seeing me work with `apt` will give you a general idea, and this is the most important thing, because all package managers are almost identical in terms of how they work.

Usually, everyone interacts with the package manager not through the graphical shell, but through the console. But why? Yes, because it is much more convenient!

## Program installation

For example, you need to put "Telegram" - this is done in one command:

```bash
kee-reel@blog:~$ sudo apt install telegram-desktop
```

Let's break this spell down into words:

* `sudo` is a program that allows you to switch to administrator mode in order to execute some important command (which is written immediately after).

![sudo](/assets/images/linux-sudo.png)

* `apt` -- **Advanced Package Tool**. Actually this is our package manager.
* `install` -- one of the modes of operation of `apt` (more on other modes later). Used to install new packages.
* `telegram-desktop` is the name of the package to be installed. I googled "ubuntu telegram" to find out what the name is (usually in the first links).

After executing this command, you will be asked to enter the administrator password - this is done by the `sudo` program. Then, `apt` will ask you to confirm that you really want to install this package - just agree by entering "Y".

## Run program

After that, you can run the installed cart:

```bash
kee-reel@blog:~$ telegram-desktop
```

> Sometimes the name of the package may differ from the name of the program. If there are problems with this, then do not hesitate to ask the Internet, it will always tell you :)

### Run in the background

While Telegram is running, you may notice that the console is locked and you cannot type anything. To avoid this, you can:

* launch Telegram through the application menu in the graphical interface by clicking on the corresponding icon

* run Telegram via the command line, but add the impersant "&" at the end:
```bash
kee-reel@blog:~$ telegram-desktop &
```

Thus, you tell the operating system that you want to run this program in the background, separate from the current terminal session.

### Remove annoying messages

After launch, strange messages may appear in the terminal - these are debug messages (logs) that the running program writes. If this annoys you, then you can run it like this:

```bash
kee-reel@blog:~$ telegram-desktop 2>/dev/null
```

Understand spell:

* `2>` -- redirects the error stream (stderr) to...
* `/dev/null` -- ...an empty device (dev - device). It is a virtual device that completely absorbs any input and does nothing with it.

You can do a lot of cool things with input redirection (write program output to a file, to a socket over the network), but I will write about this sometime later.

## Software update

Updates are periodically released for installed programs - to install them, you need to run two commands.

Request a list of updates from all remote repositories:

```bash
kee-reel@blog:~$ sudo apt update
```

Download all available updates:

```bash
kee-reel@blog:~$ sudo apt upgrade
```

## Removing a program

To uninstall the program, run this command:

```bash
kee-reel@blog:~$ sudo apt remove telegram-desktop
```

Run `apt` from under `sudo` in `remove` package removal mode, and remove the specified `telegram-desktop` package -- a mirror response to the installation command.

I hope I managed to show how to work with the package manager in an accessible way, and now you can (even if with the help of Google) install any package on your system!

If anything - write, I will help and try to explain better.
