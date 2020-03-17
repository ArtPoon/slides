# MIMM4750G
## Metagenomics

![](https://imgs.xkcd.com/comics/recipes.png)

---

# What is metagenomics?

* Analyzing the genetic composition of a sample that comprises more than one species.
* (The molecular equivalent of throwing the contents of a zoo into a blender.)
* Can be applied to both viruses and bacteria.
* Full-length genomes can potentially be reconstructed because we are not targeting a specific gene.

---

# Untargeted sequencing

* [Shotgun sequencing](https://en.wikipedia.org/wiki/Shotgun_sequencing) - random shearing of nucleic acids that are incorporated into a sequencing library.
* [Random priming](https://genome.cshlp.org/content/2/3/185.short) - suppliers will generate short oligos (*e.g.*, hexamers) of random nucleotides.
* Both priming and PCR amplification can lead to biases.

---

# *de novo* assembly and metagenomics

* Heterogeneous samples cause problems for *de novo* assemblers (uneven coverage).
* Within-species variation is confounded with among-species variation (not a single cluster).
* Use of longer-read sequencing platforms (*e.g.*, [PacBio](https://en.wikipedia.org/wiki/Single-molecule_real-time_sequencing), [Oxford Nanapore](https://en.wikipedia.org/wiki/Oxford_Nanopore_Technologies)) may overcome some challenges of *de novo* assembly.
* Some [new methods](https://bmcgenomics.biomedcentral.com/articles/10.1186/s12864-017-3927-8) combine platforms to complement longer read lengths (*e.g.*, PacBio) with lower error rates (*e.g.*, Illumina).

---

# Binning

* Collect contigs from *de novo* assembly that are estimated to originate from the same organism.
* Some methods calculate k-mer (*e.g.*, tetranucleotide) frequencies (nucleotide composition).
* Other methods look for contigs with correlated distributions among multiple samples.
* Either way, binning is a [clustering problem]().

---

# Taxonomic assignment

* More challenging than metabarcoding because not all candidates are equally represented (full-length genomes versus partial genomes).

---

# MEGAN

* Interprets BLAST results

---

# Kraken

* k-mer database

---

# Reference databases

* Genbank
* RefSeq

---

# Draft genomes

* Misannotation
* Sequencing adapters
* Vectors

---

# Contamination with human DNA



---

# *Neisseria gonorrhoeae* genome contamination

*

---

# Further readings

* [A review of methods and databases for metagenomic classification and assembly](https://academic.oup.com/bib/article/20/4/1125/4210288)
* [Abundant Human DNA Contamination Identified in Non-Primate Genome Databases](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0016410)
* [Direct Metagenomic Detection of Viral Pathogens in Nasal and Fecal Specimens Using an Unbiased High-Throughput Sequencing Approach](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2625441/)
