export const setUser = (email: string) => {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('user', email);
    }
};


export const getUserdetails = () => {
    if (typeof window !== 'undefined') {
        return {
            username: sessionStorage.getItem('user'),
        };
    }
};


export const removeUser = () => {
    if (typeof window !== 'undefined') {
        sessionStorage.removeItem('user');
    }
};