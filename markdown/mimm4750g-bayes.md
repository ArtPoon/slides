# MIMM4750G
## Bayesian inference
<img src="/img/xkcd-bayes.png"/>

---

# Likelihood

* Recall that likelihood is focusing on the probability as a function of the model parameters (hypothesis) given the data.
* For a given data set, we want to find the parameters that maximize the likelihood of our model.
* This is quite powerful! 

---

# Objections to maximum likelihood

* The maximum likelihood estimate (MLE) is a single combination of parameter values.
* If the likelihood function is "rugged", then there may be many parameter values that are about as good as the MLE!
<img src="/img/matsen-islands.png" width="550px"/>
<small>
Islands in tree space.  Source: Whidden and Matsen (2015) Syst Biol 64. https://doi.org/10.1093/sysbio/syv006
</small>

---

# Being Bayesian

* A Bayesian would object to relying on a single estimate
* It is more robust to refer to the **distribution** of parameters that are supported by the data.
* A Bayesian would also object to the assumption that the experiment is completely objective.
* The design of an experiment is shaped by an investigator's **subjective belief** about the outcome.

---

# Rev. Thomas Bayes

<table>
  <tr>
    <td style="font-size: 20pt;">
      <ul>
        <li>A Presbyterian minister in 17th century England.</li>
        <li>"An Essay towards solving a Problem in the Doctrine of Chances" was published two years after his death.</li>
        <li>Addressed a hypothetical gambling problem proposed by <a href="https://en.wikipedia.org/wiki/Abraham_de_Moivre"/>Abraham de Moivre:</li>
        <img src="/img/cards.png">
      </ul>
    </td>
    <td width="30%">
      <img src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Thomas_Bayes.gif"/>
      <small>This may be a portrait of Thomas Bayes, but <a href="https://commons.wikimedia.org/wiki/File:Thomas_Bayes.gif"/>no one is really sure</a>.  We use it anyhow.</small>
    </td>
  </tr>
</table>

---

# Conditional probability

* We are used to thinking about the probability of an outcome, $P(D)$.
* This implicitly involves some model (hypothesis), $P(D|H)$.
* We say that $P(D|H)$ is "the probability of the data, conditional on the hypothesis being true".  This is the likelihood.
<img src="/img/conditional.png" width="550px"/>

---

# Joint probability

* We can calculate the **joint probability** that both D and H are true:
  <img src="/img/conditional2.png"/>

  $$P(D,H) = P(D|H) \times P(H)$$

* It's perfectly valid to swap D and H!

  $$P(D,H) = P(H|D) \times P(D)$$

---

# Bayes' theorem

* This leads to something outrageous and wonderful:

![](/img/bayes.png)

---

# Belief

* This formula has some strange quantities.
  * $P(D|H)$ is the likelihood.
  * $P(D)$ is the probability of the data. *Weird.*
  * $P(H)$ is the probability of the hypothesis without any data.
* If we have no data, then we can only work with our *prior belief*.
  * $P(H|D)$ is then our updated belief *after we have seen the data*.  It is the posterior belief.


---

# Reasons why people don't like Bayes' theorem

* "Belief doesn't seem scientific."
* "How am I supposed to decide what my prior belief is?"
* "The prior is biasing your study."
* Too much weird math.

![](https://imgs.xkcd.com/comics/modified_bayes_theorem.png)

---

# Embrace the prior

<table>
  <tr>
    <td style="font-size: 20pt;">
        <ul>
            <li>Priors are natural: I have an expectation that when I toss a coin toss, it will come up heads about 50% of the time.</li>
            <li>Priors are flexible (unless you have very little data).</li>
            <li>(right) Updating prior with 10, 50 and 250 coin tosses given true probability is 50%.</li>
        </ul>
    </td>
    <td width="55%">
        <img src="/img/update-prior.png" width="700px"/>
    </td>
  </tr>
</table>

---

# Choosing your prior

<table>
  <tr>
    <td style="font-size: 20pt;">
      <ul>
      <li>There are many probability distributions that we can use as priors.</li>
      <li>Distributions have different limits (*e.g.*, bounded on the left)</li>
      <li>People tend to prefer setting distributions to be "uninformative".</li>
      <li>Be careful!  What seems uninformative might not be.</li>
      </ul>
    </td>
    <td width="50%">
      <img src="/img/priors.png" width="600px"/>
    </td>
  </tr>
</table>

---

# Hyperparameters

* Prior distributions have one or more parameters.
  * For example, the uniform distribution has lower and upper limits.
* Since we want to use "parameters" to refer to those in the model we are trying to fit, we call this other set "hyperparameters".
* We might also use previously collected data to choose hyperparameters.
  * For example, the mean hyperparameter of a Gaussian prior can be the mean of a previous data set.  (This is hierarchical Bayes

---

# Getting rid of P(D)

* We could calculate $P(D)$ exactly by integrating $P(D|H)$ over *all possible hypotheses*:
  $$P(D) = \int_H P(D|H) P(H)$$

* It is often not possible to solve for this integral.
* We need to take a different approach...

---

# What do we *really* want?

* We don't really care what the absolute posterior value is for a given value $H$ &mdash; we want to know relative differences.
* Since the data are not going to change, we can just drop it:

$$P(H|D) \propto P(D|H) P(H)$$

* We usually can't write down a [closed form expression](https://en.wikipedia.org/wiki/Closed-form_expression) for P(H|D) as a distribution function.
* The next best thing would be to generate a random sample from this distribution.

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







