# MIMM4750G
## Distance-based trees
<img src="https://imgs.xkcd.com/comics/herpetology.png"/>

---

# Distance-based methods

* Building a tree can be viewed as a clustering problem!
* We already know how to calculate genetic distances between pairs of sequences.
* Agglomerative (hierarchical) clustering means we group the most similar pair of sequences and progress from there.

---

# Unweighted Pair Group Method with Arithmetic mean

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
2. For each node $i$, calculate `$u_i=\sum_{j\ne i} d_{ij} / (n-2)$`
   * The mean distance to every other node (almost).
3. Find which pair $i$ and $j$ minimizes $d_{ij} - u_i - u_j$
   * The shortest distance given what's typical for those nodes.
   * Nodes that are close to everybody else are not necessarily chosen.

---

# NJ algorithm (continued)

4. Place new *internal* node $ij$ ancestral to $i$ and $j$.
5. Calculate new distances from $ij$ to $i$, and from $ij$ to $j$:
   $v_i = \frac{1}{2} d_{ij} + \frac{1}{2}(u_i - u_j)$

   $v_j = \frac{1}{2} d_{ij} + \frac{1}{2}(u_j - u_i)$

6. Calculate distances from $ij$ to all remaining tips:

   $$


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

# Why use NJ?

* Neighbor-joining is provably&ast; [consistent](https://en.wikipedia.org/wiki/Consistency_(statistics)) &mdash; as you add more data, it converges to the true answer.
* Unlike UPGMA, NJ is robust to changing rates of evolution.
* Distance-based methods are faster than likelihood-based methods.
  * Well suited to enormous data sets.

<small><small>
&ast; Gascuel O. (1997). [Concerning the NJ algorithm and its unweighted version](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.4.1112&rep=rep1&type=pdf).  Mathematical hierarchies and biology (AMS).
</small></small>

---

# Limitations of NJ

* Need to store a potentially massive distance matrix (increases with $N^2$ for $N$ sequences).
* Ambiguous about how to resolve ties.
* NJ can assign negative branch lengths.
* Distance-based methods do not handle rate variation as well.
* Results in unrooted tree.

---

# Negative branch lengths


---

# Variation across sites

* Distance methods cannot propagate information about variation in rates of evolution

---

# Uncertainty about the tree

* What if we can't collect more data?

---

# Non-parametric bootstrap

---

# Counting clades


---

# Interpreting the bootstrap

( Gascuel )

---

# Software for NJ

* [MEGA](https://www.megasoftware.net/) - cross-platform GUI application
* [RapidNJ](http://birc.au.dk/software/rapidnj/) - command-line program (source code)
* [NINJA](http://nimbletwist.com/software/ninja/) - Java-based command-line program
* [R package ape](https://rdrr.io/cran/ape/man/nj.html) - not recommended, slow

---

# Use of NJ in other methods

* FastTree2 starts with a NJ tree before carrying out likelihood-based search.


---

# Further readings

* [Neighbor-joining revealed](https://academic.oup.com/mbe/article/23/11/1997/1322446)
* [Prospects for inferring very large phylogenies by using the neighbor-joining method](https://www.pnas.org/content/101/30/11030.short)