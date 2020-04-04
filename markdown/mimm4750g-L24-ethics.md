# MIMM4750G
## Ethics

![](https://imgs.xkcd.com/comics/research_ethics.png)

---

# Scientific ethics

* Doing science
  * Study design
  * Informed consent
  * Fabrication
* Communicating science
  * Publication and authorship
  * Data and resource sharing
  * Peer review and funding

---

# Bioinformatics, infectious disease and ethics

* What are some aspects of scientific ethics esp. pertinent to bioinformatics and infectious disease?
  * Data usage: who owns the data?
  * Data sharing and privacy: source attribution
  * Resource sharing: software distribution and licensing
  * Peer review of source code

---

# Data access

* Access to data is the fundamental resource of bioinformatics.
* An enormous amount of data is available in the public domain.
* An even larger amount of data is not.
  * The [NIH Genomic Data Commons repository](https://portal.gdc.cancer.gov/repository) holds over 526,000 files - over 60% of the files are controlled access.
  * The [GISAID]() novel coronavirus database presently holds over 3,400 genome sequences - [Genbank](https://www.ncbi.nlm.nih.gov/genbank/sars-cov-2-seqs/) has about 320 genomes.

---

# Dayhoff and *The Atlas*

* Dayhoff and Eck develop new computational methods to compile and analyze a protein sequence database.
* Dayhoff petitioned researchers to donate protein sequence data in exchange for a copy of *The Atlas*, which is copyrighted material.
* Unable to obtain sufficient grant support, Dayhoff adopts a commercial model to maintain the database.
* *The Atlas* is succeeded by Genbank, which operates under an open access model.

---

# GISAID

* Primary data source for [nextstrain](https://nextstrain.org/).
* [Data access agreement](https://www.gisaid.org/registration/terms-of-use/):
  * You cannot redistribute the data.
  * Publications must acknowledge the originating laboratory.
  * License is non-transferrable.
* ~~It is currently not possible to download all the data - one must click through each record manually (scraping is discouraged).~~
  * **Correction**: some users are able to download all sequences from GISAID, while others cannot - this appears to be an IT issue and not a decision by GISAID.

---

# Why this model?

* Global inequities:
  * Low- and middle-income countries (LMIC) where some outbreaks are common and important samples can be collected.
  * Researchers who benefit most from open access to data tend to be located in high-income countries.
* The GISAID model encourages acknowledgement of originating labs (but is it enforced?).
* [Frustration in the research community](https://twitter.com/jxtx/status/1240710221997256706) at lack of open access.
  * Raw NGS data are available on NCBI SRA for only a small number of patient samples.

---

# Data access: costs and benefits

An incomplete table:

| Role | Costs | Benefits |
|------|-------|----------|
| Source | Potential loss of privacy | Personalized diagnosis, treatment? |
| Producer | Resources to generate data | Results from analysis |
|          | Loss of scientific priority |  |
| Distributor | Data storage |   |
|             | Network maintenance |   |
|             | Data curation |    |
| Consumers |  | Scientific curiosity |
|           |  | Development and validation of new methods |
|           |  | Publication |

---

# Data privacy and source attribution

* Source attribution is the reconstruction of the transmission of infectious disease from a specific individual, population or location.
  * *i.e.*, who infected whom.
* Identification of sources places the burden of responsibility for onward transmission of disease.

---

# Criminalization of HIV transmission

* Around the world, people continue to be prosecuted for HIV transmission.
  * In Canada, people found guilty of HIV transmission can be charged with aggravated sexual assault, with "maximum life imprisonment and mandatory lifetime registration as a sex offender" ([aidslaw.ca](http://www.aidslaw.ca/site/the-criminalization-of-hiv-non-disclosure-in-canada-report/?lang=en))
* Genetic sequence analysis, including phylogenetics, is used as forensic evidence in these cases.

---

# HIV forensics and bioinformatics

<img src="https://ars.els-cdn.com/content/image/1-s2.0-S1684118220300025-gr2_lrg.jpg"/>

<small>
Image credit: W-Y Li <i>et al.</i> (2020) <a href="https://doi.org/10.1016/j.jmii.2019.12.002">J Microbiol Immunol Infect, in press</a>.
</small>

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

<small>
Image credit: A Poon <i>et al.</i> (2016) <a href="https://doi.org/10.1016/S2352-3018(16)00046-1"/>Lancet HIV 3: e231</a>.
</small>

---

# Data usage: Costs and benefits

| Role | Costs | Benefits |
|------|-------|----------|
| Individual | Potential loss of privacy | No direct benefit |
|   | Elevated exposure to criminal prosecution? |  |
| Clinical lab | Resources to generate data | No direct benefit |
|              | Exposure to subpeonas, litigation |   |
| Scientist    |   | Development of methods |
|              |   | Publication |
| Public health | Learning curve | Cost-effective deployment of resources |
|               | Misinterpretation |  |
| Community | Stigmatization | Reduced HIV transmission? |

---

# Resource sharing

* Many bioinformatic programs and workflows (pipelines) are published under permissive free licenses.
* The [GNU General Public License](https://www.gnu.org/licenses/gpl-3.0.en.html):
  * grants permission to use, reverse-engineer, modify and distribute the software
  * must provide source code
  * derived work must adopt GPL ("viral" licensing)

---

# Restrictive licensing

* Many bioinformatic programs are distributed only as web applications (closed source).
* Limited processing capability for public use.
  * *e.g.*, some protein structural predictors can only be accessed through web forms
* Bioinformatic software distributed under a commercial license:
  * [Geneious](https://www.geneious.com/)
  * [CLC Workbench](https://digitalinsights.qiagen.com/products-overview/discovery-insights-portfolio/analysis-and-visualization/qiagen-clc-main-workbench/)

---

# Why use restrictive licensing?

* Scientific software development is often not a sustainable model.
  * Funding agencies rarely support software development.
  * Developers move on as they graduate, get other jobs.
* Bioinformatics is filled with [abandonware](https://en.wikipedia.org/wiki/Abandonware).
* Most open-source bioinformatics programs do not provide a graphical user interface, and limited technical support.

---

# Abandonware

<table>
  <tr>
    <td style="font-size: 20pt; vertical-align: middle">
      <ul>
        <li>Increasing number of research articles accompanied by source code.</li>
        <li>About one-third of repositories had no commits after publication.</li>
        <li>Over 70% of bioinformatic programs were never re-used post-publication&ast;.</li>
      </ul>
    </td>
    <td width="55%">
      <img src="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6209220/bin/pone.0205898.g001.jpg"/>
      <br/>
      <small>
      Image credit: PH Russell <i>et al.</i> (2018) <a href="https://dx.doi.org/10.1371%2Fjournal.pone.0205898"/>PLOS ONE 13: e0205898</a>.
      </small>
    </td>
  </tr>
</table>

<small>
&ast;G Duck <i>et al.</i> (2016) <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4917176/"/>PLOS ONE 11: e0157989</a>.
</small>

---

# Ethical implications

* Unmaintained software can have persistent and undetected bugs, producing inaccurate results.
* Requiring clinical labs to access software over the web can mean the transmission of sensitive patient data over unsecured networks.
* Commercial licensing can exacerbate a system of haves and have nots in research.
  * Growing adoption of subscription-based licensing (*e.g.*, Geneious).

---

# Further reading

* [Ethics in Science: Ethical Misconduct in Scientific Research](https://doi-org.proxy1.lib.uwo.ca/10.1201/9781315267968)
* ["Available upon request": not good enough for microbiome data!](https://doi.org/10.1186/s40168-017-0394-z)
* [A large-scale analysis of bioinformatics code on GitHub](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6209220/)
