# MIMM4750G
## Sequence alignment

---

# What is an alignment?

* So far we have talked about comparing sequences residue-by-residue with a score matrix.
* The underlying assumption is that these sequences are aligned.
* An alignment is a hypothesis about how residues (nt, aa) in homologous sequences are related to residues in a common ancestor.
* This is not trivial because of insertions and deletions.

```
Query  1    CTRPNNTRKSVSITIGPGRASYATG---GQAHC  30
            ||||||||||  |||||||||||||   |||||
Sbjct  95   CTRPNNTRKS--ITIGPGRASYATGGIIGQAHC  125

```

---

# Gap characters

* The presence of an insertion or deletion is indicated by a gap character.
* By convention, we use a single dash "&ndash;" for each indel.
* Some programs use non-standard characters like "`.`", "`~`" or "`X`".
* Without additional information, we cannot tell whether a gap is the result of an insertion in the longer sequence or a deletion in the shorter. 
* Hence we use the [portmanteau](https://en.wiktionary.org/wiki/portmanteau) *indel* (insertion/deletion).

---

# Pairwise alignment

* Thorne, Kishino and Felsenstein proposed a simple model of indel evolution (TKF91).
  * Insertions and deletions at constant rates.
  * One nucleotide at a time.
* Solving for the maximum likelihood of TKF91 can be used to align sequences.
* However, TKF91 and subsequent extensions of the model are not feasible for many long sequences.
* There is an infinite number of possible evolutions - *e.g.,* unsampled insertions.

---

# Heuristic methods

* Until TKF91-type methods become feasible, we continue to use heurstic methods.
* A <a href="https://en.wikipedia.org/wiki/Heuristic_(computer_science)">heuristic</a> is an algorithm for solving a problem that has no theoretical guarantee of being accurate.
* In practice, heuristic is designed to quickly produce a solution that is "good enough".
![](https://imgs.xkcd.com/comics/here_to_help.png)

---

# Score matrices (again)

* A major feature of heuristic methods of alignment
* Remember a score quantifies the likelihood of a residue being replaced by another.
* Find which alignment of two sequences maximizes the score.
* A simple score matrix for nucleotides: $+1$ (match), $-1$ (mismatch).

|   | A | C | G | T |
|---|---|---|---|---|
| A | +1 | -1 | -1 | -1 |
| C | -1 | +1 | -1 | -1 |
| G | -1 | -1 | +1 | -1 |
| T | -1 | -1 | -1 | +1 |

---

# Gap penalties

* We need to penalize the score for gaps, or else an alignment gets gaps for free:
  ```
  A-C-G-T   ACGT
  -A-C-T-   AC-T
  ```
* The left option is obviously a terrible alignment!
* If we use match/mismatch scores of `+1/-1` and a gap penalty of `-1`, then what the scores for these alignments?

---

# Dynamic programming matrix

---

# Local versus global alignment

---

# Multiple sequence alignment

---

# Guide trees

---

# Iterative alignment


---

# Software

---

# Manually editing your alignment

---

# Further readings


