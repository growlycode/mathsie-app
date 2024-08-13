
import './App.scss';
import { HtmlDemo } from './html/demo';

function App() {


  return (
    <div className='mathsie-canvas'>
      <HtmlDemo />
      <div className='equations'>
        <div><div className='operand'>12</div><div className='operator'>+</div><div className='operand'>10</div></div>
      </div>
    </div>
  );
}

export default App;
