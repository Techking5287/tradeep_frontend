import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { memo } from 'react';
import img3 from '@assets/images/dashboard/cover3.png';
import { Button } from '@material-ui/core';

function Widget6(props) {
  return (
    <Paper className="w-full rounded-20 shadow flex flex-col justify-between p-10">
      <div className="flex items-center justify-between px-4 pt-8">
        <Typography component="img" src={img3} />
      </div>
      <div className="flex items-center justify-between pt-8">
        <Typography className="text-16 font-medium" color="textSecondary">
          Deploy a Deep Learning Model on Bitcoin
        </Typography>
      </div>
      <div className="flex items-center justify-between pt-8">
        <Typography variant="h6" color="secondary">
          $800
        </Typography>
        <Button variant="outlined" color="secondary">
          Enroll Now
        </Button>
      </div>
    </Paper>
  );
}

export default memo(Widget6);
