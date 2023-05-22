# MBI 4750G
## Phylogeography

![](https://imgs.xkcd.com/comics/sea_chase_2x.png) 

---

# Review: Ancestral reconstruction

* Reconstructing ancestral states requires a model of evolution.
  * We already calculate the probabilities of different ancestral states when computing the likelihood of a tree.
* Maximum-likelihood and Bayesian methods tend to be more accurate than maximum parsimony.
  * For example, MP methods are biased when one or more character states (*e.g.*, nucleotides) are predominant.

<small><small>
Eyre-Walker, A. (1998). Problems with parsimony in sequences of biased base composition. Journal of Molecular Evolution, 47, 686-690.
</small></small>

---

# What is phylogeography?

* Reconstructing the location of ancestral lineages in space.
  * We use the phylogenetic tree to infer ancestral states.
* We assume that spatial location "evolves" along the tree
* Requires a model of spatial diffusion / migration
  * These models fall into discrete- and continuous-state categories.

---

# Maximum parsimony

* Since MP does not rely on a model of evolution, we can reconstruct whatever character states we want to.
* Dispersal-vicariance analysis (DIVA, Ronquist 1996) weights events differently.
  * Vicariance is the split of an ancestral range into two areas, with no cost.

<img src="/img/dispersal-vicariance.svg"/>

<small><small>
Ronquist F. Dispersal-vicariance analysis: a new approach to the quantification of historical biogeography. Systematic biology. 1997 Mar 1;46(1):195-203.
</small></small>

---

# Discrete migration models

* Partition the geographic range into discrete regions.
  * Each region becomes a character state.
  * Migration between regions represented by transition rate matrix.

<img src="/img/south-america-discrete.svg" height="300px"/>

---

# Partitioning space

* Geographic data are distributed in a continuous space.
* An areal unit is an artificially bounded region created by partitioning a larger area.
  * Areal units include countries, provinces, and municipalities.

<table>
  <tr>
    <td>
      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Carte_de_France.jpg" height="300px"/>
    </td>
    <td>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Carte_des_regions_naturelles_de_France.JPG/1105px-Carte_des_regions_naturelles_de_France.JPG" height="300px"/>
    </td>

  </tr>
</table>  

---

# The modifiable areal unit problem (MAUP)

* Many statistical methods require data points to be aggregated into groups.
* Statistical patterns in spatial data depend on how we have partitioned the space.
  * Our choice of areal units does not necessarily fit the data.
  * An association that is significant on one partition may be non-significant in another.

---

<table>
  <tr>
    <td style="vertical-align: middle">
      <h1>Example: NO<sub>2</sub> and COVID-19</h1>
      <ul>
        <li>Several studies reported an association between atmospheric NO<sub>2</sub> (nitrogen dioxide, an air pollutant) and COVID-19 mortality.</li>
        <li>You can obtain positive, negative, or non-significant associations depending on how you partition the geographic area.</li>
      </ul>
      <small>
      Image credit: Wang and Di (2020) Modifiable areal unit problem and environmental factors of COVID-19 outbreak.  Science of the Total Environment 740: <a href="https://www.sciencedirect.com/science/article/pii/S004896972033504X">139984</a>.
      </small>
    </td>
    <td width="45%">
      <img src="https://ars.els-cdn.com/content/image/1-s2.0-S004896972033504X-gr3_lrg.jpg"/>
    </td>
  </tr>
</table>

---

# Mutation + migration = mugration

* Migration between discrete regions is modeled as a continuous time Markov process, exactly like nucleotide / amino acid substitution models.
  * The simplest method is to reconstruct a tree from the genetic sequences, and then use letters to encode regions.
  * The [Mk model](https://lukejharmon.github.io/pcm/chapter7_introdiscrete/#section-7.3-the-mk-model) is analogous to the Jukes-Cantor model (equal rates, equal frequencies).

![](/img/q80k-geo.svg)

<small><small>
McCloskey <i>et al.</i> (2014) Global Origin and Transmission of Hepatitis C Virus Nonstructural Protein 3 Q80K Polymorphism. J Inf Dis 211(8): 1288-1295.
</small></small>

---

# Host species as discrete states

* Host populations may be accurately represented by discrete states.
* Some pathogens are short-lived outside of the host and unlikely to be transmitted from the environment.
  * *e.g.*, HIV-1 is transmitted by direct, intimate exchange of contaminated bodily fluids (blood, semen).
* Other pathogens are seldom transmitted between different host species because of host-specific adaptation.

---

# Example: Host insect orders for fungal pathogen *Beauveria*

<table>
<tr>
<td style="vertical-align: middle">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Beauveria_bassiana_16552.jpg/1280px-Beauveria_bassiana_16552.jpg" width="400px"/>
<small>
Cicada killed by <i>Beauveria</i> infection.  <a href="https://en.wikipedia.org/wiki/Beauveria#/media/File:Beauveria_bassiana_16552.jpg">Wikimedia Commons</a>.
</small>
</td>
<td>
<img src="https://media.springernature.com/full/springer-static/image/art%3A10.1007%2Fs11557-021-01761-1/MediaObjects/11557_2021_1761_Fig1_HTML.png" width="450px"/>
</td>
</tr>
</table>

<small><small>
Image credit: Kobmoo <i>et al.</i> (2022) Reconstruction of ancestral host association showed host expansion and specialization in local Beauveria species.  Mycological Progress 21: 215-219.
</small></small>

---

# Example: Bunyavirales

<table>
  <tr>
    <td style="vertical-align: middle;">
      <ul>
        <li>Bunyavirales is an order of (-)ssRNA viruses including species that can cause deadly hemorrhagic fever in humans.</li>
        <li>Infect a diversity of animal and plant hosts, often transmitted by insects.</li>
        <li>M Marklewitz <i>et al.</i> used maximum parsimony and ML methods to reconstruct host range as binary traits.</li>
        <li>By augmenting their data with cell culture experiments, they were able to reject a vertebrate host origin, implying this switch occurred multiple times.</li>
      </ul>
    </td>
    <td width="45%">
      <img src="/img/bunyavirales-host.png"/>
      <small>
      Image credit: M Marklewitz <i>et al.</i> (2015) Proc Natl Acad Sci USA 112: 7536-7541.
      </small>
    </td>
  </tr>
</table>

---

# Limitations of discrete migration models

* The modifiable areal unit problem - our results will change with different maps.
 
* We cannot model a new location &mdash; if we sampled infections from two regions, we cannot reconstruct their ancestor in a third, intermediate location.

* The number of rate parameters quadratically with the number of regions!

---

# Variable selection

* The number of migration rate parameters can be reduced by adding a probability that any of the rates is zero.
  * *i.e.*, what is the smallest number of non-zero migration rates that can explain the data?
* This method (Bayesian stochastic search variable selection, Lemey *et al.*, 2009) makes it feasible to reconstruct the ancestral location among a large number of sites!

<small><small>
Lemey <i>et al.</i> (2009) Bayesian Phylogeography Finds Its Roots.  PLOS Comput Biol 5(9): <a href="https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1000520">e1000520</a>.
</small></small>

---

# Example: The spread of influenza A virus H5N1

Phylogenies for hemagglutinin (HA) and neuraminidase (NA) genes, coloured by observed and estimated locations
<img src="/img/pcbi.1000520.g001.png">

<small><small>
Image credit: Lemey <i>et al.</i> (2009) Bayesian Phylogeography Finds Its Roots.  PLOS Comput Biol 5(9): <a href="https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1000520">e1000520</a>.
</small></small>

---

# Regression modeling of migration rates

* Lemey *et al.* (2014) later extended the BSSVS method to further reduce the number of migration rate parameters.
* Each non-zero rate is some function of a much smaller number of predictor variables:
$$\log(\Lambda_{ij}) = \sum_{k=1}^{P} \delta_k \beta_k X_{ijk} + \epsilon$$
where $\delta_k=0$ if the rate from $i$ to $j$ is zero.

* $X_{ij}$ can be any characteristic of sites $i$ and $j$, such as geographic distance or population sizes.

<small><small>
Image credit: Lemey <i>et al.</i> (2014) Unifying viral genetics and human transportation data to predict the global transmission dynamics of human influenza H3N2.  PLOS Pathog 10: <a href="https://journals.plos.org/plospathogens/article?id=10.1371/journal.ppat.1003932">e1003932</a>.
</small></small>

---

# Example: Spread of Ebola in 56 regions of West Africa

<div style="font-size: 16pt; font-weight: 500">Early dispersal events in Guinea (green), Sierra Leone (blue) and Liberia (red)</div>
<img src="/img/41586_2017_Article_BFnature22040_Fig1_HTML.jpg" height="500px">

<small><small>
Image credit: Dudas <i>et al.</i> (2017) Virus genomes reveal factors that spread and sustained the Ebola epidemic.  Nature 544: <a href="https://www.nature.com/articles/nature22040">309-315</a>.
</small></small>

---

# Example: Spread of SARS-CoV-2 VOCs in Africa

<div style="font-size: 16pt; font-weight: 500">(A) Time-scaled ML phylogeny.  (B-D) Summary of mugration reconstruction of viral spread.</div>
<img src="/img/science.abj4336-f2.jpg" height="500px"/>

<small><small>
Image credit: Wilkinson <i>et al.</i> (2021) A year of genomic surveillance reveals how the SARS-CoV-2 pandemic unfolded in Africa.  Science 374: <a href="https://www.science.org/doi/full/10.1126/science.abj4336">423-431</a>.
</small></small>

---

# Continuous migration models

* Since space is a continuous characteristic, why not use a continuous-state model of migration?
* Diffusion ([Brownian motion](https://en.wikipedia.org/wiki/Brownian_motion)) models assume a constant rate of random dispersal.

<img src="https://upload.wikimedia.org/wikipedia/commons/c/c2/Brownian_motion_large.gif"/>

---

# Brownian diffusion

* The probability of ending up at location $Y$ at time $t$, given that it starts at $X$ at time $s$, is described by a multivariate normal distribution centered on $X_s$:
$$P(Y | X, s) \propto \exp( - (X - Y)^T S^{-1} (X - Y) )$$
  where $S$ is a matrix containing $\sigma \times (t-s)$.
* These diffusion rates ($\sigma$) must be estimated from the data.

---

# Diffusion on trees

<div style="font-size: 16pt; font-weight: 500">In this example, the dispersal rate is allowed to vary among branches of the tree:</div>
<img src="/img/msab031f1.jpeg" width="600px"/>

<small><small>
Image credit: Dellcour <i>et al.</i> (2021) Relax, Keep Walking - A Practical Guide to Continuous Phylogeographic Inference with BEAST.  Mol Biol Evol 38: <a href="https://academic.oup.com/mbe/article/38/8/3486/6126413">3486-3493</a>.
</small></small>

---

# Reconstruction of dispersal

<table>
<tr>
<td>
  <ul>
  <li>If we can calculate the probability of migrating from $X$ to $Y$ on a branch of length $t$, we can reconstruct ancestral states.</li>
  <li>On the right, a simulated tree (solid black) has its root at location 0.</li>
  <li>Its descendants spread by random diffusion up to tips A-Z.</li>
  <li>The ancestral state reconstructions (white) have a very broad confidence interval (blue)!</li>
  </ul>
</td>
<td>
  <img src="/img/revell-diffusion.png"/>
  <small>
  Image credit: Liam J. Revell.  <a href="http://lukejharmon.github.io/ilhabela/assets/ancestral-states.pdf">Ancestral state reconstruction for discrete & continuous traits</a>
  </small>
</td>
</tr>
</table>

---

# Pros and cons

* Inferred migration routes can reach unsampled areas.
* More difficult to represent dispersal as a continuous process (*e.g.*, air travel).
* Continuous data are not always available (*e.g.*, GPS coordinates)
  * Must be estimated from discrete data, such as centroids.
* Movement through obstacles (*e.g.*, over bodies of water).

---

# Suggested readings

* [Toward a quantitative understanding of viral phylogeography](https://www.sciencedirect.com/science/article/pii/S1879625711001222)
* [Relax, Keep Walking - A Practical Guide to Continuous Phylogeographic Inference with BEAST](https://academic.oup.com/mbe/article/38/8/3486/6126413)
