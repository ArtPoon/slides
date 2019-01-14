## Score matrices and BLAST

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

# Solution (copy to INCA)

* Sequence: `TACCTAGGGG`

* 2-mer counts:

| AC | AG | CC | CT | GG | TA |
|----|----|----|----|----|----|
| 1  | 1  |  1 | 1  | 3  | 2  |

* How I handled this question in R:

```R
s <- paste(sample(c('A','C','G','T'), 10, replace=T), collapse='')
pieces <- sapply(1:(nchar(s)-1), function(i) substr(s, i, i+1))
table(pieces)
```

---

# Building the HSP

* BLAST scans the database for high-scoring words (3-mers for proteins).
* From one pair of high-scoring words (*hit*), search left and right for a second hit within some maximum distance $A$.
* Require 2 hits to trigger a gap-free *extension* (incorporate flanking residues into candidate alignment).
<img src="/img/Neighbor_HSP.jpg" width="450px"/>

---

# Finishing the HSP

* If the gap-free extension retains a high enough score, BLAST calculates a *gapped extension* (tolerate indels).
* Gapped extensions are very time consuming - two-hit method is designed to minimize the number carried out.
* Only high scoring gapped extensions are reported.
* Clearly, *scoring* plays an important role in BLAST searches.

---

# What is a score?

* A measure of sequence homology (similarity that implies common ancestry).


---

# Further readings

* [The BLAST Sequence Analysis Tool](https://www.ncbi.nlm.nih.gov/books/NBK153387/)



