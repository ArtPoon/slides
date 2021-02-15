# MIMM4750G
## Building trees
<img src="https://imgs.xkcd.com/comics/phylogenetic_tree.png"/>

---

# What is a phylogeny?

* A tree-based hypothesis about how populations are related by common ancestors.
* Each population (species/infection) is represented by a tip of the tree.
* Connected by branches to common ancestors (nodes).
![](/img/phylogeny-crop.png)

---

# Nodes

* A node represents a common ancestor of one or more descendants.
* If a node has two descendants, then it is a *binary* or *bifurcating* node.
* A node with more than two descendants is a *polytomy* (not a dichotomy).
* A polytomy is *soft* if there is not enough data to resolve it into binary nodes; otherwise it is *hard* (a true simultaneous split).

---

# Branches

* A branch connects a descendant node to its immediate ancestral node.
* The length of a branch *may* represent:
  * genetic distance
  * elapsed time
  * nothing at all (unscaled trees)
* Be very cautious of unscaled trees - they make the tree look more resolved (fewer soft polytomies) than is supported by the data!

---

# Tree layouts


<table>
  <tr>
    <td style="font-size: 18pt;">
    <ul>
      <li>The plot on the right displays four different layouts of the exact same tree.</li>
      <li>The vertical dimension for rectangular and slanted layouts, and angle for radial layout, <u>exist only to separate tips</u>.</li>
      <li>Rotating branches around a node has no affect on what the tree represents.</li>
    </ul>
    </td>
    <td width="55%">
      <img src="/img/tree-layouts.svg" height="450px"/>
    </td>
  </tr>
</table>

---

<center>
<iframe src="http://phylotree.hyphy.org/" height="550px" width="800px">
</iframe>
</center>

---

# Clades

<table>
  <tr>
    <td style="font-size: 18pt;">
    <ul>
      <li>A clade is a set of descendants of an ancestral node.</li>
      <li>A <i>monophyletic</i> clade contains <b>all</b> the descendants of the node.</li>
      <li>A <i>paraphyletic</i> clade contains only some of the descendants.</li>
      <ul>
      <li>Birds are a monophyletic clade.</li>
      <li>Reptiles are a paraphyletic clade that contains birds.</li>
      </ul>
      <li>A <i>polyphyletic</i> clade does not contain the common ancestor of the descendants.</li>
    </ul>
    </td>
    <td><img src="/img/clades.png" width="400px"/></td>
  </tr>
</table>


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
  <li>Grouped into classes, <i>e.g.,</i> &alpha;, &beta;, &gamma;, etc.</li>
  <li>This phylogeny reconstructs the emergence of pathogenic species across classes (red branches).</li>
  <li>Study proposes that ancestral Proteobacteria were free-living bacteria.</li>
  </ul>
</td>
<td width="55%">
  <img src="/img/proteobacteria.png" width="550px">
  <small>Figure from Sachs <i>et al.</i> (2014) <i>Proc Roy Soc Lond B</i>, 10.1098/rspb.2013.2146</small>
</td>
</table>

---

<table>
  <tr>
    <td style="vertical-align: middle; font-size: 18pt;">
      <h1>Origin of HIV-1</h1>
      <ul>
        <li>Oral polio vaccine hypothesis: that SIV entered the human population via contaminated vaccine.</li>
        <li>SIV sequenced from chimpanzee faecal samples collected in the Democratic Republic of the Congo.</li>
        <li>SIV samples from Kisangani (site of vaccine manufacture) clearly separate from clade containing HIV-1.</li>
      </ul>
    </td>
    <td width="40%">
      <img src="/img/worobey2004.png" width="400px"/>
          <small>
    Image credit: Worobey <i>et al.</i> (2004) Nature. https://doi.org/10.1038/428820a
    </small>
    </td>
  </tr>
</table>

---

# Human malaria is polyphyletic
* Virulence has been gained and lost multiple times in history of *Plasmodium* genus.
<img src="/img/rsos171780f02.jpg" width="600px"/>
<small><small>
Image credit: Figure 2 from Galen <i>et al.</i> 2018. Roy Soc Open Sci 5: <a href="https://royalsocietypublishing.org/doi/10.1098/rsos.171780">171780</a>.
</small></small>

---

> According to this tree, at least how many times has SIV moved into the human species?

<img src="/img/HIV-tree.png" width=400px/>

<small><small>Modified from Joy *et al.* (2015) Origin and Evolution of Human Immunodeficiency Viruses. <u>Global Virology I.</u> Springer, New York.</small></small>

---

<section data-state="numtrees-slide">
    <h1>How many trees?</h1>
    <ul>
      <li>There are an enormous number of possible trees relating even a small number of species!</li>
    </ul>
    <div id="howmany" class="fig-container"
         data-fig-id="fig-howmany"
         data-file="/include/numtrees.html"
         style="height:200px;">
    </div>
    <blockquote>
    Why are there always more possible rooted trees than unrooted trees?
    </blockquote>
</section>

---

# Distance-based methods

* Building a tree can be viewed as a clustering problem!
* We already know how to calculate genetic distances between pairs of sequences.
* Agglomerative (hierarchical) clustering means we group the most similar pair of sequences and progress from there.

---

# UPGMA

* Unweighted Pair Group Method with Arithmetic mean.
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
<td style="vertical-align:middle; font-size: 20pt">
  <ul>
  <li>Because of how UPGMA computes the distances of ancestral nodes, it generates trees where every tip is the same distance from the root.</li>
  <li>This is what you would get if:</li>
    <ol>
      <li>we sample each tip at the same moment in time.</li>
      <li>the rate of evolution is constant.</li>
    </ol>
  </ul>
  <blockquote>
  Why might you expect ultrametric trees to be a bad choice for viruses?
  </blockquote>
</td>
<td width="40%">
  <img src="/img/ultrametric.png"/>
</td>
</table>

---

# Neighbor-joining trees

* Another distance-based clustering method for making trees
* Start with a "star" phylogeny: every tip directly descended from the root
* Add ancestral nodes that minimize the total branch length of the tree
* NJ is a greedy heuristic algorithm!

---

# NJ algorithm

1. Calculate distance matrix $d_{ij}$
2. Calculate vector `$u_i=\sum_{j=1}^{n}d_{ij} / (n-2)$`
   * The mean distances to each node, indexed by $i$.
3. Find which $i$ and $j$ that minimize $d_{ij} - u_i - u_j$
   * Select the shortest distance given what's typical for those nodes.
4. Place new node $ij$ ancestral to $i$ and $j$.
5. Calculate new distances from $ij$ to $i$, $j$ and previous ancestor.
   * (Formulae not shown.)

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

* [MEGA](https://www.megasoftware.net/) - cross-platform GUI application
* [RapidNJ](http://birc.au.dk/software/rapidnj/) - command-line program (source code)
* [R package ape](https://rdrr.io/cran/ape/man/nj.html) - not recommended, slow

---

# Further readings

* [Building trees](https://artpoon.github.io/BioID/Trees.html)
