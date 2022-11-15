import {
  Alert,
  Container,
  Box,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Paper,
  Grid,
  CircularProgress,
} from '@mui/material'
import Typography from '@mui/material/Typography'
import Head from 'next/head'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { useState } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts'
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded'
import ArchitectureRoundedIcon from '@mui/icons-material/ArchitectureRounded'

import classes from '@/styles/root.module.css'
import { EAModal } from '@/components/EAModal'
import { BinaryForm } from '@/components/BinaryForm'
import { ResultTable } from '@/components/ResultTable'
import useBinaryForm from '@/api/useBinaryForm'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [representation, setRepresentation] = useState<'decimal' | 'binary'>('binary')
  const [data, setData] = useState<any | undefined>(undefined)
  const binaryForm = useBinaryForm(setData)

  return (
    <>
      <Head>
        <title>OE - Michal Zajac</title>
      </Head>
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
          {representation == 'binary' ? (
            <BinaryForm
              isLoading={binaryForm.isLoading}
              onSubmit={binaryForm.onSubmit}
              control={binaryForm.control}
            />
          ) : (
            <div />
          )}
        </div>
        <Container sx={{ flexGrow: 1, paddingY: '32px', height: '100vh', overflow: 'auto' }}>
          <Paper variant="outlined" sx={{ padding: '32px', mb: '16px' }}>
            <Box height="400px" display="flex" alignItems="center" justifyContent="center">
              {data && !binaryForm.isLoading && (
                <ResponsiveContainer>
                  <LineChart data={data.evolution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis label={{ value: 'epoch' }} height={80} dataKey="epoch" />
                    <YAxis
                      domain={[0, 1]}
                      label={{ value: 'f(x*)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip />
                    <Legend verticalAlign="top" height={40} />
                    <Line type="monotone" dataKey="value" stroke="#1976d2" />
                    <Line type="monotone" dataKey="avg" stroke="#dd124f" />
                  </LineChart>
                </ResponsiveContainer>
              )}
              {!data && !binaryForm.isLoading && (
                <Box display="flex" flexDirection="column" alignItems="center">
                  <AutoGraphRoundedIcon sx={{ fontSize: '60px' }} />
                  <Typography mb="8px">No data here</Typography>
                  <Button variant="contained" onClick={binaryForm.onSubmit}>
                    Calculate
                  </Button>
                </Box>
              )}
              {binaryForm.isLoading && <CircularProgress />}
            </Box>
            <Grid container spacing={2}>
              <Grid xs={4} item>
                <Box display="flex" gap="8px" alignItems="center">
                  <AccessTimeRoundedIcon /> {data ? data.time + 's' : '-'}
                </Box>
              </Grid>
              <Grid xs={4} item>
                <Box display="flex" gap="8px" alignItems="center">
                  <AssessmentRoundedIcon /> {data ? data.best.value : '-'}
                </Box>
              </Grid>
              <Grid xs={4} item>
                <Box display="flex" gap="8px" alignItems="flex-start">
                  <ArchitectureRoundedIcon />
                  {data ? (
                    <Box display="flex" flexDirection="column" gap="4px">
                      {data.best.xx.map((x: any, index: number) => (
                        <Typography key={x}>
                          <b>x{index + 1}</b> {x}
                        </Typography>
                      ))}
                    </Box>
                  ) : (
                    '-'
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
          <ResultTable evolution={data?.evolution} />
        </Container>
      </div>
      <EAModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
