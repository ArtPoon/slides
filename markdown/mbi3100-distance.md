# MBI 3100A
## Diversity, distance and clusters
![](https://imgs.xkcd.com/comics/truck_proximity.png)

---

# Aligned sequences

* Now that we can align sequences, we can make biologically meaningful comparisons.
  * Which parts of the gene/genome are more variable? more conserved?
  * Which sequences are more closely related than others?
* It is far easier to measure similarity when the sequences are aligned.

```
GGGTTGCGCTCGTTG    GGGTTGCGCTCGTTG
|| |        |      ||| ||| |||| ||
GGTTGCGCTCGTTGA    GGGATGCACTCGCTG
```

---

# Measuring sequence diversity

* Which regions of the genome are the most conserved (least diverse)?
* Variable regions can reveal targets of diversifying selection, *e.g.*, major histocompatibility loci.
* Conserved regions can make good targets for sequencing primers, antibodies.

<img src="https://media.springernature.com/full/springer-static/image/art%3A10.1007%2Fs10811-011-9730-z/MediaObjects/10811_2011_9730_Fig1_HTML.gif" width="600px"/>

<small><small>
Variable (V) regions along dinoflagellate 18S rRNA sequences.  From J-S Ki 2011. [J Applied Pathol 24: 1035-1043](https://link.springer.com/article/10.1007/s10811-011-9730-z).
</small></small>

---

# Diversity

* There are several ways to measure sequence diversity.
  * Fraction of polymorphic sites - what counts as a polymorphism?
  * [Minor allele frequency](https://academic.oup.com/aje/article/172/8/869/277182) (MAF): the frequency of the *second*-most common residue
  <img src="/img/MAF.png" width="500px"/>
  * Sequence entropy

* Convention is to label a site as [polymorphic](https://en.wikipedia.org/wiki/Gene_polymorphism) if MAF is greater than 1% and less than 5%.

---

# Diversity: Sequence entropy

<table>
  <tr>
    <td width="60%">
      <ul>
      <li>
        The concept of entropy comes from <a href="https://en.wikipedia.org/wiki/Information_theory">information theory</a>.
      </li>
      <li>
        For each site, we calculate:
        $$H = -\sum_i p_i \log p_i$$
        where $p_i$ is the frequency of the $i$-th residue at that site.
      </li>
      <li>Entropy is highest when residues appear at equal frequency (no information).</li>
    </td>
    <td>
      <img src="/img/entropy.png"/>
      <small>
      A plot of entropy for two possible states.
      </small>
    </td>
  </tr>
</table>

---

# Diversity: Population, sequence-level measures

* The number of segregating sites (polymorphisms), $S$.
  * Increases with sequence length, sample size.
* Mean nucleotide or amino acid entropy, $\bar{H} = \sum_{j=1}^L H_j / L $

* Nucleotide diversity ($\pi$): the average number of differences between two randomly sampled sequences
`$$\pi = \sum_{i=1}^{n-1} \sum_{j=i+1}^{n} \pi_{ij} \Big/ {n \choose 2}$$`

---

# Sliding windows

* Site-wise diversity measures can be too noisy to be useful.
* Averaging diversity by gene requires knowledge of gene coordinates, may be too coarse.
* A "sliding window" takes the average of a statistic for a given window size and step size.
<img src="http://1.bp.blogspot.com/-eSp1w_oJsBc/U0NmHgWv76I/AAAAAAAAAzU/XyFsegtRKrU/s1600/Screen+Shot+2014-04-07+at+9.59.13+PM.png" height="200px">

<small><small>
Image source: http://coleoguy.blogspot.com/2014/04/sliding-window-analysis.html
</small></small>

---

# Genetic distances

* Another approach to quantify diversity is to use a distance measure (comparing pairs of sequences).
* A [genetic distance](https://en.wikipedia.org/wiki/Models_of_DNA_evolution) is a function $d(x,y)$ that maps sequences $x$ and $y$ to some non-negative value.
* A [distance function](https://en.wikipedia.org/wiki/Metric_(mathematics)) $d$ should have the following properties:
	* $d(x,y) \ge 0$ for all $x,y\in \Omega$
	* If $x=y$, then $d(x,y)=0$
	* $d(x,y) = d(y,x)$ (symmetry)

---

# p-distances

* The simplest distance is to count the number of different residues, <i>i.e.</i>,  the [Hamming distance](https://en.wikipedia.org/wiki/Hamming_distance) (HD):
```
GGGTTGCGCTCGTTG
||| ||| |||| ||  = 3 differences
GGGATGCACTCGCTG
```
* HD increases with sequence length.
* We can divide the HD by sequence length.  This gives us the [p-distance](https://www.megasoftware.net/web_help_7/hc_p_distance_nucleotide.htm) (*p* is for *proportional*).

> What is the p-distance for the above example?

---

# Multiple hits

* A big problem with the Hamming and *p*-distances is that they tend to  underestimate the amount of evolution.
  * Suppose we are tracking the evolution of a sequence `AAAA`
  * A single mutation occurs resulting in `AGAA` ($p=0.25$)
  * As we continue to accumulate mutations, the chance that we mutate a site *that has already undergone a mutation* increases.
* Multiple hits mask evidence of previous evolution (`A` $\rightarrow$ `G` $\rightarrow$ `A`).

---

# Modeling multiple hits

* Let's make a few lousy assumptions:
  1. Each residue in a sequence evolves independently of the others.
  2. A residue mutates to another at a rate that is constant over time.
  3. A residue is equally likely to mutate to any of the other residues.
  4. The frequency of every residue is the same.
* These define the *Jukes-Cantor* model.

---

# Markov property

* The Jukes-Cantor model describes a Markov process.
* A process has the *Markov property* if the probability of state at time *t* depends only on the state at a previous time *and no further*.
* *i.e.,* the system has no memory.
* For example, [Snakes and Ladders](https://en.wikipedia.org/wiki/Snakes_and_Ladders) is a Markov process.

> What is another example of a process with no memory? A process **with** memory?

---

<section data-state="markov-slide">
    <h1>Markov models</h1>
    <ul>
      <li>Jukes-Cantor is an example of a <i>continuous time Markov model</i>.</li>
      <li>A system is in one of two or more discrete states.  After some random amount of time, it switches between states.</li>
    </ul>
    <center>
    <div id="markov" class="fig-container"
         data-fig-id="fig-markov"
         data-file="/include/markov-chain.html"
         style="height:300px">
    </div>
    <div></div>
    </center>

<small><small>
Based on <a href="http://setosa.io/blog/2014/07/26/markov-chains/index.html"/>Markov Chains: A visual explanation by Victor Powell</a>
</small></small>
</section>

---

# Jukes-Cantor formula

* Because of multiple hits, the actual number of mutations tends to be *greater* than the number of visible differences.
  * Given a p-distance ($p$) between two sequences, the JC estimated number of mutations ($\hat{d}$) is:

  $$\hat{d}=-\frac{3}{4}\ln\left(1-\frac{4}{3}p\right)$$

* This is the mean (expected) estimate &mdash; evolution is stochastic, so there will be variation around the mean!

> At what p-distance does the Jukes-Cantor formula fail?

---

<section data-state="jukes-slide">
    <h1>Jukes-Cantor simulation</h1>
    <br/>
    <div id="jukes" class="fig-container"
         data-fig-id="fig-jukes"
         data-file="/include/jukes-cantor.html"
         style="height:4000px">
    </div>
</section>

---

# Why does this matter?

* The Jukes-Cantor model enables us to estimate the divergence time of two populations (species or infections) more accurately.
* Two distantly related species might otherwise look about the same as more closely related species.
  * The expected p-distance asymptotes to a maximum value.
  * A small change in p-distance can imply an enormous change in evolutionary time.

---

<img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/TobermoryGrotto105a.jpg" height=600/>

---

# Clustering

* A cluster is a subset (group) of objects that are more similar to each other than objects outside the cluster.
  * Similarity is just the opposite of distance!
* Clustering is subjective.  Our brains are wired to see patterns where none exist.
![](/img/random.png)

---

# Clustering methods

* Clustering is useful:
  * for finding real patterns, *e.g.*, biological pathways
  * to reduce a large database to a representative subset
  * to define species, other taxonomic groupings
  * to detect anomalies (outbreaks)

* There are an enormous number of methods (algorithms) for clustering data.
  * It is easiest to talk about different categories of clustering methods.

---

# Supervised and unsupervised clustering

<table>
<tr>
<td style="font-size: 28px;">
<ul>
<li>Terms associated with machine learning.</li>
<li><i>Supervised</i> clustering implies that you have assigned some data to clusters yourself, and leave the rest to the machine.</li>
  <ul>
  <li>If no new clusters, then this is basically classification.</li>
  </ul>
<li><i>Unsupervised</i> clustering means that the machine has to figure it all out itself.</li>
</ul>
</td>
<td width="35%">
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
      <small>
      Plots were generated in R using the `mouse` dataset from the <a href="https://github.com/elki-project/elki">ELKI project</a>.
      </small>
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
        <li>Also find the mean and variance parameters of each Gaussian that maximizes likelihood.</li>
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

* Another class of unsupervised, nonparametric clustering methods.
  * Acts on a distance matrix $d$ relating observations.
* Hierarchical clustering can be agglomerative or divisive.
* An *agglomerative* method starts with every item in its own cluster, and progressively merges clusters that are the most similar.
  * Choosing which clusters to merge is determined by linkage criteria.
* A *divisive* method starts with all items in one cluster, and progressively splits clusters in two.


---

# Linkage criteria

* Merging clusters updates the distance matrix (remove two rows and columns, add a new row and column).
* Complete linkage clustering

  $d(AB,X) = \max(d(A,X), d(B,X))$
  * if least similar members are joined, then all other members join

* Single linkage clustering,

  $d(AB,X) = \min(d(A,X), d(B,X))$
  * merged groups can have members that are highly dissimilar

---

# In-class example: Single-linkage hierarchical clustering

|   |  A |  B |  C |  D |  E |
|---|---:|---:|---:|---:|---:|
| A |  0 |  7 |  8 | 11 | 13 |
| B |    |  0 |  4 |  8 | 10 |
| C |    |    |  0 |  9 |  8 |
| D |    |    |    |  0 |  5 |
| E |    |    |    |    |  0 |

* starts with $(A), (B), (C), (D), (E)$
* next $(A), (B, C), (D), (E)$
* finished with $((A, (B, C)), (D, E))$

---

# Unweighted pair group method with arithmetic mean

* UPGMA, also known as **average linkage clustering**.

1. Join clusters $X$, $Y$ with shortest *average* distance:
$$d(X,Y)=\sum_{x\in X} \sum_{y\in Y} d(x,y) / (n_X n_Y)$$
2. Replace $X$ and $Y$ with cluster $X\cup Y$, where:
$$d(X\cup Y, Z) = \frac{n_{\scriptsize X} d(X,Z) + n_{\scriptsize Y} d(Y,Z)} {n_{\scriptsize X} + n_{\scriptsize Y}}$$
3. Go to step 1 until only one cluster remains (the root).

---

# Dendrograms

* The end result of hierarchical clustering is a tree or "dendrogram"
* Lengths of branches connecting $x$ and $y$ to their "ancestor" are calculated by splitting the distance $d(x, y)$ in half.

<img src="/img/hclust.svg" width="1000px"/>

<small><small>
Source: Gene expression data from M Love and R Irizarry, https://github.com/genomicsclass/tissuesGeneExpression
</small></small>

---


# Extracting clusters from dendrograms

* The output of hierarchical clustering is a tree, not clusters.
  * It remains to "cut" the tree at some point to extract clusters.
  * *e.g.*, cutting near the root tends to yield two large clusters.
* Location of the cut point is a subjective decision.

<img src="/img/hclust-cut.svg">

---

# Choosing the number of clusters

<table>
  <tr>
    <td>
      <ul>
        <li>For example, the elbow method uses the diminishing returns of "unexplained variance" with increasing number of clusters, $k$</li>
        <li>For each $k$, calculate the total within-cluster sum-of-squares (WCSS):</li>
        $$\sum_{i=1}^k \sum_{j\in {C_i}} (x_j - \bar{x}_i)^2$$
        <li>Subjectively choose point where increasing $k$ does not yield a sufficient reduction in total WCSS.</li>
      </ul>
    </td>
    <td width="40%">
      <img src="/img/elbow-method.svg"/>
      <small>
      Plot of total WCSS against number of centers for k-means clustering of mouse dataset in R.
      </small>
    </td>
  </tr>
</table>


---

# Heatmaps

<table>
  <tr>
    <td style="font-size: 20pt">
      <ul>
        <li>A popular method for <a href="https://en.wikipedia.org/wiki/Data_visualization">visualizing</a> a matrix of intensities, <i>e.g.</i>, gene expression.</li>
        <li>Hierarchical clustering can be used to reorder rows/columns to bring together similar observations/variables.</li>
        <li>Dendrograms can be displayed along respective axes.</li>
      </ul>
    </td>
    <td width="50%">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Heatmap.png/600px-Heatmap.png"/>
      <small>
      Image source: <a href="https://commons.wikimedia.org/wiki/File:Heatmap.png">https://commons.wikimedia.org/wiki/File:Heatmap.png</a>, Public Domain.
      </small>
    </td>
  </tr>
</table>

---

# Clustering on networks

* Remember a *genetic distance* is used to quantify the difference between two sequences.
  * *e.g.*, Jukes-Cantor (JC69)
  * Pick a distance threshold &mdash; any pair of sequences with a distance below that threshold are assigned to the same cluster.
* Clusters are often visualized as networks ([graphs](https://en.wikipedia.org/wiki/Network_theory)) where each node represents a sequence.
  * Similar sequences are connected by [edges](https://en.wikipedia.org/wiki/Glossary_of_graph_theory_terms#edge).


---

<section data-state="tn93-slide">
    <div id="tn93" class="fig-container"
         data-fig-id="fig-tn93"
         data-file="/include/clustering.html"
         style="width:800px; margin:0 auto; height:700px">
    </div>
</section>

---

<section data-background="#333" style="color:white">

<h1 style="color:white">Key points</h1>

* Genetic diversity can be measured by calculating statistics at each site, and then averaging over parts or the length of the alignment.

* A genetic distance maps two sequences to a non-negative number.
  * Better genetic distances correct for multiple hits.

* There are non-parametric and parametric methods for unsupervised clustering.
* Hierarchical clustering converts a distance matrix into a tree that represents the order in which objects are merged into clusters.

</section>
