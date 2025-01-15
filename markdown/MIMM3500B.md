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

# Where do new pathogens come from?

* HIV-1: origin about 1920 in central Africa
* Zika virus: first isolated 1947 in east Africa
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
* Use evolutionary methods to extrapolate from current genetic samples back in time.

---

# Phylogenies

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

<img src="/img/worobey.png" width=700px></img>

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

<img src="/img/HCV-Joy.png" width="700px"/>

<small>Figure from Joy *et al.* Lancet Inf Dis 16(6): 698-702.</small>

---

# Socioeconomic causes

* Analysis suggests that most baby boomers became infected when they were infants, not as young adults
* Shifts the health care burden from individuals to public agencies.

<img src="/img/marginalized.png" width="650px"/>

<small>Figure from Edlin (2011) Nature 474: 518-519.</small>

---

# What could have driven the 2014 Ebola outbreak?

* Past outbreaks associated with unusually dry conditions following the rainy season*
* Close contact with potential host species (fruit bats), bushmeat; environmental disruption from development.
* Dramatic population growth, urbanization in affected regions.
* Sustained armed conflict from 1989 to 2004; massive numbers of displaced refugees<sup>&dagger;</sup>

<small><small>
&ast; Pinzon <i>et al.</i> (2004) Am J Trop Med Hyg 71: 664-674.<br/>
&dagger; Alexander <i>et al.</i> (2015) PLOS Neglect Trop Dis 9(6): e0003652
</small></small>

---

# Phylogenetic reconstruction of EBOV outbreak

<video data-autoplay data-src="/img/ebola.mp4" type="video/mp4"></video>
<small><small>Supplementary video, Dudas <i>et al.</i> 2017, Nature 544.</small></small>

---

# Factors that spread and sustained EBOV epidemic

<table>
<tr>
<td width="60%">
<ul>
  <li>Only 5% of virus dispersals involved movement over 232 km.</li>
  <li>Strongly associated with population size - urbanization.</li>
  <li>No association with any of 17 vernacular languages (cultural links).</li>
  <li>Regions with more rainfall tended to have larger outbreaks.</li>
</ul>
</td>
<td>
  <img src="https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fnature22040/MediaObjects/41586_2017_Article_BFnature22040_Fig7_ESM.jpg" width="350px"/>
  <small><small>Dudas <i>et al.</i> 2017, Nature 544.</small></small>
</td>
</tr>
</table>

---

# Why has HIV-1 spread?

<table>
<tr>

<td width="50%"><ul>
<li>SIV-cpz (simian immunodeficiency virus, chimpanzee) has crossed over into human populations multiple times</li>
<li>Why did this particular strain originate the global pandemic?</li>
<li>Urbanization: "founding of colonial administrative and trading centres"</li>
</ul></td>

<td><img src="/img/faria.png"/></td>

</tr>
</table>

<small><small>Figure from Faria *et al.* The early spread and epidemic ignition of HIV-1 in human populations. Science 346: 56-51.</small></small>

---



---

# Evidence for multiple zoonotic origins of SARS-CoV-2

Probability of phylogenetic structures arising from a single introduction of SARS-CoV-2 in epidemic simulations.
<img src="/img/science.abp8337-f2.jpg"/>

<small><small>
Image source: JE Pekar <i>et al.</i> (Jul 2022). The molecular epidemiology of multiple zoonotic origins of SARS-CoV-2.  Science 377: 960-966.
</small></small>
