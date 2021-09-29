# MBI3100A
## Sequence alignment

![](https://imgs.xkcd.com/comics/here_to_help.png)

---

# What is an alignment?

* So far we have talked about comparing sequences residue-by-residue with a score matrix.
* The underlying assumption is that these sequences are aligned.
* An alignment is a hypothesis about how residues (nt, aa) in homologous sequences are related to residues in a common ancestor.
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

# Heuristic methods
* A <a href="https://en.wikipedia.org/wiki/Heuristic_(computer_science)">heuristic</a> is an algorithm for solving a problem that has no theoretical guarantee of being accurate.
* In practice, heuristic is designed to quickly produce a solution that is "good enough".
* For example, [greedy hill climbing](https://en.wikipedia.org/wiki/Hill_climbing) is a heuristic for locating a maximum that is not guaranteed to be the *global* maximum.

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

# Needleman-Wunsch algorithm

* How do we apply these scores and penalties to align two sequences?
* Populate a matrix ($F$) with columns labeled with one sequence, and rows labeled with another.

<img src="/img/dynamicprogram.png" height="350px"/>

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

<small><small>
JS adapted from https://github.com/drdrsh
</small></small>

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

# The paradox of guide trees

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

# NGS and alignment

* Next-generation sequencing generates millions of reads.
* The computing time of pairwise alignment is about $O(mn)$ where $m$ and $n$ are the sequence lengths.
* The development of NGS platforms created a huge challenge for existing alignment methods &mdash; too much data!
  * Local alignment (*e.g.*, Smith-Waterman) is way too slow!
  * BLAST is still too slow!
* **New alignment programs were needed.**

---

# Short read mapping

* Mapping breaks the alignment problem into two parts:
  1. Rapidly determine *where* a read should map in a reference genome.
  2. If we find a good location, do a local pairwise alignment.
* A read might not necessarily come from a known reference genome.
* Method has to tolerate sequencing errors.

![](/img/lost-read.svg)

---

# Exact string matching

* Locate a substring of length $L$ in the reference genome that is exactly the same as a substring in the query sequence.
  * If $L$ is too short, then a substring will have many non-unique locations.
  * If $L$ is too long, then we are unlikely to find a match.
* A naive approach would be to build an index of every substring in the genome, and then do a linear search for the first exact match.

---

# Indexed matching

* Instead of exhaustively searching the entire genome, an *index* is a data structure derived from the genome that makes searching more efficient.
  * The index will be larger than the genome(s).
  * Although it can take a long time to build an index, we can use it as many times as we want!
* Common data structures include [suffix trees](https://en.wikipedia.org/wiki/Suffix_tree) and the [Burrows-Wheeler transform](https://en.wikipedia.org/wiki/Burrows%E2%80%93Wheeler_transform) (BWT).
  * This approach is similar to BLAST.

---

# Short read mappers

<table>
<tr>
<td>
  <ul>
    <li>Explosion in number of mappers ~2007-2013.</li>
    <li>Popular programs include <a href="https://github.com/lh3/bwa">BWA</a> and <a href="https://github.com/BenLangmead/bowtie2">Bowtie</a>.</li>
    <li>Some recent programs focus on specific applications of NGS, <i>e.g.,</i> <a href="https://pachterlab.github.io/kallisto/">Kallisto</a> for <i>RNA-seq</i></li>
  </ul>
</td>
<td width="50%">
  <img src="/img/mappers.jpg" height="400px"/>
</td>
</tr>
</table>

<small><small>
Image source: NA Fonseca <i>et al.</i> (2012) <a href="https://academic.oup.com/bioinformatics/article/28/24/3169/245777">Tools for mapping high-throughput sequencing data.</a> Bioinformatics 28: 3169.
</small></small>

---

# *de novo* assembly

* Combine short reads that seem to overlap so they form a longer sequence.
  * A *contig* is a contiguous (uninterrupted) run of nucleotides that is formed from the assembly of short reads.
* Short-read *mapping* is generally faster and easier, but *de novo* assembly is better when no suitable reference exists.

<img src="/img/contig2.png" width="500px"/>

---

# Finding overlaps

* This requires that we compare every pair of pieces!
  * Quadratic complexity ($O(N^2)$) with the number of reads, which is already a huge number.
  * Made even more difficult if we want to tolerate *inexact* matches (sequencing error or polymorphism)!
* This problem is made more efficient by converting the strings into a specialized data structure, *e.g.*, [de Bruijn graphs](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5531759/).

---

# Some popular assemblers

Not a complete list!

<table class="fullTable">
<tr>
  <th width="15%">Name</th>
  <th>URL</th>
  <th>Description</th>
</tr>
<tr>
  <td width="15%">ABySS</td>
  <td><a href="http://www.bcgsc.ca/platform/bioinfo/software/abyss">http://www.bcgsc.ca/platform/bioinfo/software/abyss</a></td>
  <td>Canadian! Linux and macOS only.</td>
</tr>
<tr>
  <td width="15%">Ray</td>
  <td><a href="http://denovoassembler.sourceforge.net">http://denovoassembler.sourceforge.net</a></td>
  <td>Also Canadian!  No longer maintained. Source code only.</td>
</tr>
<tr>
  <td width="15%">Velvet</td>
  <td><a href="https://www.ebi.ac.uk/~zerbino/velvet">https://www.ebi.ac.uk/~zerbino/velvet</a></td>
  <td>Linux and macOS only. No longer maintained since 2014.</td>
</tr>
<tr>
  <td width="15%">SOAPdenovo2</td>
  <td><a href="https://github.com/aquaskyline/SOAPdenovo2">https://github.com/aquaskyline/SOAPdenovo2</a></td>
  <td>Designed for large genomes. Actively maintained, Linux and macOS only.</td>
</tr>
<tr>
  <td width="15%">SPAdes</td>
  <td><a href="https://github.com/ablab/spades">https://github.com/ablab/spades</a></td>
  <td>Designed for prokaryotic genomes, viruses. Actively maintained.  Linux and macOS only.</td>
</tr>
</table>

---

# N50

* Are the assembly contigs reliable?
* N50: when contigs are sorted by length, N50 is the length of the contig at which we reach 50% of assembled nucleotides; longer is better.

Sort contigs by lengths in decreasing order:
<img src="https://i1.wp.com/www.molecularecologist.com/wp-content/uploads/2017/03/Figure1a.jpg" height="45px"/>

Locate midpoint along concatenated array of contigs (N50=60):
<img src="https://i0.wp.com/www.molecularecologist.com/wp-content/uploads/2017/03/Figure1b.jpg" height="100px"/>

<small><small>
Image credit: E Videvall <i>et al.</i> https://www.molecularecologist.com/2017/03/whats-n50/
</small></small>

---

# Quality control (2)

* L50 is the rank of the contig that is associated with the N50 point.
  * The smallest number of contigs you would need to concatenate to get to 50% of total assembly length.
  * Lower numbers are better.
* In [Elin Videvall](http://www.videvall.com)'s example (below), L50 = 3.

<img src="https://i2.wp.com/www.molecularecologist.com/wp-content/uploads/2017/03/Figure3.jpg" height="100px"/>

<small><small>
Image credit: E Videvall <i>et al.</i> https://www.molecularecologist.com/2017/03/whats-n50/
</small></small>

---

# Further reading

* [De novo assembly of short sequence reads](https://academic.oup.com/bib/article/11/5/457/1746253) by K Paszkiewicz and DJ Studholme (2010), Briefings in Bioinformatics 11
* [Ben Langmead's lecture materials](http://www.langmead-lab.org/teaching-materials/)
* [What's N50?](https://www.molecularecologist.com/2017/03/29/whats-n50/)
* [The effect of variant interference on de novo assembly for viral deep sequencing](https://bmcgenomics.biomedcentral.com/articles/10.1186/s12864-020-06801-w)