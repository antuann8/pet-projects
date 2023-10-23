import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'

import ExerciseService from '../../../services/exercise/exercise.service'
import Layout from '../../layout/Layout'
import Loader from '../../ui/Loader'
import Alert from '../../ui/alert/Alert'
import Button from '../../ui/button/Button'
import Field from '../../ui/field/Field'

import styles from './NewExercise.module.scss'

const data = ['chest', 'shoulders', 'biceps', 'legs', 'hit', 'back']

const NewExercise = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control
	} = useForm({
		mode: 'onChange'
	})

	const { isSuccess, error, isLoading } = useMutation(
		['create exercise'],
		body => {
			ExerciseService.create(body),
				{
					onSuccess: () => {
						reset()
					}
				}
		}
	)

	const onSubmit = data => {
		mutate(data)
	}

	return (
		<>
			<Layout
				bgImage='/images/new-exercise-bg.jpg'
				heading='Create new exercise'
				backLink='/new-workout'
			/>
			<div className='wrapper-inner-page'>
				{error && <Alert type='error' text={error} />}
				{isSuccess && <Alert text='Exercise created' />}
				{isLoading && <Loader />}
				<form onSubmit={handleSubmit(onSubmit)}>
					<Field
						error={errors?.name?.message}
						name='name'
						register={register}
						options={{
							required: 'Name is required'
						}}
						type='text'
						placeholder='Enter name'
					/>
					<Field
						error={errors?.times?.message}
						name='times'
						register={register}
						options={{
							valueAsNumber: true,
							validate: value => value > 0 || 'Times must be number',
							required: 'Times is required'
						}}
						placeholder='Enter times'
					/>
					<Controller
						name='iconPath'
						control={control}
						render={({ field: { value, onChange } }) => (
							<div className={styles.images}>
								{data.map(name => (
									<img
										key={`ex img ${name}`}
										src={`/uploads/exercises/${name}.svg`}
										alt={name}
										className={cn({ [styles.active]: imageName === name })}
										onClick={() => onChange(name)}
										draggable={false}
										height='45'
									/>
								))}
							</div>
						)}
					/>
					{errors?.iconPath && (
						<div className='error'>{errors?.iconPath?.message}</div>
					)}
					<div className={styles.wrapperButtons}>
						<Button>Create</Button>
					</div>
				</form>
			</div>
		</>
	)
}

export default NewExercise
