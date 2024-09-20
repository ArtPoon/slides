# MBI3100A
## Sequence alignment

![](https://imgs.xkcd.com/comics/coronavirus_genome.png)

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


# Scoring a nucleotide alignment

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

# Scoring a protein alignment

<center>
<tt>
-ASGTVQL<br/>
VASR--QM
</tt>
</center>

* Let's use the BLOSUM62 matrix, a gap open penalty of `-3` and an extend penalty of `-1`, ignoring terminal gaps.
* The scores are: 
`0 + 4 + 4 + (-2) + (-3-1) + 5 + 2`
for a total score of 9.


---

# Pairwise alignment

* There are several heuristic algorithms that have been developed to find the optimal alignment of two sequences.
  * The [Needleman-Wunsch](https://en.wikipedia.org/wiki/Needleman%E2%80%93Wunsch_algorithm) algorithm was developed to solve the global alignment problem.
  * The [Smith-Waterman](https://en.wikipedia.org/wiki/Smith%E2%80%93Waterman_algorithm) algorithm extends NW to solve the local alignment problem.
* Subsequent improvements have greatly reduced the time complexity.

---

# Dynamic programming

* Needleman-Wunsch and Smith-Waterman are [dynamic programming](https://en.wikipedia.org/wiki/Dynamic_programming) algorithms:
  * A complex problem can be broken down into a sequence of much smaller, simpler *recursive* problems.
* "Recursive" means that the problems are nested within each other.  Solving one is part of solving another.
* Retrieving the solutions to problems nested within the next problem saves work!

---

# The F matrix

* The basis of the NW algorithm is the $F$ matrix.
* We label columns of $F$ with one sequence, and label its rows with a second sequence.
  * We add a special character `*` to the left of both sequences to represent their starts.
* Any path from the lower-right corner of $F$ to the upper-left corner represents an alignment.
  * Moving diagonally (up-left) means matching residues in both sequences.
  * Moving up or to the left adds a gap to the corresponding sequence.

---

<table>
  <tr>
    <td width="50%">
      <h1>Populating the F matrix</h1>
      <ul>
      <li>We start with $F(0,0)=0$.</li>
      <li>Other entries in $F$ are calculated from the entries above, to the left, or diagonally up and left.</li>
      $$
      F(i,j)= \max \left\{ 
        \begin{array}{l}
          F(i-1,j-1) + s(x_i, y_j),\\
          F(i-1,j)-d,\\
          F(i, j-1)-d\\
        \end{array}
        \right.
      $$
      <li>$s(x, y)$ comes from a score matrix, <i>e.g.</i>, BLOSUM</li>
      <li>$d$ is a gap penalty</li>
      </ul>
    </td>
    <td>
      <img src="/img/dynamicprogram.png"/>
    </td>
  </tr>
</table>

---

# Traceback


* For every element $F(i, j)$, we keep track of which step gave the maximum value, *i.e.*, $(i-1, j)$, $(i-1, j-1)$ or $(i, j-1)$.
  * If two or more steps gave the same maximum value, we store multiple pointers. 
* A path from the lower-right corner to the upper-left corner that follows these stored steps is an optimal alignment.
  * As we move along the path, we add up the alignment score.

<small><small>
The following JavaScript was modified from <a href="https://github.com/drdrsh">Mostafa Abdelraouf's</a> excellent implementation of the NW algorithm.
</small></small>

---

<section data-state="needleman">
    <center>
    <div id="needleman" class="fig-container"
         data-fig-id="fig-needleman"
         data-file="/include/needleman.html"
         style="height:650px">
    </div>
    </center>
</section>

---

# Ambiguous alignments

* Sometimes there is more than one alignment with the same maximal score, *e.g.*. 
```
ACGTAACGT   ACGTAACGT
ACGT-ACGT   ACGTA-CGT
```
* The only difference in the above example is where we place the `A` - on the left or the right side of the gap.
* One case where it matters how you place such bases is when you are working with codon (protein-coding) sequences:
```
ACG CAA CGT   ACG CAA CGT
ACG C-- -GT   ACG --- CGT
```

---

![](https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Boardwalk_in_Pelee.JPG/1024px-Boardwalk_in_Pelee.JPG)
<small><small>
Image source: Boardwalk in Point Pelee National Park, <a href="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Boardwalk_in_Pelee.JPG/1024px-Boardwalk_in_Pelee.JPG">Wikimedia Commons</a>, public domain.
</small></small>

---

# Multiple sequence alignment

* It is not trivial to extend pairwise alignment to more than two sequences.
* Suppose we have three sequences: `ACGT`, `AGT` and `ACAGT`.
* There are three pairwise alignments of three sequences:

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

<section data-background="#333" style="color:white">

<h1 style="color:white">Key points</h1>

* Homologous sequences can be aligned by adding gaps that represent insertions or deletions.
* Optimal alignment is defined by match/mismatch scoring and penalizing gaps.
* Most alignment programs use a dynamic programming algorithm to find the optimal alignment.
* Multiple sequence alignment requires a guide tree to determine the order of alignment.
* Always look at your data!

</section>