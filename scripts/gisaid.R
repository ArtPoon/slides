require(ggfree)

setwd('~/git/covizu')
#meta <- read.csv("data/metadata_2020-11-16_11-06.csv")
meta <- read.csv('working/get-dates.csv')

meta$subdate <- as.Date(meta$subdate)

png(file="~/slides/img/gisaid-dates.png", res=300, width=300*5, height=300*5)
par(mar=c(5,5,1,1))
plot(meta$subdate, 1:nrow(meta), type='n', las=1, 
     bty='n', yaxt='n', ylab='', xlab='Submission date')
add.grid(bg.col='grey95')
lines(sort(meta$subdate), 1:nrow(meta), lwd=2, col='cadetblue')
axis(side=2, at=0:7*1e5, las=1,
     labels=c(0, parse(text=paste(1:7, "%*%10^5", sep=""))))

temp <- meta[grepl('[0-9]+-[0-9]+-[0-9]+', meta$coldate), ]
temp$coldate <- as.Date(temp$coldate)
lines(x=sort(temp$coldate), y=1:nrow(temp), type='s', 
      col='firebrick', lwd=2)
legend(x=as.Date('2020-01-01'), y=6e5, lwd=2, bty='n',
       legend=c('Collection dates', 'Submission dates'),
       lty=1, col=c('firebrick', 'cadetblue'))
dev.off()


#meta <- meta[!is.na(meta$coldate) & !is.na(meta$subdate), ]
#meta <- meta[meta$coldate > as.Date("2019-12-01"), ]
#meta <- meta[meta$host == 'Human', ]

require(ggfree)

svg(file="working/gisaid-dates2.svg", width=5.5, height=4.5)
par(mar=c(5,7,1,1))
plot(meta$coldate, 1:nrow(meta), type='n',xlab='Collection/submission date', 
     ylab=NA, las=2, bty='n')
add.grid(bg.col='ghostwhite', bty='n')
lines(sort(meta$coldate), 1:nrow(meta), lwd=2, col='steelblue')
title(ylab='Numnber of genomes', line=4.5)
lines(sort(meta$subdate), 1:nrow(meta), type='s', col='firebrick', lwd=2)
legend(x=as.Date('2020-01-15'), y=170000, lty=1, lwd=2,
       legend=c('by collection date', 'by submission date'),
       col=c('steelblue', 'firebrick'), cex=0.8)
dev.off()


meta$delay <- as.integer(meta$subdate - meta$coldate)
par(mar=c(5,5,1,1))
boxplot(split(meta$delay, meta$region))

# top 10 submitting countries
top10 <- names(sort(table(meta$country), decreasing = T))[1:10]
temp <- meta[is.element(meta$country, top10), ]

svg(file="gisaid-delays.svg", width=6, height=5)
par(mar=c(5,8,1,1))
ridgeplot(split(temp$delay, temp$country), step=0.005, 
          fill=gg.rainbow(10, alpha=0.5), bty='n', 
          xlab='Delay between sample collection and submission (days)')
dev.off()
