import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'

interface Props {
  evolution?: {
    epoch: string | number
    value: string | number
    avg: string | number
    x: [string, string]
  }[]
}

export function ResultTable(props: Props) {
  const { evolution } = props

  return (
    <TableContainer sx={{ maxHeight: 600 }} variant="outlined" component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Epoch</TableCell>
            <TableCell align="right">Value</TableCell>
            <TableCell align="right">Avarage</TableCell>
            <TableCell align="right">x1</TableCell>
            <TableCell align="right">x2</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {evolution?.map((row) => (
            <TableRow key={row.epoch}>
              <TableCell>{row.epoch}</TableCell>
              <TableCell align="right">{row.value}</TableCell>
              <TableCell align="right">{row.avg}</TableCell>
              <TableCell align="right">{row.x[0]}</TableCell>
              <TableCell align="right">{row.x[1]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ResultTable
