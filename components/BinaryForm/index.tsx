import {
  Box,
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

import { Controller, Control } from 'react-hook-form'

import { BinaryForm } from './form'

interface Props {
  isLoading: boolean
  onSubmit: any
  control: Control<BinaryForm, any>
}

export function BinaryForm(props: Props) {
  const { isLoading, onSubmit, control } = props

  return (
    <form onSubmit={onSubmit}>
      <Button type="submit" disabled={isLoading} variant="contained" fullWidth>
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
          <FormControl disabled={isLoading} error={!!fieldState.error} fullWidth>
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
          <FormControl disabled={isLoading} error={!!fieldState.error} margin="normal" fullWidth>
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
            <FormControl disabled={isLoading} error={!!fieldState.error} margin="normal" fullWidth>
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
            <FormControl disabled={isLoading} error={!!fieldState.error} margin="normal" fullWidth>
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
          <FormControl disabled={isLoading} error={!!fieldState.error} margin="normal" fullWidth>
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
            <FormControl disabled={isLoading} error={!!fieldState.error} margin="normal" fullWidth>
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
              disabled={isLoading}
              margin="normal"
              error={!!fieldState.error}
              sx={{ minWidth: 'max-content' }}
            >
              <ToggleButtonGroup
                disabled={isLoading}
                size="small"
                color="primary"
                exclusive
                {...field}
              >
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
          <FormControl
            disabled={isLoading}
            error={!!fieldState.error}
            fullWidth
            sx={{ marginBottom: '16px' }}
          >
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
            <FormControl disabled={isLoading} error={!!fieldState.error} margin="normal" fullWidth>
              <FormLabel>Percentage</FormLabel>
              <OutlinedInput
                startAdornment={<Box mr="4px">%</Box>}
                {...field}
                size="small"
                type="number"
              />
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="selection_config.group_size"
          rules={{ min: 2 }}
          render={({ field, fieldState }) => (
            <FormControl disabled={isLoading} error={!!fieldState.error} margin="normal" fullWidth>
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
          <FormControl
            disabled={isLoading}
            error={!!fieldState.error}
            fullWidth
            sx={{ marginBottom: '16px' }}
          >
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
          <FormControl disabled={isLoading} error={!!fieldState.error} margin="normal" fullWidth>
            <FormLabel>Probability</FormLabel>
            <OutlinedInput
              startAdornment={<Box mr="4px">%</Box>}
              {...field}
              size="small"
              type="number"
            />
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
          <FormControl
            disabled={isLoading}
            error={!!fieldState.error}
            fullWidth
            sx={{ marginBottom: '16px' }}
          >
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
          <FormControl disabled={isLoading} error={!!fieldState.error} margin="normal" fullWidth>
            <FormLabel>Probability</FormLabel>
            <OutlinedInput
              startAdornment={<Box mr="4px">%</Box>}
              {...field}
              size="small"
              type="number"
            />
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
          <FormControl disabled={isLoading} error={!!fieldState.error} margin="normal" fullWidth>
            <FormLabel>Probability</FormLabel>
            <OutlinedInput
              startAdornment={<Box mr="4px">%</Box>}
              {...field}
              size="small"
              type="number"
            />
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
          <FormControl disabled={isLoading} error={!!fieldState.error} margin="normal" fullWidth>
            <FormLabel>Percentage</FormLabel>
            <OutlinedInput
              startAdornment={<Box mr="4px">%</Box>}
              {...field}
              size="small"
              type="number"
            />
          </FormControl>
        )}
      />
    </form>
  )
}

export default BinaryForm
