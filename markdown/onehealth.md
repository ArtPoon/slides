# PATH3600
## Bioinformatics, Phylogenetics and One Health

<img src="https://i.guim.co.uk/img/media/9ed81f454e0ee84279708de821e399e014365a30/0_70_1023_614/master/1023.jpg?width=1920&quality=85&auto=format&fit=max&s=4bffe150424f2ef9925798fa2c4091f5" width="600px"/>

<small>
Image credit: Tommy Trenchard/EMLabs
</small>

---

# What is bioinformatics?

* The development and implementation of computational tools to extract information from biological data.
* Includes a broad spectrum that ranges from **developers** of new algorithms to **expert users** that automate, customize, run and validate analyses.
* Bioinformaticians are biologists.

---

# What are phylogenies?

* A phylogeny is a tree-based hypothesis about the common ancestry of populations.
* Each tip of the tree represents an observed population (infection).
* Tips are connected to common ancestors by branches.
![](/img/phylogeny-crop.png)

---

# How do these tools relate to One Health?

* Reconstructing the origin of an emerging infectious disease.
* Reconstructing the spread of an epidemic over time and space.
* Identifying risk factors.
* Real-time surveillance of an epidemic.
* Discovering new pathogens.

---

# Phylogenies can be rooted or unrooted.
* The root is a hypothesis about what point on the tree represents the earliest time.
<center>
<iframe src="/include/rooting.html" width=900px height=400px>
</iframe>
</center>

<small>
Tree reconstructed from Ebola virus genome sequences collected in different outbreaks.
</small>

---

<table>
  <tr>
    <td style="vertical-align: middle; font-size: 20pt">
      <h1>Origin of HIV-1</h1>
      <ul>
        <li>Oral polio vaccine hypothesis: that SIV entered the human population via contaminated vaccine.</li>
        <li>SIV sequenced from chimpanzee faecal samples collected in the Democratic Republic of the Congo.</li>
        <li>SIV samples from Kisangani (site of vaccine manufacture) clearly separate from clade containing HIV-1.</li>
      </ul>
    </td>
    <td width="40%">
      <img src="/img/worobey2004.png" width="400px"/>
          <small>
    Image credit: Worobey <i>et al.</i> (2004) Nature. https://doi.org/10.1038/428820a
    </small>
    </td>
  </tr>
</table>

---

# Reconstructing the origin

<iframe src="/include/rtt.html" width="1000px" height="500px">
</iframe>

---

# HIV-1 originated around 1920.

<table>
  <tr>
    <td>
      <img src="/img/korber-fig1.png" width="400px"/>
      <small>
      Figure from B Korber *et al.* (2000) <a href="https://doi.org/10.1126/science.288.5472.1789"/>Science 288: 1789</a>.
      </small>
    </td>
    <td width="50%">
      <img src="https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fnature07390/MediaObjects/41586_2008_Article_BFnature07390_Fig2_HTML.jpg" width=700px></img>
      <small>
      Figure from M Worobey <i>et al.</i> (2008) <a href="https://doi.org/10.1038/nature07390">Nature 455: 661</a>.
      </small>
    </td>
  </tr>
</table>

---

# Why has HIV-1 spread?

<table>
<tr>
<td width="50%">
  <ul>
    <li>French colonialists forces Germany's withdrawal from region (1915).</li>
    <blockquote>"There was a change during the French period. Fear was finished. Everybody was looking for meat, and these animals (chimpanzees) were meat. We could also sell the young. So everyone hunted them."</blockquote>
    <small>
    Oral historical interview of woman who had witnessed the arrival of the French.<br/>
    Source: S Rupp <i>et al.</i> (2016) <a href="https://doi.org/10.1007/s10393-016-1189-6">EcoHealth 13: 661</a>.
    </small>
  </ul>
</td>
<td>
  Phylogeographic reconstruction of HIV-1's early spread driven by urbanization.
  <img src="/img/faria.png"/>
  <small>Figure from Faria *et al.* (2014) <a href="https://doi.org/10.1126/science.1256739">Science 346: 56</a>.</small>
</td>
</tr>
</table>

---

<section data-state="coalescent-slide">
    <h1>Reconstructing past epidemics</h1>
    <div id="coalescent" class="fig-container"
         data-fig-id="fig-coalescent"
         data-file="/include/coaltrace.html"
         style="height:500px">
    </div>
    <small><small><a href="http://bedford.io/projects/coaltrace/">coaltrace</a> by Trevor Bedford</small></small>
</section>

---

# Population dynamics

* If the population changes, the coalescent tree should as well:

<img src="/img/coalescent.png" width="700px"/>

---

# Hepatitis C virus in Egypt

* About 15% of adult population infected by HCV genotype 4.
* Coalescent reconstructed found epidemic growth associated with massive public health campaign against snail fever.

<img src="/img/egypt.svg"/>

<small>
Figure adapted from T Stadler <i>et al.</i> (2013) <a href="https://doi.org/10.1073/pnas.1207965110"/>PNAS 110: 228</a>.
</small>

---

<table><tr>
  <td>
    <h3>Clusters of genetically similar infections may represent transmission outbreaks</h3>
    <ul>
      <li>HIV evolves rapidly - a new infection becomes unique within weeks.</li>
      <li>If two infections are still similar when diagnosed, they are probably related through an unknown number of recent transmission events.</li>
    </ul>
    <img src="/img/clustering-clip.png" width="300px"/>
  </td>
  <td width="40%" style="vertical-align:middle;">
    <img src="/img/glenochil-crop.png"/>
    <br/>
    <small>
      HIV-1 *gag* phylogeny from Yirrell *et al* BMJ 314 (1997): 1446.
    </small>
  </td>
</tr></table>

---

<section data-state="tn93-slide">
    <h1>Pairwise genetic clustering</h1>
    <div id="tn93" class="fig-container"
         data-fig-id="fig-tn93"
         data-file="/include/clustering.html"
         style="height:650px">
    </div>
</section>

---

# Clusters and risk factors
<img src="https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/jid/211/6/10.1093_infdis_jiu560/1/jiu56003.jpeg?Expires=1587880248&Signature=Lnz4JzSFwXmrRaX31-2-Ee19oJKjWnl-eSiyej20bJF1RskwU9eOpvDgSkRB0v9sqcI4DgIxNmptHCFYdyPTk7uel2m9HMj8B3KK6yHaOgvPrdpUwNCyPU3ZNjKxu4V~aPHhR8HbuUKPF9toxByMcBWbeGlCbeuKpWr1D8OQVFvFIYeeTQeRMH9CPTUZCl0pUQl-yrdgvBndSBojddDnszaGT2riX4h-8j7CzO~MBTpVg-2ufvZX405rAhapzOqAdpiHAbodyU1R18n2kmoLoSAf41xVAqXzZZkB~YsugDbSjeZ6K1xsmkdQfNgoWYC6aplXiwbwcghHuEZH8~vpVg__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA" width="600px"/>

<small>
Image credit: AFY Poon <i>et al.</i> (2014) <a href="https://doi.org/10.1093/infdis/jiu560">J Infect Dis 211: 926</a>.
</small>

---

# Real-time monitoring

<img src="/img/cluster0.png" width="90%"/>

---

# Genomic epidemiology

<img src="https://erj.ersjournals.com/content/erj/51/6/1702313/F5.large.jpg" width="550px"/>

<small>
Image credit: MK Lalor <i>et al.</i> (2018) <a href="https://doi.org/10.1183/13993003.02313-2017">Eur Resp J 51: 1702313</a>.
</small>

---

# Next-generation sequencing and genome assembly

<img src="/img/CeMV-coverage.png" width="700px"/>

<small>
Image credit: WK Jo <i>et al.</i> (2018) <i>Evolutionary evidence for multi-host transmission of cetacean morbillivirus</i>. <a href="https://doi.org/10.1038/s41426-018-0207-x">Emerg Microbes Infect 7: 201</a>.
</small>

---

# Metagenomic discovery of novel pathogens

* The vast majority of bacteria and archaea are unculturable.
![](/img/nature12352.f1.png)
<small>
Image credit: C Rinke <i>et al.</i> (2013) <a href="https://doi.org/10.1038/nature12352"/>Nature 499: 431</a>.
</small>

---

# Portable sequencing

<table>
<tr>
<td><img src="https://nanoporetech.com/sites/default/files/s3/minion-cutout.png" width="300px"/></td>
<td><img src="https://www.sciencemag.org/sites/default/files/styles/article_main_image_-_1280w__no_aspect_/public/ca_0607NID_Barcoding_online.jpg?itok=c7GH4Lnk" width="400px"/></td>
</tr>
</table>

* The Oxford Nanopore MinION weights about 100g and plugs into a computer/laptop via USB.
* About 1-2 million reads, 5% to 15% per base error rate.
* Near real-time *de novo* assembly of data makes field deployment possible.

---

<img src="https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fnrg.2017.88/MediaObjects/41576_2018_Article_BFnrg201788_Fig2_HTML.jpg" width="
800px"/>
<small>
Image credit: JL Gardy and NJ Loman (2018) <a href="https://doi.org/10.1038/nrg.2017.88">Nature Rev Genet 19: 9</a>.
</small>
