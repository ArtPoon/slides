setwd("~/slides")
phylo <- read.csv("data/phylodynamics-refs.csv")
phylo <- phylo[phylo$Year < 2024, ]

svg("img/phylodynamics-refs.svg", width=5, height=5)
par(mar=c(5,5,1,1))
plot(phylo$Year, phylo$google, type='o', pch=21, bg='white',
     ylab="Number of papers", xlab="Year of publication", 
     bty='n')
lines(phylo$Year, phylo$pubmed, type='o', pch=21, bg='black')
abline(v=2019, lty=2)
legend(x=2005, y=850, legend=c("Google", "PubMed"), 
       pch=21, pt.bg=c("white", "black"))
dev.off()