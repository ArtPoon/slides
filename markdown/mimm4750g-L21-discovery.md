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

<small>
Example from A Morgulis <i>et al.</i> (2006) [J Comp Biol 13: 1028](https://doi.org/10.1089/cmb.2006.13.1028).
</small>

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
* AGenDA (Alignment-based Gene-Detection Algorithm) aligns pairs of genomes and searches for "conserved splicing signals and start/stop codons around regions of local sequence similarity".

---

# Purifying selection

* A protein-coding sequence that confers some useful function should be mostly under purifying selection.
* Non-synonymous substitutions should be less frequent than synonymous substitutions ([dN/dS](http://slides.filogeneti.ca/html/mimm4750g-L11-selection.html#/6)<1).
* Limitation is that you need multiple divergent copies of potential gene.

---

# Microbial dark matter

* The vast majority of bacteria and archaea are unculturable.
![](/img/nature12352.f1.png)
<small>
Image credit: C Rinke <i>et al.</i> (2013) [Nature 499: 431](https://doi.org/10.1038/nature12352).
</small>

---

# Data dredging

* Unmapped reads that were discarded from studies focusing on host genomes, such as human oncology studies, may contain pathogen sequences.
* Cimino *et al.* (2014) re-analyzed the discarded reads from high grade [gliomas](https://en.wikipedia.org/wiki/Glioma).
* Detected [Epstein-Barr virus](https://en.wikipedia.org/wiki/Epstein%E2%80%93Barr_virus) and [Roseolovirus](https://en.wikipedia.org/wiki/Roseolovirus) in 6 of 21 (29%) cases.

<small>
PJ Cimino <i>et al.</i> (2014) [Exp Mol Pathology 96: 310](https://doi-org.proxy1.lib.uwo.ca/10.1016/j.yexmp.2014.03.010).
</small>

---

# Culturing the unculturable

<table>
  <tr>
    <td style="font-size: 22pt">
      <ul>
        <li>"Unculturable" does not necessarily mean "impossible to culture".</li>
        <li>Functional characterization of a novel genome from dark matter may provide clues to physiology, environmental requirements.</li>
        <li>Ecological characterization of sample by metagenomics may identify co-abundant "helper" microbes.</li>
      <ul>
    </td>
    <td width="40%">
      <img src="https://jb.asm.org/content/jb/194/16/4151/F2.medium.gif"/>
      <small>
      Co-culture of a freshwater <i>Bacillus</i> with <i>Bacillus megaterium</i>-like helper.<br/>
      Image credit: A D'Onofrio <i>et al.</i>, in EJ Stewart (2012) [J Bacteriol](https://doi.org/10.1128/JB.00345-12).
      </small>
    </td>
  </tr>
</table>

---

# <i>Coxiella burnetii</i>

* Bacterial pathogen causes "[Q fever](https://en.wikipedia.org/wiki/Q_fever)", an influenza-like illness, in humans and domesticated animals.
* Genome sequence became available in 2003.
* Omsland *et al.* (2009) used microarrays to profile gene expression to determine that protein synthesis was limiting growth.
* Genome encoded terminal oxidases suggesting improved growth in low oxygen.

<small>
<i>Host cell-free growth of the Q fever bacterium Coxiella burnetii.</i> [PNAS 106: 4430](https://doi.org/10.1073/pnas.0812074106).
</small>

---

# crAssphage

* A previously unidentified bacteriophage (~97kbp circular DNA genome) found in majority of published human faecal metagenomic data.
* Majority of proteins encoded by Glimmer-predicted ORFs had no homologous matches in Genbank.
* The first virus to be named after bioinformatics software (cross-assembly, crAss).

<table><tr>
<td><img src="https://sciences.sdsu.edu/wp-content/uploads/2019/07/crAss_phage_edwards.jpg" width="300px"/></td>
<td><small>Image credit: Robert Edwards, San Diego State University.</small></td>
</tr></table>

---

# Dandenong virus

* 3 patients who received organ transplants from one donor died of febrile illness 4-6 weeks after.
* Samples screened for HHV1-8, lyssavirus, IAV, IBV, RSV, picornavirus, adenovirus, human parainfluenza virus, flavivirus, and many more.
* Total RNA from recipient samples was amplified with random primers and processed by NGS.
* Contigs obtained after subtraction of human DNA and *de novo* assembly were BLASTX-matched to Old World arenaviruses.

<small>
G Palacios <i>et al.</i> (2008). A New Arenavirus in a Cluster of Fatal Transplant-Associated Diseases. [N Eng J Med 358: 991](http://doi.org/10.1056/NEJMoa073785).
</small>


---

# False positives

* Lack of homology and failure to eliminate contamination makes pathogen discovery susceptible to a high false positive rate.
* Two labs using *de novo* assembly of NGS data independently discovered a novel recombinant of [*Circoviridae*](https://en.wikipedia.org/wiki/Circoviridae) and [*Parvoviridae*](https://en.wikipedia.org/wiki/Parvoviridae) (parvovirus-like hybrid virus, PHV) in patient samples with chronic seronegative hepatitis and idiopathic diarrhea.
* PHV could not be detected in re-extractions from same samples - the source was determined to be the Qiagen spin columns (a diatom virus).

---

# Portable sequencing

<img src="https://nanoporetech.com/sites/default/files/s3/minion-cutout.png" width="400px"/>

* The Oxford Nanopore MinION weights about 100g and plugs into a computer/laptop via USB.
* Each single-use flow cell generates about 1-2 million reads, indeterminate read length (exceeding 2Mbp).
* About 5% to 15% per base error rate.
* Near real-time *de novo* assembly of data makes field deployment possible.

---

<img src="https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fnrg.2017.88/MediaObjects/41576_2018_Article_BFnrg201788_Fig2_HTML.jpg" width="
800px"/>
<small>
Image credit: JL Gardy and NJ Loman (2018) [Nature Rev Genet 19: 9](https://doi.org/10.1038/nrg.2017.88).
</small>

---

<table>
  <tr>
    <td width="55%"><img src="https://www.sciencemag.org/sites/default/files/styles/article_main_image_-_1280w__no_aspect_/public/ca_0607NID_Barcoding_online.jpg?itok=c7GH4Lnk"/></td>
    <td><img src="https://3.bp.blogspot.com/-tYJ5VUZI7l0/XDzp_WoXk-I/AAAAAAAADlE/iF82svuPrrkVcxMW5OKWwUEiBiZ8q-ZFwCLcBGAs/s640/DSC01344.JPG"/></td>
  </tr>
  <tr>
    <td><img src="https://pbs.twimg.com/media/Ci6FGLrWEAAmE8s?format=jpg&name=4096x4096"/></td>
    <td><img src="https://www.nasa.gov/sites/default/files/thumbnails/image/128f0462_sequencer_1.jpg"/></td>
  </tr>
</table>

---

# Further readings

* [Viral pathogen discovery](https://www.sciencedirect.com/science/article/pii/S1369527413000684)
* [Host Subtraction, Filtering and Assembly Validations for Novel Viral Discovery Using Next Generation Sequencing Data](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0129059)
* [Experimental determination of translational start sites resolves uncertainties in genomic open reading frame predictions – application to Mycobacterium tuberculosis](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2897130/)
* [A highly abundant bacteriophage discovered in the unknown sequences of human faecal metagenomes](https://www.nature.com/articles/ncomms5498)
* [The Perils of Pathogen Discovery: Origin of a Novel Parvovirus-Like Hybrid Genome Traced to Nucleic Acid Extraction Spin Columns](https://jvi.asm.org/content/87/22/11966.short)
* [Growing Unculturable Bacteria](https://jb.asm.org/content/194/16/4151)
