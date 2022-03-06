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

# Birth-death skylines



---

# Birth-death SIR

