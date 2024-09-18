# MBI3100A
## Sequence alignment

![](https://imgs.xkcd.com/comics/here_to_help.png)

---

# What is an alignment?

* So far we have talked about comparing sequences residue-by-residue with a score matrix.
* The underlying assumption is that these sequences are aligned.
* An [alignment](https://en.wikipedia.org/wiki/Sequence_alignment) is a hypothesis about how residues (nt, aa) in homologous sequences are related to residues in a common ancestor.
* This is not trivial because of [insertions](https://en.wikipedia.org/wiki/Insertion_(genetics)) and [deletions](https://en.wikipedia.org/wiki/Deletion_(genetics)).

```
Query  1    CTRPNNTRKSVSITIGPGRASYATG---GQAHC  30
            ||||||||||  |||||||||||||   |||||
Sbjct  95   CTRPNNTRKS--ITIGPGRASYATGGIIGQAHC  125

```

---

Unaligned HCV sequences

![](/img/unaligned-hcv.png)

---

Aligned HCV sequences

![](/img/aligned-hcv.png)

---

# Gap characters

* The presence of an insertion or deletion is indicated by a gap character.
  * By convention, we use a single dash "&ndash;" for each indel.
  * Some programs use non-standard characters like "`.`", "`~`" or "`X`".
* Without additional information, we cannot tell whether a gap is the result of an insertion in the longer sequence or a deletion in the shorter.
* Hence we use the [portmanteau](https://en.wiktionary.org/wiki/portmanteau) *indel* (insertion/deletion).

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
* It is more common to use [affine](https://en.wikipedia.org/wiki/Affine_combination) gap penalties.

---

# Terminal gaps

* Terminal gaps are a contiguous run of gaps on either extreme left or right of a pairwise alignment.
  * Also known as "leading" and "trailing" gaps.

  ```
  ACTGATC   ACTGATC
  ---GATC   ACTG---
  ```

* *Global* alignment requires the sequences to be aligned end-to-end &mdash; terminal gaps are penalized.
* *Local* alignment relaxes this requirement &mdash; it does not penalize terminal gaps.
  * Use local alignment if you know a sequence is incomplete.

---

# Scoring an alignment

<center>
<tt>
ACTGATC<br/>
-C--ACC
</tt>
</center>

* There are two gaps in this example.  If we are using affine scoring (open `-2` and extend `-1`) then the total penalty is `-2 + (-3)`.
  * If we ignore terminal gaps, then the penalty is `-3`.
* There are three matches (`+3`) and one mismatch (`-1`)
* The alignment score is `-3`.

---

# Pairwise alignment

* There are several heuristic algorithms that have been developed to find the optimal alignment of two sequences.
  * The [Needleman-Wunsch](https://en.wikipedia.org/wiki/Needleman%E2%80%93Wunsch_algorithm) algorithm was developed to solve the global alignment problem.
  * The [Smith-Waterman](https://en.wikipedia.org/wiki/Smith%E2%80%93Waterman_algorithm) algorithm extends NW to solve the local alignment problem.
* Subsequent improvements have greatly reduced the time complexity.

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

* Preserve all gaps as we proceed down to the root.

---

# Iterative alignment

* Alignment is more accurate when the guide tree is closer to the actual tree.
  * Most tree-building methods require an alignment.
  * We have to use an alignment-free clustering method to build the guide tree.
* After we build an alignment, we can reconstruct a tree.
* That tree can be plugged back into the alignment process as *the next guide tree*.
  * This method should incrementally improve the accuracy of alignment.

---

# Software

| Name | Publication | Description |
|------|-------------|-------------|
| [CLUSTALW](http://www.clustal.org/clustal2/) | [1994](https://academic.oup.com/nar/article-abstract/22/22/4673/2400290) | One of the first MSA programs to achieve widespread popularity.  Less accurate than more recent programs. |
| [MAFFT](https://mafft.cbrc.jp/alignment/software/) | [2002](https://academic.oup.com/nar/article/30/14/3059/2904316) | Uses a fast Fourier transform to rapidly identify homologous regions between sequences.  |
| [MUSCLE](https://www.drive5.com/muscle/) | [2004](https://academic.oup.com/nar/article/32/5/1792/2380623) |  Uses an alignment-free *k*-mer based distance to generate a guide tree, and iteratively refines the alignment by partitioning the tree into subtrees. |
| [PRANK](http://wasabiapp.org/software/prank/) | [2008](http://science.sciencemag.org/content/320/5883/1632) | Assumes that sequence insertions usually lack evolutionary homology to other insertions.  Tends to spread insertions out to such an extreme that the resulting alignment becomes a sparse scaffold of isolated insertions. |
| [SAT&eacute;](http://phylo.bio.ku.edu/software/sate/sate.html) | [2009](http://science.sciencemag.org/content/324/5934/1561) | A pipeline for iterative alignment to estimate both the alignment and tree. |

---

# Manually editing your alignment

* **Always look at your data!**
* There are [several programs](https://en.wikipedia.org/wiki/List_of_alignment_visualization_software) available to visually inspect and manually edit a sequence alignment:
  * [AliView](http://www.ormbunkar.se/aliview/) - Java-based, open source
  * [SeaView](http://doua.prabi.fr/software/seaview) - older, open source, binaries for all platforms
  * [MSAViewer](http://msa.biojs.net/app/) - JavaScript (BioJS), online, open source

---

<img src="/img/bad-alignment1.png" height="350px"/>

* Excessive gaps
* Excessive divergence between aligned regions.
* Cause: non-homologous sequences in data set.

---

<img src="/img/bad-alignment2.png" height="325px"/>

* Indel-rich and diverse area between conserved regions.
* May represent a hypervariable region.
* Unrelated insertion sequences should not be stacked (*e.g.*, PRANK tends to isolate insertions).

---

<img src="/img/bad-alignment3.png" height="350px"/>

* Isolated stretch of mismatched residues in one sequence (HCV reference 4d, DQ516083)
* Rapid evolution in one lineage unlikely.
* May represent a double frameshift mutation - in this case, there is a dropout of `T` calls in nucleotide sequence.

---

<img src="/img/bad-alignment4.png" height="250px"/>

* Sometimes an alignment program will struggle with regions where single indels are common.
* This causes a shuffling effect that is painstakingly difficult to repair manually.

---

<img src="/img/bad-alignment5.png" height="250px"/>

* At the extreme 5' or 3' end of an alignment, it is common for sequences to cut out at different points.
* The abundance of terminal gaps can create problems for correctly aligning the infrequent sequences that extend out this far.
* Usually the terminal regions are trimmed off.

---
