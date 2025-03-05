import logo from './logo.svg';
import './App.css';
import CustomizedAccordian from './CustomizedAccordian';
import { Container } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Container maxWidth="lg">
        <CustomizedAccordian />
      </Container>
    </div>
  );
}

export default App;
