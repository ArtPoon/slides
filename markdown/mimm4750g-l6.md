# MIMM4750g
## Genetic distances

---

# Aligned sequences

* Now that we can align sequences, we can make biologically meaningful comparisons.
* Which sequences are more closely related than others?
* It is far easier to measure similarity when the sequences are aligned.
```
GGGTTGCGCTCGTTG    GGGTTGCGCTCGTTG
|| |        |      ||| ||| |||| ||
GGTTGCGCTCGTTGA    GGGATGCACTCGCTG
```

---

# p-distances

* The simplest distance is to count the number of different residues.
```
GGGTTGCGCTCGTTG
||| ||| |||| ||  = 3 differences
GGGATGCACTCGCTG
```
* This is called the [Hamming distance](https://en.wikipedia.org/wiki/Hamming_distance).
* Hamming distance (HD) increases with sequence length.  
* We can divide the HD by sequence length.  This gives us the p-distance (*p* is for *proportional*).
* **What is the p-distance for the above example?**

---

# Multiple hits

* A big problem with the Hamming and *p*-distances is that they tend to  underestimate the amount of evolution.
* Suppose we are tracking the evolution of a sequence `AAAA`
* A single mutation occurs resulting `AGAA` ($p=0.25$)
* As we continue to accumulate mutations, the chance that we mutate a site *that has already undergone a mutation* increases.
* Multiple hits mask evidence of previous evolution (`A` $\rightarrow$ `G` $\rightarrow$ `A`).

---


<section data-state="jukes-slide">
    <h1>Jukes-Cantor simulation</h1>
    <center>
    <div id="jukes" class="fig-container"
         data-fig-id="fig-jukes"
         data-file="/include/jukes-cantor.html"
         style="height:550px">
    </div>
    <div></div>
    </center>
</section>

---


