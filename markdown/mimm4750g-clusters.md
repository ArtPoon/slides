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
<li><i>Supervised</i> clustering means that you have assigned some data to clusters yourself, and leave the rest to the machine.</li>
<li><i>Unsupervised</i> clustering means that the machine has to figure it all out itself.</li>
</ul>
</td>
<td width="40%">
<img src="https://imgs.xkcd.com/comics/machine_learning.png"/>
</td>
</tr>
</table>

---

# Non-parametric and parametric

* A *non-parametric* clustering method uses the observed distribution of one or more characteristics to cluster the data.
  * For example, if we look at cars on a one-lane road, we can build up clusters from any two cars closer than some cut-off distance of each other.
* A *parametric* clustering method fits a model to the data to define clusters.
  * If we have a model on the distance between cars, we can identify groups of cars that are consistent with a "close following" mode.

---


<table>
  <tr>
    <td style="vertical-align:middle; font-size: 24px;">      
      <h1>k-means clustering</h1>
      <ul>
        <li>An unsupervised nonparametric method</li>
        <li>$k$ refers to the number of clusters defined by "means".</li>
        <li>Assign each point to the closest mean, while locating the optimum locations of means.</li>
        <ul>
        <li>(top) A simulated dataset with three clusters, called <i>mouse</i>.</li>
        <li>(bottom) A k-means clustering of <i>mouse</i> with $k$ set to the true value.</li>
        </ul>
      </ul>
    </td>
    <td width="33%">
      <img src="/img/kmeans-actual.png" width="450px"/>
      <img src="/img/kmeans.png" width="450px"/>
    </td>
  </tr>
</table>

---

<table>
  <tr>
    <td style="vertical-align:middle; font-size: 24px;">
      <h1>Gaussian mixture models</h1>
      <ul>
        <li>An unsupervised parametric method</li>
        <li>Find the assignments of each data point to one of $k$ Gaussian distributions.</li>
        <li>Also find the mean and variance of each Gaussian that maximizes likelihood.</li>
        <li>Method can determine for itself the optimal number of clusters.</li>
        <ul>
          <li>(bottom) Gaussian mixture model applied to <i>mouse</i> data.</li>
        </ul>      
        </ul>
    </td>
    <td width="33%">
      <img src="/img/kmeans-actual.png" width="450px"/>
      <img src="/img/mouse-gmm.png" width="500px"/>
    </td>
  </tr>
</table>

---

# Hierarchical clustering

* Another simple nonparametric clustering method.
* Calculate the pairwise distance matrix.
  * The distance may be a function of one or more features, *e.g.*, Euclidean distance, $\sqrt{(x_1^2+x_2^2+\ldots+x_n^2)}$.
* Use these distances to construct a dendrogram (tree), *e.g.*, unweighted pair group method with arithmetic mean ([UPGMA](https://en.wikipedia.org/wiki/UPGMA)).

---

# Genetic distance clustering

* Recall from last lecture, a *genetic distance* is used to quantify the difference between two sequences.
  * *e.g.*, Jukes-Cantor (JC69), Tamura-Nei (1993, TN93) distances.
* Pick a distance threshold &mdash; any pair of sequences with a distance below that threshold are assigned to the same cluster.
* Clusters are usually visualized as networks ([graphs](https://en.wikipedia.org/wiki/Network_theory)) where each node represents a sequence (infection) that are connected by [edges](https://en.wikipedia.org/wiki/Glossary_of_graph_theory_terms#edge).


---

<section data-state="tn93-slide">
    <div id="tn93" class="fig-container"
         data-fig-id="fig-tn93"
         data-file="/include/clustering.html"
         style="width:800px; margin:0 auto; height:700px">
    </div>
</section>

---

# Defining new virus species

* The [International Committee on the Taxonomy of Viruses](https://talk.ictvonline.org/) allows the definition of a new virus species based on genetic clustering, although this remains controversial.

> Unfortunately, in recent years, ICTV Study Groups [...] have created large number of species on the basis of a single criterion, namely a certain percentage of genome similarity between individual viruses.

---

# Demarcating virus species

<img src="/img/geminivirus.png" height="300px"/>

<small><small>
Image credit: CM Fauquet <i>et al.</i> (2008) [Geminivirus strain demarcation and nomenclature](https://link.springer.com/article/10.1007%2Fs00705-008-0037-6).  Arch Virol 153:783-821.
</small></small>

---


<table>
  <tr>
    <td style="vertical-align:middle; font-size: 24px;">
      <h1>HIV groups and subtypes</h1>
      <ul>
        <li>Defining groupings within species (HIV-1)</li>
        <li>Four HIV-1 groups (M-P) associated with different zoonotic events.</li>
        <li>Group M is split into subtypes (A-J).</li>
        <li>A and F are split into sub-subtypes (A1-A7, F1, F2).</li>    
        </ul>
        <small><small>
        Image credit: N D&eacute;sir&eacute; <i>et al.</i> (2018) Characterization update of HIV-1 M subtypes diversity and proposal for subtypes A and D sub-subtypes reclassification. <a href="https://retrovirology.biomedcentral.com/articles/10.1186/s12977-018-0461-y">Retrovirology 15: 80</a>.
        </small></small>
    </td>
    <td width="40%">
      <img height="600px" src="https://media.springernature.com/full/springer-static/image/art%3A10.1186%2Fs12977-018-0461-y/MediaObjects/12977_2018_461_Fig1_HTML.png"/>
    </td>
  </tr>
</table>


---

<table>
  <tr>
  <td style="vertical-align: middle; font-size: 20pt;">
  <h1>Clustering for epidemiology</h1>
  <ul>
    <li>In public health, a cluster of cases in space and time implies a common source.</li>
    <li>A <u>genetic</u> cluster of infections similarly suggests that they are related by recent and rapid transmission events.</li>
    <li>Sequences can be easier to collect.</li>
    <li>Genetic clustering requires measurable evolution on a similar time scale as transmission.</li>
  </ul>
  </td>
  <td>
    <img src="/img/broad-street.jpg" width="300px"/>
    <small>
    Brody et al. (2000) Map-making and myth-making in Broad Street: the London cholera epidemic, 1854.  Lancet 356; 64-68.
    </small>
  </td>
</table>


---

<table>
  <tr>
  <td style="vertical-align: middle; font-size: 20pt;">
  <h1>Tuberculosis</h1>
  <ul>
    <li>TB is one of top 10 causes of death worldwide</li>
    <li>Caused by lung infection by <i><a href="https://en.wikipedia.org/wiki/Mycobacterium_tuberculosis">Mycobacterium tuberculosis</a></i>.</li>
    <li>Clustering of whole-genome sequence data can idenfity high-risk groups and detect undiagnosed cases.</li>
  </ul>
  </td>
  <td width="50%">
    <img src="/img/1-s2.0-S1473309912702773-gr4_lrg.png" width="450px"/>
    <small>
    Cluster diagram by TM Walker <i>et al.</i> (2013) Lancet Inf Dis 13: 137.
    </small>
  </td>
</table>

---

<small><small>
Clusters of people living with HIV in British Columbia.  Red/orange = Strong, weak HIV-1 drug resistance.  Grey = deceased.  Circle size &propto; viral load.
</small></small>
<img src="/img/big-graph.png" height="550px"/>

---

# Transmission clusters

* A common technique to study the risk structure of a population from HIV-1 sequences.
* A cluster implies that a group of infections are  related through recent, rapid transmission events.
* Clusters might *also* arise when some people are diagnosed with HIV sooner after infection.

<table>
  <tr>
    <td><img src="/img/short-internals.png"/></td>
    <td><img src="/img/short-tips.png"/></td>
  </tr>
</table>

---



<table>
  <tr>
  <td style="vertical-align: middle; font-size: 20pt;">
  <h1>Transmission clusters (2)</h1>
  <ul>
    <li>A very common technique is to find statistical associations between:
      <ol>
      <li>potential risk factors, and;</li>
      <li>whether or not an infection is in a cluster.</li>
      </ol>
    </li>
    <li>Usually quantified by <a href="https://en.wikipedia.org/wiki/Linear_regression#Simple_and_multiple_linear_regression">multiple</a> <a href="https://en.wikipedia.org/wiki/Logistic_regression">logistic regression</a>.</li>
    </li>
  </ul>
  </td>
  <td width="55%">
    <img src="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6887514/bin/nihms-1059399-f0003.jpg" height="400px"/>
    <small>
    Image credit: M Ragonnet-Cronin <i>et al.</i> (2019) <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6887514/">HIV Transmission Networks Among Transgender Women in Los Angeles County: network analysis of surveillance data</a>. Lancet HIV 6: e164-e172.
    </small>
  </td>
</table>



---

# Suggested readings

* [Consensus statement: Virus taxonomy in the age of metagenomics](https://www.nature.com/articles/nrmicro.2016.177)
* [ICTV: Comments to proposed modification to code rule 3.21 (defining virus species)](https://talk.ictvonline.org/ictv1/f/general_ictv_discussions-20/3930/comments-to-proposed-modification-to-code-rule-3-21-defining-virus-species)
* [Detecting and Responding to HIV Transmission Clusters: A Guide for Health Departments](https://www.cdc.gov/hiv/pdf/funding/announcements/ps18-1802/CDC-HIV-PS18-1802-AttachmentE-Detecting-Investigating-and-Responding-to-HIV-Transmission-Clusters.pdf), US CDC.

