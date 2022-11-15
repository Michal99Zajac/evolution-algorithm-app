export interface BinaryForm {
  config: {
    epochs: number
    left_limit: number
    right_limit: number
    amount: number
    precision: number
    fitness: string
    type: 'min' | 'max'
  }
  selection_config: {
    type: string
    percentage: number
    group_size?: number
  }
  crossover_config: {
    type: string
    probability: number
  }
  mutation_config: {
    type: string
    probability: number
  }
  inversion_config: {
    probability: number
  }
  elite_config: {
    percentage: number
  }
}

export const defaultValues: BinaryForm = {
  config: {
    epochs: 50,
    left_limit: -10,
    right_limit: 10,
    amount: 100,
    precision: 6,
    fitness: 'SCHAFFER_N4',
    type: 'min',
  },
  selection_config: {
    type: 'THE_BEST',
    percentage: 40,
    group_size: 3,
  },
  crossover_config: {
    type: 'HOMOGENEOUS',
    probability: 30,
  },
  mutation_config: {
    type: 'EDGE',
    probability: 30,
  },
  inversion_config: {
    probability: 20,
  },
  elite_config: {
    percentage: 10,
  },
}
