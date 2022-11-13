import {
  Alert,
  Container,
  Box,
  IconButton,
  Modal,
  Card,
  Link,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  FormLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Button,
} from '@mui/material'
import Typography from '@mui/material/Typography'
import Head from 'next/head'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import produce from 'immer'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

import classes from '@/styles/root.module.css'
import { API_URL } from '@/config/env'

interface BinaryForm {
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

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [representation, setRepresentation] = useState<'decimal' | 'binary'>('binary')
  const [data, setData] = useState<any[] | null>(null)
  const { control, handleSubmit } = useForm<BinaryForm>({
    defaultValues: {
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
    },
  })

  const onSubmit = handleSubmit(async (rawData) => {
    // change values to float
    const data = produce(rawData, (draft) => {
      draft.crossover_config.probability = draft.crossover_config.probability / 100
      draft.inversion_config.probability = draft.inversion_config.probability / 100
      draft.selection_config.percentage = draft.selection_config.percentage / 100
      draft.mutation_config.probability = draft.mutation_config.probability / 100
      draft.elite_config.percentage = draft.elite_config.percentage / 100
    })

    try {
      const response = await axios.post(API_URL + '/api/bin', data)
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div className={classes.drawer}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb="16px">
            <Typography variant="h5">Evolution Algorithm</Typography>
            <IconButton onClick={() => setIsOpen(true)} aria-label="open description">
              <OpenInNewIcon />
            </IconButton>
          </Box>
          <Alert severity="info">
            The application is part of the evolutionary computing course at the Cracow University of
            Technology
          </Alert>
          <Box my="16px">
            <ToggleButtonGroup
              color="primary"
              value={representation}
              exclusive
              onChange={(event: any) => setRepresentation(event.target.value)}
            >
              <ToggleButton value="binary" aria-label="binary representation">
                binary
              </ToggleButton>
              <ToggleButton value="decimal" aria-label="decimal representation">
                decimal
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <form onSubmit={onSubmit}>
            <Button type="submit" variant="contained" fullWidth>
              Calculate
            </Button>
            <Typography variant="h6" mt="16px">
              General
            </Typography>
            <Controller
              control={control}
              name="config.epochs"
              rules={{ required: true, min: 1 }}
              render={({ field, fieldState }) => (
                <FormControl error={!!fieldState.error} fullWidth>
                  <FormLabel>Epochs</FormLabel>
                  <OutlinedInput size="small" type="number" {...field} />
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="config.amount"
              rules={{ required: true, min: 4 }}
              render={({ field, fieldState }) => (
                <FormControl error={!!fieldState.error} margin="normal" fullWidth>
                  <FormLabel>Population size</FormLabel>
                  <OutlinedInput {...field} size="small" type="number" />
                </FormControl>
              )}
            />
            <Box display="flex" gap="16px">
              <Controller
                control={control}
                name="config.left_limit"
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <FormControl error={!!fieldState.error} margin="normal" fullWidth>
                    <FormLabel>Left limit</FormLabel>
                    <OutlinedInput {...field} size="small" type="number" />
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="config.right_limit"
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <FormControl error={!!fieldState.error} margin="normal" fullWidth>
                    <FormLabel>Right limit</FormLabel>
                    <OutlinedInput {...field} size="small" type="number" />
                  </FormControl>
                )}
              />
            </Box>
            <Controller
              control={control}
              name="config.precision"
              rules={{ required: true, min: 1 }}
              render={({ field, fieldState }) => (
                <FormControl error={!!fieldState.error} margin="normal" fullWidth>
                  <FormLabel>Precision</FormLabel>
                  <OutlinedInput {...field} size="small" type="number" />
                </FormControl>
              )}
            />
            <Box display="flex" gap="16px" alignItems="flex-end">
              <Controller
                control={control}
                name="config.fitness"
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <FormControl error={!!fieldState.error} margin="normal" fullWidth>
                    <FormLabel>Fitness function</FormLabel>
                    <Select {...field} size="small">
                      <MenuItem value="SCHAFFER_N4">Schaffer N4</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="config.type"
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <FormControl
                    margin="normal"
                    error={!!fieldState.error}
                    sx={{ minWidth: 'max-content' }}
                  >
                    <ToggleButtonGroup size="small" color="primary" exclusive {...field}>
                      <ToggleButton value="min">min</ToggleButton>
                      <ToggleButton value="max">max</ToggleButton>
                    </ToggleButtonGroup>
                  </FormControl>
                )}
              />
            </Box>
            <Typography variant="h6" mt="16px">
              Selection
            </Typography>
            <Controller
              control={control}
              name="selection_config.type"
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <FormControl error={!!fieldState.error} fullWidth sx={{ marginBottom: '16px' }}>
                  <FormLabel>Type</FormLabel>
                  <Select {...field} size="small">
                    <MenuItem value="THE_BEST">The Best</MenuItem>
                    <MenuItem value="TOURNAMENT">Tournament</MenuItem>
                    <MenuItem value="ROULETTE">Roulette</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <Box display="flex" gap="16px">
              <Controller
                control={control}
                name="selection_config.percentage"
                rules={{ required: true, min: 0, max: 100 }}
                render={({ field, fieldState }) => (
                  <FormControl error={!!fieldState.error} margin="normal" fullWidth>
                    <FormLabel>Percentage</FormLabel>
                    <OutlinedInput {...field} size="small" type="number" />
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="selection_config.group_size"
                rules={{ min: 2 }}
                render={({ field, fieldState }) => (
                  <FormControl error={!!fieldState.error} margin="normal" fullWidth>
                    <FormLabel>Group size</FormLabel>
                    <OutlinedInput {...field} size="small" type="number" />
                  </FormControl>
                )}
              />
            </Box>
            <Typography variant="h6" mt="16px">
              Crossover
            </Typography>
            <Controller
              control={control}
              name="crossover_config.type"
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <FormControl error={!!fieldState.error} fullWidth sx={{ marginBottom: '16px' }}>
                  <FormLabel>Type</FormLabel>
                  <Select {...field} size="small">
                    <MenuItem value="HOMOGENEOUS">Homogeneous</MenuItem>
                    <MenuItem value="ONE_POINT">One Point</MenuItem>
                    <MenuItem value="TWO_POINT">Two Point</MenuItem>
                    <MenuItem value="THREE_POINT">Three Point</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="crossover_config.probability"
              rules={{ required: true, min: 0, max: 100 }}
              render={({ field, fieldState }) => (
                <FormControl error={!!fieldState.error} margin="normal" fullWidth>
                  <FormLabel>Probability</FormLabel>
                  <OutlinedInput {...field} size="small" type="number" />
                </FormControl>
              )}
            />
            <Typography variant="h6" mt="16px">
              Mutation
            </Typography>
            <Controller
              control={control}
              name="mutation_config.type"
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <FormControl error={!!fieldState.error} fullWidth sx={{ marginBottom: '16px' }}>
                  <FormLabel>Type</FormLabel>
                  <Select {...field} size="small">
                    <MenuItem value="EDGE">Edge</MenuItem>
                    <MenuItem value="SINGLE">Single</MenuItem>
                    <MenuItem value="TWO_POINT">Two Point</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="mutation_config.probability"
              rules={{ required: true, min: 0, max: 100 }}
              render={({ field, fieldState }) => (
                <FormControl error={!!fieldState.error} margin="normal" fullWidth>
                  <FormLabel>Probability</FormLabel>
                  <OutlinedInput {...field} size="small" type="number" />
                </FormControl>
              )}
            />
            <Typography variant="h6" mt="16px">
              Inversion
            </Typography>
            <Controller
              control={control}
              name="inversion_config.probability"
              rules={{ required: true, min: 0, max: 100 }}
              render={({ field, fieldState }) => (
                <FormControl error={!!fieldState.error} margin="normal" fullWidth>
                  <FormLabel>Probability</FormLabel>
                  <OutlinedInput {...field} size="small" type="number" />
                </FormControl>
              )}
            />
            <Typography variant="h6" mt="16px">
              Elite Strategy
            </Typography>
            <Controller
              control={control}
              name="elite_config.percentage"
              rules={{ required: true, min: 0, max: 100 }}
              render={({ field, fieldState }) => (
                <FormControl error={!!fieldState.error} margin="normal" fullWidth>
                  <FormLabel>Percentage</FormLabel>
                  <OutlinedInput {...field} size="small" type="number" />
                </FormControl>
              )}
            />
          </form>
        </div>
        <Container
          sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {data && (
            <LineChart
              width={900}
              height={400}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="epoch" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#1976d2" />
              <Line type="monotone" dataKey="avg" stroke="#dd124f" />
            </LineChart>
          )}
        </Container>
      </div>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="Evolution Algorithm"
        aria-describedby="Evolution Algorithm description modal"
      >
        <Card
          sx={{
            position: 'absolute',
            top: '50px',
            left: 0,
            right: 0,
            marginLeft: 'auto',
            marginRight: 'auto',
            width: 720,
            padding: '32px',
          }}
          variant="outlined"
        >
          <Typography variant="h5" mb="16px">
            Evolution Algorithm
          </Typography>
          <Typography variant="body1" mb="16px">
            In computational intelligence (CI), an evolutionary algorithm (EA) is a subset of
            evolutionary computation, a generic population-based metaheuristic optimization
            algorithm. An EA uses mechanisms inspired by biological evolution, such as reproduction,
            mutation, recombination, and selection. Candidate solutions to the optimization problem
            play the role of individuals in a population, and the fitness function determines the
            quality of the solutions. Evolution of the population then takes place after the
            repeated application of the above operators.
            <br />
            <br />
            For full description, see{' '}
            <Link href="https://en.wikipedia.org/wiki/Evolutionary_algorithm">wikipedia</Link>
          </Typography>
          <Typography variant="h5" mb="16px">
            Implementation
          </Typography>
          <Typography variant="body1" mb="16px">
            The following is an example of a generic single-objective genetic algorithm.
            <br /> Step One: Generate the initial population of individuals randomly. (First
            generation)
            <br /> Step Two: Repeat the following regenerational steps until termination:
            <ol>
              <li>
                Evaluate the fitness of each individual in the population (time limit, sufficient
                fitness achieved, etc.)
              </li>
              <li>Select the fittest individuals for reproduction. (Parents)</li>
              <li>
                Breed new individuals through crossover and mutation operations to give birth to
                offspring.
              </li>
              <li>Replace the least-fit individuals of the population with new individuals.</li>
            </ol>
          </Typography>
        </Card>
      </Modal>
    </>
  )
}
