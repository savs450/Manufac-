import React from 'react'
import { MantineProvider, Table } from "@mantine/core";


const data = [
  {
    "Alcohol": 1,
    "Flavanoids": 2.8
  },
  {
    "Alcohol": 1,
    "Flavanoids": 2.65
  },
  {
    "Alcohol": 2,
    "Flavanoids": 2.8
  },
  {
    "Alcohol": 2,
    "Flavanoids": 3.85
  },
  {
    "Alcohol": 2,
    "Flavanoids": 2.8
  },
  {
    "Alcohol": 3,
    "Flavanoids": 3.27
  }
];


const classes = [...new Set(data.map(item => item.Alcohol))];

// Step 3: Define utility functions to calculate mean, median, and mode
function calculateMean(data) {
  const sum = data.reduce((acc, curr) => acc + curr, 0);
  return sum / data.length;
}

function calculateMedian(data) {
  const sortedData = data.sort((a, b) => a - b);
  const mid = Math.floor(sortedData.length / 2);
  return sortedData.length % 2 !== 0 ? sortedData[mid] : (sortedData[mid - 1] + sortedData[mid]) / 2;
}

function calculateMode(data) {
  const counts = {};
  data.forEach(item => {
    counts[item] = (counts[item] || 0) + 1;
  });
  let mode;
  let maxCount = 0;
  Object.entries(counts).forEach(([key, value]) => {
    if (value > maxCount) {
      mode = key;
      maxCount = value;
    }
  });
  return parseFloat(mode);
}

// Step 4: Calculate measures for each property and class
const properties = Object.keys(data[0]).filter(prop => prop !== 'Alcohol');
console.log("properties",properties)

const measures = properties.reduce((acc, prop) => {
  acc[prop] = {};
  classes.forEach(cls => {
    const classData = data.filter(item => item.Alcohol === cls).map(item => item[prop]);
    acc[prop][cls] = {
      mean: calculateMean(classData),
      median: calculateMedian(classData),
      mode: calculateMode(classData)
    };
  });
  return acc;
}, {});

function ResultsTable() {
  return (
    <MantineProvider>
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>MEASURE</Table.Th>
          {classes.map(cls => <th key={cls}>CLASS {cls}</th>)}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {properties.map(prop => (
          <Table.Tr key={prop}>
            <Table.Th>FLAVANOIDS MEAN</Table.Th>    
            {classes.map(cls => (
              <Table.Td key={`${prop}-${cls}`}>                
                <div>
                  <div>MEAN: {measures[prop][cls].mean.toFixed(2)}</div>
                  <div>MEDIAN: {measures[prop][cls].median.toFixed(2)}</div>
                  <div>MODE: {measures[prop][cls].mode}</div>
                </div>
              </Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
    </MantineProvider>
  );
}

export default ResultsTable
