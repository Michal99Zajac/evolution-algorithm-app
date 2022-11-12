import { Alert, Container, Box, IconButton, Modal, Card, Link } from '@mui/material'
import Typography from '@mui/material/Typography'
import Head from 'next/head'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { useState } from 'react'

import classes from '@/styles/root.module.css'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)

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
        </div>
        <Container style={{ flexGrow: 1 }}>
          <Typography variant="h4">Title</Typography>
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
            <Box mt="8px">
              For full description, see{' '}
              <Link href="https://en.wikipedia.org/wiki/Evolutionary_algorithm">wikipedia</Link>
            </Box>
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
