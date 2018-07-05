# journal club
## Gene birth contributes to structural disorder encoded by overlapping genes
### S. Willis and J. Masel (University of Arizona)

---

# Overlapping genes

* A reading frame that partially or completely overlaps another reading frame
* Common in virus, bacterial, mitochrondrial genomes
* Starting to be found in eukaryotic genomes
* OvRFs, overlapping reading frames

---

# Intrinsic structural disorder
 
* Proteins that lack stable secondary, tertiary structure in absence of binding partner
* "molten globules", random coils
* experimentally measured or predicted from models
* ISD is more common in proteins encoded by overlapping genes (48% vs. 23%)

---

# Why is ISD more common in OvRFs?

1. ISD relieves evolutionary constraints in OvRFs [Constraint hypothesis]
2. A side-effect of gene birth (overprinting) [Facilitate Birth hypothesis]
3. A consequence of the genetic code (null model) [Genetic code hypothesis]

---

# Data

* Collected 102 pairs of OvRFs described in virus literature
* only 92 pairs of OvRFs available
* mostly RNA viruses (61 positive sense RNA)
* identified older member of OvRFs (parent reading frame) from literature

---

# Codon bias

* Disproportionate use of one codon over the other synonymous codons
* Thought to enhance gene expression by overloading specific tRNAs
* Another method to gauge relative ages of OvRFs
* Younger ORF expected to have less codon bias

---

# Relative gene age

* relative synonymous codon usage

  `$$\text{RCSU}_i = \frac{X_i}{\frac{1}{n}\sum_{i=1}^{n}X_i}$$`

* relative adaptedness value
  
  `$$w_i = \frac{\text{RSCU}}{\text{RSCU}_{\text{max}}}$$`

* codon adaptation index

  `$\text{CAI} = \left( \prod_{i=1}^{L} w_i \right)^{\frac{1}{L}}$`

---

# Relative gene age (2)

* excluded OvRFs with sections less than 200nt
* assumed ORF with higher CAI is ancestral (labels)
* compared two groups using Mann-Whitney U
* selected p-value cutoff based on labels

---

![](/img/229690.fig1.png)

---

![](/img/229690.fig2.png)

---

# Controls

* 150 non-overlapping genes from same virus species
* 27 pre-overlapping homologs
* looked at alternate +1 and +2 frames
* took longest ORF (Met to stop) in alternate frames

---

# pHMMer

* profile hidden Markov model
* search a protein database for potential homologs to query
* all-against-all search for all overlapping, non-overlapping, and frameshifted controls
* grouped sequences into homology groups to count gene birth events
* filtered groups using BLOSUM62 similarity

---

# ISD prediction

* IUPred predicts disorder by estimating residue interaction energies
* excluded cysteines, which have a large effect on ISD (disulphide bonds)
* averaged ISD scores (per residue) across ORF

---

# Model analysis

* fit multiple regression model to Box-Cox transformed ISD means
* predictors: 
  * ancestral/novel/control
  * frameshift (+1/+2)
  * overlap type (internal/terminal), later excluded
* used linear mixed model to account for homology grouping
* virus species (as proxy for factors such as G-C content) added as second random effect

---

![](/img/229690.fig3.png)

---

# Results

* Higher ISD on overlapping genes not an artefact of genetic code (see frameshifted controls)
* ISD in overlapping regions of novel genes is higher than that in ancestral genes, specifically in +2 frame
* No significant difference between frameshifted controls and pre-overlapping homolog controls
* Pre-overlapping ORFs have higher ISD than non-overlapping ORFs

---

![](/img/229690.fig5.png)

---

# Results (2)

* Frameshifted versions of high-ISD proteins have higher ISD than those of lower ISD
* 31 of novel genes were in +1 frame of ancestor, only 10 in +2 frame
* +1 frameshifts induce more start codons, shorter ORFs











