# MBI 3100A
## Comparing sequences

![](https://imgs.xkcd.com/comics/genetic_testing.png)

---

# Comparing sequences

<img src="https://upload.wikimedia.org/wikipedia/commons/d/d8/Ortholog_paralog_analog_%28homologs%29.svg" height="300px"/>

* Some sequences are more similar to each other because they are copies of a common ancestor &mdash; they are [homologous](https://en.wikipedia.org/wiki/Sequence_homology).
* **How do we figure out whether one sequence is homologous to another?**

<small><small>
Image source: https://commons.wikimedia.org/wiki/File:Ortholog_paralog_analog_(homologs).svg,  Creative Commons
</small></small>

---

# How do we compare sequences?

* Sequences are not like numbers - we cannot just take an arithmetic difference of two sequences.
* Instead, we have to extract [features](https://en.wikipedia.org/wiki/Feature_(machine_learning) (*i.e.*, [summary statistics](https://en.wikipedia.org/wiki/Summary_statistics)) of each sequence.
  * In machine learning, a feature is some measurable characteristic of a data object.
  * Features should make it easier to make comparisons between sequences.

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

![](/img/zmr0030420660004.jpeg)

<small><small>
Image credit: H Br&uuml;ssow <i>et al.</i> 2004, Microbiol Mol Biol Rev, [68(3) 560-602](https://mmbr.asm.org/content/68/3/560).
</small></small>

---

# Pros and cons of dot plots

* Intuitive, easy to make
* Does not require the sequences to be aligned to each other ("alignment-free"), skipping a complicated step
* Restricted to pairs of sequences
* Does not scale well with sequence length
* A visualization tool, not an analysis.

---

# Other alignment-free methods

* Nucleotide frequencies (*e.g.*, GC content)
* k-mer frequencies count the occurrence of "words", `ACG` is a 3-mer
* GC content is like a 1-mer comparison.
  * $\frac{C+G}{A+C+G+T}$
  * can identify regions of horizontal transfer<sup>1</sup> between genomes with divergent GC content.

<small><small>
Gao and Zhang (2006) [GC-Profile: a web-based tool for visualizing and analyzing the variation of GC content in genomic sequences](https://academic.oup.com/nar/article/34/suppl_2/W686/2505479).  Nucl Acid Res 34: W686.
</small></small>

---

# k-mer statistics

* A "k-mer" is a piece (sub-string) of a sequence of $k$ symbols in length.
* For example, let $k=2$, $S =$ `TACT`, and $T=$ `CTAG`

|   | AC | AG | CT | TA |
|---|----|----|----|----|
| S | 1  | 0  | 1  | 1  |
| T | 0  | 1  | 1  | 1  |

* The dot (inner) product of these vectors gives a measure of similarity:
$$\begin{aligned}
d &= (1\times 0) + (0\times 1) + (1\times 1) + (1\times 1)\\\\
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
* No way of knowing *a priori* what the most effective value of $k$ is for your data.
* We lose information about where important mutations are located in the sequences.
  * For example, if a specific region is more divergent.

---

# Finding homology in aligned sequences

* Sequences do not have to be exactly the same to be closely related.
* BUT this means that we have to know how some residues are more similar than others!
  * *e.g.,* is glutamic acid (E) closer to cysteine (C) or aspartic acid (D)?
* An **alignment score** is a rough estimate of how likely one type of substitution is over another.
  * We will get into how sequences are aligned in [a later lecture](https://slides.filogeneti.ca/html/mbi3100-L04-alignment.html).

---

# Calculating scores

* [Dayhoff](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5037978/) *et al.* (1978) pioneered the concept of quantifying amino acid substitution rates by comparing protein sequences.
* Built trees relating sets of protein sequences with <15% divergence.
  * Reconstructing ancestral sequences in the tree identified amino acid changes.
<img src="/img/dayhoff-tree.png" width=330/>
<small><small>
Image source: Dayhoff M, Schwartz R, Orcutt B. A model of evolutionary change in proteins. Atlas of protein sequence and structure. 1978;5:345-52
</small></small>

---

# PAM matrices

* Record the reconstructed substitutions as the accepted point mutation matrix, $A_{ij}$.
* From `$A_{ij}$`, Dayhoff *et al.* (1978) calculated the probability $M_{ij}$ that $i$ mutates to $j$ after some time.
  * Note this probability will change with different amounts of time.

* Diagonal entries are set so that each column sums to one.
  * *i.e.*, $M_{ii}$ is the probability that we stay in $i$, given that we start with $i$.

---

# Simulating evolution

* $M_{ij}$ = probability that $i$ becomes $j$ 
  * after enough time passes for an average 1 AA substitution at 100 AA sites.
  * this equals one unit of "PAM" time.
* Adjust for longer time by matrix-multiplication of $M$:

<img src="/img/pam250.svg" height=250/>

---

Raising $M$ to the power of 250 yields PAM250 (250 AA subn's at 100 sites).  Only about 1 in 5 sites remain unchanged.

<table>
<tr>
  <td>PAM1</td>
  <td>PAM250</td>
</tr>
<tr style="background-color: white;">
  <td style="padding: 0;"><img src="/img/pam1-squares.svg" width=400/></td>
  <td style="padding: 0;"><img src="/img/pam250-squares.svg" width=400/></td>
</tr>
</table>

<small><small>
Data from Dayhoff M, Schwartz R, Orcutt B. A model of evolutionary change in proteins. Atlas of protein sequence and structure. 1978;5:345-52.
</small></small>

---

# BLOSUM

* BLOcks SUbstitution Matrix ([Henikoff and Henikoff 1992](https://www.pnas.org/doi/abs/10.1073/pnas.89.22.10915))
* Calculated from the (no longer maintained) [BLOCKS database](https://academic.oup.com/nar/article/24/1/197/2359962) of local alignments of highly conserved regions of proteins.
* PAM is based on mutations mapped to a phylogeny.
* BLOSUM is based on [odds ratios](https://en.wikipedia.org/wiki/Odds_ratio) of AAs in an alignment.

---

# Log-odds

* Frequency of amino acid $a$ is $p_a$.
* If an aligned pair of AAs $a$ and $b$ are [independent](https://en.wikipedia.org/wiki/Independence_(probability_theory)), then their probability is $p_a\times p_b$.
* Ratio of the *observed* probability ($q_{a,b}$) to this expectation is the *odds*.
* Taking the log of the odds gives us the log-odds:
  $$s(a,b)= \lambda\log\frac{q_{a,b}}{p_a p_b}$$
  where $\lambda$ is used to round $s$ to nice integers.

---

# Example

* The observed frequency of aligned pairs of tryptophan (W) is $q_{\scriptsize W,W}=0.0065$.
* The observed frequency of W alone is $p_{\scriptsize W}=0.013$.
* If we set $\lambda = 2.88$, we get:
$$s(W,W) = 2.88 \times \log\left( \frac{0.0065}{0.013^2} \right) \approx 10.5$$
* This $s$ value is very high (BLOSUM62 diagonals mostly 4 to 7).
  * Even though we don't see W aligned to W very often, it happens much more than we expect given W's are so rare (low $p_{\scriptsize W}$).

<small><small>
Example from SR Eddy (2004), Nature Biotechnol 22(8):1035.
</small></small>

---

# BLOSUM62

* Like PAM, there are several BLOSUM matrices for different levels of evolutionary divergence.
* Unlike PAM, each BLOSUM matrix is derived from its own alignment, rather than being extrapolated from one data-derived matrix.
  * Used more sequence data than Dayhoff *et al.*
* BLOSUM62 derived from a "trusted" alignment of protein segments of <62% identity.
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

# Searching a sequence database

* How do we search a database with a nucleotide or protein sequence?
  * The input sequence is our *query*.
  * A matching sequence in the database is the *subject*.
* An unknown species has no keywords to search by.
* One approach would be to align our query sequence against every sequence in the database, and take whatever aligns best.
* This would take too long!  (More on alignment later.)

---

# BLAST

* Basic Local Alignment Search Tool
  * Developed by Stephen Altschul, Warren Gish and David Lipman at the NCBI.
  * Maintained by the NCBI at https://blast.ncbi.nlm.nih.gov/Blast.cgi
* Local similarity = search for conserved intervals.
* This requires some way to measure the similarity of unaligned  sequences.

---

# Types of BLAST queries

* NCBI maintains both nucleotide and protein databases

<img src="https://open.oregonstate.education/app/uploads/sites/6/2016/10/I.7_2_blast_types.png#fixme" width="600px"/>

<small><small>
Image source: [A Primer for Computational Biology](https://open.oregonstate.education/computationalbiology/chapter/command-line-blast/) by Shawn T. O'Neil (CC-NC-SA 4.0)
</small></small>

---

# Initial seed

* The BLAST database stores a [hash table](https://en.wikipedia.org/wiki/Hash_table)) of $k$-mers for sequences in its database.
  * Command line `blastp` defaults to $k=3$, but online version defaults to $k=5$.
* A hash function converts data (like the query sequence) to a simpler value (often an integer).
  * We can use this value to directly look-up records in the database.
* This initial matching $k$-mer is the *seed*.
  * We can also require two seeds within a distance $A$ (gapped BLAST, [Altschul *et al*, 1997](https://academic.oup.com/nar/article/25/17/3389/1061651)).

---

# Scoring seeds

* Suppose we find an exact match for the seed `MHR` in the database.
  * Using [BLOSUM62](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/C_DOC/lxr/source/data/BLOSUM62), the score $S$ is 5 + 8 + 5 = 18.
* We want to include near-matches, so we include hits in the database with a score greater than some threshold $T$.
  * For example, `MHK` has $S=5 + 8 + 2 = 15$
  * `MHF` has $S = 5 + 8 + (-3) = 10$.  If $T>10$ then we reject `MHF`.
* Together, the seed from query and a fragment of equal length from subject with $S>T$ form a *high scoring segment pair* (HSP).

---

# Gap-free extension

* If we have one or two HSPs, then the BLAST algorithm attempts a "gap-free extension".
![](/img/gap-free-extension.svg)

* BLAST stops extension when:
  1. The cumulative score drops by some amount away from its highest value;
  2. the cumulative score becomes zero or less, or;
  3. we reach the end of the subject or query sequence.

---

# Finishing the HSP

* If the gap-free extension retains a high enough score, BLAST calculates a *gapped extension* (tolerate indels).
* Gapped extension (pairwise alignment) is very time consuming.
  * Seeding and gap-free extension steps are designed to minimize the number of alignments.
* Only high scoring gapped extensions are reported.
* Clearly, *scoring* plays an important role in BLAST searches.

---

# Evaluating significance

<table>
  <tr>
    <td>
      <ul>
        <li>Recall BLAST searches for high-scoring sequence pairs (HSP).</li>
        <li>The expected number of HSPs with score $\ge S$:
          $$E=Kmn e^{-\lambda S}$$
          where $m$ and $n$ are the sequence lengths.</li>
        <li>In other words, $E$ is the expected number of false positives!</li>
        <li>$K$ and $\lambda$ are pre-defined parameters that were measured in simulation experiments.</li>
      </ul>
    </td>
    <td>
      <img src="/img/Altschul.png"/>
    </td>
  </tr>
</table>

<small><small>
Image credit: SF Altschul <i>et al.</i> (1990). <a href="https://www.sciencedirect.com/science/article/pii/S0022283605803602">Basic local alignment search tool</a>.  J Mol Biol 215: 403.
</small></small>

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

<img src="/img/blast-results.png" height="350px"/>

> What does an E-value of 224 mean?

<small><small>
Source: C Zheng <i>et al.</i> (2020) Protein Structure and Sequence Reanalysis of 2019-nCoV Genome Refutes Snakes as Its Intermediate Host and the Unique Similarity
between Its Spike Protein Insertions and HIV‑1.  [J Proteo Res 19, 1351-1360](https://pubs.acs.org/doi/abs/10.1021/acs.jproteome.0c00129).
</small></small>

---

# Key points

* Dot plots enable us to visually compare two sequences, identify rearrangements.
* $k$-mers are "words" we extract as features of a sequence that are easier to compare.
* A score matrix quantifies how likely one residue will be replaced by another.
  * Sequences with typical differences are more similar.
* The BLAST algorithm speeds up 
