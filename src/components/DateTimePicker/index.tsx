import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker as DTPicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

function DateTimePicker(props: any) {
    const {value, onChange} = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DTPicker value={value} onChange={onChange} />
    </MuiPickersUtilsProvider>
  );
}

export default DateTimePicker;