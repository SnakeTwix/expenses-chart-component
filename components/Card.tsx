import styles from '../styles/Card.module.scss';
import Image from 'next/image';

import type { Day } from '../interfaces/Day.interface';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

const MAX_HEIGHT = 10;

const Card = () => {
  const [data, setData] = useState<Day[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setData(null);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>Something went wrong...</div>;

  const amountsSpent = data.map((entry) => entry.amount);
  const maxAmount = Math.max(...amountsSpent);

  return (
    <div className={styles.wrapper}>
      <div className={styles.balance}>
        <div className={styles.info}>
          <p className={styles['info__text']}>My balance</p>
          <p className={`${styles['info__number']} text_bold`}>$921.48</p>
        </div>
        <Image src={'/logo.svg'} width='72' height='48' />
      </div>
      <div className={styles.cardWrapper}>
        <div className='card'>
          <p className={`${styles.spending} text_bold`}>
            Spending - Last 7 days
          </p>
          <div className={styles.chart}>
            {data.map((entry) => {
              const classes = classNames({
                [styles.column]: true,
                [styles.most]: entry.amount === maxAmount,
              });
              const height = (MAX_HEIGHT / maxAmount) * entry.amount;
              return (
                <div key={entry.day} className='column_wrapper'>
                  <div className={classes} style={{ height: height + 'rem' }}>
                    <div className={styles.hoverAmount}>${entry.amount}</div>
                  </div>
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
      </div>
    </div>
  );
};

export default Card;
