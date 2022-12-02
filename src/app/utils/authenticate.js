import axios from 'axios';
const authenticate = async ()=>{
    const auth_token = localStorage.getItem('auth_token')

    try{
        const authenticate = await axios.get(`${process.env.REACT_APP_API_URL}/authenticate`, {
            headers: {
                Authorization: `Bearer ${auth_token}`
            }
          });

        if(authenticate.data.status_code !== 200){
            if (localStorage.getItem('auth_token') && authenticate.data.status_code !== 200){ 
                localStorage.removeItem('auth_token');
                localStorage.removeItem('token');
                window.location.href = '/'
            } else {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('token');
                window.location.assign = '/'
            }
        }
    }catch(err){
        console.log('err', err)
    }
}

export default authenticate;