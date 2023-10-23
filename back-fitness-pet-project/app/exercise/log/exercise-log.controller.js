import asyncHandler from 'express-async-handler'

import { prisma } from '../../prisma.js'

// @desc Create new exercise log
// @route POST /api/exercises/log/:id
// @access private

export const createNewExerciseLog = asyncHandler(async (req, res) => {
	const { times } = req.body
	const exerciseId = +req.params.id

	let timesDefault = []

	const exercise = await prisma.exercise.findUnique({
		where: {
			id: exerciseId
		}
	})

	if (!exercise) {
		res.status(404)
		throw new Error('Exercise not found!')
	}

	for (let i = 0; i < exercise.times; i++) {
		timesDefault.push({
			weight: 0,
			repeat: 0
		})
	}

	const exerciseLog = await prisma.exerciseLog.create({
		data: {
			user: {
				connect: {
					id: req.user.id
				}
			},
			exercise: {
				connect: {
					id: exerciseId
				}
			},
			times: {
				createMany: {
					data: timesDefault
				}
			}
		},
		include: {
			times: true
		}
	})

	res.json(exerciseLog)
})
