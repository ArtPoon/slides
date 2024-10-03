sky <- read.csv("~/slides/data/hcv-skyline.csv", sep='\t', skip=1)

pdf("~/slides/img/hcv-skyline.pdf", width=5, height=4)
par(mar=c(5,5,1,1))
plot(rev(sky$time), sky$median, xaxt='n', bty='n', cex.axis=0.8,
     ylim=c(0, max(sky$upper)), type='n',
     xlab='Years before present', ylab="Effective number of infections")
tmax <- max(sky$time)
x <- tmax-seq(0, 300, 50)
axis(side=1, at=rev(x), labels=seq(300, 0, -50))
polygon(c(rev(sky$time), sky$time), c(sky$upper, rev(sky$lower)), 
        border=NA, col='lightblue2')
lines(rev(sky$time), sky$median, lwd=2)
dev.off()