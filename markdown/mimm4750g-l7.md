# MIMM4750G
## Genetic clustering
![](https://imgs.xkcd.com/comics/chat_systems.png)

---

# What is a cluster?

* A cluster is a subset (group) of objects that are more similar to each other than objects outside the cluster.
* Clustering is subjective.  Our brains are wired to see patterns where none exist.
![](/img/random.png)

---

# Why is clustering useful?

* Clustering is a means of finding useful patterns.
* To reduce a large database to a representative subset.
* For infectious disease research:
  * Clustering can be used to define bacterial "species" (limited morphology, extensive horizontal gene transfer).
  * To define strains or "subtypes" of a virus.
  * To track the spread of an infectious disease.

---

# Clustering methods

* There are an enormous number of methods (algorithms) for clustering data. 
* It is easiest to talk about different categories of clustering methods.
* Clustering is used in so many contexts that it can be confusing when different methods are used on different kinds of data in the same study!

---

# Supervised and unsupervised clustering

<table>
<tr>
<td style="font-size: 28px;">
<ul>
<li>Terms associated with machine learning.</li>
<li>*Supervised* clustering means that you have assigned some data to clusters yourself, and leave the rest to the machine.</li>
<li>*Unsupervised* clustering means that the machine has to figure it all out itself.</li>
</ul>
</td>
<td width="40%">
<img src="https://imgs.xkcd.com/comics/machine_learning.png"/>
</td>
</tr>
</table>

---

# Agglomerative and dissociative

* *Agglomerative* (bottom-up) clustering begins with every object in its own tiny cluster, and starts lumping the closest together.
* *Dissociative* (top-down) clustering begins with every object in one huge cluster, and starts cutting.

---

# Non-parametric and parametric

* A *non-parametric* clustering method uses the observed distribution of one or more characteristics to cluster the data.
* For example, if we look at cars on a one-lane road, we can build up clusters from any two cars closer than some cut-off distance of each other.
* A *parametric* clustering method fits a model to the data to define clusters.
* If we have a model on the distance between cars, we can identify groups of cars that are consistent with a "close following" mode.

---


<table>
  <tr>
    <td style="font-size: 26px;">      
      <h1>k-means clustering</h1>
      <ul>
        <li>A popular clustering method (unsupervised, dissociative, nonparametric)</li>
        <li>*k* refers to the number of clusters defined by "means".</li>
        <li>Assign each point to the closest mean, while locating the optimum locations of means.</li>
        <li>(top) A simulated dataset with three clusters, called *mouse*.</li>
        <li>(bottom) A k-means clustering of *mouse* with *k* set to the true value.</li>
      </ul>
    </td>
    <td width="35%">
      <img src="/img/kmeans-actual.png" width="500px"/>
      <img src="/img/kmeans.png" width="500px"/>
    </td>
  </tr>
</table>

---

<table>
  <tr>
    <td style="vertical-align:middle; font-size: 26px;">
      <h1>Gaussian mixture models</h1>
      <ul>
        <li>Another popular clustering method (unsupervised, **parametric**)</li>
        <li>Find the assignments of each data point to one of *k* Gaussian distributions.</li>
        <li>Also find the mean and variance of each Gaussian that maximizes likelihood.</li>
        <li>Method can determine for itself the optimal number of clusters.</li>
        <li>(bottom) Gaussian mixture model applied to *mouse* data.</li>
      </ul>
    </td>
    <td>
      <img src="/img/kmeans-actual.png" width="500px"/>
      <img src="/img/mouse-gmm.png" width="500px"/>
    </td>
  </tr>
</table>

---

# Distance-based clustering

* A simple nonparametric clustering method that is popular for sequence data.
* Look at the distribution of all distances between pairs of objects.
* The distance may be a function of one or more features, *e.g.*, Euclidean distance, $\sqrt{(x_1^2+x_2^2+\ldots+x_n^2)}$.
* Pick a threshold - any pair below the threshold forms a cluster.

---

# Genetic distance clustering

* Recall from last lecture, a *genetic distance* is used to quantify the difference between two sequences.
* The Tamura-Nei (1993, TN93) distance is the most complex distance that can be written as a closed-form expression.
* The [International Committee on the Taxonomy of Viruses](https://talk.ictvonline.org/) allows the definition of a new virus species based on genetic clustering, although this remains controversial.

> Unfortunately, in recent years, ICTV Study Groups [...] have created large number of species on the basis of a single criterion, namely a certain percentage of genome similarity between individual viruses. 

---

# Defining new virus species

<table>
<tr>
  <td style="vertical-align:middle">
    <small>Prevalence and abundance of marine viruses</small>
    <img src="/img/nrmicro.2016.177-f1.jpg" width="400px"/>
  </td>
  <td width="50%">
    <small>Phylogeny of known and novel circular REP-encoding ssDNA viruses</small>
    <img src="/img/nrmicro.2016.177-f2.jpg" width="400px"/>
  </td>
</tr>
</table>
<small>
Source: Simmonds, Peter, *et al.* (2017) Nat Rev Microbiol 15: 161.
</small>

---

<table>
  <tr>
  <td>
  <h1>Defining bacterial species</h1>
  <ul>
    <li>Specific loci are frequently used to measure bacterial diversity (*e.g.*, 16S sRNA)</li>
    <li>Horizontal transfer of genes between different bacteria makes it difficult to define species.</li>
    <li>This problem can be overcome by multilocus sequence analysis (MLSA): using conserved "housekeeping" genes to generate a phylogenetic tree.</li>
  </ul>
  </td>
  <td>
    <img src="/img/bacteria-species.png"/>
    <small>
    MLSA phylogenetic tree of *Streptococcus* from C Fraser *et al.* (2009) Science 323: 741.
    </small>
  </td>
</table>

---

# Defining subtypes: HCV

* Clinical significance of virus subtypes (genotypes): differences in pathogenesis, response to treatment.
* Hepatitis C virus is a flavivirus that can cause fatal liver disease if not cleared by the immune system.
* About 71 million people worldwide have chronic HCV infection.
* Rapid evolution: HCV in individuals infected from the same source can become >35% divergent over 17 years ([McAllister *et al.* 1998](https://jvi.asm.org/content/72/6/4893.short)).

---

<h1>HCV genotype and subtype clustering</h1>
<table>
  <tr>
  <td>
  <ul>
    <li>Early system used distance clustering.</li>
    <li>Used p-distance of aligned sequence to make tentative assignment.</li>
    <li>Next generate a tree by clustering on K2P distances.</li>
  </ul>
  </td>
  <td width="50%">
    <img src="/img/mfig002.jpg" width="400px">
    <small>
    HCV distance-based tree from P Simmonds *et al.* (2005) Hepatology 42: 962.
    </small>
  </td>
</table>

---

<section data-state="tn93-slide">
    <h1>TN93 clustering</h1>
    <br/>
    <div id="tn93" class="fig-container"
         data-fig-id="fig-tn93"
         data-file="/include/clustering.html"
         style="height:600px">
    </div>
</section>

---

# Clustering for epidemiology

* In public health, a cluster of cases in space and time implies a common source.
* A *genetic* cluster of infections similarly suggests that they are related by recent and rapid transmission events.
* Genetic clustering requires measurable evolution on a similar time scale as transmission.

---

<table>
  <tr>
  <td>
  <h1>Tuberculosis</h1>
  <ul>
    <li>TB is one of top 10 causes of death worldwide</li>
    <li>Caused by lung infection by *Mycobacterium tuberculosis*.</li>
    <li>Clustering of whole-genome sequence data can idenfity high-risk groups and detect undiagnosed cases.</li>
  </ul>
  </td>
  <td width="60%">
    <img src="/img/1-s2.0-S1473309912702773-gr4_lrg.png" width="500px"/>
    <small>
    Cluster diagram by TM Walker *et al.* (2013) Lancet Inf Dis 13: 137.
    </small>
  </td>
</table>

---

# HIV epidemiology

<table>
  <tr>
    <td style="font-size:26px">
      <ul>
        <li>HIV-1 outbreak in Glenochil prison, Scotland</li>
        <li>Blood samples collected from 14 inmates positive for HIV infection</li>
        <li>One of the earlier examples of clustering applied to HIV-1</li>
        <li>Now a very popular method for studying HIV transmission</li>
      </ul>
      <small>
      Image source: DL Yirrell *et al*. (1997) BMJ, https://doi.org/10.1136/bmj.314.7092.1446
      </small>
    </td>
    <td width="40%">
      <img src="/img/glenochil-crop.png" width="400px"/>
    </td>
  </tr>
</table>

---

# Suggested readings

* [Consensus statement: Virus taxonomy in the age of metagenomics](https://www.nature.com/articles/nrmicro.2016.177)
* [ICTV: Comments to proposed modification to code rule 3.21 (defining virus species)](https://talk.ictvonline.org/ictv1/f/general_ictv_discussions-20/3930/comments-to-proposed-modification-to-code-rule-3-21-defining-virus-species)

