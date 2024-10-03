setwd("~/slides")
pam <- read.csv('data/pam250.csv', row.names=1)

set.seed(1)
pal <- sample(hcl.colors(n=20, "Set3"), 20)

pdf(file="img/pam250-squares.pdf", width=5, height=5)
par(mar=c(0.5,5,5,0.5))
plot(0:20, 0:20, type='n', xaxt='n', yaxt='n', xlab='', 
     ylab='Descendant', bty='n')
title(main="Ancestral", line=3, font.main=1, cex.main=1)
axis(side=3, at=1:20-0.5, label=names(pam), cex.axis=0.6)
axis(side=2, at=rev(1:20-0.5), label=names(pam), cex.axis=0.6, las=2)

for (i in 1:20) {
  for (j in 1:20) {
    x <- sqrt(pam[i,j]/100)
    if (x > 0) {
      xc <- i-0.5
      yc <- (20-j)+0.5
      rect(xleft=xc+x/2, xright=xc-x/2, 
           ybottom=yc+x/2, ytop=yc-x/2, col=pal[i], lwd=0.8)
    }
  }
}
abline(a=20, b=-1, lty=2, col=rgb(0,0,0,0.3))
#rect(xleft=6, xright=7, ybottom=3, ytop=5)
dev.off()


pam <- read.csv("data/pam1.csv", row.names=1)

pdf(file="img/pam1-squares.pdf", width=5, height=5)
par(mar=c(0.5,5,5,0.5))
plot(0:20, 0:20, type='n', xaxt='n', yaxt='n', xlab='', 
     ylab='Descendant', bty='n')
title(main="Ancestral", line=3, font.main=1, cex.main=1)
axis(side=3, at=1:20-0.5, label=names(pam), cex.axis=0.6)
axis(side=2, at=rev(1:20-0.5), label=names(pam), cex.axis=0.6, las=2)

for (i in 1:20) {
  for (j in 1:20) {
    x <- sqrt(pam[i,j]/10000)
    if (x > 0) {
      xc <- i-0.5
      yc <- (20-j)+0.5
      rect(xleft=xc+x/2, xright=xc-x/2, 
           ybottom=yc+x/2, ytop=yc-x/2, col=pal[i], lwd=0.8)
    }
  }
}
abline(a=20, b=-1, lty=2, col=rgb(0,0,0,0.3))
#rect(xleft=6, xright=7, ybottom=3, ytop=5)
dev.off()

