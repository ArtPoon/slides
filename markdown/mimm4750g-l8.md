# MIMM4750G
## Building trees
<img src="https://imgs.xkcd.com/comics/birds_and_dinosaurs.png" width="300px"/>

---

# What is a phylogeny?

* A tree-based hypothesis about how populations are related by common ancestors.
* Each population (species/infection) is represented by a tip of the tree.
* Connected by branches to common ancestors (nodes).
![](/img/phylogeny-crop.png)

---

# What is a root?
* Phylogenies can be rooted or unrooted.
* The root is a hypothesis about what point on the tree represents the earliest time.
![](/img/trees.png)
* There are different ways to display trees: (*left*) usually used for unrooted trees, (*right*) usually rooted *but not always*.

---

# Phylogenies and infectious disease

* Trees represent how pathogen diversity is structured into subtypes.
* How different pathogen species are related to each other.
* At a population level, a tree tells us something about how a pathogen spread through host populations.

---

# Evolution of pathogenic proteobacteria

<table>
<tr>
<td style="vertical-align:middle">
  <ul>
  <li>Proteobacteria is a phylum containing many human pathogens.</li>
  <li>Grouped into classes, *e.g.,* &alpha;, &beta;, &gamma;, etc.</li>
  <li>This phylogeny reconstructs the emergence of pathogenic species across classes (red branches).</li>
  <li>Study proposes that ancestral Proteobacteria were free-living bacteria.</li>
  </ul>
</td>
<td width="55%">
  <img src="/img/proteobacteria.png" width="550px">
  <small>Figure from Sachs *et al.* (2014) *Proc Roy Soc Lond B*, 10.1098/rspb.2013.2146</small>
</td>
</table>

---

>**INCA Q1** - According to this tree, at least how many times has SIV moved into the human species?

<img src="/img/HIV-tree.png" width=400px/>

<small><small>Modified from Joy *et al.* (2015) Origin and Evolution of Human Immunodeficiency Viruses. <u>Global Virology I.</u> Springer, New York.</small></small>

---

# Ebola virus outbreak in West Africa

<video data-autoplay data-src="/img/nature22040-sv1.mp4" type="video/mp4"></video>
<small><small>Supplementary video, Dudas <i>et al.</i> 2017, Nature 544.</small></small>

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
</section>
>**INCA Q2** Why are there always more possible rooted trees than unrooted trees?

---

# Distance-based methods

* Building a tree can be viewed as a clustering problem!
* We already know how to calculate genetic distances between pairs of sequences.
* Agglomerative (hierarchical) clustering means we group the most similar pair of sequences and progress from there.

---

# UPGMA

* Unweighted pair group method with arithmetic mean.
* Every sequence starts out as a cluster of one ($n_{\scriptsize X}=1$).
* Algorithm:
  1. Join clusters $X$, $Y$ with minimum distance:
       
     `$$d(X,Y)=\sum_{x\in X} \sum_{y\in Y} d(x,y) / (n_X n_Y)$$`
  2. Replace $X$ and $Y$ with cluster $X\cup Y$, where:
     
     `$$d(X\cup Y, Z) = \frac{n_{\scriptsize X} d(X,Z) + n_{\scriptsize Y} d(Y,Z)} {n_{\scriptsize X} + n_{\scriptsize Y}}$$`
  3. Go to step 1 until only one cluster remains (the root).

---

# Ultrametric trees

<table>
<tr>
<td style="vertical-align:middle">
  <ul>
  <li>Because of how UPGMA computes the distances of ancestral nodes, it generates trees where every tip is the same distance from the root.</li>
  <li>This is what you would get if:</li>
    <ol>
      <li>we sample each tip at the same moment in time.</li>
      <li>the rate of evolution is constant.</li>
    </ol>
  </ul>
</td>
<td width="40%">
  ![](/img/ultrametric.png)
</td>
</table>

---

# Neighbor-joining trees

* Another distance-based clustering method for making trees
* Start with a "star" phylogeny: every tip directly descended from the root
* Add ancestral nodes that minimize the total branch length of the tree

---

# NJ algorithm

1. Calculate distance matrix $d_{ij}$
2. Calculate vector `$u_i=\sum_{j=1}^{n}d_{ij} / (n-2)$`
3. Find which $i$ and $j$ that minimize $d_{ij} - u_i - u_j$
4. Place new node $ij$ ancestral to $i$ and $j$.
5. Calculate new distances from $ij$ to $i$, $j$ and previous ancestor.

---

<section data-state="nj-slide">
    <h1>Neighbor-joining</h1>
    <br/>
    <div id="nj" class="fig-container"
         data-fig-id="fig-nj"
         data-file="/include/njtree.html"
         style="height:800px">
    </div>
</section>

---

# Pros and cons of NJ

* Distance-based methods are faster than likelihood-based methods (next week)
* Unlike UPGMA, NJ is robust to changing rates of evolution
* Effective for massive data sets.
* Demonstrably accurate for reconstructed trees from simulated data.

---

# Software for NJ

* [MEGA](https://www.megasoftware.net/)
* [RapidNJ](http://birc.au.dk/software/rapidnj/)
* [R package ape](https://rdrr.io/cran/ape/man/nj.html)



