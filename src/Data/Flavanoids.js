import React from 'react'
import { Table,MantineProvider  } from '@mantine/core';
import { WineData as wineData } from './wineData';
import '@mantine/core/styles.css';


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
    
    const mean =( sum / count);
    
 
   return { mean , median , mode}
  };

const Flavanoidsmean = []
const Flavanoidsmedian =[]
const Flavanoidsmode =[]


  for (const alcohol in groupedData) { 
   const obj = calculateStatistics(groupedData[alcohol], 'Flavanoids');
    // console.log(`Class ${alcohol}`,obj);
    Flavanoidsmean.push(obj.mean);
    Flavanoidsmedian.push(obj.median);
    Flavanoidsmode.push(obj.mode);
   }
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
            {Flavanoidsmean.map((val,i)=>(
              <Table.Td key={i}>{isNaN(val)?'-':(val.toFixed(3))}</Table.Td>
            ))}      
         </Table.Tr>
         <Table.Tr>
          <Table.Th>Flavonoids Median</Table.Th>
          {Flavanoidsmedian.map((val,i)=>(
            <Table.Td key={i}>{val.toFixed(3)}</Table.Td>
          ))}
         </Table.Tr>
         <Table.Tr>
          <Table.Th>Flavonoids Mode</Table.Th>
          {Flavanoidsmode.map((val,i)=>(
            <Table.Td key={i}>{val.toFixed(3)}</Table.Td>
          ))}
         </Table.Tr>
        </Table.Tbody>
      </Table>
    </div>
    </MantineProvider>
  );
}

export default WineStats;

