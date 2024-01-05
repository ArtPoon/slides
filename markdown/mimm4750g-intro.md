# MIMM4750g
## Introduction
![](https://imgs.xkcd.com/comics/university_website.png)

---

# Course description

* Instructors:
  * Dr. Art Poon (apoon42@uwo.ca)
  * Dr. Jennifer Guthrie (jennifer.guthrie@uwo.ca)
* Teaching assistant:
  * Sugitha Janarthanan

---

# Schedule

* Lectures 
  * Mondays and Fridays (9:30am - 10:20am)
* Labs: 
  * Wednesdays (9:30am - 11:20am)
  * **You are expected to attend all labs!**
  * Check UWO Extranet for location

---

# Evaluation

* There are 8 computing lab assignments on Wednesdays.
* The remaining lab times are reserved for working on your project.

| Assessment | Deadline | Weight |
|----|---|---|
| Computing lab assignments | | 35% |
| Data report | February 2, 2024 | 15% |
| Draft report | March 24, 2024 | 15% |
| Final report | April 8, 2024 | 30% |
| Participation | | 5% |

---

# Independent project

* This is an [essay course](https://www.uwo.ca/univsec/pdf/academic_policies/registration_progression_grad/coursenumbering.pdf)!

* Written assessments will be reports about an independent project.

* You are responsible for *independently* collecting data, analyzing it using methods we learn in this course, and preparing a written report.

* [TurnItIn](https://elearningtoolkit.uwo.ca/tools/TurnItIn.html) *will* be used to assess written assignments.

---

# Expectations about AI

* Assessment will place greater weight on methods and results than introduction.
* Analyses must be run on the course server.
* Your data and workflow on the server should be organized and documented.
* Your reports must contain at least one figure.

---

# "I'm worried about coding"

* This course has no prerequisites in computer science - you will not have to write any of your own code.
* *However*, you will need to become comfortable with the command line interface.
* Reviewing the **UNIX and Markdown guide and quick reference** is *strongly recommended*.

---

# The course server

* A server funded by the UWO SSC's [Science Student Donation](https://www.uwo.ca/sci/counselling/procedures/science_student_donation.html) initiative.
  * Two AMD EPYC 64-core CPUs
  * 1.5 TB of RAM
  * Running Linux (Ubuntu 22.04)
* Access is restricted to students enrolled in the course.
* Usage is monitored!

---

# What is bioinformatics?

* Bioinformatics is the use of computers to manage and analyze biological data.
* New lab technologies can produce overwhelming amounts of data.
* Much of bioinformatics concerns genetic sequence data, although there are other important domains (structural data, imaging data).

---

# Bioinformatics and infectious disease

* Infectious diseases (viruses, bacteria, and single-celled eukaryotes) are often characterized by sequence alone.
* We can learn a lot about an infection by comparing its sequence to other sequences.
* We can reconstruct a tree that connects sequences to their common ancestors back in time.
  * Trees can be used to learn about the origin and spread of an infectious disease.

---

<img src="/img/rambaut-virological.png"/>

<small><small>
Image credit: Andrew Rambaut (2020) <a href="https://virological.org/t/phylodynamic-analysis-176-genomes-6-mar-2020/356">Phylogenetic analysis of nCoV-2019 genomes</a>.  https://virological.org
</small></small>

---

# Public databases

<table>
  <tr>
    <td style="font-size: 20pt;">
      <ul>
      <li>Bioinformatics is about managing and extracting informataion from data.</li>
      <li>There is an enormous amount of publicly available sequence data from infectious diseases.</li>
      <li><i>e.g.,</i> currently over 16 million SARS-CoV-2 genome sequences in the GISAID database.</li>
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

