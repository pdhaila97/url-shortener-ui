import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Box, Link, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

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

export default function URLListTable(props: any) {
  const classes = useStyles();
  const { list: rows } = props;
  return (<>
    {rows && <>{Array.isArray(rows) && rows.length > 0 ? <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Long URL</StyledTableCell>
            <StyledTableCell>Short URL</StyledTableCell>
            <StyledTableCell>Expiry Time</StyledTableCell>
            <StyledTableCell>Logging Information</StyledTableCell>
            {/* <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((item: any) => (
            <StyledTableRow key={item.shortUrl}>
              <StyledTableCell component="th" scope="row">
                <Link href={item.url}>{item.url}</Link>
              </StyledTableCell>
              <StyledTableCell><Link href={item.shortUrl}>{item.shortUrl}</Link></StyledTableCell>
              <StyledTableCell>{item.expiryTime ? new Date(item.expiryTime).toString() : "Not set"}</StyledTableCell>
              <StyledTableCell>{item.loggingEnabled ? <RouterLink to={`/logs/${item.shortUrlHash}`}>Available</RouterLink> : "No Information"}</StyledTableCell>
              {/* <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> : <Box textAlign="center"><Typography variant="h6">
      No short URL has been created yet.
      </Typography></Box>}</>}
  </>
  );
}