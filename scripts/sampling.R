x <- seq(-3, 3, length.out=100)
fx <- dnorm(x)
set.seed(3)
samp <- rnorm(20)

svg(filename='~/slides/img/sampling.svg', width=5, height=5)
par(mar=c(5,5,1,1))
plot(x, fx, type='n', ylim=c(0,0.5), bty='n', 
     ylab='Density', xlab='Parameter')
polygon(x, fx, border=NA, col='lightblue')
lines(x, fx)
rug(samp, ticksize=0.05, lwd=1, col='firebrick')
lines(density(samp), col='firebrick', lwd=2)
dev.off()

###########================================

set.seed(1)
x <- runif(100)
d <- density(x, bw=0.01)

svg(file="!/slides/img/monte-carlo.svg", width=5, height=5)
par(mar=c(2,1,1,1))

plot(NA, main='', xlab='', ylab='', xlim=range(d$x), 
     ylim=c(0, 3.5), cex.axis=0.8,
     yaxt='n', xaxt='s', bty='n')
abline(h=3.2, lty=2)

segments(d$x[100], y0=0, y1=d$y[100], col='red')
segments(d$x[200], y0=0, y1=d$y[200], col='red')
segments(d$x[400], y0=0, y1=d$y[400], col='red')
points(x=d$x[c(100,200,400)], y=runif(3, 0, max=3.2), pch=19, 
       col='cadetblue')
lines(d, lwd=2)

dev.off()

