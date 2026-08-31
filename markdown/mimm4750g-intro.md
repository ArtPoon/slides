# MBI 4750G
## Introduction
![](https://imgs.xkcd.com/comics/university_website.png)

---

# Course description

* Instructor and course coordinator:
  * Dr. Art Poon (apoon42@uwo.ca)
  * Office hours by appointment (arrange by e-mail!)
* Teaching assistant:
  * Paula Magbor (pmagbor3@uwo.ca)

---

# Schedule

* Lectures 
  * Mondays and Fridays (9:30am - 10:20am)
* Labs: 
  * Wednesdays (9:30am - 11:20am)
  * **You are expected to attend all labs!**
  * Check [UWO Extranet](https://www.extranet.uwo.ca/extranet/) for location
  * Lab assignments are due at midnight of the same day, with a 72 hour "flexibility" period.

---

# Evaluation

* There are 9 computing lab assignments on Wednesdays.
* The remaining lab times are reserved for working on your project.

| Assessment | Deadline | Weight |
|----|---|---|
| Computing lab assignments | | 35% |
| Data report | February 6, 2026 (72h flex) | 15% |
| Draft report | March 13, 2026 (72h flex) | 15% |
| Final report | April 6, 2026 (72h flex) | 30% |
| Quizzes and participation | | 5% |

---

# Independent project

* This is an [essay course](https://www.uwo.ca/univsec/pdf/academic_policies/registration_progression_grad/coursenumbering.pdf)!

* Written assessments will be reports about an independent project.
  * Please do not start your project at the last minute!

* You are responsible for *independently* collecting data and analyzing it using the methods that you will learn in this course.

* [TurnItIn](https://elearningtoolkit.uwo.ca/tools/TurnItIn.html) *will* be used to assess written assignments.

---

# Course policy on AI

<table>
  <tr>
    <td style="font-size: 20pt;">
    <ul>
      <li>Use of generative AI for lab assignments or your project is <u>prohibited</u>.</li>
      <ul>
        <li>If you are relying on AI, then you have resigned yourself to being replaced by a computer.</li>
      </ul>
      <li>This course <i>will</i> teach you many of the concepts underlying deep learning (<i>e.g.</i>, maximum likelihood, MCMC, Bayesian inference).</li>
    </ul>
    </td>
    <td width="35%">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Educationtechnology.png/480px-Educationtechnology.png"/>
      <small>
      An example of AI image misgeneration based on "education technology" prompt (<a href="https://commons.wikimedia.org/wiki/File:Educationtechnology.png">WikiMedia Commons</a>).
    </small>
    </td>
  </tr>
</table>

---

# Anti-AI mitigation strategies

* Written assessments will place greater weight on methods and results.
* All analyses <u>must</u> be run on the course server.
  * All user files, modification dates, and command histories are tracked.
* Your data and workflow on the server should be organized and documented.
* Your reports must contain at least one figure.


---

# "I'm worried about coding"

* This course has no prerequisites in computer science.
* **You will not have to write any of your own code.**
* *However*, you will need to become comfortable with the [command line interface](https://en.wikipedia.org/wiki/Command-line_interface).
* Reviewing the [introduction to UNIX](https://westernu.brightspace.com/d2l/le/lessons/68221/topics/2639285) is *strongly recommended*.

---

# The course server

* A server funded by the UWO SSC's [Science Student Donation](https://www.uwo.ca/sci/counselling/procedures/science_student_donation.html) initiative.
  * Two AMD EPYC 64-core CPUs
  * 1.5 TB of RAM
  * Running Linux (Ubuntu 22.04)
* Access is restricted to students enrolled in the course.
* Usage is monitored!  You may **not** use this server for any tasks unrelated to this course.

---

# What is bioinformatics?

* Bioinformatics is the use of computers to manage and analyze biological data.
  * Driven by unprecedented amount of data produced by the Human Genome Project.
* New lab technologies can produce overwhelming amounts of data.
  * *e.g.*, a NextSeq 550 benchtop system can produce about four human genomes (assuming 10x coverage) in about 24 hours.
* Much of bioinformatics concerns genetic sequence data, although there are other important domains (structural data, imaging data).

---

# Bioinformatics and infectious disease

* Infectious diseases (viruses, bacteria, and single-celled eukaryotes) are often characterized by sequence alone.
* We can learn a lot about an infection by comparing its sequence to other sequences.
* We can reconstruct a tree that connects sequences to their common ancestors back in time.
  * Trees can be used to learn about the origin and spread of an infectious disease.

---

<small>
Early findings on the rapid global spread of SARS-CoV-2 (left) and estimated rate of evolution (right)
</small>

<img src="/img/rambaut-virological.png" height=500/>

<small><small>
Image credit: Andrew Rambaut (2020) <a href="https://virological.org/t/phylodynamic-analysis-176-genomes-6-mar-2020/356">Phylogenetic analysis of nCoV-2019 genomes</a>.  https://virological.org
</small></small>

---

# Public databases

<table>
  <tr>
    <td style="font-size: 20pt;">
      <ul>
      <li>Bioinformatics is about managing and extracting information from data.</li>
      <li>There is an enormous amount of publicly available sequence data from infectious diseases.</li>
      <li><i>e.g.,</i> currently over 17 million SARS-CoV-2 genome sequences in the GISAID database.</li>
      </ul>
    </td>
    <td width="45%">
      <img src="/img/gisaid.svg" width="500px"/>
      <br/>
      <small>
      Number of new SARS-CoV-2 genomes deposited in the GISAID database per week.
      </small>
    </td>
  </tr>
</table>

---

# NCBI Genbank

* One of the most important resources for sequence data is the NCBI Genbank database (https://www.ncbi.nlm.nih.gov/genbank).
<img src="/img/genbank.png" width="600px">
* Mirrored by:
  * the European Nucleotide Archive (https://www.ebi.ac.uk/ena/browser/home) 
  * the DNA Data Bank of Japan (https://www.ddbj.nig.ac.jp/index-e.html)

---

# Genbank format

* A very complex format that contains a diverse amount of information:

```
LOCUS       KT001281                 265 bp    DNA     linear   VRL 29-JUL-2015
DEFINITION  Hepatitis B virus isolate 306 polymerase (P) gene, partial cds.
ACCESSION   KT001281
VERSION     KT001281.1
KEYWORDS    .
SOURCE      Hepatitis B virus
  ORGANISM  Hepatitis B virus
            Viruses; Riboviria; Pararnavirae; Artverviricota; Revtraviricetes;
            Blubervirales; Hepadnaviridae; Orthohepadnavirus.
REFERENCE   1  (bases 1 to 265)
  AUTHORS   Oluyinka,O.O., Tong,H.V., Bui Tien,S., Fagbami,A.H., Adekanle,O.,
            Ojurongbe,O., Bock,C.T., Kremsner,P.G. and Velavan,T.P.
  TITLE     Occult Hepatitis B Virus Infection in Nigerian Blood Donors and
            Hepatitis B Virus Transmission Risks
  JOURNAL   PLoS ONE 10 (7), E0131912 (2015)
   PUBMED   26148052
  REMARK    Publication Status: Online-Only
```

---

# Command line interface (CLI)

* The CLI is a text-based method of issuing directives to a computer.
* Simple programs can be combined by the user in unlimited ways to perform complex tasks.
* Most bioinformatic methods must be run using the CLI.
  * Developing a graphical user interface (GUI) is a time-consuming process.
* High-performance computing systems are usually accessed remotely over a network using a CLI.
  * *e.g.*, Compute Canada, Amazon Web Services (AWS).

---

# UNIX-like operating systems

* UNIX is an OS that was developed for remote computing on a shared system.
* GNU/Linux is an open-source re-implementation of UNIX.
  * About 62% of servers around the world run GNU/Linux.
  * About 45% of mobile phones use Android/Linux.
  * There are many distributions of GNU/Linux including [Ubuntu](https://ubuntu.com/), [Fedora](https://fedoraproject.org/) and [Arch Linux](https://archlinux.org/).
* Don't forget to complete the Unit 1 readings and quiz!

---

<section data-background="#333" style="color:white">

<h1 style="color:white">Key points</h1>


* Bioinformatics plays an essential role in our understanding of &mdash; and our ability to manage and treat &mdash; infectious diseases.
* This course will teach you to use DNA sequences to reconstruct how an epidemic has spread and adapted to new hosts.
* Most bioinformatics is performed with a command-line interface.
* Please do the Unit 1 readings, *especially* if you haven't taken MBI 3100A!

</section>