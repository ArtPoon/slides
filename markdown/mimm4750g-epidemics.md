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
  * Individuals within a compartment are indistinguishable from one another ([mass action](https://en.wikipedia.org/wiki/Law_of_mass_action)).
* Compartmental models are often described by systems of differental equations.

---

# The SI model

* Let the total population size be $N=S+I$.
* Let the number of new infections per unit time is:
$$\beta N \times \frac{S}{N} \times I = \beta S I$$
  * $\beta N$ is the number of contacts (potential transmissions) an individual makes in a unit time.
  * $S/N$ is the probability that they come into contact with a susceptible individual, leading to transmission.
  * $I$ is the number of infected individuals.

---

# The SI model (2)

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

* Let's rewrite the second equation as:
$$\frac{dI}{dt} = (\beta S-\gamma)I$$

* This implies that the number of infections increases ($dI/dt>0$) when:
$$
\begin{aligned}
\beta S I - \gamma I &> 0\\\\
\beta S I &> \gamma I\\\\
\frac{\beta S}{\gamma} &> 1
\end{aligned}
$$

---

# The basic reproduction number

* Suppose an epidemic starts from a single infection (index case, $I_0=1$):
$$R_0 = \frac{\beta S_0}{\gamma} = \frac{\beta (N-1)}{\gamma} \approx \frac{\beta N}{\gamma}$$
  * $\beta N$ is the number of contacts per individual per unit time.
  * $1/\gamma$ is the mean duration from infection to removal.
* $R_0$ is the expected number of secondary infections from the index case.

---

# $R_0$ is context dependent

* Note that $R_0$ is proportional to the population size ($N$ or $S_0$).
  * It is not an immutable quantity of the pathogen.
  * The number of contacts depends on cultural practices, population density.

<img height="250px" src="https://ars.els-cdn.com/content/image/1-s2.0-S1473309917303079-gr4.jpg"/>

<small><small>
Image source: FM Guerra <i>et al.</i> (2017) The basic reproduction number (R0) of measles: a systematic review.  <a href="https://www.sciencedirect.com/science/article/pii/S1473309917303079">Lancet Inf Dis 17: e420</a>
</small></small>

---

# Effective reproduction number

* The number of contacts with susceptible individuals varies over time.
* $R_t$ or $R_e$ is the expected number of infections from an infected individual at time $t$.
* If $\beta$ and $\gamma$ do not vary over time, then:
$$R(t) = \frac{\beta S(t)}{\gamma} = \frac{S(t)}{S(0)} R_0$$

<small><small>
Source: Nishiura and Chowell (2009) The effective reproduction number as a prelude to statistical estimation of time-dependent epidemic trends.  In: <a href="https://link.springer.com/chapter/10.1007/978-90-481-2313-1_5">Mathematical and Statistical Estimation Approaches in Epidemiology</a>, pp. 103-121.
</small></small>

---

# The SIS model

* Instead of being removed from the population, infected individuals return to a susceptible state with no immunity.
$$
\frac{dS}{dt} = -\beta S I + \gamma I
\hspace{2em}
\frac{dI}{dt} = \beta S I - \gamma I
$$
* $dI/dt$ can be written as a logistic function:
$$
\frac{dI}{dt} = (\beta N + \gamma) I \left(1 - \frac{I}{N-(\gamma/\beta)}\right)
$$
* with an equilibrium ($dI/dt=0$) at $I = N-\gamma/\beta$

---

# The SEIR model

* A person can be infected but not infectious, *i.e.*, will not transmit their infection on to others.
  * The time between infection and becoming infectious is the *latent period* (*e.g.*, for SARS-CoV-2 this is about 3 to 5 days).
* We can add an "exposed" compartment to represent individuals in this state:
$$\begin{align*}
\frac{dS}{dt} = -\beta S I &\hspace{3em}  \frac{dE}{dt} = \beta S I - \kappa E\\\\[12pt]
\frac{dI}{dt} = \kappa E - \gamma I & \hspace{3em} \frac{dR}{dt} = \gamma I
\end{align*}$$

---

# Flow charts

* It's easier to visualize these models as flow chrarts:

<img src="/img/compartmental-models.png" width="600px"/>

* An unlimited number of combinations!

---

# Example
A flow chart of a compartmental model for SARS-CoV-2 infection dynamics

![](https://els-jbs-prod-cdn.jbs.elsevierhealth.com/cms/attachment/41419416-551e-41f2-8960-df67c0c9e13d/gr1_lrg.jpg)

<small><small>
Image source: Z Du <i>et al. (2021) </i>Comparative cost-effectiveness of SARS-CoV-2 testing strategies in the USA: a modelling study. <a href="https://doi.org/10.1016/S2468-2667(21)00002-5">Lancet Public Health 6: E184</a>.
</small></small>

---

# Limitations of compartmental models

* Ignores social structure (homogeneous mixing).
  * Every individual is equally likely to contact every other individual in the population.
* Rates are constant over time.
  * Population-wide mitigation such as a lockdown would cause rates to change.
* A closed population without immigration or emigration.

---

# Suggested readings

* [Calculus Volume 1: OpenStax](https://opentextbc.ca/calculusv1openstax/chapter/exponential-growth-and-decay/)
* [Simple Compartmental Models for Disease Transmission](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7316089/)
* [JAMA Guide to Statistics and Methods: Modeling Epidemics With Compartmental Models](https://jamanetwork.com/journals/jama/fullarticle/2766672)
* [Complexity of the Basic Reproduction Number (R0)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6302597/)
* [Coalescent inference for infectious disease: meta-analysis of hepatitis C](https://royalsocietypublishing.org/doi/full/10.1098/rstb.2012.0314)