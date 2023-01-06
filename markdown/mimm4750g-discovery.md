# MIMM4750G
## Pathogen discovery
![](https://what-if.xkcd.com/imgs/a/80/virus_mountain.png)

---

# Emerging infectious diseases

* An infectious disease that:
  1. has recently appeared in a host population for the first time, *e.g.*, [SARS-CoV](https://en.wikipedia.org/wiki/Severe_acute_respiratory_syndrome_coronavirus)
  2. was previously limited to isolated, sporadic cases, *e.g.*, [HIV-1](https://en.wikipedia.org/wiki/History_of_HIV/AIDS), [Ebola virus](https://en.wikipedia.org/wiki/Ebolavirus)
  3. was only recently been recognized as an infectious disease, *e.g.*, [Lyme disease](https://en.wikipedia.org/wiki/Borrelia).

* **Re-emerging infectious disease:** a pathogen that had declined dramatically, but has again become a significant public health problem.
  * *e.g.*, [measles virus](https://en.wikipedia.org/wiki/Measles_morbillivirus).

---

# Microbial dark matter

* The vast majority of bacteria and archaea are unculturable (known phyla in grey).

<img src="/img/nature12352.f1.png" height="400px"/>

<small><small>
Image credit: C Rinke <i>et al.</i> (2013) <a href="https://doi.org/10.1038/nature12352"/>Nature 499: 431</a>.
</small></small>

---

# Novel genomes

<table>
  <tr>
    <td style="font-size: 20pt">
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

<small><small>
Image credit: GM Daly <i>et al.</i> (2015) <a href="https://doi.org/10.1371/journal.pone.0129059">PLOS ONE 10: e0129059</a>.
</small></small>

---

# Sample preparation

* Pathogen enrichment or host depletion
  * Filtration: isolate cell-free bacteria or viruses from host cells
  * Enzymatic degradation: [methylation](https://en.wikipedia.org/wiki/DNA_methylation)-specific DNAse, rRNA depletion
  * [Biotinylated](https://en.wikipedia.org/wiki/Biotinylation) probe enrichment: capture viral genome fragments by targeting conserved regions.

<img src="/img/41598_2016_Article_BFsrep28324_Fig1_HTML.png" height="150px"/>

<small><small>
Image credit: P Miyazato <i>et al.</i> (2016) <a href="https://doi.org/10.1038/srep28324">Sci Rep 6: 28324</a>.
</small></small>

---

# Amplification for discovery

* How do you amplify what you don't know?
  * <a href="https://en.wikipedia.org/wiki/Primer_(molecular_biology)#Degenerate_primers">Degenerate primers</a>: different bases at some positions to accommodate variation among species.
  * [Random primers](https://en.wikipedia.org/wiki/Random_hexamer): random hexamers for "universal" amplification.
  * [Rolling circle amplification](https://en.wikipedia.org/wiki/Rolling_circle_replication#Rolling_circle_amplification): circularization of template by ligation, followed by recurring elongation.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Rolling_circle_amplification_mechanism.jpg/800px-Rolling_circle_amplification_mechanism.jpg" width="500px"/>
<small><small>
<a href="https://commons.wikimedia.org/wiki/File:Rolling_circle_amplification_mechanism.jpg">Creative Commons CC-BY-SA 4.0</a>
</small></small>

---

# NGS data processing (before assembly)

* [Host subtraction](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0129059): comparison of reads associated with host genomes, organelles.
  * short read mapping, *e.g.*, BWA or Bowtie
  * k-mer filtering, *e.g.*, [Kontaminant](https://www.earlham.ac.uk/kontaminant) maps k-mers in reads against an k-mer index of reference genomes.

* [Low complexity filtering](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0028819) reduces false positive matches
  * [DUST](https://pubmed.ncbi.nlm.nih.gov/16796549/) algorithm counts 3-mer frequencies in 64nt windows:

```
ACCTGCACATTGTGCACATGTACCCTAAAACTTAAAGTATAATAATAATAAAATTAaaaa
cttaaagtataataataataaaattaaaaaaaaatGCTACAGTATGACCCCACTCCTGG
```

<small><small>
Example from A Morgulis <i>et al.</i> (2006) <a href="https://doi.org/10.1089/cmb.2006.13.1028">J Comp Biol 13: 1028</a>.
</small></small>

---

# crAssphage

* A previously unidentified bacteriophage (~97kbp circular DNA genome) found in majority of published human faecal metagenomic data.
  * Majority of proteins encoded by predicted ORFs had no homologous matches in Genbank.
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
  * Contigs obtained after subtraction of human DNA and __*de novo* assembly__ were similar to Old World arenaviruses.

<small><small>
G Palacios <i>et al.</i> (2008). A New Arenavirus in a Cluster of Fatal Transplant-Associated Diseases. <a href="http://doi.org/10.1056/NEJMoa073785">N Eng J Med 358: 991</a>.
</small></small>

---

# What is *de novo* assembly?

* Combine short reads that seem to overlap so they form a longer sequence.
* A *contig* is a contiguous (uninterrupted) run of nucleotides that is formed from the assembly of short reads.

<!--* Some methods attempt to further assemble contigs into *scaffolds*.-->
<img src="/img/contig.png" width="500px"/>

---

# Pros and cons

* Reference *mapping* is generally faster and easier than *de novo* assembly, but needs a good reference.
* Mapping better suited for variant detection.
* *de novo* assembly is better suited for discovering new genomes, where no suitable reference exists.
* Hybrid methods use both *de novo* assembly and mapping to re-assemble local contigs.

---

# Finding overlaps

* This requires that we compare every pair of pieces!
* Quadratic complexity ($O(N^2)$) with the number of reads, which is already a huge number.
* Made even more difficult if we want to tolerate *inexact* matches (sequencing error or polymorphism)!

<img src="/img/contig2.png" width="500px"/>

---

# Substrings

* Immediately looking for the largest matching sub-string between two strings is time-consuming.
* Instead, we can check if a short *prefix* of one string occurs somewhere in the second string.
* Requiring the suffix to match

<img src="/img/prefix-match.svg"/>

---

# Data structures

* The problem of matching substrings can be made more efficient by converting the strings into a specialized data structure.
* Two major categories of assembly algorithms/data structures:
  1. Overlap graphs
  2. de Bruijn graphs - memory efficient, scales better with data size.
* We're glossing over a lot of methodological detail here &mdash; if you want to know more, see Ben Langmead's [teaching materials](https://langmead-lab.org/teaching-materials/)

---

<img src="https://journals.plos.org/ploscompbiol/article/file?id=10.1371/journal.pcbi.1006994.g001&type=large" height="300px"/>

* A *contig* is a contiguous nucleotide sequence produced from overlapping reads.
* A *scaffold* is an arrangement of contigs based on mate-pairs that span the gap between adjacent contigs.

<small><small>
Image credit: Ghurye and Pop (2019). [Modern technologies and algorithms for scaffolding assembled genomes](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1006994).  PLOS Comput Biol 15: e1006994.
</small></small>


---

# Quality control

* Are the assembly contigs reliable?
* N50: when contigs are sorted by length, N50 is the length of the contig at which we reach 50% of assembled nucleotides; longer is better.

Sort contigs by lengths in decreasing order:
<img src="https://i1.wp.com/www.molecularecologist.com/wp-content/uploads/2017/03/Figure1a.jpg" height="45px"/>

Locate midpoint along concatenated array of contigs (N50=60):
<img src="https://i0.wp.com/www.molecularecologist.com/wp-content/uploads/2017/03/Figure1b.jpg" height="100px"/>

<small><small>
Image credit: E Videvall <i>et al.</i> https://www.molecularecologist.com/2017/03/whats-n50/
</small></small>

---

# Further readings

* [Viral pathogen discovery](https://www.sciencedirect.com/science/article/pii/S1369527413000684)
* [Experimental determination of translational start sites resolves uncertainties in genomic open reading frame predictions - application to Mycobacterium tuberculosis](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2897130/)
* [A highly abundant bacteriophage discovered in the unknown sequences of human faecal metagenomes](https://www.nature.com/articles/ncomms5498)
* [The Perils of Pathogen Discovery: Origin of a Novel Parvovirus-Like Hybrid Genome Traced to Nucleic Acid Extraction Spin Columns](https://jvi.asm.org/content/87/22/11966.short)

