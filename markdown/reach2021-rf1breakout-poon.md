# What is clonality?

<img src="/img/clonality-lineages.png" height="300px"/>

* HIV-1 DNA sequences are imperfect labels, an outcome of a stochastic process (phylogeny)
* clonal expansion in the LVR is a birth-death processes ([Ferreira *et al.* 2021](https://doi.org/10.1093/ve/veaa104)).

---

# Simulation of within-host dynamics

<img src="https://raw.githubusercontent.com/PoonLab/twt/master/man/figures/README-unnamed-chunk-3-2.png" height="350px"/>

* [treeswithintrees](https://github.com/PoonLab/twt) - exact discrete event simulation in R
* outputs are easily modified to collapse branches in LVR

---

# Simulating dynamics in the LVR

<table><tr>
<td style="vertical-align: middle;"><img src="/img/simclone-model.png" height="250px"/></td>
<td><img src="/img/simclone.png" height="400px"/></td>
</tr></table>

* outputs trees on which we can simulate sequence evolution
* how much does clonality tell us about clonal expansion? (Emmanuel Wong, MSc candidate)

---

# *bayroot*: Bayesian root-to-tip regression in R

<img src="/img/bayroot.gif" height="300px"/>

* ML regression yields "point estimate"
* least-squares not a good model with early samples of HIV RNA, trying continuous Poisson model.
* use prior information (*i.e.*, seroconversion window, mutation rates)
