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
* GWAS usually focuses on single-nucleotide polymorphisms (SNPs), but any kind of genetic variant can have an association.
  * *e.g.*, copy-number variants (CNVs).

---

<section data-background="#333" style="color:white">

<h1 style="color:white">Key points</h1>

* Annotation is a time-consuming process that is necessary to make a genome sequence useful.
* Many kinds of features can be identified at the nucleotide level, including protein-coding genes and non-coding RNAs.
  * The majority of transcribed genes in the annotated human genome are non-coding.
* Many gene finding programs have used hidden Markov models.
  * The presence or absence of a protein-coding gene can be represented by a sequence of latent states.

</section>