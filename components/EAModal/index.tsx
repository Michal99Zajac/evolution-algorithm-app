import { Modal, Card, Link } from '@mui/material'
import Typography from '@mui/material/Typography'

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function EAModal(props: Props) {
  const { isOpen, setIsOpen } = props

  return (
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
          evolutionary computation, a generic population-based metaheuristic optimization algorithm.
          An EA uses mechanisms inspired by biological evolution, such as reproduction, mutation,
          recombination, and selection. Candidate solutions to the optimization problem play the
          role of individuals in a population, and the fitness function determines the quality of
          the solutions. Evolution of the population then takes place after the repeated application
          of the above operators.
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
  )
}

export default EAModal
