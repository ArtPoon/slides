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

# Bringing it all together

* Likelihood and trees ([lecture 7](https://slides.filogeneti.ca/html/mbi4750-L07-likelihood.html#/)); substitution models ([lecture 6](https://slides.filogeneti.ca/html/mbi4750-L06-models.html#/)); molecular clocks ([lecture 10](https://slides.filogeneti.ca/html/mbi4750-L10-clocks.html#/)); Bayesian inference ([lectures 12](https://slides.filogeneti.ca/html/mbi4750-L12-bayes.html#/) and [13](http://slides.filogeneti.ca/html/mbi4750-L13-mcmc.html#/)); coalescent tree priors ([lectures 15](http://slides.filogeneti.ca/html/mbi4750-L15-coalescent.html#/) and [16](http://slides.filogeneti.ca/html/mbi4750-L16-demographic.html#/)).

![](/img/duPlessis.png)

<small>Image credit: Louis duPlessis, [Taming the BEAST lectures](https://github.com/Taming-the-BEAST/Taming-the-BEAST-2019-Eh-Lectures)</small>

---

# BEAST

<img src="https://beast.community/images/beast-banner.png" width="600px"/>

* Primarily developed by Alexei Drummond and Andrew Rambaut in the <a href="https://en.wikipedia.org/wiki/Java_(programming_language)">Java programming language</a>.
* BEAST has become one of the most influential software packages in infectious disease research in the last decade.
* Over 10,000 citations, including over 40 Nature papers and over 20 Science papers since 2007.

---

# BEAST 1 and BEAST 2

<img src="https://static.wikia.nocookie.net/seuss/images/d/d3/Thing1-and-thing2.jpg" height="120px"/>

* BEAST was forked into two separate projects ([comparison](https://www.beast2.org/features/))
  * BEAST 1 (https://beast.community/) remains affiliated with the Rambaut lab at U. Edinburgh.
  * BEAST 2 (https://www.beast2.org) is affiliated with the Drummond lab in U. Auckland
* BEAST 2 places more emphasis on modular development
  * Customized models contributed by community.
  * Introduced a package management system.

---

# Basic workflow

* Generate a multiple sequence alignment with another program such as MAFFT.
  * Sequences may be labelled with collection dates.
* Generate an XML file from sequences and model settings with BEAUti.
* Run the analysis with input XML in BEAST.
* Post-processing BEAST logs with Tracer, FigTree, and others.

![](/img/beast-workflow.png)


---

# Running BEAST

* [BEAGLE](https://github.com/beagle-dev/beagle-lib) is a C/C++ [library](https://en.wikipedia.org/wiki/Library_(computing)) &mdash; a collection of functions that can be called from other programs.
  * "Broad-platform Evolutionary Analysis General Likelihood Evaluator".
* Lets you run BEAST calculations on the [GPU](https://en.wikipedia.org/wiki/General-purpose_computing_on_graphics_processing_units).
  * Can make BEAST as much as 5 to 10 times faster.
* Required for BEAST 1, optional for BEAST 2.

---

Testing whether BEAGLE does indeed make the analysis faster, even on a single CPU.

```
Failed to load BEAGLE library: no hmsbeagle-jni in java.library.path:
Total calculation time: 22.351 seconds
End likelihood: -1977.496625044903
```

```
Using BEAGLE version: 3.1.2 resource 0: CPU
Total calculation time: 14.925 seconds
End likelihood: -1978.2260570343312
```

---

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


# BEAUti

* It is not very convenient to manually write XML files.
* Most users run BEAUti (Bayesian Evolutionary Analysis Utility) to generate an XML from an alignment.

<img src="https://beast.community/tutorials/first_tutorial/images/image1.png" height="400px"/>

---

# BEAST workflow

* Generate a starting tree
* Calculate the prior probability of the starting tree
* Calculate the tree likelihood given:
  * the sequence alignment (data)
  * the tree
  * a substitution model (with prior)
  * tip dates (data)
  * clock model (with prior)

---

# Starting tree

* Initializing a chain sample with a decent tree can speed up convergence.
* BEAUti enables the user to use:
  * a user-specified tree (Newick format)
  * an UPGMA or NJ tree
  * a random coalescent tree

<img src="https://www.beast2.org/images/BEAUTIViewStartinTree.png" height="250px"/>

---

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

<small><small>
Source: https://www.beast2.org/features/
<small><small>

---

# Substitution models

* For nucleotide data, BEAST2 supports JC69, HKY, TN93, and GTR
  * other models can be specified by editing XML
* rate variation with discrete gamma (+G) and invariant sites (+I)

<img src="/img/beauti-site.png" height="300px"/>

---

# Tip dates

* Sample collection dates are data!
* BEAUti enables you to input dates several ways, including:
  * manually (editing text fields)
  * automatically from sequence names using:
    * splitting on a delimiter (*e.g.*, underscores)
    * pattern matching (regular expressions)
    * importing from a headerless tab-delimited file

---

# Regular expressions

* A regular expression (regex) is a string that represents one or more other strings.
  * Similar to UNIX wildcards (where `*` can represent one or more of any character)
* `.` represents any one character; `.+` represents one or more of anything.
* `([0-9]+)` captures any sequence of digits as a group.
* This has always been a buggy feature.

---

# Clock models

* A molecular clock model links sample collection dates (data) to our likelihood calculation.
* BEAST has a several clock models available, including:
  * Strict clock
  * Relaxed clocks
    * Uncorrelated (lognormal/exponential)
    * Random local (inherit parent branch rate, or draw from distribution)

---

# Operator analysis

* At the end of a BEAST run, it will print an operator analysis:

```
Operator                                                     Tuning    #accept    #reject      Pr(m)  Pr(acc|m)
ScaleOperator(StrictClockRateScaler.c:RSV2_1)               0.77915      16614      55345    0.03589    0.23088
UpDownOperator(strictClockUpDownOperator.c:RSV2_1)          0.78031        706      70870    0.03589    0.00986 Try setting scaleFactor to about 0.883
```

* An operator is an MCMC proposal that changes one or more model parameters.
* `Tuning` is a weight that determines how often that operator is used.

---

# Tuning operators

* If the probability of accepting a proposal is too low, the chain will fail to converge.
* If the acceptance probability is too high, the proposal is probably taking very small steps and the chain will fail to converge.
* We can adjust a faultly proposal with the BEAUti Operator panel:
![](/img/operators.png)

---

# Fuzzy caterpillars

* Visually inspecting a trace is a legitimate quality control step!

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

# Suggested readings

* BEAST has a large user community with many resources online!
* You can find a large list of online tutorials [here](https://www.beast2.org/tutorials/)
* [Taming the BEAST](https://taming-the-beast.org/) workshops and tutorials
