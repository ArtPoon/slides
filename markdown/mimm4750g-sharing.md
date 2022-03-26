# MIMM4750G
## Sharing resources

![](https://imgs.xkcd.com/comics/dependency.png)

---

# Writing code

* There is a wide spectrum of bioinformaticists.  
  * Some people are "expert users" who only occasionally write their own programs.
  * Some people are developers, spending most of their time writing programs.
* Sharing your code is an important part of being a bioinformatician:
  * Reproducibility - others should be able to replicate what you've done
  * Community - help others work with their own data

---

# Permissive licensing

* Many bioinformatic programs and workflows (pipelines) are published under permissive free licenses.
* The [GNU General Public License](https://www.gnu.org/licenses/gpl-3.0.en.html):
  * grants permission to use, reverse-engineer, modify and distribute the software
  * commercial use is okay!
  * must provide source code
  * derived work must adopt GPL ("viral" licensing)

---

# Code repositories

<table>
  <tr>
    <td style="font-size: 20pt; vertical-align: middle">
      <ul>
        <li>An online repository is a website for sharing source code.</li>
        <li>Often integrated with a <a href="https://en.wikipedia.org/wiki/Version_control">version control</a> system.</li>
        <li><a href="https://about.gitlab.com/">GitLab</a> become a popular alternative to <a href="https://github.com/">GitHub</a> when the latter was acquired by MicroSoft.</li>
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
  * Funding agencies generally do not support software development.
  * Developers move on as they graduate, get other jobs.
* Bioinformatics is filled with [abandonware](https://en.wikipedia.org/wiki/Abandonware).
* Most open-source bioinformatics programs do not provide a graphical user interface, and limited technical support.

---

# Abandonware

<table>
  <tr>
    <td style="font-size: 20pt; vertical-align: middle">
      <ul>
        <li><a href="https://en.wikipedia.org/wiki/Abandonware">Abandonware</a> is software that is no longer being maintained.</li>
        <li>In a recent analysis (right), about one-third of repositories had no commits after publication.</li>
        <li>Over 70% of bioinformatic programs were never re-used post-publication&ast;.</li>
      </ul>
    </td>
    <td width="55%">
      <img src="/img/pone.0205898.g007.png"/>
      <br/>
      <small>
      Image credit: PH Russell <i>et al.</i> (2018) <a href="https://dx.doi.org/10.1371%2Fjournal.pone.0205898"/>PLOS ONE 13: e0205898</a>.
      </small>
    </td>
  </tr>
</table>

<small><small>
&ast;G Duck <i>et al.</i> (2016) <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4917176/"/>PLOS ONE 11: e0157989</a>.
</small></small>

---

# Bug hunting

* Unmaintained software can have persistent and undetected bugs, producing inaccurate results.
  * On the other hand, opening the source allows others to identify errors and provide fixes.
* FastTree is a popular open-source program for fast, approximate reconstruction of trees by ML.
  * A user realized that the minimum branch length is fixed to about 0.005, which can make a tree look more resolved than it really is, [and provided a code fix](http://darlinglab.org/blog/2015/03/23/not-so-fast-fasttree.html).

---

<table>
  <tr>
    <td>Before</td><td>After</td>
  </tr>
  <tr>
    <td><img src="http://darlinglab.org/assets/data/anonymous-2.1.7.png" height="500px"/></td>
    <td><img src="http://darlinglab.org/assets/data/anonymous_2.1.7_precise.png" height="500px"/></td>
  </tr>
</table>

<small><small>
Source:
</small></small>

---

# Community coding

<img src="https://github.com/cov-lineages/pangolin/blob/master/docs/logo.png?raw=true" height="150px"/>

* [Pangolin](https://github.com/cov-lineages/pangolin) is an open-source program for classifying SARS-CoV-2 genomes into different "lineages"
* The repository has been forked by 85 users, many of whom have contributed additional features
  * Automated updates of lineage definitions ([#124](https://github.com/cov-lineages/pangolin/pull/124))
  * Faster, memory efficient execution ([#91](https://github.com/cov-lineages/pangolin/pull/91))

---

# Open-source and clinical bioinformatics

* Bioinformatic pipelines are increasingly used to process sequence data in clinical labs.
  * These labs are *required* to track what versions of the programs were used to process patient data.
* Using web-based applications makes it impossible to track versions.
  * It can also mean transmitting sensitive patient data over unsecured networks.

---

# Closed-source and troubleshooting

* Closed-source makes it difficult to diagnose problems.
* Predicting HIV-1 coreceptor usage is required for prescribing a certain class of HIV-1 drug treatments (coreceptor antagonists).
  * [geno2pheno](https://academic.oup.com/nar/article/31/13/3850/2904197) is a web service for predicting viral phenotypes for HIV-1 and HCV sequences.
  * The classifier for HIV-1 coreceptor usage was trained on a proprietary dataset generated by a pharmaceutical company.
  * Users cannot see the classifier rules (unpublished).

---

# Closed-source and troubleshooting (2)

* UK COVID-19 response was informed in part by a simulation program (CovidSim) written in 2005 for H5N1.
  * Projected over 2 million US deaths without intervention.
* Source code was not released.
  * After widespread criticism, analysis found the code "a buggy mess" but reproducible ([Chawla 2020](https://www.nature.com/articles/d41586-020-01685-y)).
* Now a highly active GitHub repository.

---

# Global inequities in bioinformatics

<table>
  <tr>
    <td>
      <ul>
        <li>Commercial licensing can exacerbate a system of haves and have-nots in research.</li>
        <li>Growing adoption of subscription-based licensing (<i>e.g.</i>, Geneious).</li>
        <li>Open-source plays an important role in developing training and research programs in resource-limited settings*</li>
      </ul>
    </td>
    <td width="50%">
      <img src="/img/btaa132f2.jpeg" width="350px" height="350px"/>
      <small>
      (top) Number of bioinformatics publications per country.
      (bottom) Per-capita.
      </small>
    </td>
  </tr>
</table>

<small><small>
<sup>*</sup>Karikari (2015). [Bioinformatics in Africa: The Rise of Ghana?](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1004308)). PLOS Computational Biology 11: e1004308.<br/>
Image source: Chasapi <i>et al.</i> (2020) The bioinformatics wealth of nations. <a href="https://academic.oup.com/bioinformatics/article/36/9/2963/5780280">Bioinformatics 36: 2963</a>.
</small></small>

---

# Dayhoff and *The Atlas*

* Dayhoff and Eck develop new computational methods to compile and analyze a protein sequence database.
  * Dayhoff petitioned researchers to donate protein sequence data in exchange for a copy of *The Atlas*, which is copyrighted material.
* Unable to obtain sufficient grant support, Dayhoff adopts a commercial model to maintain the database.
  * *The Atlas* is succeeded by Genbank, which operates under an open access model.

---

# Further reading

* [A large-scale analysis of bioinformatics code on GitHub](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6209220/)
* [Critiqued coronavirus simulation gets thumbs up from code-checking efforts](https://www.nature.com/articles/d41586-020-01685-y)
* [The bioinformatics wealth of nations](https://academic.oup.com/bioinformatics/article/36/9/2963/5780280)
* [Bioinformatics in Africa: The Rise of Ghana?](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1004308)