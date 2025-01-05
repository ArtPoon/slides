# MBI 4750G
## Probability and likelihood
<img src="https://imgs.xkcd.com/comics/increased_risk.png" width="250px"/>

---

# Probability and bioinformatics

* A significant part of bioinformatics is figuring out how to fit a model to the data.
  * We use models to represent a hypothesis or "way of understanding the world".
  * Models allow us to extrapolate unseen values, *e.g.*, to make predictions.
* A *probabilistic* model assigns a chance of some random outcome occuring.
  * The outcome values are *variables*.

---

# Outcome spaces

* To understand probability, it helps to think about the *outcome space* (sometimes denoted as $\Omega$).
* Think of the largest box of a [Venn diagram](https://en.wikipedia.org/wiki/Venn_diagram) as representing *all* possible outcomes.
* We can partition this space into sections representing *discrete* or *continuous* outcomes.

![](/img/outcome-space.svg)

---

# Properties of a probability distribution

* A [probability distribution function](https://en.wikipedia.org/wiki/Probability_distribution) (PDF) is a function that maps from an outcome space to a probability, $f: \Omega \rightarrow p$.
* A PDF *must* sum to 1 (100%) across all possible outcomes, *for a given hypothesis* or parameter settings.
  * For a continuous PDF, we integrate over a range of values.
<table>
<tr>
<td><img src="/img/multinom.svg"/></td>
<td><img src="/img/dgamma.svg"/></td>
</tr>
</table>

---

# Binomial probability

* What is the probability of getting 5 heads in 10 coin tosses?
  * Let the probability of heads is $p$ &mdash; this is a *parameter* (hypothesis).
  * Let the number of heads ($y=5$) and tosses ($N=10$) be our *data*.
* Let's make some assumptions:
  1. My coin tossing is truly random.
  2. The coin tosses are independent - one result does not influence another.
  3. $p$ is constant - the coin and my tossing action do not change.

---

# Binomial distribution

* The probability of the data $\\{N,y\\}$ given the hypothesis $\\{p\\}$ can be described by the *binomial model*:
`$$P(N,y\;|\;p) = {N\choose y} p^y (1-p)^{(N-y)}$$`
* ${N\choose y}$ is shorthand for $\frac{N!}{(N-y)!y!}$, where $N!=N\times(N-1)\times(N-2)\times \ldots \times 3 \times 2 \times 1$.

![](/img/binomial.svg)

---


<table>
<tr>
  <td style="vertical-align: middle;">
    <h1>Poisson distribution</h1>
    <ul>
      <li>The Poisson distribution describes the probability that $y$ events occur given a constant rate $\lambda$.</li>
      <li>It is a special case of the binomial distribution when $N$ is large and $p$ is small.</li>
      <li>It was famously used to explain the number of accidental deaths by horse kicks in the Prussian army.</li>
      <li>Its formula looks like this:
$$P(y) = \frac{\lambda^y \exp(-\lambda)}{y!}$$</li>
    </ul>
  </td>
  <td width="35%">
    <img src="https://upload.wikimedia.org/wikipedia/commons/d/de/Husaren_V%C3%B6lkerschlacht_bei_Leipzig.jpg"/>
    <br/>
    <img src="/img/dpoisson.svg">
  </td>
</tr>
</table>

<small><small>
Image credit: Wikimedia Commons
</small></small>

---

<table>
<tr>
  <td style="vertical-align: middle;">
    <h1>Geometric and exponential distributions</h1>
    <ul>
      <li>
      The geometric distribution describes the number of failures ($y$) until the first success with probability $p$.
      $$P(y) = (1-p)^y p$$
      </li>
      <li>
      The exponential distribution describes how much time passes ($t\ge 0$) until an event happens at a constant rate $\lambda$:
      $$P(t) = \lambda \exp(-\lambda t)$$
      </li>
      <li>The time between radioactive decay events follows an exponential distribution.</li>
    </ul>
  </td>
  <td width="35%">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/N1D0005806_Hanford_sheep_testing.jpg/605px-N1D0005806_Hanford_sheep_testing.jpg"/>
    <small><small>
    Testing a sheep for radiation at a decommissioned nuclear production complex (<a href="https://en.wikipedia.org/wiki/User:Orange_Suede_Sofa/sandbox/Hanford_Site">Hanford</a>, USA).
    </small></small>
    <img src="/img/dgeomexp.svg">
  </td>
</tr>
</table>

---

<table>
<tr>
  <td style="vertical-align: middle;">
    <h1>Gaussian (normal) distribution</h1>
    <ul>
      <li>
      The Gaussian distribution describes a continuous outcome ($X$) with mean $\mu$ and standard deviation $\sigma$:
$$P(X) = \frac{1}{\sqrt{2\pi}\sigma} \exp\left(-\frac{(X-\mu)^2}{2\sigma^2}\right)$$
      </li>
      <li>
      This "bell shaped curve" arises in many contexts because the sum of many random variables <a href="https://en.wikipedia.org/wiki/Central_limit_theorem">converges to this distribution</a>.
      <img src="/img/dnorm.svg">
      </li>
    </ul>
  </td>
  <td width="30%">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/GaltonBoard.png/303px-GaltonBoard.png" width="250px"/>
    <small><small>
    A modern <a href="https://en.wikipedia.org/wiki/Galton_board">Galton board</a> demonstrating that the locations of balls falling through pins follows a Gaussian distribution.
    </small></small>
  </td>
</tr>
</table>


---

<table>
<tr>
  <td style="vertical-align: middle;">
    <h1>Gamma distribution</h1>
    <ul>
      <li>
      The Gamma distribution describes the total time until $\alpha$ different events have occurred at rate $\beta$:
      $$f(t) = \frac{\beta^\alpha}{(\alpha-1)!}t^{\alpha-1}\exp(-\beta t)$$
      </li>
      <li>
      It is often used to model the time to failure of a complex system, such as:
      <ul>
        <li>the age distribution of cancer incidence</li>
        <li>the incubation period of SARS-CoV-2 infection</li>
      </li>
    </ul>
  </td>
  <td width="50%">
    <img src="https://www.nejm.org/na101/home/literatum/publisher/mms/journals/content/nejm/2020/nejm_2020.382.issue-13/nejmoa2001316/20200320/images/img_xlarge/nejmoa2001316_f2.jpeg"/>
    <small><small>
    Key time-to-event distributions.  Figure from <i>Early Transmission Dynamics in Wuhan, China, of Novel Coronavirus-Infected Pneumonia</i> (Li <i>et al.</i> 2020, New Engl J Med).
    </small></small>
  </td>
</tr>
</table>

---

# Stochastic processes

* A [stochastic process](https://en.wikipedia.org/wiki/Stochastic_process) is a model that describes how a system changes over time, as a series of random outcomes, $\\{X_i\\}$ for $i=\\{1, 2, 3, \ldots\\}$.
* Many biological processes are modeled as stochastic processes, such as:
  * The evolution of a DNA sequence over time.
  * The transmission of an infectious disease from one host to the next.
  * The convergence of lineages to common ancestors back in time.

---

# Random walks

* A [random walk](https://en.wikipedia.org/wiki/Random_walk) is a stochastic process that starts with $X_0=0$ and:
$$
X_{t+1} = \begin{cases}
X_{t} - 1 & \text{with probability 0.5}\\\\
X_{t} + 1 & \text{otherwise}.
\end{cases}
$$
* A PDF of $X_t$ can be obtained from a binomial distribution where $N=t$ (the number of steps) and $p=0.5$.

![](https://upload.wikimedia.org/wikipedia/commons/f/fd/RandomWalk2.svg)

---

<table>
<tr>
  <td style="vertical-align: middle;">
    <h1>Random walks and infectious diseases</h1>
    <ul>
      <li>
      The "random walk" problem was posed by Karl Pearson (of <a href="https://en.wikipedia.org/wiki/Pearson_correlation_coefficient">Pearson's correlation</a> fame) in 1905 in a <a href="https://www.nature.com/articles/072294b0">letter to Nature</a>:
      <img src="/img/pearson-random-walk.png"/>
      </li>
      <li>
      However, Pearson was originally working on the problem at the request of <a href="https://en.wikipedia.org/wiki/Ronald_Ross">Sir Ronald Ross</a>.
      </li>
      <li>
      Ross was a Nobel laurate for establishing that mosquitoes are the vector of malaria, and was modeling the spread of mosquitoes.
      </li>
    </ul>
  </td>
  <td width="40%">
    <img src="/img/Pearson-2.jpg"/>
    <small><small>
    Letter from Pearson to Ross (July 21, 1905).  Source: London School of Hygiene & Tropical Medicine.
    </small></small>
  </td>
</tr>
</table>

<small><small>
Source: https://blogs.lshtm.ac.uk/library/2015/03/27/karl-pearson-and-sir-ronald-ross/
</small></small>

---

<table>
<tr>
  <td style="vertical-align: middle;">
    <h1>Markov chains</h1>
    <ul>
      <li>
      The next step in the random walk ($X_{t+1}$) depends only on the current state $X_t$.  
      </li>
      <li>
      We do not need to know anything about where the "walker" was at any other time in the past!
      </li>
      <li>
      This characteristic is called the <a href="https://en.wikipedia.org/wiki/Markov_property">Markov property</a>, and stochastic processes with this property are called <i>Markov chains</i>.
      </li>
      <li>
      <i>Snakes and Ladders</i> and <i>Candy Land</i> are examples of games with the Markov property.
      </li>
    </ul>
  </td>
  <td width="40%">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Snakes_and_Ladders.jpg/638px-Snakes_and_Ladders.jpg"/>
    <small><small>
    A game of Snakes and Ladders, which originated in India as <i>gyan chaupar</i>, <i>jnana bagi</i> or  <i>moksha patam</i> to teach about ethics and perseverance. (Source: <a href="https://commons.wikimedia.org/wiki/File:Snakes_and_Ladders.jpg">Wikimedia Commons</a>)
    </small></small>
  </td>
</tr>
</table>

---

# Conditional probability

* What does it mean for $X_{t+1}$ to *depend on* $X_{t}$?
* The probability that $X_{t+1}=6$ is zero if $X_{t}=6$, and is $0.5$ if $X_{t}=5$.
* We can write this as:
$$P(X_{t+1}=x|X_{t}=x\pm 1)=0.5$$
* The pipe character (`|`) is shorthand for "given that" or "conditional on".


---

<table>
  <tr>
    <td>
      <h1>Transition matrices</h1>
      <ul>
        <li> If the Markov chain can only take a finite number of states, then we can write the probabilities of transitions between states as a matrix:
        $$\begin{matrix}
        & & \textrm{to} \\
        & & E & A\\
        \hline
        \textrm{from} & E & 0.3 & 0.7\\
                      & A & 0.4 & 0.6\\
        \end{matrix}$$
        </li>
        <li>Note each row must sum to one - the chain must go <i>somewhere</i>.</li>
        <li>While it is possible to write this matrix for <i>Snakes and Ladders</i>, it would be very large!  Every square would have its own row and column.</li>
      </ul>
    </td>
    <td width="30%">
      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2b/Markovkate_01.svg" width="250px"/>
      
      <small><small>
      Source: <a href"https://commons.wikimedia.org/wiki/File:Markovkate_01.svg">Wikimedia Commons</a>
      </small></small>
      
      <img src="/img/chutes-and-ladders.png"/>
      
      <small><small>
      Source: <a href="https://web.mit.edu/18.06/www/Spring17/Chutes-and-Ladders.pdf">Chutes-and-ladders, MIT.</a>
      </small></small>
    </td>
  </tr>
</table>

---

# Stationary distributions

* Suppose we track the frequencies that different states occur in the Markov chain.
* For some Markov chains, these frequencies will converge to an equilibrium called the [stationary distribution](https://en.wikipedia.org/wiki/Discrete-time_Markov_chain#Stationary_distributions).
* If we know this distribution, then we can predict what state the chain is in at any point in time *without any other information*.
> Why does a random walk have no stationary distribution?

---

* More formally, the stationary distribution is a probability vector $\pi$ such that $\pi P = \pi$ and $\sum\pi = 1$.

`$$
\begin{pmatrix}
\pi_E & \pi_A \\
\end{pmatrix}
\begin{pmatrix}
0.3 & 0.7 \\
0.4 & 0.6 \\
\end{pmatrix} = \begin{pmatrix}
0.3\pi_E+0.4\pi_A & 0.7\pi_E+0.6\pi_A \\
\end{pmatrix}
$$`

`$$
0.3\pi_E + 0.4(1-\pi_E) = \pi_E\\[6pt]
\pi_E = 0.4/1.1 = 0.\overline{36}
$$`

<table width="60%">
<tr>
<td width="40%" style="vertical-align: middle; text-align: right; font-size: 16pt;">
Two replicate simulations (blue and red) of this Markov chain, keeping track of the frequency of being in state $A$.
</td>
<td width="60%">
<img src="/img/stationary-prob.svg"/>
</td>
</tr>
</table>

---

# Continuous time Markov chains

* The random walk described above is a *discrete time* Markov process.
  * This system transitions from one state to another in discrete steps (from $t$ to $t+1$).
* What if we want to model a Markov process in real time?
* Assume that events happen at a constant rate $\lambda$.
  * The time between successive events follows an *exponential distribution* with rate $\lambda$.
  * The number of events in a time interval $\Delta t$ follows a *Poisson distribution* with rate $\lambda \Delta t$.

---

# CTMCs and bioinformatics

* Continuous time Markov chains play an important role in bioinformatics - for example, we use CTMCs to model molecular evolution.
* We assume the Markov chain moves between four states: A, C, G and T.
* We assume that each site in a nucleotide sequence follows its own Markov chain.
* More on this later!

---


<section data-background="#333" style="color:white">

<h1 style="color:white">Key points</h1>

* A probability distribution can be discrete or continuous.
* The Poisson distribution describes the probability that $Y$ events occur within time $t$ at rate $\lambda$.
* A random walk is a model describing a path resulting from a series of random steps in some space.
* A Markov chain is type of stochastic process in which the probability of the next change depends only on the current state.

</section>
