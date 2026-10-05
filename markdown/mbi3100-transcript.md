# MBI 3100A
## Transcriptomics
![](https://imgs.xkcd.com/comics/rna.png)

---

# What is transcriptomics?

* The transcriptome comprises all RNAs transcribed from the genome:
* Transcriptomics is the study of:
  * the composition of the transcriptome
  * how the transcriptome varies among cells and tissues
  * how the transcriptome changes in response to environmental factors

---

# Types of RNAs

* Coding RNAs
  * messenger RNAS (mRNAs) transcribed from protein-coding genes
* Non-coding RNAs
  * [transfer RNA](https://en.wikipedia.org/wiki/Transfer_RNA) (tRNA) links a codon to an amino acid
  * [ribosomal RNA](https://en.wikipedia.org/wiki/Ribosomal_RNA) (rRNA) is a major component of ribosomes 
  * [microRNA](https://en.wikipedia.org/wiki/MicroRNA) (miRNA), 21-23 nt, mRNA silencing, endogenous
  * [small interfering RNA](https://en.wikipedia.org/wiki/Small_interfering_RNA) (siRNA), 20-24 nt, mRNA silencing, exogenous
  * [long non-coding RNA](https://en.wikipedia.org/wiki/Long_non-coding_RNA) (lncRNA) >200nt of unknown function
  * [circular RNA](https://en.wikipedia.org/wiki/Circular_RNA) (circRNA), often unknown function

---

# Microarrays

<table>
<tr>
<td>
<ul>
<li>Quantifies RNAs by hybridization to DNA probes on a slide.</li>
  <ul><li>Relative levels are measured by probe fluorescence.</li></ul>
<li>Low signal to noise ratio due to cross-hybridization, narrow dynamic range.</li>
<li>Cannot detect new transcripts until chip is updated, commercialized technology.</li>
<li>Easy to capture data, difficult to interpret data.</li>
</ul>
</td>
<td width="30%" style="vertical-align: middle;">
<img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Cdnaarray.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail_unscaled" style="transform: rotate(90deg) scale(1.5);"/>
</td>
</tr>
</table>
<small>
Image source: https://commons.wikimedia.org/wiki/File:Cdnaarray.jpg (CC BY SA-3.0 Unported)
</small>

---

# RNA-sequencing

* Made possible with next-generation sequencing technologies
  * High-throughput, millions of reads per sample.
* Direct sequencing of RNA transcripts from sample extraction.
  * Can capture both known and new transcripts.
  * High signal-to-noise ratio (no cross-hybridization, large dynamic range)
* Computationally challenging to process and interpret data.

---

### RNA-seq
# Applications

* Differential gene expression (DGE) analysis
  * Quantify and compare the relative levels of RNA transcripts between groups (*e.g.* case-control)
* Transcriptome assembly
  * Build or improve model of transcribed regions of a genome
  * Supports DGE analysis
* Metatranscriptomics
  * Analyze transcriptomes for a community of different species, *e.g.*, gut bacteria
  * Gain insights on function and activity, not just presence-absence

---

### RNA-seq
# Design considerations

<table>
<tr>
<td width="60%">
<ul>
<li><b>Library type:</b> Paired-end reads are preferred for dealing with alternate splicing.</li>
<li><b>Read length:</b> longer reads better for alternate splicing, but higher error rates</li>
<li><b>Sequencing depth versus number of replicates:</b> More reads for a given sample means more depth, detect rare transcripts; but running more samples means replication.  Fixed number of base calls per run.</li>
</ul>
</td>
<td><img src="https://upload.wikimedia.org/wikipedia/commons/0/01/RNA-Seq-alignment.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail_unscaled"/></td>
</tr>
</table>

<small>
Image credit: https://commons.wikimedia.org/wiki/File:RNA-Seq-alignment.png
</small>

---

### RNA-seq
# Sequencing coverage

* The **depth** of coverage is the average number of times that a nucleotide has been sequenced.

$$
\text{Coverage} = \frac{\text{Number of reads} \times \text{Read length}}{\text{Genome length}}
$$

* The **breadth** of coverage is the proportion of nucleotides in a region (genome) that were sequenced at a minimum depth.
* These quantities are sometimes referred to as "depth" and "coverage", leading to confusion.

<small>
Reference: Sims <i>et al.</i> (2014) <a href="https://www.nature.com/articles/nrg3642">Nat Rev Genet 15: 121-132</a>.
</small>

---

# RNA isoforms

* Different RNA transcripts ([isoforms](https://en.wikipedia.org/wiki/Isoform)) can be produced from the same stretch of genomic DNA, due to:
  * Alternative start and stop codons
  * [Alternative splicing](https://en.wikipedia.org/wiki/Alternative_splicing), different combinations of introns and exons
  * Alternative polyadenylation, leading to different 3' untranslated regions that affect RNA stability and transport

<img src="https://upload.wikimedia.org/wikipedia/commons/0/0a/DNA_alternative_splicing.gif?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original" height="220px"/>
<small>
Image credit: <a href="https://commons.wikimedia.org/wiki/File:DNA_alternative_splicing.gif">National Human Genome Research Institute</a>, public domain
</small>

---

# RNA-Seq workflows

* RNA-seq analyses share some steps in common with other NGS workflows:
  * *Obtain raw data (transfer, storage, format)*
  * *Quality control*
  * Align / assemble reads
  * Normalization of alignment
  * Differential expression analysis
  * Downstream processing: *e.g.*, pathway enrichment analysis, visualization

---

# Alignment 

* Reads can be mapped to the genome or (if available) the annotated transcriptome.
* For genome mapping, we need a "gapped" mapper that can partition a read to different parts of the genome.
  * *e.g.*, TopHat2 (2013) first attempts to map reads within single exons; remaining reads are split for mapping to multiple exons.
  * Succeeded by HISAT2 (2016); [STAR](https://pmc.ncbi.nlm.nih.gov/articles/PMC3530905/) (2012) is a similar program claimed to be 50x faster than TopHat.
* Transcriptome mapping can use a standard mapper (*e.g.*, bowtie2)

---

# Alignment

* A mapper generally requires the following inputs:
  * FASTQ: single- or paired-end NGS read data
  * FASTA: reference genome to map reads to
  * GTF: (Gene Transfer Format) tab-separated file with known gene, transcript and exon annotations of genome; to identify splice sites.
* Typical outputs:
  * SAM: tab-separated file of mapped read information
  * FASTQ file of unmapped reads

---

# Multi-mapped reads

* A substantial proportion of reads map equally well to multiple locations in the reference.
  * These are called "multi-mapped reads"
  * Typically 5% to 40% of reads, depending on species and mapping software.
* A read may map to multiple locations in a **reference genome** due to duplications or repetitive DNA.
* A **reference transcriptome** includes all isoforms of an RNA precursor.
  * Expect higher rate of multi-mapping because isoforms can incorporate the same exons.

---

### Multi-mapped reads
# Basic methods

1. **Discard multi-mapping reads**: Default method for many popular tools.
  * Underestimates genes with isoforms; would lose all reads mapped to essential exons.
2. **Count all mappings**: A read is counted multiple times for every valid alignment.
  * Over-estimates expression of genes with isoforms.
3. **Equal splitting**: Fractional counts or random assignments of reads.
  * Averages out variation in expression.

<small>
Source: Deschamps-Francoeur <i>et al.</i> (2020) Comput Struct Biotech J 18: 1569-1576.
</small>

---

# Example
55 reads map to exon 1, which appears in both isoform A and B
![](/img/multimapping.svg)

---

# Reference-based assembly

* Identify novel transcripts by examining the alignment of reads to the reference genome.
  * *e.g.*, Cufflinks (complements TopHat), succeeded by StringTie (HiSat)

---

# Reference-free assembly

* If there is no suitable reference genome or transcriptome, then we must generate transcripts by *de novo* assembly of reads.
  * *e.g.*, Trinity assembles RNA-seq data while accounting for alternative transcripts.
* Outputs assembled transcripts with estimated abundances.

---

# Counting mapped reads

* Mapped reads can be counted at the level of:
  * Gene
  * Transcript
  * Exon


---

# Normalizations

* Read counts can be at the level of a gene or exon
* 


