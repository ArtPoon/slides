# MIMM4750G
## Short-read mapping
![](https://imgs.xkcd.com/comics/making_hash_browns.png)
<small>"Making hash browns"</small>

---

# Next-generation sequencing (NGS)

* NGS is a catch-all term for technology that performs sequencing reactions on a very large scale.
* NGS platforms generate gigabytes or [terabytes](https://en.wikipedia.org/wiki/Terabyte) of sequence data in a day.
  * An [Illumina NovaSeq 6000](https://www.illumina.com/systems/sequencing-platforms/novaseq/specifications.html) system can produce 6TB in one run.
* Recent growth in bioinformatics has largely been driven by the need to process and analyze NGS data.

---

# Whole-genome sequencing

* NGS platforms are converging towards $10 per Gbp.
* Bacterial genomes range from about 100 kbp to nearly 20 Mbp
* May be cheaper to randomly shear template and use NGS for "shotgun" sequencing.
* More information than targeted gene marker sequencing (*e.g.*, variable number tandem repeat sequencing in *M. tuberculosis*).

![](/img/shotgun.svg)

---

# Deep sequencing

* Sequence a specific region of the genome from thousands of copies in the pathogen population.
* Useful to measure the frequency of some variant in the infection.
* Can yield a sequence alignment for reconstructing within-host evolution.

![](/img/deepseq.svg)

---

# NGS databases

* Storing and distributing NGS data created a unique problem for those maintaining pubilc databases of conventional sequences.
* NCBI created the Short Read Archive (now the *Sequence* Read Archive).
  * As of April 10, 2019, the NCBI SRA held over 26 petabytes of data - about 6,500 4TB hard drives.
* Partnership with [EMBL-EBI](https://www.ebi.ac.uk/) European Nucleotide Archive and the [National Institute of Genetics](http://www.nig.ac.jp/nig/) DNA Data Bank of Japan.

---

# NGS data formats

* FASTQ is like an expanded version of FASTA

```
@SRR6318672.2 2 length=251
GGATAAAATGATACCCGCTTTTTTGATCACGCCCATTTCTAGCCAGATCGCTGGTAAAGTCATCGCGCAAGTGGAGAGCGATATTTTCGCTCACATGGGAAAAGTCGTTTTAATCCCCAAAGGCTCTAAAGTCATAGGCTACTACAGCAACAACAACAAAATGGGCGAATACCGCTTGGATATTGTATGGAGTCGCATCATCACTCCCCATGGGATTAATATCATGCTCACTAACGCTAAGGGGGCGGATA
+SRR6318672.2 2 length=251
BCCCCFFFFFFFGGGGGGGGGGHGGGHHHHGHGGGHHHHHHHGHHHHHHHGGGGHHHHGHHHHHGGGGGGGHHGHHHGHGGHGGHHHHGGGHGGHHHHHHGHHHHHGGGGGHHHHHHGHGHHFHGHHHHHHHHHHHFFHGHHGHHHHHHHHHHHHHHHHGGHHHHHGGGGGGHDFGGGG0CCGHH:GGGFGGGGGGGDDGGGGGFGGGGGGGGGGFFFFFFFFFFFFFFFFFFFFFFFFFFEE@AC=;FF?
```

* Row 1 has `@` prefix contains sequence label.
* Row 2 contains nucleotide sequence.
* Row 3 has `+` prefix and sometimes repeats label.
* Row 4 contains quality scores.

---

# Quality scores

* A quality score is a log-transform of the estimated probability ($P$) of an incorrect base call.

$$Q = -10 \times \log_{10} P$$

* So if the error probability is 0.01 (1%), then $\log_{10} (0.01) = -2$, and $Q=20$.

> What is the estimated error probability for Q=40?

---

# Encoding quality scores

* FASTQ uses ASCII encoding to convert quality scores from numbers to single characters.

```
!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJ
|                         |    |         |
0........................26...31........41
```

* This saves a lot of space and makes it easier to see how scores relate to different bases:

```
GGATAAA
+
BCCCCFF
33 34 34 34 34 36 36
```

---

# Data compression

* FASTQ files are often stored in a `gzip` format.
* `gzip` is a UNIX (GNU) compression/decompression program.
  * This program essentially replaces repeating sequences in the data with an instruction to copy forward the first instance.
* Generally reduces a FASTQ file down about 3-fold.
* Some programs can process the gzipped FASTQs!

---

# Trimming adapters

* Illumina adapters are short nucleotide sequences (oligos) that are used in the construction of the sequencing library
* If the DNA fragment is shorter than the read, then the sequence may "read-through" to the adapter on the other end.
* Adapter contamination: many genomes in Genbank are contaminated with adapter sequences that were not removed by the authors.
  * *e.g.*, the [carp genome](http://www.opiniomics.org/we-need-to-stop-making-this-simple-fcking-mistake/) is littered with adapter seqeunces

---

# NGS and alignment

* The computing time of pairwise alignment is about $O(mn)$ where $m$ and $n$ are the sequence lengths.
* The development of NGS platforms created a huge challenge for existing alignment methods &mdash; too much data!
  * Local alignment (*e.g.*, Smith-Waterman) is way too slow!
* **New alignment programs were needed.**

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

# Further reading

* [Proposed closure of the NCBI SRA (later cancelled)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3129670/)
* [The history of the FASTQ format](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2847217/)
* [Short Read Mapping: An Algorithmic Tour](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5425171/)
* [Quinlan lab samtools Tutorial](http://quinlanlab.org/tutorials/samtools/samtools.html)

