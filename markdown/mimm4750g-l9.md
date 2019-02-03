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

# Properties of a probability distribution

* A probability distribution function (PDF) can be *discrete* or *continuous*. 
* The binomial PDF is discrete. There can be either 1 or 2 heads but never 1.5.
* A PDF *must* sum to 1 (100%) across all possible data outcomes, *for a given hypothesis*.
![](https://imgs.xkcd.com/comics/geeks_and_nerds.png)

---

# Probability and inference

* When our model of some biological or epidemiological process is simple enough, we may be able to calculate the probability distribution.
* This is the probability of the *data* given the *hypothesis*.
* **But we already know the data!** What we want to learn about is the hypothesis!

---

# Likelihood

  
  
* This probability distribution
  
  $P(N,y\;|\;p) = {N\choose y} p^y (1-p)^{(N-y)}$
  
   has two sets of variables:
  1. Parameters that define the hypothesis (*p*).
  2. Variables that comprise the data (*N*, *y*).

---

<section data-state="bin3d-slide">
    <div id="bin3d" class="fig-container"
         data-fig-id="fig-bin3d"
         data-file="/include/binomial3d.html"
         style="height:900px">
    </div>
</section>

---

  
  