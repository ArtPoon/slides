# MBI 4750G
## Model selection
![](/img/xkcd-curves-crop.png)

---

# We are fitting many different models

* Substitution models are continuous-time Markov chains of how nucleotide sequences evolve.
* Demographic models describe how the size of a population changes over time &mdash; this changes the coalescence rate.
* Compartmental models describe how an epidemic spreads over time &mdash; this can be related to birth-death models.
* Which models should we use?

---

# Model selection

* The process of figuring out which model is best supported by the data is called *model selection*.
* Adding parameters to the model improves the fit.
  * If we add too many parameters, we over-fit the data and the model is not relevant to other data.
  * We need to justify additional parameters!

<img src="https://upload.wikimedia.org/wikipedia/commons/6/68/Overfitted_Data.png" width="300px"/>

<small><small>
Image source: Wikimedia Commons, <a href="https://commons.wikimedia.org/wiki/File:Overfitted_Data.png">Overfitted data</a>
</small></small>

---

# Likelihood ratio test

* The *likelihood ratio test* (LRT) is a method of model selection that applies when one model is a special case of another.
  * *e.g.,* the F81 model is a special case of HKY85 where $\kappa=1$.
* If the likelihood of model 1 (less complex) is $L_1$ and model 2 (more complex) is $L_2$, then this test statistic:
  $$-2\log\left(\frac{L_1}{L_2}\right) = -2(\log L_1 - \log L_2)$$
  follows a $\chi^2_k$ distribution ($L_2 \ge L_1$).
* $k$ is the difference in the number of parameters.

---

# $\chi^2$ distribution

<img src="/img/dchisq.png" width="400px"/>

```R
x <- seq(0, 10, length.out=100)
plot(x, dchisq(x, df=1), type='l', ylab='Probability density',
     xlab=expression(chi^2), cex.lab=1.2, ylim=c(0, 0.5), lwd=2)
```

---

# Stepwise methods

* A hierarchical method of model selection when there are multiple predictor variables.
  * Forward selection starts from a [null model](https://en.wikipedia.org/wiki/Null_model) and adds most significant term.
  * Backward selection starts from full model (all predictors) and subtracts least significant term.
* Each step can be subjected to a likelihood ratio test.
* Need to adjust for multiple comparisons (multiple testing).

---

# MODELTEST

<img src="/img/modeltest.png" width="650px"/>

* Hierarchical testing of 24 different substitution models with 4-5 tests ($\alpha=0.01$).

<small><small>
Image credit: Posada and Crandall (1998) <a href="https://academic.oup.com/bioinformatics/article/14/9/817/259559">MODELTEST: testing the model of DNA substitution</a>. Bioinformatics 14: 817-818.
</small></small>

---

# Akaike information criterion

* What if the models are not nested?
* The [Akaike information criterion](https://en.wikipedia.org/wiki/Akaike_information_criterion) (AIC) penalizes the model's likelihood ($L$) by the number of parameters ($k$).

* *There is no statistical distribution*!  **The best model minimizes the AIC.**

  $$\text{AIC} = 2k - 2\log\left(L(\hat{\theta})\right)$$

where $\hat\theta$ are the maximum likelihood estimates of model parameters.

---

# Limitations of AIC
* Assumes independent observations
  * Genetic sequences are related by common ancestors
  * Selecting the best substitution model does not necessarily produce the most accurate tree ([Abadi et al. (2020)](https://academic.oup.com/mbe/article/37/11/3338/5862639)).
* Exploring model space entails long running times
* AIC is not statistically consistent
  * Increasing the amount of data does not make it certain that AIC selects the correct model.

---

# Akaike weights

* The difference in AIC between model $i$ and the best model:
$$\Delta_i  = \textrm{AIC}_i - \min \textrm{AIC}$$
* The Akaike weight of a given model is calculated from these differences as:
$$w_i = \frac{\exp (-\Delta_i/2)}{\sum_j \exp(-\Delta_j/2)}$$
* $w_i$ is a number between 0 and 1 that can be interpreted as the probability that the $i$-th model is the best one.

---

# Bayesian model selection

* The likelihood ratio test (LRT) and AIC both require a single likelihood value for each model.
* If we are using a Bayesian method, then we are sampling likelihoods for many parameter settings for the different models!

<img src="/img/beast-traces.png" height="250px">

---

# Bayesian model averaging

* We can make the MCMC "jump" between two or more models.
* Reversible jump MCMC adds a variable that indicates which model we are currently sampling for.
  * The amount of time we spend in a particular model represents the posterior support for that model.
<table>
<tr>
<td><img src="/img/bModelTest.png" height="250px"></td>
<td width="300px"><small>
Output of running bModelTest in BEAST on primate mtDNA data.
The ModelIndicator variable represents different substitution models.
JC69 (model 0) was never sampled in 5,000,000 iterations.

</small></td>
</tr>
</table>


---

# Marginal likelihood

* A Bayesian version of the likelihood ratio test (LRT), except it is a ratio of marginal likelihoods.
* The marginal likelihood (*i.e.*, model evidence) is the probability of data $D$ given model $M$:
$$P(D|M) = \int_{\theta|M} P(D|M,\theta) P(\theta|M)$$
* $P(\theta|M)$ is our prior belief about the parameters given the model.
* $P(D|M,\theta)$ is the likelihood of the data given the model and a specific set of parameter values.

---

# Bayes factor

* The Bayes factor is: 
   $$BF = \frac{P(D|M_1)}{P(D|M_2)}$$
* Unlike the LRT, the BF does not have a theoretical null distribution that we can use to determine significance.

| Bayes Factor | Evidence against $H_0$ |
|--------------|------------------------|
| 1 to 3 | Not worth more than a bare mention |
| 3 to 20 | Positive |
| 20 to 150 | Strong |
| >150 | Very strong |

<small><small>
Source: Kass and Raftery (1995).  Bayes factors.  J Amer Stat Assoc 90(430): 773-795.
</small></small>

---

# How do we calculate the Bayes factor?

* The exact marginal likelihood is often very difficult integral to solve.
  * Since we are integrating over a probability, we are calculating an expected value, *i.e.*, a mean.
* Why not average over a relatively small random sample of $P(D|M, \theta)$ instead?
* MCMC already generates a random sample of $\theta$ (**yay!**), but it's from the <u>posterior</u> distribution $P(\theta,M|D)$, not the prior $P(\theta|M)$.

<center>
What if we just ignore this fact for now?
</center>

---

# Importance sampling

* Instead of integrating, we want to calculate the mean:
$$E[P(D|\theta)] = \frac{1}{N} \sum_{i=1}^{N} P(D|\theta) P(\theta)$$
* If we draw points at random from another distribution $g(\theta)$, we can calculate a weighted mean using weights $P(\theta_i) / g(\theta_i)$ and normalize:
$$E[P(D|\theta)] = \frac{
  \frac{1}{n}\sum_{i=1}^{N} P(D|\theta_i) P(\theta) g(\theta_i)^{-1}
}{
  \frac{1}{n}\sum_{i=1}^{N} P(\theta) g(\theta_i)^{-1}
}$$

---

# Harmonic mean estimator

* If we are drawing points from the posterior distribution, then $g(\theta) = P(D|\theta) P(\theta)$, which means:
$$E[P(D|\theta)] = \frac{
  \frac{1}{n}\sum_{i=1}^{N} \frac{P(D|\theta)P(\theta)}{P(D|\theta) P(\theta)}
}{
  \frac{1}{n}\sum_{i=1}^{N} \frac{P(\theta)}{P(D|\theta) P(\theta)}
} = \frac{1}{\frac{1}{n}\sum_{i=1}^{N} \frac{1}{P(D|\theta)}}$$

* This is the harmonic mean &mdash; the reciprocal of the arithmetic mean of reciprocal values:
$$\frac{1}{H[x]} = \frac{1}{N} \sum_{i=1}^{N} \frac{1}{x_i}$$

<small><small>
Derivation from <a href="https://phylo.bio.ku.edu/slides/HolderAustinSteppingstone.pdf">lecture slides</a> by Mark T. Holder, Paul O. Lewis, David L. Swofford, and David Bryant.
</small></small>

---

# Problems with HME

* A random sample from the posterior skews towards high likelihoods, causing HME to overestimate $P(D|\theta, M)$.
* A random sample from the prior is easier to generate, but it is unlikely to include $\theta$ from regions of high likelihood, underestimating $P(D|\theta, M)$.
  * This gets worse if we use an uninformative prior, or a really bad one!
* If the posterior is concentrated in a very small region of parameter space, then we are in big trouble.

---

# Example with the beta-binomial

<table>
  <tr>
    <td style="font-size: 18pt;">
      <ul>
      <li>Suppose our prior is Beta(10,1) and our data is 5 heads in 10 tosses.</li>
      <li>The true marginal likelihood is about 0.011</li>
      <li>A sample from the prior: $\{0.872, 0.898, 0.925, 0.931, 0.969\}$<br/>
       has an arithmetic mean likelihood = 0.0013</li>
      <li>A sample from the posterior: $\{0.587, 0.665, 0.73, 0.757, 0.82\}$<br/>
       has a harmonic mean likelihood = 0.05</li>
      </ul>
    </td>
    <td width="45%">
      <img src="/img/marginal-likelihood.svg" width="100%"/>
    <td>
  </tr>
</table>

---

# Path/stepping-stone sampling

* Recall that MCMC decides whether to accept a proposed step by the ratio of posterior probabilities.
* A "power posterior" modifies the posterior probability by a tuning parameter $\beta$:
$$R = \frac{P(D|\theta',M)^\beta P(\theta'|M)}{P(D|\theta,M)^\beta P(\theta|M)}$$ 
* By running multiple chains for different values of $\beta$ between 0 and 1, we can balance between prior and posterior samples of marginal likelihood.

---


<section data-background="#333" style="color:white">

<h1 style="color:white">Key points</h1>

* The likelihood ratio test (LRT) can be used if one model is a special case of the other.
* If models are not nested, we use the Akaike information criterion (AIC).
* Model selection is very challenging for Bayesian methods because we are working with sampled distributions.
  * Reversible-jump MCMC samples different models.
  * Bayes factor is the Bayesian version of LRT, but we need to calculate marginal likelihoods (hard!)

</section>
