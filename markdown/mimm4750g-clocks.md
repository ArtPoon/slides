# MIMM4750G
## Molecular clocks

![](https://imgs.xkcd.com/comics/estimating_time.png)

---

# Review

* The root is a hypothesis about the earliest point in time in a tree.
* There are several methods for estimating the placement of the root, including
  * Midpoint rooting
  * Outgroup rooting
  * Root-to-tip regression
  * More complex clock-based methods

---

# Problems with RTT

* RTT assumes that:
  * every point is an independent observation
  * the clock is constant (strict)
* Tips share common ancestry - the distance of a tip from the root is largely shared with neighbouring tips
* Not a reliable method for dating the root, but a decent rough estimate.
* A good, quick check to see if your data are "clock-like"

---

# SARS-CoV-2: When methods disagree

<small>
Clock-based methods tend to root on B clade, outgroup rooting tends to root on A.
</small>
<img src="/img/sc2-rooting.png" height="500px">

<small><small>
Figure from L Pipes <i>et al.</i> (2020) Assessing Uncertainty in the Rooting of the SARS-CoV-2
Phylogeny. <a href="https://academic.oup.com/mbe/advance-article/doi/10.1093/molbev/msaa316/6028993">Mol Biol Evol</a>, msaa316.
</small></small>

---

# What is a molecular clock?

<table>
  <tr>
  <td style="font-size: 18pt"><ul>
    <li>The molecular clock is a hypothesis that evolution at a molecular level (<i>e.g.,</i> proteins) occurs at a constant rate.</li>
    <li>Based on linear relationship between the time that species diverged from their common ancestor, and the number of amino acid differences in homologous proteins (<i>right</i>).</li>
    <li>The molecular clock does <i>not</i> "tick".</li>
  </ul></td>
  <td width="50%">
    <img src="/img/Dickerson.png"/>
  <small>Figure from RE Dickerson (1971) J Mol Evol 1: 26.</small>
  </td>
  </tr>
</table>


---

# Neutral theory

<table>
  <tr>
  <td style="font-size: 18pt"><ul>
    <li>The <a href="https://en.wikipedia.org/wiki/Neutral_theory_of_molecular_evolution">neutral theory</a>: "the great majority of evolutionary changes at the molecular level [...] are caused not by Darwinian selection but by random drift"</li>
    <li>Without selection, nucleotide substitutions should be a random process at a constant rate.</li>
    <li>Today, this model is denoted the "strict" clock and is seldom supported by sufficient data.</li>
  </ul></td>
  <td width="35%">
    <img src="https://www.genetics.org/content/genetics/202/4/1243/F1.medium.gif"/>
  <small>
  Motoo Kimura and James F. Crow
  <small>Image credit: Museum of Genetics, Federal University of Rio Grande do Sul, Brazil</small>
  </small>
  </td>
  </tr>
</table>

---

# Testing for a clock

<table>
  <tr>
  <td style="font-size: 18pt"><ul>
    <li>If a clock exists, then sequences should become more distant from the common ancestor as a <i>linear trend</i> over time.</li>
    <li>If the rate of evolution increases (decreases) over time, we expect this trend to be concave up (down).</li>
    <li>If the rate varies from one lineage to the next, the trend should be noisier.</li>
  </ul></td>
  <td width="55%">
    <img src="http://currents.plos.org/outbreaks/files/2014/04/EBOV_cds_mb_path.png"/>
  <small>
  Root-to-tip regression of a Bayesian tree for concatenated coding regions of Ebola virus.
  <small>Image credit: Dudas and Rambaut (2014) PLOS Currents Outbreaks</small>
  </small>
  </td>
  </tr>
</table>

---

# Clocks and trees

* When we reconstruct a tree by fitting a model of evolution, the lengths of branches are measured in units of *expected numbers of substitutions*.

* This weird unit exists because most models are scaled to $\mu\times t$ (the rate of evolution multiplied by time).

* We say that the rate and time are *confounded* - it is impossible to estimate one parameter without knowing the true value of the other.

---

# Confound it!

<img src="/img/timetree.png" width="500px"/>

* A tree can be stretched back in time ($\uparrow t$) and explain the data with *exactly the same likelihood* if we decrease the rate ($\downarrow \mu$).
* Conversely, if we compress the tree forward in time ($\downarrow t$), we obtain the same likelihood by speeding up the rate ($\uparrow \mu$).

---

# Estimating the clock

* For infectious diseases, measurable evolution can occur on a time scale of weeks.
* This means that a branch of the tree can "grow" in the time between sampling different infections.
<img src="/img/timetree-scaled.png" width="400px"/>
* We can use sampling times to "pin down" the tree and prevent the free-scaling problem.

---

> Why doesn't this approach of "pinning down" tips of a molecular phylogeny in time work for animals like humans? What is the alternative?

---

# Clocks on trees

* Fitting a clock model to a tree explicitly accounts for common ancestry of data
* The length of each branch estimates, $t$, can be directly estimated from dated tips or dated nodes ("fossil record").
* Strict clock assumes constant rate of evolution, $\mu$, throughout entire tree.

---

# Separation of SIV at end of last ice age
<img src="/img/bioko.png" width="750px"/>

<small><small>
M Worobey <i>et al.</i> (2010) Science 329. doi://10.1126/science.1193550
</small></small>

---

# Relaxing the clock

* Relax the strict clock by modeling how the rate changes along branches of the tree.
* Allowing every branch to have its own rate would create too many parameters!
* There are generally four categories of relaxed clocks:
  1. autocorrelated
  2. uncorrelated
  3. discrete multi-rate
  4. local multi-rate

---

# Autocorrelated clocks

* The clock rate is an evolving characteristic along the tree.
* Rate at branch $i$ is drawn from a distribution centered at the rate of the previous branch:

$$\mu_i \sim \mathcal{N}(\mu_j, \sigma^2 t)$$

<img src="/img/autocorrelated-clock.png" width="300px"/>

<small><small>
Image credit: S Ho and S Duchene (2014) Molecular Ecology, doi: 10.1111/mec.12953
</small></small>

---

# Uncorrelated clocks

* The clock rate of each branch is sampled from a continuous probability distribution, with parameters to estimate:

<table>
<tr>
  <td>Lognormal</td>
  <td>Gamma</td>
</tr>
<tr style="background-color: white;">
<td style="height: 350px">
<img src="https://upload.wikimedia.org/wikipedia/commons/4/46/Lognormal_distribution_PDF.png">
</td>
<td style="height: 350px">
<img src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Gamma_distribution_pdf.png"/>
</td>
</tr>
</table>

<small><small>
Source: WikiMedia Commons (CC-SA 3.0).
</small></small>

---

# Discrete multi-rate clocks

<table>
<tr>
<td>
  <ul>
    <li>A discrete clock model assumes there are $k$ rate categories and tries to assign each branch to one of them.</li>
    <li>Essentially an uncorrelated clock model without a parametric distribution &mdash; category rates are estimated from data.</li>
  </ul>
</td>
<td width="50%">
<img src="/img/discrete-clock.png"/>

  <small>
  Image credit: S Ho and S Duchene (2014) Molecular Ecology, doi: 10.1111/mec.12953
  </small>

</td>
</tr>
</table>

---

# Local multi-rate clocks


<table>
<tr>
<td>
  <ul>
    <li>A local clock model assumes there are $k$ rate categories that are clustered in different parts of the tree.</li>
    <li>The local clock was developed by Anne Yoder and Ziheng Yang&ast; to accommodate different evolutionary rates in mtDNA among mammalian species.</li>
  </ul>
</td>
<td width="50%">

<img src="/img/local-clock.png" width="450px"/>

<small>
Image credit: S Ho and S Duchene (2014) Molecular Ecology, doi: 10.1111/mec.12953
</small>

</td>
</tr>
</table>

<small><small>
&ast; Yoder and Yang (2000) Mol Biol Evol 17: 1081, https://doi.org/10.1093/oxfordjournals.molbev.a026389
</small></small>

---

# The origin of avian influenza virus

Using a host-specific local clock, origin precedes equine influenza outbreak.
<img src="/img/worobey-flu.png" width="450px"/>

<small><small>
Image credit: Worobey <i>et al.</i> (2014) Nature 508. https://doi.org/10.1038/nature13016
</small></small>

---

# Further readings

* [Molecular-clock methods for estimating evolutionary rates and timescales](https://onlinelibrary.wiley.com/doi/full/10.1111/mec.12953)
* [A synchronized global sweep of the internal genes of modern avian influenza virus](https://www.nature.com/articles/nature13016)
* [The Horse Flu Epidemic That Brought 19th-Century America to a Stop](https://www.smithsonianmag.com/history/how-horse-flu-epidemic-brought-19th-century-america-stop-180976453/)