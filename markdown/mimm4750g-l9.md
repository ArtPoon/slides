# MIMM4750G
## Probability and likelihood
<img src="https://imgs.xkcd.com/comics/increased_risk.png" width="250px"/>

---

# Probability

* What is the probability of getting 5 heads in 10 coin tosses?
* Let the probability of heads is $p$ &mdash; this is a *parameter* (hypothesis).
* Let the number of heads ($y=5$) and tosses ($N=10$) be our *data*.
* As usual, let's make some assumptions:
  1. My coin tossing is truly random.
  2. The coin tosses are independent - one result does not influence another.
  3. $p$ is constant - the coin and my tossing action do not change.

---

# Binomial probability

* The probability of the data (N,y) given the hypothesis (p) can be described by the *binomial model*:

  $$P(N,y\;|\;p) = {N\choose y} p^y (1-p)^{(N-y)}$$

* ("**Bi**nomial" indicates *two* and only two outcomes.)
* The probability distribution looks like this:

  ![](/img/binomial.svg)

---


