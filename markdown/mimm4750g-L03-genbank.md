# MIMM4750G
## Comparing sequences

![](https://imgs.xkcd.com/comics/genetic_testing.png)

---

Databases are great but we want to compare homologous sequences

What is homology?

---


# Dot plots

* A simple visualization tool for comparing two unaligned sequences.
* Make a table with one sequence along the top, and a second down the left.
* Fill in cells where both sequences contain the same residue.

|   | g | a | t | c | g | a | a | c | t | g | g |
|---|---|---|---|---|---|---|---|---|---|---|---|
| t | | | &middot; | | | | | | &middot; | |
| g | &middot; | | | | &bull; | | | | | &middot; | &middot; |
| a | | &middot; | | | | &bull; | &middot; | | | |
| a | | &middot; | | | | &middot; | &bull; | | | |
| c | | | | &middot;| | | | &bull; | | |
| g |&middot; | | | |&middot; | | | | |&bull; | |
| g |&middot; | | | |&middot; | | | | | |&bull;|

---

Dot plots revealing genome rearrangements between strains of *Salmonella enterica*.

![](https://mmbr.asm.org/content/mmbr/68/3/560/F4.large.jpg)

<small><small>
Image credit: H Br&uuml;ssow <i>et al.</i> 2004, Microbiol Mol Biol Rev, [68(3) 560-602](10.1128/MMBR.68.3.560-602.2004).
</small></small>

---

# What is a score?

* A measure of sequence homology (similarity that implies common ancestry).
* Sequences do not have to be exactly the same to be closely related.
* BUT this means that we have to know how some residues are more similar than others!
* *e.g.,* is glutamic acid (E) closer to cysteine (C) or aspartic acid (D)?
* A score is a rough estimate of how likely one type of substitution is over another.

---

# Calculating scores

* [Dayhoff](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5037978/) pioneered the concept of quantifying amino acid substitution rates from the comparative analysis of protein sequences.
* Dayhoff *et al.* (1978) mapped 1,572 AA substitutions to trees relating protein sequences in the *Atlas* with <15% divergence.

|       |  A  | R  | N   | D   |C  |Q   |
|-------|-----|----|-----|-----|---|----|
| A Ala |     |    |     |     |   |    |
| R Arg | 30  |    |     |     |   |    |
| N Asn | 109 | 17 |     |     |   |    |
| D Asp | 154 | 0  | 532 |     |   |    |
| C Cys | 33  | 10 | 0   | 0   |   |    |
| Q Gln | 93  | 120 | 50 | 76  | 0 |    |
| E Glu | 266 | 0  | 94  | 831 | 0 | 422 |

---

# PAM matrices

* accepted point mutations (abbreviated as PAM)
* calculate *mutation probability matrix* ($M$) from observed mutation counts ($A$):
`$$M_{ij} = \frac{\lambda m_j A_{ij}}{\sum_{i}A_{ij}}$$`
  where $\lambda$ is a scaling constant, and
`$$m_j = \frac{\sum_{i\ne j} A_{ij}}{n_j}$$`
  <small>(the total number of mutations away from amino acid $j$, divided by total number of occurrences of this AA in the sequences).</small>

---

# PAM250 matrix

250 mutations per 100 amino acids (scaled from PAM1).
![](/img/pam250.png)
<small>
**Is** glutamic acid (E) closer to cysteine (C) or aspartic acid (D)?
</small>

---

# BLOSUM62

* BLOcks SUbstitution Matrix
* Calculated from the (no longer maintained) BLOCKS database of local alignments of highly conserved regions of proteins.
* PAM is based on mutations mapped to a phylogeny.
* BLOSUM is based on odds ratios of AAs in an alignment.

---

# Log-odds

* Consider an alignment of protein sequences.
* Frequency of amino acid $a$ is $p_a$.
* If an aligned pair of AAs $a$ and $b$ are independent, then their probability is $p_a\times p_b$.
* Ratio of the *observed* probability ($q_{a,b}$) to this expectation is the *odds*.
* Taking the log of the odds gives us the log-odds:
  $$s(a,b)= \lambda\log\frac{q_{a,b}}{p_a p_b}$$
  where $\lambda$ is used to round $s$ to nice integers.

---

# Example

* The observed frequency of aligned pairs of tryptophan (W) is $q_{\scriptsize W,W}=0.0065$.
* The observed frequency of W alone is $p_{\scriptsize W}=0.013$.
* What is $s_{WW}$ if we set $\lambda = 2.88$?  Round to one decimal place (*i.e.,* `xy.z`).
* Now do the same for leucine ($q_{\scriptsize L,L}=0.0371$, $p_L=0.099$)

<small>
Example stolen from SR Eddy (2004), Nature Biotechnol 22(8):1035.
</small>

---

# BLOSUM62

* Like PAM, there are several BLOSUM matrices for different levels of evolutionary divergence.
* Unlike PAM, each BLOSUM matrix is derived from its own alignment, rather than being extrapolated from one data-derived matrix.
* BLOSUM62 derived from an alignment of protein segments of <62% identity
* Considered to be comparable to PAM250.

---
