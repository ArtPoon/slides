# MIMM4750G
## Comparing sequences

![](https://imgs.xkcd.com/comics/genetic_testing.png)

---

# Comparing sequences

<img src="https://upload.wikimedia.org/wikipedia/commons/d/d8/Ortholog_paralog_analog_%28homologs%29.svg" height="300px"/>

* Some sequences are more similar to each other because they are copies of a common ancestor &mdash; they are [homologous](https://en.wikipedia.org/wiki/Sequence_homology).
* **How do we figure out whether one sequence is homologous to another?**

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

# Interpreting dot plots

<img src="/img/dotplots.svg" height="500px"/>

---

Dot plots revealing genome rearrangements between strains of *Salmonella enterica*.

![](https://mmbr.asm.org/content/mmbr/68/3/560/F4.large.jpg)

<small><small>
Image credit: H Br&uuml;ssow <i>et al.</i> 2004, Microbiol Mol Biol Rev, [68(3) 560-602](https://mmbr.asm.org/content/68/3/560).
</small></small>

---

# Other alignment-free methods

* Nucleotide frequencies (*e.g.*, GC content)
* k-mer frequencies count the occurrence of "words", `ACG` is a 3-mer
* GC content is like a 1-mer comparison.

---

# k-mer statistics

* let $\\{\mathcal{A}\\}^k$ be the set of all possible combinations of $k$ letters in alphabet $\mathcal{A}$
  * for example, $\mathcal{A} = \\{A, C, G, T\\}$
* for a sequence $S$, we can extract a frequency vector:
  $$(f(S,k) \\;\forall\\; w \in \\{\mathcal{A}\\}^k)$$
* For example, we can calculate a squared [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance) between sequences:
  $$d(f(S), f(T)) = \sum_i (f_i(S)-f_i(T))^2$$

---

# Example

* Let $S =$ `TACT`, and $T=$ `CTAG`

|   | AC | AG | CT | TA |
|---|----|----|----|----|
| S | 1  | 0  | 1  | 1  |
| T | 0  | 1  | 1  | 1  |


$$\begin{aligned}
d &= (1\times 0)^2 + (0\times 1)^2 + (1\times 1)^2 + (1\times 1)^2\\\\
  &= 2
\end{aligned}$$

---

# Another example

<img src="https://media.springernature.com/full/springer-static/image/art%3A10.1186%2Fs13059-017-1319-7/MediaObjects/13059_2017_1319_Fig1_HTML.gif" height="500px"/>

<small><small>
Image credit: A Zielezinski <i>et al.</i> 2017, [Alignment-free sequence comparison: benefits, applications, and tools]((https://genomebiology.biomedcentral.com/articles/10.1186/s13059-017-1319-7)).  <i>Genome Biol</i> 18:186.
</small></small>

---

There are many alignment-free methods, mostly k-mer based

<img src="/img/alignment-free.png" height="500px"/>

<small><small>
Image credit: A Zielezinski <i>et al.</i> 2019, [Benchmarking of alignment-free sequence comparison methods](https://genomebiology.biomedcentral.com/articles/10.1186/s13059-019-1755-7). <i>Genome Biol</i> 20:144.
</small></small>

---

# Pros and cons

* Alignment-free methods are relatively simple and efficient &mdash; avoid the difficult task of aligning sequences.

* Not as sensitive as alignment-based methods.
* No way of knowing what the most effective value of $k$ is for your data.
* We lose information about where important mutations are located in the sequences.

---

# Finding homology in aligned sequences

* Sequences do not have to be exactly the same to be closely related.
* BUT this means that we have to know how some residues are more similar than others!
  * *e.g.,* is glutamic acid (E) closer to cysteine (C) or aspartic acid (D)?
* An **alignment score** is a rough estimate of how likely one type of substitution is over another.

---

# Amino acid properties reflect homology

Training an AI language model on protein sequences reveals clustering by biochemical properties.
<img src="https://www.biorxiv.org/content/biorxiv/early/2020/12/15/622803/F1.large.jpg" height="300px"/>

<small><small>
Image credit: A Rives <i>et al.</i> (2020) Biological structure and function emerge from scaling unsupervised learning to 250 million protein sequence. <i>bioRxiv</i>, https://doi.org/10.1101/622803
</small></small>

---

# Calculating scores

* [Dayhoff](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5037978/) pioneered the concept of quantifying amino acid substitution rates from the comparative analysis of protein sequences.
* Dayhoff *et al.* (1978) mapped 1,572 AA substitutions to trees relating protein sequences in the *Atlas* with <15% divergence.

|       |  A  | R  | N   | D   | C | Q  |
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

<small><small>
Example from SR Eddy (2004), Nature Biotechnol 22(8):1035.
</small></small>

---

# BLOSUM62

* Like PAM, there are several BLOSUM matrices for different levels of evolutionary divergence.
* Unlike PAM, each BLOSUM matrix is derived from its own alignment, rather than being extrapolated from one data-derived matrix.
* BLOSUM62 derived from a "trusted" alignment of protein segments of <62% identity
* Considered to be comparable to PAM250.

---

# Nucleotide score matrices

* Protein sequencing was achieved before nucleotide sequencing &mdash; for decades, most biological sequences were amino acid based.
* Protein sequences are more conserved over time.
* Score matrices also exist for nucleotides: *e.g.*, default matrix for `BLASTN`:

$$
\begin{pmatrix}
2 & -3 & -3 & -3\\\\
-3 & 2 & -3 & -3\\\\
-3 & -3 & 2 & -3\\\\
-3 & -3 & -3 & 2\\\\
\end{pmatrix}
$$

---

# Applications

* BLOSUM matrices are used to score BLAST alignments (blastp), identify homologous sequences.
* BLOSUM62 is used by default.  You can select from multiple PAM and BLOSUM matrices.
* [Next lecture](), we will talk about how BLAST works and how we should interpret its results.

---

# Further readings

* [Where did the BLOSUM62 alignment score matrix come from?](https://www.nature.com/articles/nbt0804-1035)
* [BLAST Command Line Applications User Manual](https://www.ncbi.nlm.nih.gov/books/NBK279684/)