setwd('~/slides/data')
source('3dbarplot.R')

# construct matrix of values to plot (N=10)
b3d <- matrix(0, nrow=11, ncol=11)
probs <- seq(0, 1, length.out=11)

z <- sapply(seq(0, 1, length.out=11), function(p) {
  sapply(11:1, function(y) dbinom(y-1, 10, p))
})
# x 

dimensions <- c(11,11)
scalexy <- 10
scalez <- 100
gap <- 0.2

y=seq(1,dimensions[1])*scalexy
x=seq(1,dimensions[2])*scalexy
gap=gap*scalexy

for (i in 1:11) {
  for (j in 1:11) {
    stackplot.3d(c(gap+x[j],x[j]+scalexy),
                 c(-gap-y[i],-y[i]-scalexy),
                 z[i,j]*scalez, alpha=0.5)
  }
}

play3d(spin3d(axis = c(0, 1, 0), rpm = 10), duration = 4)
writeWebGL()
