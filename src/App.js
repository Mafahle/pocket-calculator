import './App.css';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import { useState } from 'react';
import * as stringMath from 'string-math';

function App() {
  const [expression, setExpression] = useState('');
  const symbols = ['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', 'x', '.', '0', 'C', '÷', '='];

  const handleButtonClick = (label) => {
    if (label === 'C') {
      setExpression('');
    } else if (label === '=') {
      try {
        setExpression(stringMath(expression.replace(/x/g, '*').replace(/÷/g, '/')));
      } catch (err) {
        console.log(err);
        setExpression('Error');
      }
    } else {
      setExpression(expression + label);
    }
  };

  const keypadButtons = symbols.map((label) => {
    if (label !== '=') {
      return (<>
        <Col xs={3} className='ps-1 pe-1 pt-1 pb-1'>
          <button
            key={label} label={label === 'x' ? '*' : label}
            className="btn btn-light col"
            style={{ width: '100%' }}
            onClick={() => handleButtonClick(label)}
          >
            {label}
          </button>
        </Col>
      </>);
    } else {
      return (<>
        <Col xs={12} className='ps-1 pe-1 pt-1 pb-1'>
          <button
            key={label} label={label === 'x' ? '*' : label}
            className="btn btn-light col"
            style={{ width: '100%' }}
            onClick={() => handleButtonClick(label)}
          >
            {label}
          </button>
        </Col>
      </>);
    }
  });

  return (
    <div className="App">
      <Navbar className='bg-body-tertiary'>
        <Container>
          <Navbar.Brand>
            <img
              src='./equal-experts-logo-colour.png'
              style={{ height: '4rem' }}
            />
          </Navbar.Brand>
          <Navbar.Brand>
            Pocket Calculator
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col 
            xs={12} 
            md={{ span: 6, offset: 3 }}
            lg={{ span: 4, offset: 4 }} 
            className='rounded'
          >
            <div className="align-items-center mt-5">
              {/*display*/}
              <Row>
                <div
                  className="mb-3 bg-light rounded pt-3 pb-3"
                  style={{ width: '100%', height: (expression === ''? '5rem': '')}}
                >
                  <h1>{expression}</h1>
                </div>
              </Row>
              {/*grid of numbers and symbols*/}
              <Row>
                {keypadButtons.slice(0, 4)}
              </Row>
              <Row>
                {keypadButtons.slice(4, 8)}
              </Row>
              <Row>
                {keypadButtons.slice(8, 12)}
              </Row>
              <Row>
                {keypadButtons.slice(12, 16)}
              </Row>
              <Row>
                {keypadButtons.slice(16)}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
