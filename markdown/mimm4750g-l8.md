# MIMM4750G
## Building trees

---

# What is a phylogeny?

* A tree-based hypothesis about how populations are related by common ancestors.
* Each population (species/infection) is represented by a tip of the tree.
* Connected by branches to common ancestors (nodes).
![](/img/trees.png)

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
<td width="50%">
  <img src="/img/proteobacteria.png" width="500px">
  <small>Figure from Sachs *et al.* (2014) *Proc Roy Soc Lond B*, 10.1098/rspb.2013.2146</small>
</td>
</table>

---

# Origins of HIV-1

<img src="/img/HIV-tree.png" width=500px/>

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
    <ul>
      <li>There are about 7.5&times;10<sup><small>18</small></sup> grains of sand on the planet.</li>
      <li>There are about 10<sup><small>80</small></sup> atoms in the universe.</li>
    </ul>
</section>

---

# Distance-based methods

* Building a tree can be viewed as a clustering problem!
* We already know how to calculate genetic distances between pairs of sequences.
* Agglomerative (hierarchical) clustering means we group the most similar pair of sequences and progress from there.

---

# UPGMA

* Unweighted pair group method with arithmetic mean.
* A simple hierarchical clustering method.
* Every sequence starts out as a cluster of one.
* Algorithm:
  1. Join clusters $i$, $j$ with minimum distance $D(i,j)$
  2. Add cluster $ij$ with $D(ij,k)=(D(i,k)+D(j,k))/2$
  3. Go to step 1 until only one cluster remains (the root).

---

# UPGMA



