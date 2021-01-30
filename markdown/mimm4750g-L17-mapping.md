# MIMM4750G
## Short read mapping

![](https://imgs.xkcd.com/comics/making_hash_browns.png)
<small>"Making hash browns"</small>

---

# Demultiplexing

* One of the first steps in processing raw NGS outputs
* Generates multiple FASTQs from binary base call `.bcl` files
  * This conversion used to be performed with a Perl script `bcl2fastq.pl`
  * Has now been re-implemented as a C++ program [`bcl2fastq2`](https://support.illumina.com/sequencing/sequencing_software/bcl2fastq-conversion-software.html)
* Separates reads labelled with different index tags into different FASTQ files.

---

# Quality control

* A number of programs for pre-processing short read data, *e.g.*, [FastQC](https://www.bioinformatics.babraham.ac.uk/projects/fastqc/), [fastx_toolkit](http://hannonlab.cshl.edu/fastx_toolkit/index.html)
* **Number of reads:** a sample may have a small number of reads, possibly due to inaccurate DNA quantification
* **Quality scores:** read quality tends to fall off over cycles.
* **Nucleotide frequencies:** skewed frequencies can reflect poor quality.

---

# Trimming adapters

* Illumina adapters are short nucleotide sequences (oligos) that are used in the construction of the sequencing library
* If the DNA fragment is shorter than the read, then the sequence may "read-through" to the adapter on the other end.
* Adapter contamination: many genomes in Genbank are contaminated with adapter sequences that were not removed by the authors.
* *e.g.*, the [carp genome](http://www.opiniomics.org/we-need-to-stop-making-this-simple-fcking-mistake/)

---

# Two problems of alignment

* When we've been aligning sequences, we've been starting with a set of short, homologous sequences - the problem is figuring out where there might be insertions and deletions.
* What if we need to align a short sequence to a very long one, *e.g.*, a genome?
* We have to solve this *mapping* problem (where is the homologous region, if any?) before we can tackle the other one.

![](/img/lost-read.svg)

---

# NGS and alignment

* The computing time of pairwise alignment is about $O(mn)$ where $m$ and $n$ are the sequence lengths.
* The development of NGS platforms created a huge challenge for existing alignment methods &mdash; too much data!
  * Local alignment (Smith-Waterman) is way too slow!
  * BLAST is still too slow!
* **New alignment programs were needed.**

---

<img src="/img/bts605f1p.jpeg" width="600px"/>

<small>
Timeline of mapper software from NA Fonseca *et al* 2012, Bioinformatics 28: 3169.
</small>

---

# Exact string matching

* Locate a substring of length $L$ in the reference genome that is exactly the same as a substring in the query sequence.
  * If $L$ is too short, then a substring will have many non-unique locations.
  * If $L$ is too long, then we are unlikely to find a match.
* A naive approach would be to build an index of every substring in the genome, and then do a linear search for the first exact match.

---

# Hash-based mapping

* A [hash function](https://en.wikipedia.org/wiki/Hash_function) is some rapid method for converting data of any size (*e.g.*, genomes) to a much simpler value (*e.g.*, integers).
* Range of possible hash values is much smaller than the number of possible "keys".
* Therefore, some probability that two or more keys will map to the same value (*collision*).
  * *e.g.,* a function that counts the number of "A"s is a pretty useless hash function.

---

![](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5425171/bin/nihms854488f3.jpg)

<small>Image credit: Canzar and Sazlberg (2018) Proc IEEE 105, https://dx.doi.org/10.1109%2FJPROC.2015.2455551</small>

---

# Suffix trees

* A data structure that contains all suffixes of a string.
* Makes many search and comparison operations more efficient.
* Requires much more space to store than the original string.

<img src="/img/suffix-tree-ATCGAT.png" width="450px"/>
Suffix tree for `ATCGAT`

---

# Longest common substring

Concatenate strings: `ATCGTA#ATCGAT$`

<img src="/img/suffix-tree-match.png" width="600px"/>

<small>
Example adapted from [Yuzhen Ye (Indiana University, Data Structures C343/A594)](http://homes.sice.indiana.edu/yye/lab/teaching/spring2014-C343/suffix.php)
<small>

---

# Burrows-Wheeler transform

* Storing hash index or suffix tree requires a lot of memory!
* The next generation of short read mappers (BWA, Bowtie, SOAPv2) replace the hash function with the Burrows-Wheeler transform (BWT)
<img src="/img/btp324f2.jpeg" width="400px"/>

---

# BWT

* The transform of string $S$, $BWT(S)$, is easier to compress
* Reversing $BWT(S)$ back to $S$ is fast.
* Transform makes finding exact matches to another string $T$ *really* fast.

<img src="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5425171/bin/nihms854488f8.jpg" width="500px"/>

---

# Constructing an index

* `bowtie2-build` constructs the BWT table from one or more reference sequences
* `-f` flag indicates references are in a FASTA file
* `-q` flag sets program to quiet mode (otherwise it prints a *lot* of messages!)

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
* Most mappers can only a small number of differences between a read and the reference!
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

# Bitwise flags

* A decimal number is a compact way to store a series of bits.
* The decimal number `99` maps to the binary number `000001100011`.

| Bit | Description | Bit | Description |
|-----|-------------|-----|-------------|
| 1   | read is paired | 64  | first in pair |
| 2   | read is mapped in a proper pair | 128 | second in pair |
| 4   | read is not mapped | 256 | not primary alignment |
| 8   | mate is not mapped | 512 | read fails platform quality checks |
| 16  | read is reverse strand | 1024 | read is PCR/optical duplicate |
| 32  | mate is reverse strand | 2048 | supplementary alignment |

> Q3. Decode the flag 99 into four positive states.

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

# BAM

* A BAM (Binary Alignment Map) file is just a SAM file that's been compressed into a binary encoded file (not a plain text file)
  * File size reduced to about 30% of the original ([source](https://academic.oup.com/bioinformatics/article/32/24/3709/2525655))
  * By default, the reads are stored in the same order as they appear in the SAM (as they come off the machine).
* Some programs require the SAM or BAM file to be sorted with respect to their position on the reference genome.

---

# Further reading

* [Short Read Mapping: An Algorithmic Tour](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5425171/)
* [Ben Langmead's lecture slides on BWT](http://www.cs.jhu.edu/~langmea/resources/lecture_notes/10_bwt_and_fm_index_v2.pdf)
