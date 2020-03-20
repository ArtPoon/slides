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

# 16S rRNA studies are not metagenomics!

* 16S is targeted sequencing of a specific region of the genome.
* The phrase "16S metagenomic" appears in over 2,000 articles in the peer reviewed literature!


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

k-mer binning of contigs from idiopathic traveller's diarrhea
<img src="/img/diarrhea.png" width="750px"/>
<small>
Image credit: Q Zhu <i>et al.</i> (2018) [Microbiome 6: 201](https://doi.org/10.1186/s40168-018-0579-0).
</small>

---

# Taxonomic assignment

* More challenging than metabarcoding because sequence similarity varies among taxonomic groups, different parts of the genome.
* For pathogen data, need to remove sequences from the host genome.
  * This should also be done in sample processing, or else most of sequencing effort may be wasted!
* Originally the only method available was to BLAST everything, but this took too long and results were difficult to summarize.
* Custom bioinformatic methods have since been developed.

---

# MEGAN

* Post-processing of search results from BLAST or other sequence comparison tools.
* Assigns reads to lowest taxonomic level supported by search results.

<img src="https://genome.cshlp.org/content/17/3/377/F2.large.jpg" width="700px"/>

<small>
Image credit: DH Huson <i>et al.</i> (2007) [Genome Res 17: 377](https://genome.cshlp.org/content/17/3/377.full).
</small>

---

# Kraken

<table>
  <tr>
    <td style="font-size: 26px">
      <ul>
        <li>Database of reference genomes is indexed into k-mers.</li>
        <li>Query exact k-mer matches, and record number of hits at nodes of different taxonomic levels.</li>
        <li>Assign read to tip (leaf) with maximum hits along root-to-leaf (RTL) path.</li>
      </ul>
    </td>
    <td width="60%">
      <img src="https://media.springernature.com/full/springer-static/image/art%3A10.1186%2Fgb-2014-15-3-r46/MediaObjects/13059_2013_Article_3351_Fig1_HTML.jpg" width="600px"/>
      <small>
      Image credit: DE Wood and SL Salzberg (2014) [Genome Biol 15: R46](https://genomebiology.biomedcentral.com/articles/10.1186/gb-2014-15-3-r46).
      </small>
    </td>
  </tr>
</table>

---

# Reference databases

* Taxonomy classification requires a database of genome sequences annotated with taxonomic information.
* Genbank records are annotated with labels from [NCBI Taxonomy database](https://www.ncbi.nlm.nih.gov/taxonomy)
  * Uncultivated bacteria have historically received no species designation ("unclassified Bacteria").
  * Unclassified taxa are placed close to the root (near superkingdom level).

---

# Draft genomes in Genbank

* "The vast majority of genomes in GenBank today are 'draft' genomes" (Breitwieser *et al.* 2019)
* Misannotation - incorrect taxonomic assignment of draft genome.
* Contamination with sequencing adapters, vectors, *e.g.*, Illumina adapters.
* Contamination with DNA from other sources, *e.g.*, human.

---

# *Neisseria gonorrhoeae* genome contamination

* A microbiome study of cows (*Bos taurus*) reported the presence of a human pathogen
* Follow-up study by Merchant *et al.* (2014) found five locations in [*N. gonorrhoeae*](https://en.wikipedia.org/wiki/Neisseria_gonorrhoeae) genome are host contaminants: 4 from cow, 1 from sheep.
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Neisseria_gonorrhoeae_PHIL_3693_lores.jpg/800px-Neisseria_gonorrhoeae_PHIL_3693_lores.jpg" width="400px"/>

<small>
Image credit: [US CDC Public Health Image Library](https://commons.wikimedia.org/wiki/File:Neisseria_gonorrhoeae_PHIL_3693_lores.jpg)
</small>

---

# RefSeq

* Another resource maintained by NCBI providing an annotated subset of Genbank.

| Domain | Level | Draft genomes | | Complete genomes | |
|--------|-------|---------------|-|------------------|-|
|        |       | GenBank | RefSeq | GenBank | RefSeq |
| Archaea | Entries | 859 | 351 | 260 (20) | 225 (12) |
|         | Species | 695 | 204 | 209 (14) | 178 (7) |
| Bacteria | Entries | 89,730 | 78,783 | 7314 (1346) | 6973 (1066) |
|          | Species | 19,078 | 11,217 | 2677 (542) | 2586 (406) |
| Fungi | Entries | 1897 | 191 | 28 (414) | 7 (38) |
|       | Species | 997 | 190 | 17 (68) | 7 (36) |
| Protists | Entries | 430 | 47 | 2 (49) | 2 (27) |
|          | Species | 226 | 47 | 2 (38) | 2 (26) |
| Viruses | Entries | 3 | 3 | 0 (0) | 7214 (22) |
|         | Species | 1 | 3 | 0 (0) | 7073 (22) |

<small>
Source: FP Breitwieser <i>et al.</i> (2017) [Briefings Bioinf 20: 1125](https://doi-org.proxy1.lib.uwo.ca/10.1093/bib/bbx120).
</small>

---

# Applications of metagenomics for infectious diseases

* Microbial ecology / "microbiomes"
* Clinical diagnostics
* Discovery of novel pathogens

---

# Microbial ecology

* The study of interactions between microorganisms, their environment, and other organisms.
* How are host-microbe relationships formed?  How are they disrupted?
* What causes a host-microbe relationship to become a pathogenic one?
* Where do infectious diseases come from?

---

# Total RNA metagenomics of sandflies

* *Lutzomyia longipalpis* is a vector of [Leishmania](https://en.wikipedia.org/wiki/Leishmania), which causes fatal systemic disease in nearly 60,000/yr.
* Total RNA was extracted from 4 groups of 100 sandflies each for metagenomic sequencing.
<table><tr>
<td style="vertical-align: middle">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/LeishmaniaMexicana_Promastigote_SEM.jpg/640px-LeishmaniaMexicana_Promastigote_SEM.jpg" width="250px"/>
  <small>Image credit: [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:LeishmaniaMexicana_Promastigote_SEM.jpg)</small>
</td>
<td>
  <img src="/img/journal.pntd.0001304.g002.png" width="650px"/>
  <small>
  Image credit: CB McCarthy <i>et al.</i> [PLOS Negl Trop Dis 5: e1304](https://doi.org/10.1371/journal.pntd.0001304).
  </small>
</td>
</tr></table>

---

# Microbiomes and infectious disease

* What role does variation in the "microbiome" play in host susceptibility to infection? pathogenesis?
* Can we artificially restore a microbiome that was eradicated by antibiotic treatment?
* [*Clostriudium difficile*](https://en.wikipedia.org/wiki/Clostridioides_difficile_infection) and faecal transplantation.

---

# Metagenomics of faecal transplants

![](/img/s40168-017-0270-x.png)
<small>
Image credit: STM Lee <i>et al.</i> (2017) [Microbiome 5:50](https://doi.org/10.1186/s40168-017-0270-x).
</small>

---

# Clinical diagnostics and novel pathogens

<table>
<tr>
  <td style="font-size: 20pt">
    <ul>
      <li>Application of metagenomics for cases of [idiopathic disease](https://en.wikipedia.org/wiki/Idiopathic_disease) (unknown cause).</li>
      <li>Discovery of novel pathogens, *e.g.*, a cluster of idiopathic hemorrhagic fever (4 of 5 cases fatal) in South Africa caused by novel arenavirus ([Lujo virus](https://en.wikipedia.org/wiki/Lujo_mammarenavirus)) by total RNA extraction, random primer amplification.</li>
    </ul>
  </td>
  <td style="vertical-align: middle" width="50%">
    <img src="/img/lujo-virus.png" width="400px">
    <small>
    Image credit: T Briese <i>et al.</i> (2009) [PLoS Pathog 5: e1000455](https://dx.doi.org/10.1371%2Fjournal.ppat.1000455).
    </small>
  </td>
</tr>
</table>

---

# Case study of idiopathic [uveitis](https://en.wikipedia.org/wiki/Uveitis)

<table>
  <tr>
    <td>
      <small>(A) Clinical course, (B) iris atrophy and (C) inflammatory cell aggregates</small>
      <img src="https://media.springernature.com/full/springer-static/image/art%3A10.1186%2Fs13073-016-0344-6/MediaObjects/13073_2016_344_Fig2_HTML.gif?as=webp" width="400px"/>
    </td>
    <td>
      <small>Metagenomic analysis and rubella virus phylogeny</small>
      <img src="https://media.springernature.com/full/springer-static/image/art%3A10.1186%2Fs13073-016-0344-6/MediaObjects/13073_2016_344_Fig3_HTML.gif?as=webp" width="400px"/>
    </td>
  </tr>
</table>

<small>
Image credit: T Doan <i>et al.</i> (2016) [Genome Med 8: 90](https://doi.org/10.1186/s13073-016-0344-6).
</small>

---

# Further readings

* [A review of methods and databases for metagenomic classification and assembly](https://academic.oup.com/bib/article/20/4/1125/4210288)
* [Abundant Human DNA Contamination Identified in Non-Primate Genome Databases](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0016410)
* [Recovering complete and draft population genomes from metagenome datasets](https://microbiomejournal.biomedcentral.com/track/pdf/10.1186/s40168-016-0154-5)
* [Metagenomics for pathogen detection in public health](https://link.springer.com/article/10.1186/gm485)
