# MBI 4750G
## BEAST

![](https://imgs.xkcd.com/comics/software_development.png)

---

# Review

* We model evolution with substitution models (continuous time Markov chains).
* This lets us calculate the likelihood of a tree relating aligned sequences.
* If sequences are sampled at different times, then we can directly estimate the rate of evolution (molecular clock).
* It can be more effective to sample trees from a posterior distribution than relying on a single estimate.

---

# BEAST

<img src="https://beast.community/images/beast-banner.png" width="600px"/>

* Primarily developed by Alexei Drummond and Andrew Rambaut in the <a href="https://en.wikipedia.org/wiki/Java_(programming_language)">Java programming language</a>.
* BEAST has become one of the most influential software packages in infectious disease research in the last decade.
* Over 14,000 citations, including over 40 Nature papers and over 20 Science papers since 2007.

---

#### BEAST
# BEAST 1 and BEAST 2

<table style="font-size: 18pt;">
<tr>
<td>
  <ul>
  <li>BEAST was forked into two separate projects (<a href="https://www.beast2.org/features/">comparison</a>)</li>
    <ul>
      <li>BEAST 1 (https://beast.community/) remains affiliated with the Rambaut lab at U. Edinburgh.</li>
      <li>BEAST 2 (https://www.beast2.org) is affiliated with the Drummond lab in U. Auckland</li>
    </ul>
  <li>BEAST 2 places more emphasis on modular development</li>
    <ul>
      <li>Customized models contributed by community.</li>
      <li>Introduced a package management system.</li>
    </ul>
  </ul>
</td>
<td style="vertical-align: middle;">
  <img src="https://static.wikia.nocookie.net/seuss/images/d/d3/Thing1-and-thing2.jpg"/>
</td>
</tr>
</table>


---

#### BEAST
# Basic workflow
1. Generate a multiple sequence alignment with another program such as MAFFT.
2. Generate an XML file from sequences and model settings with BEAUti.
3. Run the analysis with input XML in BEAST.
4. Post-processing BEAST logs with Tracer, FigTree, and others.

<img src="/img/beast-workflow.png" height=150px/>


---

#### BEAST
# Running BEAST

* [BEAGLE](https://github.com/beagle-dev/beagle-lib) is a C/C++ [library](https://en.wikipedia.org/wiki/Library_(computing)) &mdash; a collection of functions that can be called from other programs.
  * "Broad-platform Evolutionary Analysis General Likelihood Evaluator".
* Lets you run BEAST calculations on the [GPU](https://en.wikipedia.org/wiki/General-purpose_computing_on_graphics_processing_units).
  * Can make BEAST as much as 5 to 10 times faster.
* Required for BEAST 1, optional for BEAST 2.

---

#### BEAST
# BEAST runs on XML

* XML stands for [eXtensible Markup Language](https://en.wikipedia.org/wiki/XML)
* Like HTML, content is enclosed with tags marked by angle brackets
* Blocks include `<data>`, `<tree>`, `<distribution>` and `<run>`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beast version='2.0'
       namespace='beast.core:beast.evolution.tree.coalescent'>
    <!-- 17 taxa, 1485 sites, 138 patterns -->
    <data dataType="nucleotide" id="alignment">
        <sequence taxon="D4Brazi82">
            ATGCGATGCGTAGGAGTAGGAAACAGAGACTTTGTGGAAGGAGTCTCA
        </sequence>
```

---

### BEAUti
* It is not very convenient to manually write XML files.
* Most users run BEAUti (Bayesian Evolutionary Analysis Utility) to generate an XML from an alignment.

<img src="https://beast.community/tutorials/first_tutorial/images/image1.png" height="400px"/>

---

#### BEAUti
# Configuring models in BEAST

* Generate a starting tree
* Calculate the prior probability of the starting tree
* Calculate the tree likelihood given:
  * the sequence alignment (data)
  * the tree
  * a substitution model (with prior)
  * tip dates (data)
  * clock model (with prior)

---

#### BEAUti
# Starting tree

* Initializing a chain sample with a decent tree can speed up convergence.
* BEAUti enables the user to use:
  * a user-specified tree (Newick format)
  * an UPGMA or NJ tree
  * a random coalescent tree

<img src="https://www.beast2.org/images/BEAUTIViewStartinTree.png" height="200px"/>

---

#### BEAUti
# Tree priors

* A large number of different tree priors are implemented in BEAST:

|  |  | BEAST 1 | BEAST 2 |
|---|--|---------|---------|
| Coalescent | Constant size | &#10003; | &#10003; |
|  | Exponential | &#10003; | &#10003; |
|  | Logistic |  | &#10003; |
|  | Skyline |  &#10003; | &#10003; |
|  | Skygrid |  | &#10003; |
|  | SIR | &#10003; |  |
| Birth-death | Calibrated Yule | &#10003; | &#10003; |
|  | Serial sampling | &#10003; | &#10003; |
|  | Serial skyline | &#10003; |  |
|  | SIR | &#10003; |  |
| Source: https://www.beast2.org/features/ |  |  |  |

<blockquote style="padding: 0;">
<p style="font-size: 18pt; text-align: center;">
Why shouldn't we just use an uninformative uniform tree prior?
</o>
</blockquote>

<small><small>

<small><small>

---

#### BEAUti
# Substitution models

* For nucleotide data, BEAST2 supports JC69, HKY, TN93, and GTR
  * other models can be specified by editing XML
* rate variation with discrete gamma (+G) and invariant sites (+I)

<img src="/img/beauti-site.png" height="300px"/>

---

#### BEAUti
# Tip dates

* Sample collection dates are data!
* BEAUti enables you to input dates several ways, including:
  * manually (editing text fields)
  * automatically from sequence names using:
    * splitting on a delimiter (*e.g.*, underscores)
    * pattern matching (regular expressions)
    * importing from a headerless tab-delimited file

---

#### BEAUti
# Clock models

* A molecular clock model links sample collection dates (data) to our likelihood calculation.
* BEAST has a several clock models available, including:
  * Strict clock
  * Relaxed clocks
    * Uncorrelated (lognormal/exponential)
    * Random local (inherit parent branch rate, or draw from distribution)

---

#### BEAUti
# Operator analysis

* At the end of a BEAST run, it will print an operator analysis:

<pre class="code-wrapper" style="width: 100%; margin: 0;"><code class="hljs" style="font-size: 12pt;">Operator                                             Tuning   #accept  #reject    Pr(m)  Pr(acc|m)
ScaleOperator(StrictClockRateScaler.c:RSV2_1)        0.77915    16614    55345  0.03589    0.23088
UpDownOperator(strictClockUpDownOperator.c:RSV2_1)   0.78031      706    70870  0.03589    0.00986
  Try setting scaleFactor to about 0.883
</code></pre>

* An operator is an MCMC proposal that changes one or more model parameters.
  * `Tuning` is a weight that determines the probability that operator is used, `Pr(m)`.
  * `Pr(acc|m)` = `#accept` / (`#accept` + `#reject`).

---

#### BEAUti
# Tuning operators

* If the probability of accepting a proposal **Pr(acc|m)** is too low, the chain will fail to converge.
* If **Pr(acc|m)** is too high, the proposal is probably taking very small steps and the chain will fail to converge.
* We can adjust a faultly proposal with the BEAUti Operator panel:
![](/img/operators.png)

---

#### Tracer
# BEAST outputs

* BEAST generates several output files, including:
  * A `.log` file that is a tab-separated table of parameter values sampled in the chain.
  * A `.trees` file that records a chain sample of trees in the [NEXUS format](https://en.wikipedia.org/wiki/Nexus_file).
* The log file can be viewed in **Tracer**.
* The tree file can be viewed in **FigTree**, but it is usually processed first in **Tracer** or **TreeAnnotator**.

---

#### Tracer
# Checking BEAST outputs

* Visually inspecting chain samples over time (a trace plot) is an important quality control step!
  * A "fuzzy caterpillar" is consistent with convergence, but it is not proof!

<table>
<tr>
  <td>Good mixing</td><td>Bad mixing</td>
</tr>
<tr>
  <td><img src="https://taming-the-beast.org/tutorials/CoupledMCMC-Tutorial/figures/Tracer.png" height="250px"/></td>
  <td><img src="https://taming-the-beast.org/tutorials/Troubleshooting-convergence-issues/figures/tracer_run2.png" height="250px"/></td>
</tr>
</table>

<small><small>
Image sources: Taming the BEAST workshop, <a href="https://taming-the-beast.org/tutorials/Troubleshooting/">Troubleshooting</a> and <a href="https://taming-the-beast.org/tutorials/CoupledMCMC-Tutorial/">Coupled MCMC</a> tutorials.  
</small></small>

---


<section data-background="#333" style="color:white">

<h1 style="color:white">Key points</h1>

* BEAST is the leading software package for dated tree analyses and phylodynamics.
* The primary input for BEAST is an XML file that combines the data and model settings.
  * XML is difficult to write by hand, so most people use the BEAUti app.
* After running the XML with BEAST, the output log can be viewed in Tracer.


</section>