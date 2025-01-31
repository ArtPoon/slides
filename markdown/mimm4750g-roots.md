# MIMM4750G
## Roots

![](https://imgs.xkcd.com/comics/dendrochronology.png)

---

# Phylogenies can be rooted or unrooted.
* The root is a hypothesis about what point on the tree represents the earliest
time.
* Just because a tree is presented in a left-to-right (*e.g.*, rectangular) layout does *not* mean that it is rooted!
* The choice of which node is furthest to the left is completely arbitrary.

---

# How to spot unrooted trees

<table>

<tr>
<td>Rectangular</td><td>Polar/circular</td>
</tr>

<tr>
<td>
<img src="/img/unrooted-rect.svg" height="300px"/>
</td>
<td width="50%">
<img src="/img/unrooted-circular.svg"  height="300px"/>
</td>
</tr>

<tr>
<td>Left-most node has three descendant branches.</td>
<td>Inner-most node (drawn as an arc) has three descendants.</td>
</tr>

</table>

This won't work if the left/inner node is a polytomy!

---

Unrooted and rooted trees relating Ebola virus sequences
<iframe style="width: 1000px; height: 500px" src="/include/rooting.html">
</iframe>
<small><small>
Try clicking and dragging the yellow node around.
</small></small>

---

# Neighbor-joining trees are unrooted

* Recall from a [previous lecture](https://slides.filogeneti.ca/html/mimm4750g-L04-njoin.html#/) that neighbor-joining (NJ) progressively merges clusters (agglomerative clustering).
* NJ stops when none of the clusters contain only one tip node.
* Every internal node in the resulting tree has a degree of 3 edges.
* There is no node that represents a root.

---

# Maximum likelihood trees are (usually) unrooted

* Most substitution models that we fit to aligned sequences in order to build trees are *time reversible*:
$$P_{ij}(t)\pi_j = P_{ji}(t)\pi_i$$
* This is a convenient property because the likelihood of the tree is unaffected by the placement of the root.
* It is possible to use a non-reversible model to determine optimal placement of the root, but this requires skewed substitution rates!

---

# Rooting trees is difficult!

* By definition, it is the point that is the most distant in time &mdash; it is the point that we have the *least* direct information about.
  * The root is essentially never directly observed.
  * *e.g.*, SARS-CoV-2 may be the closest we've ever been to sampling the root.
* The root may appear at any point along the length of the entire tree.

---

# Midpoint rooting

* Determine the longest tip-to-tip path (patristic distance) in the unrooted tree.
  * The midpoint is halfway along that path.
  * Credited to [James Farris](https://www.journals.uchicago.edu/doi/abs/10.1086/282802) (1972), who studied the origins of life.
* Presumably, we use the longest patristic distance to minimize random variation.

<img src="https://www.mun.ca/biology/scarr/Panda_problem_midpoint_rooting.jpg" width="400px"/>

<small><small>
Image credit: Steven M. Carr (Memorial University), https://www.mun.ca/biology/scarr/Panda_midpoint_rooting.html
</small></small>

---

# Pros and cons with midpoint rooting

* No additional information necessary!  Fast.
* Assumes a constant rate of evolution. Requires sufficient divergence from root.
* Does not use any information about *when* the sequences were sampled.
  * Midpoint may be placed along branch to the most recent sequence.

---

Example: Early mid-point rooted tree of SARS-CoV-2

<img src="/img/sc2-midpoint.png" width="800px"/>

<small><small>
Image source: Li <i>et al.</i> (2020) [J Med Virol 92: 602-611](https://onlinelibrary.wiley.com/doi/full/10.1002/jmv.25731).
</small></small>

---

# Outgroup rooting

* An *outgroup* is a species or infection that is not closely related to the sample set.
  * We place the root at the point where the branch leading to the outgroup intersects the tree.
* If the outgroup is too *close*, then the root is too influenced by sampling bias (our choice of outgroup).
* If the outgroup is too *distant*, then where it intersects the tree is subject to random variation.

---

# Choosing an outgroup

* There is no objective framework to select an "optimal" outgroup.
* We often reach an informal consensus about which outgroup to use, without any other rationale.
  * *e.g.*, HIV-1 subtype D is a conventional outgroup for subtype B.
* If an early isolate of the pathogen is available, it is sometimes used as an outgroup.
  * *e.g.,* West Nile virus isolate B956 ([isolated in 1940](https://www.ajtmh.org/content/journals/10.4269/ajtmh.1940.s1-20.471)).
* **Use different outgroups to see how robust your conclusions are to choice of outgroup!**

---

<img src="https://journals.plos.org/plosntds/article/file?id=10.1371/journal.pntd.0008856.g001&type=large" width="550px"/>

<small><small>
Image credit: Edrdige and van der Hoek (2020) <a href="https://journals.plos.org/plosntds/article?id=10.1371/journal.pntd.0008856">Emerging orthobunyaviruses associated with CNS disease</a>.
</small></small>

---

<table>
  <tr>
    <td style="vertical-align:middle">
      <h1>Root-to-tip regression</h1>
      <ul>
        <li>Assume the rate of evolution is constant over time, and fast enough for measurable evolution over months/years of sampling.</li>
        <li>Divergence from the root (total branch length) should increase linearly with time.</li>
        <li>The "best" root should give the cleanest (positive) linear trend.</li>
        <li>(<i>right</i>) Phylogeny and root-to-tip plot for Ebolavirus isolates from 2013-2016 epidemic in West Africa.</li>
      </ul>
      <small>
      Image credit: Holmes <i>et al.</i> (2016) Nature 538. https://doi.org/10.1038/nature19790
      </small>
    </td>
    <td width="35%">
      <img src="/img/nature19790.png" width="300px"/>
    </td>
  </tr>
</table>

---

<iframe style="max-width: none;" src="/include/rtt.html" width="1500px" height="600px">
</iframe>

---

# Origin of HIV-1

<small>
Estimate of HIV-1 origin by root-to-tip regression (left) compares favourably to cutting-edge estimates decades later (right).
</small>
<table>
<tr>
<td><img src="/img/korber-fig1.png" width="400px"/></td>
<td><img src="/img/hiv-tmrca.png" height="300px"/></td>
</tr>
</table>

<small><small>
Figures from B Korber <i>et al.</i> (2000) <a href="https://science.sciencemag.org/content/288/5472/1789.abstract">Timing the ancestor of the HIV-1 pandemic strains.</a>  Science 288; M Bletsa <i>et al.</i> (2019) <a href="https://academic.oup.com/ve/article/5/2/vez036/5561482">Divergence dating using mixed effects clock modelling: An application to HIV-1</a>. Virus Evol 5: vez036.
</small></small>

---

# Problems with root-to-tip (RTT) regression

* RTT assumes that:
  * every point is an independent observation
  * the clock is constant (strict)
* Tips share common ancestry - the distance of a tip from the root is largely shared with neighbouring tips
* Not a reliable method for dating the root, but a decent rough estimate.
* A good, quick check to see if your data are "clock-like"

---

# Non-reversible model rooting

* Relax the assumption of time-reversibility ($P_{ij}(t)\pi_i = P_{ji}(t)\pi_j$)
* Location of the root becomes another parameter of the model.
* Does not work very well unless evolution is highly non-reversible ([Huelsenbeck *et al* 2002](https://academic.oup.com/sysbio/article/51/1/32/1631340)):
  * non-symmetric substitution rates
  * skewed nucleotide frequencies

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


<section data-background="#333" style="color:white">

<h1 style="color:white">Key points</h1>

* The root is a hypothesis about the earliest point in time in a tree.
* Trees reconstructed by NJ or ML methods are generally unrooted.
* Simple methods like midpoint or outgroup rooting are easy but sensitive to bad assumptions.
* 

</section>