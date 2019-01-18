# Evolution:
## Understanding the origin of pathogens
### Art Poon
Department of Pathology & Laboratory Medicine; Microbiology & Immunology; Applied Mathematics
![](/img/UWO_Logo.svg)

---

# Microbes are everywhere
* Roughly half of the cells in your body are bacteria*
* Probably about<sup>&dagger;</sup> as many viruses as cells (including bacteriophages)
* Little known about single-celled eukaryotes
* Herpes simplex virus infects about two-thirds of all people
* New human viruses are constantly being discovered: *e.g.,* Torque teno virus, described in 1997, infects about 90% of all people

![](/img/xkcd-viruses.png)

<small>* Sender, Fuchs and Milo (2016) PLOS Biology 14: e1002533<br/>
<sup>&dagger;</sup> give or take a few orders of magnitude<br/>
Image by <a href="https://what-if.xkcd.com/80/">Randall Munroe</a>.
</small>

---

# Why are some microbes pathogenic?

<table><tr>
  <td width="50%"><ul>
  <li>Pathogenicity: the capacity of a microbe to cause disease.</li>
  <li>Virulence* may be a evolutionary adaptation (horizontal vs. vertical transmission)</li>
  <li>Or is pathogenicity a maladaptation; a side-effect of spill-over from natural host species?</li>
  </ul></td>
  <td><img src="/img/virulence.png" width="650px"/></td>
</tr></table>

<small>* Degree of pathogenicity<br/>
Figure based on [infographic](https://informationisbeautiful.net/visualizations/the-microbescope-infectious-diseases-in-context/) by David McCandless</small>

---

# Origin scenarios

* Endemic microbe becomes pathogenic due to novel mutation(s).
* Exposure to microbes from another host (*e.g.*, soil, bats).
* Human modification of the environment, novel interactions between human and other species. Domestication of animals.
<img src="/img/land_mammals.png" width="420px"/>


---

# Old pathogens

* *Helicobacter pylori* in humans dates to roughly 100,000 years ago*
* Endogenous retroviruses make up ~8% of human genome (exceeds protein-coding gene content!)
* Origin of the placenta: capture of retrovirus envelope gene to induce formation of giant syncytia<sup>&dagger;</sup>

<small>* Moodley *et al.* (2012) PLOS Pathog 8(5): e1002693<br/>
&dagger; Mi *et al.* (2000) Nature 403: 785-789.</small>


---

# New (emerging) pathogens

* HIV-1: origin about 1920 in central Africa
* Zika virus: first isolated 1947 in east Africa
* Ebola virus: first isolated in 1976, multiple introductions into human population
<img src="/img/emergingID-world.png" width=700px/>
<small>Image from [Understanding Emerging and Re-emerging Infectious Diseases](https://www.ncbi.nlm.nih.gov/books/NBK20370/), National Institutes of Health.</small>

---

# What drove the 2014 Ebola outbreak?

* Past outbreaks associated with unusually dry conditions following the rainy season*
* Close contact with potential host species (fruit bats), bushmeat; environmental disruption from development.
* Dramatic population growth, urbanization in affected regions.
* Sustained armed conflict from 1989 to 2004; massive numbers of displaced refugees<sup>&dagger;</sup>

<small>
\* Pinzon <i>et al.</i> (2004) Am J Trop Med Hyg 71: 664-674.<br/>
&dagger; Alexander *et al.* (2015) PLOS Neglect Trop Dis 9(6): e0003652
</small>

---

# Ebola virus outbreak in West Africa

<video data-autoplay data-src="/img/nature22040-sv1.mp4" type="video/mp4"></video>
<small><small>Supplementary video, Dudas <i>et al.</i> 2017, Nature 544.</small></small>

---

# Reconstructing the past

* Addressing these questions in a data-driven, quantitative framework.
* We usually don't have samples from the start of an outbreak.
* Use evolutionary methods to extrapolate from current genetic samples back in time.

---

# Phylogenies

* A phylogeny is a tree-based model of how populations are related by their common ancestors
<img src="/img/phylogeny.png" width="500px"/>

---

<section data-state="markov-slide">
    <h2>Modeling evolution</h2>
    <ul>
      <li>Change between nucleotide states at constant rates over time.</li>
      <li>Enables us to calculate the likelihood of a tree from observed sequences.</li>
    </ul>
    <div id="markovchain" class="fig-container"
         data-fig-id="fig-markov"
         data-file="/include/markov-chain.html"
         style="height:300px">
    </div>
    <small><small>Animation adapted from <a href="http://setosa.io/blog/2014/07/26/markov-chains/index.html">Setosa blog</a> JavaScript</small></small>
</section>

---

<section data-state="numtrees-slide">
    <h1>How many trees?</h1>
    <ul>
      <li>There are an enormous number of possible trees relating even a small number of species!</li>
    </ul>
    <div id="howmany" class="fig-container"
         data-fig-id="fig-howmany"
         data-file="/include/numtrees.html"
         style="height:150px">
    </div>
    <ul>
      <li>There are about 7.5&times;10<sup><small>18</small></sup> grains of sand on the planet.</li>
      <li>There are about 10<sup><small>80</small></sup> atoms in the universe.</li>
    </ul>
</section>

---

# Maximum likelihood

* A Markov model of evolution enables us to calculate the likelihood that 2 sequences are related by a branch of time $t$.
* Attempt to find the tree that maximizes the likelihood of the evolutionary model.
* Integrate over all possible ancestral sequences.
* Many software programs for doing this: *e.g.,* [RAxML](https://cme.h-its.org/exelixis/web/software/raxml/index.html), [PhyML](http://www.atgc-montpellier.fr/phyml/), [MEGA](https://www.megasoftware.net/).

---

# Origins of HIV-1

<img src="/img/HIV-tree.png" width=500px/>

<small><small>Modified from Joy *et al.* (2015) Origin and Evolution of Human Immunodeficiency Viruses. <u>Global Virology I.</u> Springer, New York.</small></small>

---

# Oral polio vaccine hypothesis

<table>
<tr>

<td width="60%"><ul>
<li>Live-attenuated polio vaccine cultured in non-human primate cells</li>
<li>In 1992, <i>Rolling Stone</i> magazine published a story alleging that contaminated OPV was responsible for spreading HIV-1</li>
<li>Since thoroughly refuted by experimental and phylogenetic analysis.</li>
<li>Allegations disrupted vaccination campaigns, failure to eliminate polio</li>
</ul></td>

<td><img src="/img/OPV.png" width=250px/></td>

</tr>
</table>

<small>Excerpts from Worobey *et al.* (2004) Nature 428</small>

---

# Timing origins

* Learn about the origin of pathogens by determining *when* they originated, expanded.
* Not much of a fossil record for viruses or bacteria.
* Microbes evolve quickly - we can extrapolate to the past if we have samples from different points in time.

<img src="/img/pithovirus.jpg" width="250px"/>
<small>False color image of <i>Pithovirus sibericum</i> from 30,000yo sample</small>

---

# Scaling trees in time

<img src="/img/timetree.png" width=600px/>
<hr>
<img src="/img/timetree-scaled.png" width=400px/>

---

<table>
<tr>
    <td><img src="/img/korber-title.png" width=500px></img></td>
</tr>
<tr>
    <td><img src="/img/korber-fig1.png" width=400px></img></td>
    <td><img src="/img/bette-korber.png"></img></td>
</tr>
</table>

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

# Origin of pathogens - increasing prevalence

* An emerging infectious disease can be:
  1. a disease that has not occurred in humans before, or;
  2. a disease that had previously occurred only in small numbers, and in isolated sites.
* How can we reconstruct the prevalence of a disease in recent human history?
* Case records susceptible to sampling bias.

---

# The coalescent

<table>
<tr>
  <td width="66%"><ul>
    <li>The shape of the phylogeny contains information about the historical number of infections.</li>
    <li>Assume that every infection is equally likely to be transmitted to the next host.</li>
    <li>The coalescent model describes how far back in time we have to go until we reach the common ancestor of sampled lineages.</li>
  </ul></td>
  
  <td><img src="/img/strengths_and_weaknesses.png" width="auto"/></td>
</tr>
</table>

<small><small>Image credit: <a href="http://xkcd.com/1545">xkcd.com</a>, Randall Munroe</small></small>

---

<section data-state="coalescent-slide">
    <h1>The coalescent</h1>
    <div id="coalescent" class="fig-container"
         data-fig-id="fig-coalescent"
         data-file="/include/coaltrace.html"
         style="height:450px">
    </div>
    <small><small><a href="http://bedford.io/projects/coaltrace/">coaltrace</a> by Trevor Bedford</small></small>
</section>

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

# Core concepts

<small>
<ul>
<li>Many pathogen origins due to agriculture, urbanization.</li>
<li>We can use phylogenies to reconstruct origins and epidemic expansion.</li>
<li>There are enormous numbers of possible trees.</li>
<li>HIV crossed over multiple times. </li>
<li>Global pandemic did not originate from contaminated oral polio vaccine.</li>
<li>HIV pandemic originated in Central Africa about 1920. </li>
<li>The shape of a phylogeny contains information about past population growth (coalescent).</li>
<li>HCV epidemics tend to originate from iatrogenic causes.</li>
</small>

