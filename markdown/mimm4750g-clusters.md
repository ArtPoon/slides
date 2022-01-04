# MIMM4750G
## Clustering for epidemiology
<img src="https://imgs.xkcd.com/comics/chat_systems.png" width="600px"/>

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

<section data-state="tn93-slide">
  <br/>
  <div id="tn93" class="fig-container"
       data-fig-id="fig-tn93"
       data-file="/include/clustering.html"
       style="width:800px; margin:0 auto; height:700px">
  </div>
</section>

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

# Transmission clusters

* A common technique to study the risk structure of a population from HIV-1 sequences.
  * Risk structure: a population is structured into two or more groups, where each group shares a common risk factor, *e.g.*, injection drug use.
* A genetic cluster implies that a group of infections are related through recent, rapid transmission events.
* Clusters might *also* arise when sequences were collected soon after infection.

---

<table>
  <tr>
  <td style="vertical-align: middle; font-size: 20pt;">
  <h1>Transmission clusters (2)</h1>
  <ul>
    <li>A very common technique is to find statistical associations between:
      <ol>
      <li>potential risk factors, and;</li>
      <li>whether or not an infection is in a cluster.</li>
      </ol>
    </li>
    <li>Usually quantified by <a href="https://en.wikipedia.org/wiki/Linear_regression#Simple_and_multiple_linear_regression">multiple</a> <a href="https://en.wikipedia.org/wiki/Logistic_regression">logistic regression</a>.</li>
    </li>
  </ul>
  </td>
  <td width="55%">
    <img src="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6887514/bin/nihms-1059399-f0003.jpg" height="400px"/>
    <small>
    Image credit: M Ragonnet-Cronin <i>et al.</i> (2019) <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6887514/">HIV Transmission Networks Among Transgender Women in Los Angeles County: network analysis of surveillance data</a>. Lancet HIV 6: e164-e172.
    </small>
  </td>
</table>



---

# Suggested readings


* [Detecting and Responding to HIV Transmission Clusters: A Guide for Health Departments](https://www.cdc.gov/hiv/pdf/funding/announcements/ps18-1802/CDC-HIV-PS18-1802-AttachmentE-Detecting-Investigating-and-Responding-to-HIV-Transmission-Clusters.pdf), US CDC.

