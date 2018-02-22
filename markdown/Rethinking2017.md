# Phylogenetic forensic science and implications for HIV criminalization
### Art Poon<sup>1</sup>

<small> 
<sup>1</sup> Department of Pathology & Laboratory Medicine, Western University
</small>

<br/>
<img src="/img/UWO_Logo.svg" width="30%" align="left">

---

## HIV genetics

* HIV evolves rapidly - an infection becomes genetically unique within weeks of transmission
* Genetic sequencing is standard of care
* We have learned a great deal from the comparative study of HIV sequence variation
  * drug resistance
  * adaptation to the immune system
  * history of the pandemic

---

## Genetic clustering

<table><tr>
  <td width="60%"><ul>
    <li>An increasingly popular method for analyzing HIV sequences</li>
    <li>A **genetic cluster** is a group of HIV sequences that are more similar to each other than to other sequences in the sample population</li>
    <li>Uses a **genetic distance** - a formula that quantifies the differences between two sequences</li>
  </td>
  <td>
    <img src="/img/LancetFigure4b.png" width="90%">
    <small><small>
    From Poon *et al.* 2016 Lancet HIV 3.5.
    </small></small>
  </td>
</tr></table>

---

## Clustering and real-time epidemiology
 * Rapidly growing interest in using genetic clustering to monitor epidemics
 * In B.C., real-time monitoring system integrated with HIV treatment database
 * Supported public health responses to potential transmission outbreaks
 
<img src="/img/LancetFigure4a.png" width="80%">

---

## HIV genetics and criminalization
<table><tr>
  <td width="60%"><ul>
    <li>Long, troubled history between HIV genetic analysis and criminalization</li>
    <li>Potential misuse/misinterpretation of genetic data</li>
    <li>What are the potential costs?  What are the benefits?</li>
    <li>What are the implications of recent advances in HIV phylogenetics?</li>
  </td>
  <td>
    <img src="/img/dentist.png" width="90%">
    <small><small>
      From Ou *et al.* 1992 Science 256
    </small></small>
  </td>
</tr></table>

---

## Misinterpreting clusters
<table><tr>
  <td width="60%"><ul>
    <li>Clusters are often depicted as network diagrams</li>
    <li>Each node represents a person -- each line (edge) indicates genetic similarity</li>
    <li>Edges do *not* represent a contact or transmission event</li>
    <li>"Hub" individuals are *not* "superspreaders"</li>
  </td>
  <td>
    <img src="cluster.png" width="80%">
  </td>
</tr></table>
<small>This network was generated from clustering sequences simulated on a tree where *E* was in the middle of a transmission chain, and diagnosed earlier.</small>

---

## Misinterpreting phylogenies

* A phylogeny is a tree that represents how different populations are related by common ancestors
* A branching point in an HIV phylogeny does *not* represent a transmission event

  <img src="/img/transtree.png" width="90%">

---

## Recent advances

* Consensus position has been that one cannot conclude that *A* transmitted to *B* on the basis of genetic similarity/phylogeny of infections
* Recent advances in the field have been challenging this position
  1. Within-host diversity and paraphyly
  2. Data augmentation
  3. Joint inference

---

## Within-host diversity (older)

<table><tr>
  <td width="65%"><ul>
    <li>The virus population within a person becomes very diverse over time</li>
    <li>If one of those variants becomes transmitted to the next person, then the next population may be nested within the first.</li>
    <li>Sequences from the first person are said to be *paraphyletic*</li>
    <li>Already applied to HIV transmission cases</li>
  </td>
  <td>
    <img src="/img/Romero.png" width="35%">
  </td>
</tr></table>

<small>Metzker *et al.* (2002) PNAS 99: 14292; Romero-Severson *et al.* (2016) PNAS 113: 2690.</small>


---

## Data augmentation (more recent)

<table><tr>
  <td width="65%"><ul>
    <li>Incorporating epidemiological observations into the reconstruction of transmission events</li>
      <ul>
        <li>Infectious period and location (H7N7, Ypma *et al.* 2011 Proc Roy Soc Lond B 279)</li>
        <li>Diagnosis, time since infection, location (FMDV, Morelli *et al.* 2012 PLCB 8)</li>
        <li>Distribution of time interval between transmission events (SARS, Jombart *et al.* 2014 PLCB 10)</li>
        <li>Time since infection (HIV, Drescher *et al.* 2014 CID 58)</li>
      </ul>
  </ul></td>
  <td>
    <img src="F4.large.png">
    <small><small>
      Excerpt from Figure 4, Ypma *et al.* 2013 Genetics 195.
      Each bar represents a "host" - green interval is infectious period.
    </small></small>
  </td>
</tr></table>

---

## Joint inference (most recent)

* Combine two models:
  1. Model evolution of virus population within each person
  2. Model spread of epidemic through population
* Tends to use Bayesian methods, *e.g.,*:
  * [TransPhylo](https://github.com/xavierdidelot/TransPhylo) (*M. tuberculosis*, Didelot *et al.* 2014 MBE 31)
  * [BEAST](https://github.com/beast-dev/beast-mcmc) (H7N7, Hall *et al.* 2015 PLCB 11)
  * [phybreak](https://github.com/donkeyshot/phybreak) (multiple non-HIV, Klinkenberg *et al.* 2017 PLCB 13)
  * [SCOTTI](https://bitbucket.org/nicofmay/scotti/) (FMDV, De Maio *et al.* 2016 PLCB 12)

---

## Implications

* What do these new methods mean for people living with HIV?
* Is it inevitable that current "who infected whom" methods will be used in an HIV transmission case?
* Is this a significant change from previous (genetic clustering) methods?
* The potential misuse/misinterpretation of these complex methods obligates us to be skeptical, critical, and aware. 

---

## Acknowledgements

<small>
This work was supported in part by the Government of Canada through Genome Canada 
 and the Ontario Genomics Institute (OGI-131), and by a Bridge Grant from the Canadian Institutes of Health Research (CIHR).
 
 I am supported by a CIHR New Investigator Award.
 </small>

<table><tr>
  <td><img src="/img/GenomeCanadaLogo.png" width="70%"></td>
  <td><img src="/img/cihr.png" width="60%"></td>
</tr></table>
