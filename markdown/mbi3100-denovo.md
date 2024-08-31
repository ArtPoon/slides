# MIMM4750G
## de novo assembly
![](https://imgs.xkcd.com/comics/word_puzzles.png)

---

# Sequencing genomes

<table>
  <tr>
    <td width="70%">
      <ul>
        <li>The first genome to be sequenced was the RNA bacteriophage MS2 (3,659 nt)</li>
        <li>The following year, <a href="https://en.wikipedia.org/wiki/Frederick_Sanger">Frederick Sanger</a> and colleagues published the sequence of the DNA bacteriophage $\phi$X174 genome (5,386 nt).</li>
        <li>Sanger developed a <a href="https://en.wikipedia.org/wiki/Sanger_sequencing"/>new technique</a> using primer extension with radiolabelled nucleotides.</li>
        <li>Running the products on a gel enabled one to "read" the genome about 80 nucleotides at a time.</li>
      </ul>
    </td>
    <td>
      <img src="/img/Sanger.png" height=400/>
      <small>
      A sequencing gel with radiolabelled bands.  From BDM Theophilus in <i>Methods in Molecular Biology</i>, vol. 65. Humana Press Inc, NJ.
      </small>
    </td>
  </tr>
</table>

---

# The Human Genome project

<table>
  <tr>
    <td width="65%">
      <ul>
        <li>An international effort (1990-2003) involving 20 research centres in six countries.</li>
        <li>Initially projected to cost $3B USD to sequence 3B nt genome.</li>
        <li>Transitioned from gel-based Sanger sequencing to automated capillary-based machines producing 1,000 nt per second.</li>
        <li>A private firm (Celera Genomics) announced they would complete the genome first, for only $300M USD, using random whole-genome shotgun sequencing.</li>
      </ul>
    </td>
    <td>
      <img src="/img/HGP-volunteers.png"/>
      <small>
      Ad recruiting volunteers to provide blood samples for the Human Genome Project.  Published in a newspaper in Buffalo, New York, in 1997.  Source: <a href="https://www.genome.gov/about-genomics/educational-resources/fact-sheets/human-genome-project">National Human Genome Research Institute</a>.
      </small>
    </td>
  </tr>
</table>

---

<table>
  <tr>
    <td width="50%">
      <h1>Shotgun sequencing and the HGP</h1>
      <ul>
        <li>Both public and private efforts used shotgun sequencing.</li>
        <li>Nucleic acid is randomly fragmented into pieces prior to sequencing.</li>
        <li>Sequences must be computationally assembled to recreate the original sequence.</li>
      </ul>
      <small>
      Source: Commons, Toft and Fares (2009). <i>Computational Biology Methods and Their Application to the Comparative Genomics of Endocellular Symbiotic Bacteria of Insects.</i> Biol Proced Online 11: 52 (CC BY 2.0).
      </small>
    </td>
    <td style="vertical-align: middle;">
      <img src="https://media.springernature.com/full/springer-static/image/art%3A10.1007%2Fs12575-009-9004-1/MediaObjects/12575_2009_Article_9004_Fig1_HTML.jpg"/>
    </td>
  </tr>
</table>

---

# Shotgun sequencing today
<table>
  <tr>
    <td width="40%">
      <ul>
        <li>A clinical lab recently generated genomes for 12 patients in about 8h (<a href="https://www.nejm.org/doi/full/10.1056/NEJMc2112090">Gorzynski <i>et al.</i> 2022</a>).</li>
        <li><i>e.g.,</i> 3mo infant was diagnosed with Poirier-Bienvenu neuro-developmental syndrome.</li>
        <li>Standard epilepsy panel arrived 2 weeks later, inconclusive.</li>
      </ul>
    </td>
    <td style="vertical-align: middle;">
      <img src="/img/nejmc2112090_f1.jpg"/>
      <small>
      Source: Gorzynski et al. Ultrarapid Nanopore Genome Sequencing in a Critical Care Setting.  N Engl J Med 2022;386: 700-702.
      </small>
    </td>
  </tr>
</table>

---

# What is assembly?

* Imagine a room full of millions of puzzle pieces, where:
  * Some pieces are missing, while others are duplicates or come from another set.
  * Some of the pieces were cut incorrectly and the edges won't match.
  * All the pieces are the same colour.

![](/img/Puzzle_pieces.jpg)

<small><small>
Image source: Cory Doctorow, <a href="https://commons.wikimedia.org/wiki/File:Puzzle_pieces.jpg">Wikimedia Commons</a>, CC BY-SA 2.0.
</small></small>

---

# Finding overlaps

* This requires that we compare every pair of pieces!
* Quadratic complexity ($O(N^2)$) with the number of reads, which is already a huge number.
* Made even more difficult if we want to tolerate *inexact* matches (sequencing error or polymorphism)!

<img src="/img/contig2.png" width="500px"/>

---

# Efficient overlap detection

* Searching for common [substrings](https://en.wikipedia.org/wiki/Substring) of length $k$ between two strings $(X$ and $Y)$ is time-consuming for large $k$!
* Instead, see if [suffix](https://en.wikipedia.org/wiki/Suffix) of length $l<k$ in $X$ occurs in $Y$.
  * If a match is found, extend to the left to verify if entire $k$-[prefix](https://en.wikipedia.org/wiki/Prefix) of $Y$ matches (below $l=3$, $k=6$):

<img src="https://nekrut.github.io/BMMB554/img/find_overlap.png" width=650/>

<small><small>
Image source: Anton Nekrutenko, https://nekrut.github.io/BMMB554/lecture8/
</small></small>

---

# Data structures

* The problem of matching substrings can be made more efficient by converting the strings into a specialized data structure.
* A data structure is a system for storing and retrieving information.
  * For example, a linked list is a sequence of nodes that store values and references to the next node:

<img src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Singly-linked-list.svg"/>

* Two major categories of data structures for assembly:
  1. Overlap graphs
  2. de Bruijn graphs

<small><small>
Image source: <a href="https://commons.wikimedia.org/wiki/File:Singly-linked-list.svg">WikiMedia Commons</a>, public domain
</small></small>

---

# What is a graph?

* A [graph](https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)) is a data structure where objects are represented by *nodes*.
* Relations between nodes are represented by connections or *edges*.
  * Edges may be directed (arrows) or undirected.
* Graphs have many applications in bioinformatics, and indeed in all science.
<img width="300px" src="/img/graph.svg"/>


---

# Overlap graph

* The presence or absence of an overlap between any two reads can be represented by an edge in a graph.
* For example, consider the following "genome" string:
```
to_every_thing_turn_turn_turn_there_is_a_season
```
* Suppose we have an even distribution of reads of length 7 in steps of 1, *i.e.*, `to_ever`, `o_every`, ...
* Set the prefix search length to $l=3$ and $k=6$:
  * `o_every` has a 3-prefix `o_e` that appears at position 1 of `to_ever`.
  * This match can be extended to maximum length 6 (`o_ever`).

<small><small>
Source: Ben Langmead, https://www.cs.jhu.edu/~langmea/resources/lecture_notes/assembly_olc.pdf.
</small></small>

---

# Building an overlap graph

* Let each node represent a read.
* Draw an edge between nodes if there exists an overlap of length at least $l$ and up to $k$.
* Direct each edge so that:
  * it originates from the node with matching suffix, and
  * terminates at node with matching prefix.

<img src="/img/o_every.svg" width=400/>

---

The start of this overlap graph is not too difficult to read...

![](/img/langmead1.svg)

---

... but the entire graph gets pretty gnarly!

![](/img/langmead-full.svg)

---

# Simplifying the graph

* Why does the graph explode?  It is because of the repeating motif `_turn`.
<img src="/img/overlap-gnarl.png" width=300/>
* We can simplify this graph by removing edges that skip one or two nodes in a chain, *i.e.*, transitive edges:
<img src="/img/transitive-edges.svg" width=500/>

---

# Extracting contigs
* Removing transitive edges simplifies the graph tremendously!

* However, the graph still contains a cycle that will induce an endless path ("turns, turns, turns, turns, ...")
![](/img/turnsturnsturns.svg)

* We convert the simple paths in the graph into *contigs*:

![](/img/graph-to-contigs.svg)

---

# Problems with overlap graphs

* The graph is immense.  
  * We must allocate a node for every read in the data set.
  * Modern datasets contain millions of reads!
  * The number of edges grows rapidly with the number of nodes.
* Algorithms for building and interpreting overlap graphs are inefficient.

---

# de Bruijn graphs

* Memory efficient, scale better with data size.
* Assume every possible *k*-mer in the genome is sequenced exactly once
* A de Bruijn graph connects "words" that differ by a single letter.
* For each *k*-mer, split it into two (*k*-1)-mers.
* For example, `puppy` becomes `pupp` and `uppy`.

---

# Example

* Get all 5-mers from the string `a_long_long_long_time`.
* Scramble the 5-mers so they are incorporated in random order.
* Some Python:

```python
>>> s = "a_long_long_long_time"
>>> kmers = [s[i:(i+5)] for i in range(0, len(s)-5)]
>>> kmers
['a_lon', '_long', 'long_', 'ong_l', 'ng_lo', 'g_lon', '_long', 'long_', 'ong_l', 'ng_lo', 'g_lon', '_long', 'long_', 'ong_t', 'ng_ti', 'g_tim']
>>> import random
>>> random.shuffle(kmers)
>>> kmers
['_long', 'long_', 'ng_lo', 'ong_l', '_long', 'ong_t', 'ng_lo', '_long', 'g_tim', 'long_', 'g_lon', 'a_lon', 'g_lon', 'ong_l', 'ng_ti', 'long_']
```

<small>See original example in Ben Langmead's [lecture slides](http://www.cs.jhu.edu/~langmea/resources/lecture_notes/17_assembly_dbg_v2.pdf).</small>

---

* Each pair of k-1 words are automatically connected by an edge
* Draw an additional edge whenever we encounter the same pair.

<img src="/img/deBruijn1.svg" width="750px"/>

---

![](/img/deBruijn2.svg)

---

Traversing the final graph recovers the original sequence.
![](/img/deBruijn3.svg)

---

# Pros and cons of de Bruijn graphs

* If we start at the node without incoming edges, and follow every edge *exactly once*, we can reconstruct the original string!
* No mucking about with removing transitive edges.
* Repeats are still a problem.
* We were assuming that every k-mer appears exactly once - extra copies break the "walk" property of deBruijn graphs.

---

# Assembler software

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
  <td>Bloom filters (improvement on de Bruijn graphs). Canadian! Linux and macOS only.</td>
</tr>
<tr>
  <td width="15%">Ray</td>
  <td><a href="http://denovoassembler.sourceforge.net">http://denovoassembler.sourceforge.net</a></td>
  <td>de Bruijn graphs. Also Canadian!  No longer maintained. Source code only.</td>
</tr>
<tr>
  <td width="15%">Velvet</td>
  <td><a href="https://www.ebi.ac.uk/~zerbino/velvet">https://www.ebi.ac.uk/~zerbino/velvet</a></td>
  <td>de Bruijn graphs. Linux and macOS only. No longer maintained since 2014.</td>
</tr>
<tr>
  <td width="15%">SOAPdenovo2</td>
  <td><a href="https://github.com/aquaskyline/SOAPdenovo2">https://github.com/aquaskyline/SOAPdenovo2</a></td>
  <td>Designed for large genomes. Actively maintained, Linux and macOS only.</td>
</tr>
<tr>
  <td width="15%">SPAdes</td>
  <td><a href="https://github.com/ablab/spades">https://github.com/ablab/spades</a></td>
  <td>de Bruijn graphs.  Designed for prokaryotic genomes, viruses. Actively maintained.  Linux and macOS only.</td>
</tr>
</table>

---

# Which assembler should we use?

* An open competition to benchmark different assemblers on simulated or real data.
  * [Assemblathon 1](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3227110/) was held 2011 and used simulated data.
  * [Assemblathon 2](https://academic.oup.com/gigascience/article/2/1/2047-217X-2-10/2656129) was held 2013 and used real data (a [budgie](https://en.wikipedia.org/wiki/Budgerigar), a [cichlid](https://en.wikipedia.org/wiki/Zebra_mbuna), and a [boa constrictor](https://en.wikipedia.org/wiki/Boa_constrictor).
  * [Assemblathon 3](https://assemblathon.org/post/58945403634/thoughts-on-assemblathon-3) pending.
* "Don't trust the results of a single assembly."

---

<img src="https://journals.plos.org/ploscompbiol/article/file?id=10.1371/journal.pcbi.1006994.g001&type=large" height="300px"/>

* A *contig* is a contiguous nucleotide sequence produced from overlapping reads.
* A *scaffold* is an arrangement of contigs based on mate-pairs that span the gap between adjacent contigs.
* These outputs are generally written in a FASTA format.

<small><small>
Image credit: Ghurye and Pop (2019). [Modern technologies and algorithms for scaffolding assembled genomes](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1006994).  PLOS Comput Biol 15: e1006994.
</small></small>

---

# Quality control

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

# Viruses are difficult

* Assembly algorithms were generally designed for human genomes.
  * Diploidy means only two variants of a genome in a sample.
  * Relatively low diversity.
* Diverse virus populations are a challenge because of:
  * Thousands of different variants in a sample.
  * Enormous diversity.
  * Contamination from more abundant host DNA/RNA, other microbes.

---

# Variant interference

* Presence of variants in the data can cause the number of contigs to explode.
<center>
<small><small>
VD = variant distinction; VI = variant interference; VS = variant singularity.
</small></small>
<img src="https://media.springernature.com/full/springer-static/image/art%3A10.1186%2Fs12864-020-06801-w/MediaObjects/12864_2020_6801_Fig3_HTML.png" height="400px"/>
</center>

<small><small>
From CJ Castro <i>et al.</i> (2020). <a href="https://bmcgenomics.biomedcentral.com/articles/10.1186/s12864-020-06801-w">The effect of variant interference on de novo assembly for viral deep sequencing</a>.  BMC Genomics 21:421.
</small></small>

---

# Assembly vs. mapping

* Mapping is the alignment of each sequence to a reference genome (more next week!)
  * Generally faster and easier than *de novo* assembly.
  * If the reference is not closely related to the true genome, mapping can fail.
  * Retains variation, better suited for variant detection.
* *de novo* assembly is better suited for discovering new genomes, where no suitable reference exists.
  * Much more difficult.
* Hybrid methods use both *de novo* assembly and mapping to re-assemble local contigs.

---

# Further readings

* [De novo assembly of short sequence reads](https://academic.oup.com/bib/article/11/5/457/1746253) by K Paszkiewicz and DJ Studholme (2010), Briefings in Bioinformatics 11
* [Ben Langmead's lecture materials](http://www.langmead-lab.org/teaching-materials/)
* [What's N50?](https://www.molecularecologist.com/2017/03/29/whats-n50/)
* [The effect of variant interference on de novo assembly for viral deep sequencing](https://bmcgenomics.biomedcentral.com/articles/10.1186/s12864-020-06801-w)

