# MIMM4750G
## Ancestral reconstruction

<img src="https://imgs.xkcd.com/comics/birds_and_dinosaurs.png" height="450px">

---

# Maximum parsimony

<table>
  <tr>
    <td style="vertical-align: middle;">
      <ul>
        <li>Parsimony is the principle of selecting the simplest explanation/hypothesis</li>
        <li><i>Maximum parsimony</i> is attained by assigning ancestral states in the tree that minimize the number of changes required to explain the observed states.</li>
        <li>Fitch's method first propagates states from tips to root, and then resolves ancestral states upwards from the root.</li>
      </ul>
    </td>
    <td width="30%">
      <img src="https://journals.plos.org/ploscompbiol/article/figure/image?size=inline&id=info:doi/10.1371/journal.pcbi.1004763.g001"/>
      <small>
      Image credit: J Joy <i>et al.</i> (2016) Ancestral reconstruction.  PLOS Comput Biol 12: <a href="https://doi.org/10.1371/journal.pcbi.1004763"/>e1004763</a>.
      </small>
    </td>
  </tr>
</table>

---

# Limitations of parsimony

* Assumes that changes between all character states are equal.  Can be addressed with weighted parsimony method.
* Principle of minimum evolution, by definition, is not robust to episodes of rapid evolution.
* Implicitly assumes that the same amount of time has passed along every branch of the tree.
* No means of quantifying uncertainty of ancestral reconstruction.

---

# Reconstruction by maximum likelihood

* To fit a model of evolution to a tree, we have to calculate branch probabilities, $P(Y|X,t)$:
  * ancestral state $X$
  * descendant state $Y$
  * elapsed time $t$
* We can't directly observe ancestral states
* To calculate likelihood, we sum over all possible ancestral states.

---

# Marginal reconstruction

<table>
  <tr>
    <td style="vertical-align: middle;">
      <ul>
        <li>As progress from a tip towards the root, there is an increasing number of possible ancestral states.</li>
        <li>At each ancestral node, we can calculate the probabilities of each state.</li>
        <li>Marginal reconstruction chooses the state with the greatest  probability.</li>
        <li>Like a greedy hill-climbing algorithm.</li>
      </ul>
    </td>
    <td width="40%">
      <small>
      Marginal path goes from A to B, and B to F or G.
      </small>
      <img src="https://d3i71xaburhd42.cloudfront.net/c6c99bf73e63afafbc9272ce8d01c85cd1a1d16b/2-Figure1-1.png"/>
      <small>
      Image credit: T Pupko <i>et al.</i> (2000) Mol Biol Evol 17: <a href="https://academic.oup.com/mbe/article/17/6/890/1037793"/>890-896</a>.
      </small>
    </td>
  </tr>
</table>

---

# Joint reconstruction

<table>
  <tr>
    <td style="vertical-align: middle;">
      <ul>
        <li>Joint reconstruction attempts to find the combination of ancestral states throughout the tree that maximizes likelihood.</li>
        <li>Much more computationally complex than marginal reconstruction!</li>
      </ul>
    </td>
    <td width="40%">
      <small>
      Joint ML path goes from A to C, and C to I.
      </small>
      <img src="https://d3i71xaburhd42.cloudfront.net/c6c99bf73e63afafbc9272ce8d01c85cd1a1d16b/2-Figure1-1.png"/>
      <small>
      Image credit: T Pupko <i>et al.</i> (2000) Mol Biol Evol 17: <a href="https://academic.oup.com/mbe/article/17/6/890/1037793"/>890-896</a>.
      </small>
    </td>
  </tr>
</table>

---

# HIV vaccine design

<table>
  <tr>
    <td style="vertical-align: middle;">
      <ul>
        <li>HIV-1 is very diverse, with multiple subtypes that can be about 30% divergent in sequence.</li>
        <li>Only a small number of variants can be incorporated into a vaccine.</li>
        <li>How do we choose which variants to use?</li>
        <li>Gaschen <i>et al</i>&ast; proposed two strategies: (1) consensus sequence, and (2) ancestral reconstruction.</li>
        <li>Ancestral sequence more likely to have actually existed.</li>
      </ul>
    </td>
    <td width="35%">
      <img src="https://science.sciencemag.org/content/sci/299/5612/1515.3/F1.medium.gif"/>
      <small>
      Image credit: D Nickle <i>et al.</i> (2003) Science 299: <a href="https://science.sciencemag.org/content/299/5612/1515.3"/>1515-1518</a>.
      </small>
    </td>
  </tr>
</table>

&ast;B Gaschen <i>et al</i> (2002) Science 296: <a href="https://science.sciencemag.org/content/296/5577/2354.abstract">2354-2360</a>.

---

# Ancestral adeno-associated virus

* Adeno-associated viruses are ssDNA viruses that infect primates, including humans.
* Since AAV infection is mild, they are used as viral vectors and genetic vaccination (SARS-CoV-2, HIV).

<img src="https://ars.els-cdn.com/content/image/1-s2.0-S2211124715007597-fx1_lrg.jpg" height="300px"/>

<small><small>
Image credit: E Zinn <i>et al</i> (2015) <a href="https://www.sciencedirect.com/science/article/pii/S2211124715007597">In Silico Reconstruction of the Viral Evolutionary Lineage Yields a Potent Gene Therapy Vector</a>.  Cell Reports 12: 1056-1068.
</small></small>

---

# Mapping substitutions to trees

* If we can reconstruct ancestral states, then we can reconstruct substitution events by comparing states at adjacent nodes.
* Simplest method is to assume no more than one substitution at a site occurs on a given branch.
* More accurate methods account for uncertainty in ancestral states and multiple substitution events.

---

# Example: hepatitis C virus

* HCV protease is encoded by the NS3 gene, and is targeted by the antiviral simeprevir.
* The mutation Q80K is associated with reduced susceptibility to simeprevir, and is common in the USA.
* 96% of all infections with Q80K descend from a single common ancestor.

<img height="200px" src="https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/jid/211/8/10.1093_infdis_jiu613/2/jiu61301.png?Expires=1619136588&Signature=Wi-KKMTvpLIJgpHH4NATaRHYqZ558K93ErLaBPt7tGx-XM4Z6zS61Pm8Ff~VMdK9N1oqHpS7p0JdvZeZTSffGrgmdpzfsKZQuVjKOG-R2JZKBVQ5WyxP3t2EERorkfxGfcCbYdCuydltfrmAh5pvVkgv5KUAY1gtZDTnngI-JPea2oXVQKWKfobJ9zsl2pB2G4Dj5KPuB0kkYoiKwrmykWMawIf3ppDuXzs-hQAmsCEi5WDk4VoRvWPqj2lrLCH2D0AlZlXwJGNku4jMP6gPIY40yZvyJt0vnnrWRu-QCoIaLvcHxSdgx88mUlwvk-uwb~P81ETlyeqa5Bruxb7Z5Q__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA"/>

<small><small>
Image credit: RM McCloskey <i>et al.</i> (2014) J Infect Dis 211: <a href="https://academic.oup.com/jid/article/211/8/1288/916424">1288-1295</a>.
</small></small>

---

# Mapping mutations to detect coevolution

* Decades of interest in reconstructing protein structure from sequences.
* Interactions may be detected from mutations at different sites tend to map to the same branches of the tree.

<img height="200px" src="https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/mbe/23/9/10.1093_molbev_msl037/2/m_molbiolevolmsl037f01_ht.jpeg?Expires=1619112862&Signature=4Mzl6TXoqDz-fSoREEm8RUEQvWb3RJpaPwPKspPm6gpfYWnWtZ1SIUs5~BsEVvexusPWdhJ7rRD71h3ASUYge1kmlzamHRWC1BQeU2l1DBwVMJ5Xp~-7E1Mx4Fw0JJJzL6NYWDzT96TDfFLaNNz-5he4965PYsGLnwAOgbeQmrLrCJUO0UUCxVupsjplA5KkAWGsPnteT64WTCgXOeTMP7vESqQAntPQ5qJbqXa1i5gxo1slVIPvOrTnXi0~tJPkiVx7e9YIRiykbjBaAlh1X1yHZ9s-XJWxnDkfarqSzaisXsoibWdBtOGwctr2xTycYcw48qQfNjFpwCp4ZKs7hg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA"/>

<small><small>
Image credit: Beth Shapiro <i>et al.</i> (2006) A Phylogenetic Method for Detecting Positive Epistasis in Gene Sequences and Its Application to RNA Virus Evolution.  Mol Biol Evol 23: <a href="https://academic.oup.com/mbe/article/23/9/1724/1014269">1724-1730</a>.
</small></small>

---

# Interactions in influenza A virus neuraminidase

<table>
<tr>
<td>
<ul>
<li>Kryazhimskiy <i>et al.</i> modified this method to look for mutations at one site that tend to be followed by a mutation at another site, even if they happen on different branches.</i></li>
</ul>
<img src="https://journals.plos.org/plosgenetics/article/figure/image?size=inline&id=info:doi/10.1371/journal.pgen.1001301.g001"/>
</td>
<td width="50%">
<img height="500px" src="/img/pgen.1001301.g003.png"/>
</td>
</tr>
</table>

<small><small>
Image credit: Kryazhimskiy <i>et al.</i> (2011)  PLOS Genetics 7: <a href="https://journals.plos.org/plosgenetics/article?id=10.1371/journal.pgen.1001301">e1001301</a>.
</small></small>

---

# Reconstructing other character states

* If we are willing to assume that other characters evolve along a tree like genetic sequences, then we can reconstruct any ancestral state:
  * Reconstructing ancestral host species / host ranges
  * Phylogeography - reconstructing the geospatial location of ancestral lineages.
* Requires a model of character "evolution".

---

# Discrete trait models

* Adapt nucleotide Markov model to other characters like host species.
* Usually assume equal transition rates between states (Mk model), but more advanced methods exist (*e.g.*, [variable selection](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1000520), [gravity models](https://science.sciencemag.org/content/312/5772/447.full)).
<img src="https://lukejharmon.github.io/pcm/images/figure7-3.png" height="300px"/>

<small><small>
Image credit: Luke Harmon, [Phylogenetic comparative methods](https://lukejharmon.github.io/pcm/chapter7_introdiscrete/).  CC-BY-4.0.
</small></small>

---

# Continuous trait models

* If the character is continuous-valued (*e.g.*, GPS coordinates), then we might use a diffusion ([Brownian motion](https://en.wikipedia.org/wiki/Brownian_motion)) model instead.
* Require assumptions about constant rate of dispersal, movement through obstacles (*e.g.*, over bodies of water).

<center>
<div id="crop">
<img id="cropped" src="https://europepmc.org/articles/PMC3312803/bin/nihms331642f1.jpg"/>
</div>
</center>

<small><small>
Image credit: N Faria (2011), [Toward a quantitative understanding of viral phylogeography](https://www.sciencedirect.com/science/article/pii/S1879625711001222).  Curr Opin Virol 1: 423-429.
</small></small>

---

# Ancestral host ranges

<table>
  <tr>
    <td style="vertical-align: middle;">
      <ul>
        <li>Bunyavirales is an order of (-)ssRNA viruses including species that can cause deadly hemorrhagic fever in humans.</li>
        <li>Infect a diversity of animal and plant hosts, often transmitted by insects.</li>
        <li>M Marklewitz <i>et al.</i> used maximum parsimony and ML methods to reconstruct host range as binary traits.</li>
        <li>By augmenting their data with cell culture experiments, they were able to reject a vertebrate host origin, implying this switch occurred multiple times.</li>
      </ul>
    </td>
    <td width="35%">
      <img src="https://www.pnas.org/content/pnas/112/24/7536/F5.large.jpg" height="500px"/>
      <small>
      Image credit: M Marklewitz <i>et al.</i> (2015) Proc Natl Acad Sci USA 112: 7536-7541.
      </small>
    </td>
  </tr>
</table>

---

# Pitfalls of ancestral reconstruction

* More difficult to reconstruct at deeper nodes
* Reconstruction tends to be biased towards the most common states.
* Sampling bias - over-representation of some locations over others.
* Assumes that both the alignment and (if fixed) tree are correct.


---

# Software

* [HyPhy](http://hyphy.org) - joint ML, custom models
* *ace* function in R package [ape](https://cran.r-project.org/web/packages/ape/index.html) - marginal ML
* [MEGA](https://www.megasoftware.net/) - maximum parsimony, ML
* [BEAST](https://beast.community/) - Bayesian methods, including phylogeography
