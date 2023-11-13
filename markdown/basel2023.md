# Stadler/Neher joint meeting
## Data-driven clustering for molecular epidemiology
### Art Poon, MSc PhD

Western University, Canada
<div style="color: black; font-size: 0.8em">
Department of Pathology and Laboratory Medicine<br/>
Department of Computer Science<br/>
Department of Microbiology and Immunology<br/>
</div>

---

<table>
<tr>
<td>
  <table>
  <tr>
    <td width="250px">
      <h4>Roux-Cil Ferreira</h4>
      <h5>Postdoctoral Associate</h5>
      <small>Bayesian analysis of virus dynamics in the latent HIV reservoir.</small>
    </td>
    <td>
      <div class="avatar">
      <img src="/img/ferreira.jpg"/>
      </div>
    </td>
  </tr>
  <tr>
    <td colspan=2>
      <img src="/img/all-iupm-mle.interval.png" height="250px"/>
    </td>
  </tr>
  <tr>
    <td>
      <h4>Amjad Khan<h4/>
      <h5>Postdoctoral Associate</h5>
      <small>
        Mathematical modeling of defective HIV provirus dynamics.
      </small>
    </td>
    <td>
      <div class="avatar">
      <img src="/img/Amjad.jpg"/>
      </div>
    </td>
  </tr>
  </table>
</td>
<td>
  <table>
    <tr>
      <td width="300px">
        <h4>Abayomi Olabode</h4>
        <h5>Research Associate</h5>
        <small>
        Dynamic stochastic blockmodeling of HIV recombination.
        SARS-CoV-2 wastewater monitoring.
        </small>
      </td>
      <td>
        <div class="avatar">
        <img src="/img/abayomi.jpeg" height="120px"/>
        </div>
      </td>
    </tr>
    <tr>
      <td colspan="2"><img src="/img/hiv-dynsbm.svg" width="300px"/></td>
    </tr>
  </table>
</td>
</tr>

</table>

---

<table>
<tr>
  <td width="300px">
    <h4>Laura Mu&ntilde;oz Baena</h4>
    <h5>PhD candidate</h5>
    <small>Evolution of overlapping reading frames in virus genomes. Data visualization.</small>
  </td>
  <td>
    <div class="avatar">
    <img src="/img/laura.png"/>
    </div>
  </td>
  <td width="300px">
    <h4>Erin Brintnell<h4/>
    <h5>MSc candidate</h5>
    <small>
      Rapid phylodynamic inference for SARS-CoV-2 trees.
    </small>
  </td>
  <td>
    <div class="avatar">
    <img src="/img/ErinBrintnell2.jpg"/>
    </div>
  </td>
</tr>
<tr>
  <td colspan=2>
    <img src="/img/frameshift.png" height="300px"/>
  </td>
      <td colspan=2>
    <img src="/img/hunepi.png" height="300px"/>
  </td>
</tr>
</table>

---

## Clustering and epidemiology

<table>
  <tr>
  <td style="vertical-align: middle; font-size: 20pt;">
  <ul>
    <li>In epidemiology, a cluster of cases in space and/or time implies a common source.</li>
    <li>The Broad street cholera outbreak (<i>right</i>) is often used as an early example of this application of clustering.</li>
    <ul><li>Snow apparently did not make use of physical maps until intervening on the outbreak (Brody <i>et al.</i> 2000).</li></ul>
    <li>Many scanning statistics have been developed for spatiotemporal clustering of disease.</li>
  </ul>
  </td>
  <td width="30%">
    <img src="/img/broad-street.jpg" width="250px"/>
  </td>
</table>

<small>
    Brody et al. (2000) Map-making and myth-making in Broad Street: the London cholera epidemic, 1854.  Lancet 356; 64-68.
</small>

---

## Genetic clusters

* A <u>genetic</u> cluster of infections similarly implies that cases are related by recent transmission events.
* Sequences may be easier to collect.
  * Routine sequencing is standard of care for some viruses, *e.g.*, HIV-1.
  * Spatial location may be unavailable or meaningless (transmission by intimate contact).
* Genetic clustering requires measurable evolution on a similar time scale as transmission.

---

<table>
<tr>
<td>
  <h2>Building genetic clusters</h2>
  <ul>
    <li>Genetic clusters are generally extracted from sequence data in two ways:</li>
    <ol>
      <li>from a pairwise distance matrix (hierarchical clustering)</li>
      <li>from distances in a phylogenetic tree</li>
    </ol>
    <li>(<i>right</i>) Pairwise distances between HIV-1 sequences from unrelated individuals and tranmsission pairs (Wolfs <i>et al.</i>, 1992).</li>
    <li>Early association with forensic investigation of HIV-1 transmission (<i>e.g.</i>, <a href="https://www.science.org/doi/pdf/10.1126/science.256.5060.1165">Ou <i>et al.</i>, 1992</a>).</li>
  </ul>
</td>
<td style="vertical-align: middle;" width="40%">
  <img src="/img/wolfs1992.png"/>
</td>
</tr>
</table>

<small>
Wolfs, Tom FW, et al. "HIV-1 genomic RNA diversification following sexual and parenteral virus transmission." Virology 189.1 (1992): 103-110.
</small>

---

<section data-state="tn93-slide">
  <br/>
  <div id="tn93" class="fig-container"
       data-fig-id="fig-tn93"
       data-file="/include/clustering.html"
       style="width:800px; margin:0 auto; height:700px">
  </div>
</section>

---

## Unresolved issues

* What is the correct threshold for extracting clusters?
  * TN93 < 1.5% is the default HIV-TRACE threshold.
* Different applications may require different thresholds!
  * Reconstructing who infected whom?
  * Prioritizing public health actions?
  * Inferring the transmission risk structure of populations? ("in cluster" versus "out of cluster"; [Villandre *et al.* 2016](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0148459))
* What is the most appropriate clustering method?

<small>
Villandre, Luc, et al. "Assessment of overlap of phylogenetic transmission clusters and communities in simple sexual contact networks: applications to HIV-1." PloS one 11.2 (2016): e0148459.
</small>

---

## Guiding public health actions

<img src="/img/1-s2.0-S2352301816000461-gr4_lrg.jpg" height="450px"/>

<small>
Poon, Art FY, et al. "Near real-time monitoring of HIV transmission hotspots from routine HIV genotyping: an implementation case study." The lancet HIV 3.5 (2016): e231-e238.
</small>

---

<section data-background-image="/img/big-graph.png"
         data-background-size="800px">
</section>

---

## Cluster growth
* Clusters can be prioritized on the basis of predicted growth.
  * [US CDC guidelines](https://www.cdc.gov/hiv/pdf/funding/announcements/ps18-1802/CDC-HIV-PS18-1802-AttachmentE-Detecting-Investigating-and-Responding-to-HIV-Transmission-Clusters.pdf): investigate clusters (connected components of graph induced by TN93<0.5%) with 5 or more new cases in the past 12 months.
* The number of cases in a given time period has been modelled as a binomial outcome (one or more cases; [Wertheim *et al.* 2018](https://academic.oup.com/jid/article/218/12/1943/5053881); [Billock *et al.* 2019](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6692892/)).
* In this example, clusters 1 and 2 are "growing", and cluster 3 is not.

<img src="/img/cluster-growth.svg" height="200px"/>

---

## Modifiable areal unit problem (MAUP)

<table>
  <tr>
    <td>
      <ul>
        <li>The problem of finding an optimal clustering threshold is analogous to the MAUP:</li>
        <ul>
          <li>Observations are distributed in a continuous space.</li>
          <li>Grouped into "areal units" by the investigator.</li>
          <li>Results of a statistical test are contingent on this grouping.</li>
        </ul>
        <li>(<i>right</i>) Example of the MAUP for a statistical association between COVID-19 mortality and atmospheric NO<sub>2</sub> (Wang and Di 2020).</li>
      </ul>
    </td>
    <td width="45%">
      <img src="/img/sarscov2-noxide-maup.svg"/>
    </td>
  </tr>
</table>

<small>
Wang, Yaqi, and Qian Di. "Modifiable areal unit problem and environmental factors of COVID-19 outbreak." Science of the Total Environment 740 (2020): 139984.
</small>

---

<table>
  <tr>
    <td>
      <h2>Data collection</h2>
      <ul>
        <li>Obtained published, anonymized HIV-1 <i>pol</i> sequences from three sites, sampled over 7+ years.</li>
        <li>Most recent year of sampling held out as "new cases".</li>
        <li>(<i>right</i>) Number of new cases joining clusters (lines) increases with TN93 threshold, but the number of growing clusters (points) starts to decline.</li>
      </ul>
    </td>
    <td width="45%" style="vertical-align: middle;">
      <img src="/img/maup-growth.svg"/>
    </td>
  </tr>
</table>

<small>
Chato, C., Kalish, M. L., & Poon, A. F. (2020). Public health in genetic spaces: a statistical framework to optimize cluster-based outbreak detection. Virus evolution, 6(1), veaa011.
</small>

---

## Predicting the number of new cases

* Let the expected number of new cases adjacent to the $i$-th cluster be:

`$$\hat{R}(C_i) = \exp\left(\alpha +  \beta \sum_{v\in C_i}{w(v)} \right)$$`

* where $w(v)$ is the weight of an individual case (vertex, $v$).
* If every known case is equally likely to be adjacent to a new case, *i.e.*, $w(v)=1$ $\;\forall v$, then $R(C_i)$ is only affected by cluster size, $|C_i|$.
* We make this Poisson regression our null model.

---

## Adding case recency

<table>
  <tr>
  <td>
    <ul>
    <li>We can add any number of individual-level predictors to this linear model.</li>
    <li>The probability $\rho$ of an edge between $v$ and $u$ is: 
$\log\left(\frac{\hat{\rho}}{1-\hat{\rho}}\right) = \alpha + \beta_0 \left(t_v-t_{u}\right)$</li>
    <li>This gives us an alternate model:
    `$$\hat{R'}(C_i) = \exp\left(\alpha +  \beta |C_i| + \beta_t \sum_{v\in C_i} \rho_v \right)$$`
    </li>
    </ul>
  </td>
  <td width="45%">
    <img src="/img/decay_tn_met.svg"/>
  </td>
  </tr>
</table>

<br/>
<small>
Chato, C., Kalish, M. L., & Poon, A. F. (2020). Public health in genetic spaces: a statistical framework to optimize cluster-based outbreak detection. Virus evolution, 6(1), veaa011.
</small>

---

## Tuning clusters by model selection

<table>
  <tr>
    <td>
      <ul>
      <li>We propose that the optimal clustering threshold is determined by minimizing the relative information loss from adding predictor variables.</li>
      <li>Use AIC to quantify information loss - hence, the best clustering maximizes the difference in AICs.</li>
      <li>This idea was inspired by Nakaya (2000), who described a similar method for mortality rates in Tokyo.</li>
      </ul>
    </td>
    <td width="45%">
      <img src="/img/gaic.svg"/>
    </td>
  </tr>
</table>

<small>
Nakaya, T. (2000). An information statistical approach to the modifiable areal unit problem in incidence rate maps. Environment and Planning A, 32(1), 91-109.<br/>
Chato, C., Kalish, M. L., & Poon, A. F. (2020). Public health in genetic spaces: a statistical framework to optimize cluster-based outbreak detection. Virus evolution, 6(1), veaa011.
</small>

---

Optimal thresholds maximize the covariance among clusters between mean recency (diameter) and the number of new cases (dark)
![](/img/maup-graphs.svg)

---

## Results and limitations

* Optimal TN93 thresholds tend to be similar to those used in the literature (~0.015).
* The method is sensitive to uneven sampling rates over time.
  * We assume random sampling - what about outbreak investigations?
* Better results can be obtained by substituting dates of sample collection with dates of HIV diagnosis.
  * The latter metadata are more difficult to collect at a large scale.
* How should we partition *time*?  Years are not necessarily the best interval.

---

## Extension to clustering on trees

* Phylogenetic clustering is older and more pervasive, but also more complicated!
* Multiple criteria (branch length, bootstrap support)
  * Different summary statistics on lengths, *e.g.*, mean, maximum (ClusterPicker).
  * Different length definitions, *e.g.*, pendant, patristic.
  * Subtrees (monophyletic) versus subset trees (paraphyletic), often not specified.
* Pairwise distances are invariant &mdash; trees have to rebuilt with the addition of new sequences.

---

<table>
  <tr>
    <td width="67%">
      <ul>
        <li>Graft new cases to the tree by maximum likelihood (pplacer, <a href="https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-11-538">Matsen <i>et al.</i> 2010</a>).</li>
        <li>Eliminating bootstrap criterion consistently reduces information loss.</li>
      </ul>
    </td>
    <td style="vertical-align: middle;">
      <div class="avatar" style="height: 110px; width: 110px;">
        <img src="/img/connor-thumb.jpeg">
      </div>
    </td>
    <td style="vertical-align: middle;">
      Connor Chato, MSc graduate<br/>
      <small>Public Health Agency of Canada</small>
    </td>
  </tr>
</table>
<table>
  <tr>
    <td><img src="/img/GAICSt_Comp.svg"/></td>
    <td><img src="/img/GAICTn_Comp.svg"/></td>
  </tr>
</table>

<small>
Chato, C., Feng, Y., Ruan, Y., Xing, H., Herbeck, J., Kalish, M., & Poon, A. F. (2022). Optimized phylogenetic clustering of HIV-1 sequence data for public health applications. PLOS Computational Biology, 18(11), e1010745.
</small>

---

<table>
  <tr>
    <td>
      <h4>The majority of new cases are not in clusters!</h4>
      <ul>
        <li>Since our objective is to predict the "location" of the next cases, this is a problem!</li>
        <li>Relaxing the distance threshold to capture more new cases will cause the clusters to collapse into a single giant connected component.</li>
      </ul>
    </td>
    <td width="55%">
      <img src="/img/TreeClu-newcases.svg"/>
    </td>
  </tr>
</table>

<small>
Chato, C., Feng, Y., Ruan, Y., Xing, H., Herbeck, J., Kalish, M., & Poon, A. F. (2022). Optimized phylogenetic clustering of HIV-1 sequence data for public health applications. PLOS Computational Biology, 18(11), e1010745.
</small>

---

<table>
  <tr>
    <td>
      <h2>Community detection</h2>
      <ul>
        <li>We don't have to restrict our definition of clusters to connected components!</li>
        <li>We can partition components into clusters according to edge densities:</li>
          <ul>
            <li><i>i.e.</i>, network modularity (<a href="https://www.pnas.org/doi/10.1073/pnas.0601602103">Newman 2006</a>).</li>
            <li>An abundance of community detection methods in the network science literature.</li>
          </ul>
        <li>Uncouples the problem of connecting new cases from the problem of separating known cases.</li>
      </ul>
    </td>
    <td width="35%" style="vertical-align: middle">
      <img src="/img/431083_2_En_9_Fig4_HTML.jpeg"/>
    </td>
  </tr>
</table>

<small>
Image credit: Watson, A. K., Lannes, R., Pathmanathan, J. S., M&eacute;heust, R., Karkar, S., Colson, P., ... & Bapteste, E. (2019). The methodology behind network thinking: graphs to analyze microbial complexity and evolution. Evolutionary genomics: Statistical and computational methods, 271-308.
</small>

---

## Optimizing community detection

<table>
  <tr>
    <td>
      <ul>
        <li>Applied the Markov clustering algorithm (MCL, <a href="https://doi.org/10.1137/040608635">van Dongen 2008</a>) to graphs induced by varying TN93 thresholds.</li>
        <li>MCL simulates flow through the network to resolve edge-dense clusters.</li>
        <li>We used the same $\Delta$AIC method to optimize the clustering parameters (<i>right</i>).</li>
        <li>AIC was fairly robust to changing MCL parameters.</li>
      </ul>
    </td>
    <td width="45%">
      <img src="/img/tenn-deltaAIC.png">
      <table>
      <tr><td>
      <div class="avatar" style="height: 110px; width: 110px">
        <img src="/img/molly-thumb.jpeg">
      </div>
      </td><td>
        Molly Liu<br/>
        MSc graduate
      </td></tr>
      </table>
    </td>
  </tr>
</table>
<br/>
<small>
van Dongen, Stijn, Graph clustering via a discrete uncoupling process, Siam Journal on Matrix Analysis and Applications 30-1, p121-141, 2008.
</small>

---

## Dissolving the giant component
![](/img/community-figure3.png)
<br/>
<small>
Liu, M., Chao, C., & Poon, A. F. (2023). From components to communities: bringing network science to clustering for molecular epidemiology. Virus Evolution, vead026.
</small>

---

## Concluding remarks

* Community detection represents a wide avenue for further research.
* Many model-based clustering methods have also been proposed:
  * *e.g.*, [DM-PhyClus](https://github.com/villandre/DMphyClus) (Villandr&eacute; *et al.*, 2018); [MSBD](https://taming-the-beast.org/tutorials/MSBD-tutorial/) (Barrido-Sottani *et al.*, 2018); <br/>[clmp](https://shiny.filogeneti.ca/clmp/) (McCloskey and Poon, 2017).
* Will these innovations ever be adopted by public health?

> "Chato, Kalish, and Poon (2020) recommends tailoring transmission clustering thresholds to the local epidemic context [19]; however, the current HIV molecular surveillance program infrastructure in the US would likely be unable to facilitate the high level statistical analyses required to accomplish this."

<br/>
<small>
Rich, Shannan N., et al. "Employing molecular phylodynamic methods to identify and forecast HIV transmission clusters in public health settings: A qualitative study." Viruses 12.9 (2020): 921.
</small>

---

## Thanks!

<table>
<tr>
  <td>
    <img src="/img/cihr.png"/><br/>
    <img src="/img/NSERC_RGB.png"/>
  </td>
  <td>
  <img src="/img/lab-thumbnails.jpeg"/></td>
</tr>
</table>
