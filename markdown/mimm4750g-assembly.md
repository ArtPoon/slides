# MIMM4750G
## de novo assembly
![](https://imgs.xkcd.com/comics/word_puzzles.png)

---

# What is *de novo* assembly?

* Combine short reads that seem to overlap so they form a longer sequence.
* A *contig* is a contiguous (uninterrupted) run of nucleotides that is formed from the assembly of short reads.

<!--* Some methods attempt to further assemble contigs into *scaffolds*.-->
<img src="/img/contig.png" width="500px"/>

---

# Pros and cons

* Short-read *mapping* is generally faster and easier than *de novo* assembly, but needs a good reference.
* Mapping better suited for variant detection.
* *de novo* assembly is better suited for discovering new genomes, where no suitable reference exists.
* Hybrid methods use both *de novo* assembly and mapping to re-assemble local contigs.

---

# Finding overlaps

* This requires that we compare every pair of pieces!
* Quadratic complexity ($O(N^2)$) with the number of reads, which is already a huge number.
* Made even more difficult if we want to tolerate *inexact* matches (sequencing error or polymorphism)!

<img src="/img/contig2.png" width="500px"/>

---

# Substrings

* Immediately looking for the largest matching sub-string between two strings is time-consuming.
* Instead, we can check if a short *prefix* of one string occurs somewhere in the second string.
* Requiring the suffix to match

<img src="/img/prefix-match.svg"/>

---

# Data structures

* The problem of matching substrings can be made more efficient by converting the strings into a specialized data structure.
* Two major categories of assembly algorithms/data structures:
  1. Overlap graphs
  2. de Bruijn graphs - memory efficient, scales better with data size.

---

# de Bruijn graphs

* Assume every possible *k*-mer in the genome is sequenced exactly once
* A de Bruijn graph connects "words" that differ by a single letter.
* For each *k*-mer, split it into two (*k*-1)-mers.
* For example, `puppy` becomes `pupp` and `uppy`.

---

# Langmead's example

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

<small>See original example in Ben's [lecture slides](http://www.cs.jhu.edu/~langmea/resources/lecture_notes/17_assembly_dbg_v2.pdf).</small>

---

* Each pair of k-1 words are automatically connected by an edge
* Draw an additional edge whenever we encounter the same pair.

<img src="/img/deBruijn1.svg" width="750px"/>

---

![](/img/deBruijn2.svg)

---

![](/img/deBruijn3.svg)

---

# Pros and cons of de Bruijn graphs

* If we start at the node without incoming edges, and follow every edge *exactly once*, we can reconstruct the original string!
* No mucking about with removing transitive edges.
* Repeats are still a problem.
* We were assuming that every k-mer appears exactly once - extra copies break the "walk" property of deBruijn graphs.

---

# Some software

* [SPAdes](http://cab.spbu.ru/software/spades/) - uses de Bruijn graphs, designed for bacterial genomes
* [Velvet](https://www.ebi.ac.uk/~zerbino/velvet/) - uses de Bruijn graphs, popular, Linux only.
* [ABySS](http://www.bcgsc.ca/platform/bioinfo/software/abyss) - Canadian! uses a "Bloom filter" (advancement on de Bruijn graphs)
* [Ray](http://denovoassembler.sourceforge.net/) - Also Canadian (Quebec)! yes, still de Bruijn graphs.

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

# Assemblathon

* An open competition to benchmark different assemblers on simulated or real data.
  * [Assemblathon 1](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3227110/) was held 2011 and used simulated data.
  * [Assemblathon 2](https://academic.oup.com/gigascience/article/2/1/2047-217X-2-10/2656129) was held 2013 and used real data (a [budgie](https://en.wikipedia.org/wiki/Budgerigar), a [cichlid](https://en.wikipedia.org/wiki/Zebra_mbuna), and a [boa constrictor](https://en.wikipedia.org/wiki/Boa_constrictor).
  * [Assemblathon 3](https://assemblathon.org/post/58945403634/thoughts-on-assemblathon-3) pending.
* "Don't trust the results of a single assembly."

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

# *de novo* assembly versus mapping

* Mapping requires a suitable reference.
  * There may be too much divergence to overcome with iterative mapping.
* *de novo* assembly is more difficult, but does not require any known reference.
* We can use a combination of both methods, construct a consensus genome by *de novo* assembly, followed by reference mapping.

---

# Further readings

* [De novo assembly of short sequence reads](https://academic.oup.com/bib/article/11/5/457/1746253) by K Paszkiewicz and DJ Studholme (2010), Briefings in Bioinformatics 11
* [Ben Langmead's lecture materials](http://www.langmead-lab.org/teaching-materials/)
* [What's N50?](https://www.molecularecologist.com/2017/03/29/whats-n50/)
* [The effect of variant interference on de novo assembly for viral deep sequencing](https://bmcgenomics.biomedcentral.com/articles/10.1186/s12864-020-06801-w)