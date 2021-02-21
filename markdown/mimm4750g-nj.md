# MIMM4750G
## Distance-based trees
<img src="https://imgs.xkcd.com/comics/herpetology.png"/>

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
