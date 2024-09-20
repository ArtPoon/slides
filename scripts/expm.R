require(expm)
q <- matrix(c(-3, 1, 1, 1,
              1, -3, 1, 1,
              1, 1, -3, 1,
              1, 1, 1, -3), nrow=4, byrow=T)

meat <- function(mx, cex.lab=1, digits=5, title=NA) {
  par(mar=rep(1.5, 4))
  plot(NA, xlim=c(0.5, 4.5), ylim=c(0.5, 4.5), 
       bty='n', xaxt='n', yaxt='n', main=title, cex.main=2)
  for (i in 1:4) {
    for (j in 1:4) {
      z <- mx[i,j]
      rect(xl=j-0.5, xr=j+0.5, yb=5-i-0.5, yt=5-i+0.5,
           col=rgb(1-z,1-z,1-z), border='white')
      text(x=j, y=5-i, adj=0.5, cex=cex.lab,
           label=round(z, digits=digits), col=rgb(z,z,z))
    }
  }
}


svg("~/slides/img/expm.svg", width=12, height=4)
par(mfrow=c(1,3))
meat(expm(q*0.001), digits=3, cex.lab=2, title="ut=0.001")
meat(expm(q*0.1), digits=3, cex.lab=2, title="ut=0.1")
meat(expm(q*0.5), digits=3, cex.lab=2, title="ut=0.5")
dev.off()
