import React from 'react';
import styles from './styles/lottery-algorithm-desktop.module.scss';
import logo from '@app/assets/images/logo.svg';

export function LotteryAlgorithmDesktop(): React.ReactElement {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<img src={logo} alt="СТОЛОТО" className={styles.logo} />
				<h1 className={styles.title}>Как работает лотерея</h1>
				<p className={styles.subtitle}>Три шага: создание билета → регистрация → результат</p>
			</div>

			<div className={styles.steps}>
				<div className={styles.stepCard}>
					<div className={styles.stepNumber}>1</div>
					<h2 className={styles.stepTitle}>Создание билета</h2>
					<p className={styles.stepText}>Вы выбираете числа на билете. Можно случайно или вручную. Билет фиксируется с отметкой времени.</p>
				</div>

				<div className={styles.stepCard}>
					<div className={styles.stepNumber}>2</div>
					<h2 className={styles.stepTitle}>Регистрация пользователя</h2>
					<p className={styles.stepText}>Указываете ФИО, почту и пароль. Данные защищаются, доступ к билету привязан к вашему аккаунту.</p>
				</div>

				<div className={styles.stepCard}>
					<div className={styles.stepNumber}>3</div>
					<h2 className={styles.stepTitle}>Подведение итогов</h2>
					<p className={styles.stepText}>После розыгрыша система сверяет ваш билет с выигрышной комбинацией и показывает результат.</p>
				</div>
			</div>
		</div>
	);
}


