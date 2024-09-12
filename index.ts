console.log("To run cNFTs creation process, see README file, please...");

import { readCsv } from './utils';
import * as fs from 'fs'

try {
	const data = await readCsv('./fellow.csv');
	//console.log(data);
	console.log(data.length);
	data.forEach((item) => {
		console.log("-", item.address);
	});


	const addr = fs.readFileSync("./data/merkleTreeDevnet.txt", 'utf8');
	console.log(">"+addr+"<");


} catch (error) {
	console.error('Erreur lors de la lecture du CSV:', error);
}