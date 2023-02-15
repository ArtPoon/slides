# MIMM4750G
## Markov chain Monte Carlo

![](https://imgs.xkcd.com/comics/walking_into_things.png)

---

# Bayesian inference

* Recall that Bayesian inference is updating our prior belief with new data.
  $$P(H|D) = \frac{P(D|H) P(H)}{P(D)}$$
  $$\mathrm{posterior} = \frac{\mathrm{likelihood}\times \mathrm{prior}}{\mathrm{probability\\;of\\;the\\;data}}$$

---

# Sampling the posterior distribution

<table><tr>
  <td>
    <ul>
      <li>We usually do not have an exact closed form solution for the posterior distribution.</li>
      <li>Instead of solving for the posterior, it might be good enough <u>to generate a random sample of points from this distribution</u>.</li>
      <li><a href="https://en.wikipedia.org/wiki/Law_of_large_numbers">If our sample size is large enough</a>, the sample mean should be a decent estimate of the actual mean, etc.</li>
    </ul>
  </td>
  <td width="45%">
    <img src="/img/sampling.svg"/>
    <small>
    A normal distribution (solid, blue), and a <a href="https://en.wikipedia.org/wiki/Kernel_density_estimation">kernel density</a> (line, red) for a random sample of 20 points.
    </small>
  </td>
</tr></table>

---

# Monte Carlo

<table>
  <tr>
  <td>
  <ul>
    <li><a href="https://en.wikipedia.org/wiki/Stanislaw_Ulam">Stanislaw Ulam</a> was a Polish physicist who, in 1946, was playing solitaire while recovering from brain surgery.</li>
    <li>He reasoned that it would be easier to estimate the probability of winning by playing many times (simulation) than calculating the exact chance.</li>
    <li>This simulation-based approach was dubbed the <a href="https://en.wikipedia.org/wiki/Monte_Carlo_method">"Monte Carlo method"</a> after the casino.</li>
    <li>The method later became used in the Manhattan project.</li>
  </ul>
  </td>
  <td width="35%">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Stanislaw_Ulam.tif/lossy-page1-413px-Stanislaw_Ulam.tif.jpg" alt="Unless otherwise indicated, this information has been authored by an employee or employees of the Los Alamos National Security, LLC (LANS), operator of the Los Alamos National Laboratory under Contract No. DE-AC52-06NA25396 with the U.S. Department of Energy. The U.S. Government has rights to use, reproduce, and distribute this information. The public may copy and use this information without charge, provided that this Notice and any statement of authorship are reproduced on all copies. Neither the Government nor LANS makes any warranty, express or implied, or assumes any liability or responsibility for the use of this information."/>
    <small>
    Image credit: <a href="https://www.lanl.gov/resources/web-policies/copyright-legal.php">Los Alamos National Laboratory</a>.
    </small>
  </td>
  </tr>
</table>

---

<table>
  <tr>
  <td style="vertical-align: middle;">
  <h1>Monte Carlo integration</h1>
  <ul>
    <li>We need to be able to integrate the posterior to calculate the mean, 95% interval.</li>
    <li>Suppose we are able to calculate the posterior probability $P(\theta|D)$ for a given $\theta$, but it is impossible to integrate.</li>
    <li>Estimate the integral by the proportion of random points between 0 and $M$ (dashed line) below $P(\theta|D)$.</li>
  </ul>
  </td>
  <td width="40%">
    <img src="/img/monte-carlo.svg" height="400px"/>
    <small>
    The curved function represents a posterior distribution function.
    Red lines represent posterior probabilities we calculate for specific parameter values.
    </small>
  </td>
  </tr>
</table>

---

# Limitations of Monte Carlo integration

* This is Monte Carlo integration by *uniform sampling*.
* No guidance on how to pick ceiling ($M$, dashed line).
  * Ideally, set to maximum value of posterior - but this is unknown!
  * May be really inefficient if posterior is low over most of $\theta$.
  * Problematic if it is time-consuming to calculate the posterior.

---

# Importance sampling

* [Importance sampling](https://en.wikipedia.org/wiki/Importance_sampling) draws points from a proposal distribution that (hopefully) concentrates our efforts in the more useful regions of $\theta$.
* Difficult to choose the right proposal distribution!

<img src="https://i.stack.imgur.com/XGyXh.png" width="550px"/>

<small><small>
Image credit: Wojciech Jarosz, <a href="https://www.cs.dartmouth.edu/~wjarosz/publications/dissertation/appendixA.pdf">Dissertation Appendix A</a>, and <a href="https://computergraphics.stackexchange.com/a/4994">this StackExchange post</a>.
</small></small>

---

# Random walks

<table>
  <tr>
  <td>
  <ul>
    <li>Suppose you exit the classroom and after every 10 steps, you flip a coin twice.</li>
    <ul>
    <li>HH, face forward</li>
    <li>HT, turn left</li>
    <li>TH, turn right</li>
    <li>TT, turn around</li>
    </ul>
    <li>The random walk originated with <a href="https://en.wikipedia.org/wiki/Ronald_Ross">Sir Ronald Ross'</a> study of <a href="https://blogs.lshtm.ac.uk/library/2015/03/27/karl-pearson-and-sir-ronald-ross/"/>mosquito transmission of malaria</a>, but is remembered more for <a href="https://www.nature.com/articles/072342a0">Pearson's letter</a>.</li>
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

<small><small>
Figure from Poon <i>et al.</i> (2018) Retrovirology 15:47.
</small></small>

---

# Convergence

* MCMC is an "auto-correlated" process - the current state will always be similar to the previous state.
  * This is *efficient* because we don't waste time sampling states (parameter values) that are silly.
  * This is *not efficient* because a random walk is slow to explore parameter space.
* When a random walk has gone long enough, it should eventually "converge" to the posterior distribution (also known as "mixing").
* How long is long enough?  This is [unknowable](https://en.wikipedia.org/wiki/There_are_known_knowns)!

---

# Burn-in and thinning

* What if the random walk starts in an awful part of parameter space?
* We don't want this to affect the sample, so we throw out the first part of the walk (chain).
* To reduce auto-correlation the sample, we only keep a small number of samples taken from equal intervals along the chain (thinning).

---

Examples of burn-in and autocorrelation
<img src="https://bookdown.org/marklhc/notes_bookdown/06_mcmc_files/figure-html/trace-acf-1.png" height="250px"/>
<img src="https://bookdown.org/marklhc/notes_bookdown/06_mcmc_files/figure-html/trace-acf-2.png" height="250px"/>

<small><small>
Image credit: Mark Lai (2019). <a href="https://bookdown.org/marklhc/notes_bookdown/markov-chain-monte-carlo.html">Course Handouts for Bayesian Data Analysis Class</a>.
</small></small>

---

# Effective sample size

* Consider a chain sample of $N$ steps.
* The ESS is the hypothetical number of truly random samples with the same estimation power as $N$.
* One way of defining the ESS is in terms of the autocorrelation at different lags:

  `$$\hat{N}_{\mathrm{eff}} = \frac{N}{1 + 2\sum_{t=1}^{\infty} \rho_t}$$`
  where $\rho_t$ is the autocorrelation estimate with lag $t$.

<small><small>
Source: Vehtari <i>et al.</i> (2021) Rank-Normalization, Folding, and Localization: An Improved R for Assessing Convergence of MCMC (with Discussion). Bayesian Analysis 16(2): 667-718.
</small></small>

---

# Improving ESS

* What ESS is good enough?
* BEAST developers tend to recommend a minimum of ESS=200.
  * Why 200?  Perhaps because the 95% credible interval is estimated by 5 effective samples at either extreme.
* How do I increase the ESS?
  * Run your chains longer.
  * Run more chains.
  * If the problem is one parameter, evaluate its proposal distribution and sampling frequency.

---

# Suggested ~~readings~~ web apps!

* [bayes.js: A Small Library for Doing MCMC in the Browser](https://www.sumsar.net/blog/2015/12/bayes-js-a-small-library-for-doing-mcmc-in-the-browser/) - Features intuitive JavaScript animations for the MCMC trace and histograms.
* [The Markov-chain Monte Carlo Interactive Gallery](https://chi-feng.github.io/mcmc-demo/app.html?algorithm=RandomWalkMH&target=banana) - A nice animated web interface for learning different MCMC sampling algorithms!
