export type WeightedValue<T> = {
  v: T
  w: number
}

export type WeightedDistribution<T> = WeightedValue<T>[]

export type DistributionParams<T> = {
  dist: WeightedDistribution<T>
  count: number
}
