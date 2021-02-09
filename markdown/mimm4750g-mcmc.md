# MIMM4750G
## Markov chain Monte Carlo

![](https://imgs.xkcd.com/comics/walking_into_things.png)

---

# Monte Carlo

<table>
  <tr>
  <td>
  <ul>
    <li><a href="https://en.wikipedia.org/wiki/Stanislaw_Ulam">Stanislaw Ulam</a> was a Polish physicist who, in 1946, was playing solitaire while recovering from brain surgery.</li>
    <li>He reasoned that it would be easier to estimate the probability of winning by playing many times (simulation) than calculating the exact chance.</li>
    <li>This simulation-based approach was dubbed the "Monte Carlo method" after the casino.</li>
    <li>The method later became used in the Manhattan project.</li>
  </ul>
  </td>
  <td width="35%">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Stanislaw_Ulam.tif/lossy-page1-413px-Stanislaw_Ulam.tif.jpg"/>
  </td>
  </tr>
</table>

---

# Random walks

<table>
  <tr>
  <td>
  <ul>
    <li>Suppose you exit the classroom and after every 10 steps, you flip a coin twice.</li>
    <li>HH, face forward</li>
    <li>HT, turn left</li>
    <li>TH, turn right</li>
    <li>TT, turn around</li>
  </ul>
  </td>
  <td width="40%">
    <img src="https://upload.wikimedia.org/wikipedia/commons/8/85/Random_walk_2500_animated.gif"/>
  </td>
  </tr>
</table>

---

# Markov chain Monte Carlo

* A random walk is basically a simulation.  If we use a random walk to solve a problem, we are using a *Monte Carlo method*.
* Remember a *Markov chain* is a random process where the probability of the next event depends only on the current state (like [Snakes and Ladders](https://en.wikipedia.org/wiki/Snakes_and_Ladders)).
* Markov chain Monte Carlo (MCMC) is a powerful method to solve problems in a Bayesian framework.

---

# Metropolis-Hastings sampling

* Remember that $P(D)$ is a difficult integral to deal with.
* What if we consider the ratio of $P(H|D)$ for two hypotheses, $H$ and $H'$?  Then $P(D)$ cancels out!
* M-H sampling is a random walk over the space of model parameters $(H)$.
* We *propose* a new set of parameters $H'$, and then decide whether to accept this proposal.

---

# Metropolis-Hastings sampling

* Our random walk is controlled by this ratio:

  $$
  R = \frac{Q(H'|H)}{Q(H|H')} \times \frac{P(D|H')P(H')}{P(D|H) P(H)}
  $$

  where $Q(y|x)$ is the probability of proposing $y$ when you are at $x$.
* Remember that $P(H|D) \propto P(D|H)P(H)$.

---

# Metropolis-Hastings sampling
* It turns out that if you follow these rules:
  1. Always accept the proposed $H'$ if $R\ge 1$.
  2. If $R<1$, accept $H'$ anyways with probability $R$.

     This means we take a "step down"!
  3. Otherwise, stay where we are with $H$.

* then the amount of time our random walk spends in $H$ will be proportional to the posterior probability $P(H|D)$.

---

![](/img/mcmc.png)

<small>
Figure from Poon *et al.* (2018) Retrovirology 15:47.
</small>

---

# Convergence

* MCMC is an "auto-correlated" process - the current state will always be similar to the previous state.
* This is *efficient* because we don't waste time sampling states (parameter values) that are silly.
* This is *not efficient* because a random walk is slow to explore parameter space.
* When a random walk has gone long enough, it should eventually "converge" to the posterior distribution.

---

# Burn-in and thinning

* What if the random walk starts in an awful part of parameter space?
* We don't want this to affect the sample, so we throw out the first part of the walk (chain).
* To reduce auto-correlation the sample, we only keep a small number of samples taken from equal intervals along the chain (thinning).


