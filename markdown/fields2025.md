
<table>
<tr>
<td>
Fields Workshop on Mathematical Ecology
<div style="font-size: 2.5em; line-height: 1.1; color: #4F2683;">Recombination: the elephant in the room of viral phylodynamics</div>
<div style="font-size: 1.5em; line-height: 2.5; font-weight: 500;">Art Poon</div>

Departments of Pathology and Laboratory Medicine; Computer Science; Microbiology and Immunology<br/>

<div style="font-size: 1.2em; line-height: 2; color: #4F2683; font-weight: 500;">
Western University
</div>

</td>
<td width="33%">
<img src="/img/elephant-in-the-room.jpg" style="float: right;"/>
</td>
</tr>
</table>

<div style="float: right; text-align: right; width: 50%; color: black; font-size: 0.5em">
<br/>
Image source: Elephant's tea party, Robur Tea Room, 24 March 1939, by Sam Hood. State Library of New South Wales. <a href="https://commons.wikimedia.org/wiki/File:Elephant%27s_tea_party,_Robur_Tea_Room,_24_March_1939,_by_Sam_Hood_(8739115901).jpg">Wikimedia Commons</a>.
</div>



---

Western University is located on the traditional lands of the Anishinaabek, Haudenosaunee, L&#363;naap&eacute;ewak and Attawandaron peoples.

<img src="/img/native-land.png" width=700/>

<small><small>
Image credit: Native Land Digital, https://native-land.ca
</small></small>

---

## Phylodynamics can be defined as the practice of fitting models to tree shapes

<table>
<tr>
<td><img src="/img/raup1973.png" height=310/></td>
<td><img src="/img/raup1973-2.png" height=300/></td>
</tr>
</table>


### Image source: DM Raup <i>et al.</i> (1973) Stochastic models of phylogeny and the evolution of diversity. Journal of Geology 81: 525-542.

---


## Tree shapes are complex objects, but most phylodynamics operates only on the distribution of node times.

<img src="/img/macpherson2022.png" width="70%">

### Image source: A MacPherson <i>et al.</i> 2022. Unifying phylogenetic birth-death models in epidemiology and macroevolution. Syst Biol 71: 172-189.

---

# The birth-death SIR model 

* Phylodynamic models generally equate lineage birth (internal node) with transmission.
  * Birth occurs at rate $\lambda$, which may vary over time, *i.e.*, $\\{\lambda\_1, \lambda_2, \ldots \\}$.
* Assume lineage death (terminal node) means removal (including sampling) at rate $\mu$.
* The BDSIR model (K&uuml;nhert *et al.*, 2014) constrains variation in $\lambda$ and $\mu$ over time by an SIR model, where growth is $S$-limited.

![](/img/SIR-model.svg)

---

# The basic reproduction number

* The rate of change in the number of infected individuals ($I$) is:

`$$\frac{dI}{dt} = (\beta S - \gamma) I$$`

* The number of infections grows when $\beta S / \gamma > 1$.
* At the start of an epidemic, this quantity is known as the basic reproduction number, $R_0$.
  * The expected number of secondary infections from an index case.
  * An important parameter for public health decision-making.

---

# $R_0$ and phylodynamics

* Phylodynamic methods are increasingly used to estimate $R_0$ from genetic sequence data.
<img src="https://virological.org/uploads/default/original/1X/8f21f08be4ef14d94441e26c058332e72536ea53.png" height=220/>

* Higher $R_0$ should be associated with a greater concentration of internal node times near root.

### Image source: TG Vaughan et al. (2020) Phylodynamic Analyses of outbreaks in China, Italy, Washington State (USA), and the Diamond Princess. https://virological.org

---

## Recombination is the exchange of genetic material between genomes

![](/img/recombination.svg)

---

# Many RNA viruses exhibit high rates of recombination

* HIV-1 undergoes about $1.3\times 10^{-3}$ recombination events per nucleotide per cellular infection (Schlub *et al*, 2010).

<div style="width: 100%; height: 100px; overflow: hidden;">
<img src="https://www.hiv.lanl.gov/scratch/CRFimg/4_CRF04_cpx.png" style="max-height: unset; height: 150px; margin: -30px 0 0 200px; padding: 0; border: unset;"/>
</div>

* About 0.1 to 0.4 reassortment events occur per lineage per year in influenza viruses (M&uuml;ller *et al* 2020).
  * Reassortment is a form of recombination involving the exchange of entire genome segments.

### Image source: https://www.hiv.lanl.gov/components/sequence/HIV/crfdb/crfs.comp

---

## Recombination creates phylogenetic discordance between different intervals of the genome

![](/img/phylo-discord.svg)

---

## Discordant phylogenies can be represented jointly as an ancestral recombination graph

<img src="/img/ancestral-recomb-graph.svg" width=80%/>

---

## Resolving trees from an ARG is analogous to a subtree-prune-regraft operation

![](/img/5692f1-linear.png)


---

# Phylodynamic studies seldom account for recombination

* If we are reconstructing a single tree from the sequence alignment, then we are essentially averaging over multiple trees.
* It is widely known in the evolutionary biology literature that recombination tends to make this average tree more "star-like", *e.g.*, Schierup and Hein (2000).
  * In the extreme case, every site evolves independently.
* Is phylodynamic estimation of $R_0$ confounded by recombination?

---

# Simulation methods
<table>
<tr>
  <td>
    <ul>
      <li>Used <a href="https://tgvaughan.github.io/remaster/">ReMASTER</a> (BEAST2, v2.7.2; Vaughan 2024) to simulate trees under the BDSIR model.</li>
      <li>Two sets of parameters ("HIV-like" and "SARS-like") determined by fitting BDSIR to data, with priors informed by literature.</li>
      <li>Used <a href="https://github.com/sjspielman/pyvolve">Pyvolve</a> (v1.1.0, Spielman and Wilke 2015) to simulate an alignment from the tree, calibrated on real data.</li>
    </ul>
  </td>
  <td width="25%">
    <img src="https://filogeneti.ca/img/wwang.jpeg"/>
    <div style="font-size: 0.8em;">
    Analysis by William Wang, undergraduate thesis student.
    </div>
  </td>
</tr>
</table>

---

# Baseline tests

<table>
  <tr>
  <td>
    <ul>
      <li>Fit BDSIR model in BEAST2 to simulated alignments.</li>
      <li>Set a narrow prior on $\gamma$ (<tt>becomeUninfectious</tt> rate) to address parameter identifiability issue, <i>i.e.</i>, <a href="https://academic.oup.com/mbe/article/38/9/4010/6278301">Louca <i>et al.</i> 2021</a>.</li>
      <li>Evaluated five combinations of model parameters (colours) and five replicates of one set of parameters (squares).</li>
    </ul>
  </td>
  <td width="45%">
    <img src="/img/recombR0-tests.svg" width=400/>
  </td>
  </tr>
</table>

---

# Adding recombination

1. Assume $B$ breakpoints are distributed uniformly at random across the alignment.
2. Assign the simulated tree to the leftmost interval.
3. At each breakpoint, apply a subtree-prune-regraft (SPR) operation to a random point in the preceding tree.
  * This assumes that parental lineages are always sampled!
4. Simulate alignments for every tree.
5. Combine intervals to generate the recombinant alignment.

---

## Trees become more star-like with increasing recombination

![](/img/recombR0-trees.svg)

---

## Recombination causes BEAST2* to overestimate R0, with diminishing returns

<img src="/img/recombR0-results.svg" width=80%/>

### *phylodynamics serial with narrow prior on `becomeUninfectiousRate` - chains run for 1e8 steps, extended to 2e8 if failure to converge. 

---

# Is B=100 a realistic amount of recombination?

* Many of the simulated breakpoints are inconsequential, *e.g.*:
  * exchange of terminal branches
  * short interval between breakpoints
* *i.e.*, the sort of recombination that is most visible to us may be in the minority
* Time scale of ~20 years for HIV-like data, ~200 days for SARS-like data.

---

# Recombination is complicated

* Several things need to occur for recombination to affect tree shape:
  1. Superinfection: transmission to an infected individual*
  2. Genetic divergence between parental lineages
  3. Co-infection of the same host cell
  4. Recombination of co-infecting genomes
* We only really have good empirical (*in vitro*) data on (4)

### *Keep an eye out for recent work by Nicola M&uuml;ller and colleagues..

---

## Recombination may be a serious problem for phylodynamics.

<img src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Baba.2.jpg" height=300/>

## How much recombination is there in our data?

### Image source: Elefant Baba der Madame Lecerf (1824, [public domain](https://commons.wikimedia.org/wiki/File:Baba.2.jpg)).

---

# Recombination in segmented viruses occurs by exchange of entire segments between genomes
* Influenza A virus has eight genome segments &mdash; recombination within segments is rare ([Boni *et al* 2010](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0010434)).
* Reassortment plays an important role in IAV adaptation (antigenic shift).

![](/img/reassortment.svg)

---

## Reassortment in IAV is often detected by phylogenetic discordance

![](/img/tanglegram.svg)

---

# How reliable is this approach for detecting reassortment?

<table>
<tr>
  <td>
    <ul>
      <li>Individual reassortment events can be reconstructed as SPR edits between trees.</li>
      <li>Some studies employing such methods have reported enormous numbers of reassortment events, <i>e.g.</i>, <a href="https://www.frontiersin.org/journals/microbiology/articles/10.3389/fmicb.2021.793500/full"/>Gong <i>et al.</i> (2021)</a> reported 1,927 events.</li>
      <li>However, phylogenetic discordance can also be induced by error in reconstructing the actual tree.</li>
    </ul>
  </td>
  <td width="25%">
    <img src="https://filogeneti.ca/img/hcastelan.jpeg"/>
    <div style="font-size: 0.8em;">
    Analysis by Hugo Castel&aacute;n S&aacute;nchez, postdoctoral associate.
    </div>
  </td>
</tr>
</table>


---

# Simulation methods

* Retrieved 11,795 complete H5Nx genomes from avian hosts from NCBI Genbank and GISAID databases.
* Generated five replicate samples of $n=214$ genomes and reconstructed ML trees for each segment.
* Used Pyvolve to simulate alignments along the segment 4 (HA) tree for all other segments (rescaled to match observed variation).
* Reconstructed ML trees from the simulated alignments.

## Any SPRs detected in these trees must be false positives!

---

## The number of SPRs on simulated trees are similar to real trees!
<img src="/img/hfive-barplots.svg" width="75%"/>

---

## False SPRs tend to involve smaller subtrees than SPRs from real data
<img src="/img/hfive-ntips.svg" width="67%"/>

---

## False SPRs tend to travel a shorter distance in the tree

<img src="/img/hfive-siblings.svg" width="67%"/>

---

# Detecting recombination




---

# Thanks!

<table>
<tr>
  <td>
    <img src="/img/cihr.png" width="250px"/><br/>
    <img src="/img/NSERC_RGB.png" width="230px"/>
    <img src="/img/NIH_NIAID.jpg" width="180px"/>
  </td>
  <td style="vertical-align: middle;">
    <img src="/img/lab-thumbnails.jpeg" width="400px"/>
  </td>
</tr>
</table>
