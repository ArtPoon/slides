# MIMM4750G
## Short-read mapping
![](https://imgs.xkcd.com/comics/sitting_in_a_tree.png)

---

# NGS and alignment

* Next-generation sequencing generates billions of sequences (reads).
* The computing time of pairwise alignment is about $O(mn)$ where $m$ and $n$ are the sequence lengths.
* The development of NGS platforms created a huge challenge for existing alignment methods &mdash; too much data!
  * Local alignment (*e.g.*, Smith-Waterman) is way too slow!
  * BLAST is still too slow!
* **New alignment programs were needed.**

---

# Short read mappers

<table>
<tr>
<td>
  <ul>
    <li>Explosion in number of mappers ~2007-2013.</li>
    <li>More recent mappers adapted to handle longer reads, <i>e.g.</i>, <a href="https://github.com/lh3/minimap2">minimap2</a> (from same developers as BWA).</li>
    <li>Some recent programs focus on specific applications of NGS, <i>e.g.,</i> <a href="https://pachterlab.github.io/kallisto/">Kallisto</a> for <i>RNA-seq</i></li>
  </ul>
</td>
<td width="50%">
  <img src="/img/mappers.jpg" height="400px"/>
</td>
</tr>
</table>

<small>
Image source: NA Fonseca <i>et al.</i> (2012) <a href="https://academic.oup.com/bioinformatics/article/28/24/3169/245777">Tools for mapping high-throughput sequencing data.</a> Bioinformatics 28: 3169.
</small>

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

# Pros and cons of indices

* Instead of exhaustively searching the entire genome, an *index* is a data structure derived from the genome that makes searching more efficient.
  * Like a dictionary where you "look up" a word to retrieve its definition.
  * The index will be larger than the genome(s).
  * Although it can take a long time to build an index, we can use it as many times as we want!
* Common data structures include [hash tables](https://en.wikipedia.org/wiki/Hash_table) and [suffix trees](https://en.wikipedia.org/wiki/Suffix_tree).

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
    <td width="55%">
      <ul>
        <li>A trie (pronounced "try", also known as a prefix tree) is a tree-like data structure that represents one or more strings.</li>
        <li>Each directed edge represents a character from an alphabet (set of all characters, $\Sigma$).</li>
        <li>Each string can be spelled out by tracing a path from the root to one of the tips.</li>
      </ul>
    </td>
    <td>
      <img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Trie_example.svg"/>
      <small>
      This trie stores integers keyed by multiple strings, including `tea` and `inn`.  Source: <a href="https://commons.wikimedia.org/wiki/File:Trie_example.svg">Wikimedia Commons</a>, public domain.
      </small>
    </td>
  </tr>
</table>

---

# Pros and cons of tries

* Tries do not require a hash function
  * Hash functions may be time-consuming to compute

* Easy to look up whether a trie contains a string.
  * Starting at the root, proceed toward tips by selecting the next character edge.  
  * If edge is not present, then trie does not contain the string.

---

# Suffix tries

* Storing multiple full strings is *not* what we are trying to do!
  * We want a rapid lookup for *any* substring of one string (the reference genome).
* A suffix trie is a trie that holds all suffixes of one string.
  * $X$ is a substring of $Y$ $\iff$ $X$ is a prefix of a suffix of $Y$.
* We need to add a special character (`$`) to the end of the strong to prevent any suffix from being the prefix of another suffix.
![](/img/pompompurin.svg)

---

<table>
  <tr>
    <td width="55%">
      <h1>Operations on suffix tries</h1>
      <ul>
        <li>Each path from the root to a tip represents a suffix of the string <code>T=abaaba$</code></li>
        <li>If there is no edge for the next character in a substring, then it is not in <code>T</code>.</li>
        <li>The number of tips that descend from a node = the number of times the substring induced by that node appears in T.</li>
      </ul>
      <small>
      Source: Ben Langmead, <a href="https://www.cs.jhu.edu/~langmea/resources/lecture_notes/07_tries_and_suffix_tries_v2.pdf">Tries & Suffix Tries</a>.
      </small>
    </td>
    <td>
      <img src="/img/abaaba.svg"/>
    </td>
  </tr>
</table>

---

# Burrows-Wheeler transform (BWT)

* Tries take up a lot of memory for genome sequences!
* The BWT is a reversible transformation of a string that makes it easier to compress:
  1. Generate all "rotations" of the string as a matrix.
  2. Sort rows in [lexicographic order](https://en.wikipedia.org/wiki/Lexicographic_order).
  3. Extract the last column.

<img src="https://media.springernature.com/full/springer-static/image/art%3A10.1186%2Fs13015-021-00204-6/MediaObjects/13015_2021_204_Fig1_HTML.png" width=350/>

<small><small>
Image source: Anderson and Wheeler. <a href="https://almob.biomedcentral.com/articles/10.1186/s13015-021-00204-6"/>An optimized FM-index library for nucleotide and amino acid search.</a> Algorithms for Molecular Biology 16: 25 (CC BY 4.0).
</small></small>

---

# FM Index

* Ferragina and Manzini (2000) showed that the BWT provides a highly compact index for a string T.
  * FM index for the human genome (~3B nt) required only about 1.3 GB of RAM.
* An FM index retains the functionality of a trie:
  * Count the number of occurrences of substring S.
  * Locate these occurrences in the original string.
* First implemented for NGS in [bowtie](https://bowtie-bio.sourceforge.net/index.shtml) ([Langmead et al. 2009](https://link.springer.com/article/10.1186/Gb-2009-10-3-R25)) and [BWA](https://github.com/lh3/bwa) ([Li and Durbin, 2009](https://academic.oup.com/bioinformatics/article/25/14/1754/225615)).

---

# Using bowtie2

* `bowtie2-build` constructs the FM index from one or more reference sequences

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

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Tews_Falls%2C_Autumn_-_panoramio.jpg/2560px-Tews_Falls%2C_Autumn_-_panoramio.jpg" width=850/>

<small><small>
Image source: Tews Falls, Hamilton, Ontario. <a href="https://commons.wikimedia.org/wiki/File:Tews_Falls,_Autumn_-_panoramio.jpg">Eric Marshall (CC BY 3.0 Unported)</a>.
</small></small>

---

# Coping with genetic variation

* Note that we could only map 21 out of 20000 reads - that sucks!
* Viruses (and sometimes bacteria) evolve so rapidly that there can be many genetic differences between a sample and the reference.
* Most mappers can only handle 1-2 differences between a read and the reference!
* We can ask the mapper to *locally* align the read so that runs of mismatched bases at the 5' or 3' ends are not penalized (soft clipping).

---

# Soft clipping

* Ignore bases at the ends of a read that do not align to the reference genome:

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
  * BAM is a compressed binary version of the SAM file.

```
@HD	VN:1.0	SO:unsorted
@SQ	SN:chr7	LN:159138663
@PG	ID:bowtie2	PN:bowtie2	VN:2.2.8	CL:"/usr/local/bin/bowtie2-align-s --wrapper basic-0 -x chr7 -S SRR5261740.trunc.sam --local -U SRR5261740.trunc.fastq"
SRR5261740.1	16	chr7	142247517	2	168S96M31S	*	0	0	TTCTCCACCTTGGAGATCCAGCGCACAGAGCAGGGGGACTCGGCCATGTATCTCTGTGCCAGCACCACAGTCGCTCCTGAAAAACTGTTTTTTGGCAGTGGAACCCAGCTCTCTGTCTTGGAGGACCTGAACAACGTGTTCCCCGGGAGACTCCAGTATCTGCGTGATCTGCCCCCAGGAGACACAGGGCCATCCAGCAGAGGAGGCTGGTGCCCATGGCAGGGTCAGGGCAGGATGGGAGCTTTACCAGATCAGGGTCACTGTCCCCATGTACTCTGCGTTGATACCACTGCTT	GHHHGHHGHGHHHHHHHGGGGGHHHHHHHHEGGHHHHGGGGHHHHHHHHHHHFHHHHGGHHHGHHHHGGGGGGGHHHGHGHHHHHHGFHHHHHHHHHHHHHGHGHHHGGHHHHHHHHHHHHHHFHHHGGGGGGGGGGBBBBBBAHHHHHHHHHHHHHHGGGHGHHHHGGGGGGGHHHHHHHHHHHHHHGGHHHHHHHHHHHHHHGHHHGGHHHHHHHHHHHHHHHHHHHHHHHHHHGHHHHHGHHHHHHHHGHHHGHHHHGGGGGHHHHHHHHGGGGGGGGGGFFFBFFFBBBBB	AS:i:143	XS:i:136	XN:i:0	XM:i:7	XO:i:0	XG:i:0	NM:i:7	MD:Z:13G8T0G0C12C12A3A41	YT:Z:UU
SRR5261740.2	0	chr7	142493746	0	31S103M163S	*	0	0	AAGCAGTGGTATCAACGCAGAGTACATGGGGGGAGAGGGGTGGGTACTGGAGAAGACCAGCCCCTTCGCCAAACAGCCTTACAAAGACATCCAGCTCTAAGGAGCTCAAAACATCCTGAGGACAGTGCCTGGAGAGGACCTGAACAAGGTGGGGAACACCTTGTTCAGGTCCTCTCCAGGCACTGTCCTCAGGATGTTTTGAGCTCCTTAGAGCTGGATGTCTTTGTAAGGCTGTTTGGCGAAGGGGCTGGTCTTCTCCAGTACCCACCCCTCTCCCCCCATGTACTCTGCGTTGAT	CCCCCFFFFFFFGGGGGGGGGGHHHHHHHHGGGGGGGGGGGGGGGHHHHHHHHHHHHHHHHGGGHHHHGGGGHHHHHHHHHHHHGHHHHHHHHHHHHHHHHHGHHHHHHHHHGGGGGGGGGGGGGFGGGGGGGGGGGGGGGFFFFFFFF;BCCCCFCFGGGGGGGGGGGHHGHHHHHHHHHHHHHHHHHGHHHHHHHHHHHGGHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHGHGGGGGGGGGGGHHHHHHHHHHHHHHHHGGGGGGHHHHGGGGHHHHHHHHHGGGGGHH	AS:i:206	XS:i:206	XN:i:0	XM:i:0	XO:i:0	XG:i:0	NM:i:0	MD:Z:103	YT:Z:UU
SRR5261740.3	0	chr7	142493746	0	176S103M17S	*	0	0	GGGGAACACCTTGTTCAGGTCCTCTCCAGGCACTGTCCTCAGGATGTTTTGAGCTCCTTAGAGCTGGATGTCTTTGTAAGGCTGTTTGGCGAAGGGGCTGGTCTTCTCCAGTACCCACCCCTCTCCCCCCATGTACTCTGCGTTGAAGCAGTGGTATCAACGCAGAGTACATGGGGGGAGAGGGGTGGGTACTGGAGAAGACCAGCCCCTTCGCCAAACAGCCTTACAAAGACATCCAGCTCTAAGGAGCTCAAAACATCCTGAGGACAGTGCCTGGAGAGGACCTGAACAAGGTG	BBBBBBBGGEGGGGGGGHFGGHFHHHHHGGHHHFHGHHHHEHHFHHHHGHHGFGHHHHHHHGHEBGGGGGAEGHHFHHHGHHHHHHHHGHGGGGFGEFEEDGHGHHFBHHFFFGHHGGGGGGDHHHHGGGGHHHDBFFFGBCDGCCCCCCFFFFFFFGGGGGGGGCGHHHHHHHHGGGGGGFGGGGGGGFHHHHHHHHHEHHHHGGGGGHHHHGGGGFHHHHGHHHHHGFHGHHHHHHHHHGHHHGGGHHHFHHBGGGGGGGGGGGGEGGGGGGGGGGGGGGF?EFFFFFFFFF:B	AS:i:206	XS:i:206	XN:i:0	XM:i:0	XO:i:0	XG:i:0	NM:i:0	MD:Z:103	YT:Z:UU
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

# Bitwise flags

* Encoding many pieces of information with a single integer

| Bit | Description | Bit | Description |
|-----|-------------|-----|-------------|
| 1   | Read is paired | 64  | Is read 1 |
| 2   | Read is mapped in proper pair | 128 | Is read 2 |
| 4   | Read 1 is unmapped | 256 | Secondary alignment |
| 8   | Read 2 is unmapped | 512 | Fails quality checks |
| 16  | Read 1 is reverse-complement | 1024 | PCR / optical duplicate |
| 32  | Read 2 is reverse-complement | 2048 | Supplementary alignment |

* *e.g.*, 147 = 128 + 16 + 2 + 1 = `000010010011`
  * Read is paired and mapped in proper pair; it is read 2, and read 1 is the reverse-complement.

---

# CIGAR

* Compact Idiosyncratic Gapped Alignment Report
* A string representation of how the read aligns to the reference

| Token | Description | Token | Description |
|-------|-------------|-------|-------------|
| M     | Matched     | D     | Deletion (gap in reference)   |
| I     | Insertion (gap in query)   | S     | Soft clip   |


* For example, `5S45M3I89M1S` means a 5nt soft clip, 45nt match, 3nt insertion, 89nt match, and a 1nt soft clip.

Write the CIGAR string for the following query:
```
reference   CATG--TACTGTGAC
query       --TACCTAC--TAAC
```

---

# Applications of mapping

* NGS is not just about generating whole genome sequences!
  * Deep sequencing
  * Metagenomics (environmental DNA, microbiomes)
  * Transcriptomics, epigenomics (RNA-seq, ChIP-seq, ATAC-seq)

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Next_generation_sequencing_slide.jpg/800px-Next_generation_sequencing_slide.jpg" width=300/>

<small><small>
Image source: Illumina HiSeq X10 flowcell. <a href="https://commons.wikimedia.org/wiki/File:Next_generation_sequencing_slide.jpg">Wikimedia Commons</a> (CC BY 3.0).
</small></small>

---

# Deep sequencing

* Sequence a specific region of the genome from thousands of copies in a population.
  * *e.g.*, a diverse virus population, tumour cell population
* Useful to detect a rare mutation or measure the frequencies of different mutations in the population.
* Can yield a sequence alignment for reconstructing within-host evolution (phylogeny).

<img src="/img/deep-seq.svg" height=180/>

---

# Metagenomics

* Analysis of samples containing genomes from different species.
* Early work focused on a single gene shared by all organisms of interest, *e.g.*, [16S rRNA](https://en.wikipedia.org/wiki/16S_ribosomal_RNA) for bacteria (but is this really -genomics?).
* Requires a good database of reference genes/genomes.

<img src="/img/metagenomics.svg" width=500/>

---

# Transcriptomics

* Measuring the expression levels of different genes in the genome.
* This used to be with microarrays, in which a plate is spotted with oligos.
  * Labeled RNA transcripts bind to oligos by specific base-pairing.
  * Limited to the number of oligos one can fit on a plate.
* NGS enables one to directly sequence the RNA transcripts.
  * Can and quantify alternate splicing of transcripts from the same gene.

---

# From sequences to count data

* These methodologies convert sequence data to numbers.
  * Metagenomics measures the relative abundance of species.
  * Transcriptomics measures the relative expression of genes.
  * Epigenomics measures the relative abundnace of epigenetic modifications.
  * ChIP-seq measures protein binding (*e.g.*, a transcription factor) to different parts of a genome.
  * ATAC-seq measures relative levels of chromatin accessibility.
  * Deep sequencing measures the relative abundance of mutations.


---

<section data-background="#333" style="color:white">

<h1 style="color:white">Key points</h1>

* Reference-based mapping is the problem of determining whether a substring occurs in the reference genome, and if so, where.
* An index is a compact representation of the reference that makes it faster to look up substrings.
* Mappers can only tolerate a limited amount of divergence from the reference.
* Mapping outputs are usually written in a tabular format called the Sequence Alignment Map (SAM) format.

</section>
