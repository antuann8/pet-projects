import { $axios } from '../../api.js'

const EXERCISES = '/exercises'

class ExerciseService {
	async getAll() {
		return $axios.get(EXERCISES)
	}
	//name, times, iconPath
	async create(body) {
		return $axios.post(EXERCISES, body)
	}

	async create(id, body) {
		return $axios.put(`${EXERCISES}/${id}`, body)
	}

	async delete(id) {
		return $axios.put(`${EXERCISES}/${id}`)
	}
}

export default new ExerciseService()
