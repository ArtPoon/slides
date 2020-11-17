pam <- read.csv('~/slides/data/pam250.csv', row.names=1)

par(mar=c(3,3,0.5,0.5))
plot(0:20, 0:20, type='n', xaxt='n', yaxt='n', xlab='', ylab='')
axis(side=1, at=1:20-0.5, label=names(pam)[1:20], cex.axis=0.7)
axis(side=2, at=1:20-0.5, label=names(pam)[1:20], cex.axis=0.7)

for (i in 1:20) {
  for (j in 1:20) {
    x <- ((pam[i,j]+8)/25)  # range -8 to 17
    rect(xleft=i-1, xright=i, ybottom=j-1, ytop=j, col=rgb(1-x/2, 1-x, 1-x/2), border=NA)
  }
}
abline(a=0, b=1, lty=2)
rect(xleft=6, xright=7, ybottom=3, ytop=5)