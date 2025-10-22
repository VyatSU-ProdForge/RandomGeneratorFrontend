import React from 'react';
import { CreateStep } from '../create-step';
import { RegistrationStep } from '../registration-step';
import { CulminationStep } from '../culmination-step';

export interface StepDetail {
	title: string;
	shortDescription: string;
	detailComponent: React.ReactElement;
}

export const stepList: StepDetail[] = [
	{
		title: 'Создание билета',
		shortDescription: 'Вы выбираете числа на билете. Можно случайно или вручную. Билет фиксируется с отметкой времени.',
		detailComponent: React.createElement(CreateStep)
	},
	{
		title: 'Регистрация пользователя',
		shortDescription: 'Указываете ФИО, почту и пароль. Данные защищаются, доступ к билету привязан к вашему аккаунту.',
		detailComponent: React.createElement(RegistrationStep)
	},
	{
		title: 'Подведение итогов',
		shortDescription: 'После розыгрыша система сверяет ваш билет с выигрышной комбинацией и показывает результат.',
		detailComponent: React.createElement(CulminationStep)
	}
];