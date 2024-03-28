import './App.css';
import { Buffer } from 'buffer';

// @ts-ignore
window.Buffer = Buffer;

var bitcoin = require("bitcoinjs-lib");

const bitcoinNetwork = bitcoin.networks.testnet;


// Generate a new Bitcoin wallet
const keyPair = bitcoin.ECPair.makeRandom(bitcoinNetwork);
const privateKey = keyPair.toWIF();
const publicKey = keyPair.publicKey.toString('hex');
const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });

console.log("Private Key:", privateKey);
console.log("Public Key:", publicKey);
console.log("Address:", address);


function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;
