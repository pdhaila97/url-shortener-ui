import React, { useEffect, useState } from 'react';
import { getLogsInformation } from '../../services/httpService';
import Loader from '../Loader';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function LogsPage(props: any) {
  const classes = useStyles();
  const id = props.match.params.id;
  const [logInfo, setLogInfo]: any = useState(null);

  useEffect(() => {
    if (id) {
      getLogsInformation(id).then((value) => {
        setLogInfo(value);
      })
    }
  }, [id]);
  return <>
    {logInfo ? <Box px={2} pt={4}>
      <Box textAlign="center" py={4}><Typography variant="body1">The short URL has been used {logInfo.numOfHits} times.</Typography></Box>
      {logInfo.hitsInfo && logInfo.hitsInfo.length > 0 && <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">S No.</StyledTableCell>
              <StyledTableCell align="center">IP Address</StyledTableCell>
              <StyledTableCell align="center">User Agent</StyledTableCell>
              {/* <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {logInfo.hitsInfo.map((item: any, index: any) => (
              <StyledTableRow key={item.shortUrl}>
                <StyledTableCell align="center" component="th" scope="row">
                  <Typography>{index + 1}.</Typography>
                </StyledTableCell>
                <StyledTableCell align="center"><Typography>{item.ipAddress}</Typography></StyledTableCell>
                <StyledTableCell align="center"><Typography>{item.userAgent}</Typography></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
    </Box> : <Loader />}
  </>
}

export default LogsPage;