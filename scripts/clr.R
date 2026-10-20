set.seed(123)

# simulate abundances
N <- 200
D <- 20
ab <- matrix(rnorm(N*D, mean=50, sd=5), ncol=20)
ab[,1] <- rnorm(N, mean=1000, sd=200)  # dominant species 

# proportions
prop <- ab / rowSums(ab)

pdf("~/slides/img/pairs.pdf", width=5, height=5)
pairs.panels(prop[, 2:6], stars=T, ci=T, col='red', hist.col='salmon')
dev.off()

# now calculate centered-log ratios
gmx <- apply(ab, 1, function(rw) mean(log(rw)))
clr <- log(ab)-gmx

pdf("~/slides/img/pairs-clr.pdf", width=5, height=5)
pairs.panels(clr[, 2:6], stars=T, ci=T)
dev.off()

