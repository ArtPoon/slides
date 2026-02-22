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

#################

pdf("~/slides/img/importance-sampling.pdf", width=4, height=6)
# Importance sampling
set.seed(5)
x <- rnorm(100)
d <- density(x, bw=0.1)
par(mar=c(3,3,1,1), mfrow=c(2,1))
plot(d, xlim=c(-8, 8), ylim=c(0, 0.8), 
     main='Uniform', xlab=NA, ylab=NA, bty='n')
abline(h=0.6, lty=2, col='red', lwd=1.5)

x <- runif(20, min=-8, max=8)
y <- runif(20, 0, 0.6)

z <- sapply (1:20, function(i) {
  if (x[i] < min(d$x) | x[i] > max(d$x)) { FALSE } else {
    # locate closest point
    j <- min(which(d$x > x[i]))
    y[i] < d$y[j]
  }
})

points(x, y, col='red', pch=ifelse(z, 19, 1))


plot(d, xlim=c(-8, 8), ylim=c(0, 0.8), 
     main='Importance', xlab=NA, ylab=NA, bty='n')
xx <- seq(-8, 8, 0.1)
lines(xx, 2*dnorm(xx), col='cadetblue', lwd=1.5, lty=2)

x2 <- rnorm(20)
y2 <- runif(length(x2), 0, 2*dnorm(x2))
z2 <- sapply(1:length(x2), function(i) {
  if (x2[i] < min(d$x) | x2[i] > max(d$x)) { FALSE } else {
    # locate closest point
    j <- min(which(d$x > x2[i]))
    y2[i] < d$y[j]
  }
})
points(x2, y2, col='cadetblue', pch=ifelse(z2, 19, 1))
dev.off()
