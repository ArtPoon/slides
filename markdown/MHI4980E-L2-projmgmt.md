# MHI 4980E
## Project management
![](https://imgs.xkcd.com/comics/estimating_time.png)

---

# Filesystem

* How will you set up your project subdirectories?
* `project` - an example
  * `doc` - external documentation, reports
  * `data` - self explanatory!
  * `scripts` - Python, R scripts can go here - `src` for compiled code
  * `results` - stream outputs from scripts to here

---

# Data

* what kind?
* how much? (MB, GB or TB?)
* where does it live?
* who owns it? do you have permission to make remote copies?
* are there sensitive data?

---

# Data provenance

* the historical record of the data
* what was the source material? *e.g.*, patient sample number
* how were the data generated? *e.g.*, sequencing platform
* difficult to automate
* why is provenance important?

---

# Data integrity

* data degradation over time
* accidental manipulation, overwrites
* who has read-write access?  should the data files be set to read only?
* how can integrity be determined?
  * modification dates
  * checksums, *e.g.*, [md5](https://en.wikipedia.org/wiki/MD5)

---

# Version control
* a system for tracking changes to source files and documents
* `git` is probably the most popular system right now
* Started by Linus Torvalds when devs withdrew access to proprietary [BitKeeper](https://en.wikipedia.org/wiki/BitKeeper)
* from the `man` page:
  ```
  We divide Git into high level ("porcelain") commands and
  low level ("plumbing") commands.
  ```

---

![](https://pbs.twimg.com/media/DJAqiD9UwAAVOtb?format=jpg&name=small)
Source: Tomomi Imura, Twitter @girlie_mac

---

# `git`

* Typical workflow: `add`, `commit`, `pull`, `push`

```
Elzar:slides artpoon$ git commit -m 'starting section on version control'
[master a08e06d] starting section on version control
 1 file changed, 13 insertions(+)
Elzar:slides artpoon$ git push origin master
warning: redirecting to https://github.com/ArtPoon/slides/
Counting objects: 4, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (4/4), done.
Writing objects: 100% (4/4), 617 bytes | 617.00 KiB/s, done.
Total 4 (delta 3), reused 0 (delta 0)
remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
To http://github.com/ArtPoon/slides
   82e70d0..a08e06d  master -> master
```

---

<table>
<tr><td>
<h1>What gets stored in a git repo?</h1>
<ul>
<li>[&checkmark;] scripts and source code, obviously!</li>
<li>[&checkmark;] plain text files</li>
<li>[&#x2717;] data - depends... Why?</li>
<li>[&#x2717;] [Jupyter notebooks](https://jupyter-notebook.readthedocs.io/en/stable/notebook.html)? Awkward.</li>
</td>
<td><img src="https://imgs.xkcd.com/comics/git.png" width="300px"/></td>
</tr>
</table>

---

# External documentation - what is it?

* Internal documentation is written into the source code/scripts.
* External documentation is usually written as a separate document, and can be as simple as a plain text file or as comprehensive as a user manual.
![](https://imgs.xkcd.com/comics/manuals.png)

---

<table>
<tr><td>
<h1>External documentation - why?</h1>
<ul>
<li>Explains the purpose of your code and a general explanation of how it works.</li>
<li>If you don't care about helping others, help your future self!</li>
<li>When it comes time to writing up your work, you need a record of what you did.</li>
</td><td width="30%">
<img src="https://imgs.xkcd.com/comics/future_self.png"/>
</td></tr>
</table>

---

# External documentation - how?

* A `README` file can become a useful document for tracking your work.
* Some prefer a `bash` pipeline script to document steps
* Pipelines can also be implemented and documented with a [workflow management system](https://en.wikipedia.org/wiki/Workflow_management_system) such as [Snakemake](https://snakemake.readthedocs.io/en/stable/)

---

# Markdown

* A [markup language](https://en.wikipedia.org/wiki/Markup_language) is a plain text document that is annotated with reserved symbols encoding information about how to render the document.
* What are some other examples of markup languages?
* [Markdown](https://daringfireball.net/projects/markdown/) is a lightweight, general purpose markup language.
* Markdown now comes in many flavours (*e.g.*, GitHub, Reddit).
* File extension `.md`, which is why you often see `README.md`

---

# Markdown (2)

* These slides are written in Markdown and converted into HTML with the JavaScript library [reveal.js](https://revealjs.com/).

```markdown
# Markdown
* A [markup language](https://en.wikipedia.org/wiki/Markup_language)
  is a plain text document that is annotated with reserved symbols
  encoding information about how to render the document.
* What are some other examples of markup languages?
* [Markdown](https://daringfireball.net/projects/markdown/) is a
  lightweight, general purpose markup language.
* Markdown now comes in many flavours (*e.g.*, GitHub, Reddit).
```

---

# Markdown (3)

* Another flavour of Markdown enables users to embed R code that is executed on compiling the Markdown into HTML or PDF.
* This enables users to embed images that update with the data.
* Markdown can be used to add formatted text to Jupyter notebooks.
* Static website generators like [Jekyll](https://jekyllrb.com/) or [Hugo](https://gohugo.io/) apply templates to Markdown to render more complex HTML.

---

# Working with Markdown

* Most plain text editors will understand Markdown syntax, *e.g.*, [vim](https://www.vim.org/), [gedit](https://wiki.gnome.org/Apps/Gedit), [Atom](https://atom.io/).
* There are many [WYSIWYG](https://en.wikipedia.org/wiki/WYSIWYG) editors online &mdash; [Dillinger.io](https://dillinger.io/), [StackEdit](https://stackedit.io/) &mdash; and standlone apps, *e.g.*, [Typora](https://typora.io/).

---

# Issue tracking

* An alternative to writing a "project diary" in Markdown.
* GitHub provides a web interface for posting [issues](https://guides.github.com/features/issues/) with Markdown plus embedded images, direct links to code, and links to other repositories.
* Can communicate with other developers.
* Integration with project management apps like [Jira](https://www.atlassian.com/software/jira), [Slack](https://slack.com/intl/en-ca/) and [Asana](https://asana.com/home).

---

# Make a GitHub or GitLab account
