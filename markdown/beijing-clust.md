# Chinese CDC workshop
## Outbreak detection in real time with genetic clustering
### Art Poon
<small>
Department of Pathology & Laboratory Medicine<br/>
Western University
</small>
![](/img/UWO_Logo.svg)

---

<table>
<tr><td><ul>
  <h1>Background</h1>
  <h2>What is an outbreak?</h2>
  <li>A cluster of cases in space (location) and time</li>
  <li>Implies a common underlying cause</li>
  <li>Classic example: 1854 Broad Street cholera outbreak, spatial clustering of cases implicated a contaminated water pump</li>
  <li>In fact John Snow's map was drawn *after* the outbreak (Brody et al. 2000).</li>
  </large>
</ul></td><td width="40%">
<img src="/img/broad-street.jpg"/>
</td></tr>
</table>

<small>Brody et al. (2000) Map-making and myth-making in Broad Street: the London cholera epidemic, 1854.  Lancet 356; 64-68.</small>

---

<table>
<tr><td>
  <h1>Background</h1>
  <h2>Space-time clustering</h2>
  <ul>
  <li>Disease surveillance systems&ast;:</li>
  <li>space-time interaction methods (Mantel test)</li>
  <li>scan statistics, *e.g.*, cylindrical space-time scan</li>
  <li>model-based methods: GLMMs, Bayesian sampling</li>
  </ul>
</td><td width="40%">
  <img src="/img/384px-Ph_AH1N1_map.PNG"/>
</td></tr>
</table>

<small>
&ast;C Robertson et al. (2010) Review of methods for space-time disease surveillance. 
Spatial and Spatiotemporal Epidemiology 1(2-3): 105-116.
</small>

---

<table>
<tr>
  <td>
    <h1>Background</h1>
    <h2>Genetic clustering</h2>
    <ul>
      <li>A subset of infections that are more genetically similar than other infections.</li>
      <li>Early uses of genetic clusters for HSV-1, TB.</li>
      <li>Use genetic "space" to approximate geographic space.</li>
      <li>Needs evolution on same time scale as transmission.</li>
    </ul>
    
    <small>
    Tuberculosis MIRU-VNTR minimum spanning tree from Reynaud et al. PLOS ONE 2017;e0171584
    </small>
    </td>
    <td width="40%">
      <img src="/img/MIRU-VNTR.pone.e0171584.jpg" width="300px"/>
    </td>
</tr>
</table>

---

<table>
<tr>
<td>
  <h1>Background</h1>
  <h2>Genetic clustering and HIV</h2>
  <ul>
    <li>HIV-1 outbreak in Glenochil prison, Scotland</li>
    <li>Blood samples collected from 14 inmates positive for HIV infection</li>
    <li>One of the earlier examples of clustering applied to HIV-1</li>
    <li>Now a very popular method for studying HIV transmission</li>
  </ul>
</td>
<td width="40%">
  <img src="/img/glenochil.jpg">
</td>
</tr>
</table>

---


# Clustering methods
## How do we make clusters?

* Enormous number of *ad hoc* approaches to genetic clustering, no "best" method.
* Pairwise clustering
* Subtree clustering
* Both are *non-parametric* - clusters are informed by empirical distribution(s), not by a model.

---

# Clustering methods
## Pairwise distances

* A genetic distance is a function that maps two sequences to a number, $d(s_1,s_2)\rightarrow \mathbf{R}$.
* This distance is often used to approximate their *divergence time*.
* A simple example is the Hamming distance (number of differences between two aligned sequences).
* Build up clusters from pairs of sequences with a distance below some threshold.

---

# Clustering methods
## Phylogenies

* A molecular phylogeny is a tree-based model of how sequences are related by common ancestors
<img src="/img/trees.png" height="350"/>

---

# Clustering methods
## Subtree clustering

* Several different criteria can be used to label a subtree as a cluster
* *e.g.,* mean branch length within subtree
* Bootstrap support - a measure of confidence in subtree given the data

<img src="/img/clustering-clip.png" height="250"/>

---

# Real-time clustering
## Rationale

<table>
<tr>
  <td>
    <ul>
      <li>Abundant data accumulating at centers of HIV research and care.</li>
      <li>Routine genotyping HIV *pol* for drug resistance screening.</li>
      <li>With sufficient testing, it may be possible to monitor outbreaks in real time (Little et al. 2014&ast;).</li>
</td>
<td width="50%">
  <img src="/img/lancet-fig1.png"/>
  <small>
  Accumulation of HIV-1 genotypes and faster sample processing time at the BC Centre for Excellence in HIV/AIDS.
  </small>
</td>
</tr>
</table>

<small>&ast;SJ Little et al.  *Using HIV networks to inform real time prevention interventions.*  PLOS ONE 2014;9(6):e98433.</small>

---

# Real-time clustering
## Yet another clustering algorithm

* Patristic distance: the total branch length from one tip to another in the tree (custom Python script).
<img src="/img/patristic.png" width="200px"/>
* Averaged distances over 100 bootstrap trees:
<img src="/img/bootstrapping.png" width="400px"/>

---

# Real-time clustering
![](/img/monitoring-pipeline.png)

---

<table>
<tr>
  <td>
    <h1>Real-time clustering</h1>
    <h2>Ethical and legal concerns</h2>
    <ul>
      <li>Long history of using HIV clustering in court cases.</li>
      <li>In Canada, people found guilty for HIV transmission without disclosure can be found guilty of aggravated sexual assault.</li>
      <li>Up to **life imprisonment** and registration on the Sexual Offender Registry.</li>

</td>
<td width="40%">
  <img src="/img/dentist.png"/>
  <small>
  Phylogeny from case of "Florida dentist" from Ou *et al.* (1992, Science).
  </small>
</td>
</tr>
</table>

---

# Real-time clustering
## Data security

* Entire network behind dual firewall (no outside access)
* Anonymous patient IDs replaced with randomized labels.
* Sequence data randomized (bootstrap) while preserving evolutionary information.
* All data securely erased from storage media (Guttman method) immediately after analysis.

---

# Real-time clustering

<img src="/img/cluster0.png" width="90%"/>

---

# Real-time clustering
## Reading network diagrams

* Many applications of network diagrams, *e.g.*, contact tracing.
* Public health officials tended to interpret network "ties" as contacts or transmission events.
* Genetic similarity is not sufficient data to infer transmission.

<img src="/img/transtree.png" width="75%"/>

---

# Real-time clustering
## What is an actionable cluster?

* How do decide which clusters are actionable for public health?
* A popular indicator was the number of cases in the last month / 3 / 6 months: **genetic-time clustering**.

![](/img/report1.png)

---

<section data-state="cluster">
  <h1>Real-time clustering</h1>
  <div id="cluster" class="fig-container"
       data-fig-id="fig-cluster"
       data-file="/include/cluster55.html"
       style="height:600px"></div>
  <div id="c55label">Cluster 55</div>
</section>

---

# Real-time clustering
## Cluster 55 timeline

![](/img/LancetFigure4a.png)
<small>
$\hspace{1in}\circ = $ baseline sample date, $\;\;\diamond =$ HIV genotype record date
</small>

* 8 new cases in 3 months detected (June 24, 2014)
* Public Health Officer authorizes formal outbreak investigation (June 27, 2014)
* Investigation followed by public health follow-up (July 2, 2014)

---

<table>
<tr>
  <td>
    <h1>Real-time clustering</h1>
    <h2>Retrospective</h2>
    <ul>
      <li>Perhaps the first example of automated real-time genetic monitoring directly leading to a public health response.</li>
      <li>Not feasible to prove effect of intervention without an unethical controlled study.</li>
      <li>Similar systems are now being built around the world.</li>
</td>
<td width="40%">
  <img src="/img/lancet-hiv.jpg"/>
</td>
</tr>
</table>

---

# Limitations of clustering
## What do clusters really mean?

* Inherent assumption that a cluster represents an outbreak.
* Infections may be genetically similar only because they were rapidly diagnosed.
* Explains strong association between clusters and acute infections (Volz et al. 2012).

<small>
EM Volz et al. (2012) *Simple epidemiological dynamics explain phylogenetic clustering of HIV from patients with recent infection.* PLOS Comput Biol 28:e1002552.
</small>

---

# Limitations of clustering
## Simulation experiments

<img src="/img/model75.png" height="200"/>

* Epidemic in a risk-structured population.
* Compartmental SIR dynamics.

---

# Limitations of clustering
## Simulation outputs
<img src="/img/simulation.svg" width="80%"/>

---

**Current methods tend to pick clusters of sampling.**

<img src="/img/ROC.svg" height="500"/>

<small>Poon (2016) *Impacts and shortcomings of genetic clustering methods for infectious disease outbreaks.* Virus Evol 2(2):vew031.</small>

---

# Model-based clustering
## A new approach

* Instead of looking at genetic similarity, what we focus on what we really care about?
* Coalescence rate is more related to the rate of transmission than the number of infections (Volz et al. 2009).
* We develop a model to examine HIV transmission through branching rates (coalescence).  

<small>
EM Volz et al. (2009) *Phylodynamics of infectious disease epidemics.* Genetics 183: 1421.
</small>

---

# Model-based clustering
## Markov-modulated Poisson process
<img src="/img/model.svg" height="450"/>

<small>
McCloskey and Poon (2017) PLOS Comput Biol 13(11): e1005868
</small>

---

# Model-based clustering
## MMPP vs. nonparametric methods

<img src="/img/ROC2.svg" height="500"/>

<small>McCloskey and Poon (2017) PLOS Comput Biol 13(11): e1005868</small>

---

# Model-based clustering
## Detailed comparison

<img src="/img/colored-trees.png" height="550"/>

---

# Model-based clustering
## Incomplete sampling is still a problem

<img src="/img/ROC3.svg" width="85%"/>

Results from simulations with sampling reduced from 98% to 50%.

---

If high-risk groups are less sampled (under-diagnosed) then **clustering may systematically bias public health away from groups most at risk**.

<img src="/img/MMPP2.svg" width="80%"/>

---

**clmp: an R module (Clustering with MMPP)**

http://github.com/PoonLab/clmp


```R
> require(clmp)
Loading required package: clmp
Loading required package: ape

> t1 <- read.tree('examples/test.nwk')  # a simulated tree with 1000 tips, 100 in clusters
> res <- clmp(t1)  # returns an ape::phylo tree object 
log likelihood for 2 state model is 2238.543290
rates: 495.368085 1305.115860 
Q: [    *   2.526691 ]
   [ 23.309483   *    ]

> index <- match(t1$tip.label, names(res$clusters))  
> labels <- grepl("_1_", t1$tip.label)  # extract truth from the tip labels
> table(labels, res$clusters[index])
      
labels    0   1
  FALSE 860   3  # false positive rate, 3/(3+860)=0.34%
  TRUE   13  98  # true positive rate, 98/(98+13)=88.2%
```

---

## Concluding remarks

* There are many ways to define clusters - we still do not know which method is most effective for real-time prevention (but see Wertheim *et al.* 2018).
* Model-based clustering seems to confer greater accuracy for detecting clusters of transmission.
* _All_ methods suffer from high false positive rate due to incomplete sampling.

<small>
JO Wertheim et al. (2018) *Growth of HIV-1 Molecular Transmission Clusters in New York City.*  J Infect Dis, in press.
</small>

---

## Thanks!

<table>
  <tr>
    <td><img src="/img/OGI_Logo2015.png" height="100"/></td>
    <td><img src="/img/GenomeCanadaLogo.png" height="100"/></td>
    <td><img src="/img/NIH_NIAID.jpg" height="150"></td>
  </tr>
  <tr>
    <td><img src="/img/cihr.png"  height="150"/></td>
    <td><img src="/img/NSERC_RGB.png"/></td>
  </tr>
</table>


