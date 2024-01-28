University of Toronto, 2024
## Redrawing boundaries: The model-based optimization of molecular clusters
### Art Poon, MSc PhD

<img src="/img/UWO_Logo.svg" style="float: right; height: 80px"/>

<div style="color: black; font-size: 0.8em">
Department of Pathology and Laboratory Medicine<br/>
Department of Computer Science<br/>
Department of Microbiology and Immunology<br/>
</div>

---

Western University is located on the traditional lands of the Anishinaabek, Haudenosaunee, L&#363;naap&eacute;ewak and Attawandaron peoples.

<img src="/img/native-land2.png" width=700/>

<small><small>
Image credit: Native Land Digital, https://native-land.ca
</small></small>

---

![](/img/randomxy.svg)

<div style="text-align: center;">
Clusters are not real.
</div>

---

<section data-background-image="/img/broad-street-band.jpg" 
data-background-size="contain" data-background-position="top">

<div style="position: fixed; bottom: 12pt;">
  <ul style="list-style-type: none;">
    <li>In epidemiology, a cluster of cases in <b>space</b> and <b>time</b> implies a common source.</li>
    <li>The Broad street cholera outbreak is often used as an early example of this application of clustering.</li>
  </ul>
  <br/><br/>

  <div style="font-size: 13pt; font-weight: 500; color: #4F2683;">
  Brody et al. (2000) Map-making and myth-making in Broad Street: the London cholera epidemic, 1854.  Lancet 356; 64-68.
  </div>
</div>

</section>

---

# A genetic cluster is a group of sequences more similar to each other than to any other sequence

* A genetic cluster of infections similarly implies that cases are related by recent transmission events.
* Sequences may be easier to collect.
  * Routine sequencing is standard of care for some viruses, *e.g.*, HIV-1.
  * Spatial location may be unavailable or meaningless (*e.g.*, transmission by intimate contact; long asymptomatic period).
* Genetic clustering requires measurable evolution on a similar time scale as transmission.

---

<table>
<tr>
  <td>
    <h1>One way to make clusters is from pairwise distances</h1>
    <ul>
      <li>Epidemiologically-linked infections (<i>e.g.</i>, transmission pairs) tend to have shorter genetic distances (<b>A</b>).</li>
      <li>The pairwise distances define a <i>graph</i> where:
        <ul>
          <li>each node represents a sequence</li> 
          <li>an edge is drawn between two sequences with a distance below some threshold.</li>
        </ul>
      <li>By convention, a <i><u>connected component</u></i> of two or more nodes is a cluster (<b>B</b>).</li>
    </ul>
  <td width="40%">
    <table>
      <tr><td>A</td></tr>
      <tr><td><img src="/img/wolfs-beeswarm.svg"/></td></tr>
      <tr><td>B</td></tr>
      <tr><td><img src="/img/connected-components2.svg"/></td></tr>
    </table>
  </td>
</tr>
</table>
<br/>

<small><small>
Wolfs, TFW, et al. "HIV-1 genomic RNA diversification following sexual and parenteral virus transmission." Virology 189.1 (1992): 103-110.<br/>
</small></small>

---

<table>
<tr>
  <td>
    <h1>We can also look for clusters of sequences in a tree</h1>
    <ul>
      <li>A phylogenetic tree models how populations (infections) are related by common ancestors.</li>
      <li>Clusters can be defined by:</li>
        <ul>
          <li>the mean tip-to-tip distance within a subtree/clade</li> 
          <li>the bootstrap support (reproducibility) of the subtree</li>
        </ul>
      <li>A longer history of use than pairwise distance clustering.</li>
      <li>Building a tree is more computationally intensive &mdash; pairwise distances are invariant.</li>
    </ul>
  <td width="35%">
    <img src="/img/glenochil-crop.png"/> 
    <small><small>
    Excerpt from a maximum likelihood phylogeny of HIV-1 <i>gag</i> sequences, including inmates of a Scottish prison.
    </small></small>
  </td>
</tr>
</table>
<br/>

<small><small>
Yirrell, DL, et al. "Molecular investigation into outbreak of HIV in a Scottish prison." Brit Med J 314 (1997): 1446.<br/>
</small></small>

---

<h1>Clusters may identify transmission risk factors</h1>
<table>
  <tr>
    <td>
      <ul>
        <li>Clustering implies less time between transmission events &mdash; less time for evolution.</li>
        <li>A component of one sequence is considered "non-clustered".</li>
        <li>Whether or not a sequence is assigned to a cluster becomes a binomial outcome.</li>
        <ul>
          <li><i>e.g.</i>, increasing viral load is significantly associated with a greater odds of being in a cluster.</li>
        </ul>
      </ul>
    </td>
    <td width="50%">
      <img src="/img/jid-poon-2013-f3.rev.svg"/>
      <small>
      <div style="color: #4F2683; font-size: 13pt; text-align: center;">
      Multiple logistic regression of clustering in a phylogeny of <i>n</i>=27,296 HIV-1 <i>pol</i> sequences from BC, Canada (Poon <i>et al.</i>, 2015).
      </div>
      </small>
    </td>
  </tr>
</table>
<br/>

<small><small>
Poon, Art FY, et al. "The impact of clinical, demographic and risk factors on rates of HIV transmission: a population-based phylogenetic analysis in British Columbia, Canada." The Journal of infectious diseases 211.6 (2015): 926-935.
</small></small>

---

# We can prioritize fast "growing" clusters

* *e.g.*, The US Centers for Disease Control and Prevention [recommends](https://www.cdc.gov/hiv/pdf/funding/announcements/ps18-1802/CDC-HIV-PS18-1802-AttachmentE-Detecting-Investigating-and-Responding-to-HIV-Transmission-Clusters.pdf) investigating clusters with 5 or more new cases in the past 12 months.
* Cluster growth has been modelled as a binomial outcome ([Wertheim *et al.* 2018](https://academic.oup.com/jid/article/218/12/1943/5053881); [Billock *et al.* 2019](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6692892/)).
<img src="/img/cluster-growth.svg" height="200px"/>
<div style="text-align: center; font-size: 16pt;">
In this example, clusters 1 and 2 are "growing", and cluster 3 is not.
</div>


---

<div style="font-weight: 300; font-size: 24pt; color: #4F2683;">
When a rapidly growing cluster triggered a public health response in BC, Canada
</div>
<img src="/img/real-time-hiv.png" height="500px" style="padding: 0em;"/>

<small><small>
Poon, AFY, et al. "Near real-time monitoring of HIV transmission hotspots from routine HIV genotyping: an implementation case study." The Lancet HIV 3.5 (2016): e231-e238.
</small></small>

---

<div style="text-align: center; font-weight:900; font-size:24pt;">
The clustering threshold can be whatever we want.
</div>

<div id="tn93" class="fig-container"
      data-fig-id="fig-tn93"
      data-file="/include/clustering-full.html"
      style="width:800px; margin:0 auto; height:600px; border-width: 0;">
</div>


---

<div style="text-align: center; font-weight: 900; font-size: 48pt; line-height: 1em;">
We cannot use the same clustering threshold in all contexts
</div>

<ul>
  <li>Sequences can be similar <u>not only</u> because less time has passed between transmissions, <b>but also because those infections were quickly diagnosed!</b></li>
  <li>We are less likely to sample closely-related infections in a generalized epidemic &mdash; requiring a relaxed threshold.</li>
</ul>

---

<table>
  <tr>
    <td>
      <h1>A similar problem exists in spatial statistics</h1>
      <ul>
        <li>The modifiable areal unit problem (MAUP):</li>
        <ul>
          <li>Observations are distributed in a continuous space.</li>
          <li>These need to be assigned to groups for analysis ("areal units").</li>
          <li>Results of a statistical test are contingent on this grouping.</li>
        </ul>
        <li><i>e.g.</i>, Varying associations between COVID-19 mortality and air pollution (<b>right</b>).</li>
      </ul>
    </td>
    <td width="50%">
      <img src="/img/sarscov2-noxide-maup2.png"/>
    </td>
  </tr>
</table>

<small><small>
Wang, Yaqi and Qian Di. "Modifiable areal unit problem and environmental factors of COVID-19 outbreak." Science of the Total Environment 740 (2020): 139984.
</small></small>

---

# Poisson regression

* Let the expected number of new cases in cluster $C_i$ be:
$$\hat{R}(C_i) = \exp\left(\alpha +  \beta \sum_{v\in C_i}{w(v)} \right)$$
where $w(v)$ is the weight of an individual case (vertex, $v$).
* If every known case is equally likely to be connected to a new case, then $w(v)=1$ for all $v$.
* This gives us a **null model**, $\hat{R}(C_i) = \exp(\alpha + \beta|C_i|)$, where $|C_i|$ is the current cluster size.

---

<table>
  <tr>
    <td>
      <h1>We can place greater weight on the more recent cases</h1>
      <ul>
        <li>A known case $v$ is more likely to be connected to a new case if $v$ was sampled more recently (<b>right</b>).</li>
        <li>Fit a logistic regression to the probability of an edge from $u$ to $v$, given sampling times $t_u$ and $t_v$:</li>
$$\log\left(\frac{\hat{w}_v}{1-\hat{w}_v}\right) = \alpha + \beta \left(t_v-t_{u}\right)$$
        <li>Substituting these weights into the Poisson regression gives us an <b>alternate model</b>.</li>
      </ul>
    </td>
    <td style="vertical-align: middle;" width="40%">
      <img src="/img/decay_tn_met.svg"/>
      <small><small>
      Log-linear plots of the frequency of edges between cases separated by different time lags.
      Obtained from HIV-1 <i>pol</i> sequence data sets.
      </small></small>
    </td>
  </tr>
</table>

<small><small>
Chato, C., Kalish, M. L., & Poon, A. F. (2020). Public health in genetic spaces: a statistical framework to optimize cluster-based outbreak detection. Virus evolution, 6(1), veaa011.
</small></small>

---

<table>
  <tr>
    <td>
      <h1>An optimal threshold maximizes the difference in AIC between models</h1>
      <ul>
      <li>Borrowing an idea from spatial epidemiology (Nakaya, 2000).</li>
      <li>Increasing $\Delta$AIC reduces the relative information loss from adding case recency as a predictor variable.</li>
      <li>The optimal thresholds are much higher than the setting recommended by the US CDC (0.005)</li>
      </ul>
    </td>
    <td width="40%">
      <img src="/img/gaic.svg"/>
      <small><small>
      TN93 = Tamura-Nei (1993) genetic distance.
      </small></small>
    </td>
  </tr>
</table>

<small><small>
Nakaya, T. (2000). An information statistical approach to the modifiable areal unit problem in incidence rate maps. Environment and Planning A, 32(1), 91-109.<br/>
Chato, C., Kalish, M. L., & Poon, A. F. (2020). Public health in genetic spaces: a statistical framework to optimize cluster-based outbreak detection. Virus evolution, 6(1), veaa011.
</small></small>

---

<section data-background-image="/img/maup-graphs.svg" data-background-size="contain">
</section>

---

# Can we extend this method to clustering trees?

* Phylogenetic clustering is older and more pervasive, but also more complicated!
  * Different summary statistics on lengths, *e.g.*, mean of subtree.
  * Different length definitions, *e.g.*, tip-to-tip path or one branch?
  * Monophyletic or paraphyletic?
* Rebuilding trees is too unstable!  Seldom used for tracking clusters.
  * We can graft new tips to an existing tree by maximum likelihood (pplacer, Matsen *et al* 2010).

<small><small>
Matsen FA, Kodner RB, Armbrust EV. pplacer: linear time maximum-likelihood and Bayesian phylogenetic placement of sequences onto a fixed reference tree. BMC bioinformatics. 2010;11(1):538.
</small></small>

---

# We need to define cluster growth in trees

![](/img/simplified-cluex.png)

<small><small>
Chato, C., Feng, Y., Ruan, Y., Xing, H., Herbeck, J., Kalish, M., & Poon, A. F. (2022). Optimized phylogenetic clustering of HIV-1 sequence data for public health applications. PLOS Computational Biology, 18(11), e1010745.
</small></small>

---

# Model selection identifies optimal clustering parameters for trees as well

<table>
  <tr>
    <td><img src="/img/GAICSt_Comp.svg"/></td>
    <td><img src="/img/GAICTn_Comp.svg"/></td>
  </tr>
</table>

<small><small>
Chato, C., Feng, Y., Ruan, Y., Xing, H., Herbeck, J., Kalish, M., & Poon, A. F. (2022). Optimized phylogenetic clustering of HIV-1 sequence data for public health applications. PLOS Computational Biology, 18(11), e1010745.
</small></small>

---

<table>
  <tr>
    <td>
      <h1>Clusters don't necessarily have to be components</h1>
      <ul>
        <li>A connected component is a subgraph in which every pair of nodes is connected by a path of edges.</li>
        <li>Components are fragile &mdash; a single new case can cause two components to merge into one (<b>top</b>)</li>
        <li>We can partition components into clusters according to edge densities, <i>i.e.</i>, network modularity (<a href="https://www.pnas.org/doi/10.1073/pnas.0601602103">Newman 2006</a>, <b>bottom</b>).</li>
      </ul>
    </td>
    <td width="35%" style="vertical-align: middle">
      <img src="/img/barbell.svg">
      <small><small>
      A "barbell" cluster created by the fusion of two components.
      </small></small>
      <img src="/img/431083_2_En_9_Fig4_HTML.png"/>
      <small><small>
      A component partitioned into communities (colours) by the Louvain method.
      </small></small>
    </td>
  </tr>
</table>
<br/>

<small><small>
Image credit: Watson, A. K., Lannes, R., Pathmanathan, J. S., M&eacute;heust, R., Karkar, S., Colson, P., ... & Bapteste, E. (2019). The methodology behind network thinking: graphs to analyze microbial complexity and evolution. Evolutionary genomics: Statistical and computational methods, 271-308.
</small></small>

---

# Breaking up a giant component

<div style="font-size: 18pt; line-height: 1em;">
Results from applying Markov clustering (MCL) to a large component at an optimized cutoff of TN93 < 0.028.
</div>

![](/img/community-figure3.png)

<small><small>
Liu, M., Chao, C., & Poon, A. F. (2023). From components to communities: bringing network science to clustering for molecular epidemiology. Virus Evolution, vead026.
</small></small>

---

# We use arbitrary clustering thresholds for many areas of biology

<table>
  <tr>
    <td><img src="/img/megaselia-fly-specimens.png"/></td>
    <td><img src="https://hbctraining.github.io/scRNA-seq/img/SC_umap.png"/></td>
  </tr>
  <tr>
    <td>Biological species are essentially clusters, especially bacteria and viruses.</td>
    <td>We use clustering to label cell types from gene expression data.</td>
  </tr>
</table>
<br/>

<small><small>
Image credits: <a href="https://entomologytoday.org/2022/05/17/molecular-data-dark-taxa-megaselia-sulphurizona-fly-complex">Megaselia species complex</a>, photo by Dr. Brian Brown;<br/>
Plot from a single-cell RNA-seq clustering tutorial using Seurat by the <a href="https://hbctraining.github.io/scRNA-seq/lessons/07_SC_clustering_cells_SCT.html">Harvard Chan BIoinformatics Core</a>.
</small></small>

---

<table>
  <tr>
    <td>
      <table>
        <tr>
          <td width="300px">
            Dynamic stochastic blockmodeling of HIV recombination.<br/>
            <small>
            Dr. Abayomi Olabode
            </small>
          </td>
          <td>
            <div class="avatar">
            <img src="/img/abayomi.jpeg" height="110px"/>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="2"><img src="/img/hiv-dynsbm.svg" width="350px"/></td>
        </tr>
      </table>
      <small><small><small>
      Olabode, Abayomi S., et al. "Revisiting the recombinant history of HIV-1 group M with dynamic network community detection." Proceedings of the National Academy of Sciences 119.19 (2022): e2108815119.
      </small></small></small>
    </td>
    <td width="50%">
      <table>
        <tr>
          <td width="300px">
            Evolution of virus genomes.<br/>
            <small>
            Dr. Laura Munoz Baena
            </small>
          </td>
          <td>
            <div class="avatar">
            <img src="/img/laura.png" height="120px"/>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="2"><img src="/img/adenoviridae_analysis_crop.svg" width="275px"/></td>
        </tr>
      </table>
      <small><small><small>
      Mu&ntilde;oz-Baena, Laura, and Art FY Poon. "Using networks to analyze and visualize the distribution of overlapping genes in virus genomes." PLoS pathogens 18.2 (2022): e1010331.
      </small></small></small>
    </td>
  </tr>
</table>


---

# Thanks!

<table>
<tr>
  <td>
    <img src="/img/cihr.png" width="250px"/><br/>
    <img src="/img/NSERC_RGB.png" width="230px"/>
    <img src="/img/NIH_NIAID.jpg" width="180px"/>
  </td>
  <td style="vertical-align: middle;">
    <img src="/img/lab-thumbnails.jpeg" width="400px"/>
  </td>
</tr>
</table>
