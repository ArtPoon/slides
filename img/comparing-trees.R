require(ape)
require(ggfree)
set.seed(1)

t1 <- ladderize(rcoal(n=10))
t2 <- ladderize(rcoal(n=10))
t3 <- ladderize(rcoal(n=10))

#svg("~/slides/img/comparing-trees.svg", width=9, height=3)
png("~/slides/img/comparing-trees.png", width=9*300, height=3*300, res=300)
par(mfrow=c(1,3), mar=c(0,0,0,0))
plot(tree.layout(t1), label='n', lwd=3)
title(main="A", line=-1.5, cex.main=2)
plot(tree.layout(t2), label='n', lwd=3)
title(main="B", line=-1.5, cex.main=2)
plot(tree.layout(t3), label='n', lwd=3)
title(main="C", line=-1.5, cex.main=2)
dev.off()