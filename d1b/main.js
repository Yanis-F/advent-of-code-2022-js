import readline from 'readline';
import fs from 'fs';

const filestream = fs.createReadStream("input.txt")
const lineinterface = readline.createInterface(filestream)


let elves_calories = []
let current_sum = 0

for await (const line of lineinterface) {
	if (line !== "") {
		let current_number = parseInt(line)
		current_sum += current_number
	} else {
		elves_calories.push(current_sum)
		current_sum = 0
	}
}

elves_calories.sort()
const top3_sum = elves_calories.slice(-3).reduce((a, b) => a + b)

console.log(top3_sum)
