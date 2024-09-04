export const regexId = /^(?=.*\d)(?=.*[a-z])[0-9a-z]{4,20}$/;

export const regexPassword = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,12}$/;

export const regexName = /^[a-zA-Z가-힣][a-zA-Z가-힣\s]*[a-zA-Z가-힣]$/;

export const regexEmail = /\S+@\S+\.\S+/;

export const regexPhone = /^010\d{8}$/;

export const regexPayment = /^\d{16}$/;
