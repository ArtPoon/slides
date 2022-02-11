# MBI 4750G
## BEAST

![](https://imgs.xkcd.com/comics/bayes_theorem_2x.png)

---

# Bringing it all together

* Trees ([lecture 9](http://slides.filogeneti.ca/html/mimm4750g-L9.html#/)); substitution models ([lecture 10](http://slides.filogeneti.ca/html/mimm4750g-L10.html#/)); molecular clocks ([lecture 12](http://slides.filogeneti.ca/html/mimm4750g-L12.html#/)); Bayesian inference ([lecture 13](http://slides.filogeneti.ca/html/mimm4750g-L13.html#/))

![](/img/duPlessis.png)

<small>Image credit: Louis duPlessis, [Taming the BEAST lectures](https://github.com/Taming-the-BEAST/Taming-the-BEAST-2019-Eh-Lectures)</small>

---

# BEAST

<img src="https://beast.community/images/beast-banner.png" width="600px"/>

* Primarily developed by Alexei Drummond and Andrew Rambaut in the <a href="https://en.wikipedia.org/wiki/Java_(programming_language)">Java programming language</a>.
* BEAST has become one of the most influential software packages in infectious disease research in the last decade.
* Over 10,000 citations, including over 40 Nature papers and over 20 Science papers since 2007.

---

# BEAST

* Can use the coalescent or birth-death model as a prior over trees.
* Rearranges and rescales parts of the tree to perform a *random walk* over the posterior distribution of trees.
* At the same time, samples parameters of a model of evolution that is needed to reconstruct the tree from sequences.
* Outputs trace logs of posterior, likelihood, prior and model parameters &mdash; trees are written to a separate log.

---

# XML

* A BEAST analysis is set up in an XML file
* eXtensible Markup Language

```xml
<?xml version="1.0"?>
<beast>
	<alignment>
		<sequence dataType="nucleotide">
			<taxon id="Brazi82"/>
			ATGATCGTAGTATCGTAGCTCGGTTTTTACGATCGGAC
		</sequence>
		<sequence dataType="nucleotide">
			<taxon id="ElSal83"/>
			ATGATCGTAGTATCGTAGCTCGGTTTTTACGATCGGAC
		</sequence>
	</alignment>
</beast>
```

---

# Generating XML

* Most users set up an analysis with the GUI program BEAUti (*Bayesian Evolutionary Analysis Utility*) rather than directly edit XML.

<img src="/img/beauti.png" width="600px"/>

---

# Running BEAST

* BEAST now requires [BEAGLE](https://github.com/beagle-dev/beagle-lib) to run.
* "Broad-platform Evolutionary Analysis General Likelihood Evaluator".
* BEAGLE is a [library](https://en.wikipedia.org/wiki/Library_(computing)) &mdash; a collection of functions that can be called from other programs.
* Using BEAGLE can make BEAST about 5-10 times faster!
* (It used to be possible to run BEAST *without* BEAGLE...)

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
