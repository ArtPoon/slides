### CanCOGen-VirusSeq Data Analytics
## CoVizu: Rapid analysis and visualization of global SARS-Cov-2 genomic diversity

#### Art Poon
### Western University

<small>
Departments of Pathology & Laboratory Medicine; Computer Science; Applied Mathematics; Microbiology and Immunology
</small>

<small><small>
<br/>
Slides published at http://slides.filogeneti.ca/html/BIRS2020-Poon.html
</small></small>

---

# Rapid accumulation of genome data

* First complete genome sequence released January 10<sup>th</sup>.
* Presently about 200,000 genome records in GISAID

<table><tr>
<td style="vertical-align: middle;"><img src="/img/gisaid-dates.svg" height="400px"/></td>
<td><img src="/img/gisaid-delays.svg" height="400px"/></td>
</tr></table>

---

# Evolutionary characteristics

* Roughly 30,000 nt in length
* Discernable molecular clock, about 2 sub/month (comparable to HIV-1!)
* Time scale of evolution longer than epidemiological time scale
  * Many identical genomes.
* Unfavourable signal to noise ratio (diversity versus sequencing error)

---

# Challenges for phylogenetics

* Enormous amounts of data
  * Tree space increases super-exponentially with sample size.
* Short epidemiological time scale &hairsp;&#8658;&hairsp; most infections differ by zero to one substitutions from source.
  * Extensive polytomies (unresolved internal nodes in tree)
  * Exacerbated by missing data.

---

# nextstrain

* Originally developed by [Trevor Bedford](https://bedford.io/team/trevor-bedford/) and [Richard Neher](https://www.biozentrum.unibas.ch/research/researchgroups/overview/unit/neher/) as *nextflu*, a tracking system for influenza A virus data (2015).
<img src="https://pbs.twimg.com/media/Em0h3L1VQAAwThZ?format=png" height="400px"/>

---

# Impacts of nextstrain

* Already recognized during EBOV outbreak in West Africa
  <img src="https://pbs.twimg.com/media/C5w6N5vWQAAfcQp?format=jpg&name=medium" height="200px"/>
* Important role in science communication, visually striking web-interface.
* Early evidence of SARS-CoV-2 human-to-human transmission.

---

# Limitations of phylogenies as viz. tools

* Displaying a single time-scaled tree is misleading:
  * uncertainty around topology (clade support)
  * uncertainty of time scaling, *e.g.*, age of internal nodes
* Heavy culling of data to be computationally tractable (limit of ~3,000 tips)
* Difficult to visualize how often the same sequence has been sampled over time.

---

# Objectives

* Monocultures are bad &mdash; we need more tools!
  * More visualization methods (all have different strengths and weaknesses)
* We would like to process and visualize 100,000s of samples.
* Enable users to browse genomes in a global context.
* Open source from the start
  * First commit April 7, one deprecated 100 line script.

---

# Initial concept: visuals

* Lots of whiteboard and scrap paper sketches

<img src="https://user-images.githubusercontent.com/1109328/81074174-9f897800-8eb6-11ea-9eaa-b0beeabed5e2.png" height="400px"/>

---

# Beadplots

<img src="/img/beadplot.png" height="300px8"/>

* Variants are represented by horizontal line segments
* Beads indicate samples from a particular date

---

# Database

* Daily queries for new records from GISAID to local sqlite3 database

<img src="/img/covizu-db-seq.png" height="275px"/>

---

# Sequence alignment

* Multiple alignment is prohibitively time-consuming.
* Pairwise alignment to a reference and discarding insertions is *de facto* standard.
* We use a Python wrapper with *minimap2* to align roughly 1,600 genomes/second.

<img src="/img/minimap2.png" height="167px"/>

---

# Genome encoding

* Instead of working with aligned sequences, we extract all differences from a reference genome from *minimap2* output stream as *feature subsets*.
  * Highly compact representation of genome (~10 features versus 30,000 nt).
  * Retain all insertion and deletions in addition to substitutions.
* Similar to mutation annotation of tree strategy by [Yatish Turakhia](https://github.com/yatisht/usher) (UShER, UCSC).

---

# Data cleaning

<table>
<tr>
<td>
<ul>
<li>We set a low tolerance for uncalled bases (<300 <tt>N</tt>s).</li>
<li>Exclude problematic sites as defined by <a href="https://github.com/W-L/ProblematicSites_SARS-CoV2">VCF file</a> maintained by <a href="https://www.ebi.ac.uk/research/goldman">Nick Goldman's group @EBI</a>.</li>
<li>Exclude sequences with excessive divergence given collection date (right), assuming molecular clock of <tt>0.0655</tt> subs/yr and <tt>2019-12-01</tt> T<sub>MRCA</sub>.</li>
</ul>
</td>
<td style="width: 45%">
<img src="https://user-images.githubusercontent.com/1109328/95021105-0a450800-063d-11eb-9e90-0a4e0f76c382.png"</li>
<small><small>
Upper and lower 95% quantiles (dashed, Poisson) around clock expectation (solid) and observed numbers of genetic differences (points) in SARS-CoV-2 genomes.
</small></small>
</td>
</tr>
</table>

---

# Lineage classification

* Discarded our clustering analysis for [Pangolin](https://github.com/cov-lineages/pangolin/) as emerging consensus.
* Modified Python script `pangolearn.py` to increase performance (~50x) and reduce memory consumption (<8GB).
  * [Pull request](https://github.com/cov-lineages/pangolin/pull/91) accepted by cov-lineages dev team.

<img src="https://github.com/cov-lineages/pangolin/raw/master/docs/logo.png" height="200px"/>

---



<table>
  <tr>
    <td style="vertical-align: middle;">
      <h1>Build time-scaled tree</h1>
      <ul>
        <li>Select representative genomes for all lineages (n=263; pass filters, most recent sample).</li>
        <li>Run <a href="http://www.microbesonline.org/fasttree/">FastTree2</a> on MSA and rescaled with <a href="https://github.com/neherlab/treetime">TreeTime</a>.</li>
      </ul>
      <img src="/img/sc2-rtt.svg" height="250px"/>
    </td>
    <td width="50%">
      <img src="/img/sc2-tree.svg" height="600px"/>
    </td>
  </tr>
</table>


---

# Genetic distances (within lineage)

* Assume all differences are equally likely to occur
  * Ignore multiple hits!
  * Not enough data to quantify rate variation among sites.
  * Not an awful assumption at this point of pandemic.
* Compute [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference) between feature subsets.
  * *e.g.*, {1,4,128} &Delta; {4,37,89} = {1,37,89,128}
  * Use integer indices for features.
  * Merge genomes with identical feature subsets.
  * Write output to temporary file to reduce RAM usage.

---

# Bootstrapping

* Sample the feature set union at random with replacement, 100 times.
* Apply the resulting feature weights to symmetric difference matrix.
  * Yields integer-valued pairwise distance matrix.
* Write to file as input for neighbor-joining tree reconstruction with [RapidNJ](https://birc.au.dk/software/rapidnj/).
* Currently the rate limiting step, using Python `multiprocessing` module.

---

# Generate consensus trees

* 100 bootstrap NJ trees for every lineage
* BioPython's `majority_consensus` function is slow and wrong!
  * Had to code my own function (33x faster).

<table>
  <tr>
    <td>
      BioPython
      <img src="https://user-images.githubusercontent.com/1109328/97740083-1a72ca80-1ab7-11eb-9832-1cb67abaa77a.png" width="250px"/>
    </td>
    <td>
      CoVizu
      <img src="https://user-images.githubusercontent.com/1109328/97740037-09c25480-1ab7-11eb-836e-526f8916181e.png" width="250px"/>
    </td>
    <td>
      ML
      <img src="https://user-images.githubusercontent.com/1109328/97748535-fc5f9700-1ac3-11eb-89ac-e52494142a3c.png" width="250px"/>
    </td>
  </tr>
</table>

---

# Convert consensus trees to beadplot data

* Collapse tips with mean branch length <0.5.
  * Use to label internal nodes.
* Collect collapsed polytomies into variants.
* Unlabeled internal nodes are unsampled variants.

<img src="/img/tree2beadplot.png" height="200px"/>

---

# Front-end

