import asyncHandler from 'express-async-handler'

import { prisma } from '../../prisma.js'

import { addPrevValues } from './add-prev-values.util.js'

// @desc Get exerciseLog
// @route GET /api/exercises/log/:id
// @access Private

export const getExerciseLog = asyncHandler(async (req, res) => {
	const exerciseLog = await prisma.exerciseLog.findUnique({
		where: {
			id: +req.params.id
		},
		include: {
			exercise: true,
			times: true
		}
	})

	if (!exerciseLog) {
		res.status(404)
		throw new Error('Exercise log not found!')
	}

	const prevExerciseLog = await prisma.exerciseLog.findFirst({
		where: {
			exerciseId: exerciseLog.exerciseId,
			isCompleted: true,
			userId: req.user.id
		},
		orderBy: {
			createdAt: 'desc'
		},
		include: {
			times: true
		}
	})

	const newTimes = addPrevValues(exerciseLog, prevExerciseLog)

	res.json({ ...exerciseLog, times: newTimes })
})
