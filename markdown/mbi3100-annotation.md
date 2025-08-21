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

### Nucleotide-level annotation
# Gene finding

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
# Gene finding: Splicing

* Gene finding in longer genomes is also complicated by 

---

<section data-background="#333" style="color:white">

<h1 style="color:white">Key points</h1>

* test

</section>