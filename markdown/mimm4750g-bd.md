# MBI 4750G
## Birth-death models
![](https://imgs.xkcd.com/comics/natural_parenting.png)

---

# Review: The coalescent

* The coalescent model assumes that the sample is small relative to the population size ($n\ll N$).
  * This means that the probability of encounting two or more common ancestors in the same generation is negligibly small.
* It also assumes no selection &mdash; that every individual has the same probability of leaving descendants in the next generation.
  * There are extensions of the coalescent model that relax this assumption (ancestral selection graphs), but they are too complex to use in practice.

---

# Birth-death models

* Coalescent models are not the only tree priors in BEAST!
* Recall that a Markov process means a stochastic process that has no memory.
  * The probability of a state change at time $t$ only depends on the current state and nothing else.
* A birth-death model is a continuous-time Markov process that describes how the size of a population changes over time.

---

# Yule model

* Let's start with a "pure birth" process or Yule (1925) model.
  * $N(t)$ is the size of the population at time $t$.
  * The birth rate is $\lambda_N = N(t)\lambda$.
  * The time between births is exponentially distributed with rate $\lambda_N$.

<table>
<tr>
<td width="50%">
  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Birth_process.svg"/>
  <small>
  Image source: <a href="https://commons.wikimedia.org/wiki/File:Birth_process.svg">Wikimedia Commons</a>
  </small>
</td>
<td>
  <img style="" src="/img/bdtree.svg"/>
  <small>
  A realization of a pure birth process using the `bdtree` function in R package `phytools`.
  </small>
</td>
</tr>
</table>

---

# Birth-death processes

* Let every lineage go extinct ("death") at a rate $\mu$.
* At a lineage level, the waiting time till either birth or death is exponentially distributed:
$$\tau \sim (\lambda + \mu) e^{-(\lambda+\mu)\tau}$$
* The probability that the next event is a birth is:
$$\frac{\lambda}{\lambda+\mu}$$


---

# History

* The birth-death model was first used to model the probability that a population would go extinct by chance ([Feller 1939](https://link.springer.com/article/10.1007/BF01602932)). <img src="https://upload.wikimedia.org/wikipedia/commons/2/28/BD-proces.png" width="500px"/>

* Related to the Galton-Watson branching process (a discrete-time model): $X_{t+1} = \sum_{i=1}^{X_t} R_t^{(i)}$
  * In the Victorian era, aristocrats were worried that their family names were going extinct.
  * $R_t$ is the random number of children born to one individual in generation $t$.

<small><small>
Image source: [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:BD-proces.png)
<small><small>

---

# Deterministic growth or decay

<table>
<tr>
  <td style="font-size: 20pt;">
    <ul>
      <li>The net diversification rate is $r=\lambda-\mu$.</li>
      <li>The deterministic (expected) number of lineages at time $t$ is simply an exponential growth model:</li>
    </ul>
    $$N_t = N_0 e^{r t}$$
  </td>
  <td width="50%">
    <img src="https://lukejharmon.github.io/pcm/images/figure10-3.png" height="400px"/>
    Expected number of lineages for $r>0$ (top line) and $r<0$ (bottom line).
  </td>
</tr>
</table>

<small><small>
Image source: Luke Harmon, Phylogenetic Comparative Methods, <a href="https://lukejharmon.github.io/pcm/chapter10_birthdeath/">Chapter 10</a>.
</small></small>

---

# Stochastic growth

* Let $p_n(t)$ be the probability of $n$ lineages existing at time $t$.
* We can write the following differential equations:

`$$
\begin{align}
\frac{dp_0(t)}{dt} = &\; \mu p_1(t)\\[6pt]
\frac{dp_n(t)}{dt} = &\; (n-1)\lambda p_{n-1}(t) - n(\lambda+\mu) p_n(t) +\\
 &\; (n+1)\mu p_{n+1}(t)\\
\end{align}
$$`

---

# Stochastic growth

* These differential equations have a closed form solution.  
* Probability distributions for $\lambda=0.1$, $t=5.0$, and $\mu=0$ or $\mu=0.05$, starting with one lineage at $t=0$:

![](/img/bddists.svg)

---

# Birth-death models describe tree shape

* These distributions tell us the probability that $n$ lineages exist at time $t$
  * They do *not* tell us how those lineages are related!
* To calculate the probability of a particular tree, we can start by assumping **complete sampling**:
  * All $n$ lineages that have survived to the present day have been sampled.
  * Some other lineages may have gone extinct before sampling.
* It is also easier to assume that all lineages are sampled at the same time (**contemporaneous sampling**).

---

# Serial sampling

* For infectious diseases, sequences are at different points in time.
  * The difference between sampling times is not negligible, relative to the molecular clock.
  * *e.g.*, an HIV-1 lineage gains about 2 substitutions per month, on average.

<img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Viral_Phylodynamics_Flutree.svg" height="250px"/>

<small><small>
A phylogeny of influenza A virus (H3N2) infections sampled between 1968 and 2002.
Source: Trevor Bedford, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Viral_Phylodynamics_Flutree.svg).
</small></small>

---

# Serial sampling

<table>
  <tr>
    <td style="font-size: 18pt">
      <ul>
        <li>The birth-death model with incomplete sampling was extended by <a href="https://en.wikipedia.org/wiki/Tanja_Stadler"/>Dr. Tanja Stadler</a> (right) in 2010.</li>
        <li>Any lineage can become sampled at a constant rate, $\psi$.</li>
        <li>A sampled lineage immediately goes extinct, not leaving any descendants.</li>
        <li>$\psi$ is different from the sampling probability $\rho$, which was only applied to tips at present.</li>
      </ul>
    </td>
    <td width="30%">
      <img src="https://upload.wikimedia.org/wikipedia/commons/1/1d/ETH-BIB-Stadler%2C_Tanja_%281981-%29-Portr_17419.jpg"/>
      <small>
      Image source: <a href="https://commons.wikimedia.org/wiki/File:ETH-BIB-Stadler,_Tanja_(1981-)-Portr_17419.jpg">Wikimedia Commons</a>.
      </small>
    </td>
  </tr>
</table>

---

# Birth-death skylines

* Extended the serial sampling model to allow varying birth and death rates over time.
* Like the coalescent skyline, the tree is partitioned into $m$ time intervals.
  * Each interval has its own rate of birth ($\lambda_i$), death ($\mu_i$) and sampling ($\psi_i$).

<img src="/img/stadler-kuhnert-fig4.png" height="200px"/>

<small><small>
Image source: Stadler, Kuhnert <i>et al.</i> (2013) <a href="https://www.pnas.org/doi/10.1073/pnas.1207965110">Proc Natl Acad Sci 110(1):228</a>.
</small></small>

---

<table>
  <tr>
    <td style="font-size: 18pt;">
      <h1>Effective reproduction number</h1>
      <ul>
        <li>Like the coalescent skyline, the number of time intervals must be specified by the user.</li>
        <li>Birth-death skylines are estimated with equal time intervals.</li>
        <li>
        The effective reproduction number is a function of these rates:
        $$R_e = \frac{\lambda}{\mu+\psi}$$
        </li>
        <li>$R_e(t)$ is the expected number of transmissions from a single infected individual at time $t$.</li>
      </ul>
      <small><small>
      Image source: Stadler, K&uuml;hnert <i>et al.</i> (2013) <a href="https://www.pnas.org/doi/10.1073/pnas.1207965110">Proc Natl Acad Sci 110(1):228</a>.
      </small></small>
    </td>
    <td width="33%">
      <img src="/img/stadler-kuhnert-fig2.png"/>
      Birth-death skyline for HIV-1 in the UK.
    </td>
  </tr>
</table>

---

# Birth-death SIR

<table>
  <tr>
    <td>
    <img src="https://royalsocietypublishing.org/cms/asset/ad72f3d7-f349-403a-a02b-ad086db3e062/rsif20131106f02.jpg" height="250px"/>
      <li>The BD skyline allows $\lambda$ and $\mu$ to vary freely over time, as though shaped by changes in behaviour.</li>
      <li>Dr. Denise K&uuml;hnert introduced a birth-death model where these rates are controlled by the SIR model.</li>
    </td>
    <td style="vertical-align: middle;">
      <img src="https://groupleaders.mpdl.mpg.de/wp-content/uploads/2021/07/256-316.jpg" height="200px"/>
      <small>
      Image source: Max Planck Digital Library.
      </small>
    </td>
  </tr>
</table>

<small><small>
Image source: K&uuml;hnert <i>et al.</i> (2014) <a href="https://royalsocietypublishing.org/doi/full/10.1098/rsif.2013.1106"/>Journal of the Royal Society Interface 11: 20131106</a>.
</small></small>

---

# Advantages over the standard coalescent

* The BDSIR model is directly linked to epidemiological parameters.
  * A coalescent skyline can recover shifts in $N_e$, but not whether those changes are due to changes in birth (transmission) or death (recovery).
* The birth-death process is stochastic.
  * The coalescent uses deterministic growth models, although stochastic versions exist.
* Birth-death models can more naturally handle selection (differences in growth rates).
* Birth-death models do not assume small sample sizes.

---

# Limitations of birth-death models

* The birth-death model with serial-sampling assumes that sampled infections are never transmitted onwards.
  * This assumption is relaxed by the skyline model (varying $\psi_i$).
* Some parameters of BD models are confounded
  * There are an infinite number of parameter combinations with equal support, even with unlimited data.

<img src="/img/bd-congruence.png" width="550px"/>

<small><small>
Image source: Louca <i>et al.</i> (2021) <a href="https://academic.oup.com/mbe/article/38/9/4010/6278301">Mol Biol Evol 38(9): 4010</a>.
</small></small>

---

# Phylodynamics

* Phylodynamics is the reconstruction of epidemiological and immunological dynamics from the shape of a phylogenetic tree relating infections.

<img src="/img/grenfell-trees.png" height="300px"/>

<small><small>
Image source: Grenfell <i>et al.</i> (2004) Unifying the epidemiological and evolutionary dynamics of pathogens. <a href="https://www.science.org/doi/full/10.1126/science.1090727">Science 303: 327-332</a>.
</small></small>

---

<img src="/img/grenfell-table.png" height="500px"/>

<small><small>
Image source: Grenfell <i>et al.</i> (2004) Unifying the epidemiological and evolutionary dynamics of pathogens. <a href="https://www.science.org/doi/full/10.1126/science.1090727">Science 303: 327-332</a>.
</small></small>

---

# Modern phylodynamics

<table>
  <tr>
    <td>
      <ul>
        <li>Presently, the term "phylodynamics" is applied to any study of infectious diseases that uses a phylogeny to estimate epidemiological parameters.</li>
        <li>It does not <i>have</i> to involve coalescent or birth-death models</li>
        <li>It does not <i>have</i> to involve Bayesian inference</li>
        <li>BUT these are very common methods in phylodynamics</li>
      </ul>
    </td>
    <td width="50%">
      <img src="/img/phylodynamics-refs.svg">
    </td>
  </tr>
</table>

