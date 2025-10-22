export type Role = {
	id: number;
	name: string;
	keyWord: string;
};

export type User = {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	middleName: string;
	roles: Role[];
	createdAt: string; // ISO string
	updatedAt: string; // ISO string
};

export type AuthSession = {
	user: User;
	token: string;
};


