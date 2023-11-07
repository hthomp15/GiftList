const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const tree = new MerkleTree(niceList)
  const proof =  tree.getProof(408)
  const root = tree.getRoot()
  const leaf = niceList[408]

  console.log(proof, "root", root)
  

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof: proof,
    leaf: leaf
  });

  console.log({ gift });
}

main();