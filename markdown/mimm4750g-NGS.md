# MIMM4750G
## Short-read mapping
![](https://imgs.xkcd.com/comics/dna.png)

---

# Next-generation sequencing (NGS)

* NGS is a catch-all term for technology that performs sequencing reactions on a very large scale.
* NGS platforms generate gigabytes or [terabytes](https://en.wikipedia.org/wiki/Terabyte) of sequence data in a day.
  * An [Illumina NovaSeq 6000](https://www.illumina.com/systems/sequencing-platforms/novaseq/specifications.html) system can produce 6TB in one run.
* Recent growth in bioinformatics has largely been driven by the need to process and analyze NGS data.

---

# NGS applications

* Whole-genome sequencing
* Exome sequencing
* CHiP-seq
* Deep sequencing (resequencing)
* RNA sequencing (RNA-seq)
* Metagenomics

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

# Metagenomics

* Reads cover many genomes from different organisms in the same sample.
* Often used to characterize the microbial composition of a sample.
* Useful to discover novel pathogens or to detect pathogens that cannot be cultivated.

---

# NGS databases

* Storing and distributing NGS data created a unique problem for those maintaining pubilc databases of conventional sequences.
* NCBI created the Short Read Archive (now the *Sequence* Read Archive).
  * As of April 10, 2019, the NCBI SRA held over 26 petabytes of data - about 6,500 4TB hard drives.
* Partnership with [EMBL-EBI](https://www.ebi.ac.uk/) European Nucleotide Archive and the [National Institute of Genetics](http://www.nig.ac.jp/nig/) DNA Data Bank of Japan.

---

# SRA Toolkit

* NCBI requires users to use its own open-source software to download data
* https://github.com/ncbi/sra-tools
* `fasterq-dump` uses multi-threading and file caching to make downloads faster
* current release for Linux only!

---

# fasterq-dump

Using `fasterq-dump` to retrieve a WGS data set of *Helicobacter pylori*.

```
art@Kestrel:~/Downloads$ fasterq-dump SRR6318672
spots read      : 198,907
reads read      : 397,814
reads written   : 397,814
art@Kestrel:~/Downloads$ ls -lth | head -n3
total 2.1G
-rw-rw-r--  1 art art 103M Mar  6 21:58 SRR6318672_1.fastq
-rw-rw-r--  1 art art 103M Mar  6 21:58 SRR6318672_2.fastq
```

---

# NGS data formats

* Recall that FASTQ is like an expanded version of FASTA

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

> Q1. What is the estimated error probability for Q=40?

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

# What is ASCII?

* [American Standard Code for Information Interchange](https://en.wikipedia.org/wiki/ASCII)
* Data are stored and processed as binary `0`s and `1`s.
* ASCII is a map of binary numbers to human-readable characters.

| Binary | Decimal | ASCII |
|--------|---------|-------|
| 010 0110 | 38 | & |
| 011 0101 | 53 | 5 |
| 100 1001 | 73 | I |
| 100 1010 | 74 | J |

---

# ASCII for FASTQ

* The current version of Illumina systems subtracts `33` from the decimal value of each ASCII character.
* `I` becomes $73-33=40$, which gives us the $Q$ score.

> Q2. What is the character for encoding Q=35?

---

# Data compression

* FASTQ files are often stored in a `gzip` format.
* `gzip` is a UNIX (GNU) compression/decompression program.
  * This program essentially replaces repeating sequences in the data with an instruction to copy forward the first instance.
* Generally reduces a FASTQ file down about 3-fold.
* Some programs can process the gzipped FASTQs!

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

* [Proposed closure of the NCBI SRA (later cancelled)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3129670/)
* [The history of the FASTQ format](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2847217/)
* [Quinlan lab samtools Tutorial](http://quinlanlab.org/tutorials/samtools/samtools.html)

![](https://imgs.xkcd.com/comics/digital_data.png)
