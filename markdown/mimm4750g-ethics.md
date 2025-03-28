# MIMM4750G
## Ethics

![](https://imgs.xkcd.com/comics/human_subjects.png)

---

# Bioinformatics, infectious disease and ethics

* What are some aspects of scientific ethics esp. pertinent to bioinformatics and infectious disease?
  * Data usage: who owns the data?
  * Data sharing and privacy: source attribution
  * Resource sharing: software distribution and licensing
  * Peer review of source code: is it correct?

---

# Data access

* Access to data is the fundamental resource of bioinformatics.
* An enormous amount of data is available in the public domain.
  * An even larger amount of data is not.
* The [GISAID](https://www.gisaid.org/) novel coronavirus database presently holds about 17 million genome sequences (March 2025).
  * [Genbank](https://www.ncbi.nlm.nih.gov/genbank/sars-cov-2-seqs/) has about 9 million genomes.

---

# Data access: GISAID

* Primary data source for SARS-CoV-2 genome data around the world.
* [Data access agreement](https://www.gisaid.org/registration/terms-of-use/):
  * You cannot redistribute the data, or "enable others to access or use the data through a separate portal".
  * Publications must acknowledge the originating and submitting laboratories.
  * License is non-transferrable.

---

# Why this model?

* Global inequities:
  * Low- and middle-income countries (LMIC) where some outbreaks are common and important samples can be collected.
  * Researchers who benefit most from open access to data tend to be located in high-income countries.
* The GISAID model encourages (and occasionally enforces) acknowledgement of originating labs.
* [Frustration in the research community](https://twitter.com/jxtx/status/1240710221997256706) at lack of open access.
  * Some researchers have had their database access revoked by GISAID ([Wadman 2021](https://www.sciencemag.org/news/2021/03/critics-decry-access-transparency-issues-key-trove-coronavirus-sequences)).

---

# Data sharing: costs and benefits


| Role | Costs | Benefits |
|------|-------|----------|
| Source | Potential loss of privacy | Personalized diagnosis, treatment? |
| Producer | Resources to generate data |  |
|          | Loss of scientific priority |  |
| Distributor | Data storage |   |
|             | Network maintenance |   |
|             | Data curation |    |
| Consumers | Time and effort | Scientific curiosity |
|           |  | Development and validation of new methods |
|           |  | Publication |
| Public |  | Reproducibility |
|   |  | Discovery, new technologies |

---

# Data ownership

<table>
  <tr>
    <td>
      <ul>
        <li>What is data ownership?</li>
        <li>Who owns the data?</li>
        <ul>
          <li>Is it the person we collected the sample from?</li>
          <li>Is it the person collected the sample?</li>
          <li>Is it the lab that sequenced the sample?</li>
          <li>Is it the person who converted the raw data into a useable sequence?</li>
        </ul>
        <li>Ownership is even more ambiguous for virus genomes than human genomes.</li>
      </ul>
    </td>
    <td width="40%">
      <img src="https://upload.wikimedia.org/wikipedia/en/d/d7/Henrietta_Lacks_%281920-1951%29.jpg"/>
      <small>
      Henrietta Lacks, an African-American woman whose tumour biopsy was the source of the first immortalized cell line.
      </small>
      <small><small>
      Source: <a href="https://en.wikipedia.org/wiki/File:Henrietta_Lacks_(1920-1951).jpg">Wikipedia</a>, published under fair usage policy.
      </small></small>
    </td>
  </tr>
</table>

---

# Data stewards/custodians

* A data steward is responsible for curating data and quality control, maintaining data access and integrity.
* [FAIR principles](https://www.go-fair.org/fair-principles/):
  * Findable - Is the data labelled, described?
  * Accessible - Can people access the data?
  * Interoperable - Is the data in a standard, useable format?
  * Reusable - Is the data detailed enough that makes it useful?

---

# Data privacy

* Data are anonymous if they cannot be linked to the originating person (using current or foreseeable methods).
* De-identification: identifiers have been removed, but could be relinked with additional data.
  * For example, Gymrek *et al* re-identified participants from public Y-chromosome sequences and genealogy websites.

<img src="/img/339_321_f2.jpeg" height="200px"/>

<small><small>
Source: Gymrek <i>et al.</i> (2013) Identifying personal genomes by surname inference.  <a href="https://www.science.org/doi/10.1126/science.1229566">Science 339: 321</a>.
</small></small>

---

# Data privacy and source attribution

* Source attribution is the reconstruction of the transmission of infectious disease from a specific individual, population or location.
  * *i.e.*, who infected whom.
* Identification of sources places the burden of responsibility for onward transmission of disease.
* Benefits: More accurate estimation of transmission sources (*e.g.*, farms, factories),  epidemiological parameters.  
* Costs: Loss of privacy; stigmatization, blame and criminal prosecution.

---

# Data privacy: Criminalization of HIV transmission

* Around the world, people continue to be prosecuted for HIV transmission.
  * In Canada, people found guilty of HIV transmission can be charged with aggravated sexual assault, with "maximum life imprisonment and mandatory lifetime registration as a sex offender" ([aidslaw.ca](http://www.aidslaw.ca/site/the-criminalization-of-hiv-non-disclosure-in-canada-report/?lang=en))
* Genetic sequence analysis, including phylogenetics, is used as forensic evidence in these cases.

---

# Data privacy: HIV forensics and bioinformatics

<img src="https://ars.els-cdn.com/content/image/1-s2.0-S1684118220300025-gr2_lrg.jpg"/>

<small><small>
Image credit: W-Y Li <i>et al.</i> (2020) <a href="https://doi.org/10.1016/j.jmii.2019.12.002">J Microbiol Immunol Infect, in press</a>.
</small></small>

---

# Failing to understand bootstraps

Phylogenetic tree from an HIV transmission court case in Taiwan
<img src="/img/taiwan-source-attribution2.png" height="400px"/>

<small><small>
Source: WY Li <i>et al.</i> (2020) Source identification of HIV-1 transmission in three lawsuits Using Ultra-Deep pyrosequencing and phylogenetic analysis. [J Microbiol Immunol Infect](https://www.sciencedirect.com/science/article/pii/S1684118220300025?via%3Dihub), <i>in press</i>.
</small></small>

---

# Data privacy: The Bavarian patient

* "... it appears that this cluster [...] is the direct ancestor of these later viruses and thus led directly to some fraction of the widespread outbreak circulating in Europe today."

<img src="https://pbs.twimg.com/media/ESP5-KDU4AEMuDe?format=jpg&name=large" height="350px"/>

<small><small>
Source: Twitter (March 4, 2020), Nextstrain developer feed.
</small></small>

---

<table>
  <tr>
    <td style="font-size: 20pt; vertical-align: middle">
      <h1>Real-time outbreak surveillance</h1>
      <ul>
        <li>HIV samples are sequenced to detect drug resistance.</li>
        <li>These sequences can also be used to detect transmission outbreaks.</li>
        <li>Public health benefit in the ability to mobilize a targeted prevention response?</li>
      </ul>
    </td>
    <td width="40%">
      <img src="/img/cluster55.png" width="300px"/>
    </td>
  </tr>
</table>
<img src="/img/LancetFigure4a.png" width="750px"/>

<small><small>
Image credit: Poon <i>et al.</i> (2016) <a href="https://doi.org/10.1016/S2352-3018(16)00046-1"/>Lancet HIV 3: e231</a>.
</small></small>

---

# Source attribution: Costs and benefits

| Role | Costs | Benefits |
|------|-------|----------|
| Individual | Potential loss of privacy | No direct benefit |
|   | Criminal prosecution |  |
| Clinical lab | Resources to generate data | No direct benefit |
|              | Exposure to subpeonas, litigation |   |
| Scientist    |   | Development of methods |
|              |   | Publication |
| Public health | Learning curve | Targeted intervention |
|               | Misinterpretation | More accurate models |
| Community | Stigmatization | Reduced transmission? |

---

Delays from sample collection to submission of H5N1 genomes to the GISAID database:

<img src="https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41587-025-02636-6/MediaObjects/41587_2025_2636_Fig1_HTML.png" width=700/>

<small><small>
Image source: Otto and Edgerton (2025) <a href="https://www.nature.com/articles/s41587-025-02636-6">Nature Biotechnol</a>.
</small></small>

---

# A new model for data sharing

* Pathoplexus (https://pathoplexus.org/) is a new, open-source database that is run by an elected executive board of "wet lab" scientists from five continents.
  * Currently holds genomes of Ebola virus, Mpox, and two other viruses.
* Scientists who deposit data get to set terms of access (open or restricted).
  * Access restrictions apply for up to one year.
  * Restricted-access data require user to (1) include a submitter as an author, or (2) create a DOI and cite in manuscript.

---

<section data-background="#333" style="color:white">

<h1 style="color:white">Key points</h1>

* Bioinformatics is about working with data.
* Collecting genomic data takes time, money and willingness to provide samples, *e.g.*, patients.
  * The people who know how to analyze data and produce high-impact publications are not always the ones who collected the data.
  * This conflict can lead to long delays in releasing important data.
* For HIV-1, sequence data has been used to criminally prosecute people.
  * It has also been used to guide public health prevention efforts in real time.

</section>


