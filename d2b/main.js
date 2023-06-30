import assert from 'assert'
import fs from 'fs'
import readline from 'readline'

const stream = fs.ReadStream("input.txt")
const rl = readline.createInterface(stream)


function get_outcome_points(outcome) {
	switch (outcome) {
		case Outcome.LeftWins  : return 0
		case Outcome.Draw      : return 3
		case Outcome.RigthWins : return 6
		default:
			assert.fail()
	}
}

function get_baseline_move_points(move) {
	switch (move) {
		case Move.Rock : return 1
		case Move.Paper : return 2
		case Move.Scissor : return 3
		default:
			assert.fail()
	}
}


const Outcome = {
	LeftWins: 0,
	Draw: 1,
	RigthWins: 2,

	get_from: function(left, right) {
		if (left === right) {
			return Outcome.Draw
		}

		if (left === Move.Rock && right === Move.Paper
		|| left === Move.Paper && right === Move.Scissor
		|| left === Move.Scissor && right === Move.Rock) {
			return Outcome.RigthWins
		}

		return Outcome.LeftWins
	},

	get_from_string: function(str) {
		assert.equal(typeof str, "string")

		str = str.toLowerCase()
		if (str === "x") {
			return Outcome.LeftWins
		} else if (str === "y") {
			return Outcome.Draw
		} else if (str === "z") {
			return Outcome.RigthWins
		}
	}
}

const Move = {
	Rock: 0,
	Paper: 1,
	Scissor: 2,

	get_from_string: function(str) {
		assert.equal(typeof str, "string")

		str = str.toLowerCase()
		if (str === "a") {
			return Move.Rock
		} else if (str === "b") {
			return Move.Paper
		} else if (str === "c") {
			return Move.Scissor
		}
	},

	get_from_desired_outcome: function(left_move, desired_outcome) {
		if (desired_outcome === Outcome.Draw) {
			return left_move
		}

		if (desired_outcome === Outcome.LeftWins) {
			switch (left_move) {
				case Move.Rock: return Move.Scissor
				case Move.Paper: return Move.Rock
				case Move.Scissor: return Move.Paper
			}
		} else {
			switch (left_move) {
				case Move.Rock: return Move.Paper
				case Move.Paper: return Move.Scissor
				case Move.Scissor: return Move.Rock
			}
		}
	}
}


// ------------------------------

let score = 0

for await (const line of rl) {
	const split = line.split(RegExp('\\s'))
	assert.equal(split.length, 2)
	
	const [left, right] = split

	// console.log(left + ':' + right)

	const left_move = Move.get_from_string(left)
	const outcome = Outcome.get_from_string(right)
	const right_move = Move.get_from_desired_outcome(left_move, outcome)

	// console.log(`${left_move} | ${right_move}`)

	score += get_outcome_points(outcome) + get_baseline_move_points(right_move)
}

console.log(score)


