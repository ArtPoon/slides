# MBI 3100A
## Trees
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

# Unscaled trees
* Be very cautious of unscaled tree layouts
  * They make the tree look more resolved (fewer soft polytomies).
  * This is a common ploy to mislead the audience!

![](/img/unscaled-tree.svg)

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

# Phylogenies can be rooted or unrooted.
* The root is a hypothesis about what point on the tree represents the earliest
time.
* Just because a tree is presented in a left-to-right (*e.g.*, rectangular) layout does *not* mean that it is rooted!
* The choice of which node is furthest to the left is completely arbitrary.


---

Try clicking and dragging the root (yellow node) around.

<iframe style="width: 1000px; height: 500px" src="/include/rooting.html">
</iframe>

---

# Outgroup rooting

* An *outgroup* is a species or infection that is not closely related to the sample set.
* We place the root at the point where the branch leading to the outgroup intersects the tree.
  * If the outgroup is too *close*, then the root is too influenced by sampling bias (our choice of outgroup).
  * If the outgroup is too *distant*, then where it intersects the tree is subject to random variation.

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

# Pathogenic proteobacteria are polyphyletic

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

# Writing trees

* How do we record a tree into a plain text file?
* [Serialization](https://en.wikipedia.org/wiki/Serialization) is the process of converting a data structure into a format that can be stored as a bitstream.
  * Serialization and deserialization requires a standard format.
* Parentheses or brackets are a common way of serializing nested data structures.
  * For example, [JSON]() uses `{}` and `[]` to store nested associative lists and arrays, respectively.

---

# Newick tree strings

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
  * Every time we group two objects (A and B), we create an internal node (AB) in the tree.
  * Approaches vary with how we calculate the distances of new node AB to remaining nodes.

---

# Dendrograms

* Preceding algorithms give us branching orders.
* Branch lengths are calculated under the constraint that all descendants have an equal distance to their ancestor.
  * The resulting tree is called [ultrametric](https://en.wikipedia.org/wiki/Ultrametric_space)

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/UPGMA_Dendrogram_Hierarchical.svg/800px-UPGMA_Dendrogram_Hierarchical.svg.png" height="250px"/>

<small><small>
Image source: https://commons.wikimedia.org/wiki/File:UPGMA_Dendrogram_Hierarchical.svg, Creative Commons
</small></small>

---

# UPGMA for phylogenetics

* First used for building phylogenies by [Sokal and Michener](https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1558-5646.1957.tb02884.x) (1958)
  * ... setting off a decade long war between [pheneticists](https://en.wikipedia.org/wiki/Phenetics) and [cladists](https://en.wikipedia.org/wiki/Cladistics)
* Assumes a constant rate of evolution (molecular clock)
* Assumes that every tip was sampled at the same time, or with negligible variation in times (ultrametric trees)
* Performs poorly with variation in branch lengths.



---

# Neighbor-joining trees

* Another agglomerative, distance-based clustering method.
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

# Software for NJ

* [MEGA](https://www.megasoftware.net/) - cross-platform GUI application
* [RapidNJ](http://birc.au.dk/software/rapidnj/) - command-line program (source code)
* [NINJA](http://nimbletwist.com/software/ninja/) - Java-based command-line program
* [R package ape](https://rdrr.io/cran/ape/man/nj.html) - not recommended, slow

---

# Other methods for building trees

* Maximum parsimony / minimum evolution
  * Select the tree that minimizes the number of character state changes (substitutions), given the observed sequences.
* Maximum likelihood
  * Search for the tree that maximizes the probability of an evolutionary model, given the data.
* Both approaches are [NP-hard](https://en.wikipedia.org/wiki/NP-hardness)

---

# Why build trees?

* If you want to find an association between some genetic feature and a phenotype (*e.g.*, disease), you have to adjust for "identity by descent".
  * Sequences may have the same mutation because they inherited it from a common ancestor.
  * Failing to account for IBD can result in a high rate of [false positives](https://en.wikipedia.org/wiki/False_positives_and_false_negatives).
* It is common practice to [stratify human genome data](https://www.sciencedirect.com/science/article/pii/S0140673603125202) by ethnic groups when carrying out a population-level analysis.

---

![](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fng1337/MediaObjects/41588_2004_Article_BFng1337_Fig1_HTML.gif)

<small><small>
Image source: J Marchini <i>et al.</i> (2004) The effects of human population structure on large genetic association studies.  <a href="https://www.nature.com/articles/ng1337">Nature Genetics 36: 512-517.</a>
</small></small>

---

<table>
<tr>
  <td>
    <h1 style="font-size: 24pt">Founder effects</h1>
    <ul>
      <li>When a group of individuals are share some common characteristic because they all related by a recent common ancestor.</li>
      <li>In 2002, <a href="https://www.science.org/doi/full/10.1126/science.1069660">Moore <i>et al.</i></a> reported evidence of HIV-1 adaptation to the immune makeup of different human populations.</li>
      <ul>
      <li>Specific mutations in HIV-1 RT are observed more often in populations carrying <a href="https://en.wikipedia.org/wiki/Human_leukocyte_antigen">HLA</a> allele B51.</li>
      </ul>
      <li>The virus that "founded" an epidemic where the allele is common may happen to carry that mutation by chance.</li>
    </ul>
    <small><small>
    Image source: Bhattacharya <i>et al.</i> (2007) <a href="https://www.science.org/doi/full/10.1126/science.1131528">Founder effects in the assessment of HIV polymorphisms and HLA allele associations.</a>  Science 315: 1583-1586.
    </small></small>
  </td>
  <td width="40%">
    <img src="/img/315_1583_f2.jpeg" height="550px"/>
  </td>
</tr>
</table>

---

# How can we use the tree?

* Map mutations to branches of the tree, then test for correlation between mutations and factors associated with that branch
  * *e.g.*, the HLA genotype of the host associated with that branch
* Felsenstein's [phylogenetic independent contrasts](https://www.journals.uchicago.edu/doi/abs/10.1086/284325): extract branches relating pairs of adjacent tips as independent observations.
<img src="/img/contrasts.svg" height="225px"/>

---

* Sometimes we're actually interested in the tree itself!
  * A common ancestor in a tree of viruses can represent the [zoonotic](https://en.wikipedia.org/wiki/Zoonosis) origin of the epidemic.
  * We can use other information to scale the tree in time, dating the origin.
<img src="/img/bioko.png" height="300px"/>

<small><small>
Image source: M Worobey <i>et al.</i> (2010) Island biogeography reveals the deep history of SIV. <a href="https://www.science.org/doi/full/10.1126/science.1193550"/>Science 329: 1487</a>.
</small></small>

---

# Phylodynamics

<img src="/img/grenfell-table.png" width="600px"/>

<small><small>
Image source: Grenfell <i>et al.</i> Unifying the Epidemiological and Evolutionary Dynamics of Pathogens.  <a href="https://www.science.org/doi/10.1126/science.1090727">Science 303: 327-332</a>.
</small></small>

---

# Further readings

* [Clustering of High Throughput Gene Expression Data](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3491664/)
* [Neighbor-joining revealed](https://academic.oup.com/mbe/article/23/11/1997/1322446)
* [Prospects for inferring very large phylogenies by using the neighbor-joining method](https://www.pnas.org/content/101/30/11030.short)
* [Felsenstein, The Newick tree format](https://evolution.genetics.washington.edu/phylip/newicktree.html)
