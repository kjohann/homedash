import React from 'react';
import ReactDOM from 'react-dom';
import GridLayout from 'react-grid-layout';

class MyFirstGrid extends React.Component {
  render() {
    // layout is an array of objects, see the demo for more complete usage
    var layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
      {i: 'b', x: 1, y: 0, w: 1, h: 2, static: true},
      {i: 'c', x: 2, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: 'd', x: 5, y: 0, w: 1, h: 2}
    ];
    return (
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
        <div style={{background: 'red'}} key="a">lola</div>
        <div key="b" style={{background: 'yellow'}}>lolb</div>
        <div key="c" style={{background: 'blue'}}>lolc</div>
        <div key="d" style={{background: 'green'}}>lold</div>
      </GridLayout>
    )
  }
}

ReactDOM.render(
  <MyFirstGrid />  
, document.getElementById('app'));
