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

<table>
  <tr>
    <td>
      <ol>
        <li>Calculate distance matrix $d_{ij}$</li>
        <li>
        For each node $i$, calculate $u_i=\sum_{j\ne i} d_{ij} / (n-2)$
        <ul>
          <li>The mean distance to every other node (almost).</li>
        </ul>
        </li>
        <li>Find pair $i$ and $j$ that minimizes $d_{ij} - u_i - u_j$</li>
        <ul>
          <li>The shortest distance given what's typical for those nodes.</li>
          <li>Nodes that are close to everybody else are not necessarily chosen.</li>
        </ul>
      </ol>
    </td>
    <td width="35%">
      <img src="/img/nj-circles.svg" height="300px"/>
    </td>
  </tr>
</table>

---

# NJ algorithm (continued)

4. Place new *internal* node $ij$ ancestral to $i$ and $j$.
5. Calculate new distances from $ij$ to $i$, and from $ij$ to $j$:
   $v_i = \frac{1}{2} d_{ij} + \frac{1}{2}(u_i - u_j)$

   $v_j = \frac{1}{2} d_{ij} + \frac{1}{2}(u_j - u_i)$

6. Calculate distances from $ij$ to all remaining tips:
   $d_{(ij),k} = (d_{ik} + d_{jk} - d_{ij}) / 2 $

7. Delete rows/columns $i$ and $j$ from $d$.

8. Repeat until $d$ contains no more tip nodes.

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

# Rate variation among sites

* Some parts of the genome evolve more rapidly than others.
  * Conserved, functionally important sequences.
  * Surface-exposed proteins, escape from neutralizing antibodies.

<img src="/img/variation-among-sites2.png" height="350px"/>

<small><small>
Part of the NS5A region (including V3 domain) in an alignment of hepatitis C virus polypeptide sequences.
</small></small>

---


* Distance-based methods compare pairs of sequences:

<img src="/img/variation-among-sites.png" height="30px"/>

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

# Failing to understand bootstraps

Phylogenetic tree from an HIV transmission court case in Taiwan
<img src="/img/taiwan-source-attribution2.png" height="400px"/>

<small><small>
Source: WY Li <i>et al.</i> (2020) Source identification of HIV-1 transmission in three lawsuits Using Ultra-Deep pyrosequencing and phylogenetic analysis. [J Microbiol Immunol Infect](https://www.sciencedirect.com/science/article/pii/S1684118220300025?via%3Dihub), <i>in press</i>.
</small></small>

---

# Further readings

* [Neighbor-joining revealed](https://academic.oup.com/mbe/article/23/11/1997/1322446)
* [Prospects for inferring very large phylogenies by using the neighbor-joining method](https://www.pnas.org/content/101/30/11030.short)
* [Felsenstein, The Newick tree format](https://evolution.genetics.washington.edu/phylip/newicktree.html)