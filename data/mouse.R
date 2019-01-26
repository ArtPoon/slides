setwd('~/slides/data')
mouse <- read.csv('mouse.csv', sep=' ', comment.char='#', header=F)
names(mouse) <- c('x', 'y', 'group')


res <- kmeans(mouse[,1:2], centers=3)

require(RColorBrewer)
pal <- brewer.pal(3, 'Pastel1')
pal2 <- c('firebrick', 'dodgerblue', 'forestgreen')

par(mar=c(1,1,1,1))
plot(mouse$x, mouse$y, bg=pal[res$cluster], pch=21, col='black', 
     xaxt='n', yaxt='n')
points(res$centers, col=c(rgb(1,0,0,0.75), rgb(0,0,1,0.75), rgb(0,0.6,0,0.75)), pch=3, cex=5, lwd=4)

plot(mouse$x, mouse$y, bg=pal[as.integer(mouse$group)], pch=21, col='black', 
     xaxt='n', yaxt='n')

require(mclust)

fit <- Mclust(mouse[,1:2])