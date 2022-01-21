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
<small><small>
Islands in tree space.  Source: Whidden and Matsen (2015) <a href="https://doi.org/10.1093/sysbio/syv006">Syst Biol 64</a>.
</small></small>

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

* We are used to thinking about the probability of an outcome, $P(D)$
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
      <li>Distributions have different limits (<i>e.g.</i>, bounded on the left)</li>
      <li>People tend to prefer setting distributions to be "uninformative".</li>
      <li>Be careful!  What seems uninformative might not be.</li>
      </ul>
    </td>
    <td width="45%">
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
  * For example, the mean hyperparameter of a Gaussian prior can be the mean of a previous data set <i>i.e.,</i> hierarchical Bayes.

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

* Our posterior belief is *proportional* to our prior belief, times the likelihood of the data.

---

# Conjugate priors

* In some cases, multiplying the likelhood and prior yields a posterior distribution that is the same type as the prior.
* In these cases, the prior distribution is called a *conjugate prior*.

| Likelihood | Prior      | Posterior |
|------------|------------|-----------|
| Binomial   | Beta       | Beta      |
| Negative binomial | Beta  | Beta |
| Poisson | Gamma | Gamma |
| Geometric | Beta | Beta |
| Exponential | Gamma | Gamma |
| Normal (unknown mean) | Normal | Normal |
| Normal (unknown variance) | Inverse gamma | Inverse gamma |
| Multinomial | Dirichlet | Dirichlet |

---

# Beta-binomial

* Remember the likelihood of coin tosses is modeled with a binomial distribution:
  $$L\propto p^y (1-p)^{N-y}$$
* The beta distribution is a good choice for probability parameters, because it is bounded on the interval [0,1]:
  $$\mathrm{Beta}(\alpha,\beta)=\frac{1}{B(\alpha,\beta)} p^{\alpha-1}(1-p)^{\beta-1}$$


---

* The posterior updates the hyperparameters $\alpha$ and $\beta$ to $\alpha+y$ and $\beta+N-y$.
![](/img/beta-binom.svg)

---

# Sampling from the posterior

* We usually can't write down a [closed form expression](https://en.wikipedia.org/wiki/Closed-form_expression) for P(H|D) as a distribution function.
* The next best thing would be to generate a random sample from this distribution.
* There are a number of ways to go about this (rejection sampling), but we will focus specifically on Markov chain Monte Carlo (MCMC) sampling.

---

# Suggested readings

<table><tr>
<td><ul>
<li><a href="https://seeing-theory.brown.edu/bayesian-inference/index.html">Seeing Theory: A visual introduction to probability and statistics.</a> Brown University. <b>Highly recommended!</b></li>
<li><a href="https://www.nature.com/articles/s43586-020-00001-2">Bayesian statistics and modelling</a>.  Nature Reviews Methods Primers 1: 1.</li>
</ul></td>
<td width="33%">
<img src="https://imgs.xkcd.com/comics/bayes_theorem.png"/>
</td>
</tr></table>
