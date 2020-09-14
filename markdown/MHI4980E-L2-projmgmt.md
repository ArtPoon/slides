# MHI 4980E
## Project management
![](https://imgs.xkcd.com/comics/estimating_time.png)

---

# Filesystem

* How will you set up your project subdirectories?
* `project` - an example
  * `doc` - external documentation, reports
  * `data` - self explanatory!
  * `scripts` - Python, R scripts can go here - `src` for compiled code
  * `results` - stream outputs from scripts to here

---

# Data

* what kind?
* how much? (MB, GB or TB?)
* where does it live?
* who owns it? do you have permission to make remote copies?
* are there sensitive data?

---

# Data provenance

* the historical record of the data
* what was the source material? *e.g.*, patient sample number
* how were the data generated? *e.g.*, sequencing platform
* difficult to automate
* why is provenance important?

---

# Data integrity

* data degradation over time
* accidental manipulation, overwrites
* who has read-write access?  should the data files be set to read only?
* how can integrity be determined?
  * modification dates
  * checksums, *e.g.*, [md5](https://en.wikipedia.org/wiki/MD5)

---

# Version control

---
