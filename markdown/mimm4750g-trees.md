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

# Clades

<table>
  <tr>
    <td>
    <ul>
      <li>A clade is a set of descendants of an ancestral node.</li>
      <li>A *monophyletic* clade contains **all** the descendants of the node.</li>
      <li>A *paraphyletic* clade contains only some of the descendants.</li>
      <ul>
      <li>Birds are a monophyletic clade.</li>
      <li>Reptiles are a paraphyletic clade that contains birds.</li>
      </ul>
      <li>A *polyphyletic* clade does not contain the common ancestor of the descendants.</li>
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

<table>
  <tr>
    <td style="vertical-align: middle;">
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
Image credit: Figure 2 from Galen *et al.* 2018. Roy Soc Open Sci 5:  https://doi.org/10.1098/rsos.171780
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
         style="height:200px">
    </div>
    <blockquote style="">
    Why are there always more possible rooted trees than unrooted trees?
    </blockquote>
</section>

---


# Further readings

* [Building trees](https://artpoon.github.io/BioID/Trees.html)
