import styles from '../styles/Card.module.scss';

import type { Day } from '../interfaces/Day.interface';
import classNames from 'classnames';
const data: Day[] = require('../mock/data.json');

const MAX_HEIGHT = 10;

const Card = () => {
  const amountsSpent = data.map((entry) => entry.amount);
  const maxAmount = Math.max(...amountsSpent);

  return (
    <div className={styles.wrapper}>
      <h2>Spending - Last 7 days</h2>
      <div className={styles.chart}>
        {data.map((entry) => {
          const classes = classNames({
            [styles.column]: true,
            [styles.most]: entry.amount === maxAmount,
          });
          const height = (MAX_HEIGHT / maxAmount) * entry.amount;
          return (
            <div key={entry.day} className='column_wrapper'>
              <div className={classes} style={{ height: height + 'rem' }}></div>
              <div className={`${styles.dayDisplay} text_brown`}>
                {entry.day}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.stats}>
        <div className='total'>
          <span className='text_brown'>Total this month</span>
          <h1>$478.33</h1>
        </div>
        <div className='percent'>
          <div
            className={`text_bold`}
            style={{
              textAlign: 'end',
            }}>
            +2.4%
          </div>
          <div className='text_brown'>from last month</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
