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

# $\chi^2$-squared distribution

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

# AICc

* The AIC is approximately unbiased for large sample size and small numbers of variables.
* The corrected Akaike information criterion (AICc) was proposed by Hurvich and Tsai (1989) to deal with small samples ([Cavanaugh (1997)](https://www.sciencedirect.com/science/article/pii/S0167715296001289)):
$$\text{AICc} = n \log \hat\sigma_n^2 + \frac{n(n+k)}{n-k-2}$$

  where $k$ is the number of parameters, $n$ is the sample size, and:

$$\hat\sigma_n^2 = \frac{1}{n}\sum_i (y_i-\hat\beta x_i)^2$$

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

# Bayesian model selection

* An odds is a ratio of two probabilities.
* A Bayes factor is the ratio of the posterior odds against the prior odds for two models:
$$\mathrm{BF} = \frac{P(M_1|D)}{P(M_2|D)} \Big/ \frac{P(M_1)}{P(M_2)}$$

<img src="https://taming-the-beast.org/tutorials/NS-tutorial/figures/BFs.png" height="133px"/>

<small><small>
Image source: Kass, R. E., & Raftery, A. E. (1995). Bayes factors. Journal of the American Statistical Association, 90(430), 773–795.
</small></small>

---

# Marginal likelihood

* Using Bayes' rule, we can rewrite the Bayes factor as $\mathrm{BF} = P(D|M_1) / P(D|M_2)$
* Each model $M$ has some unknown parameters $\theta$. 
* The marginal likelihood of data $D$ given model $M$ is:
$$P(D|M) = \int_\theta P(D|M,\theta) P(\theta|M)$$

  * In other words, it is the likelihood of the data averaged over the entire prior distribution of $\theta$!

---

# Harmonic mean estimator

* The exact marginal likelihood is very difficult to compute.
* The alternative is to average over some sample of $P(D|M, \theta)$.
* MCMC already generates a random sample of $\theta$ from the posterior distribution.
* This can be used for what is called the harmonic mean estimator (HWE):
`$$P(D|M) \approx \frac{1}{N} \sum_{i=1}^N \frac{1}{P(D|M,\theta_i)},\;\mathrm{for}\; \theta_i \sim P(M|D)$$`

---

# Problems with HWE

* Remember, we need to average likelihoods for $\theta$ sampled from the prior $P(M)$, not the posterior!
* If the posterior is very different from the prior, then the HWE is a bad estimate.
* Why not just sample $\theta$ from the prior distribution?
  * The prior distribution is usually very broad 
  * A random sample from the prior is unlikely to include $\theta$ from regions of high likelihood.

---

# Path and stepping-stone sampling

* Current estimators use "power posteriors": `$\;q_\beta(\theta) = P(D|\theta,M)^\beta P(\theta|M)$`
  * $\beta$ is some value between 0 and 1, where $q_{0} = P(\theta|M)$.
  * Concentrate samples in regions of higher likelihood.
<table>
  <tr>
    <td><img src="/img/revbayes-stepping.png" height="300px"></td>
    <td><img src="/img/baele-path-sampling.png" height="270px"></td>
  </tr>
</table>
<small><small>
Image credits: (left) H&ouml;hna <i>et al.</i> (2019) <a href="https://revbayes.github.io/tutorials/model_selection_bayes_factors/bf_intro.html">RevBayes tutorial</a>; 
(right) Guy Baele (2016) <a href="https://si.biostat.washington.edu/sites/default/files/modules//2016_SISMID_13_10.pdf">Bayesian model testing</a>, lecture notes.
</small></small>

---

# Suggested readings

* [The likelihood ratio test: The theory - from "Linear Mixed Models in Linguistics and Psychology: A Comprehensive Introduction"](https://vasishth.github.io/Freq_CogSci/the-likelihood-ratio-test-the-theory.html)
* [Hirotogu Akaike's 90th Birthday - Google Doodle](https://www.google.com/doodles/hirotugu-akaikes-90th-birthday)
* [RevBayes, General Introduction to Model selection](https://revbayes.github.io/tutorials/model_selection_bayes_factors/bf_intro.html)
* [Bayesian Model Testing, Guy Baele](https://si.biostat.washington.edu/sites/default/files/modules//2016_SISMID_13_10.pdf)