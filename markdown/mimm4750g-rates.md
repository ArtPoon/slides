# MBI 4750G
## Substitution models
![](https://imgs.xkcd.com/comics/evolving.png)

---

# Substitution Rates

* A substitution occurs when a new mutation appears *and* increases in frequency until it is established in the population.
* **Individuals do not evolve, populations do.**
![](/img/fixation.png)
<small><small>
Simulations of allele frequency evolution in R.
</small></small>

---

# Review: Discrete-time Markov chains

* **Markov property**: the probability of being in state $X$ at time $t$ depends *only* on its previous state and no others (memoryless).

* The state space is **discrete** if the system can only assume one out of a finite number of values.

* A Markov chain describes a sequence of states over time.
* In a **discrete-time** Markov chain, state transitions occur only at regular time intervals.

---

# Review: Transition probabilities

<table>
  <tr>
    <td>
      <ul>
        <li>A discrete-time Markov chain is defined by a matrix of transition probabilities between states, $P$:
        </li>
$$\begin{matrix}
      & & \textrm{from} \\
      & & E & A\\
      \hline
      \textrm{to} & E & 0.3 & 0.4\\
                    & A & 0.7 & 0.6\\
      \end{matrix}$$
        <li>Note each column must sum to one.</li>
      </ul>
    </td>
    <td width="35%">
      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2b/Markovkate_01.svg" width="300px"/>
      <small>
      Image source: <a href"https://commons.wikimedia.org/wiki/File:Markovkate_01.svg">Wikimedia Commons</a>
      </small>
    </td>
  </tr>
</table>

---


<section data-state="markov-slide">
    <h1>Modeling evolution</h1>
    <ul>
      <li>Sequence evolution is often modelled as a discrete-state, continuous-time Markov chain.</li>
    </ul>
    <center>
    <div id="markov" class="fig-container"
         data-fig-id="fig-markov"
         data-file="/include/markov-chain.html"
         style="height:300px">
    </div>
    <div></div>
    </center>
    <small><small>
    Based on JavaScript by <a href="http://setosa.io/blog/2014/07/26/markov-chains/index.html">Victor Powell</a>.
    </small></small>
</section>

---

# Continuous-time Markov chains

* In a **continuous-time** Markov chain (CTMC), state transitions can occur at any point in time.

* If we assume that all substitution rates are constant over time, then the time between substitution events (waiting time) is [exponentially distributed](https://en.wikipedia.org/wiki/Exponential_distribution).


<small>
Outcome of exponential waiting times for 20 events:
</small>
<img width="80%" style='border:1px solid #000000' src="/img/poisson-process.svg"/>

---

# Rate matrices

* Unlike discrete-time Markov chains, we do not have fixed state transition probabilities.
  * The probability of moving from state $X$ to $Y$ depends on how much time has elapsed between observations.
  * In a CTMC, different amounts of time elapse between events!
* Instead, we use a matrix of instantaneous rates:

`$$\begin{matrix}
& \text{to:} & E & A\\
\hline
\textrm{from} & E & -0.02 & 0.02\\
              & A & 0.05 & -0.05\\
\end{matrix}$$`

* Each diagonal entry is set such that each row sums to 0.

---

# Substitution models

* The Jukes-Cantor model can be expressed by the following rate matrix:
$$ \begin{pmatrix}
  \ast & \mu & \mu & \mu \\\\
  \mu & \ast & \mu & \mu \\\\
  \mu & \mu & \ast & \mu \\\\
  \mu & \mu & \mu & \ast \\
  \end{pmatrix} = \begin{pmatrix}
  \ast & 1 & 1 & 1 \\\\
  1 & \ast & 1 & 1 \\\\
  1 & 1 & \ast & 1 \\\\
  1 & 1 & 1 & \ast \\
  \end{pmatrix}\mu$$

* The diagonal entries $\ast$ are set to $-3\mu$ so that each row sums to 0.

---

# Rates into probabilities

* To convert this rate matrix into the probability that $X$ transitions into $Y$ after time $t$, we have to use [matrix exponentiation](https://en.wikipedia.org/wiki/Matrix_exponential).
* This is a computationally costly operation that accounts for all possible transitions that may occur in time $t$.
* For a rate matrix $Q$, the probability matrix is:
$$P(t) = \exp(Q t)$$

---

Values of $\exp(Q t)$ for Jukes-Cantor matrix:

![](/img/expm.svg)

---

# Confounding rate and time

* Note that this formula contains the product $\mu \times t$, where $\mu$ is the overall substitution rate, and $t$ is time.
* The same transition probabilities can be obtained by increasing either $\mu$ or $t$.
  * *i.e.*, was it slower, or did less time pass?
* To break this confounding, we need an additional source of information about $\mu$ or $t$ &mdash; more on this later!


---

# Other models

* The Hasegawa-Kishino-Yano (HKY85) model allows for unequal base frequencies ($\pi_i$) and a transition/transversion rate bias ($\kappa$).

$$\begin{matrix}
 & \begin{matrix}A\hspace{1ex} & C \hspace{1ex} & G \hspace{1ex} & T \hspace{1ex} \end{matrix} \\\\
\begin{matrix}A\\\\C\\\\G\\\\T\end{matrix} &
  \begin{pmatrix}
    \ast & \pi_C & \kappa\pi_G & \pi_T\\\\
    \pi_A & \ast & \pi_G & \kappa\pi_T\\\\
    \kappa\pi_A & \pi_C & \ast & \pi_T\\\\
    \pi_A & \kappa\pi_C & \pi_G & \ast
  \end{pmatrix}\mu
\end{matrix}$$

> Do we expect $\kappa < 1$ or $\kappa > 1$?

---

# Generalized models

* In general, there are six rates for a time-reversible (symmetric rates) model:

  $$ \left( \begin{matrix}
  \ast & a & b & c \\\\
  a & \ast & d & e \\\\
  b & d & \ast & f \\\\
  c & e & f & \ast \\
  \end{matrix}\right)$$

  where these rates are assigned in alphabetical order &mdash; $a$ is the rate from `$A\leftrightarrow C$`, $b$ is `$A\leftrightarrow G$`, etc.

---

# Model specification

* PAUP* was a popular commercial software package for reconstructing phylogenies.
* It used a six-digit number ($abcdef$) to represent any kind of time-reversible nucleotide substitution model:
  * *e.g.,* HKY85 becomes `010010`.
* This scheme is still used by other software, such as HyPhy and PhyML.

> What is the PAUP* model string for TN93?

---

# Time reversible models

* If a model is time reversible, then the probability of a transition from state $X$ to $Y$ in time $t$ is the same as going from $Y$ to $X$ in the same time.
  * It is possible to fit a non-reversible model, but we immediately double the number of parameters!
  * We also need to have a definite starting point (*e.g.*, the tree must be rooted).

---

# Rate variation

* Rates of evolution vary among different sites of the genome.
  * For example, parts of a virus genome that encode a surface-exposed protein tend to evolve faster under selection by the host immune response.
* Letting every site have its own rate creates too many parameters!
  * Assume that rates belong to one of multiple rate *categories*.


---

# Parametric methods


<table>
  <tr>
    <td>
      <ul>
        <li>A parametric method uses a distribution function to model rate variation.</li>
        <li><i>e.g.</i>, <a href="https://en.wikipedia.org/wiki/Ziheng_Yang">Ziheng Yang</a> used a <a href="https://en.wikipedia.org/wiki/Gamma_distribution">gamma distribution</a>, which is a flexible, continuous distribution over the range $(+0, \infty)$.</li>
        <li>The gamma distribution has two parameters ($\alpha$ and $\beta$), but is usually simplified to $\alpha=\beta$.</li>
        <li>It is split into $k$ intervals of equal area (probability), where $k$ is often set to 4.</li>
    </td>
    <td width="40%">
      <img src="/img/discgamma.png" width="350px"/>
    </td>
  </tr>
</table>

---

# Non-parametric methods

* Alternatively, we can estimate $k$ rate classes, where $k$ is specified by the user:
  * The mean is fixed *a priori* to some value $\mu$, around which we estimate the rates for each class.
  * We estimate the probability that a site belongs to each rate class.
  * Thus, each additional class adds two parameters ([Mannino *et al.*, 2020](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0229493)).

* This "general discrete distribution" is more flexible, *e.g.*, allowing for bimodal rate distributions.


---

# Invariant sites

* For many organisms, the vast majority of positions in the genome are conserved over the time scale of sampling.
* Another non-parametric approach to model rate variation is to add a probability $p$ that a site does not evolve at all.
  * This approach is analogous to a zero-inflated statistical distributions, *e.g.*, [zero-inflated Poisson](https://en.wikipedia.org/wiki/Zero-inflated_model).
  * Distinguishing between *structural* (deterministic) and *sampling* (by chance) zeroes.

---

# Model specification with rate variation

* Named models generally have conventional abbreviations:
  * For example, the generalized time reversible model is GTR.
* If we add a gamma distribution to model rate variation, we denote this as "GTR+G"
* If we add a zero-rate category for invariant sites, we write "+I", *e.g.*, "GTR+G+I"
* A general discrete or "free rate" model is specified in IQ-TREE by "+R"

---

<section data-background="#333" style="color:white">

<h1 style="color:white">Key points</h1>

* A **mutation** is the first appearance of a genetic change; a **substitution** occurs when a mutation spreads to all members of the population.
* Molecular evolution is usually modeled as a **continuous-time Markov chain** with an instantaneous rate matrix, $Q$.
* There are several "named" models where some rates in $Q$ are constrained to be equal.
* Variation in rates across sites can be modeled with parametric or non-parametric methods.

</section>
