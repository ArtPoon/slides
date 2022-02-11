# MIMM4750G
## Compartmental models

![](https://imgs.xkcd.com/comics/outbreak.png)

---

# Review: Population dynamics

* The growth or decline of a population can be described as a function of time $t$.
* For example, exponential growth is described by:
$$N(t) = N(0)\exp(r t)$$
* This is a deterministic model - we predict that $N$ at time $t$ is *exactly* $N(0)\exp(r t)$.

---

# Differential equations

* The formula for exponential growth is the solution of a [differential equation]():
$$\frac{dN}{dt} = r N$$

* This equation represents a constant rate of growth $r$ per individual.

---

# Modeling epidemic growth

* For pathogens, the number of infected hosts ($I$) is not quite like population size.
* It is a [metapopulation](https://en.wikipedia.org/wiki/Metapopulation) &mdash; a population of interacting populations.
* Metapopulation dynamics are similar to a single population when:
  * the number of infected hosts is large;
  * population dynamics within a host are negligible;
  * hosts do not become co-infected (infected more than once from different sources)

<small><small>
Dearlove and Wilson (2013).  Coalescent inference for infectious disease: meta-analysis of hepatitis C.  <a href="https://royalsocietypublishing.org/doi/full/10.1098/rstb.2012.0314">Phil Trans Roy Soc B 368: 20120314</a>.
</small></small>

---

# Compartmental models

* A population is divided into compartments that each represent a different state
  * *e.g.*, I = infected, S = susceptible
  * Individuals move from one compartment to another over time to change states.
  * Individuals within a compartment are indistinguishable from one another.
* Compartmental models are often described by systems of differental equations.

---

# Mass action

* Let the total population size be $N=S+I$.
* Let the number of new infections per unit time is:
$$\beta N \times \frac{S}{N} \times I = \beta S I$$
  * $\beta N$ is the number of contacts an individual makes in a unit time (mass action incidence).
  * $S/N$ is the probability that they come into contact with a susceptible individual.
  * $I$ is the number of infected individuals.

---

# The SI model

* The number of susceptible individuals decays at rate:
$$\frac{dS}{dt} = -\beta S I$$

* The number of infected individuals increases at rate:
$$\frac{dI}{dt} = \beta S I$$

* Note the amount leaving compartment $S$ is equal to the amount entering compartment $I$!

---

# SI dynamics
* This model is known as the susceptible-infected (SI) model.
* $I$ increases at the fastest rate when $S=I$, *i.e.*, $I=N/2$.

![](/img/SI-animate.gif)

---

# The SIR model

* Instead of staying in an infected state forever, we add a third compartment $R$.
* $R$ stands for "removal", which can mean several things:
  * quarantine (isolation from the population)
  * recovery with full immunity from further infection
  * death from disease
* Infected individuals are removed at a rate $\gamma$.

---

# The Kermack-McKendrick model

<table>
<tr>
<td style="font-size: 24pt">
  $$\begin{align*}
  \frac{dS}{dt} & = -\beta S I\\\\
  \frac{dI}{dt} & = \beta S I - \gamma I\\\\
  \frac{dR}{dt} & = \gamma I\\\\
  \end{align*}$$
</td>
<td width="60%">
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/ac/SIR_trajectory.png"/>
</td>
</tr>
</table>

---

# The basic reproduction number

* $\frac{dS}{dt} = -\beta S I$ is always $<0$, except for edge case $S=0$.

---

# Compartmental models

* It's easier to visualize these models as flow chrarts:

<img src="/img/compartmental-models.png" width="600px"/>

* An unlimited number of combinations!

---

# Basic reproduction number

* "R naught" is the expected number of secondary cases from the index case (all other individuals are susceptible).
* If $R_0<1$, then we expect the infection to die out.  If $R_0>1$, then we expect it to spread.
* For the SIR model (with death rate $\gamma$),

  $$R_0 = \frac{\beta N}{\gamma}$$

* Increases with transmission rate ($\beta$), and declines with death rate $\gamma$.

---

# Fitting compartmental models to trees

* Either birth-death or coalescent models can be used to represent a compartmental model.
* Birth-death models were adapted to epidemics by linking rates to population sizes ([K&uuml;hnert *et al.* 2014](https://royalsocietypublishing.org/doi/full/10.1098/rsif.2013.1106)).
* Coalescent models were adapted by [Volz *et al.* 2009](https://www.genetics.org/content/183/4/1421.short).
* Both approaches are implemented in the same software!

---


# Suggested readings

* [Calculus Volume 1: OpenStax](https://opentextbc.ca/calculusv1openstax/chapter/exponential-growth-and-decay/)
* [Simple Compartmental Models for Disease Transmission](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7316089/)
* [Coalescent inference for infectious disease: meta-analysis of hepatitis C](https://royalsocietypublishing.org/doi/full/10.1098/rstb.2012.0314)