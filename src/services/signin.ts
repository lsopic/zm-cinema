export const signIn = async (email: string, password: string) => {
    var formdata = new FormData();
    formdata.append("identifier", email);
    formdata.append("password", password);
    var requestOptions = {
        method: 'POST',
        body: formdata,
    };
    try {
        const fetchResponse = await fetch('https://zm-job-application.herokuapp.com/auth/local', requestOptions)
        const response = await fetchResponse.json()
        return response
    } catch (error) {
        throw error
    }
}