# MIMM4750G
## Genome annotation
![](https://imgs.xkcd.com/comics/lungfish.png)

---

# Review

* Last lecture, we talked about how computers can be used to assemble sequence fragments (reads) into the original genome.
* Genomes can range from thousands to billions of nucleotides in length.
  * The Human Genome Project took 13 years to sequence 3B nt.

---

# Genome annotation

* A genome is only useful to us if it is *annotated*.
  * Even though a human genome can now be generated in one week, annotating the human genome is an ongoing endeavour.
* Annotation bridges the gap from data (sequence) to the biology of the organism.
* The primary aim of annotation is to identify the key features of the genome.

---

<div style="text-align: center; font-weight: 500; font-size: 48px;">
**Genome annotation** is the process of analytically labelling biologically significant features in the DNA sequence, which places these data into the context of our understanding of biological processes.
</div>

---

<table>
  <tr>
    <td style="vertical-align: middle; font-size: 20pt;">
      <h1>Levels of genome annotation</h1>
      <ul>
        <li>Nucleotide-level: annotation of features in nucleotide sequence, such as genes.</li>
        <li>Protein-level: identify and characterize the proteins encoded by the genome.</li>
        <li>Process-level: determine how genes and proteins interact to produce cell growth, development, metabolism, *et cetera*.</li>
      </ul>
      <small>
Source: Lincoln Stein, "Genome Annotation: From Sequence to Biology", Nature Reviews 2001
</small>
    </td>
    <td width="40%">
      <img src="/img/35080529-f1.png"/>
    </td>
  </tr>
</table>

---

# Process-level annotation

* Requires a widely-accepted classification scheme to describe protein functions shared by different species.
* The Gene Ontology (GO) consortium was formed by three model organism databases:
  * the [*Saccharomyces* Genome Database](https://www.yeastgenome.org/)
  * [FlyBase](https://flybase.org/)<sup>&dagger;</sup>
  * the [Mouse Genome Database](https://www.informatics.jax.org/)
* GO created a hierarchical vocabulary for describing the function of eukaryotic genes.

<small>
<sup>&dagger;</sup> A database for Drosophila genetics - recently discontinued due to US government cuts.
</small>

---

# Protein-level annotation

* Seeks to compile a definitive catalogue of proteins encoded by the genome.
* Cataloguing includes:
  * Giving each protein a unique name
  * Assigning functions to proteins
* Proteins that share a common ancestor do *not* necessarily have similar functions!
  * *e.g.*, [crystallins](https://en.wikipedia.org/wiki/Crystallin) are proteins that make up the bulk of the eye lens, but descend from [chaperonins](https://en.wikipedia.org/wiki/Chaperonin).

---

<table style="font-size: 20pt;">
  <tr>
  <td>
    <h3>Nucleotide-level annotation</h3>
    <h1>Mapping</h1>
    <ul>
    <li><i>Mapping</i> is the search for features previously identified by non-sequencing methods, such as <a href="https://en.wikipedia.org/wiki/Cytogenetics">cytogenetics</a> or <a href="https://en.wikipedia.org/wiki/Gene_mapping">genetic mapping</a>.</li>
    <li>These known features serve as landmarks or reference points for subsequent work.</li>
    </ul>
  </td>
  <td width="40%">
    <img src="https://upload.wikimedia.org/wikipedia/commons/0/07/Karyotype_of_Aloe_vera.png">
    <small>
    Karyotype of <i>Aloe vera</i> by <a href="https://commons.wikimedia.org/wiki/File:Karyotype_of_Aloe_vera.png">SM Haque and B Ghosh</a>.
    </small>
    <p></p>
    <img src="/img/Drosophila_Gene_Linkage_Map.svg"/>
    <small>
    Gene linkage map on second chromosome of <i>Drosophila</i<> genome (<a href="https://commons.wikimedia.org/wiki/File:Drosophila_Gene_Linkage_Map.svg">Creative Commons BY-SA 4.0)</a>.
    </small>
  </td>
  </tr>
</table>

---

<table style="font-size: 20pt;">
  <tr>
    <td style="vertical-align: middle;">
      <h3>Nucleotide-level annotation</h3>
      <h1>What kinds of features are there?</h1>
      <ul>
        <li>Non-coding RNAs (tRNAs, rRNAs, [lncRNAs](https://en.wikipedia.org/wiki/Long_non-coding_RNA), ...)</li>
        <li>Transcription factor binding sites</li>
        <li>Repetitive elements (microsatellites) and duplications</li>
        <li>Protein-coding genes</li>
      </ul>
    </td>
    <td width="40%">
      <img src="/img/genome-annot.png"/>
      <small>
      Circular diagram summarizing the distribution of various nucleotide-level features in the <i>Arthrobacter arilaitensis</i> genome.
      </small>
    </td>
  </tr>
</table>

<small>
Source: Monnet *et al.* (2011) The Arthrobacter arilaitensis Re117 Genome Sequence Reveals Its Genetic Adaptation to the Surface of Cheese. [PLOS ONE 5(11):e15489]().
</small>


---

### Nucleotide-level annotation
# Non-coding RNAs

* Transfer RNAs (tRNAs) link codons in mRNA to specific amino acids during translation
  * Several tRNA prediction tools are available, *e.g.*, [tRNAscan-SE](https://pubmed.ncbi.nlm.nih.gov/34417604/), [ARAGORN](https://academic.oup.com/nar/article/32/1/11/1194008)
* Ribosomal RNAs (rRNAs) are the predominant form of cellular RNA
  * Need to be removed from transcriptomic data, often one of the first steps.
  * rRNA annotation/filtering programs include [RNAmmer](https://academic.oup.com/nar/article/35/9/3100/2401119) and [RiboDetector](https://academic.oup.com/nar/article/50/10/e60/6533611)

---

### Nucleotide-level annotation
# Non-coding RNAs

<table style="font-size: 20pt;">
  <tr>
    <td style="vertical-align: middle;">
      <ul>
        <li>RNA sequencing (RNA-seq) has revealed an enormous number of non-coding RNAs</li>
        <li>Non-coding RNAs are more difficult to identify tha protein-coding genes, which have distinctive characteristics (start/stop codons, codon usage biases).</li>
        <li>Many detection programs are family-specific, <i>only tRNAs</i></li>
        <li></li>
      </ul>
    </td>
    <td width="45%">
      <img src="/img/annurev-genom-121119-083418-f2.png"/>
      <br/>
      <small>
      Timeline of gene annotation in the Ensembl/GENCODE database, showing the discovery of small RNAs and lncRNAs.  IG/TR = immunoglobulin/T-cell receptor.
      </small>
    </td>
  </tr>
</table>

<small>
Source: Zerbino, Frankish and Flicek (2020) Progress, Challenges, and Surprises in Annotating the Human Genome.  [Annu Rev Genome Hum Genet 21: 55-79](https://www.annualreviews.org/content/journals/10.1146/annurev-genom-121119-083418).
</small>

---

### Nucleotide-level annotation
# Transcription factor binding sites

---

### Nucleotide-level annotation
# Repetitive elements

* Variable number tandem repeats (VNTRs): *e.g.*, [microsatellites](https://en.wikipedia.org/wiki/Microsatellite)

* About 44% of the human genome is associated with repetitive elements.
* Repeats can cause problems for genome assembly from short reads


---

### Nucleotide-level annotation
# How many genes are there?

* We tend to fixate on protein-coding genes.
* The number of genes in the human genome was thought to be as high as 100,000 in the early years of the Human Genome Project.
* Estimates fell rapidly to around 20,000 genes with more analysis.
  * Current estimates are actually lower than the number estimated for the mouse genome using the same models!
* Despite decades of research, we still do not have a definitive number - why?

---

### Nucleotide-level annotation
# Gene finding is hard: Genome length

* In smaller genomes (*e.g.*, prokaryotes, viruses), finding genes can be reduced to looking for long open reading frames (ORFs).
  * We assume an open reading frame consists of start and stop codons.
* Longer genomes tend to have less coding sequence:

| Species | Common name | Genome length | Coding proportion |
|---------|-------------|---------------|-------------------|
| *Haemophilus influenzae* | (bacterium) | 1.9 Mb | [85%](https://pmc.ncbi.nlm.nih.gov/articles/PMC3790081) |
| *Saccharomyces cerevisiae* | brewer's yeast | 12.1 Mb | [70%](https://www.sciencedirect.com/science/article/pii/S0960982202005262) |
| *Drosophila melanogaster* | fruit fly | 139.5 Mb | 20%-25% |
| *Caenorhabditis elegans* | roundworm | 100 Mb | [26%](https://www.ncbi.nlm.nih.gov/books/NBK19701/#:~:text=2.3.,in%20the%20various%20titin%20isoforms.) |
| *Homo sapiens* | human | 3,200 Mb | [2%](https://www.ncbi.nlm.nih.gov/books/NBK595930/#:~:text=Analysis%20of%20the%20assembled%20sequences,or%20other%20weak%20supporting%20evidence%E2%80%9D.) |

---

### Nucleotide-level annotation
# Gene finding is hard: Splicing

* Gene finding in longer genomes is also complicated by splicing.
* [Splicing](https://en.wikipedia.org/wiki/RNA_splicing) is the conversion of precursor mRNA to mature transcript by removing introns.
  * An intron may induce a frameshift if it is not removed from the transcript.
  * Introns can be several thousand nucleotides in length!
  * Imaging doing a [word search](https://en.wikipedia.org/wiki/Word_search) when any number of random letters can be placed within each word.
* [Alternative splicing](https://en.wikipedia.org/wiki/Alternative_splicing) means that more than one protein can be derived from the same gene.

---

### Nucleotide-level annotation
# Gene finding is hard: Pseudogenes

* Pseudogenes are usually duplicate, redundant copies of an ancestral gene.
  * Eventually the copy accumulates so many mutations that it no longer encodes a functional protein.
* Because they are derived from actual genes, pseudogenes are a source of false positives.
* In some cases, a pseudogene *regains* novel functionality.
  * Many pseudogenes display organ-specific transcription levels.

---

# Gene finding: software

* There are MANY computer programs that have been developed for gene finding:

| Program | Published  | Program | Published | 
|---------|------------|---------|-----------|
| GENSCAN | 1997       | Fgenes | 1995 | 
| Genie | 1996         | HMMGene | 1997 |
| GeneMark.hmm | 1999  | GlimmerM, Exonomy, Unveil | 2003 |
| Grail | 1991         | AUGUSTUS | 2018 |
| HEXON | 1994         | Helixer | 2020 | 
| MZEF | 1997         | Tiberius | 2024 | 

* The majority of these have used hidden Markov models (HMMs)

---

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Sunset_On_Rock_Lake_-_panoramio.jpg/2560px-Sunset_On_Rock_Lake_-_panoramio.jpg"/>

<small>
Sunset on Rock Lake in Algonquin Provincial Park, [Eric Raymond Lanning](https://commons.wikimedia.org/wiki/File:Sunset_On_Rock_Lake_-_panoramio.jpg)
</small>

---

# Remember Markov models?

* A stochastic process is a model that describes the probability that a system is in some state $X$ at time $t$.
  * It has the Markov property if that probability depends *only* on its state at a previous time $s<t$.
  * The board game [Candy Land](https://en.wikipedia.org/wiki/Candy_Land) has the Markov property.
* We last talked about Markov models in our lecture on genetic distances.

---

# Profile HMM

---

<section data-background="#333" style="color:white">

<h1 style="color:white">Key points</h1>

* test

</section>