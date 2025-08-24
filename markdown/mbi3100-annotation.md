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
<b>Genome annotation</b> is the process of analytically labelling biologically significant features in the DNA sequence, which places these data into the context of our understanding of biological processes.
</div>

---

<table>
  <tr>
    <td style="vertical-align: middle; font-size: 20pt;">
      <h1>Levels of genome annotation</h1>
      <ul>
        <li><b>Nucleotide-level</b>: annotation of features in nucleotide sequence, such as genes.</li>
        <li><b>Protein-level</b>: identify and characterize the proteins encoded by the genome.</li>
        <li><b>Process-level</b>: determine how genes and proteins interact to produce cell growth, development, metabolism, <i>et cetera</i>.</li>
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
        <li>Non-coding RNAs (tRNAs, rRNAs, <a href="https://en.wikipedia.org/wiki/Long_non-coding_RNA">lncRNAs</a>, ...)</li>
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
Source: Monnet <i>et al.</i> (2011) The Arthrobacter arilaitensis Re117 Genome Sequence Reveals Its Genetic Adaptation to the Surface of Cheese. <a href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0015489">PLOS ONE 5(11):e15489</a>.
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
        <li>Non-coding RNAs are more difficult to identify than protein-coding genes, which have distinctive characteristics (start/stop codons, codon usage biases).</li>
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
Source: Zerbino, Frankish and Flicek (2020) Progress, Challenges, and Surprises in Annotating the Human Genome.  <a href="https://www.annualreviews.org/content/journals/10.1146/annurev-genom-121119-083418">Annu Rev Genome Hum Genet 21: 55-79</a>.
</small>

---

### Nucleotide-level annotation
# Transcription factor binding sites

* Transcription factors (TFs) are proteins that bind to DNA to modulate gene expression.
* Locations of TF binding sites are determined experimentally
  * [TRANSFAC](https://genexplain.com/about-transfac-basic/) is a proprietary<sup>&dagger;</sup> database of eukaryotic TF binding profiles.
  * [JASPAR](https://jaspar.elixir.no/) is an open access database of eukaryotic TF binding profiles with a [RESTful API](https://aws.amazon.com/what-is/restful-api/) and Pythonic interface.

<small>
<sup>&dagger;</sup> $2590 per year subscription fee for students
</small>

---

### Nucleotide-level annotation
# Repetitive elements: Satellites

* About half of the human genome is associated with repetitive elements ([Stein 2001](https://www.nature.com/articles/35080529)).
* Variable number tandem repeats (VNTRs)
  * microsatellites are repeats of 1-6 nucleotides ([Ellegrin 2004](https://www.nature.com/articles/nrg1348))
  * minisatellites are longer repeats of 7 to 100 nucleotides
* Repeats are a primary cause of assembly error, such that many regions in the human genome have yet to be sequenced ([de Bustos 2016](https://www.nature.com/articles/srep36665)).

---

### Nucleotide-level annotation
# Repetitive elements: Transposable elements

* [Transposable elements](https://en.wikipedia.org/wiki/Transposable_element) (TEs) are sequences that can change their location in the genome.
  * Retrotransposons are transcribed to RNA, reverse-transcribed back to DNA and integrated back into the genome.
  * DNA transposons are enzymatically excised and then re-inserted elsewhere in the genome.
* Many programs identify TEs by homology (*e.g.*, [RepeatMaster](https://www.repeatmasker.org/)) or structural (*e.g.*, [LTRharvest](https://www.zbh.uni-hamburg.de/forschung/gi/software/ltrharvest.html)) similarity to a database of known TEs.

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

# How do we identify the unseeable?

* A genome sequence is a long string of letters:

`AGCTTGGACTGTGATGCTAGTGCGAGCAGCGTTGCTAGTCCCGGCTGATGTC`

* Usually, a feature has no characteristics that *unambiguously* reveal its presence.
  * *e.g.*, a protein-coding gene is generally flanked by start (`ATG`) and stop (`TAA/TAG/TGA`) codons, but those can appear anywhere!
* We need to have some kind of model for the *probability* that a feature is there.

---

# What are hidden Markov models?

* A majority of genome annotations programs for identifying nucleotide-level features have used hidden Markov models (HMMs).
  * You may have noticed that many program names contain the abbreviation "HMM"
* A hidden Markov model is a machine learning method from the field of [natural language processing](https://en.wikipedia.org/wiki/Natural_language_processing).
  * NLP is the study of making computers "understand" a language that does not follow consistent rules.

---

# Remember Markov models?

* A stochastic process is a model that describes the probability that a system is in some state $X$ at time $t$.
  * It has the Markov property if that probability depends *only* on its state at a previous time $s<t$.
  * The board game [Candy Land](https://en.wikipedia.org/wiki/Candy_Land) has the Markov property.
* We last talked about Markov models in our [lecture](https://slides.filogeneti.ca/html/mbi3100-L05-distances.html#/11) on genetic distances.
* HMMs have the Markov property.

---

# Latent states

* HMMs are "hidden" because they are models of states that cannot be directly observed.
  * A variable with hidden states is as [latent variable](https://en.wikipedia.org/wiki/Latent_and_observable_variables).
  * Happiness cannot be directly measured, but it exists and can be modeled as a hidden state.
* An HMM assumes that latent states have different probabilities of *emitting* observable states. 

---

# Example

* Imagine we have a machine that drops blue or red balls at random $(p_0=0.5)$ as it moves along a track.
* Sometimes $(q_{01}=0.2)$ the mechanism gets stuck and it rarely drops blue $(p_1=0.9)$.
  * It also gets unstuck with probability $q_{10}=0.1$.
* Suppose that the state of the mechanism is hidden to us (it is sealed inside the machine).
  * Can we deduce the hidden state at any time, given the sequence of balls it has dropped?

---

![](/img/hmm-machine.svg)

<pre><code data-trim class="language-R">
hmm.sim <- function(n, p01, p10, e0, e1) {
  h <- rep(NA, n+1); h[1] <- 0  # initialize hidden state vector
  v <- rep(NA, n)  # visible states
  for (i in 2:(n+1)) {
    p <- ifelse(h[i-1]==0, p01, p10)
    h[i] <- h[i-1]  # propagate hidden state, unless...
    if (runif(1) < p) {
      h[i] <- (h[i-1]+1)%%2  # hidden state transition
    }
    # emit visible state
    v[i-1] <- rbinom(1, size=1, prob=ifelse(h[i]==0, e0, e1))
  }
  return(cbind(h[2:(n+1)], v))
}
</code></pre>

---

# How do we solve it?



---

# Profile HMM

---

<section data-background="#333" style="color:white">

<h1 style="color:white">Key points</h1>

* test

</section>