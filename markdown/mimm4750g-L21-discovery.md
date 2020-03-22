# MIMM4750G
## Pathogen discovery
![](https://what-if.xkcd.com/imgs/a/80/virus_mountain.png)

---

# Emerging infectious diseases

* An infectious disease that:
  1. has recently appeared in a host population for the first time, *e.g.*, SARS-CoV
  2. was previously limited to isolated, sporadic cases, *e.g.*, HIV-1, Ebola virus
  3. was only recently been recognized as an infectious disease, *e.g.*, Lyme disease.

* **Re-emerging infectious disease:** a pathogen that had declined dramatically, but has again become a significant public health problem.
  * *e.g.*, measles virus.

---

# Novel genomes

<table>
  <tr>
    <td style="font-size: 22pt">
      <ul>
        <li><i>de novo</i> assembly of NGS data can potentially reconstruct the genome of a completely unknown pathogen.</li>
        <li>Can identify novel pathogen in cases of idiopathic disease.</li>
        <li>(right) Annual numbers of novel animal virus species reported in PubMed.</li>
      <ul>
    </td>
    <td width="50%">
      <img src="https://journals.plos.org/plosone/article/figure/image?download&size=large&id=info:doi/10.1371/journal.pone.0129059.g001" width="500px"/>
    </td>
  </tr>
</table>

<small>
Image credit: GM Daly <i>et al.</i> (2015) [PLOS ONE 10: e0129059](https://doi.org/10.1371/journal.pone.0129059)
</small>

---

# Sample preparation

* Pathogen enrichment or host depletion
* Filtration: isolate cell-free bacteria or viruses from host cells
* Enzymatic degradation: methylation-specific DNAse, rRNA depletion
* Biotinylated probe enrichment: capture viral genome fragments by targeting conserved regions.
<img src="/img/41598_2016_Article_BFsrep28324_Fig1_HTML.png"/>
<small>
Image credit: P Miyazato <i>et al.</i> (2016) [Sci Rep 6: 28324](https://doi.org/10.1038/srep28324).
</small>

---

# Amplification for discovery

* <a href="https://en.wikipedia.org/wiki/Primer_(molecular_biology)#Degenerate_primers">Degenerate primers</a>: different bases at some positions to accommodate variation among species.
* [Random primers](https://en.wikipedia.org/wiki/Random_hexamer): random hexamers for "universal" amplification.
* [Rolling circle amplification](https://en.wikipedia.org/wiki/Rolling_circle_replication#Rolling_circle_amplification): circularization of template by ligation, followed by recurring elongation.
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Rolling_circle_amplification_mechanism.jpg/800px-Rolling_circle_amplification_mechanism.jpg" width="550px"/>

---

# Quality control

* Are the assembly contigs reliable?
* N50: when contigs are sorted by length, N50 is the length of the contig at which we reach 50% of assembled nucleotides.

Sort contigs by lengths in decreasing order:
![](https://i1.wp.com/www.molecularecologist.com/wp-content/uploads/2017/03/Figure1a.jpg?w=699&ssl=1)

Locate midpoint along concatenated array of contigs (N50=60):
![](https://i0.wp.com/www.molecularecologist.com/wp-content/uploads/2017/03/Figure1b.jpg?w=699&ssl=1)

<small>
Image credit: E Videvall <i>et al.</i> https://www.molecularecologist.com/2017/03/whats-n50/
</small>

---

# NGS data processing (before assembly)

* Host subtraction: comparison of reads associated with host genomes, organelles.
  * short read mapping, *e.g.*, BWA or Bowtie
  * k-mer filtering, *e.g.*, [Kontaminant](https://www.earlham.ac.uk/kontaminant) maps k-mers in reads against an k-mer index of reference genomes.

* Low complexity filtering: the [DUST]() algorithm counts 3-mer frequencies in 64nt windows:
```
ACCTGCACATTGTGCACATGTACCCTAAAACTTAAAGTATAATAATAATAAAATTAaaaa
cttaaagtataataataataaaattaaaaaaaaatGCTACAGTATGACCCCACTCCTGG
```

---

# Predicted reading frames

* What makes an open reading frame?
  * Translation initiation codon (`ATG`, `GTG` or `TTG`)
  * [Ribosome binding sites](https://en.wikipedia.org/wiki/Ribosome-binding_site): *e.g.*, prokaryotic Shine-Delgarno sequence `AGGAGG` about 8nt upstream of start codon.
* GC-rich bacterial genomes are biased to have more potential start codons than stop codons.

---

# ORF prediction

* [Glimmer](http://www.cs.jhu.edu/~genomics/Glimmer/) (Gene Locator and Interpolated Markov ModelER) predicts if sequence composition is consistent with a coding region.
* Trains a higher-order [Markov model](https://en.wikipedia.org/wiki/Markov_chain#Types_of_Markov_chains) where nucleotide at position $i$ depends on a subset of upstream nucleotides.
* This subset is determined by [mutual information](https://en.wikipedia.org/wiki/Mutual_information) between upstream bases and the current base:

$$I(X,Y) = \sum_i \sum_j P(x_i, y_j) \log\left(\frac{P(x_i)P(y_j)}{P(x_i, y_j)}\right)$$

---

# Homology

* One could simply [BLAST](http://slides.filogeneti.ca/html/mimm4750g-L04-BLAST.html#/4) a stretch of nucleotide sequence to look for similarity to known coding regions.


---

# Purifying selection

* A protein-coding sequence that confers some useful function should be mostly under purifying selection.
* Non-synonymous substitutions should be less frequent than synonymous substitutions (dN/dS<1).
*

---

# Data dredging

---

# Dadendeong virus

---

# False positives

---

# Novel echovirus and ALS

---

# Portable sequencing



---

# Further readings

* CY Chiu (2013) [Viral pathogen discovery](https://doi.org/10.1016/j.mib.2013.05.001).
* [Viral pathogen discovery](https://www.sciencedirect.com/science/article/pii/S1369527413000684)
* [Host Subtraction, Filtering and Assembly Validations for Novel Viral Discovery Using Next Generation Sequencing Data](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0129059)
* [Experimental determination of translational start sites resolves uncertainties in genomic open reading frame predictions – application to Mycobacterium tuberculosis](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2897130/)
* [The Perils of Pathogen Discovery: Origin of a Novel Parvovirus-Like Hybrid Genome Traced to Nucleic Acid Extraction Spin Columns](https://jvi.asm.org/content/87/22/11966.short)
