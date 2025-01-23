# MIMM4750G
## Detecting selection
<img src="/img/xkcd-darwin.png" width="400px"/>

---

# Natural selection
<table>
  <tr>
    <td>
      <ul>
        <li>Variation in fitness that is associated with variation in the environment.</li>
        <li>Selection is responsible for the spread of drug resistance in pathogens.</li>
        <li>Our adaptive immune systems exert tremendous selection on pathogens.</li>
      </ul>
    </td>
    <td width="50%">
    <small>
    Emergence of pan-resistant HIV-1.  Patient clinical course and treatment.<br/><br/>
    </small>
      <img src="https://www.thelancet.com/cms/attachment/8b13392e-97c8-4d7f-b94a-f75d47417d97/gr1.jpg">
    </td>
  </tr>
</table>

<small><small>
Image credit: MC Puertas <i>et al.</i> (2020) Pan-resistant HIV-1 emergence in the era of integrase strand-transfer inhibitors: a case report.  <a href="https://www.thelancet.com/journals/lanmic/article/PIIS2666-5247%2820%2930006-9/fulltext">Lancet Microbe 1: E130</a>.
</small></small>

---

# Directional selection

* **Positive selection:** a specific genetic variant has a selective advantage and increases in frequency.

* **Negative (purifying) selection:** once the favored genetic variant has been "fixed" in the population, selection continues to remove all other variants.
* Most sites are under purifying selection ("*if it ain't broke..*")

---

# Diversifying selection

* **Diversifying selection:** different genetic variants are favored in different environments.
* Directional selection depletes genetic variation; diversifying selection promotes variation.
* *e.g.*, Transmission of an infection from one host environment to another (host-specific immune responses).

---

# How do detect selection?

<table>
<tr>
  <td>
    <ul>
    <li><b>Longitudinal data:</b> track the frequencies of an allele over time.</li>
    <li>Fit a simple logistic growth (S-shaped) model to the frequency trajectory.</li>
    <li>What if we don't know which allele is under selection?  What if we don't have longitudinal data?</li>
    <li><b>Cross-sectional (comparative) methods:</b> infer selection by comparing genetic sequences sampled at about the same time.</li>
    </ul>
  </td>
  <td width="45%" style="vertical-align:middle">
    <img src="/img/duotang-selection.png"/>
    <small><small>
    Estimates of selective advantage for SARS-CoV-2 variants in Canada
    Figure from the Canadian Coronavirus Variants Rapid Response Network <a href="https://covarr-net.github.io/duotang/duotang.html">Duotang notebook.</a>
    </small></small>
  </td>
</tr>
</table>

---

# Protein evolution

* Infer selection by comparting relative rates of evolution.
* Requires a baseline/point of reference, *e.g.,* "neutrally evolving" pseudogenes.
* A popular contrast is non-synonymous versus synonymous variation within protein-coding sequence.
  * [Non-synonymous](https://en.wikipedia.org/wiki/Nonsynonymous_substitution) = nucleotide substitution alters the amino acid encoded by the codon.
* Such approaches are generally called ["dN/dS" methods](https://en.wikipedia.org/wiki/Ka/Ks_ratio).

---

# dN/dS

* There are 9 possible nucleotide substitutions in a 3-nt codon.
  * We assume that [nonsense](https://en.wikipedia.org/wiki/Nonsense_mutation) substitutions to a stop codon don't persist.
* The [genetic code](https://en.wikipedia.org/wiki/Genetic_code) determines how many of these 9 nt changes would result in a non-synonymous change &mdash; this is the number of NS sites.
* dN is the ratio between the numbers of observed NS substitutions and of NS sites.
* dS is the same ratio for synonymous substitutions and sites.

---

# A simple example

* The codon `ACG` encodes threonine (T).  It has 3 synonymous sites and 6 nonsynymous sites (*e.g.*, `ATG` for methionine).
  * Suppose we count 8 non-synonymous and 4 synonymous substitutions in the tree.
  * We observed over twice as many non-synonymous substitutions!  Is this evidence of strong diversifying selection at this codon?
* The ratio dN/dS is $\frac{8}{6} / \frac{4}{3}$ = 1.  
* **Even though we observed more NS substitutions, this is neutral.**

---

<!--* Major histocompatibility complex (MHC) antigen recognition site , $dN > dS$ driven by host-pathogen arms race$^1$.-->
A majority of the first examples of genes under positive selection came from viruses and bacteria:
<img src="/img/EndoTable.png" width="80%"/>

<small><small>
Table from Endo, Ikeo and Gojobori. 1996, Mol Biol Evol 13: 685.
<!--$^1$ Hughes and Nei 1989, Genetics 86.-->
</small></small>

---

# The Goldman-Yang / Muse-Gaut models
* In 1994, very similar models were proposed in two ground-breaking papers (in the same journal, next to each other [in the same issue](https://academic.oup.com/mbe/issue/11/5)).
  * There are 61 sense codons: $61\times60/2=1830$ rates.
  * These models enable us to specify a codon model using as few as *two* parameters.
* The main parameter is called $\omega$ or $R$, depending who you ask.  
  * It is simply the ratio of non-syn. and syn. rates (dN/dS).

---

# Assumptions of GY94/MG94

1. There is never more than one nucleotide substitution within a codon at a time (*e.g.*, no simultaneous mutations).
2. The codon context has no effect on nucleotide substitution rates.
3. The dN/dS ratio does not care what amino acid is encoded by the codon, only whether the amino acid is *changed*.

---

# Maximum likelihood (ML)

* We can [use ML to reconstruct the tree](https://slides.filogeneti.ca/html/mimm4750g-L06-likelihood.html#/) best supported by the data.
  * We can also use ML to fit one of these codon models to the tree.
* It is *possible* to simultaneously estimate both the tree and the codon model, but...
  * It is simpler to "fix" our analysis to a single tree when fitting the model.
* Methods to simultaneously fit the tree and codon model have only recently been developed, *e.g.,* [CodonPhyML](https://sourceforge.net/projects/codonphyml/files/).

---

# Site-specific selection

* In the same year, Ziheng Yang described methods to allow dN/dS to change at different codon sites of a protein-coding gene.
  * This was a critical improvement because it is often not the *entire gene* that is under diversifying selection.
  * This allows us to pick out individual amino acids under strong selection, even if the rest of the gene is highly conserved.
* Implemented by Yang in 1997 into the software package [PAML](http://abacus.gene.ucl.ac.uk/software/paml.html) (Phylogenetic Analysis by Maximum Likelihood).

---

<table>
<tr>
  <td style="font-size: 20pt; vertical-align:middle;">
    <h1>dN/dS in influenza A virus</h1>
    <ul>
    <li>Influenza A virus (IAV) <a href="https://en.wikipedia.org/wiki/Hemagglutinin_(influenza)">hemagglutinin</a> (HA) is responsible for binding host cell receptor.</li>
    <ul><li>HA binds <a href="https://en.wikipedia.org/wiki/Sialic_acid">sialic acids</a> in upper respiratory tract &mdash; its name stems from clumping of blood cells.</li></ul>
    <li>Major target for antibody-mediated immune response.</li>
    <li>Specific amino acids in HA protein under strong selection.</li>
    </ul>
  </td>
  <td width="40%">
    <img src="/img/dnds-influenza.png" width="225px"/>
    <small>
    Figure from Meyer and Wilke (2015) PLOS Pathog 11: e1004940.
    </small>
  </td>
</tr>
</table>

---

<table>
<tr>
  <td style="font-size: 18pt; vertical-align:middle;">
    <h1>Example: MERS-CoV spike protein</h1>
    <ul>
    <li>Middle East respiratory syndrome coronavirus, first described in Saudi Arabia in 2012.</li>
    <li>Found at high prevalence in camels.</li>
    <li>~40% mortality, limited human-to-human transmission.</li>
    <li>Codons in spike protein under strong positive selection (magenta), close to residues involved in binding (green) the receptor DPP4.</li>
    </ul>
  </td>
  <td width="40%">
    <img src="/img/mbo001141746sf01.png"/>
    <small><small>
    Image credit: M Cotten <i>et al.</i> (2014) <a href="https://doi.org/10.1128/mBio.01062-13">Spread, Circulation, and Evolution of the Middle East Respiratory Syndrome Coronavirus</a>. mBio 5(1).
    </small></small>
  </td>
</tr>
</table>

---

# Site-specific selection (2)

* Yang allows dN/dS ($\omega$) to vary among sites by assuming that these values followed a [gamma distribution](https://en.wikipedia.org/wiki/Gamma_distribution).
  * Recall the gamma distribution is a *continuous* probability density function for values greater than zero, ideal for rates.
  * To make easier to compute, Yang split the gamma distribution up into 5 rate categories of equal area (probability).
* This approach (random effects likelihood, REL) is still used for many models, and gamma is represented by a `G` or the symbol $\Gamma$.
* There are other methods to handle variation in dN/dS among sites, but they are all about the same if you have enough data!

---

# Episodic selection

* The previous models assume that differences in dN/dS are constant over time.
* What if selection at a specific site is driven by a change in the environment?
* Yang (again) and Nielsen (2002) proposed the branch-site method that assigns branches of the tree into two categories.
* Difficult to work more complex models because of over-fitting!


---

<img src="/img/bsrel.png" width="750px"/>

Patterns of adaptation to coronaviruses in aminopeptidase N receptor. (left) Tree of 84 mammalian species, highlighting branches with episodic selection. (right) Structural model of AMPEP.

<small><small>
Image credit: D Enard <i>et al.</i> (2016) eLife 10.7554/eLife.12469
</small></small>

---

<section data-background="#333" style="color:white">

<h1 style="color:white">Key points</h1>

* Most genes are under purifying selection, removing any mutations away from the adapted genotype.
* Diversifying selection means sustained change because of varying environments.
* We can detect selection acting on protein-coding genes by comparing non-synonymous and synonymous substitution rates.
* Detecting site-specific selection requires a model of variation in rates.

</section>