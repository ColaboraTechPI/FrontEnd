import React, { ChangeEvent, useState, useEffect } from 'react'
import { Box, Button, Grid, TextField, Typography } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import UserLogin from '../../models/UserLogin';
import { login } from '../../service/Service'
import { addId, addToken } from '../../store/tokens/actions'

import './Login.css';
import { toast } from 'react-toastify';

function Login() {

    let history = useHistory()

    const dispatch = useDispatch()

    const [token, setToken] = useState('')

    const [userLogin, setUserLogin] = useState<UserLogin>({
        id: 0,
        nome: '',
        usuario: '',
        foto: '',
        senha: '',
        token: '',
        tipo: ''
    })

    // Crie mais um State para pegar os dados retornados a API
    const [respUserLogin, setRespUserLogin] = useState<UserLogin>({
        id: 0,
        nome: '',
        usuario: '',
        foto: '',
        senha: '',
        token: '',
        tipo: ''
    })

    useEffect(() => {
        if (token !== "") {
            dispatch(addToken(token))
            history.push('/home')
        }
    }, [token])

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (respUserLogin.token !== "") {

            // Verifica os dados pelo console (Opcional)
            console.log("Token: " + respUserLogin.token)
            console.log("ID: " + respUserLogin.id)

            // Guarda as informações dentro do Redux (Store)
            dispatch(addToken(respUserLogin.token))
            dispatch(addId(respUserLogin.id.toString()))    // Faz uma conversão de Number para String
            history.push('/home')
        }
    }, [respUserLogin.token])

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        try {

            /* Se atente para a Rota de Logar, e também substitua o método
            setToken por setRespUserLogin */

            await login(`/usuarios/logar`, userLogin, setRespUserLogin)

            toast.success('Usuário logado com sucesso!',{
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'dark',
                progress: undefined
            })

        } catch (error) {
            toast.error('Os dados do usuário estão inconsistentes!',{
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'dark',
                progress: undefined
            })
    }
}

    return (
        <Grid  className='login-container'>
            <Grid alignItems='center' xs={6} >
                <Box className='lefgrid-container'>

                    <form onSubmit={onSubmit}  className='form-container'>
                        <Box className='logo-telalogin'>
                            
                        </Box>

                        <TextField 
                        value={userLogin.usuario} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} 
                        id='usuario' 
                        label='usuário' 
                        variant='outlined' 
                        name='usuario' 
                        margin='normal' 
                        className='textfields-login' 
                        fullWidth />

                        <TextField 
                        value={userLogin.senha} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} 
                        id='senha' 
                        label='senha' 
                        variant='outlined' 
                        name='senha' 
                        margin='normal' 
                        type='password'
                        className='textfields-login' 
                        fullWidth />

                        <Box marginTop={2} textAlign='center'>

                            <Button type='submit' variant='contained' className='btn-logar'>
                                Logar
                            </Button>

                        </Box>
                    </form>

                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                        </Box>
                        <Link to='/cadastroUsuario'>
                            <Typography variant='subtitle1' gutterBottom align='center' className='textos1'>Cadastre-se</Typography>
                        </Link>
                    </Box>

                </Box>
            </Grid>
            <Grid xs={6} className='imagem-container'>
                <Box className='imagem'/>
            </Grid>
        </Grid>
    )
}

export default Login