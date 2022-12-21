import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, FormEvent, useState } from "react"


const Login: FunctionComponent = () => {
    const router = useRouter();
    
    function onSubmit(event: FormEvent, state: { username: string; password: string }) {
        event.preventDefault()
        fetch("/api/signIn",
            {
                body: JSON.stringify(state),
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
            }).catch((response) => response.json())
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "success") {
                    router.push('/lobby');
                }
                if (data.status === "erreur") {
                    window.alert(data.errors.join("\n"))
                    // loginError = data.errors.join("\n");
                }
            })
    }
    const [state, changeState] = useState({
        username: '',
        password: ''
    })

    return (
        <>
            <div className='wrapper-index'>
                <div className="title">
                    Metal Gear Magix
                </div>
                <div className="index-row-flex">
                    <div className="index-column-flex">
                        <div className="login-form">
                            <h1 className="connexion">Login</h1>
                            {/* {isError &&
                                <div className="error-div">{loginError}</div>
                            } */}
                            <form action="/" method="post" onSubmit={(event) => onSubmit(event, state)}>
                                <p className="form-label">
                                    <label className="form-label" htmlFor="username">Username</label>
                                </p>
                                <input onChange={(event) => changeState({...state, username: event.target.value})} type="text" name="username" id="username" className="form-input" required />

                                <p className="form-label">
                                    <label htmlFor="password">Mot de passe </label>
                                </p>
                                <input onChange={(event) =>changeState({...state, password: event.target.value})} type="password" name="password" id="password" className="form-input" required/>

                                <div className="form-button">
                                    <button type="submit">Connexion</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login