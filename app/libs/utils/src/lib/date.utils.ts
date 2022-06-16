export const dateAsNumber = (date: Date): number => {
    return + date;
}

export const dateAsSeconds = (date: Date): number => {
    return Math.ceil(dateAsNumber(date) / 1000);
}

export const getNow = (): Date => {
    return new Date();
}

export const nowAsNumber = (): number => {
    return dateAsNumber(
        getNow()
    );
}

export const nowAsSeconds = (): number => {
    return dateAsSeconds(
        getNow()
    );
}