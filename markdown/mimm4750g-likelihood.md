# MIMM4750G
## Likelihood
![](https://imgs.xkcd.com/comics/prediction.png)

---

# Parameters and variables

* Recall that this is the binomial distribution:

`$$P(N,y\;|\;p) = {N\choose y} p^y (1-p)^{(N-y)}$$`

* **Parameters** ($p$) define the hypothesis, something we cannot directly observe.
* **Variables** ($N, y$) comprise the data, things that we have measured.

---

# Probability and inference

* When we are taught about probability distributions, we are shown how to calculate the probabilities of different outcomes (data), for given parameters (hypothesis).

* *e.g.*, the probabilities for $y={0, 1, \ldots, 10}$ and $N=10$, given $p=0.5$:
![](/img/binomial.svg)

* **But we already have the data!** What we want to learn about is the hypothesis!

---

# Likelihood

<table>
  <tr>
    <td width="60%">
    <ul>
      <li>What are the parameters that are the most likely to have produced our data?</li>
      <li>Instead of changing the data, we need to look at how the probability of our data changes with varying parameters.</li>
      <li>We have to change how we think about probability...</li>
    </ul>
    </td>
    <td>
    <div id="bin3d" class="fig-container"
      data-fig-id="fig-bin3d"
      data-file="/include/binomial3d.html"
      style="height:300px">
    </div>
    <small>
    An interactive animation of the binomial distribution for N=10 and 10 values of p.
    </small>
    </td>
  </tr>
</table>

---

<section data-state="seeing-slide">
    <div id="seeing" class="fig-container"
         data-fig-id="fig-seeing"
         data-file="https://seeing-theory.brown.edu/bayesian-inference/index.html#section2"
         style="height:800px">
    </div>
</section>

---

# Likelihood

* The term *likelihood* is a signal that we using the PDF to consider the probability of the data for different parameter values (hypotheses).
  * Since summing across parameters does not sum to 1, all that matters is the *relative* difference in likelihood.
* Drop factors independent of parameters, *e.g.*, `${N\choose y}$`:
  `$$P(N,y\;|\;p) \propto p^y (1-p)^{(N-y)}$$`
* Sometimes we replace the $P$ with $\mathcal{L}$, *e.g.,* $\mathcal{L}(p|N,y)$

---

# Maximum likelihood

* Trying to learn about the world by determining parameter values that maximize the likelihood of the model, given the data.
* These parameter values are the *maximum likelihood estimates* (MLE).
* They are only as useful as the model is an accurate representation of reality.

---

# Finding the MLE

* To estimate the parameter that maximizes likelihood, we can use first-year calculus (ha!)

$$\begin{align}
  \mathcal{L}(p|N,y) & \propto p^y (1-p)^{N-y} \\\\[6pt]
  \log(\mathcal{L}) & \propto y\log(p) + (N-y)\log(1-p) \\\\[6pt]
  \frac{d\log(\mathcal{L})}{dp} & \propto \frac{y}{p} + (-1)\frac{N-y}{1-p}
\end{align}$$

* If we set the left side to 0, some algebra gives us `$\;\hat{p} = y/N$`.

---

# Log-likelihood

* As we add more data, the likelihood gets smaller:

$$P(\text{everything}) = P(\text{first thing}) \times P(\text{another thing})\\\\ \times \ldots P(\text{last thing})$$

* Taking the $\log$ of a very small value gives you a very negative number:
  $\log(3.45\times 10^{-73}) = -166.8503$
* The log likelihood should never be greater than zero (although some programs rescale L to avoid [numerical overflow](https://en.wikipedia.org/wiki/Fixed-point_arithmetic#Precision_loss_and_overflow)).

---

# How does this apply to trees?

* As long as we have a model of evolution that gives us the probability of some outcome, we can use the data to calculate likelihoods.
* For reconstructing trees, the parameters include:
  * the distribution of branches relating the sequences
  * the lengths of those branches
  * parameters of the model of evolution along those branches
* To calculate the likelihood of a tree, we work one branch at a time.

---

# Branch likelihood

* Suppose the ancestor and descendant on either side of a branch are separated by time $t$.
* Given matrix of instantaneous rates $Q$, the transition probability from $X$ to $Y$ after $t$ is calculated by the matrix exponential:

$$P=\exp(Qt)$$

* This is the same calculation used to solve the Jukes-Cantor model.

---

# Example

<table>
<tr>
<td>

`$$Q=\begin{matrix}
 & \begin{matrix} \hspace{1ex}A & \hspace{1ex}C & \hspace{1ex}G & \hspace{1ex}T\end{matrix} \\
\begin{matrix}A\\C\\G\\T\end{matrix} &
\begin{pmatrix}
-4 & 1 & 2 & 1\\
1 & -4 & 1 & 2\\
2 & 1 & -4 & 1\\
1 & 2 & 1 & -4\\
\end{pmatrix}
\end{matrix}
\times 10^{-3}
$$`

<ul>
<li>Rows represent the <i>ancestral</i> state.</li>
<li>Set diagonal so that each row sums to 0.</li>
<li>Columns represent the <i>derived</i> state.</li>
<li>Set transition rate to be $2\times$ higher than transversion rates.</li>
</ul>

</td>

<td width="45%">
<small>
Calculating transition probabilities $P=\exp(Qt)$ for different values of <i>t</i>:
</small>
<img src="/img/transprob.png" width="500px"/>
</td>

</table>

---

# Stationary frequencies

* There must be some ancestor below the root, but we don't know what it is.
* We assume the probabilities of nucleotides at the root follow a *stationary distribution* (result after an infinite amount of evolution).
  * These frequencies are usually represented by `$(\pi_A, \pi_C, \pi_G, \pi_T)$`.
  * Think of this as a distribution from which we draw an *initial state* at the root.
* We can set $\pi$ to the observed frequencies in the alignment, or estimate from the data.

---

# Maximum likelihood heuristics

* We cannot solve the MLE because the space of trees is not [continuously differentiable](https://en.wikipedia.org/wiki/Differentiable_function).
* As long as we can calculate the likelihood for a specific set of parameters, we can search parameter space for the MLE (*optimization*).
  * This is a [heuristic search method](https://en.wikipedia.org/wiki/Heuristic_(computer_science)) &mdash; a relatively simple method for solving a problem that is not guaranteed to be right.
* For phylogenies, this requires a way to move through the space of trees.

---

# Optimization

* A major challenge of optimization heuristics is that there can be multiple "peaks" (locally optimal solutions)
* A "greedy" heuristic that searches for the MLE by always tuning parameters to increase likelihood.
* A more robust heuristic should have some strategy for climbing down local peaks.
![](https://upload.wikimedia.org/wikipedia/commons/d/d5/Hill_Climbing_with_Simulated_Annealing.gif)

<small><small>
Image source: Wikimedia Commons, <a href="https://commons.wikimedia.org/wiki/File:Hill_Climbing_with_Simulated_Annealing.gif">Hill climbing with simulated annealing</a>.
</small></small>

---

# Random restarts

* Where we end up with a heuristic search will depend on where we start!
* Begin searches at different parameter combinations to sample different peaks.
* Starting with a pretty good guess: many ML-based tree reconstruction programs will initiate the search at a distance-based tree (such as NJ).

---

# Moving through tree space

* It is fairly intuitive how we explore a numerical space, but how do we move from one tree to another?
* Is tree A closer to tree B or C?

<img src="/img/comparing-trees.png" width=700/>

---

# Tree rearrangements

![](https://media.springernature.com/lw785/springer-static/image/prt%3A978-1-4939-2864-4%2F14/MediaObjects/978-1-4939-2864-4_14_Part_Fig1-256_HTML.gif)
* Nearest-neighbor interchange: swap subtrees that are connected by a single branch.
* Small moves are easier to make, but can be slow to traverse tree space.

<small><small>
Image source: B Dasgupta <i>et al.</i> (2016) <a href="https://doi.org/10.1007/978-1-4939-2864-4_256">Encyclopedia of Algorithms</a>.
</small></small>

---

# Tree rearrangements (2)

<img src="/img/5692f1.jpeg" width="500px"/>

* Subtree pruning and regrafting: move a subtree to an entirely different location in the tree.

<small><small>
Image credit: Marc Suchard (2005) <a href="https://doi.org/10.1534/genetics.103.025692">Stochastic Models for Horizontal Gene Transfer: Taking a Random Walk Through Tree Space</a>. Genetics 170(1): 419-431.
</small></small>

---

<section data-background="#333" style="color:white">

<h1 style="color:white">Key points</h1>

* The maximum likelihood estimate is the set of parameter values for which a model has the highest probability of producing the data.
* Likelihoods are usually computed as log values to avoid numerical underflow.
* We can compute the likelihood of a tree if we have a transition rate matrix $Q$ and stationary distribution $\pi$.
* We search for the ML tree by traversing different trees via rearrangements.

</section>
