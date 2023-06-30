import readline from 'readline';
import fs from 'fs';

const filestream = fs.createReadStream("input.txt")
const lineinterface = readline.createInterface(filestream)


let max_sum = null
let current_sum = 0

for await (const line of lineinterface) {
	if (line !== "") {
		let current_number = parseInt(line)
		current_sum += current_number
	} else {
		if (max_sum === null || current_sum > max_sum) {
			max_sum = current_sum
		}
		current_sum = 0
	}
}

console.log(max_sum)
