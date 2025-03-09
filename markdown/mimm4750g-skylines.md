# MIMM4750G
## Demographic models
<img src="https://imgs.xkcd.com/comics/minifigs.png"/>

---

# Review: the coalescent

* In last lecture, we learned about how phylogenetic trees are shaped by population size.
* The rate that lineages "coalesce" to common ancestors is inversely proportional to $N_e$.
  * Effective population size ($N_e$) recognizes that our model is an approximation.
* We've been assuming that $N_e$ is constant over time!

---

# Assumptions of baseline coalescent model

* ~~Constant population size~~
* A single well-mixed population:
  * For diploid sexual organisms, this means random mating.
  * For infectious diseases, this means an infected individual is equally likely to come into contact with any susceptible uninfected individual.
* No selection - every individual is equally likely to leave offspring in the next generation.

---

# Population dynamics

* There are basically two ways of handling population dynamics with the coalescent model:
* (1) Parametric models
  * Let $N_e(t)$ be a deterministic function of time $t$
  * Coalescent time is backwards, but I will describe growth forward in time because it's more intuitive.
* (2) Non-parametric models
  * Let the data tell us how $N_e$ is changing

---

#### Parametric models
# Exponential growth and decay

* Every individual produces offspring at a rate $r$.
$$\frac{dN_e(t)}{dt} = r N_e(t)$$
$$N_e(t) = N_e(0)\exp(r t) $$
* If $r<0$, then $N_e$ decreases over time.
* $N_e(0)$ is initial population size at time $t=0$.

---

#### Parametric models
# Logistic growth

* Every individual produces offspring at rate $r$ that decelerates with increasing $N_e$ to a carrying capacity, $N(t)\xrightarrow{t\rightarrow \infty} K$:
$$\frac{dN}{dt} = r N(t) \left(1 - \frac{N(t)}{K}\right) \hspace{2em} N(t) = \frac{K N(0) \exp(r t)}{K + N(0)(\exp(rt)-1)}$$

<img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Malthusian_growth_vs_logistic_growth.png" width="350px"/>

<small><small>
Image source: Wikimedia Commons, <a href="https://commons.wikimedia.org/wiki/File:Malthusian_growth_vs_logistic_growth.png">Malthusian growth vs logistic growth</a>
</small></small>


---

#### Parametric models
# Averaging the coalescent rate

* Recall the waiting time ($\tau_k$) to the next coalescence among $k$ lineages is exponentially distributed for constant $N_e$:
$$f(\tau_k)=\lambda_k \exp(-\lambda_k \tau_k),\\; \lambda_k = \frac{{k\choose 2}}{N}$$

* The general solution for this probability for varying $N(t)$ is:

$$f(\tau_k) = \Lambda_k(\tau_k) \exp\left( -\int_0^{\tau_k} \Lambda_k(s) ds  \right) \textrm{ where } \Lambda_k(t) = \frac{k\choose 2}{N_e(t)}$$

---

#### Parametric models
# Population dynamics and tree shapes

<ul style="font-size: 18pt;">
<li>A constant size population (left) will tend to have longer branches towards the root.</li>
<li>An exponentially growing population (right) should have a "star-like" tree with shorter branches closer to the root.</li>
</ul>

<img src="/img/coalescent.png" width="450px"/>

---

# Lineages through time

<table>
<tr>
<td>
  <ul>
  <li>A lineages-through-time (LTT) plot displays the increasing number of lineages (branches) in a tree over time.</li>
  </ul>
  <img src="/img/nee-inferring.jpg" height="300px"/>
</td>
<td width="50%">
<ul>
<li>Upper series represents expected LTT for exponentially growing $N_e$.</li>
<li>Lower series represents expected LTT under constant $N_e$.</li>
</ul>
<img src="/img/nee-figure2.jpg" height="300px"/>
</td>
</tr>
</table>

<small><small>
Image source: Nee <i>et al.</i> (1995) Inferring population history from molecular sequences. <a href="https://doi.org/10.1098/rstb.1995.0087">Phil Trans Roy Soc Lond B 349: 25-31</a>.
</small></small>

---

# Non-parametric models

* What if the population dynamics don't follow any simple model?
* Let's assume that population dynamics can be approximated with a series of simple functions.
  * Piecewise constant: $N_e$ takes one of a small number of values over a given time interval.
  * Piecewise linear:  $N_e$ changes linearly over a given time interval.

<table>
<tr>
<td><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Piecewise_constant.svg/600px-Piecewise_constant.svg.png" height="200px"/></td>
<td><img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Piecewise_linear_function.svg" height="200px"/></td>
</tr>
</table>

---

# The skyline model

* The rate of coalescence changes as we switch from one population size to another over time.
  * The piecewise linear model is called a "skyline" because it resembles a city skyline.

<table><tr>
<td><img src="/img/skyline.png" width="300px"/></td>
<td><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Wienerberg_City_Skyline.jpg/640px-Wienerberg_City_Skyline.jpg" width="400px"/></td>
</tr>
</table>

<small><small>
Image source: Wikimedia Commons, <a href="https://commons.wikimedia.org/wiki/File:Wienerberg_City_Skyline.jpg">Wienerberg City Skyline</a>.
</small></small>

---

<table style="font-size: 16pt;">
<tr>
  <td>
  <h1>"Classic" skyline</h1>
  <ul>
    <li>Calculate internode distances from internal node heights, $g_i = t_i-t_{i-1}$</li>
    <img src="/img/rcoal1.svg" width=350/>
    <li>Assume $g_i\sim \exp(\lambda_i)$, where $\lambda_i=\frac{1}{N_i}$</li>
    <li>
    Each rescaled distance is an estimator of population size:
    $$E[g_i] = \frac{N_i}{{i\choose 2}} \implies \hat{N_i} = g_i {i\choose 2}$$
    </li>
  <ul>
  </td>
<td style="vertical-align: middle;" width="40%">
  <img src="/img/classic-skyline.svg"/>
  <small>
  Classic skyline for a tree simulated under constant $N\mu=1$.
  Branch lengths are measured in expected substitutions ($\mu t$) instead of chronological time $t$.
  </small>
</td>
</tr>
</table>

---

# Example: Application to HIV-1

* Analysis implies subtype B expanded more recently than subtype A &mdash; this is now well established.
* Must know substitution rate $\mu$ to map dynamics to time (for HIV-1, $\mu = 0.003$/site/year).


<img src="/img/pybus-hiv.png" height="250px"/>

<small><small>
Image source: Pybus <i>et al.</i> (2000). An integrated framework for the inference of viral population history from reconstructed genealogies.  <a href="https://academic.oup.com/genetics/article/155/3/1429/6050940">Genetics 155: 1429-1437</a>.
</small></small>

---

# Generalized skylines

* The classic skyline plot is noisy because of random variation, esp. for short time intervals.
  * The generalized skyline pools intervals together to give more robust estimates.
* Consider a composite time interval starting with $n$ lineages, and spanning $k$ coalescent events &mdash; the estimated population size is:
$$N_{n,k} = \frac{n(n-k)}{2k} \sum_{j=n}^{n-k+1} g_j $$
  * If $k=1$ then we recover $N_n = g_n {n\choose 2}$

---

<table>
<tr>
  <td style="font-size:22pt;">
    <h1>How do we pool the intervals?</h1>
    <ul>
      <li>Let $\epsilon$ be the minimum interval length.</li>
      <li>If $g_i$ is less than some threshold $\epsilon>0$, then we merge it with the next intervals until the total length exceeds $\epsilon$.</li>
      <ul>
      <li>If $\epsilon$ is too big, then we will average out the population dynamics.</li>
      <li>If $\epsilon$ is too small, then we are back where we started.</li>
      </ul>
    </ul>
  </td>
  <td width="40%">
    <img src="/img/generalized-skyline.png" width="300px"/>
    <small>
    Image source: Strimmer and Pybus (2001).  <a href="https://doi.org/10.1093/oxfordjournals.molbev.a003776">Mol Biol Evol 18: 2298-2305</a>.
    </small>
  </td>
</tr>
</table>

---

<table>
<tr>
  <td style="font-size:22pt;">
    <h1>Bayesian skylines</h1>
    <ul>
      <li>We can sample multiple skylines from the posterior distribution.</li>
      <li>Averaging $N_e$ estimates across skylines gives an even smoother trend.</li>
      <li>We can also use <a href="https://en.wikipedia.org/wiki/Percentile">percentiles</a> of the distribution as confidence intervals - actually <a href="https://en.wikipedia.org/wiki/Credible_interval">credible intervals</a>.</li>
    </ul>
  </td>
  <td width="40%">
    <img src="/img/smooth-skylines.png" width="300px"/>
  </td>
</tr>
</table>

<small><small>
Image source: Drummond <i>et al.</i> (2005).  Bayesian coalescent inference of past population dynamics from molecular sequences. <a href="https://academic.oup.com/mbe/article/22/5/1185/1066885">Mol Biol Evol 22: 1185-1192</a>.
</small></small>

---


# Example: Hepatitis C virus in Egypt

* About 15% of adult population infected by HCV genotype 4
* Coalescent reconstructed found epidemic growth associated with massive public health campaign against snail fever.

<img src="/img/HCV-egypt.png" width="400px"/>

<small>Figure from Drummond *et al*, 2005. *Bayesian Coalescent Inference of Past Population Dynamics from Molecular Sequences.* Mol Biol Evol 22: 1185-1192.</small>

---

# Example: Neolithic expansion of human tuberculosis

<img src="/img/comas-MTBC.png" width="700px"/>

<small><small>
Comas <i>et al.</i> 2013. Out-of-Africa migration and Neolithic co-expansion of *Mycobacterium tuberculosis* with modern humans. Nature Genetics 45: 1176-1182.
</small></small>

---

<section data-background="#333" style="color:white">

<h1 style="color:white">Key points</h1>

* The original Kingman's coalescent model assumes that population size is constant.
* There are two ways of relaxing this assumption: parametric and non-parametric.
  * Exponential growth is an example of a parametric model.
* A skyline model is a non-parametric approach that estimates multiple values of $N_e$ for different time intervals.
  * We can average a posterior sample of skylines to produce a smooth Bayesian skyline.

</section>
