export interface R {
	type: string
	data: number[]
}

export interface S {
	type: string
	data: number[]
}

export interface Signature {
	r: R
	s: S
	v: number
	deadline: string
}

export interface AirdropData {
	step: number
	amount: string
	signature: Signature
}
