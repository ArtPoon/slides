# MIMM4750G
## BLAST

![](https://imgs.xkcd.com/comics/proteins.png)

---

# Search a sequence database

* So far we have learned about querying the Genbank database using keywords.
* What if we only have a nucleotide or protein sequence to work with?
* An unknown species has no keywords to search by.
* One approach would be to *align* the sequence against every other sequence in the database, and take whatever aligns best.
* This would take too long!  (More on alignment later.)

---

# BLAST

* Basic Local Alignment Search Tool
* Developed by Stephen Altschul, Walter Gish and David Lipman at the NCBI.
* Local similarity = search for conserved intervals.
* This requires some way to measure the similarity of unaligned  sequences.

---

# Word search

* The original BLAST algorithm attempts to find *high-scoring segment pairs* (HSP).
* The HSP is the set of equal-length segments from 2 sequences that maximizes the total similarity score.
* BLAST constructs an *index* of all "words" of length $k$.
* These words are often called "k-mers".
* What are the frequencies of 2-mers in `TACCTAGGGG`?

---

# k-mer example

* Entabulate all 2-mers in the sequence `TACCTAGGGG`

| AC | AG | CC | CT | GG | TA |
|----|----|----|----|----|----|
|    |    |    |    |    |    |

* How I handled this question in R:

```R
#s <- paste(sample(c('A','C','G','T'), 10, replace=T), collapse='')
s <- "TACCTAGGGG"
pieces <- sapply(1:(nchar(s)-1), function(i) substr(s, i, i+1))
table(pieces)
```

---

# Building the HSP

* BLAST scans the database for high-scoring words (3-mers for proteins).
* From one pair of high-scoring words (*hit*), search left and right for a second hit within some maximum distance $A$.
* Require 2 hits to trigger a gap-free *extension* (incorporate flanking residues into candidate alignment).
<img src="/img/Neighbor_HSP.jpg" width="400px"/>

---

# Finishing the HSP

* If the gap-free extension retains a high enough score, BLAST calculates a *gapped extension* (tolerate indels).
* Gapped extensions are very time consuming - two-hit method is designed to minimize the number carried out.
* Only high scoring gapped extensions are reported.
* Clearly, *scoring* plays an important role in BLAST searches.

---


# Evaluating significance

* Recall BLAST searches for high-scoring sequence pair (HSP).
* The expected number of HSPs with score $\ge S$:

  $$E=Kmn e^{-\lambda S}$$

  where $m$ and $n$ are the sequence lengths.
* $K$ and $\lambda$ are pre-defined parameters that depend on the BLOSUM matrix.

---

# Types of BLAST queries

* NCBI maintains both nucleotide and protein databases

<img src="https://open.oregonstate.education/app/uploads/sites/6/2016/10/I.7_2_blast_types.png#fixme" width="600px"/>

<small>
Image source: [A Primer for Computational Biology](https://open.oregonstate.education/computationalbiology/chapter/command-line-blast/) by Shawn T. O'Neil (CC-NC-SA 4.0)
<small>

---

# tblastn

---

# BLAST databases

* **nr/nt** (non-redundant nucleotide collection) - identical sequences merged into same record
* 16S rRNA
* **est** (expressed sequence tags) - partial cDNA sequences
* **SRA** (sequence read archive) next-generation sequence data
* **VecScreen** - identify segments of vector origin
* **IgBLAST** - search immunoglobulin and T-cell receptor sequences

---

# Further readings

* [The Statistics of Sequence Similarity Scores](https://www.ncbi.nlm.nih.gov/BLAST/tutorial/Altschul-1.html)

* [Selecting the Right Similarity-Scoring Matrix](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3848038/)

* [Oregon State University Open Textbook: A Primer for Computational Biology](https://open.oregonstate.education/computationalbiology/chapter/command-line-blast/)

* [Database resources of the National Center for Biotechnology Information](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4702911/)

