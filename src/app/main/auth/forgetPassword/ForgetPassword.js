import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ForgetPasswordDetail from './ForgetPasswordDetail';

import darkBackground from "@assets/images/backgrounds/dark-material-bg.jpg";


const useStyles = makeStyles((theme) => ({
  root: {
    // background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
    //   theme.palette.primary.dark,
    //   0.5
    // )} 100%)`,
    background: `url(${darkBackground})`,
    color: theme.palette.primary.contrastText,
  },
  leftSection: {},
  rightSection: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
      theme.palette.primary.dark,
      0.5
    )} 100%)`,
    color: theme.palette.primary.contrastText,
  },
}));

function ForgetPassword() {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  function handleTabChange(event, value) {
    setSelectedTab(value);
  }

  return (
    <div
      className={clsx(
        classes.root,
        'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
      )}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full max-w-400 rounded-20 shadow-2xl overflow-hidden"
      >
        <Card
          className={clsx(
            classes.leftSection,
            'flex flex-col w-full max-w-sm items-center justify-center shadow-0 py-12'
          )}
          square
        >
          <CardContent className="">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              className="flex items-center justify-center py-24"
            >
              <Typography className="text-24 tracking-widest ml-6 -mt-8 font-700" color="textSecondary">
                Forget Password
              </Typography>
            </motion.div>
          </CardContent>
          <ForgetPasswordDetail />

          <div className="flex flex-col items-center justify-center pb-12">
            <div>
              <span className="font-normal mr-8">Go to</span>
              <Link className="font-normal" to="/login">
                Login...
              </Link>
            </div>
            {/* <Link className="font-normal mt-8" to="/">
              Back to Dashboard
            </Link> */}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export default ForgetPassword;
