import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Skeleton from 'react-loading-skeleton';

const styles = (theme) => ({
  ...theme.spread,
});

const ScreamSkeleton = (props) => {
  return (
    <section>
      <h2 className="section-title">
        <Skeleton height={10} width={100} />
      </h2>

      <ul className="list">
        {Array(4)
          .fill()
          .map((item, index) => (
            <span className="card" key={index}>
              <Skeleton height={120} />
              <h4 className="card-title">
                <Skeleton circle={true} height={100} width={100} />  
                <Skeleton height={36} width={`80%`} />
              </h4>
              <p className="card-channel">
                <Skeleton width={`60%`} />
              </p>
              <div className="card-metrics">
                <Skeleton width={`90%`} />
              </div>
            </span>
          ))}
      </ul>
    </section>
  );
};

ScreamSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScreamSkeleton);
