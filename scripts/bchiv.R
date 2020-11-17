bc <- read.table('~/slides/data/bchiv.csv', sep=',', header=T)
bc$year[bc$half=='S2'] <- bc$year[bc$half=='S2'] + 0.5


svg(file='~/slides/img/timeline.svg', width=8, height=6)

par(mar=c(5,5,1,1), xpd=F)
plot(bc$year, bc$HIV, type='n', xlab='Year of HIV-1 diagnosis', 
     ylab='Number of HIV-1 diagnoses / 6mo', cex.lab=1.2,
     ylim=c(5,130))
rug(2003:2019, ticksize=-0.01, lwd=1, side=1)

add.grid()
rect(xleft=2013.4, xright=2020, ybottom=0, ytop=150, col=rgb(0,1,1,0.1), border=NA)
box()

arrows(x0=bc$year, x1=bc$year, y0=rep(0, nrow(bc)), y1=bc$HIV, length=0, col='salmon', lwd=2)
points(bc$year, bc$HIV, cex=2, pch=21, bg='salmon', col='white')


arrows(x0=2013.4, x1=2019.5, y0=100, y1=100, length=0.1, col='black', lwd=2)
text(x=2013.5, y=103, adj=0, col='black', label='Cluster monitoring begins', cex=1.1)

arrows(x0=2010.16, x1=2013.2, y0=123, y1=123, length=0, col='steelblue', lwd=2)
text(x=2010.2, y=126, adj=0, col='steelblue', label='STOP-HIV Pilot', cex=1.1)

arrows(x0=2013.3, x1=2019, y0=115, y1=115, length=0.1, col='steelblue', lwd=2)
text(x=2013.3, y=117.5, adj=0, col='steelblue', label='STOP-HIV Expansion', cex=1.1)

dev.off()