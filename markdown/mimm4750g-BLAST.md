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
* Developed by Stephen Altschul, Warren Gish and David Lipman at the NCBI.
* Local similarity = search for conserved intervals.
* This requires some way to measure the similarity of unaligned  sequences.

---

# Word search

* The original BLAST algorithm attempts to find *high-scoring segment pairs* (HSP).
* The HSP is the set of equal-length segments from 2 sequences that maximizes the total similarity score.
* BLAST constructs an *index* of all "words" of length $k$.
* These words are often called "k-mers".


---

# Example

* What are the frequencies of 2-mers in `TACCTAGGGG`?
* Entabulate all 2-mers in the sequence `TACCTAGGGG`

| AC | AG | CC | CT | GG | TA |
|----|----|----|----|----|----|
|  1 |  1 |  1 |  1 |  3 |  2 |

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

# Demonstrate BLAST

<center>
<iframe src="https://blast.ncbi.nlm.nih.gov/Blast.cgi?PAGE_TYPE=BlastSearch" height=550, width=900>
</iframe>
</center>

---

# BLAST and SARS-CoV-2

* The complete genome of SARS-CoV-2 was [released to the public](https://virological.org/t/novel-2019-coronavirus-genome/319) on January 10, 2021.
* High level of similarity to SARS-like coronaviruses isolated from bats (Bat-SL-CoVZC).
<img src="/img/sarscov2-blast.png" height="300px"/>

<small><small>
Image credit: R Lu <i>et al.</i> (2020) Genomic characterisation and epidemiology of 2019 novel coronavirus: implications for virus origins and receptor binding. <i>Lancet</i> [395(10224): 565-574](https://www.sciencedirect.com/science/article/pii/S0140673620302518).
</small></small>

---

# Getting it wrong

* On January 31, 2020, a preprint<sup>1</sup> was posted to <i>bioRxiv</i> (since withdrawn) claiming to have found "uncanny similarity" of SARS-CoV-2 to HIV using BLAST.
![](https://www.biorxiv.org/content/biorxiv/early/2020/01/31/2020.01.30.927871/T1.medium.gif)
* Fueled conspiracy theories that SARS-CoV-2 had been intentionally manufactured in a laboratory.

<small><small>
<sup>1</sup> Pradhan <i>et al.</i> (2020). Uncanny similarity of unique inserts in the 2019-nCoV spike protein to HIV-1 gp120 and Gag.  <i>bioRxiv</i>, https://doi.org/10.1101/2020.01.30.927871.
</small></small>

---

# Getting it wrong (2)

<img src="/img/blast-results.png" height="350px"/>

* (Review) What does an E-value of 224 mean?

<small><small>
Source: C Zheng <i>et al.</i> (2020) Protein Structure and Sequence Reanalysis of 2019-nCoV Genome Refutes Snakes as Its Intermediate Host and the Unique Similarity
between Its Spike Protein Insertions and HIV‑1.  [J Proteo Res 19, 1351-1360](https://pubs.acs.org/doi/abs/10.1021/acs.jproteome.0c00129).
</small></small>

---

# Getting it wrong (3)

Original study had restricted search to virus database
<img src="https://pbs.twimg.com/media/EPoragAU4AADtFY?format=jpg&name=4096x4096" height="400px"/>

<small><small>
Source: Trevor Bedford (Fred Hutch), [Twitter](https://twitter.com/trvrb/status/1223337991168380928)
</small></small>

---


# Types of BLAST queries

* NCBI maintains both nucleotide and protein databases

<img src="https://open.oregonstate.education/app/uploads/sites/6/2016/10/I.7_2_blast_types.png#fixme" width="600px"/>

<small><small>
Image source: [A Primer for Computational Biology](https://open.oregonstate.education/computationalbiology/chapter/command-line-blast/) by Shawn T. O'Neil (CC-NC-SA 4.0)
</small></small>

---

# More sensitivity means less specificity

Misclassification of virus sequences in simulated data
<img src="/img/tblastx.png" height="400px">

<small><small>
Source: K Bibby <i>et al.</i> (2011) Viral metagenome analysis to guide human pathogen monitoring in environmental samples.  [Let Appl Microbiol 52: 386-392](https://sfamjournals.onlinelibrary.wiley.com/doi/full/10.1111/j.1472-765X.2011.03014.x).
</small></small>

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

