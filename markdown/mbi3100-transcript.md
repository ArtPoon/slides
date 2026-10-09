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
<li><b>Read length:</b> longer reads better for alternate splicing, but have higher error rates</li>
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
# Sequencing platforms

* Short-read cDNA (*e.g.*, Illumina)
  * reverse-transcription of RNA from sample extraction into complementary DNA (cDNA)
  * most common; high-throughput (&asymp;100M reads/sample); read lengths 50-500 nt, high accuracy (&asymp;0.1%/nt).
* Long-read cDNA (*e.g.*, PacBio, Nanopore)
  * reads lengths up to 25K nt, low accuracy (&asymp;10%/nt), more expensive, lower throughput (&asymp;10M reads/sample).
* [Direct RNA-seq](https://www.nature.com/articles/s41592-022-01633-w#Sec4) (Nanopore) - no reverse-transcription
  * sequence poly-A tails, detect [RNA modifications](https://en.wikipedia.org/wiki/RNA_editing), *e.g.*, [m6A](https://en.wikipedia.org/wiki/N6-Methyladenosine), [pseudouridine](https://en.wikipedia.org/wiki/Pseudouridine).

---

<img src="/img/rnaseq-platforms.png" height="500px"/>

<small>
Image credit: Stark <i>et al.</i> (2019) <a href="https://www.nature.com/articles/s41576-019-0150-2">Nature Rev Genet 20: 631-656</a>.
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

### Workflow
# Alignment 

* Reads can be mapped to the genome or (if available) the annotated transcriptome.
* For genome mapping, we need a "gapped" mapper that can partition a read to different parts of the genome.
  * *e.g.*, TopHat2 (2013) first attempts to map reads within single exons; remaining reads are split for mapping to multiple exons.
  * Succeeded by HISAT2 (2016); [STAR](https://pmc.ncbi.nlm.nih.gov/articles/PMC3530905/) (2012) is a similar program claimed to be 50x faster than TopHat.
* Transcriptome mapping can use a standard mapper (*e.g.*, bowtie2)

---

### Workflow
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

### Multi-mapped reads
# Example
55 reads map to exon 1, which appears in both isoform A and B
![](/img/multimapping.svg)

---

<table>
<tr>
  <td style="font-size: 1.3em;">
    <h3>Workflow: Assembly</h3>
    <h1>Reference-based assembly</h1>
    <ul>
      <li>Identify novel transcripts by examining the alignment of reads to the reference genome.</li>
      <li><a href="https://cole-trapnell-lab.github.io/cufflinks/">Cufflinks</a> (complements TopHat) builds a graph of reads that overlap in the genome in a compatible way.</li>
      <li>Each path through the graph merges compatible reads into a potential isoform.</li>
      <li>Succeeded by <a href="https://ccb.jhu.edu/software/stringtie/">StringTie</a> (HiSat)</li>
    </ul>
  </td>
  <td width="30%">
  <img src="/img/cufflinks.png">
  </td>
</tr>
</table>

---

### Workflow: Assembly
# Reference-free assembly

* If there is no suitable reference genome, we must generate transcripts by *de novo* assembly of reads.
  * *e.g.*, [Trinity](https://github.com/trinityrnaseq/trinityrnaseq/wiki) breaks each read into overlapping $k$-mers, selects the most abundant $k$-mer as a seed, and removes $k$-mers with frequency <5% of seed.
  * Extends the seed in both directions into a linear contig using the most abundant reads with $k-1$ overlaps.
  * Removes all used reads from table and restarts with new seed.
  * Builds a de Bruijn graph from the resulting linear contigs.

---

# Alignment-free methods

* Mapping reads is still computationally expensive - it is faster to find matching k-mers between reads and known transcripts.
  * *e.g.*, [Sailfish](https://www.cs.cmu.edu/~ckingsf/software/sailfish/) builds a hash index of $k$-mers in the known transcriptome.
  * Counts the number of times each $k$-mer appears in the set of reads.
  * Probabilistically estimates the frequency of each transcript based on these counts.

---

<img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4c/Kettle_Point_%2850027799828%29.jpg/1280px-Kettle_Point_%2850027799828%29.jpg" height="550px"/>

<small>
Image credit: A little bit of the shoreline at Kettle Point, Ontario on Lake Huron (<a href="https://commons.wikimedia.org/wiki/File:Kettle_Point_(50027799828).jpg">CC BY SA 2.0</a>).
</small>

---

# Quantifying expression

* How we count reads that overlap all transcripts of a gene can have the greatest impact on our results.
* Many reads cannot be unambiguously assigned to a specific isoform.
  * *i.e.*, reads that do not span a splice junction (between exons)
* Differences in the expression of different isoforms of a gene can be biologically significant.
  * *e.g.*, two isoforms of the gene ANK2 are differentially regulated in association with autism spectrum disorder ([Gandal *et al.* 2018](https://www.science.org/doi/full/10.1126/science.aat8127))

---

### Quantifying expression
# Software

* Some assembly programs feature their own counting tools, *e.g.*, StringTie.
* Programs like [htseq-count](https://htseq.readthedocs.io/en/release_0.11.1/count.html) or [featureCounts](https://subread.sourceforge.net/featureCounts.html) aggregate mapped counts from SAM/BAM output to features in a GFF/GTF file.
  * featureCounts discards multi-mapped reads
  * htseq-count behaviour is controlled by the `--nonunique` option.  `none` discards multi-mapped reads; `all` counts all alignments.

---

### Quantifying expression
# Expression matrix

* Read counts or abundance estimates are usually aggregated into a matrix.
  * Each row corresponds to a feature (gene or transcript)
  * Each column represents a sample.

| GeneID | MCL1-DL | MCL1-DK | MCL1-DJ | MCL1-DI | 
|--------|---------|---------|---------|---------|
| 100009600 | 20 | 34 | 31 | 23 |
| 100012 | 0 | 0 | 0 | 0 |
| 100017 | 555 | 633 | 1000 | 1097 |
| 100019 | 1092 | 1403 | 1926 | 2268 |

<small>
Source: <a href="https://www.nature.com/articles/ncb3117">Mouse mammary gland dataset</a>. Doyle, Phipson and Dashnow. <a href="https://training.galaxyproject.org/training-material/topics/transcriptomics/tutorials/rna-seq-reads-to-counts/tutorial.html#counting">Galaxy Training! RNA-Seq reads to counts</a>
</small>

---

# Normalization

* Differences in transcript length result in different read counts even if expression levels are the same.
* Differences in the total number of reads per sample (library depth) can result in differences in read counts between samples.

| GeneID | Symbol | Description | MCL1-DL | longest transcript |
|----|----|----|---|---|
| 100017 | Mdn1 | Nuclear chaperone required for maturation and nuclear export of pre-60S ribosome subunits | 555 | 6,562 nt |
| 100019 | Ldlrap1 | low-density lipoprotein receptor adaptor protein 1 | 1092 | 18,222 nt |

* Which gene had a higher expression level in subject MCL1-DL?

---

### Normalization
# Within-sample normalizations

* An intuitive answer is divide the read count by transcript length
  * Let $q_i$ be the number of reads mapped to the $i$-th transcript.
  * Let $l_i$ be the length of the $i$-th transcript.
* [Transcripts Per Million](https://link.springer.com/article/10.1186/1471-2105-12-323) accounts for differences in transcript lengths and library size:
$$
\text{TPM}_i = \frac{q_i/l_i}{\sum_j q_j/l_j} \times 10^6
$$

---

# Differential expression analysis (DEA)

* The objective of DEA is to identify associations between gene expression and some treatment or environmental factor.
  * *e.g.*, cell type, cancer, infection status
* This is accomplished by comparing (normalized) counts from two sets of samples.
* The [null hypothesis](https://en.wikipedia.org/wiki/Statistical_hypothesis_test#Definition_of_terms) is that both sets of counts are drawn from the same underlying frequency distribution.

---

### Differential expression
# The Poisson distribution

* The observed read count $Y_{ij}$ for gene $i$ in sample $j$ can be modeled by a Poisson distribution:
<table>
<tr>
<td>
$$
P(Y_{ij}|\lambda_{i}) = \frac{\lambda_{i}^{Y_{ij}}\exp(-\lambda_i)}{Y_{ij}!}
$$
</td>
<td><img src="https://upload.wikimedia.org/wikipedia/commons/1/16/Poisson_pmf.svg" height="200px"></td>
</tr>
</table>
where $\lambda_{i}$ is the expected (average) count.

* The number of raindrops that fall on a sidewalk panel in one minute is Poisson distributed.

---

# Negative binomial

* The variance of the Poisson distribution equals the mean, $\lambda_{ij}$.
  * This is a bad assumption - empirically, the variance of read counts exceeds the mean (the counts are [overdispersed](https://en.wikipedia.org/wiki/Overdispersion)).
* This is addressed by the negative binomial distribution
$$
P(Y_{ij}|\lambda_{i},r) = \frac{\lambda_{i}^{Y_{ij}}}{Y_{ij}!}
$$

---

# Gene set


---

# Databases for transcriptomics

* NCBI [Gene Expression Omnibus](https://www.ncbi.nlm.nih.gov/geo/) (GEO)
  * Database for storing gene expresion data from microarray and sequencing platforms
  * Holds more than 8.7 million samples (accessed October 8, 2026)
* NCBI Sequence Read Archive (SRA)
  * Repository for raw and processed NGS datasets, including RNA-seq
  * Currently holds about 6.2 million RNA-seq data sets, mostly Illumina (5.9M)

---

# SOFT format

* NCBI GEO uses the [Simple Omnibus Format](https://www.ncbi.nlm.nih.gov/geo/info/soft.html) (SOFT) file format
* `^` prefix = entity type and identifier &mdash; *e.g.*, `^SAMPLE=GSM1684096`
* `!` prefix = entity attribute &mdash; *e.g.*, `!Sample_molecule_ch1 = total RNA`
* `#` prefix = data table header description &mdash; *e.g.*, `VALUE = Quantile normalized`
* data table row, tab-separated values, enclosed by `!sample_table_begin` and `!sample_table_end`

---

Example of a SOFT file

```
^SAMPLE = GSM1684096
!Sample_title = Donor 1 - Influenza treated - 8h
!Sample_geo_accession = GSM1684096
!Sample_status = Public on Feb 01 2016
!Sample_submission_date = May 13 2015
!Sample_last_update_date = Feb 01 2016
!Sample_type = RNA
!Sample_channel_count = 1
!Sample_source_name_ch1 = Blood pDCs
!Sample_organism_ch1 = Homo sapiens
!Sample_taxid_ch1 = 9606
!Sample_characteristics_ch1 = donor: Donor 1
!Sample_characteristics_ch1 = agent: Influenza A
!Sample_characteristics_ch1 = cell type: Primary human pDCs
!Sample_treatment_protocol_ch1 = pDCs were cultured with or without influenza A virus for 8 h.
!Sample_growth_protocol_ch1 = Primary human pDCs were cultured in complete RPMI media (10% FBS, 1% penicillin-streptomycin, 1% sodium pyruvate, 1% HEPES buffer solution, 1% non-essential amino acids, 1% glutamate) and IL-3.
!Sample_molecule_ch1 = total RNA
!Sample_extract_protocol_ch1 = RNA was extracted using Arcturus® PicoPure® RNA isolation kit in accordance with the prescribed protocol provided with the kit. Quality control was performed with Agilent Bioanalyser.
!Sample_label_ch1 = biotin
!Sample_label_protocol_ch1 = Biotinylated cRNA were prepared with the Ambion MessageAmp kit for Illumina arrays
!Sample_hyb_protocol = Standard Illumina hybridization protocol
!Sample_scan_protocol = Standard Illumina scanning protocol
!Sample_description = Donor 1 - Influenza treated - 8h
!Sample_data_processing = The data were normalized using quantile normalization with Illumina Genome Studio
!Sample_platform_id = GPL10558
!Sample_contact_name = Michelle,Ann,Gill
!Sample_contact_department = Pediatrics
!Sample_contact_institute = University of Texas Southwestern Medical Center
!Sample_contact_address = 5323 Harry Hines Blvd
!Sample_contact_city = Dallas
!Sample_contact_zip/postal_code = 75390
!Sample_contact_country = USA
!Sample_supplementary_file = NONE
!Sample_series_id = GSE68849
!Sample_data_row_count = 47321
#ID_REF = 
#VALUE = Quantile normalized
#5455178010_B.Avg_NBEADS = 
#5455178010_B.BEAD_STDERR = 
#5455178010_B.Detection Pval = 
!sample_table_begin
ID_REF  VALUE   5455178010_B.Avg_NBEADS 5455178010_B.BEAD_STDERR        5455178010_B.Detection Pval
ILMN_1762337    154.114 19      9.092192        0.005194805
ILMN_2055271    155.9602        18      11.53286        0.005194805
ILMN_1736007    100.841 27      5.227269        0.5051948
ILMN_2383229    91.30001        21      4.664619        0.787013
ILMN_1806310    94.69127        17      3.953494        0.687013
ILMN_1779670    92.01579        27      3.527202        0.7675325
ILMN_1653355    113.9059        19      6.516469        0.1922078
ILMN_1717783    85.31596        22      4.430592        0.9116883
ILMN_1705025    99.48608        21      2.776697        0.5415584
```

---

# MINiML format

* MIAME Notation in Markup Language (pronounced "minimal") is an XML format.
  * MIAME = [Minimum Information About a Microarray Experiment](https://en.wikipedia.org/wiki/Minimum_information_about_a_microarray_experiment)
  * XML = eXtended Markup Language, format for hierarchical (nested) data structures
* MINiML essentially contains the same information as a SOFT file

---

Example of MINiML file:

```
<?xml version="1.0" encoding="UTF-8" standalone="no"?>

<MINiML
   xmlns="http://www.ncbi.nlm.nih.gov/geo/info/MINiML"
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation="http://www.ncbi.nlm.nih.gov/geo/info/MINiML http://www.ncbi.nlm.nih.gov/geo/info/MINiML.xsd"
   version="0.5.0" >

  <Contributor iid="contrib1">
    <Person><First>Michelle</First><Middle>Ann</Middle><Last>Gill</Last></Person>
    <Department>Pediatrics</Department>
    <Organization>University of Texas Southwestern Medical Center</Organization>
    <Address>
      <Line>5323 Harry Hines Blvd</Line>
      <City>Dallas</City>
      <Zip-Code>75390</Zip-Code>
      <Country>USA</Country>
    </Address>
  </Contributor>

  <Database iid="GEO">
    <Name>Gene Expression Omnibus (GEO)</Name>
    <Public-ID>GEO</Public-ID>
    <Organization>NCBI NLM NIH</Organization>
    <Web-Link>http://www.ncbi.nlm.nih.gov/geo</Web-Link>
    <Email>geo@ncbi.nlm.nih.gov</Email>
  </Database>

  <Platform iid="GPL10558">
    <Accession database="GEO">GPL10558</Accession>
  </Platform>

  <Sample iid="GSM1684096">
    <Status database="GEO">
      <Submission-Date>2015-05-13</Submission-Date>
      <Release-Date>2016-02-01</Release-Date>
      <Last-Update-Date>2016-02-01</Last-Update-Date>
    </Status>
    <Title>Donor 1 - Influenza treated - 8h</Title>
    <Accession database="GEO">GSM1684096</Accession>
    <Type>RNA</Type>
    <Channel-Count>1</Channel-Count>
    <Channel position="1">
      <Source>Blood pDCs</Source>
      <Organism taxid="9606">Homo sapiens</Organism>
      <Characteristics tag="donor">
Donor 1
      </Characteristics>
      <Characteristics tag="agent">
Influenza A
      </Characteristics>
      <Characteristics tag="cell type">
Primary human pDCs
      </Characteristics>
      <Treatment-Protocol>
pDCs were cultured with or without influenza A virus for 8 h.
      </Treatment-Protocol>
      <Growth-Protocol>
Primary human pDCs were cultured in complete RPMI media (10% FBS, 1% penicillin-streptomycin, 1% sodium pyruvate, 1% HEPES buffer solution, 1% non-essential amino acids, 1% glutamate) and IL-3.
      </Growth-Protocol>
      <Molecule>total RNA</Molecule>
      <Extract-Protocol>
RNA was extracted using Arcturus® PicoPure® RNA isolation kit in accordance with the prescribed protocol provided with the kit. Quality control was performed with Agilent Bioanalyser.
      </Extract-Protocol>
      <Label>biotin</Label>
      <Label-Protocol>
Biotinylated cRNA were prepared with the Ambion MessageAmp kit for Illumina arrays
      </Label-Protocol>
    </Channel>
    <Hybridization-Protocol>
Standard Illumina hybridization protocol
    </Hybridization-Protocol>
    <Scan-Protocol>
Standard Illumina scanning protocol
    </Scan-Protocol>
    <Description>
Donor 1 - Influenza treated - 8h
    </Description>
    <Data-Processing>
The data were normalized using quantile normalization with Illumina Genome Studio
    </Data-Processing>
    <Platform-Ref ref="GPL10558" />
    <Contact-Ref ref="contrib1" />
    <Supplementary-Data type="unknown">
NONE
    </Supplementary-Data>
    <Data-Table>
      <Column position="1">
        <Name>ID_REF</Name>
      </Column>
      <Column position="2">
        <Name>VALUE</Name>
        <Description>Quantile normalized</Description>
      </Column>
      <Column position="3">
        <Name>5455178010_B.Avg_NBEADS</Name>
      </Column>
      <Column position="4">
        <Name>5455178010_B.BEAD_STDERR</Name>
      </Column>
      <Column position="5">
        <Name>5455178010_B.Detection Pval</Name>
      </Column>
    <Internal-Data rows="47321">
ILMN_1762337    154.114 19      9.092192        0.005194805
ILMN_2055271    155.9602        18      11.53286        0.005194805
ILMN_1736007    100.841 27      5.227269        0.5051948
ILMN_2383229    91.30001        21      4.664619        0.787013
ILMN_1806310    94.69127        17      3.953494        0.687013
ILMN_1779670    92.01579        27      3.527202        0.7675325
ILMN_1653355    113.9059        19      6.516469        0.1922078
```
