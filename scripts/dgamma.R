svg("~/slides/img/multinom.svg", width=4, height=4)
barplot(c(0.3, 0.4, 0.2, 0.1), names.arg=c('A', 'C', 'G', 'T'),
        xlab="Nucleotide", ylab="Probability", col=hcl.colors(4))
dev.off()

x <- seq(0, 5, length.out=100)

svg("~/slides/img/dgamma.svg", width=4, height=4)
par(mar=c(5,5,1,1), cex=1)
plot(x, dgamma(x, shape=1.5), type='l', bty='n',
     xlab="Basic reproduction number (R0)",
     ylab="Probability density")
segments(x0=1, y0=0, y1=dgamma(1, shape=1.5), col='blue', lty=2)
x0 <- seq(0, 1, length.out=20)
polygon(c(x0, 1), c(dgamma(x0, shape=1.5), 0), border=NA, 
        col=rgb(0, 0, 1, 0.1))
dev.off()

#pgamma(1, shape=1.5)
svg("~/slides/img/dpoisson.svg", width=4, height=4)
par(mar=c(5,5,1,1), cex=1)
x <- 0:6
barplot(dpois(x, lambda=1.2), names.arg=x,
     xlab="Number of events",
     ylab="Probability density")
dev.off()


svg("~/slides/img/dgeomexp.svg", width=4, height=4)
par(mar=c(5,5,1,1), cex=1)
x <- 0:6
barplot(dgeom(x, prob=0.5), names.arg=x, space=0, col='grey',
        border='white',
        xlab="Number of events",
        ylab="Probability density")
x <- seq(0, 6, 0.1)
lines(x, dexp(x, rate=0.5))
dev.off()


svg("~/slides/img/dnorm.svg", width=4, height=3)
par(mar=c(5,5,1,1), cex=1)
x <- seq(-3, 3, 0.05)
plot(x, dnorm(x), type='l', xlab="Continuous variable", 
     ylab="Probability density", bty='n', col='red', lwd=2)
abline(v=0, lty=2)
dev.off()



