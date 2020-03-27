# MIMM4750G
## RNA-seq
![](https://imgs.xkcd.com/comics/shadow_biosphere.png)

---

# Gene expression

* So far we have focused predominantly on genetic sequence variation.
* Biological diversity stems not only from our genomes, but how those genomes are "read".
* Next-generation sequencing has revolutionized how we measure differences in gene expression in response to disease and infection.
* Pathogen transcriptomes can be analyzed at the level of a single cell.

---

# Transcriptomics

* Characterizing gene expression through [messenger RNAs](https://en.wikipedia.org/wiki/Messenger_RNA).
* [Microarrays](https://en.wikipedia.org/wiki/Microarray) - hybridization of mRNAs to probes
* Sequencing - direct determination of mRNA sequence as [complementary DNA](https://en.wikipedia.org/wiki/Complementary_DNA) (cDNA)
* Next-generation sequencing of total RNA for high sensitivity, quantification.
  * Sample enrichment for mRNAs via [polyA tails](https://en.wikipedia.org/wiki/Polyadenylation).

---

# Splice junctions

* The boundaries between introns and exons
* [Alternative splicing](https://en.wikipedia.org/wiki/Alternative_splicing) - varying the exon composition to generate multiple mRNAs from the same transcript.
<img src="https://upload.wikimedia.org/wikipedia/commons/0/0a/DNA_alternative_splicing.gif" width="700px"/>
<small>
Image credit: National Human Genome Research Institute.
</small>

---

# Experimental design

* **Replication** is crucial for quantification and hypothesis testing on differential expression
* Paired-end and/or longer reads make it more easier to detect alternative splicing.
* **Read depth** (average read coverage) is the essential sample size for quantification.
* **Batch effects** can be reduced by a balanced distribution of samples across lanes and runs.

---

# Read alignment

* Mapping to genome
  * Mapper must be able to handle large gaps due to splicing.
* Mapping to transcriptome
  * Conventional "ungapped" mappers can be used, but annotated transcriptome may not be available.
* *de novo* transcriptome assembly
  * Assemble reads into transcripts.

---

# TopHat

<table>
  <tr>
    <td style="font-size: 20pt">
      <ul>
        <li>Uses Bowtie to map reads that do not overlap splice junctions.</li>
        <li>Uses Maq to assemble contigs from mapped reads as putative exons.</li>
        <li>Generates possible (GT-AG) splices between adjacent exons.</li>
        <li>Maps the unmapped reads to potential splices.</li>
      </ul>
      <small>
      Image credit: C Trapnell <i>et al.</i> (2009) <a href="http://doi.org/10.1093/bioinformatics/btp120">Bioinformatics 25: 1105</a>.
      </small>
    </td>
    <td width="45%">
      <img src="/img/btp120-f1.png"/>
    </td>
  </tr>
</table>

---

# TopHat2 pipeline

![](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4053844/bin/gb-2013-14-4-r36-6.jpg)
<small>
Image credit: D Kim <i>et al.</i> (2013) <a href="https://dx.doi.org/10.1186%2Fgb-2013-14-4-r36"/>Genome Biol 14: R36</a>.
</small>

---

<table>
  <tr>
    <td style="font-size: 20pt">
      <h1>Cufflinks</h1>
      <ul>
        <li>[Cufflinks](http://cole-trapnell-lab.github.io/cufflinks/) assembles a minimal set of transcripts and estimates abundances and tests for differential expression.</li>
        <li>Takes SAM/BAM alignment format as input.</li>
        <li>Optional input: reference genome annotation ([GFF](http://gmod.org/wiki/GFF3), generic feature format), ignoring novel transcripts</li>
        <li>Maps the unmapped reads to potential splices.</li>
      </ul>
      <small>
      Image credit: C Trapnell <i>et al.</i> (2009) <a href="https://doi.org/10.1038/nbt.1621">Nat Biotechnol 28: 511</a>.
      </small>
    </td>
    <td width="40%">
      <img src="https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fnbt.1621/MediaObjects/41587_2010_Article_BFnbt1621_Fig1_HTML.jpg"/>
    </td>
  </tr>
</table>

---

# The next Tuxedo

<table>
  <tr>
    <td style="font-size: 20pt; vertical-align: middle">
      <ul>
        <li>TopHat2/Cufflinks workflow superceded by HISAT/StringTie/Ballgown.</li>
        <li>Faster running time, lower memory requirements, greater accuracy</li>
      </ul>
      <img width="300px" src="https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fnprot.2016.095/MediaObjects/41596_2016_Article_BFnprot2016095_Fig5_HTML.jpg"/>
      <small>
      Image credit: M Pertea <i>et al.</i> (2016) <a href="https://doi.org/10.1038/nbt.1621">Nature Protocols 11: 1650</a>.
      </small>
    </td>
    <td width="37%">
      <img src="https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fnprot.2016.095/MediaObjects/41596_2016_Article_BFnprot2016095_Fig1_HTML.jpg"/>
    </td>
  </tr>
</table>

---

# *de novo* transcriptome assembly

* [Trinity](https://github.com/trinityrnaseq/trinityrnaseq/wiki) is a command-line program for *de novo* assembly of transcripts from RNA-seq data.
* *Inchworm* assembles reads into unique transcript sequences.
* *Chrhysalis* clusters contigs and constructs [de Bruijn graphs](http://slides.filogeneti.ca/html/mimm4750g-L18-assembly.html#/11) to partition the original read data.
* *Butterfly* processes each graph to reconstruct full-length alternate transcripts.

---

<img src="https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fnbt.1883/MediaObjects/41587_2011_Article_BFnbt1883_Fig1_HTML.gif" width="500px"/>

---

# Transcript discovery

* Unknown alternative splicing patterns, gene isoforms.
* Undocumented hypothetical genes
* [AUGUSTUS](https://github.com/Gaius-Augustus/Augustus): Gene prediction with alternative splicing based on a hidden Markov model.
* An extremely difficult problem!

---

# Quantification

* Estimated from the number of reads that map to a given transcript.
* Within-sample normalization adjusts for sequencing depth, transcript length.
* RPKM: reads per kilobase of exon model per million reads ($N$) normalizes read counts per sample.
$$\hat{\rho_t} \propto \frac{X_t}{\left(\frac{\tilde{l}_t}{10^3}\right) \left(\frac{N}{10^6}\right)}$$
* $X_t$ is number of reads mapped to transcript $t$
* $\tilde{l}_t$ is the number of possible read start positions in transcript $t$.

---

# Differential gene expression analysis

* Comparing expression levels among samples.
* Must use normalized expression levels to account for variation in depth among samples.
* The Poisson distribution models count outcomes for a rare event, *e.g.*, being kicked by a horse:

| Deaths / year / corp | 0 | 1 | 2 | 3 | 4 | 5+ |
|---------------|---|---|---|---|---|----|
| Prussian army | 144 | 91 | 32 | 11 | 2 | 0 |
| Poisson model | 143.1 | 92.1 | 33.3 | 8.9 | 2.0 | 0.6 |

<small>
Source: L von Bortkiewitsch (1898), <a href="https://digibus.ub.uni-stuttgart.de/viewer/object/1543508614348/36/"/>Das Gesetz der kleinen Zahlen, p. 24</a>.
</small>

---

# Overdispersion

* The Poisson distribution predicts the variance will equal the mean.
* Variation in read counts per gene tend to exceed the mean - they are overdispersed.
* The [negative binomial distribution](https://en.wikipedia.org/wiki/Negative_binomial_distribution) is more flexible, allows variance to exceed the mean.
  * Used by [DESeq2](https://bioconductor.org/packages/release/bioc/html/DESeq2.html) to model the number of reads in sample $j$ assigned to gene $i$.
  * Since not enough replicates to directly estimate variance parameter, DESeq uses local regression to smooth estimates.

---

# Volcano plots

<table>
  <tr>
    <td style="font-size: 20pt; vertical-align: middle">
      <ul>
        <li>Scatter plot of `$\log_2$` fold change in counts between conditions against the `$\log_{10}$` mean count.</li>
        <li>Colour marks genes with significant differential expression after adjustment for the [false discovery rate](https://en.wikipedia.org/wiki/False_discovery_rate).</li>
      </ul>
      <small>
      Image credit: Anders and Huber (2010) <a href="https://dx.doi.org/10.1186%2Fgb-2010-11-10-r106">Genome Biol 11: R106</a>.
      </small>
    </td>
    <td width="50%">
      <img src="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3218662/bin/gb-2010-11-10-r106-3.jpg"/>
    </td>
  </tr>
</table>

---

# Read counts are proportions

* Poisson and negative binomial distributions assume that counts are independent outcomes.
  * We are more interested in the proportions than the absolute numbers.
* [ALDEx2]() uses a multinomial Poisson transformation for read counts `$\mathbf{Y}=\{Y_1, Y_2, \ldots, Y_m\}$`.
* The multinomial distribution has probability $P(\mathbf{Y}) = \prod_i p_i^{y_i}$
* $p_i=\lambda_i \left/ \sum_j \lambda_j \right.$, where $\lambda_j$ is the Poisson rate parameter.

---

# Single-cell transcriptomics

<table>
  <tr>
    <td style="font-size: 20pt; vertical-align: middle">
      <ul>
        <li>Amplify mRNA from a single cell.</li>
        <li>Cells at different stages result in noisier transcriptomic data.</li>
        <li>Single-cell transcriptomes tend to have far fewer transcripts, but noisier because of weaker signal.</li>
        <li>New platforms can process thousands of individual cells simultaneously.</li>
      </ul>
      <small>
      Image credit: EZ Macosko <i>et al.</i> (2015) <a href="https://doi.org/10.1016/j.cell.2015.05.002">Cell 161: P1202.</a>.
      </small>
    </td>
    <td width="40%">
      <img src="https://marlin-prod.literatumonline.com/cms/attachment/cedc42c0-8b11-419e-9922-0f2f29d8bdf6/fx1.jpg"/>
    </td>
  </tr>
</table>

---

# Transcriptome of *H. pylori*

* *Helicobacter pylori* is helical bacteria that is found in the upper gastrointestinal tract of about half of all people.
* It is mostly asymptomatic but can cause gastric ulcers.

<img src="https://upload.wikimedia.org/wikipedia/commons/a/af/Immunohistochemical_detection_of_Helicobacter_%281%29_histopatholgy.jpg" width="400px"/>

<small>
Image credit: https://commons.wikimedia.org/wiki/User:KGH
</small>

---

# Complex gene expression in *H. pylori*

* Detected multipole categories of transcriptional start sites (TSS)
* Primary TSS: most cDNAs within 500nt upstream of annotated start codons.
<img src="/img/nature08756-venn.png" width="500px"/>

<small>
Image credit: CM Sharma <i>et al.</i> (2010) <a href="https://doi.org/10.1038/nature08756">Nature 464: 250</a>.
</small>

---

# Small non-coding RNAs

* 6S RNA was the first non-coding RNA to be identified.
* Regulator of $\sigma$ 70-dependent gene transcription - in *E. coli* regulates switch from exponential growth to stationary phase.
<img src="/img/nature08756-6SRNA.png" width="600px"/>
<small>
Image credit: CM Sharma <i>et al.</i> (2010) <a href="https://doi.org/10.1038/nature08756">Nature 464: 250</a>.
</small>


---

# Further readings

* [A survey of best practices for RNA-seq data analysis](https://doi.org/10.1186/s13059-016-0881-8)
* [Statistical Design and Analysis of RNA Sequencing Data](https://www.genetics.org/content/185/2/405)
* [Comparative analysis of RNA-Seq alignment algorithms and the RNA-Seq unified mapper (RUM)](https://academic.oup.com/bioinformatics/article/27/18/2518/180950)
* [Deciphering the Cryptic Genome: Genome-wide Analyses of the Rice Pathogen Fusarium fujikuroi Reveal Complex Regulation of Secondary Metabolism and Novel Metabolites](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3694855/)
