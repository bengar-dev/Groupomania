import { RecoilRoot } from 'recoil'

//import components
import Auth from './services/Auth.js'

function App() {

  return (
    <RecoilRoot>
      <Auth />
    </RecoilRoot>
  );
}

export default App;
