var Connect;
var appName;
var connect;
var abi;
var myContractInstance;
var MyContract;
var web3;

function startApp(){
	console.log("startup");
	      abi=[
					{
						"constant": false,
						"inputs": [
							{
								"name": "a",
								"type": "uint256"
							}
						],
						"name": "set",
						"outputs": [],
						"payable": false,
						"stateMutability": "nonpayable",
						"type": "function"
					},
					{
						"constant": true,
						"inputs": [],
						"name": "get",
						"outputs": [
							{
								"name": "",
								"type": "uint256"
							}
						],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					}
				];
	      // web3 = web2;
	      Connect = window.uportconnect.Connect;
	      appName = 'BLM Application';
				
				connect = new Connect(appName, {
					clientId: 'CLIENT_KEY',
					network: 'rinkeby',
					signer: window.uportconnect.SimpleSigner('SIGNING_KEY')
				});

	      web3 = connect.getWeb3();
	      MyContract = web3.eth.contract(abi);
	      myContractInstance = MyContract.at('0xd4aa2dab5409c5da0b5726d24e3b146d4f4ba626');
	      
}


//uPort connect

const uportConnect1 = () => {
  connect.requestCredentials({
		requested : ['name', 'address', 'phone', 'country'],
		notifications: true
	}).then((userProfile) => {
		alert("Hi")
    console.log(userProfile.address, userProfile.name)
    globalState.uportId = userProfile.address
    globalState.name = userProfile.name
    render()
  }, console.err)
}


// Send ether
const sendEthers = () => {
  const value = parseFloat(globalState.sendToVal) * 1.0e18

  web3.eth.sendTransaction(
    {
      to: globalState.sendToAddr,
      value: value
    },
    (error, txHash) => {
			if (error) { throw error }
			console.log(txHash);
			globalState.txHash = txHash
      globalState.txHashSentEth = txHash
      render2()
    }
  )
}

// Set Status

const setValue = () => {

  const newSetValue = globalState.setValue

  myContractInstance.set(newSetValue,
		(error, txHash) => {
			if (error) { throw error }
			globalState.txHashSetValue = txHash
			render3()
		})

}

// get value 
const getValue = () => {
  myContractInstance.get(
		(error, txHash) => {
			if (error) { throw error }
			globalState.getValue = txHash
			console.log(txHash);
			render4()
		})

}
