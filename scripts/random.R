
random.kmeans <- function(seed) {
  set.seed(seed)
  df <- data.frame(x=runif(100), y=runif(100))
  d <- dist(df)
  k <- kmeans(d,10)
  return(k)
}

max.val <- 0
index <- -1
for (i in 1:20) {
  k <- random.kmeans(i)
  val <- k$betweenss/k$totss
  if (val > max.val) {
    max.val <- val
    index <- i
  }
}

set.seed(index)
df <- data.frame(x=runif(100), y=runif(100))
d <- dist(df)
k <- kmeans(d,10)

require(RColorBrewer)
pal <- brewer.pal(10, 'Dark2')
par(mar=c(1,1,1,1))
plot(df$x, df$y, col=pal[k$cluster], 
     pch=20, cex=2, xaxt='n', yaxt='n', xlab='', ylab='')

#require(ggplot2)
#ggplot(df, aes(x,y, color=rainbow(5)[k$cluster]), legend=FALSE) + geom_point()

