# Likelihood-free inference on tree shapes with kernel methods
## Art Poon
### Western University, London, Canada

---

# Learning from tree shapes
* *Phylodynamics* is the study of how phylogenetic trees are shaped by biological processes
* Roots in speciation models?
* Presently dominated by applications in infectious diseases (*e.g.*, influenza A virus, HIV)

---

# Lineages through time
![](/img/nLTT.svg)

---

# Coalescent
![](/img/coalescent-exponential.svg)

---

# Components of tree shapes

1. Branching order (topology)
2. Branch lengths (node heights)

LTT and coalescent have closed form solutions on node heights.

---

# Tree topologies are difficult to measure

* Imbalance statistics

* *e.g.,* Sackin's index: $\sum_{i=1}^{n} I_i/n$, where $I_i$ is depth of $i$-th tip

* But see Colijn (2016 MBE; 2014 EMPH)


---

# Kernel methods

* Consider complex objects $x_1, x_2 \in \mathcal{X}$

* Kernel function $\phi $ maps objects from $\mathcal{X}$ to a high dimensional feature space $\mathcal{F}$

* Feature space is extremely large!

* Taking inner product of two objects mapped to $\mathcal{F}$ skips over an enormous number of absent features

---

## Adapted a kernel from natural language processing

 `$$K(T_1, T_2) = \sum_{n_1\in T_1}\sum_{n_2\in T_2} \Delta(n_1, n_2)$$`
 `$$\Delta(n_1, n_2) = \lambda \times \begin{cases} 1 & \text{if both tips} \\ & \\  k_G(n_1,n_2) (1\!+\!\Delta(n_1', n_2')) & \\ \;\;(1\!+\!\Delta(n_1'', n_2'')) & \text{otherwise} \end{cases}$$`

 where $n_i'$ and $n_i''$ are left and right children of $n_i$.

 `$$k_G(n_1,n_2) = \exp\left(\frac{-|| l_1-l_2 ||^2}{2\sigma} \right)$$`

---

## Kernels can be useful for phylodynamics

* An exhaustive similarity measure
* Compares both topology and branch lengths
* Trees with different labels
* Trees of different size (number of tips, tree length)

---

<!-- .slide: class="two-floating-elements" -->
## Application: Contact networks

<table>
<tr>
<td width=50%>
    <ul>
    <li>Host populations are structured by contact networks</li>
    <li>Infectious diseases with lower transmission rates spread along intimate/repeated contacts</li>
    <li>Can we infer parameters of network structures from phylogenies?</li>
    </ul>
</td>
<td>![](/img/component.svg)</td>
</tr>
</table>

---

## Preferential attachment models

* "Rich get richer" degree distribution can resemble contact networks

* Barabasi-Albert algorithm:

 1. Initialize graph with clique of size $n_0$
 2. Add a node with $m$ out-edges
 3. Join each edge to $i$-th node with probability $P_i \propto k_i^\alpha+1$ where $k_i$ is its degree size
 4. Repeat step 2 until network has target size $n$

---

<table>
<tr><td>$\alpha=0.8$</td><td>$\alpha=1.2$</td></tr>
<tr>
    <td>![](/img/bagraph0-8.ps.svg)</td>
    <td>![](/img/bagraph1-2.ps.svg)</td>
</tr>
</table>

---

## Approximate Bayesian computation

* Fit a model by adjusting its parameters until it yields simulations that resemble the data

* Tree shape kernel provides a similarity measure for evaluating simulations

* ABC with Sequential Monte Carlo:  each particle is a parameter vector

---

## Used ABC-SMC to fit BA model to tree

* Sequential Monte Carlo with 1000 particles

* Simulated $n=5$ networks and trees per particle

* Used tree shape kernel as similarity measure

---

![](/img/netabc-posteriors.svg)

<small>McCloskey, Liang and Poon (2016) Virus Evolution, vew031</small>