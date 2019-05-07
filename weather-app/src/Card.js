import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import WeatherIcon from 'react-icons-weather';

const styles = {
  card: {
    minWidth: 220,
    maxWidth: 220,
    minHeight: 320,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 16,
  },
  pos: {
    marginBottom: 12,
  },
};

function SimpleCard(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
    
      <CardContent>

        <Typography className={classes.title} color="textSecondary"  variant="h2" component="h1" gutterBottom>
          <b> {props.time ? props.time: ''}</b> <br /><br />
        </Typography>

        <Typography className={classes.title} color="textSecondary"  variant="h5" component="h1" gutterBottom>
          <b>High &nbsp;{props.tempH}&#176;&nbsp; / &nbsp; </b>
          <b>Low &nbsp;{props.tempL}&#176;</b>            
        </Typography>

          <br />

        <Typography variant="h5" component="h1">
            <WeatherIcon name='darksky' iconId={props.icon} flip="horizontal" rotate="90" />
        </Typography>

          <br />

        <Typography className={classes.pos} color="textSecondary">
          {props.summary}
        </Typography>

      </CardContent>

      <CardActions>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
