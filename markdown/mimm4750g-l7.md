# MIMM4750G
## Genetic clustering
![](https://imgs.xkcd.com/comics/machine_learning.png)

---

# What is a cluster?

* A cluster is a subset (group) of objects that are more similar to each other than objects outside the cluster.
* Clustering is subjective.  Our brains are wired to see patterns where none exist.

---

# Why is clustering useful?

* Clustering is a means of finding useful patterns.
* To reduce a large database to a representative subset.
* For infectious disease research:
  * Clustering can be used to define bacterial "species" (limited morphology, extensive horizontal gene transfer).
  * To define strains or "subtypes" of a virus.
  * To track the spread of an infectious disease.

---

# Clustering methods

* There are an enormous number of methods (algorithms) for clustering data. 
* It is easiest to talk about different categories of clustering methods.
* Clustering is used in so many contexts that it can be confusing when different methods are used on different kinds of data in the same study!

---

# Supervised and unsupervised clustering

* *Supervised* clustering means that you have assigned some data to clusters yourself, and leave the rest to the machine.
* *Unsupervised* clustering 

---

# Agglomerative and dissociative

* *Agglomerative* (bottom-up) clustering begins with every object in its own tiny cluster, and starts lumping the closest together.
* *Dissociative* (top-down) clustering begins with every object in one huge cluster, and starts cutting.

---

# Non-parametric and parametric

* A *non-parametric* clustering method uses the observed distribution of one or more characteristics to cluster the data.
* For example, if we look at cars on a one-lane road, we can build up clusters from any two cars closer than some cut-off distance of each other.
* A *parametric* clustering method fits a model to the data to define clusters.


