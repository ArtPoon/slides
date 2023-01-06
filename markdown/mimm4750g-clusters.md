

# Genetic distance clustering

* A [cluster](https://en.wikipedia.org/wiki/Cluster_analysis) is a group of observations that are more similar to each other than observations outside the cluster.
* In distance-based (pairwise) clustering, any pair of sequences with a distance below a threshold are assigned to the same cluster.
  * The selection of this threshold can be fairly subjective!
* Several applications of clustering for infectious diseases:
  * Defining a virus nomenclature (taxonomy)
  * Finding population-level associations with transmission patterns (epidemiology)
  * Detecting outbreaks (epidemiology)

---

# Defining new virus species

* The [International Committee on the Taxonomy of Viruses](https://talk.ictvonline.org/) allows the definition of a new virus species based on genetic clustering, although this remains controversial.

> Unfortunately, in recent years, ICTV Study Groups [...] have created large number of species on the basis of a single criterion, namely a certain percentage of genome similarity between individual viruses.

---

# Demarcating virus species

<img src="/img/geminivirus.png" height="300px"/>

<small><small>
Image credit: CM Fauquet <i>et al.</i> (2008) [Geminivirus strain demarcation and nomenclature](https://link.springer.com/article/10.1007%2Fs00705-008-0037-6).  Arch Virol 153:783-821.
</small></small>

---

<table>
  <tr>
    <td style="vertical-align:middle; font-size: 24px;">
      <h1>HIV groups and subtypes</h1>
      <ul>
        <li>Defining groupings within species (HIV-1)</li>
        <li>Four HIV-1 groups (M-P) associated with different zoonotic events.</li>
        <li>Group M is split into subtypes (A-J).</li>
        <li>A and F are split into sub-subtypes (A1-A7, F1, F2).</li>    
        </ul>
        <small><small>
        Image credit: N D&eacute;sir&eacute; <i>et al.</i> (2018) Characterization update of HIV-1 M subtypes diversity and proposal for subtypes A and D sub-subtypes reclassification. <a href="https://retrovirology.biomedcentral.com/articles/10.1186/s12977-018-0461-y">Retrovirology 15: 80</a>.
        </small></small>
    </td>
    <td width="40%">
      <img height="600px" src="https://media.springernature.com/full/springer-static/image/art%3A10.1186%2Fs12977-018-0461-y/MediaObjects/12977_2018_461_Fig1_HTML.png"/>
    </td>
  </tr>
</table>

---

# Clustering bacteria

<table>
  <tr>
    <td>
      <ul>
        <li>Bacterial genomes tend to be more fluid than viruses, with less conserved genes.</li>
        <li>Calculating distances requires a conserved locus (<i>e.g.</i>, 16S rRNA) or set of "core" genes, <i>e.g.</i>, multi-locus sequence typing, MLST.</li>
        <li>Gradually being replaced with whole genome methods that predict core and accessory loci (right)</li>
      </ul>
    </td>
    <td width="50%">
      <img src="https://poppunk.readthedocs.io/en/latest/_images/unconstrained_refine.png" width="500px">
      <small>
      Image source: <a href="https://poppunk.readthedocs.io/en/latest/model_fitting.html">PopPUNK documentation, Lees and Croucher (2020)</a>
      </small>
    </td>
  </tr>
</table>

---