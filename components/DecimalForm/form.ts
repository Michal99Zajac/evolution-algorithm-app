export interface DecimalForm {
  config: {
    epochs: number
    left_limit: number
    right_limit: number
    amount: number
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
    k: number
    alpha: number
    beta: number
  }
  mutation_config: {
    type: string
    probability: number
  }
  elite_config: {
    percentage: number
  }
}

export const defaultValues: DecimalForm = {
  config: {
    epochs: 50,
    left_limit: -10,
    right_limit: 10,
    amount: 100,
    fitness: 'SCHAFFER_N4',
    type: 'min',
  },
  selection_config: {
    type: 'THE_BEST',
    percentage: 40,
    group_size: 3,
  },
  crossover_config: {
    type: 'ARITHMETIC',
    probability: 30,
    k: 0.5,
    alpha: 0.2,
    beta: 0.3,
  },
  mutation_config: {
    type: 'UNIFORM',
    probability: 30,
  },
  elite_config: {
    percentage: 10,
  },
}
