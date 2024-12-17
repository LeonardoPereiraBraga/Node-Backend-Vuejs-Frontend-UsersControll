<template>
    <div>
        <h2>Login de Usuario</h2>
        <hr>
        <div class="columns is-mobile is-centered">
            <div class="column is-half">
                <div v-if="error != undefined" class="alert alert-danger mb-2">
                    <p> {{ error }}</p>
                </div>

                <p>E-mail</p>
                <input class="input mt-2" type="email" placeholder="E-mail" v-model="email">
                <p>Senha</p>
                <input class="input mt-2" type="password" placeholder="Senha" v-model="password">
                <hr>
                <button class="button is-success" @click="login"> Logar </button>


            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            name: '',
            password: '',
            email: '',
            error: undefined
        }

    },
    methods: {
        login() {
            axios.post("http://localhost:8686/login", { name: this.name, password: this.password, email: this.email }).then(res => {
                localStorage.setItem('token', res.data.token)
                this.$router.push({ name: 'home' })
                console.log(res)
            }).catch((error) => {
                const msgErro = error.response.data.err
                this.error = msgErro
            })
        }
    }

}
</script>

<style>
.alert {
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    line-height: 1.5;
}

.alert-danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
}
</style>