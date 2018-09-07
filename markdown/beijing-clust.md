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

Pairwise animation to go here?

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

# Clustering in real time
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

# Clustering in real time
## Yet another clustering algorithm

* Patristic distance: the total branch length from one tip to another in the tree (custom Python script).
<img src="/img/patristic.png" width="200px"/>
* Averaged distances over 100 bootstrap trees:
<img src="/img/bootstrapping.png" width="400px"/>

---

# Clustering in real time
![](/img/monitoring-pipeline.png)

---

# Clustering in real time
## Data security

* Entire network behind dual firewall (no outside access)
* Anonymous patient IDs replaced with randomized labels.
* Sequence data randomized (bootstrap) while preserving evolutionary information.
* All data securely erased from storage media (Guttman method) immediately after analysis.

---

# Clustering in real time
## Data visualization

<img src="/img/cluster0.png" width="750px">

---

* How do decide which clusters are actionable for public health?


---

# Clustering methods
## Getting skeptical about clusters
* Volz *et al.* (2012): "virus from recent infections tend to be phylogenetically clustered at a greater rate.."
* Villandre *et al.* (2016): "...common methods often have limited success in detecting contact network communities from phylogenies."
* Dearlove *et al.* (2017): "...groups of closely related viruses can also occur due to [...] over-sampling."

<table><tr>
 <td><img src="/img/short-internals.png"/></td>
 <td><img src="/img/short-tips.png" height="150"/></td>
</tr></table>

---

# Simulation
## Compartmental models

* Test clustering methods by simulating outbreaks.
* Systems of ordinary differential equations.
* Each variable corresponds to the size of a subpopulation (susceptible, infected).
* Forward-time simulation of reaction kinetics with @tgvaughan's [MASTER](https://github.com/tgvaughan/MASTER/wiki) program.

---

# Simulation
## Epidemic in structured populations

<img src="/img/model75.png" height="200"/>
`$$
\begin{align*}
	\frac{dS_i}{dt} &= -\beta_i S_i I_i + m (S_{j\ne i} - S_i),\\
	\frac{dI_i}{dt} &= \beta_i S_i I_i + m(I_{j\ne i} - I_i) - (\mu+\psi) I_i\\
	\frac{dI^*_i}{dt} &= \psi_i I_i,\,  \frac{dR}{dt} = \mu \sum_i I_i\\
\end{align*}
$$`

---

<img src="/img/ROC.svg" height="500"/>

<small>Poon (2016) Impacts and shortcomings of genetic clustering methods for infectious disease outbreaks. Virus Evol 2(2):vew031.</small>

---

# Model-based clustering
## Focus on internal-node distances
* Internal node heights define upper limit to transmission times

<img src="/img/transmission-tree.svg" height="300"/>

---

# Model-based clustering
## Markov-modulated Poisson process (MMPP)
<img src="/img/model.svg" height="450"/>

<small>from McCloskey and Poon (2017) PLOS Computat Biol 13(11): e1005868</small>

---

# Model-based clustering
## Transition rates and branching rates

`$$
\begin{align*}
	Q &= 
    \begin{bmatrix}
    	-\sigma_1 & \sigma_{12} & \cdots & \sigma_{1m} \\
        \sigma_{21} & -\sigma_2 & \cdots & \sigma_{2m} \\
        \vdots & \vdots & \ddots & \vdots \\
        \sigma_{m1} & \sigma_{m2} & \cdots & \sigma_{m}
    \end{bmatrix} \\
    \sigma_i &= \sum_{j \neq i} \sigma_{ij} \\
    \vec{\lambda} &= [\lambda_1,\, \ldots,\, \lambda_m]^T \\
    \Lambda &= \mathrm{diag}({\vec{\lambda}}).
\end{align*}
$$`

---

# Model-based clustering
## MMPP vs. nonparametric methods

<img src="/img/ROC2.svg" height="500"/>

<small>from McCloskey and Poon (2017) PLOS Computat Biol 13(11): e1005868</small>

---

# Model-based clustering
## Detailed comparison

<img src="/img/colored-trees.png" height="550"/>

---

# clmp
##  An R module (Clustering with MMPP)

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

## Open problems
1. Incomplete sampling can create false clusters
2. Clustering methods don't address population-level dynamics, *e.g.*, exponential growth at start of epidemic
3. MMPP can be misled by zero branch lengths

---

# Open problems
## Incomplete sampling

* We assumed near-complete sampling of infected population
* if we reduce sampling to 50%, high false positive rate!

<img src="/img/ROC3.svg" height="400"/>

---

# Open problems
## Incomplete sampling

* Worst-case scenario -- groups with high transmission rates have low sampling rates:
<img src="/img/MMPP2.svg"/>

---

# Open problems
## Incomplete sampling
 
* Use second MMPP to model variation in sampling rates along the tree?
* Model joint distribution of transmission and sampling rates?
* Incorporate additional information?  *e.g.,* infection staging at diagnosis (acute vs. chronic)
* Also see recent work by Barido-Sottani and Stadler (R package ML.MSBD, *bioRxiv*).

---

# Open problems
## Population-level dynamics

<table><tr>
<td width="50%">
  <ul>
  <li>MMPP is modeling lineage-level variation in transmission (branching) rates</li>
  <li>Rates also vary at population level due to numbers of infected, susceptibles</li>
  <li>Rescale tree in transmission time?</li>
  </ul>
</td>
<td>
  <img src="/img/SIRplot.svg"/>
</td>
</tr></table>

---

# Open problems
## Zero branch lengths

* Maximum likelihood is unable to infer a non-zero branch length due to insufficient mutations ("sampling zeroes")
* Also known as soft polytomies
* Neighbor-joining trees tend to have less variable branch lengths
* Smoothing methods may approximate a more realistic branch length distribution.

---

## Concluding remarks

* MMPP seems to confer greater accuracy for detecting clusters of transmission
* *All* methods suffer from high false positive rate due to incomplete sampling
* We really need to work on these methods before using them to guide public health decisions!

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


