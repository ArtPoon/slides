# MIMM4750G
## Model selection
![](/img/xkcd-curves-crop.png)

---

# Review: Markov chains

* A Markov process or "chain" is a model of how a system changes state over time (or some other linear dimension).
  * It is "Markov" if the probability of the next state depends only on the current state, and nothing else before.
* A Markov chain is defined by transition probability or rate matrix, for discrete- and continuous-time processes, respectively.

---

# A random walk is a Markov process

![](https://upload.wikimedia.org/wikipedia/commons/8/85/Random_walk_2500_animated.gif)

<small><small>
Image source: Wikimedia Commons, <a href="https://commons.wikimedia.org/wiki/File:Random_walk_2500_animated.gif">Random walk 2500 animated</a>
</small></small>

---

# Review: Substitution models

* A substitution is the replacement of one nucleotide or amino acid with another in a population.
* We model the accumulation of substitutions with continuous-time Markov chains.
  * A substitution model is defined by a transition rate matrix, which includes the stationary distribution of base frequencies.
* The simplest model is the Jukes-Cantor (JC69), in which all rates and frequencies are equal.

---

# Review: Likelihood

* The likelihood is the probability of the data as we change the parameters of the model (hypothesis).
* The maximum likelihood estimate are the parameter values that maximize the likelihood of the data.
* To reconstruct a tree by maximum likelihood, we need to:
  1. Calculate the likelihood of a tree (given a substitution model).
  2. Explore the space of all possible trees.

---

# Review: Calculating tree likelihood

* Jointly estimate the tree (branching order, lengths) and model parameters (substitution rates, rate variation).
* Starting from the tips, we calculate the likelihood at each branch:

$$P_{ij}(t) = (1-e^{-r_{ij} t})\pi_j \textrm{, for  } i\ne j$$

* Averaging over all possible ancestral states:

$$P_{j}(t) = \sum_{i\in \{A,C,G,T\}} P_{ij}(t)$$

---

# Why does the model matter?

* There are an enormous number of possible time-reversible models of nucleotide substitution.
* Using the wrong model (*model misspecification*) can bias estimates of other model parameters, *e.g.,* reconstructing the correct tree.
* The process of figuring out which model is best supported by the data is called *model selection*.

---

# Model selection

* We want to choose the model that has the best fit to the data.
* Adding parameters to the model improves the fit.
  * If we add too many parameters, we over-fit the data.
  * The model cannot be applied to other data.
  * We need to justify additional parameters!

<img src="https://upload.wikimedia.org/wikipedia/commons/6/68/Overfitted_Data.png" width="300px"/>

<small><small>
Image source: Wikmedia Commons, <a href="https://commons.wikimedia.org/wiki/File:Overfitted_Data.png">Overfitted data</a>
</small></small>

---

# Likelihood ratio test

* The *likelihood ratio test* (LRT) is a method of model selection that applies when one model is a special case of another.
  * *e.g.,* the JC69 model is a special case of HKY85 where $\kappa=1$.
* If the likelihood of model 1 (less complex) is $L_1$ and model 2 (more complex) is $L_2$, then this test statistic:
  $$-2\log\left(\frac{L_1}{L_2}\right) = -2(\log L_1 - \log L_2)$$
  follows a $\chi^2_k$ distribution.
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

# Nested models

* LRT requires that the models are *nested* - one model must be a special case of another.
* For example, HKY85 is a special case of TN93, where `$r_{AG}=r_{CT}$`.
* What if we want to select between models that are *not* nested?
* This is a basis for *hypothesis testing* - "Do the data support the addition of this parameter?"
> Briefly describe a biological problem where the LRT would be useful.

---

# Stepwise methods

* A hierarchical method of model selection when there are multiple predictor variables.
  * Forward selection starts from null model and adds most significant term.
  * Backward selection starts from full model and subtracts least significant term.
* Each step can be subjected to a likelihood ratio test.
* Need to adjust for multiple comparisons (multiple testing).

---

# Multiple testing

* A *p* value represents the probability of obtaining the observed data given the null hypothesis is true.
  * It is the probability of getting the result by chance.
* If we do [20 experiments](https://xkcd.com/882/), on average one of them will be significant at $\alpha=0.05$.
* A [Bonferroni correction](https://en.wikipedia.org/wiki/Bonferroni_correction) divides $\alpha$ by the number of tests.
  * Assumes tests are independent.

---

# MODELTEST

<img src="/img/modeltest.png" width="600px"/>

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

# AICc

* The AIC is approximately unbiased for large sample size and small numbers of variables.
* The corrected Akaike information criterion (AICc) was proposed by Hurvich and Tsai (1989) to deal with small samples ([Cavanaugh (1997)](https://www.sciencedirect.com/science/article/pii/S0167715296001289)):
$$\text{AICc} = n \log \hat\sigma_n^2 + \frac{n(n+k)}{n-k-2}$$

  where $k$ is the number of parameters, $n$ is the sample size, and:

$$\hat\sigma_n^2 = \frac{1}{n}\sum_i (y_i-\hat\beta x_i)^2$$

---

# Limitations of AIC
* Assumes independent observations
  * Genetic sequences are related by common ancestors
* Exploring model space entails long running times
* Selecting the best substitution model does not necessarily produce the most accurate tree ([Abadi et al. (2020)](https://academic.oup.com/mbe/article/37/11/3338/5862639)).



---

# Suggested readings

