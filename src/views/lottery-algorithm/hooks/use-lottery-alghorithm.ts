import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type HeaderData = {
	pagetTitle: string;
	subTitle: string;
}

export const useLotteryAlgorithm = () => {
	const navigate = useNavigate();
	const [selectedStep, setSelectedStep] = useState<number | null>(null);
	const headerData: HeaderData = {
		pagetTitle: "Как работает лотерея",
		subTitle: "Три шага: создание билета → регистрация → результат"
	}

	const handleBack = (): void => {
		navigate(-1);
	};

	const handleStepClick = (stepIndex: number): void => {
		setSelectedStep(stepIndex);
	};

	const handleCloseModal = (): void => {
		setSelectedStep(null);
	};

	return {
		selectedStep,
		handleBack,
		handleStepClick,
		handleCloseModal,
		headerData
	};
};