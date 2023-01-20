# MIMM4750G
## Distance-based trees
<img src="https://imgs.xkcd.com/comics/herpetology.png"/>

---

# What is a phylogeny?

* A tree-based hypothesis about how populations are related by common ancestors.
* Each population (species/infection) is represented by a tip of the tree.
* Connected by branches to common ancestors (nodes).

<img width="400px" src="/img/phylogeny-crop.png"/>

---

# Nodes

* A node represents a common ancestor of one or more descendants.
  * If a node has two descendants, then it is a *binary* or *bifurcating* node.
* A node with more than two descendants is a *polytomy* (not a dichotomy).
  * A polytomy is *soft* if there is not enough data to resolve it into binary nodes (*i.e.*, is A more related to B or to C?).
  * Otherwise it is *hard* polytomy (a true simultaneous split).

---

# Branches

* A branch connects a descendant node to its immediate ancestral node.
  * A <u>terminal</u> branch ends at a tip (observed).
  * An <u>internal</u> branch connects unobserved ancestors.
* The length of a branch *may* represent:
  * genetic distance
  * elapsed time
  * nothing at all (unscaled trees)

---

# Distance-based methods

* Building a tree can be viewed as a clustering problem!
* We've already talked about:
  * how to calculate genetic distances between pairs of sequences
  * how to use these distances to cluster sequences that are highly similar
* Agglomerative (hierarchical) clustering means we group the most similar pair of sequences and progress from there.

---

# UPGMA

* Unweighted Pair Group Method with Arithmetic mean
* Every sequence starts out as a cluster of one ($n_{\scriptsize X}=1$).
   1. Join clusters $X$, $Y$ with minimum distance:
   `$$d(X,Y)=\sum_{x\in X} \sum_{y\in Y} d(x,y) / (n_X n_Y)$$`
   2. Replace $X$ and $Y$ with cluster $X\cup Y$, where:
   `$$d(X\cup Y, Z) = \frac{n_{\scriptsize X} d(X,Z) + n_{\scriptsize Y} d(Y,Z)} {n_{\scriptsize X} + n_{\scriptsize Y}}$$`
   3. Go to step 1 until only one cluster remains (the root).

---

# UPGMA

* UPGMA produces rooted trees that are ultrametric.
  * Every tip is the same distance from the root.
  * Akin to assuming that sequences were sampled at the same time, and a constant rate of evolution (molecular clock).
* Fast to compute!
  * Occasionally used to quickly generate an initial tree that is "good enough"
  * Less accurate than other methods.

---

# Neighbor-joining trees

* Another distance-based clustering method for making trees
* Start with a "star" phylogeny: every tip directly descended from the root
* Add a node ancestral to $i$ and $j$ that minimizes the total branch length of the tree
* Remove rows and columns for $i$ and $j$ from the distance matrix, and update matrix with new row/column for node $ij$.


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
* Ambiguous about how to resolve ties (step 3).
* NJ can assign negative branch lengths, *e.g.*, $u_j > d_{ij} + u_i$
  * Common practice is to set these to zero length.
* Distance-based methods do not handle rate variation as well.

---


* Distance-based methods compare pairs of sequences:

<img src="/img/variation-among-sites.png"/>

* These methods cannot detect variation among sites because there is no way of storing information about where differences were observed.
* As we will see later, likelihood methods can fit a model of rate variation to the entire alignment, not just pairs of sequences.

---

# Software for NJ

* [MEGA](https://www.megasoftware.net/) - cross-platform GUI application
* [RapidNJ](http://birc.au.dk/software/rapidnj/) - command-line program (source code)
* [NINJA](http://nimbletwist.com/software/ninja/) - Java-based command-line program
* [R package ape](https://rdrr.io/cran/ape/man/nj.html) - not recommended, slow

---

# Writing trees

* How do we record a tree into a plain text file?
* [Serialization](https://en.wikipedia.org/wiki/Serialization) is the process of converting a data structure into a format that can be stored as a bitstream.
  * Serialization and deserialization requires a standard format.
* Parentheses or brackets are a common way of serializing nested data structures.
  * For example, [JSON]() uses `{}` and `[]` to store nested associative lists and arrays, respectively.

---

# The Newick format

<table>
  <tr>
    <td>
      <ul>
        <li>The Newick&ast; format uses parentheses to represent the nested structure of trees.</li>
        <li>The tree to the right is written as:
          <code>(((t1:0.15,t2:0.20):0.49,(t3:0.93,t5:0.55):0.03):0.57,t4:0.94);</code>
        </li>
        <li>Nodes that directly descend from a common ancestor are separated by commas: <code>(t1,t2)</code></li>
        <li>The length of the branch terminating in node <code>t1</code> is prefixed by a colon: <code>t1:0.15</code></li>
        <li>Internal nodes can be labeled, <i>e.g.,</i>: <code>(t1:0.15,t2:0.20)ancestor:0.49</code></li>
      </ul>
    </td>
    <td width="35%">
      <img src="/img/newick-tree.svg" height="350px"/>
    </td>
  </tr>
</table>

<small><small>
&ast; The format is named after [Newick's Lobster House](https://www.newicks.com/), where it was developed and the authors had dinner.
</small></small>

---

# Uncertainty about the tree

* There is an enormous number of possible trees relating your sequences.
* How do we quantify how uncertain we are about different parts of the tree?
  * For example, for more complex organisms we could sequence additional genes.
  * What if we can't collect any more data?  <i>e.g.,</i> already used full length genomes.

---

# Bootstrapping&ast;

* If you can't collect any more data from the world, then make your data the world.
  * Take random samples of data from your new world, <i>with the same sample size</i>.
  * Since sampling without replacement would simply be a [permutation](https://en.wikipedia.org/wiki/Permutation) of your data, bootstrapping samples *without* replacement.
  * In other words, the same measurement may appear twice or more times!

<small><small>
&ast; The name derives from the popular saying of "pulling yourself up by your own bootstraps".
</small></small>

---

# Bootstrapping alignments

* Sample columns of the alignment *at random with replacement* until you have a new alignment (with the same dimensions as the original).
<img src="/img/bootstrapping.png" height="120px"/>
<img src="/img/bootstraps.png" height="220px"/>

---

# Bootstrap trees

* Go through the same process of building a tree from each alignment, *e.g.,* by neighbor-joining.
  * The main cost of bootstrapping is the unavoidable cost of repeating the analysis!
* The support value of an internal node $A$ is the frequency that the monophyletic clade rooted on $A$ appears in these trees.

| Clade | Count | Support |
|-------|-------|---------|
| `((A,B),C)` | 79 | 0.79 |
| `((A,C),B)` | 16 |  |
| `((A,B),D)` | 5 |  |

---

# Interpreting support values

* What does a bootstrap support of 90% mean?
  * some interpret it as the chance that the clade would be observed if the experiment was repeated with *new data*
  * others as the probability that the clade is present in the *true tree* (probably not statistically valid).
* If the support value at a branch fall below some threshold, then it is collapsed into a polytomy.

---

# Further readings

* [Neighbor-joining revealed](https://academic.oup.com/mbe/article/23/11/1997/1322446)
* [Prospects for inferring very large phylogenies by using the neighbor-joining method](https://www.pnas.org/content/101/30/11030.short)
* [Felsenstein, The Newick tree format](https://evolution.genetics.washington.edu/phylip/newicktree.html)