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

![]()
