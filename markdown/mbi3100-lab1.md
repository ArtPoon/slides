# MBI 3100: Intro to Medical Bioinformatics
## Lab 1: In the beginning was the command line

![](https://imgs.xkcd.com/comics/tar.png)

---

# Why should I learn CLI?

* A command line interface (CLI) is a text-based method of issuing directives to a computer.
* A graphical user interface (GUI) is more intuitive, but inherently limited.
* Most bioinformatic programs can only be used via the CLI because building a GUI is time-consuming.
* CLI makes it easier to automate batch processes (such as renaming a hundred files).

<small><small>
See <a href="https://www.nature.com/articles/d41586-021-00263-0">Five reasons why researchers should learn to love the command line.</a> Nature 590, 173-174 (2021).
</small></small>

---

# Unix

* Unix is an operating system that was developed in the 60's for shared computing systems.
  * Because it was powerful and cheap, Unix became popular at universities.
  * Multiple versions of Unix proliferated (*e.g.*, BSD)
  * Modern macOS is based on BSD.
* The web server and supercomputer sectors are now dominated by Unix and Unix-like operating systems.

---

# GNU is Not Unix

* GNU is a large collection of free software.
* Developed largely through a massive collaborative community [project](https://en.wikipedia.org/wiki/GNU_Project).
* Distributed under the [GNU General Public License](https://www.gnu.org/licenses/gpl-3.0.en.html), notorious for its "[copyleft](https://en.wikipedia.org/wiki/Copyleft)" property.
  * Work derived from code released under the GPL must also be licensed under the GPL.

---

# Linux

* Linux is similar to Unix but not directly derived.
  * It is free to modify and distribute (see [Free Software Foundation](https://en.wikipedia.org/wiki/Free_Software_Foundation))
* Most mobile phones run Linux (Android).
* There are now hundreds of versions (distributions) of Linux
  * [Red Hat Enterprise Linux](https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux) (RHEL) provides support at cost for users
  * [Ubuntu](https://ubuntu.com/) is a popular user-friendly distribution with a good desktop environment.

---

# Logging in

* Much of the practical lab exercises in this course will use a remote Linux (Ubuntu 20) server at:  `mbi3100.sci.uwo.ca`
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

# Quitting programs

* If you are using a long-running program, you can monitor it using `top`.
  * When there are multiple users, you may need to use the `-u` option with your username.
* You can always forcibly exit a program using `ctrl-C`.
  * Sometimes you can use `ctrl-Z` when the program fails to respond to `ctrl-C`
  * `ctrl-Z` drops the program into the background - you have to kill the process manually.
* To kill a running program (process), you need its process ID (number):
  * `kill -9 <process ID>`

---

# Command line arguments

* Arguments come after the name of the program, and consist of *options* or *filenames*.
* Options modify the behaviour of a program.
  * Specified by a single dash and letter (`-h`), or double-dash and word (`--help`).
  * `-h` often displays some help text
* Filenames are absolute or relative paths identifying program input or output files.

---

# Filenames

* You can autocomplete a filename by hitting `<tab>`.
* UNIX is case sensitive: `Data` and `data` are different filenames.
  * A filename should *not* include spaces, or any other reserved character like `/` or `:`.
  * If you *must* work with such a filename, you can escape bad characters with `\` or enclose everything in quotes:

```
apoon42@mbi3100:~/Downloads$ ls
'This is a bad filename'
apoon42@mbi3100:~/Downloads$ ls -l This
ls: cannot access 'This': No such file or directory
apoon42@mbi3100:~/Downloads$ ls -l This\ is\ a\ bad\ filename
-rw-rw-r-- 1 apoon42 apoon42 0 Aug 26 17:54 'This is a bad filename'
apoon42@mbi3100:~/Downloads$ ls -l "This is a bad filename"
-rw-rw-r-- 1 apoon42 apoon42 0 Aug 26 17:54 'This is a bad filename'
```

---

# Wildcards

* If you need to refer to more than one file at a time, you can substitute wildcards for parts of a path.
  * `*` represents one or more of any character
  * `?` represents one of any character
* Not all programs support wildcards.

---

> What is a file specification that captures only "cat" and "cast" from this list of files?

```
cast   case   mat
cat    dog    cut
```

---

# File listings

* If you use an `-l` option with `ls`, then the system will generate a "long listing" of your directory:

```
apoon42@mbi3100:~$ ls -l
total 421464
-rw-r--r-- 1 apoon42 apoon42     78471 Aug 25 22:05 NC_045512.gb
drwxrwxr-x 8 apoon42 apoon42      4096 Aug 25 23:00 ncbi
-rw-rw-r-- 1 apoon42 apoon42 431484914 Aug 25 23:06 SRR15346575.fastq.gz
```

* This format displays a lot more information than just filenames!

---

# File permissions

* `d` indicates that the file is a directory
* each `rwx` group indicates if the *owner*, *group* or *everyone* has *read*, *write* or *execute* access to the file (`-` = no access)
* These permissions are often set using [octal values](https://en.wikipedia.org/wiki/Octal):
  * `rwx` = `111` = `7`
  * `r--` = `100` = `4` (read-only access)
  * `---` = `000` = `0`
* `644` means the owner has read-write access, and no one else has any access.

---


```
drwxrwxr-x 8 apoon42 apoon42      4096 Aug 25 23:00 ncbi
```

* `8` is the number of [hard links](https://en.wikipedia.org/wiki/Hard_link) to the file
  * every file will have at least one hard link (to itself, `.`)
  * every directory has at least two hard links (`.` and its parent `..`)
* the next two fields are the file owner and [group](https://en.wikipedia.org/wiki/Group_(computing)) (a set of users)
* `4096` is size of the file in bytes
* `Aug 25 23:00` is the file modification date
* `ncbi` is the filename

---

# Managing files

* `cp <src> <dest>` - copy one or more files to another location
* `mv <src> <dest>` - move one or more files to another location
* `rm <file>` - delete one or more files (**permanent!**)
* `chmod <mode> <file>` - change file permissions
  * *e.g.*, `chmod 777 foo.txt` grants all permissions to everyone
* `chown <user> <file>` - change file ownership

---

# Pipes

* Part of the [UNIX philosophy](https://en.wikipedia.org/wiki/Unix_philosophy) is that a program should do only one thing well (minimal, modular).
  * Data should flow from one program to another.
* The output of one program can be "piped" as input into a second program with `|`:
  ```
  apoon42@mbi3100:~$ fortune | cowsay
   ________________________________________
  / Tuesday After Lunch is the cosmic time \
  \ of the week.                           /
   ----------------------------------------
          \   ^__^
           \  (oo)\_______
              (__)\       )\/\
                  ||----w |
                  ||     ||
  ```

---

# Streams and redirection

* A UNIX program reads data from a standard input (`stdin`) stream.
  * When you run `cowsay` it does nothing because it is waiting for `stdin`
* UNIX programs write data to standard output (`stdout`) and error (`stderr`) streams

---

# File compression

* `gzip` and `gunzip` are GNU programs for compressing and uncompressing a file, respectively.
  * Files compressed with gzip are given the suffix `.gz`
  * To output uncompressed data as `stdout` stream, use `-c` option.
* `tar` is an archiving program that is used to bundle files and directories into a single file.
  * Software packages are often distributed as a gzipped tar file (`.tar.gz`), or "tarball".

---

# Manual pages

* To read the manual for most Unix commands, use `man`
  * *e.g.*, `man ls`
* This launches a [terminal pager](https://en.wikipedia.org/wiki/Terminal_pager) that enables you to scroll through a text file.
* To exit the pager, type `q`.

---

> Exercise 2: Create your own Unix quick reference sheet (due next lab)!

<img src="https://girliemac.com/assets/images/articles/2021/07/webdev101-programming.png" height="400px">

<small><small>
Image credit: [Tomomi Imura](https://girliemac.com/), web developer at Microsoft and Apple advocate.
</small></small>