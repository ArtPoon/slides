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
  * Please do not start your project at the last minute!

* You are responsible for *independently* collecting data and analyzing it using the methods that you will learn in this course.

* [TurnItIn](https://elearningtoolkit.uwo.ca/tools/TurnItIn.html) *will* be used to assess written assignments.

---

# Expectations about AI

<table>
  <tr>
    <td style="font-size: 20pt;">
      <ul>
      <li>Assessment will place greater weight on methods and results than introduction.</li>
      <li>Analyses must be run on the course server.</li>
      <li>Your data and workflow on the server should be organized and documented.</li>
      <li>Your reports must contain at least one figure.</li>
      </ul>
    </td>
    <td width="35%">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/DALL%C2%B7E_-_Photos_of_side_view_of_programmer_discovering_software%27s_Easter_Egg_inside_her_program_when_debugging_her_programs.png/240px-DALL%C2%B7E_-_Photos_of_side_view_of_programmer_discovering_software%27s_Easter_Egg_inside_her_program_when_debugging_her_programs.png"/>
      <small>
      DALL-E - Photos of side view of programmer discovering software's Easter Egg inside her program when debugging her programs (<a href="https://commons.wikimedia.org/wiki/File:DALL%C2%B7E_-_Photos_of_side_view_of_programmer_discovering_software%27s_Easter_Egg_inside_her_program_when_debugging_her_programs.png">WikiMedia Commons</a>).
    </small>
    </td>
  </tr>
</table>

---

# "I'm worried about coding"

* This course has no prerequisites in computer science.
* **You will not have to write any of your own code.**
* *However*, you will need to become comfortable with the [command line interface](https://en.wikipedia.org/wiki/Command-line_interface).
* Reviewing the [UNIX and Markdown guide and quick reference](https://owl.uwo.ca/portal/directtool/f57dc0a5-36ca-485d-8ec0-c463a4fcb5ce/) is *strongly recommended*.

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
REFERENCE   2  (bases 1 to 265)
  AUTHORS   Oluyinka,O.O., Tong,H.V., Bui Tien,S., Fagbami,A.H., Adekanle,O.,
            Ojurongbe,O., Bock,C.-T., Kremsner,P.G. and Velavan,T.P.
  TITLE     Direct Submission
  JOURNAL   Submitted (02-JUN-2015) Institute of Tropical Meicine, University
            of Tubingen, Wilhelmstrasse 27, Tuebingen, BW 72074, Germany
COMMENT     ##Assembly-Data-START##
            Sequencing Technology :: Sanger dideoxy sequencing
            ##Assembly-Data-END##
FEATURES             Location/Qualifiers
     source          1..265
                     /organism="Hepatitis B virus"
                     /mol_type="genomic DNA"
                     /isolate="306"
                     /isolation_source="serum sample"
                     /host="Homo sapiens"
                     /db_xref="taxon:10407"
                     /country="Nigeria"
                     /collection_date="2009"
     gene            <1..>265
                     /gene="P"
     CDS             <1..>265
                     /gene="P"
                     /codon_start=3
                     /product="polymerase"
                     /protein_id="AKS25925.1"
                     /translation="HDSCSRNLYVSLMLLFKTFGRKLHLYSHPIIMGFRKIPMGVGLS
                     PFLLAQFTSAICSVVRRAFPHCLAFSYMDDVVLGAKSVQHRESL"
ORIGIN      
        1 tgcacgactc ttgctcaagg aacctctatg tttccctcat gttgctgttc aaaaccttcg
       61 gacggaaatt gcacttgtat tcccatccca tcatcatggg ctttcggaaa attcctatgg
      121 gagtgggcct cagcccgttt ctcctggctc agtttactag tgccatttgt tcagtggttc
      181 gccgggcttt cccccactgt ctggctttca gttatatgga tgatgtggta ttgggggcca
      241 agtctgtaca acatcgtgag tccct
//
```

---

# FASTA format

* One of the most common file formats for sequence data.
  * Originated from a sequence alignment program ([FAST-All](https://en.wikipedia.org/wiki/FASTA), 1987) that is no longer used.
* Every sequence record starts with a `>` symbol, followed by the sequence label (header).
  * The sequence appears on subsequent lines until the next `>`.

```
>NC_045512.2 Severe acute respiratory syndrome coronavirus 2 isolate Wuhan-Hu-1, complete genome
ATTAAAGGTTTATACCTTCCCAGGTAACAAACCAACCAACTTTCGATCTCTTGTAGATCTGTTCTCTAAA
CGAACTTTAAAATCTGTGTGGCTGTCACTCGGCTGCATGCTTAGTGCACTCACGCAGTATAATTAATAAC
TAATTACTGTCGTTGACAGGACACGAGTAACTCGTCTATCTTCTGCAGGCTGCTTACGGTTTCGTCCGTG
```


---

# Specialized databases

* Several groups and organizations have curated public databases that focus on a specific pathogen.
* For example, the Los Alamos National Laboratory hosts the [Pathogen Research Databases](https://collaboration.lanl.gov/pathogen-database/) for:
  * human immunodeficiency virus (HIV-1)
  * hepatitis C virus / hepacivirus (HCV)
  * Ebolavirus (EBV)
