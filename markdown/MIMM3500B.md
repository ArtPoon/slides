# MICROIMM 3500B
## Evolution: Understanding the origin of pathogens
### Art Poon

<small><small>
Department of Pathology & Laboratory Medicine<br/>
Department of Microbiology & Immunology<br/>
Department of Computer Science<br/>
</small></small>

<img src="/img/UWO_Logo.svg" height="100px"/>

---

# Emerging infectious diseases

* HIV-1: origin about 1920 in central Africa
* Ebola virus: first isolated in 1976; [western Africa outbreak](https://en.wikipedia.org/wiki/Western_African_Ebola_virus_epidemic) in 2014
* SARS-CoV-2: ongoing, first isolated December 2020.

<img width=320px src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Covid-19_SP_-_UTI_V._Nova_Cachoeirinha.jpg/1024px-Covid-19_SP_-_UTI_V._Nova_Cachoeirinha.jpg"/>

<small><small>
Image credit: Gustavo Basso, WikiMedia Commons (CC BY-SA 4.0)
</small></small>

---

# How do we reconstruct the origin of a novel pathogen?

* When did the pathogen enter the human population?  What host species did it come from?  Where did it happen?  What were the risk factors?
* Address these questions in a data-driven, quantitative framework.
  * Conspiracy theories are not science.
* We usually don't have samples from the start of an outbreak.
  * Sometimes we don't even have samples for decades after the origin!

---

<div style="text-align: center; font-weight: 900; font-size: 48pt; line-height: 1em;">
We can use phylogenetic methods to extrapolate from current genetic samples back in time.
</div>

---

# What are phylogenies?

* A phylogeny is a tree-based model of how populations are related by their common ancestors.
* Each infection is represented by a tip **nodes** in the tree.
* **Branches** connect nodes to their common ancestors.
  * The length of a branch represents how much evolution separates an ancestor from its descendant.
* A **clade** contains all descendants of a given ancestral node.

---

<img src="/img/sarscov2-origin.jpg" height="550px"/>

<small><small>
Image credit: R Lu <i>et al.</i> (Feb 2020).  Genomic characterisation and epidemiology of 2019 novel coronavirus: implications for virus origins and receptor binding.  Lancet 395: 565-574.
</small></small>

---

# Using trees to debunk a conspiracy theory

<table>
<tr>
<td width="60%">
<ul>
  <li>Live-attenuated oral polio vaccine (OPV) was cultured in non-human primate cells</li>
  <li>In 1992, <i>Rolling Stone</i> magazine published a story alleging that OPV contaminated by SIVcpz from the Kisangani region was responsible for spreading HIV-1.</li>
  <li>SIVcpz from Kisangani are in a separate clade than HIV-1 and SIVcpz from the western region (right).</li>
  <li>Allegations disrupted vaccination campaigns to eliminate polio.</li>
</ul>
</td>
<td style="vertical-align: middle;">
  <img src="/img/OPV.png" width=250px/>
  <small><small>
Figure from Worobey <i>et al.</i> (2004), depicting SIVcpz sampling sites 
</small></small>
</td>
</tr>
</table>

---

The *root* represents the earliest time point in the tree.

<iframe style="display:block; margin: auto;" width="100%" height="500" src="/include/rooting.html">
</iframe>

---


One way to estimate the position of the root is to fit a molecular clock model to the data.


<div id="containerRTT">
<iframe width="992" height="500" scrolling="no" src="/include/rtt.html">
</iframe>
</div>

---

Early findings on the rapid global spread of SARS-CoV-2 (left) and estimated origin date and rate of evolution (right)
<img src="/img/rambaut-virological.png" height=500/>

<small><small>
Image credit: Andrew Rambaut (6 Mar 2020) <a href="https://virological.org/t/phylodynamic-analysis-176-genomes-6-mar-2020/356">Phylogenetic analysis of nCoV-2019 genomes</a>.  https://virological.org
</small></small>

---


# Reconstructing epidemic growth

* We can estimate how population size (number of infections) has changed over time.
* *e.g.,* An exponentially-growing epidemic results in a different tree:


<img src="/img/coalescent.png" width="500px"/>

---

# Hepatitis C virus in Egypt

* About 15% of adult population infected by HCV genotype 4
* Coalescent reconstructed found epidemic growth associated with massive public health campaign against snail fever.

<img src="/img/egypt.svg"/>

---

# Hepatitis C virus in North America

* HCV is highly prevalent in the "baby boomer" generation
* Why?  Unsafe sex practices, experimenting with drugs?
* Who will pay for new treatments that cost $10,000's of dollars?

<table><tr>
  <td><img src="/img/poster-chalkboard8.5x11.jpg" width="300px"/></td>
  <td><img src="/img/GenHep.png"/></td>
</tr></table>

---

<img src="/img/HCV-Joy.png" width="650px"/>

<small>Figure from Joy *et al.* Lancet Inf Dis 16(6): 698-702.</small>

---

# Mapping trees to space

* We can use information on *when* infections were sampled to date the root of the tree.
  * The root is not necessarily the origin, but it is close!
* If we know *where* infections were sampled, then we may be able to place the root in space.
  * Requires a sufficiently accurate model of how lineages moved over time.
* This is known as *phylogeography*.

---

# A more detailed look into the history of HIV-1

<table>
<tr>
<td width="50%"><ul>
<li>Phylogeography confirmed Kinshasa as the most likely "epicenter" for HIV-1 group M.</li>
<li>Dispersal from Kinshasa was predominately along transportation networks (waterways, railways) to other urban centers.</li>
</ul></td>

<td><img src="/img/faria.png"/></td>

</tr>
</table>

<small><small>Figure from Faria *et al.* The early spread and epidemic ignition of HIV-1 in human populations. Science 346: 56-51.</small></small>

---

# Phylogeography of the 2014 Ebola outbreak

<video data-autoplay data-src="/img/ebola.mp4" type="video/mp4"></video>

<small><small>Supplementary video, Dudas <i>et al.</i> 2017, Nature 544.</small></small>

---


<section data-background="#333" style="color:white">

<h1 style="color:white">Key points</h1>

* A phylogeny is a tree that links populations in the present day to their ancestors in the past.
* We can use phylogenies to extrapolate back in time to the origin of an epidemic.
  * We can reconstruct the *When*, *Where*, and *Why* of an emerging infectious disease.
* This requires an interdisciplinary understanding of statistics, computer programming, evolution and epidemiology
  * or just take MBI 4750G!

</section>