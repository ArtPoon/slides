
<table>
<tr>
<td>
Fields Workshop on Mathematical Ecology
<div style="font-size: 2.5em; line-height: 1.1; color: #4F2683;">Recombination: the elephant in the room of viral phylodynamics</div>
<div style="font-size: 1.5em; line-height: 3; font-weight: 500;">Art Poon</div>

Departments of Pathology and Laboratory Medicine; Computer Science; Microbiology and Immunology<br/>

<div style="font-size: 1.2em; color: #4F2683; font-weight: 500;">
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
* Higher $R_0$ should be associated with a greater concentration of internal node times near root.

---

# Recombination is the exchange of genetic material between genomes

![](/img/recombination.svg)

---

# Many RNA viruses exhibit high rates of recombination

* HIV-1 undergoes about $1.3\times 10^{-3}$ recombination events per nucleotide per cellular infection (Schlub *et al*, 2010).

<div style="width: 100%; height: 100px; overflow: hidden;">
<img src="https://www.hiv.lanl.gov/scratch/CRFimg/4_CRF04_cpx.png" style="max-height: unset; height: 150px; margin: -30px 0 0 200px; padding: 0; border: unset;"/>
</div>

* About 0.1 to 0.4 reassortment events occur per lineage per year in influenza viruses (M&uuml;ller *et al* 2020).
  * Reassortment is a form of recombination involving the exchange of entire genome segments.

<div style="color: black; font-size: 0.6em">
Image source: https://www.hiv.lanl.gov/components/sequence/HIV/crfdb/crfs.comp
</div>

---

# Recombination creates phylogenetic discordance between different intervals of the genome

![](/img/phylo-discord.svg)

---

# Discordant phylogenies can be represented jointly as an ancestral recombination graph

![](/img/ancestral-recomb-graph.svg)

---

# Phylodynamic studies seldom account for recombination

* If we are reconstructing a single tree from the sequence alignment, then we are essentially averaging over multiple trees.
* It is widely known in the evolutionary biology literature that recombination tends to make this average tree more "star-like".

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
