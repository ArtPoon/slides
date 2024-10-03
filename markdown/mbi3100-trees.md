# MBI 3100A
## Trees
<img src="https://imgs.xkcd.com/comics/phylogenetic_tree.png"/>

---

### Anatomy of trees
# What is a phylogeny?

* A tree-based hypothesis about how populations are related by common ancestors.
* Each population (species/infection) is represented by a tip of the tree.
* Connected by branches to common ancestors (nodes).
![](/img/phylogeny-crop.png)

---

### Anatomy of trees
# Nodes

* A node represents a common ancestor of one or more descendants.
* If a node has two descendants, then it is a *binary* or *bifurcating* node.
* A node with more than two descendants is a *polytomy* (not a dichotomy).
* A polytomy is *soft* if there is not enough data to resolve it into binary nodes (*i.e.*, is A more related to B or to C?).
  * Otherwise it is *hard* polytomy (a true simultaneous split).

---

### Anatomy of trees
# Branches

* A branch connects a descendant node to its immediate ancestral node.
* A <u>terminal</u> branch ends at a tip (observed).
* An <u>internal</u> branch connects unobserved ancestors.
* The length of a branch *may* represent:
  * genetic distance
  * elapsed time
  * nothing at all (unscaled trees)

---

### Anatomy of trees
# Unscaled trees
* Be very cautious of unscaled tree layouts
  * They make the tree look more resolved (fewer soft polytomies).
  * This is a common ploy to mislead the audience!

![](/img/unscaled-tree.svg)

---

### Anatomy of trees
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

### Anatomy of trees
# Phylogenies can be rooted or unrooted.
* The root is a hypothesis about what point on the tree represents the earliest
time.
* Just because a tree is presented in a left-to-right (*e.g.*, rectangular) layout does *not* mean that it is rooted!
* The choice of which node is furthest to the left is completely arbitrary.


---

### Anatomy of trees
Try clicking and dragging the root (yellow node) around.

<iframe style="width: 1000px; height: 500px" src="/include/rooting.html">
</iframe>

---

### Anatomy of trees
# Outgroup rooting
* One of several ways for rooting a tree.
* An *outgroup* is a species or infection that is not closely related to the sample set.
* We place the root at the point where the branch leading to the outgroup intersects the tree.
  * If the outgroup is too *close*, then the root is too influenced by sampling bias (our choice of outgroup).
  * If the outgroup is too *distant*, then where it intersects the tree is subject to random variation.

---

### Anatomy of trees
# Clades

<table>
  <tr>
    <td style="font-size: 18pt;">
    <ul>
      <li>A clade is a set of descendants of an ancestral node.</li>
      <li>A <i>monophyletic</i> clade contains an ancestral node and <b>all</b> of its descendants.</li>
      <li>A <i>paraphyletic</i> clade contains an ancestral node and only some of the descendants.</li>
      <ul>
      <li>Birds are a monophyletic clade.</li>
      <li>Reptiles are a paraphyletic clade that contains birds.</li>
      </ul>
      <li>A <i>polyphyletic</i> clade does not contain the common ancestor of the descendants.</li>
    </ul>
    </td>
    <td width="40%"><img src="/img/clades.png"/></td>
  </tr>
</table>

---

### Anatomy of trees
# Example: Pathogenic proteobacteria

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

### Anatomy of trees
# Writing trees

* How do we record a tree into a plain text file?
* [Serialization](https://en.wikipedia.org/wiki/Serialization) is the process of converting a data structure into a format that can be stored as a bitstream.
  * Serialization and deserialization requires a standard format.
* Parentheses or brackets are a common way of serializing nested data structures.
  * For example, [JSON]() uses `{}` and `[]` to store nested associative lists and arrays, respectively.

---

### Anatomy of trees
# Newick tree strings

<table>
  <tr>
    <td>
      <ul>
        <li>The Newick&ast; format uses parentheses to represent the nested structure of trees.</li>
        <li>The tree to the right is written as:
          <code>(((t1:0.15,t2:0.20):0.49,(t3:0.93,t5:0.55):0.03):0.57,</code>
          <code>t4:0.94);</code>
        </li>
        <li>Nodes that directly descend from a common ancestor are separated by commas: <code>(t1,t2)</code></li>
        <li>The length of the branch terminating in node <code>t1</code> is prefixed by a colon: <code>t1:0.15</code></li>
        <li>Internal nodes can be labeled, <i>e.g.,</i>: <code>(t1:0.15,t2:0.20)ancestor:0.49</code></li>
      </ul>
    </td>
    <td width="37%">
      <img src="/img/newick-tree.svg" width=550/>
      <small>
      &ast; The format is named after <a href="https://www.newicks.com/">Newick's Lobster House</a>, where it was developed and the scientists had dinner.
      </small>
    </td>
  </tr>
</table>

---

### Building trees
# Distance-based methods

* Building a tree can be viewed as a clustering problem!
* We already know how to calculate genetic distances between pairs of sequences.
* Agglomerative (hierarchical) clustering means we group the most similar pair of sequences and progress from there.
  * Every time we group two objects (A and B), we create an internal node (AB) in the tree.
  * Approaches vary with how we calculate the distances of new node AB to remaining nodes.

---

### Building trees
# Dendrograms

* Preceding algorithms give us branching orders.
* Branch lengths are calculated under the constraint that all descendants have an equal distance to their ancestor.
  * The resulting tree is called [ultrametric](https://en.wikipedia.org/wiki/Ultrametric_space)

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/UPGMA_Dendrogram_Hierarchical.svg/800px-UPGMA_Dendrogram_Hierarchical.svg.png" height="250px"/>

<small><small>
Image source: https://commons.wikimedia.org/wiki/File:UPGMA_Dendrogram_Hierarchical.svg, Creative Commons
</small></small>

---

### Building trees
# UPGMA for phylogenetics

* First used for building phylogenies by [Sokal and Michener](https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1558-5646.1957.tb02884.x) (1958)
  * ... setting off a decade long war between [pheneticists](https://en.wikipedia.org/wiki/Phenetics) and [cladists](https://en.wikipedia.org/wiki/Cladistics)
* Assumes a constant rate of evolution (molecular clock)
* Assumes that every tip was sampled at the same time, or with negligible variation in times (ultrametric trees)
* Performs poorly with variation in branch lengths.

---

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/A_view_from_the_Centennial_Ridges_Trail_in_Algonquin_Provincial_Park_%28Ontario%2C_Canada%29.jpg/2560px-A_view_from_the_Centennial_Ridges_Trail_in_Algonquin_Provincial_Park_%28Ontario%2C_Canada%29.jpg"/>

<small><small>
Image credit: <a href="https://commons.wikimedia.org/wiki/File:A_view_from_the_Centennial_Ridges_Trail_in_Algonquin_Provincial_Park_(Ontario,_Canada).jpg">A view from the Centennial Ridges Trail in Algonquin Provincial Park</a>, Maksim Sokolov (CC BY-SA 4.0).
</small></small>

---

### Building trees
# Neighbor-joining trees

* Another agglomerative, distance-based clustering method.
* Start with a "star" phylogeny: every tip directly descended from the root
* Add ancestral nodes that minimize the total branch length of the tree
* NJ is a greedy heuristic algorithm!

---

### Building trees
<section data-state="nj-slide">
    Neighbor-joining with JavaScript
    <br/>
    <div id="nj" class="fig-container"
         data-fig-id="fig-nj"
         data-file="/include/njtree.html"
         style="height:800px">
    </div>
</section>

---

### Building trees
# Why use NJ?

* Neighbor-joining is provably&ast; [consistent](https://en.wikipedia.org/wiki/Consistency_(statistics)) &mdash; as you add more data, it converges to the true answer.
* Unlike UPGMA, NJ is robust to changing rates of evolution.
* Distance-based methods are faster than likelihood-based methods.
  * Well suited to enormous data sets.

<small><small>
&ast; Gascuel O. (1997). [Concerning the NJ algorithm and its unweighted version](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.4.1112&rep=rep1&type=pdf).  Mathematical hierarchies and biology (AMS).
</small></small>

---

### Building trees
# Limitations of NJ

* Need to store a potentially massive distance matrix ($O(N^2)$ for $N$ sequences).
* NJ can assign negative branch lengths
  * NJ assumes the tree is additive, *i.e.*, `$d_{XY} = d_{AX} + d_{AY}$` where A is ancestral to X and Y.
  * Common practice is to set these to zero length.
* Distance-based methods do not handle rate variation as well.
  * A distance only stores information about a pair of sequences.

---

<section data-state="numtrees-slide">
  <h3>Building trees</h3>
  <h1>How many trees?</h1>
  <ul>
    <li>There are an enormous number of possible trees relating even a small number of species!</li>
    <li>Any method searching for an optimal tree" is <a href="https://en.wikipedia.org/wiki/NP-hardness">NP-hard</a>.</li>
  </ul>
  <div id="howmany" class="fig-container"
        data-fig-id="fig-howmany"
        data-file="/include/numtrees.html"
        style="height:200px;">
  </div>
</section>

---

### Building trees
# Maximum parsimony (MP)

* Select the tree that minimizes the number of character state changes (substitutions), given the observed sequences.
  * Also known as minimum evolution.
* Not statistically consistent: under some conditions, MP will always give the wrong answer, even with unlimited data.
* Still favoured for morphological character evolution (fossil records).

---

### Building trees
# Likelhood-based methods

* Search the space of all possible trees for one that maximizes the probability of an evolutionary model, given the data.
  * The resulting estimate is a **maximum likelihood tree**.
* Statistically consistent: will converge to correct answer with enough data.
* We can also generate a random sample of trees with both high likelihood and accordance with our [prior belief](https://en.wikipedia.org/wiki/Prior_probability) (Bayesian inference).
  * More feasible with increasingly powerful computers.

---

### Building trees
# Software for building trees

| Name  | Methods | Notes |
|-------|---------|-------|
| [MEGA](https://www.megasoftware.net/) | NJ, MP, ML | Cross-platform GUI application |
| [RapidNJ](http://birc.au.dk/software/rapidnj/) | NJ | Command-line program |
| [NINJA](http://nimbletwist.com/software/ninja/) | NJ | Java-based command-line program |
| [R package ape](https://rdrr.io/cran/ape/man/nj.html) | NJ | not recommended, slow |
| [FastTree](http://www.microbesonline.org/fasttree/) | ML | Approximate maximum likelihood |
| [IQ-TREE](http://www.iqtree.org/) | ML | More recent implementation of ML |
| [RAxML](https://cme.h-its.org/exelixis/web/software/raxml/) | ML | Popular ML program |
| [PhyML](http://www.atgc-montpellier.fr/phyml/) | ML | Yet another ML program |
| [MrBayes](https://nbisweden.github.io/MrBayes/) | Bayes | A well-known Bayesian program |


---

### Using trees
# Why build trees?

* Genetic sequences are not independent observations.
* If you want to find an association between some genetic feature and a phenotype (*e.g.*, disease risk), you have to adjust for *identity by descent* (IBD).
  * Sequences may have the same mutation because they inherited it from a common ancestor.
* Failing to account for IBD can result in a high rate of [false positives](https://en.wikipedia.org/wiki/False_positives_and_false_negatives).
  * *e.g.*, It is common practice to [stratify human genome data](https://www.sciencedirect.com/science/article/pii/S0140673603125202) by ethnic groups when carrying out a population-level analysis.

---

<table>
<tr>
  <td>
    <h3>Using trees</h3>
    <h1>Identity by descent in HIV</h1>
    <ul>
      <li>In 2002, <a href="https://www.science.org/doi/full/10.1126/science.1069660">Moore <i>et al.</i></a> reported evidence of HIV-1 adaptation to the immune makeup of different human populations.</li>
      <li>The <a href="https://en.wikipedia.org/wiki/Human_leukocyte_antigen">human leukocyte antigen</a> (HLA) molecules present foreign peptides on the surface of the cell, inducing lysis.</li>
      <li>Specific mutations in HIV-1 were observed more often in populations carrying certain HLA alleles.</li>
      <li>The virus that "founded" an epidemic where the allele is common may happen to carry that mutation by chance.</li>
    </ul>
    <small>
    Image source: Bhattacharya <i>et al.</i> (2007) <a href="https://www.science.org/doi/full/10.1126/science.1131528">Founder effects in the assessment of HIV polymorphisms and HLA allele associations.</a>  Science 315: 1583-1586.
    </small>
  </td>
  <td width="30%">
    <img src="/img/bhattacharya.png"/>
    <br/>
  </td>
</tr>
</table>

---

### Using trees
# Measuring selection

* Sometimes we need to use a tree to estimate parameters of a model of evolution.
* We can measure selection on protein-coding genes by comparing rates of non-synonmous (amino acid altering) and synonymous (silent) substitutions.
  * These rates are usually labelled as $dN$ and $dS$, respectively.
* $dN/dS < 1$ implies that selection is removing amino acid changes ("purifying selection"). 

---

### Using trees
# Dating ancestors

* A common ancestor in a tree of viruses can represent the [zoonotic](https://en.wikipedia.org/wiki/Zoonosis) origin of the epidemic.
* We can use other information to scale the tree in time, dating the origin.
<img src="/img/bioko.png" height="330px"/>
<small><small>
Image source: M Worobey <i>et al.</i> (2010) Island biogeography reveals the deep history of SIV. <a href="https://www.science.org/doi/full/10.1126/science.1193550"/>Science 329: 1487</a>.
</small></small>

---

### Using trees
# Phylodynamics

* The trees of different infectious diseases tend to have characteristic shapes - why?
* [Grenfell *et al.* (2004)](https://www.science.org/doi/10.1126/science.1090727) proposed that these trees were shaped by epidemiology and immunology.

<img src="/img/grenfell-trees.png" width=650/>

<small><small>
Image source: Grenfell BT, Pybus OG, Gog JR, Wood JL, Daly JM, Mumford JA, Holmes EC. Unifying the epidemiological and evolutionary dynamics of pathogens. science. 2004 Jan 16;303(5656):327-32.
</small></small>

---

### Using trees
# Reconstructing the spread of HCV in Egypt

<div style="font-weight: normal; font-size: 16pt;">
A phylodynamic analysis of HCV sequences showing evidence of a rapid spread of infection from the 1930s to 1950s, coinciding with a massive public health campaign to eradicate snail fever.
</div>

<img src="/img/hcv-mcctree.png" width=600/>


---

<section data-background="#333" style="color:white">

<h1 style="color:white">Key points</h1>

* A phylogeny is a tree relating observed sequences to their common ancestors (nodes).
  * The length of a branch in the tree may (but not always) represent time.
  * The root represents the earliest point in time.
* There is an enormous number of trees that can relate even a small number of sequences.
  * Molecular phylogenies are usually reconstructed by neighbor-joining or maximum likelihood.
* If you want to learn more about phylodynamics, take MBI 4750G!

</section>