import React from 'react';
import { WineData as wineData } from './wineData';
import '@mantine/core/styles.css';
import { Table } from '@mantine/core';
import '../App.css'

function Gamma() {

  function calculateGamma(data) {
    data.forEach(value => {
      value.Gamma =((value.Ash * value.Hue) / value.Magnesium).toFixed(2);
    });
  }

  let updatedData = calculateGamma(wineData);

  function calculateClassWiseStats(data) {
    let gammaStats = {};
  
    data.forEach(value => {
      let gamma = value.Gamma;
      if (!gammaStats[gamma]) {
        gammaStats[gamma] = [];
      }
      gammaStats[gamma].push(value);
    });
  
    let classWiseStats = {};
  
    Object.keys(gammaStats).forEach(gamma => {
      let classData = gammaStats[gamma];
      let gammaValues = classData.map(value => value.Gamma);
      classWiseStats[gamma] = {
        mean: calculateMean(gammaValues),
        median: calculateMedian(gammaValues),
        mode: calculateMode(gammaValues)
      };
    });
  
    return classWiseStats;
  }
  
  function calculateMean(data) {
    let sum = data.reduce((acc, val) => acc + val, 0);
    let mean = sum / data.length;
    return isNaN(mean) ? '-' : mean;
  }
  
  function calculateMedian(data) {
    data.sort((a, b) => a - b);
    let mid = Math.floor(data.length / 2);
    if (data.length % 2 === 0) {
      return (parseFloat(data[mid - 1]) + parseFloat(data[mid])) / 2;
    } else {
      return parseFloat(data[mid]);
    }
  }
  
  function calculateMode(data) {
    let frequency = {};
    data.forEach(value => {
      frequency[value] = (frequency[value] || 0) + 1;
    });
  
    let modes = [];
    let maxFrequency = 0;
    for (let value in frequency) {
      if (frequency[value] > maxFrequency) {
        modes = [parseFloat(value)];
        maxFrequency = frequency[value];
      } else if (frequency[value] === maxFrequency) {
        modes.push(parseFloat(value));
      }
    }
  
    return modes.length === 1 ? modes[0] : modes;
  }
  
  const classWiseStats = calculateClassWiseStats(wineData);
  // console.log("classWiseStats",classWiseStats);
  
  
  return (
    <div  className="GammaTable">
      <h2>Gamma Table</h2>
      <Table>
        <Table.Thead>
         <Table.Tr>
         <Table.Th>Measure</Table.Th>
         {Object.keys(classWiseStats).map((key,i)=>(
            <Table.Th key={i}>{`Class ${key}`}</Table.Th>
          ))}
         </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
        <Table.Tr>
          <Table.Th>Mean</Table.Th>
          {Object.keys(classWiseStats).map((key) => (
            <Table.Td key={key}>{classWiseStats[key].mean}</Table.Td>
          ))}
        </Table.Tr>
        <Table.Tr>
        <Table.Th>Median</Table.Th>
        {Object.keys(classWiseStats).map((key) => (
            <Table.Td key={key}>{classWiseStats[key].median}</Table.Td>
          ))}
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Mode</Table.Th>
        {Object.keys(classWiseStats).map((key) => (
            <Table.Td key={key}>{classWiseStats[key].mode}</Table.Td>
          ))}
        </Table.Tr>
        </Table.Tbody>
      </Table>
    </div>
  )
}

export default Gamma;
