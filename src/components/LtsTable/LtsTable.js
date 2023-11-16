import React from 'react';

const LtsTable = () => {
  const styles = {
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    header: {
      background: '#f2f2f2',
    },
    cell: {
      border: '1px solid #dddddd',
      textAlign: 'left',
      padding: '8px',
    },
    lts1: {
      background: '#4CAF50', // Green
      color: 'white',
    },
    lts2: {
      background: '#8BC34A', // Light Green
      color: 'white',
    },
    lts3: {
      background: '#FFEB3B', // Yellow
      color: 'black',
    },
    lts4: {
      background: '#F44336', // Red
      color: 'white',
    }
  };

  return (
    <table style={styles.table}>
      <thead>
        <tr style={styles.header}>
          <th style={styles.cell}>LTS</th>
          <th style={styles.cell}>Comfortable Enough</th>
          <th style={styles.cell}>Characteristics</th>
        </tr>
      </thead>
      <tbody>
        <tr style={styles.lts1}>
          <td style={styles.cell}>1</td>
          <td style={styles.cell}>Most People</td>
          <td style={styles.cell}>Lowest Stress<br />Comfortable for most ages and abilities</td>
        </tr>
        <tr style={styles.lts2}>
          <td style={styles.cell}>2</td>
          <td style={styles.cell}>Interested, but Concerned</td>
          <td style={styles.cell}>Suitable for most adults<br />Presenting little traffic stress</td>
        </tr>
        <tr style={styles.lts3}>
          <td style={styles.cell}>3</td>
          <td style={styles.cell}>Enthused and Confident</td>
          <td style={styles.cell}>Moderate traffic stress<br />Comfortable for those already biking in American cities</td>
        </tr>
        <tr style={styles.lts4}>
          <td style={styles.cell}>4</td>
          <td style={styles.cell}>Strong and Fearless</td>
          <td style={styles.cell}>High traffic stress<br />Multilane, fast moving traffic</td>
        </tr>
      </tbody>
    </table>
  );
};

export default LtsTable;

