# MIMM4750G
## Short-read mapping
![](https://imgs.xkcd.com/comics/moving_sidewalks.png)

---

# NGS and alignment

* Next-generation sequencing generates billions of sequences (reads).
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
  * If $L$ is too long, then we are unlikely to find a match because of sequencing errors or mutations.
* Even if we optimize $L$, searching for every possible substring in both the read and the genome will take a long time!

---

# Indexing

* The number of reference genomes is always much smaller than the number of reads.
  * A lot of redundant work in searching for substrings in the reference.
* Build a data structure called an index for every substring in the genome.
* An index is like a dictionary where you "look up" a word ($k$-mer) to retrieve its definition (location in the genom).
  * Also known as an [associative array](https://en.wikipedia.org/wiki/Associative_array) of key-value pairs.

---

# Looking up keys
* A naive approach would be to do a linear search for each $k$-mer.
  * Like searching for a word in the dictionary from the first page...

<img src="https://upload.wikimedia.org/wikipedia/commons/0/0a/A_medical_dictionary_for_nurses_%281914%29.jpg" width=250/>

* It would be more efficient if the key tells you exactly where to look in the index.
  * *e.g.*, a textbook index is in alphabetical order, so you can skip to the section with the same first letter.


---

# Hash tables

* A [hash function](https://en.wikipedia.org/wiki/Hash_function) converts a $k$-mer into a nearly unique integer that we use to directly retrieve a value from the index (hash table).
  * *e.g.*, BLAST builds a hash table of k-mers in the query sequence.
* For NGS data, there are too many query sequences!
  * Instead, we build a hash table of the reference genome ([Kent 2002](https://genome.cshlp.org/content/12/4/656.full)).

![](/img/hash-table.svg)

---

# Pros and cons of hash tables

* Not space efficient - a hash table will take up much more space (RAM / storage) than the reference genome.
  * Hash table may largely comprise empty slots.
* Smaller $k$ values increase the probability of a collision (multiple words have the same hash value).

---

# Tries

<table>
  <tr>
    <td width="50%">
      <ul>
        <li>A trie (pronounced "try", also known as a prefix tree) is a tree-like data structure that represents one or more strings.</li>
        <li>Each directed edge represents a character from an alphabet (set of all characters, $\Sigma$).</li>
        <li>Each string can be spelled out by tracing a path from the root to one of the tips.</li>
      </ul>
    </td>
    <td>
      <img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Trie_example.svg"/>
    </td>
  </tr>
</table>

---

# Tries versus hash tables

* Tries do not require a hash function
  * Hash functions may be time-consuming to compute



---

# Pros and cons of indices

* Instead of exhaustively searching the entire genome, an *index* is a data structure derived from the genome that makes searching more efficient.
  * The index will be larger than the genome(s).
  * Although it can take a long time to build an index, we can use it as many times as we want!
* Common data structures include [suffix trees](https://en.wikipedia.org/wiki/Suffix_tree) and the [Burrows-Wheeler transform](https://en.wikipedia.org/wiki/Burrows%E2%80%93Wheeler_transform) (BWT).
  * This approach is similar to BLAST.

---

# Building an index

* `bowtie2-build` constructs the BWT table from one or more reference sequences

```
art@Kestrel:~$ bowtie2-build -q -f Zika-reference.fa zika
Building a SMALL index
art@Kestrel:~$ ls -l
total 16436
-rw-rw-r-- 1 art art 4198153 Mar 14 14:14 zika.1.bt2
-rw-rw-r-- 1 art art    2704 Mar 14 14:14 zika.2.bt2
-rw-rw-r-- 1 art art      17 Mar 14 14:14 zika.3.bt2
-rw-rw-r-- 1 art art    2699 Mar 14 14:14 zika.4.bt2
-rw-rw-r-- 1 art art   10991 Mar  7 21:06 Zika-reference.fa
-rw-rw-r-- 1 art art 4198153 Mar 14 14:14 zika.rev.1.bt2
-rw-rw-r-- 1 art art    2704 Mar 14 14:14 zika.rev.2.bt2
```

---

# Running bowtie2

* Mapping paired-end Illumina MiSeq reads from a Zika virus infection to the reference genome:

```
art@Kestrel:~$ bowtie2 -x zika -1 Zika-envelope.n1E4.R1.fastq.gz -2 Zika-envelope.n1E4.R2.fastq.gz -S result.sam
10000 reads; of these:
  10000 (100.00%) were paired; of these:
    10000 (100.00%) aligned concordantly 0 times
    0 (0.00%) aligned concordantly exactly 1 time
    0 (0.00%) aligned concordantly >1 times
    ----
    10000 pairs aligned concordantly 0 times; of these:
      0 (0.00%) aligned discordantly 1 time
    ----
    10000 pairs aligned 0 times concordantly or discordantly; of these:
      20000 mates make up the pairs; of these:
        19979 (99.89%) aligned 0 times
        21 (0.10%) aligned exactly 1 time
        0 (0.00%) aligned >1 times
0.10% overall alignment rate
```

---

# Coping with pathogen diversity

* Note that we could only map 21 out of 20000 reads - that sucks!
* Viruses (and sometimes bacteria) evolve so rapidly that there can be many genetic differences between a sample and the reference.
* Most mappers can only handle 1-2 differences between a read and the reference!
* We can ask the mapper to *locally* align the read so that runs of mismatched bases at the 5' or 3' ends are not penalized.

---

# Soft clipping

* To allow soft clipping (local alignment) in `bowtie2`, we use the &#8209;&#8209;`local` option:

```
art@Kestrel:~$ bowtie2 -x zika -1 Zika-envelope.n1E4.R1.fastq.gz -2 Zika-envelope.n1E4.R2.fastq.gz -S local.sam --local
10000 reads; of these:
  10000 (100.00%) were paired; of these:
    8639 (86.39%) aligned concordantly 0 times
    1361 (13.61%) aligned concordantly exactly 1 time
    0 (0.00%) aligned concordantly >1 times
    ----
    8639 pairs aligned concordantly 0 times; of these:
      0 (0.00%) aligned discordantly 1 time
    ----
    8639 pairs aligned 0 times concordantly or discordantly; of these:
      17278 mates make up the pairs; of these:
        17269 (99.95%) aligned 0 times
        9 (0.05%) aligned exactly 1 time
        0 (0.00%) aligned >1 times
13.65% overall alignment rate
```

---

# Iterative mapping

* We are still only mapping about 14% of the reads to the reference.
* We need a reference that is more closely related to the consensus of our sample.
* Take the reads that *did* map to the reference and use them to "evolve" the genome into a new reference.

```
art@Kestrel:~$ python adapt-ref.py local.sam Zika-reference.fa adapted.fa
NC_012532.1, original length 10794
Reads cover interval of length 1500
Updated reference with 221 differences

```

---

# Iterative mapping

* Just one round of revising the reference sequence improves the mapping efficiency from 15% to 99%!

```
art@Kestrel:~$ bowtie2 -x adapted -1 Zika-envelope.n1E4.R1.fastq.gz -2 Zika-envelope.n1E4.R2.fastq.gz --local -S remapped.sam
10000 reads; of these:
  10000 (100.00%) were paired; of these:
    90 (0.90%) aligned concordantly 0 times
    9910 (99.10%) aligned concordantly exactly 1 time
    0 (0.00%) aligned concordantly >1 times
    ----
    90 pairs aligned concordantly 0 times; of these:
      0 (0.00%) aligned discordantly 1 time
    ----
    90 pairs aligned 0 times concordantly or discordantly; of these:
      180 mates make up the pairs; of these:
        180 (100.00%) aligned 0 times
        0 (0.00%) aligned exactly 1 time
        0 (0.00%) aligned >1 times
99.10% overall alignment rate
```

---

# SAM format

* The SAM (Sequence Alignment/Map) format has become a standard output format for programs that align NGS reads to reference genomes.
* It is a tabular, tab-separated data format.
* Comments at top of file prefixed with `@`

```
@HD	VN:1.0	SO:unsorted
@SQ	SN:chr7	LN:159138663
@PG	ID:bowtie2	PN:bowtie2	VN:2.2.8	CL:"/usr/local/bin/bowtie2-align-s --wrapper basic-0 -x chr7 -S SRR5261740.trunc.sam --local -U SRR5261740.trunc.fastq"
SRR5261740.1	16	chr7	142247517	2	168S96M31S	*	0	0	TTCTCCACCTTGGAGATCCAGCGCACAGAGCAGGGGGACTCGGCCATGTATCTCTGTGCCAGCACCACAGTCGCTCCTGAAAAACTGTTTTTTGGCAGTGGAACCCAGCTCTCTGTCTTGGAGGACCTGAACAACGTGTTCCCCGGGAGACTCCAGTATCTGCGTGATCTGCCCCCAGGAGACACAGGGCCATCCAGCAGAGGAGGCTGGTGCCCATGGCAGGGTCAGGGCAGGATGGGAGCTTTACCAGATCAGGGTCACTGTCCCCATGTACTCTGCGTTGATACCACTGCTT	GHHHGHHGHGHHHHHHHGGGGGHHHHHHHHEGGHHHHGGGGHHHHHHHHHHHFHHHHGGHHHGHHHHGGGGGGGHHHGHGHHHHHHGFHHHHHHHHHHHHHGHGHHHGGHHHHHHHHHHHHHHFHHHGGGGGGGGGGBBBBBBAHHHHHHHHHHHHHHGGGHGHHHHGGGGGGGHHHHHHHHHHHHHHGGHHHHHHHHHHHHHHGHHHGGHHHHHHHHHHHHHHHHHHHHHHHHHHGHHHHHGHHHHHHHHGHHHGHHHHGGGGGHHHHHHHHGGGGGGGGGGFFFBFFFBBBBB	AS:i:143	XS:i:136	XN:i:0	XM:i:7	XO:i:0	XG:i:0	NM:i:7	MD:Z:13G8T0G0C12C12A3A41	YT:Z:UU
SRR5261740.2	0	chr7	142493746	0	31S103M163S	*	0	0	AAGCAGTGGTATCAACGCAGAGTACATGGGGGGAGAGGGGTGGGTACTGGAGAAGACCAGCCCCTTCGCCAAACAGCCTTACAAAGACATCCAGCTCTAAGGAGCTCAAAACATCCTGAGGACAGTGCCTGGAGAGGACCTGAACAAGGTGGGGAACACCTTGTTCAGGTCCTCTCCAGGCACTGTCCTCAGGATGTTTTGAGCTCCTTAGAGCTGGATGTCTTTGTAAGGCTGTTTGGCGAAGGGGCTGGTCTTCTCCAGTACCCACCCCTCTCCCCCCATGTACTCTGCGTTGAT	CCCCCFFFFFFFGGGGGGGGGGHHHHHHHHGGGGGGGGGGGGGGGHHHHHHHHHHHHHHHHGGGHHHHGGGGHHHHHHHHHHHHGHHHHHHHHHHHHHHHHHGHHHHHHHHHGGGGGGGGGGGGGFGGGGGGGGGGGGGGGFFFFFFFF;BCCCCFCFGGGGGGGGGGGHHGHHHHHHHHHHHHHHHHHGHHHHHHHHHHHGGHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHGHGGGGGGGGGGGHHHHHHHHHHHHHHHHGGGGGGHHHHGGGGHHHHHHHHHGGGGGHH	AS:i:206	XS:i:206	XN:i:0	XM:i:0	XO:i:0	XG:i:0	NM:i:0	MD:Z:103	YT:Z:UU
SRR5261740.3	0	chr7	142493746	0	176S103M17S	*	0	0	GGGGAACACCTTGTTCAGGTCCTCTCCAGGCACTGTCCTCAGGATGTTTTGAGCTCCTTAGAGCTGGATGTCTTTGTAAGGCTGTTTGGCGAAGGGGCTGGTCTTCTCCAGTACCCACCCCTCTCCCCCCATGTACTCTGCGTTGAAGCAGTGGTATCAACGCAGAGTACATGGGGGGAGAGGGGTGGGTACTGGAGAAGACCAGCCCCTTCGCCAAACAGCCTTACAAAGACATCCAGCTCTAAGGAGCTCAAAACATCCTGAGGACAGTGCCTGGAGAGGACCTGAACAAGGTG	BBBBBBBGGEGGGGGGGHFGGHFHHHHHGGHHHFHGHHHHEHHFHHHHGHHGFGHHHHHHHGHEBGGGGGAEGHHFHHHGHHHHHHHHGHGGGGFGEFEEDGHGHHFBHHFFFGHHGGGGGGDHHHHGGGGHHHDBFFFGBCDGCCCCCCFFFFFFFGGGGGGGGCGHHHHHHHHGGGGGGFGGGGGGGFHHHHHHHHHEHHHHGGGGGHHHHGGGGFHHHHGHHHHHGFHGHHHHHHHHHGHHHGGGHHHFHHBGGGGGGGGGGGGEGGGGGGGGGGGGGGF?EFFFFFFFFF:B	AS:i:206	XS:i:206	XN:i:0	XM:i:0	XO:i:0	XG:i:0	NM:i:0	MD:Z:103	YT:Z:UU
SRR5261740.4	16	chr7	142247517	2	24S96M173S	*	0	0	GGGAGACTCCAGCACCTGTGTGATCTGCCCCCAGGAGGCACAGGGCTGCCCAGCAGAGGAGCCTGGTGCCCATGACAGAGTCAGGGCAGGATGGGAGCTTTACCAGATCAGGGTCACTGTCCCATGTACTCTGCGTTGATACCACTGCTTACTCTGAAGATCCAGCGCACAGAGCGGGGGGACTCAGCCGTGTATCTCTGTGCCAGCAGCCCCACGGGGACTAGCTACAATGAGCAGTTCTTCGGGCCAGGGACACGGCTCACCGTGCTCGAGGACCTGAAAAAGGTGTTCCC	HHHHGGFHBHHGG@/GGHHGHHHGGCEEEAHHHEHHHHHHFHGHEGHEGHHGHHHHHGHHHGHHEGFHGHHHHHHFHHGHFEHHHHHHHHGHGHHHFFHHHHHHHHHHHHHHHHFFCGHHHHHGFHEFGGEEAEFGGGFFFBCFC1AA1AGFHGHHHHHHAGGGGGGHHHHGFGGGGHHHHHHHGGGGGHHHHHHHHHHHHGGHHGGGGGGGGGGGHHHHHHHHHHHHHHHHHHHHHGGGGGGHHHHHHHHHHGGGGGFGGGGGHGGGGGFHHHHHGGGGGFGGGGFBFBCCC	AS:i:192	XS:i:143	XN:i:0	XM:i:0	XO:i:0	XG:i:0	NM:i:0	MD:Z:96	YT:Z:UU
```

---

# SAM format


* Each line in a SAM corresponds to a read and contains the following information:

| # | Name  | Description          | #  | Name  | Description          |
|---|-------|----------------------|----|-------|----------------------|
| 1 | QNAME | Read label           | 7  | RNEXT | Ref. seq. of mate    |
| 2 | FLAG  | Bitwise flags        | 8  | PNEXT | Map location of 1st  |
| 3 | RNAME | Reference seq.       |    |       | base in mate         |
| 4 | POS   | Map location of 1st  | 9  | TLEN  | Insertion length     |
|   |       | base in read         | 10 | SEQ   | Read sequence        |
| 5 | MAPQ  | Mapping quality      | 11 | QUAL  | Read quality string  |
| 6 | CIGAR | Compact idiosyncratic    |    |       |                  |
|   |       | gapped alignment report  |    |       |                  |

---

# CIGAR

* Compact Idiosyncratic Gapped Alignment Report
* A string representation of how the read aligns to the reference

| Token | Description |
|-------|-------------|
| M     | Matched     |
| I     | Insertion   |
| D     | Deletion    |
| S     | Soft clip   |

* For example, `5S45M3I89M1S` means a 5nt soft clip, 45nt match, 3nt insertion, 89nt match, and 1nt soft clip.

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

# Applications of mapping

---

# Deep sequencing

* Sequence a specific region of the genome from thousands of copies in the pathogen population.
* Useful to measure the frequency of some variant in the infection.
* Can yield a sequence alignment for reconstructing within-host evolution.

![](/img/deepseq.svg)

---

# From sequences to count data


---

# Further reading

* [Proposed closure of the NCBI SRA (later cancelled)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3129670/)
* [The history of the FASTQ format](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2847217/)
* [Short Read Mapping: An Algorithmic Tour](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5425171/)
* [Quinlan lab samtools Tutorial](http://quinlanlab.org/tutorials/samtools/samtools.html)
