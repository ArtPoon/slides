require(ape)
require(adephylo)

eb1 <- read.tree('~/slides/data/ebola.root1.nwk')
eb1$tip.label <- gsub("^'([A-Z0-9]+).+/([0-9]+)/.+$", "\\1_\\2", eb1$tip.label)

y1 <- distRoot(eb1)
x1 <- as.integer(gsub("^.+_([0-9]+)$", "\\1", names(y1)))
par(mar=c(5,5,1,1))
plot(jitter(x1, 10), y1, xlab='Sampling year', ylab='Distance to root', 
     cex=2, pch=21, bg='cadetblue', col='white')
fit <- lm(y1~x1)
abline(a=fit$coef[1], b=fit$coef[2])

plot(eb1, no.margin=TRUE)


#======================

eb2 <- read.tree('~/slides/data/ebola.root2.nwk')
eb2$tip.label <- gsub("^'([A-Z0-9]+).+/([0-9]+)/.+$", "\\1_\\2", eb2$tip.label)

y2 <- distRoot(eb2)
x2 <- as.integer(gsub("^.+_([0-9]+)$", "\\1", names(y2)))
par(mar=c(5,5,1,1))
plot(jitter(x2, 10), y2, xlab='Sampling year', ylab='Distance to root', 
     cex=2, pch=21, bg='cadetblue', col='white')
fit <- lm(y2~x2)
abline(a=fit$coef[1], b=fit$coef[2])

plot(eb2, no.margin=TRUE)
