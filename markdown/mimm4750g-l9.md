# MIMM4750G
## Probability and likelihood
<img src="https://imgs.xkcd.com/comics/increased_risk.png" width="300px"/>

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
<img src="https://imgs.xkcd.com/comics/geeks_and_nerds.png" width="300px"/>

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

# Likelihood

* The term *likelihood* is a signal that we using the PDF to measure the probability of the **hypothesis** given the **data**.
* Since summing across parameters does not sum to 1, all that matters is the *relative* difference in likelihood.
* Might as well drop factors independent of parameters, *e.g.*, ${N\choose y}$:
  $$P(N,y\;|\;p) \propto p^y (1-p)^{(N-y)}$$
* Sometimes we replace the $P$ with $\mathcal{L}$, *e.g.,* $\mathcal{L}(p|N,y)$

---

# Maximum likelihood

* Trying to learn about the world by determining parameter values that maximize the likelihood of the model, given the data.
* These parameter values are the *maximum likelihood estimates* (MLE).
* They are only as useful as the model is an accurate representation of reality.

---

# Finding the MLE

* To estimate the parameter that maximizes likelihood, we can use first-year calculus (ha!)

\begin{align}
  \mathcal{L}(p|N,y) & \propto p^y (1-p)^{N-y} \\\\[6pt]
  \log(\mathcal{L}) & \propto y\log(p) + (N-y)\log(1-p) \\\\[6pt]
  \frac{d\log(\mathcal{L})}{dp} & \propto \frac{y}{p} + (-1)\frac{N-y}{1-p}
\end{align}

* If we set the left side to 0, some algebra gives us $\;\hat{p} = y/N$.

---

# Log-likelihood

* As we add more data, the likelihood gets smaller:

`$$P(\text{everything}) = P(\text{first thing}) \times P(\text{another thing})\\\\ \times \ldots P(\text{last thing})$$`

* Taking the $\log$ of a very small value gives you a very negative number:
  $\log(3.45\times 10^{-73}) = -166.8503$
* The log likelihood should never be greater than zero (although some programs rescale L to avoid [numerical overflow](https://en.wikipedia.org/wiki/Fixed-point_arithmetic#Precision_loss_and_overflow)).
* The MLE is the log-likelihood that is the least negative.

---

# ML tree reconstruction

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
<td><img src="/img/transprob.png" width="500px"/></td>
</table>

---

# Felsenstein's pruning algorithm

<table>
  <tr>
  <td>
  <ul>
    <li>We don't know the ancestral state, so we have to sum over all possibilities throughout the entire tree.</li>
    <li>This would require a lot of calculations, but we can use <a href="https://en.wikipedia.org/wiki/Dynamic_programming">dynamic programming</a> to store results.</li>
    <li>Start from the tips, work our way down &mdash; <a href="https://en.wikipedia.org/wiki/Tree_traversal"/>post-order traversal</a>.</li>
    <li>All calculations above the node can be retrieved from storage.</li>
  </ul>
  </td>
  <td><img src="/img/pruning.png" width="500px"/></td>
  </tr>
</table>

---

# Stationary frequencies

* There must be some ancestor below the root, but we don't know what it is.
* We assume the probabilities of nucleotides at the root follow a *stationary distribution* (result after an infinite amount of evolution).
* These frequencies are usually represented by `$(\pi_A, \pi_C, \pi_G, \pi_T)$`.
* Set to the observed frequencies in the alignment, or estimate from the data.

---

# Maximum likelihood heuristics

* As long as we can calculate the likelihood for a specific set of parameters, we can search parameter space for the MLE (*optimization*).
* Heuristic search methods (again!)
* For phylogenies, this requires a way to move through the space of trees.
* First proposed by [Joe Felsenstein](https://en.wikipedia.org/wiki/Joseph_Felsenstein).

---

# Optimization

* A major challenge of optimization heuristics is that there can be multiple "peaks" (locally optimal solutions)
* A "greedy" heuristic that searches for the MLE by always tuning parameters to increase likelihood.
* A more robust heuristic should have some strategy for climbing down local peaks.
![](https://upload.wikimedia.org/wikipedia/commons/d/d5/Hill_Climbing_with_Simulated_Annealing.gif)

---

# Other strategies

* Random restarts - begin searches at different parameter combinations to sample different peaks.
* Starting with a pretty good guess: many ML-based tree reconstruction programs will initiate the search at a distance-based tree (such as NJ).

---

# Tree rearrangements

![](https://media.springernature.com/lw785/springer-static/image/prt%3A978-1-4939-2864-4%2F14/MediaObjects/978-1-4939-2864-4_14_Part_Fig1-256_HTML.gif)
* Nearest-neighbor interchange: swap subtrees that are connected by a single branch.
* Small moves are easier to make, but can be slow to traverse tree space.

<small>
Image credit: B Dasgupta <i>et al.</i> (2016) Encyclopedia of Algorithms. https://doi.org/10.1007/978-1-4939-2864-4_256
</small>

---

# Tree rearrangements (2)

<img src="https://www.genetics.org/content/genetics/170/1/419/F1.large.jpg" width="500px"/>

* Subtree pruning and regrafting: move a subtree to an entirely different location in the tree.

<small>
Image credit: Marc Suchard (2005) Genetics 170. https://doi.org/10.1534/genetics.103.025692
</small>

---

# Software

* [IQ-Tree](http://www.iqtree.org/)
* [FastTree2](http://www.microbesonline.org/fasttree/)
* [RAxML](https://cme.h-its.org/exelixis/web/software/raxml/index.html)
* [PhyML](http://www.atgc-montpellier.fr/phyml/)
* [MEGA](https://www.megasoftware.net/)
