# MBI 3100: Intro to Medical Bioinformatics
## Lab 1: In the beginning was the command line

![](https://imgs.xkcd.com/comics/tar.png)

---

# Logging in

* Much of the practical lab exercises in this course will use a remote Linux server at:  `mbi3100.sci.uwo.ca`
* We will use the secure shell (`ssh`) to interface with this server.
* On Linux or macOS, open **Terminal** and type `ssh <username>@mbi3100.sci.uwo.ca`, where `<username>` is your UWO identity (e-mail suffix).
* On Windows 10, open **Windows Terminal**.  For earlier versions, run **PuTTY**.

---

# Secure shell

* Your computer is opening an encrypted communication channel to the remote server.
* The server transmits a public key that identifies it a trusted source/recipient.  
  * For your first connection attempt, you may see this:

```
The authenticity of host 'mbi3100.sci.uwo.ca (129.100.20.114)' can't be established.
ECDSA key fingerprint is SHA256:ihPXuyJmnsxRjGPGdXkinj1n1xpgjosSaemvxZmuoyQ.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

---

# The command prompt

* When you successfully log into the remote server, you will see something like this:

  ```
  Last login: Wed Aug 25 11:41:17 2021 from 70.26.1.223
  apoon42@mbi3100:~$
  ```

  * `apoon42` is my username
  * `@mbi3100` identifies the server hostname
  * `~` is my current working directory (more on this later)
  * `$` is the command prompt, indicating that the server is waiting for user input

---

# Getting oriented

* `pwd` - **p**resent **w**orking **d**irectory
* `ls` - generate a **listing** of files and directories in your current working directory
  * In the beginning, your home directory may be completely empty!
* `w` or `who` - display a listing of users who are currently logged on
* `history` - display your command line history
  * to repeat a command in your history, just use the *up* or *down* arrow keys!

---

# Navigating the filesystem

* The UNIX filesystem is organized into a hierarchy (tree) of directories.
* The *root* of the tree is represented by `/`.
* `cd` - change directories
  * `cd` by itself will return you to your home directory (`/home/<username>` or `~`)
  * `cd <dir>` moves down one level into the directory `<dir>`
  * `cd ..` moves up one level into the parent directory

---

> Exercise 1: Explore the filesystem using the `cd` command and draw a map, including your home directory and the root.  Try to cover at least 10 directories.

---

# Common directory names

* `/bin` - stores binaries (executable files)
* `/usr` - files intended for users
  * `/local` - stores user files unique to this system (installed by local users)
* `/tmp` - temporary storage, routinely erased by system
* `/var` - files that are subject to frequent change (variable)
  * `/var/log` - stores system and app-specific message and error logs

---

# Absolute and relative paths

* A path is a string that describes a location in the file system.
* An *absolute path* specifies the location starting from the root, like a street address.
  * *e.g.*, `/home/art/ncbi/ngs/ngs-bam/examples/README.md`
* A *relative path* specifies a location with respect to some other point of reference.
  * *e.g.*, if I am already in `/home/art/ncbi`, then a relative path to the same file is `ngs/ngs-bam/examples/README.md`
  * if I am in `/home/art/ncbi/ngs/ngs-python/`, then a relative path is `../ngs-bam/examples/README.md`

---

> What are pros and cons of using absolute versus relative paths?

---

# Running programs

* In UNIX, everything is a file.
* When you want to run a program, you type its name, *e.g.*, `cd`
  * The system will look for a file matching that name in one of several directories.  (To see a list of these locations, type `echo $PATH`.)
  * To get the program's location, use `which <program>`.
* If the program is not in `PATH`, then the run will fail - even if the program file is in your current working directory!
  * You can still run the program by calling its absolute or relative path, *e.g.*, `./foo`

---

# Command line arguments

* Arguments come after the name of the program, and consist of *options* or *filenames*.
* Options modify the behaviour of a program.
  * Specified by a single dash and letter (`-h`), or double-dash and word (`--help`).
  * `-h` often displays some help text
* Filenames are absolute or relative paths identifying program input or output files.

---

# Wildcards

* If you need to refer to more than one file at a time, you can substitute wildcards for parts of a path.
  * `*` represents one or more of any character
  * `?` represents one of any character
* Not all programs support wildcards.

---

# File permissions

* If you

---

# Managing files

* `cp <src> <dest>` - copy one or more files to another location
* `mv <src> <dest>` - move one or more files to another location
* `rm <file>` - delete one or more files
* `chmod <mode> <file>` - change file permissions
  * *e.g.*, `chmod 777 foo.txt` grants all permissions to everyone
* `chown <user> <file>` - change file ownership

---

# Pipes and redirections

---

# Manual pages



---

> Exercise 2: Create your own quick reference sheet

---