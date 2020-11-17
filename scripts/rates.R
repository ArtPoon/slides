rates <- read.csv('~/Desktop/rates.csv', header=T)
require(RColorBrewer)
table(rates$Nucleic.acid)

pal <- brewer.pal(4, 'Set3')

par(mar=c(5,5,1,1))
plot(rates$Sampling.time.frame..years., 
  rates$Rate.estimate..substitutions.site.year., 
     log='xy',
     bg=pal[as.integer(rates$Nucleic.acid)],
     pch=21,
  xlab='Sampling time frame (years)',
  ylab='Evolutionary rate (subst/site/yr)',
  cex.lab=1.2
  )
index <- grepl("^HIV", rates$Analysis)
points(rates$Sampling.time[index], rates$Rate[index], cex=1.5, lwd=3)

legend(x=1e5, y=0.1, legend=levels(rates$Nucleic.acid), pch=21, pt.bg=pal)
