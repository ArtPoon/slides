micro <- read.csv('~/Downloads/Microbe-scope - bugs.csv', header=F, skip=4)
micro$fatality <- as.double(gsub("([0-9.]+)%", "\\1", micro$V5))
micro$fatality[is.na(micro$fatality)] <- 1e-2
micro$fatality[micro$fatality==0] <- 1e-2
micro$fatality[2] <- 62
micro$fatality[3] <- 58
micro$fatality[11] <- 70  # Ebola, revised
micro$fatality[40] <- 5  # 60% is way too high
micro$fatality[27] <- 0.2  # paralytic polio only
micro$fatality[15] <- 99  # about 1 in 300 long-term non-progressors

require(RColorBrewer)
pal <- brewer.pal(name='Set1', n=5)

par(mar=c(5,5,1,1))
plot(micro$V3, micro$fatality, xlim=c(0,20), 
     xlab='Contagiousness (R0)', ylab='Fatality rate (%)', 
     las=1, bg=pal[as.integer(micro$V7)], 
     pch=21, cex=2, col='white')
abline(v=1, lty=2)

text(x=12, y=10, label='M.tuberculosis', cex=0.7)
#text(x=5, y=100, label='Y.pestis(pneumonic)', cex=0.7)
text(x=7, y=99, label='HIV(untreated)', cex=0.7)
#text(x=7.25, y=0.5, label='Polio', cex=0.7)

text(x=17, y=6, label='B.pertussis', cex=0.7)
text(x=19, y=0, label='Rotavirus', cex=0.7)
text(x=5, y=63, label='Influenza A (H5N1)', cex=0.7)
text(x=3, y=95, label='Rabies(untreated)', cex=0.7)
text(x=4, y=70, label='Ebola', cex=0.7)
