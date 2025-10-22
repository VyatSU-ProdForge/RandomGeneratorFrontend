import React from 'react';
import styles from './styles/lottery-algorithm-mobile.module.scss';
import { useLotteryAlgorithm } from '../hooks/use-lottery-alghorithm';
import { stepList } from '@features/lottery-alghorithm';
import { Modal } from '@/components/composite/modal';

export function LotteryAlgorithmMobile(): React.ReactElement {
	const { 
		selectedStep,
		handleBack, 
		handleStepClick, 
		handleCloseModal, 
		headerData 
	} = useLotteryAlgorithm();
	  
	return (
		<>
			<div className={styles.container}>
				<div className={styles.content}>
				<button className={styles.backButton} onClick={handleBack}>
					← Назад
				</button>

				<div className={styles.card}>
					<div className={styles.cardContent}>
						<h1 className={styles.title}>{headerData.pagetTitle}</h1>
						<p className={styles.subtitle}>
							{headerData.subTitle}
						</p>

						<div className={styles.stepsList}>
							{stepList.map((step, index) => (
								<div 
									key={index}
									className={styles.stepCard}
									onClick={() => handleStepClick(index)}
								>
									<div className={styles.stepNumber}>{index + 1}</div>
									<div className={styles.stepContent}>
										<h3 className={styles.stepTitle}>{step.title}</h3>
										<p className={styles.stepDescription}>{step.shortDescription}</p>
									</div>
									<div className={styles.stepArrow}>→</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			{
				selectedStep !== null && <Modal 
					isOpen={selectedStep !== null}
					onClose={handleCloseModal}
				>
					{stepList[selectedStep].detailComponent}
				</Modal>
			}
				
			</div>
		</>
	);
}


