/* eslint-disable import/prefer-default-export */
const colors = [
  'lightblue',
  'orange',
  'lightgreen',
  'pink',
  'yellow',
  'red',
  'grey',
  'magenta',
  'cyan',
];

export const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
