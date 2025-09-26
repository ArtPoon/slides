# MIMM4750G
## Genome-wide association studies
![](https://imgs.xkcd.com/comics/dna.png)

---

# Review

* Whole-genome sequencing (WGS) is the generation of a full-length sequence of an organism's genome.
* Genome annotation is the addition of labels to a genome sequence identifying biologically significant features such as genes.
  * In the era of next-generation sequencing, annotation is much more time consuming than WGS.

---

# The genetic basis of disease

* Many diseases in humans are influenced by both genetic and environmental factors.
  * *e.g.*, [myocardial infarction](https://www.ncbi.nlm.nih.gov/books/NBK537076) has both susceptibility loci and well-known behavioural risk factors such as lack of physical activity and smoking.
* Some diseases are primarily driven by a single locus in the genome, such as [cystic fibrosis](https://pubmed.ncbi.nlm.nih.gov/3326737/).
  * However, the majority of diseases are complex genetic traits, influenced by multiple (even hundreds) loci.

---

# Genetic association studies

* A genetic association study attempts to find a statistical association between a genetic variant and susceptibility to a disease.
* Studies usually followed a [case-control](https://en.wikipedia.org/wiki/Case%E2%80%93control_study) design, in which the sample population was partitioned into groups with or without the disease under investigation.
  * This required that the disease could be interpreted as a binary trait.
  * A quantitative trait such as blood pressure would require a [cross-sectional](https://en.wikipedia.org/wiki/Cross-sectional_study) study design.


---

# Challenges in finding genetic associations

* Individual variants often confer very little risk.
  * There are very few examples of common variants that have a large effect.
* Genetic variants are often associated with many other traits (pleiotropy)
* Causal variants can be physically linked with non-causal variants.
* Associations may be confounded by common ancestry, environment.

<div style="text-align: center; padding: 30px 100px 0 100px;" width="30%">
Finding variants that are a direct biological cause of some disease is very difficult!
</div>

---

# Genetic variants

* In the pre-human genome era (before 2001), studies were generally limited to variants that could be readily measured by PCR:
  * microsatellites
  * [variable number tandem repeats](https://en.wikipedia.org/wiki/Variable_number_tandem_repeat)
  * insertion/deletion polymorphisms
  * single-nucleotide polymorphisms (SNPs)
* One would need to know beforehand *where* the variant was located.

---

### Genetic variants
# Common and rare variants

* Declaring a variant as common or rare is population-specific and cannot be generalized across populations.
* A variant is "common" if it has a minor allele frequency above 5%.
* With increasing study population sizes, researchers have started to use a *minimum minor allele count*
  * *e.g.*, at least 100 individuals who carry at least one copy of the minor allele

---

# HapMap

* The [International<sup>&dagger;</sup> HapMap Project](https://www.genome.gov/10001688/international-hapmap-project) was launched in October 2002 with the mission of creating a public database of common variants in the human genome.
  * Made possible by the completion of the first draft human genome in 2001.
  * A [haplotype](https://en.wikipedia.org/wiki/Haplotype) is a run of alleles that tend to be inherited together due to linkage.
* Over one million SNPs were identified from 269 DNA samples when the database was published in 2005.
  * They discovered most variation in human genomes could be reduced to about 250,000 to 500,000 marker SNPs.

<small>
&dagger; A partnership between Japan, the UK, Nigeria, Canada, China and the USA.
</small>

---

<table style="font-size: 18pt;">
  <tr>
    <td>
      <h1>SNP arrays</h1>
      <ul>
        <li>Using the common variants identified by HapMap, it became feasible to develop a DNA microarray to simultaneously screen for the presence of over $10^5$ (eventually over $10^6$) SNPs.</li>
        <li>A DNA microarray contains many microscopic probes, each speciic to a short DNA sequence.</li>
        <li>Hybridization to sample DNA is detected by fluorescence.</li>
      </ul>
    </td>
    <td style="vertical-align: middle;" width="40%">
      <img src="https://upload.wikimedia.org/wikipedia/commons/2/22/Affymetrix-microarray.jpg"/>
      <small>
      Two Affymetrix GeneChips (<a href="https://commons.wikimedia.org/wiki/File:Affymetrix-microarray.jpg">CC BY 2.5</a>).  A Human Genome U133 Plus 2.0 array cost 450 USD in 2011; the scanner cost about 200,000 USD.
      </small>
    </td>
  </tr>
</table>

---

# The genomics gold rush

* The commercialization of SNP arrays made it possible for many labs (who could afford the new technology) to perform genome-wide association studies.
  * A commentary published in JAMA in July 2007 noted over 14 articles had already been published that year ([Topol *et al.* 2007](https://jamanetwork.com/journals/jama/article-abstract/207844)).
* There are presently over 7,300 GWAS studies in the [GWAS Catalog](https://www.ebi.ac.uk/gwas/), studying over 3,300 traits in more than one million people.

---

# What is GWAS?

* Genome-wide association studies (GWAS) attempt to identify associations between genotypes and phenotypes.
  * More specifically, GWAS tests for a statistical association between a genetic polymorphism and a phenotype, such as a disease.
* GWAS usually focuses on SNPs, but any kind of genetic variant can have an association.
  * *e.g.*, copy-number variants (CNVs).
  * Any feature that can be annotated at the nucleotide level.


---

# GWAS is not whole-genome

* GWAS generally involves the targeted genotyping of specific, pre-selected variants using microarrays.
* Whole-exome (WES) and whole-genome sequencing (WGS) studies aim to capture all genetic variation.
  * Strictly speaking, both WES and WGS studies are *also* GWAS
  * "GWAS" usually refers to studies of common variants assayed by microarrays, and sometimes considered separately from WGS and WES.
* Currently, GWAS studies are still more common.

---

### Obtaining data
# Selecting the study population

* GWAS generally requires very large sample sizes to identify reproducible, genome-wide significant associations.
* The required sample size can be estimated using power calculations with software such as:
  * [Genetic Association Study (GAS) Power Calculator](https://csg.sph.umich.edu/abecasis/gas_power_calculator/)
  * [Genetic Power Calculator](https://zzz.bwh.harvard.edu/gpc/).
* Assembling a sufficiently large data set to run a well-powered GWAS requires major investments of time and money.

---

### Obtaining data
# Existing cohorts
* The majority of GWAS are conducted using pre-existing large cohorts with genomic and phenotypic data.
* The NCBI database of Genotypes and Phenotypes (dbGaP) archives public and controlled-access data from human studies.
* *e.g.*, the [GIANT consortium](https://giant-consortium.web.broadinstitute.org/index.php/GIANT_consortium) (Genetic Investigation of ANthropometric Traits) is the largest GWAS ([5.4 million people as of 2022](https://www.broadinstitute.org/news/largest-genome-wide-association-study-ever-uncovers-nearly-all-genetic-variants-linked-height)) 
  * Recently published results on variants associated with human height.

---

# Inputting the data

* An input file for a GWAS analysis generally include the following fields:
  - anonymized individual IDs
  - coded family relations between individuals, *e.g.*, family ID
  - biological sex
  - phenotype information, *e.g.*, case/control
  - covariates, *e.g.*, environment, other biological characteristics
  - genotype calls for all called variants, *e.g.*, SNPs
  - information on the genotyping batch

---

### Inputting data
# PED file

* A `.ped` file is a plain text format for storing sample pedigree information and genotype calls.
  * One line per sample, fields are whitespace (space/tab) delimited.

| Position | Field | Value (example) |
|---|----|----|
| 1 | Family ID | `CH18526` |
| 2 | Individual ID | `NA18526` |
| 3 | Parental ID | `0` (unknown) |
| 4 | Maternal ID | `0` |
| 5 | Sex | `1` (male), `2` (female) |
| 6 | Phenotype | `1` (unaffected, control); `2` (affected, case); `0` (missing) |

* The remaining fields store two values for every variant, *e.g.*, `A A`

---

### Inputting data
# MAP file

* Each line of the MAP file describes one variant, and must contain exactly four columns:
  1. chromosome (for humans: `1`-`22`, `X`, `Y` or `0` if unplaced)
  2. reference SNP number in the NCBI dbSNP database, *e.g.*, `rs555896`
  3. genetic distance (in [morgans](https://en.wikipedia.org/wiki/Centimorgan), a measure of genetic linkage)
  4. base-pair position in reference sequence

---

### Inputting data
# Example - HapMap3

SNP genotype data from 1,115 samples collected by the Wellcome Trust Sanger Institute and the Broad Institute:

<table>
<tr>
  <td width="500px">
  PED file (704Mb compressed, truncated from lines about 5,961,708 characters long):
  <pre><code class="hljs subunit">
  Y072    NA19152       0       0 2 0 C C  C C  T T  C C  A G
  Y043    NA19139 NA19138 NA19137 1 0 C C  C C  T T  C C  A G
  Y028    NA18912       0       0 2 0 C C  C C  T T  C C  A A 
  Y056    NA19160       0       0 1 0 C C  C C  T T  C C  A A 
  1341    NA07055       0       0 2 0 C C  C C  T T  C C  G G 
  1454    NA12814       0       0 1 0 C C  C C  T T  C C  A A 
  1334    NA10847 NA12146 NA12239 2 0 C C  C C  T T  C C  A G
  NA18532 NA18532       0       0 2 0 C C  C C  T T  C C  A A 
  NA18561 NA18561       0       0 1 0 C C  C C  T T  C C  G G 
  NA18942 NA18942       0       0 2 0 C C  C C  T T  C C  G G 
  </code></pre>
  </td>
  <td width="300px">
  MAP file (11Mb compressed):
  <pre><code class="hljs subunit">
  1 rs10458597 0 554484
  1 rs2185539 0 556738
  1 rs6681105 0 581938
  1 rs11240767 0 718814
  1 rs12564807 0 724325
  1 rs3131972 0 742584
  1 rs3131969 0 744045
  1 rs1048488 0 750775
  1 rs12562034 0 758311
  1 rs4040617 0 769185
  </code></pre>
  </td>
</tr>
</table>

<small>
Source: https://www.broadinstitute.org/medical-and-population-genetics/hapmap-3
</small>

---

# Analyzing the data

* [PLINK](https://www.cog-genomics.org/plink/) is a popular free, open-source (C/C++) command-line program for GWAS analysis and quality control.
* In a typical workflow, PLINK is used to:
  * Convert `.map` and `.ped` files into smaller binary `.bim` and `.bed` files
  * Generate statistics on allele frequencies and missing data
  * Run a basic association analysis on the phenotype for all variants
  * Cluster individuals by genetic similarity
  * Analyze family-based (pedigree) data

---

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Waterfall_in_Upper_Queen%27s_Park%2C_Stratford%2C_Ontario%2C_2025-08-04_04.jpg/2560px-Waterfall_in_Upper_Queen%27s_Park%2C_Stratford%2C_Ontario%2C_2025-08-04_04.jpg" width="80%"/>

<small>
Image source: Waterfall in Upper Queen's Park, Stratford, Ontario, 2025-08-04. <a href="https://commons.wikimedia.org/wiki/File:Waterfall_in_Upper_Queen%27s_Park,_Stratford,_Ontario,_2025-08-04_04.jpg">Chris Woodrich</a> CC BY-SA 4.0.
</small>

---

# Quality control

* Generating reliable results from GWAS requires careful QC steps, such as:
  * Removing rare variants (lack of statistical power)
  * Filtering variants that are missing from too many individuals in the cohort
  * Identifying and removing genotyping errors
  * Ensuring that phenotypes are well matched with genetic data, *e.g.*, is self-reported sex consistent with sex chromosomes?

---

# Imputation
* After quality control, variants usually undergo phasing
  * Phasing: Estimating whether sequenced variants belong to the maternally- or paternally-inherited chromosome
* Missing variants can be imputed (assigned a value that is consistent with other data) using a *haplotype reference panel*
  * [1000 Genomes Project](https://www.internationalgenome.org/) - a public catalogue of common human genetic variation using samples from consenting, healthy donors.
  * [TOPMed Imputation Server](https://imputation.biodatacatalyst.nhlbi.nih.gov/#!) - a free genotype imputation service provided by the NIH.

---

# Adjusting for common ancestry

* If there are study participants from diverse backgrounds, then you may get false positive associations.
  * Suppose there are two major ethnic groups in your data &mdash; one group with a much higher exposure to some unmeasured environmental risk factor.
  * Your data will support associations with polymorphisms that separate the ethnic groups but have nothing to do with the phenotype!
* Standard statistical tests assume that your observations are independent.
  * People who share recent common ancestry tend to be *identical by descent* (IBD).

---

<table>
<tr>
  <td style="font-size: 20pt;">
    <h3>Common ancestry</h3>
    <h1>STRUCTURE</h1>
    <ul>
      <li>A Bayesian method for probabilistically assigning individuals to source populations (ancestries).</li>
      <li>The user must specify the number of clusters ($K$) <i>a priori</i>.</li>
      <li>The coloured barplot produced by STRUCTURE became a "de-facto standard" feature of GWAS analyses.</li>
      <li><a href="https://rajanil.github.io/fastStructure/">fastStructure</a> is a successor to STRUCTURE for larger datasets.</li>
    </ul>
    <small>
    Image source: <a href="https://commons.wikimedia.org/wiki/File:Rosenberg_1048people_993markers.jpg">NA Rosenberg <i>et al.</i> (2005) PLoS Genet 1(6): e70.</a> CC-BY 2.5 Generic.
    </small>
  </td>
  <td width="30%">
    <div style="height: 500px; overflow: hidden;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Rosenberg_1048people_993markers.jpg" style="max-height: unset; height: 800px; margin: 0 0 0 0; padding: 0; border: unset;"/>
    </div>
  </td>
</tr>
</table>

---

### Common ancestry
# Principal component analysis

<table style="font-size: 18pt;">
<tr>
  <td>
    <ul>
      <li><a href="https://en.wikipedia.org/wiki/Principal_component_analysis">PCA</a> maps the data to a lower dimensional space where the components are uncorrelated, while preserving as much of the original information as possible.</li>
      <li>Provides a way of estimating the number of clusters to feed into STRUCTURE.</li>
    </ul>
  </td>
  <td width="60%">
    <img src="/img/europe-pca.svg"/>
    <small>
    Image source: Novembre <i>et al.</i> (2008) Genes mirror geography within Europe. <a href="https://www.nature.com/articles/nature07331">Nature 456: 98-101</a>.
    </small>
  </td>
</tr>
</table>

---

### Association tests
# Single marker regression

* Let $\mathbf{y}$ be a continuous phenotype (*e.g.*, blood pressure) and $\mathbf{x}$ be the presence/absence of a genetic variant.
  * $\mathbf{y}$ and $\mathbf{x}$ are vectors because we have predictions and measurements for every member of the sample population.
* The basic regression model looks like this:
$$\mathbf{y}=g \mathbf{x} + \mathbf{e}$$
  * $g$ is the effect of the variant on the trait 
  * $\mathbf{e}$ is a vector of random deviates from a normal distribution $\mathcal{N}(0, \sigma_e)$

---

### Association tests
# Encoding genotypes

* $x$ is binary if we are working with a haploid organism or virus, where an individual has a single copy of the genome.
  * *i.e.*, presence/absence of the genetic variant
  * In this case, the regression is simply [Student's *t*-test](https://en.wikipedia.org/wiki/Student%27s_t-test).
* $x$ is integer-valued if the organism is diploid (*e.g.*, human genomes), because there may be zero, one or two copies of the variant.
  * If we assume the effects of alleles are additive, *i.e.*, no [dominance](https://en.wikipedia.org/wiki/Dominance_(genetics)), then $x$ can be handled like a continuous predictor.

---

### Association tests
# Adding covariates

* The previous model assumes that every individual in the population is identical with respect to anything that might affect trait $\mathbf{y}$.
* Suppose we measure several characteristics that could also affect $\mathbf{y}$, *e.g.*, age, height, smoking.
* These measurements are collected into a matrix $\mathbf{W}$ with a row for each individual, and a column for each characteristic.
$$\mathbf{y}= \mathbf{W}\mathbf{b} + g \mathbf{x} + \mathbf{e}$$
  where $\mathbf{b}$ is a vector of covariate effects.

---

### Association tests
# Logistic regression

* If the phenotype is binary (*e.g.*, case-control studies), then we need to use logistic regression.
* This uses a [link function](https://stats.oarc.ucla.edu/other/mult-pkg/introduction-to-generalized-linear-mixed-models/) that maps the output of the linear function ($g x + e$) from the range $(-\infty, \infty)$ to $(0,1)$.
  * For a binary outcome, we model the probability of that outcome, which has the range $(0,1)$.
* This is accomplished with the [logistic function](https://en.wikipedia.org/wiki/Logistic_function):
$$\mathbf{y} = \frac{e^{\mathbf{W}\mathbf{b} + g \mathbf{x} + \mathbf{e}}}{1+e^{\mathbf{W}\mathbf{b} + g \mathbf{x} + \mathbf{e}}}$$

---

### Interpreting associations
# Adjusting for multiple comparisons

* The key challenge to analyzing GWAS data is that we are running an enormous number of statistical tests!
  * If our significance level is $\alpha=0.05$ and we run 100 tests, then we can expect 5 of those tests to be significant.


---

# Interpreting associations: Linkage

* A variant may be associated with a trait because it is located near another variant that is actually responsible (causal).
  * Variants that are physically located in close proximity in the genome (chromosome) are in *linkage*.
* The fact that variants are linked to other variants is the fundamental basis of the HapMap project.
  * Remember, a *haplotype* is a set of variants that tend to be inherited together because they are located close to each other in the chromosome.

---

### Interpretating associations
# Measuring linkage

* Linkage disequilibrium (LD) is the departure from expected genotype frequencies when loci are transmitted independently.
* LD can be measured with the statistic $D = P_{ij} - p_{i} q_{j}$
  * $p_i$ ($q_j$) is the frequency of allele $i$ ($j$) at locus 1 (2).
  * $P_{12}$ is the frequency of the genotype carrying these alleles at the respective loci
* The *expected* genotype frequency without linkage is $p_{i} q_{j}$.
  * Linkage causes $D$ to depart away from zero.
  * In practice, $D$ is adjusted to remove the effects of $p$ and $q$.

---

### Interpreting associations
# Pleiotropy

* A variant exhibits *pleiotropy* if it affects more than one trait.
![](/img/shooshtari-pleiotropy.svg)

<small>
Image source: Shooshtari <i>et al.</i> (2017) Integrative Genetic and Epigenetic Analysis Uncovers Regulatory Mechanisms of Autoimmune Disease.  <a href="https://www.cell.com/ajhg/fulltext/S0002-9297(17)30236-7">Am J Hum Genet 101(1): 75-86</a>.
</small>

---

### Interpreting associations

* Cases and controls should be matched by ancestry to avoid confounding.
  * If a particular ancestry is over-represented in the case group, the association will be confounded with other genetic or environmental factors.
  * *e.g.*, 
* Genetic associations may differ across ancestries, *e.g.*, European, African or Asian
* 

---

<section data-background="#333" style="color:white">

<h1 style="color:white">Key points</h1>

* Annotation is a time-consuming process that is necessary to make a genome sequence useful.
* Many kinds of features can be identified at the nucleotide level, including protein-coding genes and non-coding RNAs.
  * The majority of transcribed genes in the annotated human genome are non-coding.
* Many gene finding programs have used hidden Markov models.
  * The presence or absence of a protein-coding gene can be represented by a sequence of latent states.

</section>