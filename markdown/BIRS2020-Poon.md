
BIRS: Mathematics and Statistics of Genomic Epidemiology
### Optimizing the genetic clustering of viruses for public health surveillance
<br/>

# Art Poon
#### Western University

Departments of Pathology & Laboratory Medicine; Computer Science; Applied Mathematics; Microbiology and Immunology

---


<table style="font-size: 18pt">
<tr><td style="vertical-align: middle;">
  <h1>Outbreak detection with clusters</h1>
  <ul>
  <li>Clustering is an essential tool of public health to detect outbreaks</li>

  <li>Cases that cluster in time and space may have a common risk factor, <i>e.g.,</i> outbreaks of bacterial infection in a hospital unit</li>

  <li>Difficult for persistent chronic infections with a long asymptomatic period, <i>e.g.,</i> HIV-1, hepatitis C virus, <i>M. tuberculosis</i></li>
  </ul>
</td>
<td width="35%">
  <img src="/img/broad-street.jpg"/>
  <small>
  John Snow's "dot map" of <a href="https://en.wikipedia.org/wiki/1854_Broad_Street_cholera_outbreak">cholera cases on Broad Street</a>, London.
  </small>
</td></tr>
</table>

---

# Clusters and genomic epidemiology

* Genetic clustering is a simple and intuitive method of genomic epidemiology.
  * Whole-genome sequencing of *M. tuberculosis*
  * US CDC [HIV Cluster Detection and Response](https://www.cdc.gov/hiv/programresources/guidance/cluster-outbreak/index.html) program
* Genetic similarity implies epidemiological linkage.
* Genetic variation becomes a proxy for time and space.

---

# Clustering methods

* Pairwise clustering
  * Apply a threshold value to convert a genetic distance matrix to an adjacency graph
  * Extract connected components of graph as clusters
* Subtree clustering
  * Apply one or more criteria to subtrees or subset trees of a phylogeny
  * *e.g.*, mean branch length, bootstrap support

<img src="/img/clustering-clip.png" height="150px"/>

---

# Varying the clustering threshold
<iframe src="http://slides.filogeneti.ca/include/clustering.html" height="700px" width="100%">
</iframe>

---

# The problem with clustering

* Clustering criteria have largely been defined by *ad hoc* methods and historical precedence.
* There has been no statistical framework for optimizing clustering.

>We propose the optimal clustering confers the greatest accuracy in predicting the distribution of the next cases.

---

# Modifiable areal unit problem

<img src="/img/maup/tuson.png" height="300px"/>

* Areal units are defined by some partition on a continuous outcome space.
* Statistical results are contingent on an arbitrary partition.

<small><small>
Figure from: M Tuson <i>et al.</i> (2020)
<a href="https://link.springer.com/article/10.1186/s12942-020-00236-y">
Overcoming inefficiencies arising due to the impact of the modifiable areal unit problem on single-aggregation disease maps.</a>
<i>Int J Health Geo</i> 19:40.
</small></small>

---

# A MAUP for genetic space

<img src="/img/maup/drawing-1.svg"/>

* Optimizing genetic clustering is an analogous problem.
* Idiosyncrasies of genetic space (probably) preclude autoregressive methods.

---

# Adapting Nakaya's solution to the MAUP

<img src="/img/maup/nakaya.png" height="200px"/>

* Separate database to known and new (most recent) cases.
* The number of new cases adjacent to clusters of known cases ($R$) is a count outcome modeled by Poisson regression.
* Trivial solution: most effective model collapses all known cases into one cluster.

<small><small>
Figure from: T Nakaya (2000)
<a href="https://journals.sagepub.com/doi/abs/10.1068/a31145">
An Information Statistical Approach to the Modifiable Areal Unit Problem in Incidence Rate Maps.</a>
<i>Environ Plan A</i> 32: 91-109.
</small></small>

---

# Model comparison

* Simplest model assumes that every known case in $V^c$ has the same probability of being adjacent to a new case in $V$.

* For the $i$-th cluster, $C_i$:
$$E(R_0(C_i)) = \exp \left(\frac{|C_i|}{|V^c|}R\right)$$

* Alternate models incorporate individual- and cluster-level covariates:
$$E(R(C_i)) = \exp \left(\alpha + \beta\sum_{v\in C_i} w(v)\right)$$

---

# Data sets and collection dates

<img src="/img/maup/barplots.png" height="300px"/>

* Obtained published HIV-1 *pol* sequence data from population studies based in Seattle, North Alberta and Tennessee.

---

# Calculated Tamura-Nei (TN93) distances

<img src="/img/maup/tn93.png" height="300px"/>

* The most complex genetic distance with a closed form solution (unequal frequencies, two transition rates).

---

# Sample collection dates as predictors

* Let $K_{ij} = (V_i^c, V_j^c, E_{ij})$ be a bipartite graph of all edges between known cases at times $i$ and $j$.
* We reduce the "longest" bipartite edges from $E_{ij}$ such that the degree size for all $v\in V_j^c$ is 1.
* The expected edge density $\rho$ given $\Delta t$ is:
$$E(\rho|\Delta t) = \frac{\sum_{K(\Delta t)} |E^1_{ij}| / |V_j^c|}{(t_{\max}-1)-t_{\min}-\Delta t}$$

---

# Edge prob. decays with sampling time difference

<img src="/img/maup/decay.png" height="350px"/>

* Fit binomial GLM to observed bipartite edges between known cases.
* Applied same model to HIV-1 diagnostic dates for Tennessee.

---

# Acknowledgements

This framework was implemented in *R* by my MSc student, **Connor Chato**, shown below doing a podcast.

<table>
<tr><td>
<img style="filter: drop-shadow(3px 3px 3px #333333);" src="/img/connor.jpg" width="300px"/>
</td></tr>
</table>

---

# Funding


<table>
  <tr>
    <td><img src="/img/OGI_Logo2015.png" height="150"/></td>
    <td><img src="/img/GenomeCanadaLogo.png" height="150"/></td>
    <td><img src="/img/NIH_NIAID.jpg" height="200"></td>
  </tr>
  <tr>
    <td><img src="/img/cihr.png"  height="200"/></td>
    <td><img src="/img/NSERC_RGB.png"/></td>
  </tr>
</table>
