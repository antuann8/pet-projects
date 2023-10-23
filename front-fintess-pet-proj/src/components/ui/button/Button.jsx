import cn from 'clsx'

import styles from './Button.module.scss'

const Button = ({ children, clickHandler = null, size = 'xl' }) => {
	return (
		<div className={styles.wrapper}>
			<button
				onClick={clickHandler}
				className={cn(styles.button, styles[size])}
			>
				{children}
			</button>
		</div>
	)
}

export default Button
