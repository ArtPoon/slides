#' n is the chain length
#' p01 is the transition probability from hidden state 0 to 1
#' p10 is ... from 1 to 0
#' e0 is probability of emitting visible state A given hidden state 0
#' e1 is .... given hidden state 1
hmm.sim <- function(n, p01, p10, e0, e1) {
  h <- rep(NA, n+1); h[1] <- 0  # initialize hidden state vector
  v <- rep(NA, n)  # visible states
  for (i in 2:(n+1)) {
    p <- ifelse(h[i-1]==0, p01, p10)
    h[i] <- h[i-1]  # propagate hidden state, unless...
    if (runif(1) < p) {
      h[i] <- (h[i-1]+1)%%2  # hidden state transition
    }
    # emit visible state
    v[i-1] <- rbinom(1, size=1, prob=ifelse(h[i]==0, e0, e1))
  }
  return(cbind(h[2:(n+1)], v))
}
