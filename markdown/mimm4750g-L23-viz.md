# MIMM4750G
## Communication
![](https://imgs.xkcd.com/comics/communicating.png)

---

# Bioinformatics and communication

* Reporting your work
*

---

# Reporting methods

* At the end of a study, how do you report the bioinformatic methods?
* The same rules as experimental methods should apply:
  * You have to describe what you did with enough detail that someone should be able to reproduce the analysis.
* You should name each program, provide a version number, and sufficient parameters to reproduce.
  * Many parameters - often one reports using "the default settings", so version number is critical.
  * A challenge for web-based tools.

---

# Reporting methods (2)

* No one reports what brand of pipettor or gel box was used in an experiment, but they will report the sequencer.
* Generally you should not have to report version of operating system or dependencies.
* Hardware is irrelevant unless performance is a primary outcome of the study:
  * *e.g.,* "We ran the pipeline on a desktop computer with an Intel i7 980X processor."

---

# Data provenance

* You can only describe the methods you used if you kept track of what you did.
* [Data provenance](https://en.wikipedia.org/wiki/Data_lineage): the historical record of data origins.
* Experimenters keep lab notebooks - what is the equivalent for bioinformatics?
* Plain text files to record command line inputs, outputs - <a href="https://en.wikipedia.org/wiki/Bash_(Unix_shell)">bash</a> scripts are executable.

---

# Workflow management systems

* [Snakemake](https://snakemake.readthedocs.io/en/stable/) scripts specify inputs, outputs and methods.
* [Apache Taverna](https://taverna.incubator.apache.org/) is an open-source Java-based WMS that features a graphical workflow design interface.
<img src="https://taverna.incubator.apache.org/img/Taverna_Workbench.png" width="500px"/>
<small>
Image credit: The Apache Software Foundation
</small>

---

# Version control

* a.k.a. revision control system, a framework for tracking changes to plain text documents, esp. source code.
* Client-server model: multiple developers use a single repository, *e.g.*, Subversion (svn).
* Distributed model: every developer has a copy of the repository, *e.g.*, Git, Mercurial.
* Git has become enormously popularized by web hosting services like GitHub, GitLab.

---

```
Elzar:slides artpoon$ git pull origin master
warning: redirecting to https://github.com/ArtPoon/slides/
remote: Enumerating objects: 12, done.
remote: Counting objects: 100% (12/12), done.
remote: Compressing objects: 100% (5/5), done.
remote: Total 8 (delta 5), reused 6 (delta 3), pack-reused 0
Unpacking objects: 100% (8/8), done.
From http://github.com/ArtPoon/slides
 * branch            master     -> FETCH_HEAD
   695f590..f68e75c  master     -> origin/master
Updating 695f590..f68e75c
Fast-forward
 markdown/mimm4750g-L22-RNAseq.md | 11 +++++------
 markdown/mimm4750g-L23-viz.md    | 32 +++++++++++++++++++++++++++++++-
 2 files changed, 36 insertions(+), 7 deletions(-)
```

---

# Sharing your methods

* Releasing code under a free software license makes it more likely that others will use it.
* Documentation becomes essential!
  * Internal documentation of source code for developers
  * External documentation (manuals, examples) for users
* Makes it easier for others to reproduce your analysis.
* Some articles provide both code and data for regenerating figures, *e.g.*, https://github.com/bulksoil/LifeCycleManuscript

---

# Data sharing

* Code repositories like GitHub are not intended to store large data sets.
* Research data files can be enormous, *e.g.*, next-generation sequence data, video files.
  * [Data Dryad](https://datadryad.org/stash)
  * [Zenodo](https://zenodo.org/), now partnered with Dryad
* Some repositories charge a fee, generally have limits to file size.
* Ethical issues involved in data sharing.

---

# Communicating bioinformatic results

* Bioinformatic results can be enormous and complex.
* Visualization tools play an important role for extracting information.
* Overlap of art and science - a viz must accurately describe the data, while being aesthetically pleasing.
* An important tool for communicating results to the public.

---

# Ugly, bad and wrong

<table>
  <tr>
    <td style="vertical-align: middle; font-size: 20pt">
      <ul>
      <li>Most of the same rules that dictate what makes a good visualization for conventional data apply for bioinformatics.</li>
      <li>Some visuals are misleading.</li>
      <li></li>
      </ul>
    </td>
    <td width="55%">
      <img src="https://serialmentor.com/dataviz/introduction_files/figure-html/ugly-bad-wrong-examples-1.png" width="500px"/>
    </td>
  </tr>
</table>
<small>
Image credit: Claus O. Wilke, <a href="https://serialmentor.com/dataviz/introduction.html"/>Fundamentals of Data Visualization</a>.
</small>

---

# Cytoscape

<table>
  <tr>
    <td style="vertical-align: middle; font-size: 20pt">
      <ul>
      <li><a href="https://cytoscape.org/">Cytoscape</a> is a network visualization software package developed by the <a href="http://nrnb.org/">National Resource for Network Biology</a></li>
      <li>Integrates network layouts with biological attributes, *e.g.*, interactome data.</li>
      <li>Many other network viz software, including [Graphviz](https://www.graphviz.org/) and [Gephi](https://gephi.org/).</li>
      </ul>
    </td>
    <td width="55%">
      <img src="https://journals.plos.org/plosone/article/file?id=10.1371/journal.pone.0041064.g005&type=medium"/>
    </td>
  </tr>
</table>

<small>
Image credit: F Cheng <i>et al.</i> (2012) <a href="https://doi.org/10.1371/journal.pone.0041064"/>PLOS ONE 7: e41064</a>.
</small>

---

# Circos

<table>
  <tr>
    <td style="vertical-align: middle; font-size: 20pt">
      <ul>
      <li><a href="http://circos.ca/">Circos</a> is a visualization software package developed at the <a href="https://www.bcgsc.ca/">Michael Smith Genome Sciences Centre</a> in BC.</li>
      <li>Generates circular layouts to visualize interactions among components of a genome, other objects.</li>
      </ul>
    </td>
    <td width="55%">
      <img src="http://circos.ca/tutorials/images/img/900px/tutorial-01-08.png"/>
    </td>
  </tr>
</table>

---

# Hiveplot

<table>
  <tr>
    <td style="vertical-align: middle; font-size: 20pt">
      <ul>
      <li><a href="http://www.hiveplot.com/">Hiveplot</a> was developed by the same team as Circos at the <a href="https://www.bcgsc.ca/">Michael Smith Genome Sciences Centre</a>.</li>
      <li>Another network viz method that is designed to make it easier to interpret network structure.</li>
      <li>Read Martin Krzywinski's manifesto on hair balls at http://www.hiveplot.com/</li>
      </ul>
    </td>
    <td width="50%">
      <img src="http://www.hiveplot.com/img/hiveplot-arabidopsis.png" width="350px"/>
    </td>
  </tr>
</table>

---

# ggtree

<table>
  <tr>
    <td style="vertical-align: middle; font-size: 20pt">
      <ul>
      <li><a href="https://guangchuangyu.github.io/software/ggtree/">ggtree</a> is an R package developed by Guangchuang Yu for visualizing tree-based data with ggplot2 syntax.</li>
      <li>I've developed another R package (<a href="https://github.com/ArtPoon/ggfree"/>ggfree</a>) to produce the same visualizations using base R syntax.</li>
      </ul>
    </td>
    <td width="50%">
      <img src="https://besjournals.onlinelibrary.wiley.com/cms/asset/fa3644ae-800f-4444-87b3-45cdbac3ee6f/mee312628-fig-0005-m.jpg"/>
    </td>
  </tr>
</table>

---

# nextstrain

* Real-time surveillance of infectious disease outbreaks
* Originally developed by [Trevor Bedford](https://bedford.io/team/trevor-bedford/) and [Richard Neher](https://www.biozentrum.unibas.ch/research/researchgroups/overview/unit/neher/) as *nextflu*, a tracking system for influenza A virus data.
* Combines a Python back-end for analyzing virus sequence data, and a JavaScript front-end for visualization.
* Automatically downloads data from the GISAID EpiFlu database in real time.

---

# nextstrain

<iframe src="https://nextstrain.org/ncov" width="1000px" height="600px">
</iframe>

---

# Further readings

* [Visualization and analytics tools for infectious disease epidemiology: A systematic review](https://www.sciencedirect.com/science/article/pii/S1532046414000914)
* [Fundamentals of Data Visualization](https://serialmentor.com/dataviz/)
