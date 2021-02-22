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

# Rectangular/slanted layouts

<small><small>
Phylogeny of betacoronaviridae including SARS-CoV-2 samples from [Wu <i>et al.</i>](https://www.nature.com/articles/s41586-020-2008-3) (2020) Nature 579: 265-269.
</small></small>
<img src="/img/sarscov2-origin.jpg" height="450px"/>

---

# Radial layouts

<small><small>
SARS-CoV-2 genomes in Ontario displayed by Auspice (Nextstrain) instance maintained by [Finlay Maguire](http://auspice.finlaymagui.re/ncov/north-america/canada/ontario)
</small></small>
<img src="/img/auspice.png" height="500px"/>

---

# Unrooted layouts

<small><small>
Phylogeny summarizing variation in patient mortality by SARS-CoV-2 clade, from [Dumonteil <i>et al.</i>](https://www.mdpi.com/1999-4915/13/2/227) (2021) Viruses 13: 227.
</small></small>
<img src="https://www.mdpi.com/viruses/viruses-13-00227/article_deploy/html/images/viruses-13-00227-g001.png" height="450px"/>

---

# Shapes of trees

<table>
  <tr>
    <td style="font-size: 18pt;">
    <ul>
      <li>"Star-like" trees have short internal branches and long terminal branches, <i>e.g.</i>, HIV.</li>
      <li>"Comb-like" (unbalanced) trees have excess variation in branching rates among nodes, <i>e.g.,</i> most tips descend from one "trunk" lineage, <i>e.g.</i>, influenza A virus.</li>
      <li><a href="https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1002947"/>Phylodynamics</a> is the study of how tree shapes are determined by epidemiology and immunology.</li>
    </ul>
    </td>
    <td width="50%">
      <img src="https://journals.plos.org/plosone/article/figure/image?size=large&id=10.1371/journal.pone.0078122.g001" height="450px"/>
    </td>
  </tr>
</table>

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

# Human malaria is polyphyletic
* Virulence has been gained and lost multiple times in history of *Plasmodium* genus.
<img src="/img/rsos171780f02.jpg" width="600px"/>
<small><small>
Image credit: Figure 2 from Galen <i>et al.</i> 2018. Roy Soc Open Sci 5: <a href="https://royalsocietypublishing.org/doi/10.1098/rsos.171780">171780</a>.
</small></small>

---

# Paraphyly and source attribution

<table><tr>
  <td width="65%"><ul>
    <li>The virus population within a host becomes diverse over time - this can also be represented by a tree.</li>
    <li>If a single copy of the virus is transmitted to another person, its descendants will form a clade nested within the tree of the source population.</li>
    <li>Sequences from the source individual form a paraphyletic clade.</li>
    <li>This concept has been (controversially) used to reconstruct the direction of HIV transmission in research and as forensic evidence.</li>
  </td>
  <td width="30%">
    <img src="/img/romero.png" width="120px">
  </td>
</tr></table>

<small>Metzker *et al.* (2002) PNAS 99: 14292; Romero-Severson *et al.* (2016) PNAS 113: 2690.</small>

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

<table>
  <tr>
    <td style="vertical-align: middle; font-size: 18pt;">
      <h1>Tree space</h1>
      <ul>
        <li>The space of all possible trees is high-dimensional and difficult to visualize.</li>
        <li>Reconstructing a phylogenetic tree from data is difficult because the number of trees is enormous.</li>
        <li>Searching through tree space is difficult because there is no natural move from one tree to another.</li>
      </ul>
    </td>
    <td width="40%">
      <img src="https://matsen.fredhutch.org/images/pt-tree-graph.png"/>
      <small><small>
      Image credit: Erick Matsen, <a href="https://matsen.fhcrc.org/general/2019/06/18/pt.html">Bayesian phylogenetic inference without sampling trees</a>.
      </small></small>
    </td>
  </tr>
</table>


---

# Further readings

* [Building trees](https://artpoon.github.io/BioID/Trees.html)
* [Viral phylodynamics](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1002947)