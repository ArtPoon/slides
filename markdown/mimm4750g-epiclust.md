# MIMM4750G
## Clustering for epidemiology
<img src="https://imgs.xkcd.com/comics/everyones_an_epidemiologist.png" width="600px"/>

---

<table>
  <tr>
  <td style="vertical-align: middle; font-size: 20pt;">
  <h1>Clustering for epidemiology</h1>
  <ul>
    <li>In public health, a cluster of cases in space and time implies a common source.</li>
    <li>For example, the Broad Street cholera outbreak was determined to be caused by contamination of water sources by a failing cesspool.</li>
    <li>Cases were clustered spatially around a water pump on Broad street (right).</li>
  </ul>
  </td>
  <td>
    <img src="/img/broad-street.jpg" width="300px"/>
    <small>
    Brody et al. (2000) Map-making and myth-making in Broad Street: the London cholera epidemic, 1854.  Lancet 356; 64-68.
    </small>
  </td>
</table>

---

# Genetic clusters and epidemiology

* A <u>genetic</u> cluster of infections similarly suggests that they are related by recent and rapid transmission events.
* Sequences can be easier to collect.
  * *e.g.*, sequencing for presence of drug resistance mutations is standard of care for HIV treatment.
* Genetic clustering requires measurable evolution on a similar time scale as transmission.

---

# Genetic clustering

* We place two sequences in the same cluster if their distance falls below some threshold.

* Clusters are often visualized as networks ([graphs](https://en.wikipedia.org/wiki/Network_theory))
  * Each node represents a sequence (infection).
  * Nodes are connected by [edges](https://en.wikipedia.org/wiki/Glossary_of_graph_theory_terms#edge) to indicate their distance is below threshold.

---

<table>
  <tr>
  <td style="vertical-align: middle; font-size: 20pt;">
  <h1>Tuberculosis</h1>
  <ul>
    <li>TB is one of top 10 causes of death worldwide</li>
    <li>Caused by lung infection by <i><a href="https://en.wikipedia.org/wiki/Mycobacterium_tuberculosis">Mycobacterium tuberculosis</a></i>.</li>
    <li>Clustering of whole-genome sequence data can idenfity high-risk groups and detect undiagnosed cases.</li>
  </ul>
  </td>
  <td width="50%">
    <img src="/img/1-s2.0-S1473309912702773-gr4_lrg.png" width="450px"/>
    <small>
    Cluster diagram by TM Walker <i>et al.</i> (2013) Lancet Inf Dis 13: 137.
    </small>
  </td>
</table>

---

<small><small>
Clusters of people living with HIV in British Columbia.  Red/orange = Strong, weak HIV-1 drug resistance.  Grey = deceased.  Circle size &propto; viral load.
</small></small>
<img src="/img/crop-graph.png" height="500px"/>

---

# Anatomy of a graph

* A *subgraph* is any subset of nodes ([vertices](https://en.wikipedia.org/wiki/Glossary_of_graph_theory#vertex)) and their edges in the graph.
* A *connected component* is a subgraph in which every pair of nodes is connected by some [path](https://en.wikipedia.org/wiki/Glossary_of_graph_theory#path).
  * Generally, connected components &mdash; not subgraphs &mdash; are interpreted as genetic clusters.

<img width="400px" src="/img/connected-components.png"/>

---

# Selecting thresholds

* How do we set the distance threshold for genetic clusters?
* Higher thresholds (further from zero) eventually yield one enormous cluster.
  * A giant component is not that different from the entire population.
* A low threshold (closer to zero) results in many small clusters.
  * Having many clusters of one is not that different from the original population database.


---

# Following convention

* Typical thresholds for TN93 distances range from 0.005 (US CDC) to 0.02.
* Remember, TN93 is a genetic distance measured in *expected numbers of nucleotide substitutions per site*.
* TN93 program defaults to 0.015 (often expressed as 1.5%).
  * 1.5% was identified by [Aldous *et al.* (2012)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3529609/) as a "standard" threshold used in previous work.

---

Distribution of TN93 distances between potential transmission pairs (blue) and random sequences (red).

<img width="500px" src="https://journals.plos.org/plospathogens/article/figure/image?size=large&id=info:doi/10.1371/journal.ppat.1006000.g001"/>

<small><small>
Image source: Wertheim <i>et al.</i> (2017) <a href="https://journals.plos.org/plospathogens/article?id=10.1371/journal.ppat.1006000">Social and Genetic Networks of HIV-1 Transmission in New York City.</a>  PLOS Pathogens.
</small></small>

---

# Concentrated vs. generalized epidemics

* "Standard" thresholds for TN93 were developed in the context of concentrated epidemics, where transmission occurs mostly in defined risk groups.
  * When applied to generalized epidemics, *e.g.*, HIV-1 in sub-Saharan Africa, we tend to see less clustering at those thresholds.

<img width="500px" src="/img/jiaa276.png"/>

<small><small>
Image source: <a href="https://academic.oup.com/jid/article/222/10/1670/5850911">Novitsky <i>et al.</i> (2020)</a> J Infect Dis 222(10): 1670-1680.
</small></small>

---

# Transmission clusters

* A common technique to study the risk structure of a population from HIV-1 sequences.
  * Risk structure: a population is structured into two or more groups, where each group shares a common risk factor, *e.g.*, injection drug use.
* A genetic cluster implies that a group of infections are related through **recent**, **rapid** transmission events.
  * These are often referred to as "transmission clusters" - *BUT* the edges do *not* represent transmission events!


---

# Clusters and risk factors

* A very common technique is to find statistical associations between potential risk factors, and whether or not an infection is "in" a cluster.
  * Note, a connected component of one is still a component, so we are redefining "cluster" as components of two or more nodes.
* The state of being in a cluster is a binary outcome.
* Usually associations with clustering are identified by <a href="https://en.wikipedia.org/wiki/Linear_regression#Simple_and_multiple_linear_regression">multiple</a> <a href="https://en.wikipedia.org/wiki/Logistic_regression">logistic regression</a>.

---

# Remember regression?

* Hopefully you remember the basics of linear regression from second-year statistics:
$$y = \beta x + \beta_0 + \epsilon$$

  * $y$ is the dependent (outcome) variable
  * $x$ is an independent (predictor) variable
  * $\beta$ is the coefficient (slope)
  * $\beta_0$ is the intercept (value of $y$ when $x=0$)
  * $\epsilon$ is a noise term for residual variation

---

# Assumptions of linear regression

* $y$ is continuous-valued and linearly dependent on $x$
* Residual variation is normally distributed, $\epsilon \sim \mathcal{N}(0, \sigma)$ and independent of $x$
* Estimate $\beta$ and $\beta_0$ by least-squares minimization:
$$L(\beta, \beta_0) =  \sum_i (y_i - (\beta x_i + \beta_0))^2 $$
  * We can solve for $dL/d\beta=0$ and $dL/d\beta_0=0$.

---

# Logistic regression

<table>
  <tr>
    <td>
      <ul>
        <li>Let $p$ be the probability of binary outcome $y$:
        $$\log\left( \frac{p}{1-p} \right) = \beta x + \beta_0 + \epsilon$$</li>
        <li>$\epsilon$ follows a <a href="https://en.wikipedia.org/wiki/Logistic_distribution">logistic distribution</a> instead of a normal one.</li>
        <li>The ratio $\frac{p}{1-p}$ is known as the <i>odds</i>.</li>
        <li>Hence, the logistic regression is a linear model of the log odds.</li>
      </ul>
    </td>
    <td width="50%">
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Exam_pass_logistic_curve.jpeg" width="500px"/>
      <small>
      Image source: <a href="https://commons.wikimedia.org/wiki/File:Exam_pass_logistic_curve.jpeg">Wikimedia Commons</a>.
      </small>
    </td>
  </tr>
</table>

---

# Interpreting logistic regressions

* The estimate for the effect $\beta$ of an independent variable $x$ is expressed as an *odds ratio*:
<img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/451dc30a46a3fd5beb6c48b9de8bed20a8b7f0d3" width="600px"/>

* Thus, $\beta$ is the expected change in the log odds ratio for every unit increase in $x$.
  * Note, $e^0=1$ indicates no expected change.

<small><small>
Image credit: Wikipedia, <a href="https://en.wikipedia.org/wiki/Logistic_regression#Logistic_function,_odds,_odds_ratio,_and_logit">Logistic regression</a>
</small></small>

---

<img src="/img/nihms-1059399-f3.svg" height="500px"/>


<small><small>
Image credit: M Ragonnet-Cronin <i>et al.</i> (2019) <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6887514/">HIV Transmission Networks Among Transgender Women in Los Angeles County: network analysis of surveillance data</a>. Lancet HIV 6: e164-e172.
</small></small>

---

# Problems with interpreting clusters

* We are implicitly assuming that being "in a cluster" means that an individual belongs to a risk group with a higher transmission rate.
  * Significant effects on log odds can identify risk factors, *e.g.*, age.
* Clusters can also result from sampling biases.
  * *e.g.*, Clusters can arise when sequences were collected soon after infection.

<img src="/img/MMPP2.svg" height="200px"/>

---

# Ethical and legal issues

* Genetic clusters have been used as molecular forensic evidence in HIV transmission cases.
  * HIV transmission is criminalized in many countries - in Canada, people can be charged with aggravated sexual assault.
* Having genetically similar infections can be consistent with direct transmission, but it is not sufficient  ([Bernard *et al.* (2017)](https://onlinelibrary.wiley.com/doi/full/10.1111/j.1468-1293.2007.00486.x)).
* We are responsible for preventing data and methods from being misused.
  * More about this in ethics lecture!

---

<section data-background="#333" style="color:white">

<h1 style="color:white">Key points</h1>

* A genetic cluster of infections may be related by recent, rapid transmission events.
* Genetic clusters are often identified as connected components in a network (graph).
* Assuming that clusters mean higher transmission rates, many studies use logistic regression to look for risk factors associated with clusters.
* Genetic clusters have also been used as forensic evidence in criminal HIV transmission cases.

</section>
