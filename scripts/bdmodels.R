require(phytools)
require(ggfree)

set.seed(3)
pal <- palette("Dark 2")
phy <- pbtree(n=20)
svg("~/slides/img/bdtree.svg", width=5, height=3)
plot(tree.layout(ladderize(phy)), label='n', col=pal[1])
dev.off()
#for (i in 2:2) {
#  lines(tree.layout(ladderize(pbtree(n=20))), col=pal[i], lwd=2)
#}

bddist <- function(t, n, lambda, mu) {
  eps <- mu/lambda; r <- lambda-mu; ert <- exp(r*t)
  alpha <- eps*(ert-1)/(ert-eps); beta <- (ert-1)/(ert-eps)
  pn <- (1-alpha)*(1-beta)*beta^(1:n-1)
  c(alpha, pn)
}

svg("~/slides/img/bddists.svg", width=8, height=3)
par(mar=c(5,5,1,1), mfrow=c(1,2))
res <- bddist(5, 10, lambda=0.1, mu=0.0)
barplot(res, names.arg=0:10, ylab='Probability', xlab='Number of lineages', 
        main='Pure birth', ylim=c(0, 0.6))
res <- bddist(5, 10, lambda=0.1, mu=0.05)
barplot(res, names.arg=0:10, ylab='Probability', xlab='Number of lineages',
        main='Birth-death', ylim=c(0, 0.6))
dev.off()
