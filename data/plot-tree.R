require(ggtree)
require(ape)
trees <- read.tree('~/git/papers/clustrev/data/Both.labeled.nwk')
tr <- trees[[7]]

ans <- ace(grepl("_1_", tr$tip.label), tr, type='d')
tr$node.label <- apply(ans$lik.anc, 1, function(p) sample(c('_0_', '_1_'), size=1, prob=p))

df <- fortify(tr)
df$cluster <- grepl("_1_", df$label)

ggtree(tr, aes(color=df$cluster))