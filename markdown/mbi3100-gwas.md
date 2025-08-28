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

# Genetic variants

* In the pre-human genome era (before 2001), studies were generally limited to variants that could be readily measured by PCR:
  * microsatellites
  * [variable number tandem repeats](https://en.wikipedia.org/wiki/Variable_number_tandem_repeat)
  * insertion/deletion polymorphisms
  * single-nucleotide polymorphisms (SNPs)
* One would need to know beforehand *where* the variant was located.

---

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

# Selecting the study population

* GWAS generally requires very large sample sizes to identify reproducible, genome-wide significant associations.
* The required sample size can be estimated using power calculations with software such as:
  * [Genetic Association Study (GAS) Power Calculator](https://csg.sph.umich.edu/abecasis/gas_power_calculator/)
  * [Genetic Power Calculator](https://zzz.bwh.harvard.edu/gpc/).
* Assembling a sufficiently large data set to run a well-powered GWAS requires major investments of time and money.

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

# PED file

* A `.ped` file is a plain text format for storing sample pedigree information and genotype calls.
* One line per sample, fields are whitespace (space/tab) delimited.
* The first six fields store (1) family ID, (2) individual ID, (3) paternal ID, (4) maternal ID, (5) sex (1=male, 2=female, other), and (6) phenotype (case/control).
* The remaining fields store two values for every variant, *e.g.*:
`CH18526 NA18526 0 0 2 1 A A G G T T C C G G T T`

---

# MAP file

* Each line of the MAP file describes one variant, and must contain exactly four columns:
  1. chromosome (for humans: `1`-`22`, `X`, `Y` or `0` if unplaced)
  2. reference SNP number in the NCBI dbSNP database, *e.g.*, `rs555896`
  3. genetic distance (in [morgans](https://en.wikipedia.org/wiki/Centimorgan), a measure of genetic linkage)
  4. base-pair position in reference sequence

---



---

# Analyzing the data

* [PLINK](https://www.cog-genomics.org/plink/) is a free, open-source program for GWAS analysis




---



---

# Existing cohorts
* The majority of GWAS are conducted using pre-existing large cohorts with genomic and phenotypic data.
* The NCBI database of Genotypes and Phenotypes (dbGaP) archives public and controlled-access data from human studies.
* The Framingham Study 
* GIANT is the largest GWAS (5.4 million people) that recently published results on variants associated with human height.

---



---

# Single marker regression

* Let $\mathbf{y}$ be a continuous phenotype (*e.g.*, blood pressure) and $\mathbf{x}$ be the presence/absence of a genetic variant.
  * $\mathbf{y}$ and $\mathbf{x}$ are vectors because we have predictions and measurements for every member of the sample population.
* The basic regression model looks like this:
$$\mathbf{y}=g \mathbf{x} + \mathbf{e}$$
  * $g$ is the effect of the variant on the trait 
  * $\mathbf{e}$ is a vector of random deviates from a normal distribution $\mathcal{N}(0, \sigma_e)$

---

# Encoding genotypes

* $x$ is binary if we are working with a haploid organism or virus, where an individual has a single copy of the genome.
  * *i.e.*, presence/absence of the genetic variant
  * In this case, the regression is simply [Student's *t*-test](https://en.wikipedia.org/wiki/Student%27s_t-test).
* $x$ is integer-valued if the organism is diploid (*e.g.*, human genomes), because there may be zero, one or two copies of the variant.
  * If we assume the effects of alleles are additive, *i.e.*, no [dominance](https://en.wikipedia.org/wiki/Dominance_(genetics)), then $x$ can be handled like a continuous predictor.

---

# Adding covariates

* The previous model assumes that every individual in the population is identical with respect to anything that might affect trait $\mathbf{y}$.
* Suppose we measure several characteristics that could also affect $\mathbf{y}$, *e.g.*, age, height, smoking.
* These measurements are collected into a matrix $\mathbf{W}$ with a row for each individual, and a column for each characteristic.
$$\mathbf{y}= \mathbf{W}\mathbf{b} + g \mathbf{x} + \mathbf{e}$$
  where $\mathbf{b}$ is a vector of covariate effects.

---

# Logistic regression

* If the phenotype is binary (*e.g.*, case-control studies), then we need to use logistic regression.
* This uses a [link function](https://stats.oarc.ucla.edu/other/mult-pkg/introduction-to-generalized-linear-mixed-models/) that maps the output of the linear function ($g x + e$) from the range $(-\infty, \infty)$ to $(0,1)$.
  * For a binary outcome, we model the probability of that outcome, which has the range $(0,1)$.
* This is accomplished with the [logistic function](https://en.wikipedia.org/wiki/Logistic_function):
$$\mathbf{y} = \frac{e^{\mathbf{W}\mathbf{b} + g \mathbf{x} + \mathbf{e}}}{1+e^{\mathbf{W}\mathbf{b} + g \mathbf{x} + \mathbf{e}}}$$

---

# Interpreting associations: Linkage

* A variant may be associated with a trait because it is located near another variant that is actually responsible.
* Linkage disequilibrium (LD) is the departure from expected genotype frequencies because  

---

# Interpreting associations: Pleiotropy

* A variant exhibits *pleiotropy* if it affects more than one trait.
![](/img/shooshtari-pleiotropy.svg)

<small>
Image source: Shooshtari <i>et al.</i> (2017) Integrative Genetic and Epigenetic Analysis Uncovers Regulatory Mechanisms of Autoimmune Disease.  <a href="https://www.cell.com/ajhg/fulltext/S0002-9297(17)30236-7">Am J Hum Genet 101(1): 75-86</a>.
</small>

---

# Interpreting associations: 

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