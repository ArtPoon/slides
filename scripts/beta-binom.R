x <- seq(0, 1, length.out=100)

pdf(file='~/slides/img/beta-binom.pdf', width=5, height=5)

par(mar=c(5,5,1,1))
plot(x, dbeta(x, shape1=5, shape2=5), type='l', lty=2, 
     col='red', lwd=2,
     ylab='Probability', xlab='Coin toss probability (p)')
text(x=0.8, y=1, label='Prior', col='red')
polygon(x, dbinom(4, size=10, prob=x), border=NA, col=rgb(0,0,1,0.2))
lines(x, dbinom(4, size=10, prob=x), col='blue', lwd=2)
text(x=0.4, y=0.1, label='Likelihood', col='blue')
lines(x, dbinom(4, size=10, prob=x) * dbeta(x, shape1=5, shape2=5),
      lwd=2)
text(x=0.5, y=0.7, label='Posterior')

dev.off()
