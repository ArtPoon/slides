sky <- read.csv("~/slides/data/hcv-skyline.csv", sep='\t', skip=1)

par(mar=c(5,5,1,1))
plot(rev(sky$time), sky$median, xaxt='n', bty='n', cex.axis=0.8,
     ylim=c(0, max(sky$upper)), type='n',
     xlab='Years before present', ylab="Effective number of infections")
tmax <- max(sky$time)
x <- tmax-seq(0, 300, 50)
axis(side=1, at=rev(x), labels=seq(300, 0, -50))
polygon()