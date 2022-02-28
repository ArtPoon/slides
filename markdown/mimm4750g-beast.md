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

* Trees ([lecture 6](http://slides.filogeneti.ca/html/mimm4750g-06-likelihood.html#/)); substitution models ([lecture 5](http://slides.filogeneti.ca/html/mimm4750g-L05-models.html#/)); molecular clocks ([lecture 10](http://slides.filogeneti.ca/html/mimm4750g-L10-clocks.html#/)); Bayesian inference ([lectures 11](http://slides.filogeneti.ca/html/mimm4750g-L11-bayes.html#/) and [12](http://slides.filogeneti.ca/html/mimm4750g-L12-mcmc.html#/)); coalescent tree priors ([lectures 13](http://slides.filogeneti.ca/html/mimm4750g-L13-coalescent.html#/) and [14](http://slides.filogeneti.ca/html/mimm4750g-L14-demographic.html#/)).

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
* Sequences may be labelled with collection dates

![](/img/beast-workflow.png)


---

# Running BEAST

* [BEAGLE](https://github.com/beagle-dev/beagle-lib) is a C/C++ [library](https://en.wikipedia.org/wiki/Library_(computing)) &mdash; a collection of functions that can be called from other programs.
  * "Broad-platform Evolutionary Analysis General Likelihood Evaluator".
* Lets you run BEAST calculations on the [GPU](https://en.wikipedia.org/wiki/General-purpose_computing_on_graphics_processing_units).
  * Can make BEAST as much as 5 to 10 times faster.
* Required for BEAST 1, optional for BEAST 2.

---

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

# Tree priors

* A large number of different tree priors are implemented in BEAST.

|  |  | BEAST 1 | BEAST 2 |
|---|--|---------|---------|
| Coalescent | Constant size | &#10003; | &#10003; |
|  | Exponential | &#10003; | &#10003; |
|  | Logistic |  | &#10003; |
|  | Skyline |  &#10003; | &#10003; |
|  | Skygrid |  | &#10003; |
| Birth-death |

<small><small>
Source: https://www.beast2.org/features/
<small><small>

---



---

* Can use the coalescent or birth-death model as a prior over trees.
* Rearranges and rescales parts of the tree to perform a *random walk* over the posterior distribution of trees.
* At the same time, samples parameters of a model of evolution that is needed to reconstruct the tree from sequences.
* Outputs trace logs of posterior, likelihood, prior and model parameters &mdash; trees are written to a separate log.


---

# Generating XML

* Most users set up an analysis with the GUI program BEAUti (*Bayesian Evolutionary Analysis Utility*) rather than directly edit XML.

<img src="/img/beauti.png" width="600px"/>

---

# Running BEAST

* BEAST can take a very long time!
* Since we are trying to explore an enormous model space, we usually run chains of $10^8$ steps or more!
* BEAST tries to estimate how long it takes to perform 1 million steps.

```
# BEAST v1.10.5 Prerelease #23570d1
# Generated Sun Mar 03 13:42:57 EST 2019 [seed=1551638575176]
# benchmark2.xml
state	Posterior   	Prior       	Likelihood  	rootHeight  	clock.rate  	alpha
0	-568698.9433	-16.9645    	-568681.9788	0.20000     	1.00000     	0.50000     	-
10000	-215056.1166	59.1339     	-215115.2505	0.26252     	1.00000     	0.32615     	-
20000	-202604.8926	72.8223     	-202677.7148	0.23844     	1.00000     	0.30842     	0.11 hours/million states
30000	-196143.5414	72.3079     	-196215.8493	0.27209     	1.00000     	0.26344     	0.11 hours/million states
40000	-193720.6293	59.7853     	-193780.4145	0.39626     	1.00000     	0.26003     	0.11 hours/million states
50000	-193206.4970	56.6362     	-193263.1333	0.45645     	1.00000     	0.24143     	0.11 hours/million states
```

---
