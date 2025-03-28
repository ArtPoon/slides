<table>
<tr>
<td style="vertical-align: middle;">
<h1>MBI 4750G</h1>
<h2>Ancestral reconstruction</h2>
</td>
<td width="45%">
<img src="/img/birds_and_dinosaurs.png" width="100%">
</td>
</tr>
</table>

---

# What is ancestral reconstruction?

* Reconstructing the past characteristics of lineages from what we can observe in the present.
* This requires having some model of how characteristics evolve over time.
  * Usually, we are reconstructing the characteristics of a common ancestor for which we have measured multiple descendants.
* Having some estimate of past states can help us understand the origin of epidemics and adaptations.

---

# Maximum parsimony

<table>
  <tr>
    <td style="vertical-align: middle;">
      <ul>
        <li>Parsimony is the principle of selecting the simplest explanation/hypothesis.</li>
        <li><i>Maximum parsimony</i> is attained by assigning ancestral states in the tree that minimize the number of changes required to explain the observed states.</li>
        <li><a href="https://en.wikipedia.org/wiki/Walter_M._Fitch">Fitch's</a> method first propagates states from tips to root, and then resolves ancestral states upwards from the root.</li>
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
* The model of minimum evolution is not robust to episodes of rapid evolution.
  * Implicitly assumes that the same amount of time has passed along every branch of the tree.
* No means of quantifying uncertainty of ancestral reconstruction.

---

# Review: Phylogenetic likelihood

* The [maximum likelihood tree](https://slides.filogeneti.ca/html/mimm4750g-L06-likelihood.html#/11) is the tree with the highest probability of generating the data.
* To compute likelihood, we need a model of evolution &mdash; a discrete-state, continuous-time [Markov chain](https://slides.filogeneti.ca/html/mimm4750g-L05-models.html#/2).
* This model consists of a [transition rate matrix](https://slides.filogeneti.ca/html/mimm4750g-L05-models.html#/7), $Q$.
* We can derive a matrix of transition probabilities given time $t$ by matrix exponentiation, $P(t)=\exp(Q t)$.

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

# Pros and cons of ML reconstruction

* More accurate and robust than maximum parsimony
  * Account for different substitution rates by fitting the model.
  * Transition probabilities are adjusted for time (branch lengths).
* Requires more computing power, especially for joint reconstruction.

---

# Example: HIV vaccine design

<table>
  <tr>
    <td style="vertical-align: middle;">
      <ul>
        <li>HIV-1 is very diverse, with multiple subtypes that can be about 30% divergent in sequence.</li>
        <ul>
          <li>Only a small number of variants can be incorporated into a vaccine.</li>
          <li>How do we choose which variants to use?</li>
        </ul>
        <li>Gaschen <i>et al</i> (2002) proposed two strategies: (1) consensus sequence, and (2) ancestral reconstruction.</li>
        <li>Ancestral sequence more likely to have actually existed.</li>
      </ul>
    </td>
    <td width="35%">
      <img src="/img/1515c-1.gif"/>
      <small>
      Image credit: D Nickle <i>et al.</i> (2003) Science 299: <a href="https://science.sciencemag.org/content/299/5612/1515.3"/>1515-1518</a>.
      </small>
    </td>
  </tr>
</table>

<small><small>
B Gaschen <i>et al</i> (2002) Diversity Considerations in HIV-1 Vaccine Selection.  Science 296: <a href="https://science.sciencemag.org/content/296/5577/2354.abstract">2354-2360</a>.
</small></small>

---

# Example: Hepatitis C virus

* HCV protease is encoded by the NS3 gene, and is targeted by the antiviral simeprevir.
  * The mutation Q80K is associated with reduced susceptibility to simeprevir, and is common in the USA.
* 96% of all infections with Q80K descend from a single common ancestor.

<img height="200px" src="/img/q80k.png"/>

<small><small>
Image credit: RM McCloskey <i>et al.</i> (2014) J Infect Dis 211: <a href="https://academic.oup.com/jid/article/211/8/1288/916424">1288-1295</a>.
</small></small>

---

# Example: Is HIV-1 adapting to us?

* Reconstructed ancestral HIV-1 proteins from "historic" samples (1979-1989) in North America.
  * HIV-1 has diversified both genetically and functionally, but no evidence of adaptation to human populations.
<img src="/img/hiv1-north-amer.png" width="450px"/>

<small><small>
Image credit: Cotton <i>et al.</i> (2014) PLOS Genetics 10(4): <a href="https://journals.plos.org/plosgenetics/article?id=10.1371/journal.pgen.1004295">e1004295</a>.
</small></small>

---

# Mapping mutations to the tree

* If we can reconstruct ancestral states, then we can "map" substitution events to branches by comparing the inferred states on ancestral and descendant nodes.
$$X \longrightarrow Y$$
* The simplest method is to assume that no more than one substitution at a site occurs on a given branch.
* [More accurate methods](https://pubmed.ncbi.nlm.nih.gov/12396587/) account for multiple substitution events, and the uncertainty in ancestral states.

---

# Mapping mutations to detect coevolution

* Interactions may be detected from mutations at different sites tend to map to the same branches of the tree.

<img height="250px" src="/img/shapiro-epistasis.svg"/>

<small><small>
Image credit: Beth Shapiro <i>et al.</i> (2006) A Phylogenetic Method for Detecting Positive Epistasis in Gene Sequences and Its Application to RNA Virus Evolution.  Mol Biol Evol 23: <a href="https://academic.oup.com/mbe/article/23/9/1724/1014269">1724-1730</a>.
</small></small>

---

# Protein structures from co-evolving residues

* Interacting residues tend to be in contact within the protein structure.
* Protein structures can be reconstructed from analyzing sequences.

<img src="/img/pone.0028766.g001.png" height="250px"/>

<small><small>
Image credit: Debora Marks <i>et al.</i> (2011) Protein 3D Structure Computed from Evolutionary Sequence Variation.  PLOS ONE 6(12): <a href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0028766">e28766</a>.
</small></small>

---

# Reconstructing other character states

* If we are willing to assume that other characters evolve along a tree like genetic sequences, then we can reconstruct any ancestral state:
  * Reconstructing ancestral host species / host ranges
  * **Phylogeography** - reconstructing the geospatial location of ancestral lineages (more on this later!).
* Requires a model of character "evolution".

---

# Pitfalls of ancestral reconstruction

* Assumes that both the alignment, tree and model of evolution are all correct.
* More difficult to reconstruct at deeper nodes.
  * This can be ameliorated by sampling many reconstructions from the probability distribution at each node.
* Reconstruction tends to be biased towards the most common states.
  * Sampling bias: over-representation of some locations over others.


---

# Experimental validation

Randall *et al.* evolved a plasmid encoding a fluorescent protein to test ancestral reconstruction methods.

<table>
<tr>
<td width="55%">
  <img src="https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fncomms12847/MediaObjects/41467_2016_Article_BFncomms12847_Fig1_HTML.jpg"/>
  <small>
  Phylogeny of evolving colours, labelled with numbers of non-syn. / synonymous substitutions.
  <br/><br/>
  Image credit: Randall <i>et al.</i> (2016)  Nat Comm 7: <a href="https://www.nature.com/articles/ncomms12847">12847</a>.
  </small>
</td>
<td width="45%">
  <small>
  Most of the ancestral protein sequence was reconstructed accurately, with no significant differences among methods.
  </small>
  <img src="/img/randall.svg"/>
</td>
</tr>
</table>

---

<section data-background="#333" style="color:white">

<h1 style="color:white">Key points</h1>

* Ancestral reconstruction can be performed by maximum parsimony (least changes) or (marginal or joint) maximum likelihood.
* We can map mutations to the tree by assuming any difference between ancestral and descendant nodes of a branch involves only one mutation.
* Ancestral reconstruction is more uncertain as we go further back in time, and is sensitive to sampling bias.

</section>
