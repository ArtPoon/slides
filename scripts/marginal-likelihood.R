

# 10H, 1T (prior)
# 5H, 5T (data)

# true marginal likelihood
choose(10,5) * beta(5+10, 5+1) / beta(10, 1)


set.seed(2)
prior.sample <- rbeta(n=5, shape1=10, shape2=1) 
#rug(prior.sample, col='red', lwd=1)
points(prior.sample, rep(-0.2, 5), pch=19, col='red', cex=0.5)


# likelihoods calculated at prior samples of p
lk <- sapply(prior.sample, function(p) choose(10,5) * p^5 * (1-p)^5)
# harmonic mean with prior sample
1 / (1/length(lk) * sum(1/lk))
# arithmetic mean with prior sample
mean(lk)


require(revdbayes)
post.sample <- binpost(n=5, set_bin_prior(prior="beta", ab=c(10, 1)), 
                       ds_bin=list(n_raw=10, m=5))$bin_sim_vals
# arithmetic mean with posterior sample
sum(choose(10,5) * post.sample^5 * (1-post.sample)^5)/5

# harmonic mean estimator (posterior sample)
1 / (sum(1/(choose(10,5) * post.sample^5 * (1-post.sample)^5)) / 5)


svg("~/slides/img/marginal-likelihood.svg", width=5, height=5)
par(mar=c(5,5,1,1))
x <- seq(0, 1, 0.01)
plot(x, dbeta(x, 10, 1), type='l', col='red', lwd=2, bty='n',
     ylab="Probability density", xlab="Parameter (p)")
text(x=0.93, y=8, label="Prior", col='red', srt=80)


lines(x, dbinom(5, size=10, prob=x)*10, col='blue', lwd=2)
text(x=0.5, y=3, label="Likelihood", col='blue')

lines(x, dbinom(5+10, size=21, prob=x)*21, col='purple', lwd=2)
text(x=0.72, y=4.5, label="Posterior", col='purple')
#rug(post.sample, col='purple', lwd=1)
points(post.sample, rep(-0.2, 5), pch=17, col='purple', cex=0.7)
dev.off()
