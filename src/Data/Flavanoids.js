import React from 'react'
import { Table,MantineProvider  } from '@mantine/core';
import { WineData as wineData } from './wineData';

// const wineData =	[
//   {
//   "Alcohol": 1,
//   "Malic Acid": 14.23,
//   "Ash": 1.71,
//   "Alcalinity of ash": 2.43,
//   "Magnesium": 15.6,
//   "Total phenols": 127,
//   "Flavanoids": 2.8,
//   "Nonflavanoid phenols": 3.06,
//   "Proanthocyanins": ".28",
//   "Color intensity": 2.29,
//   "Hue": 5.64,
//   "OD280/OD315 of diluted wines": 1.04,
//   "Unknown": 3.92
//   },
//   {
//   "Alcohol": 1,
//   "Malic Acid": 13.2,
//   "Ash": 1.78,
//   "Alcalinity of ash": 2.14,
//   "Magnesium": 11.2,
//   "Total phenols": 100,
//   "Flavanoids": 2.65,
//   "Nonflavanoid phenols": 2.76,
//   "Proanthocyanins": ".26",
//   "Color intensity": 1.28,
//   "Hue": 4.38,
//   "OD280/OD315 of diluted wines": 1.05,
//   "Unknown": 3.4
//   },
//   {
//   "Alcohol": 2,
//   "Malic Acid": 13.16,
//   "Ash": 2.36,
//   "Alcalinity of ash": 2.67,
//   "Magnesium": 18.6,
//   "Total phenols": 101,
//   "Flavanoids": 2.8,
//   "Nonflavanoid phenols": 3.24,
//   "Proanthocyanins": ".3",
//   "Color intensity": 2.81,
//   "Hue": 5.68,
//   "OD280/OD315 of diluted wines": 1.03,
//   "Unknown": 3.17
//   },
//   {
//   "Alcohol": 2,
//   "Malic Acid": 14.37,
//   "Ash": 1.95,
//   "Alcalinity of ash": 2.5,
//   "Magnesium": 16.8,
//   "Total phenols": 113,
//   "Flavanoids": 3.85,
//   "Nonflavanoid phenols": 3.49,
//   "Proanthocyanins": ".24",
//   "Color intensity": 2.18,
//   "Hue": 7.8,
//   "OD280/OD315 of diluted wines": ".86",
//   "Unknown": 3.45
//   },
//   {
//   "Alcohol": 2,
//   "Malic Acid": 13.24,
//   "Ash": 2.59,
//   "Alcalinity of ash": 2.87,
//   "Magnesium": 21,
//   "Total phenols": 118,
//   "Flavanoids": 2.8,
//   "Nonflavanoid phenols": 2.69,
//   "Proanthocyanins": ".39",
//   "Color intensity": 1.82,
//   "Hue": 4.32,
//   "OD280/OD315 of diluted wines": 1.04,
//   "Unknown": 2.93
//   },
//   {
//   "Alcohol": 3,
//   "Malic Acid": 14.2,
//   "Ash": 1.76,
//   "Alcalinity of ash": 2.45,
//   "Magnesium": 15.2,
//   "Total phenols": 112,
//   "Flavanoids": 3.27,
//   "Nonflavanoid phenols": 3.39,
//   "Proanthocyanins": ".34",
//   "Color intensity": 1.97,
//   "Hue": 6.75,
//   "OD280/OD315 of diluted wines": 1.05,
//   "Unknown": 2.85
//   }]

function WineStats() {
  let alcoholTypes = [...new Set(wineData.map(item => item.Alcohol))];
  
  const groupBy = (data, property) => {
    return data.reduce((groups, item) => {
      const key = item[property];
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
      return groups;
    }, {});
  };
 let groupedData =  groupBy(wineData,  'Alcohol')
//  console.log("GrouupedData",groupedData)

  const calculateStatistics = (group, property) => {
    const values = group.map(item => item[property]);
    const sum = values.reduce((acc, value) => acc + value, 0);
    const sortedValues = values.sort((a, b) => a - b);
    const count = values.length;
    const median = count % 2 === 0 ? (sortedValues[count / 2 - 1] + sortedValues[count / 2]) / 2 : sortedValues[Math.floor(count / 2)];
    
    const frequencies = {};
    let mode;
    let maxFrequency = 0;
    values.forEach(value => {
      frequencies[value] = (frequencies[value] || 0) + 1;
      if (frequencies[value] > maxFrequency) {
        mode = value;
        maxFrequency = frequencies[value];
      }
    });
    
    const mean = sum / count;
 
   return { mean , median , mode}
  };

// console.log("groupedData",groupedData)
const Flavanoidsmean = []
const Flavanoidsmedian =[]
const Flavanoidsmode =[]
  for (const alcohol in groupedData) { 
   const obj = calculateStatistics(groupedData[alcohol], 'Flavanoids');
    console.log(`Class ${alcohol}`,obj);
    Flavanoidsmean.push(obj.mean);
    Flavanoidsmedian.push(obj.median);
    Flavanoidsmode.push(obj.mode);
   }
// console.log("mean",Flavanoidsmean)
  return (
    
    <MantineProvider>
       <h2>Flavanoids Table</h2>
    <div>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Measure</Table.Th>
            {alcoholTypes.map(col => (
              <Table.Th key={col}>Class {col}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
         <Table.Tr>
            <Table.Th>Flavonoids mean</Table.Th>
            {Flavanoidsmean.map((val)=>(
              <Table.Td>{val.toFixed(2)}</Table.Td>
            ))}      
         </Table.Tr>
         <Table.Tr>
          <Table.Th>Flavonoids Median</Table.Th>
          {Flavanoidsmedian.map((val)=>(
            <Table.Td>{val.toFixed(2)}</Table.Td>
          ))}
         </Table.Tr>
         <Table.Tr>
          <Table.Th>Flavonoids Mode</Table.Th>
          {Flavanoidsmode.map((val)=>(
            <Table.Td>{val.toFixed(2)}</Table.Td>
          ))}
         </Table.Tr>
        </Table.Tbody>
      </Table>
    </div>
    </MantineProvider>
  );
}

export default WineStats;

