# MBI 4750G
## Birth-death models II
![](https://imgs.xkcd.com/comics/ultimate_game.png)

---

# Review: Birth-death models

* We model the birth and death of lineages forward in time as a continuous-time Markov process.
* The simplest model assumes constant rates of birth and death.
* Assume that all surviving lineages are sampled at the same time (complete sampling).
* We need to relax these assumptions to model infectious diseases.

---

# Serial sampling

* Infections are sampled at different points in time.
  * The difference between sampling times is not negligible, relative to the molecular clock.
  * *e.g.*, an HIV-1 lineage gains about 2 substitutions per month, on average.

<img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Viral_Phylodynamics_Flutree.svg" height="250px"/>

<small><small>
A phylogeny of influenza A virus (H3N2) infections sampled between 1968 and 2002.
Source: Trevor Bedford, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Viral_Phylodynamics_Flutree.svg).
</small></small>

---

# Serial sampling

<table>
  <tr>
    <td style="font-size: 18pt">
      <ul>
        <li>The birth-death model with incomplete sampling was extended by <a href="https://en.wikipedia.org/wiki/Tanja_Stadler"/>Dr. Tanja Stadler</a> (right) in 2010.</li>
        <li>Any lineage can become sampled at a constant rate, $\psi$.</li>
        <li>A sampled lineage immediately goes extinct, not leaving any descendants.</li>
        <li>$\psi$ is different from the sampling probability $\rho$, which was only applied to tips at present.</li>
      </ul>
    </td>
    <td width="30%">
      <img src="https://upload.wikimedia.org/wikipedia/commons/1/1d/ETH-BIB-Stadler%2C_Tanja_%281981-%29-Portr_17419.jpg"/>
      <small>
      Image source: <a href="https://commons.wikimedia.org/wiki/File:ETH-BIB-Stadler,_Tanja_(1981-)-Portr_17419.jpg">Wikimedia Commons</a>.
      </small>
    </td>
  </tr>
</table>

---

# Application to HIV-1

* One of the first applications of Stadler's birth-death model with serial sampling was to the [Swiss HIV Cohort Study](https://academic.oup.com/ije/article/39/5/1179/799735).

<img src="/img/stadler-hiv.png" height="250px"/>

<div style="word-wrap: break-word; width: 80%; margin: auto; font-size: 16pt; font-weight: normal;">
Black points represent sampling dates for 10 HIV-1 sub-epidemics in Switzerland; <font color="red">red</font> and <font color="blue">blue</font> points represent BD estimates with linked and unlinked rates.
</div>

<small><small>
Image source: Stadler <i>et al.</i> (2012) Estimating the basic reproductive number from viral sequence data. <a href="https://academic.oup.com/mbe/article/29/1/347/1750040">Mol Biol Evol 29(1):347</a>.
</small></small>

---

# Birth-death skylines

* Extended the serial sampling model to allow varying birth and death rates over time.
* Like the coalescent skyline, the tree is partitioned into $m$ time intervals.
  * Each interval has its own rate of birth ($\lambda_i$), death ($\mu_i$) and sampling ($\psi_i$).

<img src="/img/stadler-kuhnert-fig4.png" height="200px"/>

<small><small>
Image source: Stadler, Kuhnert <i>et al.</i> (2013) <a href="https://www.pnas.org/doi/10.1073/pnas.1207965110">Proc Natl Acad Sci 110(1):228</a>.
</small></small>

---

<table>
  <tr>
    <td style="font-size: 18pt;">
      <h1>Effective reproduction number</h1>
      <ul>
        <li>Like the coalescent skyline, the number of time intervals must be specified by the user.</li>
        <li>Birth-death skylines are estimated with equal time intervals.</li>
        <li>
        The effective reproduction number is a function of these rates:
        $$R_e = \frac{\lambda}{\mu+\psi}$$
        </li>
        <li>$R_e(t)$ is the expected number of transmissions from a single infected individual at time $t$.</li>
      </ul>
      <small><small>
      Image source: Stadler, K&uuml;hnert <i>et al.</i> (2013) <a href="https://www.pnas.org/doi/10.1073/pnas.1207965110">Proc Natl Acad Sci 110(1):228</a>.
      </small></small>
    </td>
    <td width="33%">
      <img src="/img/stadler-kuhnert-fig2.png"/>
      Birth-death skyline for HIV-1 in the UK.
    </td>
  </tr>
</table>

---

# Birth-death SIR

<table>
  <tr>
    <td>
    <img src="https://royalsocietypublishing.org/cms/asset/ad72f3d7-f349-403a-a02b-ad086db3e062/rsif20131106f02.jpg" height="250px"/>
      <li>The BD skyline allows $\lambda$ and $\mu$ to vary freely over time, as though shaped by changes in behaviour.</li>
      <li>Dr. Denise K&uuml;hnert introduced a birth-death model where these rates are controlled by the SIR model.</li>
    </td>
    <td style="vertical-align: middle;">
      <img src="https://groupleaders.mpdl.mpg.de/wp-content/uploads/2021/07/256-316.jpg" height="200px"/>
      <small>
      Image source: Max Planck Digital Library.
      </small>
    </td>
  </tr>
</table>

<small><small>
Image source: K&uuml;hnert <i>et al.</i> (2014) <a href="https://royalsocietypublishing.org/doi/full/10.1098/rsif.2013.1106"/>Journal of the Royal Society Interface 11: 20131106</a>.
</small></small>

---

Reconstructed SIR trajectories (top) and effective reproduction ratio (bottom) for an HCV epidemic in C&oacute;rdoba, Argentina.

<img src="https://royalsocietypublishing.org/cms/asset/ce814582-72ed-4e62-9ec9-4f2296fb6ce9/rsif20131106f06.jpg" height="150px"/>

<img src="https://royalsocietypublishing.org/cms/asset/28c689c3-91c3-40a3-a004-3430122b970a/rsif20131106f07.jpg" height="150px"/>

<small><small>
Image source: K&uuml;hnert <i>et al.</i> (2014) <a href="https://royalsocietypublishing.org/doi/full/10.1098/rsif.2013.1106"/>Journal of the Royal Society Interface 11: 20131106</a>.
</small></small>

---

# Back to BEAST2

* All of these birth-death models have been implemented in BEAST2.
  * Birth-death skyline must be installed as **BDSKY** package.
  * BDSIR model available in **phylodynamics** package.
<img src="https://taming-the-beast.org/tutorials/Skyline-plots/figures/install_bdsky.png" height="300px"/>

---

# Advantages over the standard coalescent

* The BDSIR model is directly linked to epidemiological parameters.
  * A coalescent skyline can recover shifts in $N_e$, but not whether those changes are due to changes in birth (transmission) or death (recovery).
* The birth-death process is stochastic.
  * The coalescent uses deterministic growth models, although stochastic versions exist.
* Birth-death models can more naturally handle selection (differences in growth rates).
* Birth-death models do not assume small sample sizes.

---

# Limitations of birth-death models

* The birth-death model with serial-sampling assumes that sampled infections are never transmitted onwards.
  * This assumption is relaxed by the skyline model (varying $\psi_i$).
* Some parameters of BD models are confounded
  * There are an infinite number of parameter combinations with equal support, even with unlimited data.

<img src="/img/bd-congruence.png" width="550px"/>

<small><small>
Image source: Louca <i>et al.</i> (2021) <a href="https://academic.oup.com/mbe/article/38/9/4010/6278301">Mol Biol Evol 38(9): 4010</a>.
</small></small>

---

# Phylodynamics

* Phylodynamics is the reconstruction of epidemiological and immunological dynamics from the shape of a phylogenetic tree relating infections.

<img src="/img/grenfell-trees.png" height="300px"/>

<small><small>
Image source: Grenfell <i>et al.</i> (2004) Unifying the epidemiological and evolutionary dynamics of pathogens. <a href="https://www.science.org/doi/full/10.1126/science.1090727">Science 303: 327-332</a>.
</small></small>

---

<img src="/img/grenfell-table.png" height="500px"/>

---

# Phylodynamics and phylogenetics

* 