<template>
    <div>
        <h2>Registro de Usuario</h2>
        <hr>
        <div class="columns is-mobile is-centered">
            <div class="column is-half">
                <div v-if="error != undefined" class="alert alert-danger mb-2">
                    <p> {{ error }}</p>
                </div>

                <p>Nome</p>
                <input class="input" type="text" placeholder="Nome do usuario" v-model="name">
                <p>E-mail</p>
                <input class="input mt-2" type="email" placeholder="E-mail" v-model="email">
                <p>Senha</p>
                <input class="input mt-2" type="password" placeholder="Senha" v-model="password">
                <hr>
                <button class="button is-success" @click="register"> Cadastrar </button>


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
        register() {
            axios.post("http://localhost:8686/user", { name: this.name, password: this.password, email: this.email }).then(res => {
                this.$router.push({ name: 'home' }) //Basicamente um res.redirect
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