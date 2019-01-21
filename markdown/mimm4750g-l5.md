# MIMM4750G
## Sequence alignment

---

# What is an alignment?

* So far we have talked about comparing sequences residue-by-residue with a score matrix.
* The underlying assumption is that these sequences are aligned.
* An alignment is a hypothesis about how residues (nt, aa) in homologous sequences are related to residues in a common ancestor.
* This is not trivial because of insertions and deletions.

```
Query  1    CTRPNNTRKSVSITIGPGRASYATG---GQAHC  30
            ||||||||||  |||||||||||||   |||||
Sbjct  95   CTRPNNTRKS--ITIGPGRASYATGGIIGQAHC  125

```

---

# Gap characters

* The presence of an insertion or deletion is indicated by a gap character.
* By convention, we use a single dash "&ndash;" for each indel.
* Some programs use non-standard characters like "`.`", "`~`" or "`X`".
* Without additional information, we cannot tell whether a gap is the result of an insertion in the longer sequence or a deletion in the shorter. 
* Hence we use the [portmanteau](https://en.wiktionary.org/wiki/portmanteau) *indel* (insertion/deletion).

---

# Pairwise alignment

* Thorne, Kishino and Felsenstein proposed a simple model of indel evolution (TKF91).
  * Insertions and deletions at constant rates.
  * One nucleotide at a time.
* Solving for the maximum likelihood of TKF91 can be used to align sequences.
* However, TKF91 and subsequent extensions of the model are not feasible for many long sequences.
* There is an infinite number of possible evolutions - *e.g.,* unsampled insertions.

---

# Heuristic methods

* Until TKF91-type methods become feasible, we continue to use heurstic methods.
* A <a href="https://en.wikipedia.org/wiki/Heuristic_(computer_science)">heuristic</a> is an algorithm for solving a problem that has no theoretical guarantee of being accurate.
* In practice, heuristic is designed to quickly produce a solution that is "good enough".
![](https://imgs.xkcd.com/comics/here_to_help.png)

---

# Score matrices (again)

* A major feature of heuristic methods of alignment
* Remember a score quantifies the likelihood of a residue being replaced by another.
* Find which alignment of two sequences maximizes the score.
* A simple score matrix for nucleotides: $+1$ (match), $-1$ (mismatch).

|   | A | C | G | T |
|---|---|---|---|---|
| A | +1 | -1 | -1 | -1 |
| C | -1 | +1 | -1 | -1 |
| G | -1 | -1 | +1 | -1 |
| T | -1 | -1 | -1 | +1 |

---

# Gap penalties

* We need to penalize the score for gaps, or else an alignment gets gaps for free:
  ```
  A-C-G-T   ACGT
  -A-C-T-   AC-T
  ```
* The left option is obviously a terrible alignment!
* If we use match/mismatch scores of `+1/-1` and a gap penalty of `-1`, then **what are the scores** for these alignments?

---

# Penalizing longer gaps

* If a gap spans 2 or more residues, we might want to enforce a milder or more severe penalty.
* For a gap of length $l$:
  * **Linear gap penalty** = $-ld$, where $d$ is a constant per-gap penalty.
  * **Affine gap penalty** = $-d-(l-1)e$, where $d$ is the gap *opening* penalty and $e$ is the gap *extension* penalty.
* It is more common to use affine gap penalties.

---

# Terminal gaps

* Terminal gaps are a contiguous run of gaps on either extreme left or right of a pairwise alignment.
* Also known as "leading" and "trailing" gaps.
```
ACTGATC   ACTGATC
---GATC   ACTG---
```
* We might not want to penalize these when aligning partial (incomplete) sequences.

---

# Dynamic programming

* Dynamic programming is a fundmanetal concept in computer science.
* A complex problem can be broken down into a sequence of much smaller, simpler *recursive* problems.
* "Recursive" means that the problems are nested within each other.  Solving one is part of solving another.
* Retrieving the solutions to problems nested within the next problem saves work!

---

<table>
  <tr>
    <td>
      <h1>Filling the F matrix</h1>
      <ul>
      <li>Most heuristics for sequence alignment operate on a dynamic programming matrix ($F$).</li>
      <li>Like a *dot plot*, it is a matrix where one sequence labels the columns, and the second labels the rows.</li>
      <li>Each entry in $F$ is calculated from the entries above, to the left, or diagonally up and left.</li>
      </ul>
    </td>
    <td>
      <img src="/img/dynamicprogram.png"/>
    </td>
  </tr>
</table>

---

<section data-state="numtrees-slide">
    <center>
    <div id="needleman" class="fig-container"
         data-fig-id="fig-needleman"
         data-file="/include/needleman.html"
         style="height:600px">
    </div>
    </center>
</section>
<small>JS adapted from https://github.com/drdrsh</small>

---

# Local versus global alignment

* *Global* alignment (*e.g.*, Needleman-Wunsch) requires the sequences to be aligned end-to-end &mdash; terminal gaps are penalized.
* *Local* alignment (*e.g.*, Smith-Waterman) relaxes this requirement &mdash; it does not penalize terminal gaps.
* Use local alignment when you know that the query is shorter than the reference, or vice versa.

---

# Multiple sequence alignment

* It is not trivial to extend pairwise alignment to more than two sequences.

```
1 AC-GT   1 ACGT   1 ACGT
  || ||     | ||   2 A-GT
3 ACAGT   2 A-GT   3 ACAGT
```

* Most alignment programs use a *progressive* algorithm to propagate information from pairwise alignments to all sequences.

---

# Progressive sequence alignment

* A *guide tree* determines which pair of sequences are the most closely related.
* Three types of actions:
  1. Align closely related sequence pair.
  2. Align a sequence to group of sequences.
  3. Align two groups of sequences.
* [CLUSTALW](https://en.wikipedia.org/wiki/Clustal) averages scores across residues for each position between groups.
* Preserve all gaps as we proceed down to the root.

---

# The paradox of guide trees

* Alignment is more accurate when the guide tree is closer to the actual tree.
* Most tree-building methods require an alignment.
* We have to use an alignment-free clustering method to build the guide tree.
* For example, *MUSCLE* builds a guide tree by counting k-mers.

---

# Iterative alignment

* After we build an alignment, we can reconstruct a tree.
* That tree can be plugged back into the alignment process as *the next guide tree*.
* This method should incrementally improve the accuracy of alignment.
* Seldom used in practice!

---

# Software

* This is an incomplete list:

| Name | Publication | Description |
|------|-------------|-------------|
| [CLUSTALW](http://www.clustal.org/clustal2/) | [1994](https://academic.oup.com/nar/article-abstract/22/22/4673/2400290) | One of the first MSA programs to achieve widespread popularity.  Less accurate than more recent programs. |
| [T-coffee](http://www.tcoffee.org/Projects/tcoffee/) | [2000](https://www.sciencedirect.com/science/article/pii/S0022283600940427) | Initially performs pairwise alignments of the sequences, but uses a mix of local and global alignments. |
| [MAFFT](https://mafft.cbrc.jp/alignment/software/) | [2002](https://academic.oup.com/nar/article/30/14/3059/2904316) | Uses a fast Fourier transform to rapidly identify homologous regions between sequences.  |
| [MUSCLE](https://www.drive5.com/muscle/) | [2004](https://academic.oup.com/nar/article/32/5/1792/2380623) |  Uses an alignment-free *k*-mer based distance to generate a guide tree, and iteratively refines the alignment by partitioning the tree into subtrees. |

---

# More software

| Name | Publication | Description |
|------|-------------|-------------|
| [BAli-Phy](http://www.bali-phy.org/) | [2006](https://academic.oup.com/bioinformatics/article/22/16/2047/207824) | Uses Bayesian sampling to jointly estimate the alignment and the phylogeny.  We nearly always assume the alignment is a known, fixed quantity when reconstructing the phylogeny.  BAli-Phy infers the alignment and the tree *at the same time*.  Computationally challenging. |
| [PRANK](http://wasabiapp.org/software/prank/) | [2008](http://science.sciencemag.org/content/320/5883/1632) | Assumes that sequence insertions usually lack evolutionary homology to other insertions.  Tends to spread insertions out to such an extreme that the resulting alignment becomes a sparse scaffold of isolated insertions. |
| [SAT&eacute;](http://phylo.bio.ku.edu/software/sate/sate.html) | [2009](http://science.sciencemag.org/content/324/5934/1561) | A pipeline for iterative alignment to estimate both the alignment and tree. |

---

# Manually editing your alignment

* **Always look at your data!**
* There are [several programs](https://en.wikipedia.org/wiki/List_of_alignment_visualization_software) available to visually inspect and manually edit a sequence alignment.
* [AliView](http://www.ormbunkar.se/aliview/)
* [SeaView](http://doua.prabi.fr/software/seaview)



