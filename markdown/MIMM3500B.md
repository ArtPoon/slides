# MICROIMM 3500B
## Evolution: Understanding the origin of pathogens
### Art Poon

Departments of Pathology & Laboratory Medicine<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Microbiology & Immunology<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Computer Science<br/>

<img src="/img/UWO_Logo.svg" height="100px"/>

---

# Where do new pathogens come from?

* HIV-1: origin about 1920 in central Africa
* Zika virus: first isolated 1947 in east Africa
* Ebola virus: first isolated in 1976; [western Africa outbreak](https://en.wikipedia.org/wiki/Western_African_Ebola_virus_epidemic) in 2014
* SARS-CoV-2: ongoing, first isolated December 2020.

<img width=350px src="https://ichef.bbci.co.uk/news/660/cpsprodpb/1320E/production/_110505387_059086447.jpg"/>
<small>Image credit: AFP</small>

---

# How to we reconstruct the origin of pathogens?

* Addressing these questions in a data-driven, quantitative framework.
* We usually don't have samples from the start of an outbreak.
* Use evolutionary methods to extrapolate from current genetic samples back in time.

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

# Phylogenies

* A phylogeny is a tree-based model of how populations are related by their common ancestors.
* The *root* represents the earliest time point in the tree.

<iframe style="display:block; margin: auto;" width="800" height="500" src="/include/rooting.html">
</iframe>

---

# Oral polio vaccine hypothesis

<table>
<tr>
<td width="60%">
<ul>
  <li>Live-attenuated polio vaccine cultured in non-human primate cells</li>
  <li>In 1992, <i>Rolling Stone</i> magazine published a story alleging that contaminated OPV was responsible for spreading HIV-1</li>
  <li>Since thoroughly refuted by experimental and phylogenetic analysis.</li>
  <li>Allegations disrupted vaccination campaigns, failure to eliminate polio</li>
</ul>
</td>
<td>
  <img src="/img/OPV.png" width=250px/>
</td>
</tr>
</table>

<small><small>
Excerpts from Worobey <i>et al.</i> (2004) Nature 428
</small></small>

---

# Scaling trees in time

<img src="/img/timetree.png" width=600px/>
<hr>
<img src="/img/timetree-scaled.png" width=400px/>

---

<img src="/img/worobey.png" width=700px></img>

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

# Rapid determination of SARS-CoV-2 origin

<img src="/img/sarscov2-origin.jpg" height="500px"/>

<small><small>
Image credit: R Lu <i>et al.</i> (Feb 2020).  Genomic characterisation and epidemiology of 2019 novel coronavirus: implications for virus origins and receptor binding.  Lancet 395: 565-574.
</small></small>

---

# Nextstrain: Real-time tracking of the pandemic

<img src="/img/nextstrain-namer.png" height="500px"/>
