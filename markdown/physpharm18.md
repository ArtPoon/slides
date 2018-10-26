
<img src="/img/river-dodder.jpg" width="350px"/><br/>

# UWO Physiology and Pharmacology
## Blind dates in a quiet reservoir: 
### How clocks, trees and chains teach us about HIV-1 latency
Art Poon<br/>
<small>
Department of Pathology & Laboratory Medicine
</small>

![](/img/UWO_Logo.svg)

---

# Background
## Global burden of HIV-1

* About 36 million people living with HIV-1 in the world
* Over 63,000 in Canada - disproportionate growth in Saskatchewan
* Life expectancy greatly improved by combination antiretroviral therapy
* No cure: life-long treatment with emerging side-effects

---

# Background
## Natural history of HIV infection

![](/img/hiv-timecourse.svg)

<small>
Source: https://commons.wikimedia.org/wiki/File:Hiv-timecourse_copy.svg
</small>

---

# Background
## HIV treatment

* Rapid virus evolution necessitates combination antiretroviral therapy (cART)
* Patient can achieve complete viral suppression within days of starting treatment.
* If the patient stops treatment, viral rebound to original levels occurs within days &mdash; even after decades of successful viral suppression.
* Infection is being re-seeded from a latent reservoir of infected cells.

---

# HIV latency
## What is the latent reservoir?

* HIV DNA becomes integrated into the host genome.
* A small fraction of infected cells enter an inactive state.
* Long-lived reservoir invisible to immune system and drug treatment; reseeds the infection.
<img src="/img/latency.jpg" width="500px"/>

<small><small>
AJ Murray *et al.* (2016) J Immunol 197:407.
</small></small>

---

# HIV latency
## Cure by shock-and-kill

<img src="/img/shock-and-kill.jpg"/>
<small><small>
Figure from S. Deeks (2012) __Shock and kill__. **Nature** 487:439
</small></small>

* Can we eradicate virus from the latent reservoir?
* Shock: induce HIV latency reversal
* Kill: immune response against re-activated infected cells, cART blocks further infection

---

# HIV latency
## How large is the reservoir?

* The reservoir is largely composed of resting CD4+ T cells.
* We measure the latent reservoir by the number of **i**nfectious **u**nits **p**er **m**illion (IUPM) cells.
* Use a limiting dilution assay to estimate the IUPM.
![](/img/limiting-dilution.png)

---

# How large is the reservoir?
## Limiting dilution assay
* Readout of limiting dilution assay is positive/negative wells with $n$ cells
* Probability of a negative well
  $$P(Y=0) = \exp(-\lambda n)$$
  where $\lambda$ is the proportion of cells infected.
* Probability that $m$ of $M$ wells are positive:
  $$P(m|M,n,\lambda) = {M\choose m} (1-\exp(\lambda n))^m \exp(\lambda n)^{M-m}$$

---

# How large is the reservoir?
## Limitations

* A positive well may contain one or more infected cells.
* If all wells are positive, then our estimate of $\lambda\rightarrow\infty$.
* We can control this probability with dilution.
* Downside: maintaining each well culture is a lot of work!

---

<table><tr>
<td width="70%" style="vertical-align:center;">
  <h1>How large is the reservoir?</h1>
  <h2>Sequencing</h2>
  <ul>
    <li>IUPM assays are now often combined with genetic sequencing.</li>
    <li>Characterize the composition of the latent reservoir.</li>
    <li>Next-generation sequencing can make it cost-effective to sequence individual viruses.</li>
    <li>Can we use this additional information to improve our estimate of IUPM?</li>
  </ul>
</td>
<td>
  <img src="/img/salantes-tree.svg" height="600px"/>
</td>
</table>

---

# How large is the reservoir?
## Estimating IUPM from NGS data

<table>
  <tr>
    <td>
    <ul>
      <li>A well tests posiitve if there is one or many infected cells.</li>
      <li>Detecting multiple HIV variants in a well by NGS may improve estimates.</li>
      <li>We developed a new Bayesian method to use NGS to estimate IUPM</li>
      <li>Applied to samples collected from Rakai, Uganda, by Johns Hopkins Medicine and NIAID (US).</li>
    </ul>
    </td>
    <td width="30%">
      <table>
        <tr><td colspan=2><img src="/img/prodger.jpeg"/>
        <small><small>Dr. Jessica Prodger</small></small></td></tr>
        <tr><td><img src="/img/Hopkins.png"/></td></tr>
        <tr><td><img src="/img/NIH_NIAID.jpg" width="150px"/></td></tr>
      </table>
    </td>
  </tr>
</table>

---

# How large is the reservoir?
## Results

<table>
  <tr>
    <td>
      Simulations show greater accuracy with increasing true IUPM.
      <img src="/img/iupm-barplots.png"/>
    </td>
    <td>
      <img src="/img/iupm-realdata.png"/>
    </td>
  </tr>
</table>
<small><small>
Poon *et al.* (2018) *Quantitation of the latent HIV-1 reservoir from the sequence diversity in viral outgrowth assays.*  Retrovirology 15: 47.
</small></small>

---

# HIV latency
## How does the reservoir persist?

* Half-life estimates for latent reservoir range from 4 to 12 years.
* Viral rebound within days of treatment interruption implies constant high rate of reactivation.
* Hypotheses:
  1. Growth of latently infected T-cells (clonal expansion).
  2. Low-level replication of HIV in drug sanctuaries.

---

# HIV latency
## Dated-tip phylogenies

* We can build a phylogeny relating copies of HIV within a single host.
* Without other information, time and the rate of evolution are confounded (left).
* We can use sample collection dates to "pin" tips to a timeline, and rescale the tree in time.

<table><tr>
<td><img src="/img/timetree.png" width="450px"/></td>
<td><img src="/img/timetree-scaled.png" width="400px"/></td>
</tr></table>

---

# HIV latency
## Dating HIV in the reservoir

<table>
  <tr>
    <td>
      <ul>
        <li>When HIV integrates into the host cell genome, its evolution is effectively frozen.</li>
        <li>If evolution is sufficiently "clock-like" (constant rate of evolution), then we can extrapolate when HIV DNA became latent.</li>
        <li>Requires that we estimate the **root** &mdash; the earliest point in time in the phylogeny.</li>
      </ul>
    </td>
    <td width="40%">
      <img src="/img/blind-dating-cartoon.png"/>
    </td>
  </tr>
</table>

---

# HIV latency
## Data collection

<table>
  <tr>
    <td width="60%">
    <ul>
      <li> Collaboration with Dr. Zabrina Brumme and Dr. Jeff Joy at BC Centre for Excellence (CFE) in HIV/AIDS.</li>
      <li>Obtained **pre-therapy** samples of HIV plasma RNA from 2 patients from CFE archive.</li>
      <li>Sampled post-treatment HIV DNA from same patients.</li>
      <li>Applied our method to date these reservoir sequences.</li>
    </ul>
    </td>
    <td width="30%">
      <table>
        <tr><td><img src="/img/zabrina-and-jeff.jpg"/>
        <tr><td><img src="/img/cfelogo.png"/></td></tr>
      </table>
    </td>
  </tr>
</table>

---

# HIV latency

<table>
  <tr>
    <td width="60%">
    <h2>Participant 1</h2>
    <ul>
      <li>P1 was diagnosed with HIV-1 on August 1996.</li>
      <li>Did not achieve viral suppression until August 2006.</li>
      <li>Viral rebound following unsuccessful regimen change (Fall 2017).</li>
      <li>Sequenced post-treatment HIV RNA ($\circ$) and DNA ($\diamond$).</li>
      <li>HIV DNA dated far deeper than post-treatment RNA.</li>
    </ul>
    </td>
    <td width="35%">
      <img src="/img/bd-patient1.png"/>
    </td>
  </tr>
</table>

<small><small>
BR Jones *et al.* (2018) *Phylogenetic approach to recover integration dates of latent HIV sequences within-host.*  Proc Natl Acad Sci USA.
</small></small>

---

# HIV latency

<table>
  <tr>
    <td width="60%">
    <h2>Participant 2</h2>
    <ul>
      <li>P2 was diagnosed with HIV-1 on April 1995.</li>
      <li>Initiated dual therapy in July 2000.</li>
      <li>Switched to combination therapy (cART) August 2006 and achieved viral suppression.</li>
      <li>5 sequences dated to time of diagnosis, before earliest sample.</li>
      <li>Reservoir harbours replication-competent HIV from early stage of infection.</li>
    </ul>
    </td>
    <td width="35%">
      <img src="/img/bd-patient2.png"/>
    </td>
  </tr>
</table>

<small><small>
BR Jones *et al.* (2018) *Phylogenetic approach to recover integration dates of latent HIV sequences within-host.*  Proc Natl Acad Sci USA.
</small></small>

---

![](/img/bd-pnas.png)

---

# Acknowledgements

* The development and validation of the MiCall pipeline was made possible by the members of the BC Centre for Excellence in HIV/AIDS Molecular Laboratory.

* These studies were also made possible by collaborations with JCRC Uganda, Case Western Reserve University, Johns Hopkins School of Medicine, and the National Institutes of Allergy and Infectious Diseases (NIH).

* And by the donation by study participants of samples for research purposes.

---

# Thanks!

<table>
  <tr>
    <td><img src="/img/OGI_Logo2015.png" height="100"/></td>
    <td><img src="/img/GenomeCanadaLogo.png" height="100"/></td>
    <td><img src="/img/NIH_NIAID.jpg" height="150"></td>
  </tr>
  <tr>
    <td><img src="/img/cihr.png"  height="150"/></td>
    <td><img src="/img/NSERC_RGB.png"/></td>
  </tr>
</table>
